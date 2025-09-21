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
  onRead: () => void;    // "Read" pill at the right
  onComplete?: () => void;
  showReadButton?: boolean;
}

const AudioComponent: React.FC<AudioComponentProps> = ({
  book,
  audioSrc,
  onClose,
  onRead,
  onComplete,
  showReadButton = true,
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
    const now = Math.ceil(audioRef.current?.currentTime || 0);

    if (contentId) {
      const payload = {
        content_id: Number(contentId),
        status: "complete",
        pages_read: now,
        timespent: now,
      };
      if (user?.role === "user") mutate({ profile_id: Number(profileId), ...payload });
      else mutateSchool({ ...payload });
    }

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
      height: 490,            // keep the original height
      barWidth: 6,
      barGap: 6,
      barRadius: 10,
      waveColor: "#CFE4A5",   // pale background bars
      progressColor: "#9FC43E",// vivid green overlay as it plays
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
    <div className="relative mx-auto w-[clamp(550px,100%,1440px)] py-8 px-4">
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close audio"
        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white shadow ring-1 ring-gray-200 text-gray-600 hover:text-gray-800 flex items-center justify-center"
      >
        ✕
      </button>
      <div className="flex relative flex-col sm:flex-row items-center justify-center gap-[72px]">
        {/* LEFT: framed cover (1:1 from BookOverview) */}
        <div className="flex-shrink-0 relative mt-[-10px] cursor-default w-[250px] h-[300px]">
          <div className="relative flex-shrink-0 absolute">
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
        <div className="relative flex flex-col w-[540.8px] h-[308.24px]">
          {/* timeline (0:00 / -mm:ss) */}
          <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
            <span>{fmt(current)}</span>
            <div className="w-full h-[200px] relative overflow-hidden">
              <div ref={containerRef} className="select-none relative -top-[145px] -right-2 flex-grow mx-2" />
            </div>
            <span>-{fmt(Math.max(0, (duration || 0) - (current || 0)))}</span>
          </div>
          {/* waveform */}

          {/* control bar */}
          <div className="mt-4 flex items-center justify-center gap-8 rounded-full bg-[#EEEEEE] py-7">
            <button
              onClick={() => skip(-10)}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9735 29.9064C16.254 29.9064 15.6573 29.3097 15.6573 28.5901V22.6407L15.3238 23.0268C14.8324 23.5708 14.0076 23.6059 13.4635 23.1321C12.9195 22.6407 12.8844 21.8158 13.3582 21.2718L15.9907 18.3409C16.3593 17.9373 16.9384 17.7969 17.4474 17.9899C17.9563 18.183 18.2898 18.6744 18.2898 19.2184V28.6077C18.2898 29.3272 17.7106 29.9064 16.9735 29.9064Z" fill="#B5B5C3"/>
<path d="M21.2913 6.7579C21.1509 6.7579 21.0105 6.77545 20.8701 6.77545L22.3092 4.98535C22.7655 4.42375 22.6777 3.58135 22.0986 3.1426C21.537 2.6863 20.7121 2.77405 20.2558 3.3532L16.7985 7.6705C16.7809 7.68805 16.7809 7.7056 16.7634 7.7407C16.7107 7.8109 16.6756 7.89865 16.6405 7.96885C16.6054 8.0566 16.5703 8.1268 16.5528 8.197C16.5352 8.28475 16.5352 8.35495 16.5352 8.4427C16.5352 8.53045 16.5352 8.6182 16.5352 8.70595C16.5352 8.74105 16.5352 8.7586 16.5352 8.7937C16.5528 8.84635 16.5879 8.88145 16.6054 8.95165C16.6405 9.0394 16.6581 9.1096 16.7107 9.1798C16.7634 9.25 16.816 9.3202 16.8862 9.3904C16.9213 9.4255 16.9564 9.47815 16.9915 9.51325C17.0091 9.5308 17.0442 9.5308 17.0617 9.54835C17.1144 9.58345 17.167 9.61855 17.2372 9.6361C17.325 9.68875 17.4127 9.72385 17.5005 9.7414C17.5707 9.7765 17.6233 9.7765 17.6935 9.7765C17.7462 9.7765 17.7813 9.79405 17.8339 9.79405C17.869 9.79405 17.9217 9.7765 17.9568 9.75895C18.0094 9.75895 18.0621 9.75895 18.1323 9.75895C19.2555 9.4957 20.3085 9.37285 21.3088 9.37285C29.1888 9.37285 35.5945 15.7786 35.5945 23.6585C35.5945 31.5385 29.1888 37.9442 21.3088 37.9442C13.4289 37.9442 7.02313 31.5385 7.02313 23.6585C7.02313 20.6048 8.02348 17.6564 9.91888 15.1292C10.3576 14.5501 10.2348 13.7252 9.65563 13.2865C9.07648 12.8477 8.25163 12.9706 7.81288 13.5497C5.56648 16.5332 4.39062 20.0257 4.39062 23.6585C4.39062 32.9776 11.9722 40.5767 21.3088 40.5767C30.6454 40.5767 38.227 32.9951 38.227 23.6585C38.227 14.3219 30.6103 6.7579 21.2913 6.7579Z" fill="#B5B5C3"/>
<path d="M24.7989 29.9065C22.1313 29.9065 19.9727 27.7479 19.9727 25.0803V22.711C19.9727 20.0434 22.1313 17.8848 24.7989 17.8848C27.4665 17.8848 29.6252 20.0434 29.6252 22.711V25.0803C29.6252 27.7479 27.4665 29.9065 24.7989 29.9065ZM24.7989 20.5348C23.588 20.5348 22.6052 21.5176 22.6052 22.7286V25.0978C22.6052 26.3088 23.588 27.2916 24.7989 27.2916C26.0099 27.2916 26.9927 26.3088 26.9927 25.0978V22.7286C26.9927 21.5176 26.0099 20.5348 24.7989 20.5348Z" fill="#B5B5C3"/>
</svg>

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
              <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.178 8.49496L21.7031 4.16016" stroke="#B5B5C3" stroke-width="2.6325" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M34.1465 14.3386C36.0945 16.936 37.3055 20.1476 37.3055 23.6576C37.3055 32.2747 30.3206 39.2596 21.7035 39.2596C13.0865 39.2596 6.10156 32.2747 6.10156 23.6576C6.10156 15.0406 13.0865 8.05566 21.7035 8.05566C22.8969 8.05566 24.0553 8.2137 25.1785 8.47695" stroke="#B5B5C3" stroke-width="2.6325" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.3864 28.5904V19.2188L14.7539 22.1496" stroke="#B5B5C3" stroke-width="2.6325" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.2131 19.2188C27.1436 19.2188 28.7231 20.7982 28.7231 22.7287V25.098C28.7231 27.0285 27.1436 28.608 25.2131 28.608C23.2826 28.608 21.7031 27.0285 21.7031 25.098V22.7287C21.7031 20.7807 23.2826 19.2188 25.2131 19.2188Z" stroke="#B5B5C3" stroke-width="2.6325" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </button>
          </div>

          {/* Floating READ pill (right middle) */}
          {showReadButton && (
            <button
              onClick={onRead}
              className="hidden sm:flex flex-col items-center justify-center gap-1
                       absolute right-[-86px] top-1/2 -translate-y-1/2"
              aria-label="Read"
            >
              <svg width="49" height="63" viewBox="0 0 49 63" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0555 57.851L15.8855 57.8433C16.2788 57.8397 16.5913 57.7501 16.823 57.5746C17.0547 57.3991 17.169 57.1414 17.1659 56.8014C17.1628 56.4681 17.0438 56.2158 16.8088 56.0447C16.5739 55.8735 16.2298 55.79 15.7765 55.7942C15.6" fill="#96A1B4"/>
<path d="M0.527344 24.7871C0.527344 11.5323 11.2725 0.787109 24.5273 0.787109C37.7822 0.787109 48.5273 11.5323 48.5273 24.7871C48.5273 38.0419 37.7822 48.7871 24.5273 48.7871C11.2725 48.7871 0.527344 38.0419 0.527344 24.7871Z" fill="#E6E6E6"/>
<path d="M26.9609 20.875H31.7734V22.25H26.9609V20.875ZM26.9609 24.3125H31.7734V25.6875H26.9609V24.3125ZM26.9609 27.75H31.7734V29.125H26.9609V27.75ZM18.0234 20.875H22.8359V22.25H18.0234V20.875ZM18.0234 24.3125H22.8359V25.6875H18.0234V24.3125ZM18.0234 27.75H22.8359V29.125H18.0234V27.75Z" fill="black"/>
<path d="M33.1484 17.4375H16.6484C16.2838 17.4375 15.934 17.5824 15.6762 17.8402C15.4183 18.0981 15.2734 18.4478 15.2734 18.8125V31.1875C15.2734 31.5522 15.4183 31.9019 15.6762 32.1598C15.934 32.4176 16.2838 32.5625 16.6484 32.5625H33.1484C33.5131 32.5625 33.8628 32.4176 34.1207 32.1598C34.3786 31.9019 34.5234 31.5522 34.5234 31.1875V18.8125C34.5234 18.4478 34.3786 18.0981 34.1207 17.8402C33.8628 17.5824 33.5131 17.4375 33.1484 17.4375ZM16.6484 18.8125H24.2109V31.1875H16.6484V18.8125ZM25.5859 31.1875V18.8125H33.1484V31.1875H25.5859Z" fill="black"/>
</svg>

              <span className="text-xs font-semibold text-[#344054]">Read</span>
            </button>
          )}
        </div>
      </div>

      {/* hidden audio element powering WaveSurfer */}
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioComponent;
