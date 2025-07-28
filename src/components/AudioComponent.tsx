import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdReplay10, MdForward10 } from "react-icons/md";
import { motion } from "framer-motion";
import { Book } from "./BookCard";

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

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
      ws.on("finish", () => {
        // onRead();
        onComplete && onComplete();
      });
      audioEl.addEventListener("timeupdate", onTimeUpdate);
      audioEl.addEventListener("play", onPlay);
      audioEl.addEventListener("pause", onPause);
      audioEl.addEventListener("ended", () => {
        onComplete && onComplete();
      });

      container.addEventListener("contextmenu", (e) => e.preventDefault());

      return () => {
        ws.destroy();
        audioEl.removeEventListener("timeupdate", onTimeUpdate);
        audioEl.removeEventListener("play", onPlay);
        audioEl.removeEventListener("pause", onPause);
      };
    };

    const retryLoad = () => {
      if (waveRef.current) {
        waveRef.current.destroy();
      }
      initializeWaveSurfer();
    };

    initializeWaveSurfer();

    return () => {
      if (waveRef.current) {
        waveRef.current.destroy();
      }
    };
  }, [audioSrc, onComplete]);

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
    <div
      className="relative bg-transparent rounded-lg py-6 max-w-full mx-auto"
      onContextMenu={(e) => e.preventDefault()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
      >
        ✕
      </button>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex justify-center items-center w-[300px] h-[300px] rounded-[8px] border-4 border-[#9FC43E] bg-[#9FC43E] opacity-100">
          <img
            src={book.coverUrl}
            alt="cover"
            className="w-[268px] h-[268px] object-cover rounded-[8px] border-4 border-[#9FC43E] opacity-100"
            style={{ transform: "rotate(0deg)" }}
          />
        </div>
        <div className="flex-1 flex flex-col w-full gap-24">
          <div className="flex items-center bg-gjray-100 rounded-full px-4 py-2">
            <span className="text-gray-400 relative top-8 text-xl mr-3">
              {fmt(current)}
            </span>
            <div ref={containerRef} className="flex-1 h-20" /> {/* 80 px */}
            <span className="text-gray-400 text-xl ml-3 relative top-8">
              -{fmt(duration - current)}
            </span>
            <div className="flex flex-col items-center relative top-[100px]">
              <button
                onClick={onRead}
                className="text-gray-500 hover:text-gray-700 bg-gray-200 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M5 4v16h2V4H5zm12 0v16h2V4h-2zM9 6v12h2V6H9zm4 0v12h2V6h-2z" />
                </svg>
              </button>
              <span className="text-gray-500 text-center text-[12px] mt-0">
                Read
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 bg-[#D7CFD2] rounded-full py-3 w-full">
            <motion.button
              onClick={() => skip(-10)}
              className="text-[#9CA3AF] hover:text-[#6B7280]"
              whileTap={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <MdReplay10 size={46} />
            </motion.button>

            <motion.button
              onClick={togglePlay}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#9FC43E] flex items-center justify-center text-white shadow-lg"
              whileTap={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
            </motion.button>

            <motion.button
              onClick={() => skip(10)}
              className="text-[#9CA3AF] hover:text-[#6B7280]"
              whileTap={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <MdForward10 size={46} />
            </motion.button>
          </div>
        </div>
      </div>
      <audio ref={audioRef} hidden />
    </div>
  );
};

export default AudioComponent;
