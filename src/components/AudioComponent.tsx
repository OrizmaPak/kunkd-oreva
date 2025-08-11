import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdReplay10, MdForward10 } from "react-icons/md";
import { motion } from "framer-motion";
import { notifications } from "@mantine/notifications";

import { Book } from "./BookCard";
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
  onClose: () => void;
  onRead: () => void;
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

  // ------- TRACKING HOOKS (mirrors old pages) -------
  const contentId = sessionStorage.getItem("contentId");
  const profileId = sessionStorage.getItem("profileId");
  const { mutate } = useContentTracking();
  const { mutate: mutateSchool } = useContentSchoolTracking();
  const { mutate: mutateLearning } = useLearningHour();
  const [user] = useStore(getUserState);

  const [delay, setDelay] = useState(0);       // heartbeat counter (5s)
  const [lastTime, setLastTime] = useState(0); // last second sent to learning hour

  // heartbeat only while playing
  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) {
      interval = window.setInterval(() => setDelay((d) => d + 1), 5000);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isPlaying]);

  // push “ongoing” progress every heartbeat
  useEffect(() => {
    if (!delay) return;
    if (!contentId) return;
    if (!audioRef.current) return;

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
            onSuccess: () => {
              console.log(
                "[TRACK][audio][user] ongoing ok",
                payload,
              );
              setLastTime(now);
            },
            onError: (err) => {
              console.log("[TRACK][audio][user] ongoing failed", payload, err);
              notifications.show({
                title: "Notification",
                message: getApiErrorMessage(err),
              });
            },
          }
        );
      } else {
        mutateSchool(
          { ...payload },
          {
            onSuccess: () => {
              console.log("[TRACK][audio][school] ongoing ok", payload);
              setLastTime(now);
            },
            onError: (err) => {
              console.log(
                "[TRACK][audio][school] ongoing failed",
                payload,
                err
              );
              notifications.show({
                title: "Notification",
                message: getApiErrorMessage(err),
              });
            },
          }
        );
      }

      // Learning hour: send time delta (never negative)
      const delta = Math.max(0, now - lastTime);
      mutateLearning(
        {
          content_id: Number(contentId),
          profile_id: Number(profileId),
          timespent: delta,
        },
        {
          onSuccess: () =>
            console.log("[TRACK][audio] learning-hour ok", { delta }),
          onError: (err) =>
            console.log("[TRACK][audio] learning-hour failed", err),
        }
      );
    } catch (err) {
      console.log("[TRACK][audio] unexpected error", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  // mark complete at the very end
  const handleAudioComplete = () => {
    if (!contentId) return;
    const now = Math.ceil(audioRef.current?.currentTime || 0);
    const payload = {
      content_id: Number(contentId),
      status: "complete",
      pages_read: now,
      timespent: now,
    };
    if (user?.role === "user") {
      mutate(
        { profile_id: Number(profileId), ...payload },
        {
          onSuccess: () => console.log("[TRACK][audio] complete ok", payload),
          onError: (err) =>
            console.log("[TRACK][audio] complete failed", payload, err),
        }
      );
    } else {
      mutateSchool(
        { ...payload },
        {
          onSuccess: () => console.log("[TRACK][audio] complete ok (school)", payload),
          onError: (err) =>
            console.log("[TRACK][audio] complete failed (school)", payload, err),
        }
      );
    }
    onComplete && onComplete();
  };

  // ------- Wavesurfer wiring (unchanged) -------
  useEffect(() => {
    const initializeWaveSurfer = () => {
      const audioEl = audioRef.current!;
      const container = containerRef.current!;
      if (!audioEl || !container) return;

      audioEl.src = audioSrc;
      audioEl.preload = "metadata";
      audioEl.controls = false;
      audioEl.setAttribute("controlsList", "nodownload");

      const ws = WaveSurfer.create({
        container,
        backend: "MediaElement",
        barHeight: 3,
        height: 150,
        barWidth: 5,
        barGap: 6,
        barRadius: 10,
        waveColor: "#cfe4a5",
        progressColor: "#9FC43E",
        cursorWidth: 0,
        mediaControls: false,
      });

      waveRef.current = ws;
      ws.setMediaElement(audioEl);
      ws.load(audioSrc);

      const onReady = () => setDuration(audioEl.duration);
      const onTimeUpdate = () => setCurrent(audioEl.currentTime);
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);

      ws.on("ready", onReady);
      ws.on("finish", handleAudioComplete); // finish => complete

      audioEl.addEventListener("timeupdate", onTimeUpdate);
      audioEl.addEventListener("play", onPlay);
      audioEl.addEventListener("pause", onPause);
      audioEl.addEventListener("ended", handleAudioComplete);

      container.addEventListener("contextmenu", (e) => e.preventDefault());

      return () => {
        ws.destroy();
        audioEl.removeEventListener("timeupdate", onTimeUpdate);
        audioEl.removeEventListener("play", onPlay);
        audioEl.removeEventListener("pause", onPause);
        audioEl.removeEventListener("ended", handleAudioComplete);
      };
    };

    // first mount
    initializeWaveSurfer();
    return () => {
      if (waveRef.current) waveRef.current.destroy();
    };
  }, [audioSrc]); // eslint-disable-line

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    isPlaying ? a.pause() : a.play();
  };

  const skip = (s: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.currentTime + s, duration));
  };

  const fmt = (sec: number) =>
    new Date(sec * 1000).toISOString().substring(14, 19);

  return (
    <section
      className="relative bg-transparent rounded-lg py-6 max-w-full mx-auto"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* close */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close player"
      >
        ✕
      </button>

      {/* timeline + clocks */}
      <div className="flex items-center justify-between mb-3 text-sm text-gray-700">
        <span>{fmt(current)}</span>
        <span>-{fmt(Math.max(0, duration - current))}</span>
      </div>

      {/* waveform */}
      <div ref={containerRef} className="select-none" />

      {/* controls */}
      <div className="mt-4 flex items-center justify-center gap-8 bg-[#D7CFD2] rounded-full py-3">
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

      <audio ref={audioRef} />
    </section>
  );
};

export default AudioComponent;
