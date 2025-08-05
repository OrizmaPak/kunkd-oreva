// src/components/VideoComponent.tsx
import React, { useRef, useState, useEffect } from "react";
import screenfull from "screenfull";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { MdReplay10, MdForward10 } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import video1 from "../VideoBooks/video1.mp4";
import QuizComponent from "@/components/QuizComponent";
import WellDoneModal from "@/components/WellDoneModal";
import { Book } from "@/components/BookCard";

interface VideoComponentProps {
  title: string;
  poster?: string;
  flagUrl?: string;
  onClose: () => void;
  onComplete?: () => void; // Called when video ends (optional parent hook)
  book: Book;               // 🔹 NEW: so we can pass into QuizComponent
}

/* ────────────────────────────────────────────────────────── */
const fmt = (sec: number) =>
  new Date(sec * 1000).toISOString().substr(14, 5);

/* ────────────────────────────────────────────────────────── */
const VideoComponent: React.FC<VideoComponentProps> = ({
  poster,
  title,
  flagUrl,
  onClose,
  onComplete, // optional parent callback
  book,       // 🔹 Destructure new
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  /* basic state */
  const [muted, setMuted]       = useState(false);
  const [isFull, setIsFull]     = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [current, setCurrent]   = useState(0);
  const [duration, setDuration] = useState(0);

  /* volume */
  const [volume, setVolume]     = useState(1);       // 0‒1
  const [showVol, setShowVol]   = useState(false);

  const [showDone, setShowDone] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  /* ───────────  metadata & time  ─────────── */
  useEffect(() => {
    const v = videoRef.current!;
    const meta = () => setDuration(v.duration);
    const tick = () => {
      setCurrent(v.currentTime);
    };
    v.addEventListener("loadedmetadata", meta);
    v.addEventListener("timeupdate", tick);
    return () => {
      v.removeEventListener("loadedmetadata", meta);
      v.removeEventListener("timeupdate", tick);
    };
  }, []);

  /* ───────────  play / pause state  ─────────── */
  useEffect(() => {
    const v = videoRef.current!;
    const onPlay  = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  /* ───── helper ───── */
  const skip = (sec: number) => {
    const vid = videoRef.current;
    if (!vid) return;

    const wasPaused = vid.paused;
    const max =
      Number.isFinite(vid.duration) && vid.duration > 0
        ? vid.duration
        : Infinity;

    vid.currentTime = Math.min(
      Math.max(0, vid.currentTime + sec),
      max
    );

    // keep original play-state
    wasPaused ? vid.pause() : vid.play();
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };

  const toggleFull = async () => {
    if (!screenfull.isEnabled || !shellRef.current) return;
    screenfull.isFullscreen
      ? await screenfull.exit()
      : await screenfull.request(shellRef.current);
  };
  useEffect(() => {
    const f = () => setIsFull(screenfull.isFullscreen);
    screenfull.on("change", f);
    return () => screenfull.off("change", f);
  }, []);

  /* hook volume -> video element */
  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume;
    setMuted(volume === 0);
  }, [volume]);

  const percent = duration ? (current / duration) * 100 : 0;

  /* ───────────  render ─────────── */
  // 1) If they’ve chosen “Take Quiz,” go straight into the quiz UI
  if (showQuiz) {
    return <QuizComponent book={book} onComplete={() => setShowQuiz(false)} />;
  }

  // 2) Otherwise always render the video + controls…
  return (
    <div className="relative mx-auto max-w-[clamp(300px,100%,800px)] mb-4">
      {/* ======================  PLAYER  ====================== */}
      <div ref={shellRef} className="relative bg-black rounded-t-3xl overflow-hidden">
        {/* ✕ close */}
        <button
          className="absolute top-2 right-2 z-20 text-white hover:text-gray-300"
          onClick={onClose}
        >
          ✕
        </button>
        {/* ───── Center overlay (skip / play) ───── */}
        <div className="absolute z-[10000] inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-12 pointer-events-auto">
            {/* ⏪ 10 */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                skip(-10);
              }}
              className="text-white hover:text-gray-200"
              whileTap={{ scale: 1.3, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <MdReplay10 size={46} />
            </motion.button>

            {/* ► / ❚❚ */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="flex items-center justify-center w-16 h-16 bg-white/60 rounded-full text-[#9FC43E]"
              whileTap={{ scale: 1.25 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </motion.button>

            {/* 10 ⏩ */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                skip(10);
              }}
              className="text-white p-6 hover:text-gray-200"
              whileTap={{ scale: 1.3, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <MdForward10 size={46} />
            </motion.button>
          </div>
        </div>
        {/* ───── actual video ───── */}
        <video
          ref={videoRef}
          src={video1}
          poster={poster}
          className="w-full h-full object-contain bg-black"
          controls={false}
          muted={muted}
          onClick={togglePlay}
          onEnded={() => setShowDone(true)}
        />
        {/* title + flag */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          {flagUrl && <img src={flagUrl} alt="flag" className="w-6 h-4 rounded-sm" />}
        </div>
      </div>

      {/* ======================  GREEN BAR  ====================== */}
      <div className="relative h-20 bg-[#9FC43E] rounded-b-3xl px-4 flex items-center gap-4">
        {/* ▶ time MM:SS / MM:SS */}
        <div className="flex items-center gap-1 text-white text-sm shrink-0">
          <span>{fmt(current)}</span>
          <span>/</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* (keep this hidden progress bar for later if you want) */}
        <div className="hidden flex-1 h-1 bg-white/50 rounded overflow-hidden">
          <div className="h-full bg-white" style={{ width: `${percent}%` }} />
        </div>

        {/* right-side controls */}
        <div className="ml-auto flex items-center gap-5">
          <button className="text-white" onClick={() => setShowVol((s) => !s)}>
            {muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>

          <button onClick={toggleFull} className="text-white">
            {isFull ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>

      {/* ====================== VOLUME SLIDER ====================== */}
      <AnimatePresence>
        {showVol && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none"
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="pointer-events-auto w-3/4 h-1 accent-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================  WELL-DONE MODAL OVERLAY ====================== */}
      {showDone && (
        <WellDoneModal
          className="absolute inset-0 z-30"
          message="Great job! You’ve finished the video."
          onTakeQuiz={() => {
            setShowDone(false);
            setShowQuiz(true);
          }}
          onLater={() => setShowDone(false)}
        />
      )}
    </div>
  );
};

export default VideoComponent;
