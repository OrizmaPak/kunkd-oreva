import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause, FaBookOpen } from "react-icons/fa";
import { MdReplay10, MdForward10 } from "react-icons/md";
import { motion } from "framer-motion";
import { notifications } from "@mantine/notifications";

import { Book } from "./BookCard";
import FrameImg from "@/assets/bigbook.png";           // 👈 same frame as BookOverview
import { getApiErrorMessage } from "@/api/helper";
import {
  useContentTracking,
  useContentSchoolTracking,
  useLearningHour,
} from "@/api/queries";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";

export interface AudioComponentProps {
  book: Book;
  audioSrc: string;
  onClose: () => void;   // kept for compatibility
  onRead: () => void;    // “Read” pill at the right
  onComplete?: () => void;
}

const AudioComponent: React.FC<AudioComponentProps> = ({
  book,
  audioSrc,
  onClose,
  onRead,
  onComplete,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // ------- TRACKING (same behavior as your original) -------
  const contentId = sessionStorage.getItem("contentId");
  const profileId = sessionStorage.getItem("profileId");
  const { mutate } = useContentTracking();
  const { mutate: mutateSchool } = useContentSchoolTracking();
  const { mutate: mutateLearning } = useLearningHour();
  const [user] = useStore(getUserState);

  const [delay, setDelay] = useState(0);       // heartbeat every 5s
  const [lastTime, setLastTime] = useState(0); // last recorded second

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) interval = window.setInterval(() => setDelay(d => d + 1), 5000);
    return () => interval && window.clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!delay || !contentId || !audioRef.current) return;

    const now = Math.ceil(audioRef.current.currentTime || 0);
    if (now <= 0) return;

    const payload = {
      content_id: Number(contentId),
      status: now === Math.ceil(duration) ? "complete" : "ongoing",
      pages_read: now,
      timespent: now,
    };

    try {
      if (user?.role === "user") {
        mutate(
          { profile_id: Number(profileId), ...payload },
          {
            onSuccess: () => setLastTime(now),
            onError: (err) => notifications.show({
              title: "Notification",
              message: getApiErrorMessage(err),
            }),
          }
        );
      } else {
        mutateSchool(
          { ...payload },
          {
            onSuccess: () => setLastTime(now),
            onError: (err) => notifications.show({
              title: "Notification",
              message: getApiErrorMessage(err),
            }),
          }
        );
      }

      const delta = Math.max(0, now - lastTime);
      mutateLearning(
        { content_id: Number(contentId), profile_id: Number(profileId), timespent: delta },
        { onSuccess: () => {}, onError: () => {} }
      );
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const handleAudioComplete = () => {
    if (!contentId) return;
    const now = Math.ceil(audioRef.current?.currentTime || 0);
    const payload = {
      content_id: Number(contentId),
      status: "complete",
      pages_read: now,
      timespent: now,
    };
    if (user?.role === "user") mutate({ profile_id: Number(profileId), ...payload });
    else mutateSchool({ ...payload });
    onComplete && onComplete();
  };

  // ------- Wavesurfer lifecycle (reliable init/cleanup) -------
  useEffect(() => {
    const audioEl = audioRef.current;
    const container = containerRef.current;
    if (!audioEl || !container || !audioSrc) return;

    // destroy any previous instance before creating a new one
    if (waveRef.current) {
      try { waveRef.current.destroy(); } catch {}
      waveRef.current = null;
    }

    let disposed = false;

    audioEl.src = audioSrc;
    audioEl.preload = "metadata";
    audioEl.controls = false;
    audioEl.setAttribute("controlsList", "nodownload");
    audioEl.crossOrigin = "anonymous";

    const ws = WaveSurfer.create({
      container,
      backend: "MediaElement",
      height: 90,            // slimmer waveform (matches your screenshot)
      barWidth: 5,
      barGap: 6,
      barRadius: 10,
      waveColor: "#CFE4A5",        // uniform light-green bars
      progressColor: "#CFE4A5",    // same color so it’s not two-tone
      cursorWidth: 0,
      mediaControls: false,
    });

    waveRef.current = ws;
    ws.setMediaElement(audioEl);
    ws.load(audioSrc);

    const onReady = () => !disposed && setDuration(audioEl.duration || 0);
    const onTimeUpdate = () => !disposed && setCurrent(audioEl.currentTime || 0);
    const onPlay = () => !disposed && setIsPlaying(true);
    const onPause = () => !disposed && setIsPlaying(false);
    const onEnd = () => { if (!disposed) handleAudioComplete(); };

    ws.on("ready", onReady);
    ws.on("finish", onEnd);

    audioEl.addEventListener("loadedmetadata", onReady);
    audioEl.addEventListener("timeupdate", onTimeUpdate);
    audioEl.addEventListener("play", onPlay);
    audioEl.addEventListener("pause", onPause);
    audioEl.addEventListener("ended", onEnd);

    const preventCtx = (e: Event) => e.preventDefault();
    container.addEventListener("contextmenu", preventCtx);

    const ro = new ResizeObserver(() => {
      try { ws.drawBuffer(); } catch {}
    });
    ro.observe(container);

    return () => {
      disposed = true;
      try { ro.disconnect(); } catch {}
      try { ws.destroy(); } catch {}
      waveRef.current = null;
      audioEl.removeEventListener("loadedmetadata", onReady);
      audioEl.removeEventListener("timeupdate", onTimeUpdate);
      audioEl.removeEventListener("play", onPlay);
      audioEl.removeEventListener("pause", onPause);
      audioEl.removeEventListener("ended", onEnd);
      container.removeEventListener("contextmenu", preventCtx);
    };
  }, [audioSrc]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    isPlaying ? a.pause() : a.play().catch(() => {});
  };

  const skip = (s: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min((a.currentTime || 0) + s, duration));
  };

  const fmt = (sec: number) =>
    new Date((sec || 0) * 1000).toISOString().substring(14, 19);

  /* ----------------- EXACT SIZES FROM BookOverview -----------------
     • left cover block: w-[250px] h-[300px] with FrameImg + inner cover positioned
     • right content block: width ~534.8px, height ~308.24px (as in your code)
     • layout container: flex row with gap-[72px]
  ------------------------------------------------------------------ */
  return (
    <div className="mx-auto w-[clamp(550px,100%,1440px)] py-8 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-[72px]">
        {/* LEFT: framed cover (1:1 from BookOverview) */}
        <div className="flex-shrink-0 mt-[-10px] cursor-default w-[250px] h-[300px]">
          <div className="relative flex-shrink-0">
            <img src={FrameImg} alt="frame" className="w-[250px] h-[300px]" />
            <img
              src={book?.coverUrl || ""}
              alt={book?.title || "Cover"}
              className="absolute top-[13.47px] left-[13.06px] w-[223.88px] h-[236.84px] object-cover rounded"
              draggable={false}
            />
          </div>
        </div>

        {/* RIGHT: player content container with Overview’s sizing */}
        <div className="relative flex flex-col w-[534.8px] h-[308.24px]">
          {/* timeline (0:00 / -mm:ss) */}
          <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
            <span>{fmt(current)}</span>
            <span>-{fmt(Math.max(0, (duration || 0) - (current || 0)))}</span>
          </div>

          {/* waveform */}
          <div ref={containerRef} className="select-none" />

          {/* control bar */}
          <div className="mt-4 flex items-center justify-center gap-8 rounded-full bg-[#EEEEEE] py-3">
            <button
              onClick={() => skip(-10)}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <MdReplay10 /> <span className="text-xs ml-1">10</span>
            </button>

            <motion.button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[#9FC43E] flex items-center justify-center text-white shadow-lg"
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </motion.button>

            <button
              onClick={() => skip(10)}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <MdForward10 /> <span className="text-xs ml-1">10</span>
            </button>
          </div>

          {/* Floating READ pill (right middle) */}
          <button
            onClick={onRead}
            className="hidden sm:flex flex-col items-center justify-center gap-1
                       absolute right-[-36px] top-1/2 -translate-y-1/2"
            aria-label="Read"
          >
            <span className="h-9 w-9 rounded-full bg-white shadow ring-1 ring-gray-200
                             flex items-center justify-center text-gray-600 hover:text-gray-800">
              <FaBookOpen size={16} />
            </span>
            <span className="text-[10px] text-gray-500">Read</span>
          </button>
        </div>
      </div>

      {/* hidden audio element powering WaveSurfer */}
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioComponent;
