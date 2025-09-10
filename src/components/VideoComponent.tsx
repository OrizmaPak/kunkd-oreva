// src/components/VideoComponent.tsx
import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import screenfull from "screenfull";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaPause,
  FaPlay,
  FaChevronLeft,
} from "react-icons/fa";
import { MdReplay10, MdForward10 } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import QuizComponent from "@/components/QuizComponent";
import WellDoneModal from "@/components/WellDoneModal";
import { Book } from "@/components/BookCard";

// tracking
import {
  useContentTracking,
  useContentSchoolTracking,
  useLearningHour,
} from "@/api/queries";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { getApiErrorMessage } from "@/api/helper";

interface VideoComponentProps {
  title: string;
  flagUrl: string;
  onClose: () => void;
  onComplete: () => void;
  videoSrc: string;
  poster: string;
  onRetake: () => void;
  book: Book;
  showPosterOnPause?: boolean;
  onViewAnswers?: () => void;
}

const fmt = (sec: number) =>
  new Date((sec || 0) * 1000).toISOString().substr(14, 5);

const VideoComponent: React.FC<VideoComponentProps> = ({
  title,
  flagUrl,
  onClose,
  onComplete,
  videoSrc,
  poster,
  book,
  onRetake,
  showPosterOnPause = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [overlayVisible, setOverlayVisible] = useState(true);
  const hideTimeout = useRef<number>();

  const [muted, setMuted] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);
  const [showVol, setShowVol] = useState(false);

  // seek state (only used in fullscreen)
  const progressPct = duration ? (current / duration) * 100 : 0;

  // modals
  const [showDone, setShowDone] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // tracking
  const [user] = useStore(getUserState);
  const { mutate: trackParent } = useContentTracking();
  const { mutate: trackSchool } = useContentSchoolTracking();
  const { mutate: trackLearning } = useLearningHour();
  const profileIdNum = Number(sessionStorage.getItem("profileId") || 0);
  const lastDeltaRef = useRef(0);

  /* metadata + time */
  useEffect(() => {
    const v = videoRef.current!;
    const meta = () => setDuration(v.duration || 0);
    const tick = () => setCurrent(v.currentTime || 0);
    v.addEventListener("loadedmetadata", meta);
    v.addEventListener("timeupdate", tick);
    return () => {
      v.removeEventListener("loadedmetadata", meta);
      v.removeEventListener("timeupdate", tick);
    };
  }, []);

  /* play/pause/ended */
  useEffect(() => {
    const v = videoRef.current!;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => handleVideoComplete();
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line
  }, []);

  /* tracking while playing */
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      const v = videoRef.current;
      if (!v) return;

      const now = Math.ceil(v.currentTime || 0);
      const dur = Math.ceil(v.duration || 0);
      if (!book?.id || now <= 0) return;

      const base = {
        content_id: book.id,
        status: now >= Math.max(1, dur - 1) ? ("complete" as const) : ("ongoing" as const),
        pages_read: now,
        timespent: now,
      };

      if (user?.role === "user") {
        trackParent(
          { ...base, profile_id: profileIdNum },
          { onError: (err) => console.error("[tracking] parent:", getApiErrorMessage(err)) }
        );
      } else {
        trackSchool(base, {
          onError: (err) => console.error("[tracking] school:", getApiErrorMessage(err)),
        });
      }

      const delta = Math.max(0, now - lastDeltaRef.current);
      if (delta > 0 && user?.role === "user") {
        trackLearning(
          { content_id: book.id, profile_id: profileIdNum, timespent: delta },
          { onError: (err) => console.error("[tracking] learning:", getApiErrorMessage(err)) }
        );
        lastDeltaRef.current = now;
      }
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPlaying, book?.id, profileIdNum, trackParent, trackSchool, trackLearning, user?.role]);

  /* complete tracking */
  const handleVideoComplete = () => {
    if (!book?.id) return;
    const base = {
      content_id: book.id,
      status: "complete" as const,
      pages_read: Math.ceil(current),
      timespent: Math.ceil(current),
    };
    if (user?.role === "user") {
      trackParent(
        { ...base, profile_id: profileIdNum },
        { onError: (err) => console.error("[tracking] complete parent:", getApiErrorMessage(err)) }
      );
    } else {
      trackSchool(base, {
        onError: (err) => console.error("[tracking] complete school:", getApiErrorMessage(err)),
      });
    }
    setShowDone(true);
    onComplete?.();
  };

  /* helpers */
  const skip = (sec: number) => {
    const vid = videoRef.current;
    if (!vid) return;
    const wasPaused = vid.paused;
    const max = Number.isFinite(vid.duration) && vid.duration > 0 ? vid.duration : Infinity;
    vid.currentTime = Math.min(Math.max(0, vid.currentTime + sec), max);
    wasPaused ? vid.pause() : vid.play();
  };

  const showOverlay = () => {
    setOverlayVisible(true);
    clearTimeout(hideTimeout.current);
    if (isPlaying) {
      hideTimeout.current = window.setTimeout(() => setOverlayVisible(false), 3000);
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };

  const toggleFull = async () => {
    if (!screenfull.isEnabled || !shellRef.current) return;
    screenfull.isFullscreen ? await screenfull.exit() : await screenfull.request(shellRef.current);
  };

  const handleBack = async () => {
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      await screenfull.exit();
    }
    onClose?.();
  };

  /* overlay visibility on play/pause */
  useEffect(() => {
    if (isPlaying) showOverlay();
    else {
      clearTimeout(hideTimeout.current);
      setOverlayVisible(true);
    }
  }, [isPlaying]);

  /* fullscreen watcher */
  useEffect(() => {
    const f = () => setIsFull(screenfull.isFullscreen);
    screenfull.on("change", f);
    return () => screenfull.off("change", f);
  }, []);

  /* volume -> element */
  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume;
    setMuted(volume === 0);
  }, [volume]);

  /* robust HLS init/recovery */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    try { hlsRef.current?.destroy(); } catch {}
    hlsRef.current = null;
    video.removeAttribute("src");
    video.load();

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.load();
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 90 });
      hlsRef.current = hls;
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      const onError = (_evt: any, data: any) => {
        if (!data?.fatal) return;
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default:
            try { hls.destroy(); } catch {}
            hlsRef.current = null;
        }
      };
      hls.on(Hls.Events.ERROR, onError);

      return () => {
        hls.off(Hls.Events.ERROR, onError);
        try { hls.destroy(); } catch {}
        hlsRef.current = null;
      };
    }

    console.error("This browser does not support HLS");
  }, [videoSrc]);

  /* fullscreen-only seek handlers */
  const onSeekPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!duration) return;
    const pct = parseFloat(e.target.value);
    setCurrent((pct / 100) * duration); // preview while dragging
  };
  const onSeekCommit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || !duration) return;
    const pct = parseFloat(e.target.value);
    videoRef.current.currentTime = (pct / 100) * duration;
  };

  if (showQuiz) {
    return (
      <QuizComponent book={book} onComplete={() => setShowQuiz(false)} onRetake={onRetake} />
    );
  }

  return (
    <div
      ref={shellRef}
      className={`relative mx-auto mb-4 ${isFull ? "w-screen h-screen" : ""}`}
      onMouseMove={showOverlay}
    >
      {/* ====================== PLAYER ====================== */}
      <div className="relative bg-black rounded-t-3xl overflow-hidden">
        {/* Header */}
        {isFull ? (
          // FULLSCREEN HEADER: Back | Title+Flag | Finish
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3">
            <button
              onClick={handleBack}
              className=" items-center flex-column gap-2 text-white/90 hover:text-white"
            >
              <svg width="65" height="66" viewBox="0 0 65 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 32.6383C0 14.7443 14.506 0.238281 32.4 0.238281C50.294 0.238281 64.8 14.7443 64.8 32.6383C64.8 50.5323 50.294 65.0383 32.4 65.0383C14.506 65.0383 0 50.5323 0 32.6383Z" fill="#F1F1F1"/>
<path d="M40.7999 33.0562H23.9999M23.9999 33.0562L32.3999 41.4562M23.9999 33.0562L32.3999 24.6562" stroke="#96A1B4" stroke-width="2.53069" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              <span className="text-sm">Back</span>
            </button>

            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-lg whitespace-nowrap">{title}</h3>
              {flagUrl && (
                <img src={flagUrl} alt="flag" className="w-6 h-4 rounded-sm object-cover" />
              )}
            </div>

            <button
              onClick={handleVideoComplete}
              className="bg-white text-[#9FC43E] font-semibold rounded-[14.4px] shadow-sm hover:opacity-90 w-[105.6px] h-[47.6px] p-[10.8px_28.8px] gap-[10.8px] absolute top-3 left-[1225.2px] opacity-100"
            >
              Finish
            </button>
          </div>
        ) : (
          // NORMAL HEADER: small close button + title left
          // src/components/VideoComponent.tsx  (NORMAL header block)
<>
  <button
    className="absolute top-2 right-2 z-[11001] pointer-events-auto text-white hover:text-gray-300"
    onClick={onClose}
    aria-label="Close"
  >
    ✕
  </button>
  <div className="absolute top-4 left-4 flex items-center space-x-2 z-[11000]">
    <h3 className="text-white font-bold text-lg">{title}</h3>
    {flagUrl && <img src={flagUrl} alt="flag" className="w-6 h-4 rounded-sm" />}
  </div>
</>

        )}

        {/* Center overlay */}
        <div
          className={`absolute z-[10000] inset-0 flex items-center justify-center transition-opacity duration-300 ${
            overlayVisible ? "opacity-100" : "opacity-0"
          } pointer-events-none`}
        >
          <div className="flex items-center gap-12 pointer-events-auto">
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

        {/* Video */}
        <video
          key={videoSrc}
          ref={videoRef}
          poster={poster}
          className={`${
            isFull ? "w-[90vw] h-[90vh]" : "w-full h-[400px] md:h-[420px] lg:h-[440px]"
          } object-cover bg-black`}
          controls={false}
          muted={muted}
          playsInline
          preload="metadata"
          onClick={togglePlay}
          onEnded={handleVideoComplete}
        />

        {/* Poster overlay when paused */}
        {showPosterOnPause && !isPlaying && (
          <img
            src={poster}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Tiny exit-fullscreen button ONLY if fullscreen header isn't covering it (we keep it hidden; header already has Back/Finish) */}
        {isFull && false && (
          <button
            onClick={toggleFull}
            className="absolute top-4 left-4 z-30 text-white hover:text-gray-300"
            aria-label="Exit fullscreen"
          >
            <FaCompress size={18} />
          </button>
        )}
      </div>

      {/* ====================== CONTROL BAR (Green) ====================== */}
<div className="relative h-20 bg-[#9FC43E] rounded-b-3xl px-4 flex items-center gap-4">
  {/* Left time(s) */}
  {isFull ? (
    <div className="text-white text-sm shrink-0">{fmt(current)}</div>
  ) : (
    <div className="text-white text-sm shrink-0">
      {fmt(current)} / {fmt(duration)}
    </div>
  )}

  {/* Seekable progress ONLY in fullscreen */}
  {isFull ? (
    <div className="flex-1 flex items-center">
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={progressPct}
        onChange={onSeekPreview}
        onInput={onSeekPreview}
        onMouseUp={onSeekCommit}
        onTouchEnd={onSeekCommit}
        className="w-full h-2 accent-white cursor-pointer"
        style={{ accentColor: "#FFFFFF" }}
        aria-label="Video progress"
      />
    </div>
  ) : (
    <div className="flex-1" />
  )}

  {/* Right time (only in fullscreen) */}
  {isFull && (
    <div className="text-white text-sm shrink-0">{fmt(duration)}</div>
  )}

  {/* Right controls */}
  <div className="ml-3 flex items-center gap-5">
    <button className="text-white" onClick={() => setShowVol((s) => !s)} aria-label="Volume">
      {muted || volume === 0 ? <FaVolumeMute /> : <svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6937 1.47388C16.7424 1.50604 16.7912 1.53989 16.8352 1.57881C18.9597 3.37596 19.1157 6.71686 19.1232 13.3886L19.1235 14.0239C19.1235 21.1223 19.0261 24.6174 16.8352 26.4724C16.7912 26.5096 16.7424 26.5452 16.6922 26.5756C16.0415 26.9751 15.3798 27.1443 14.7197 27.1443C12.5335 27.1443 10.3662 25.291 8.67818 23.849C7.91592 23.1974 6.76388 22.2123 6.36625 22.1683C5.91518 22.1311 5.5254 22.1158 5.1812 22.1057C3.92701 22.0566 2.93528 22.0211 1.7691 20.9852C0.365905 19.7407 0.237044 17.2747 0.232178 15.1011L0.23357 14.3895L0.235142 14.0239L0.23357 13.6583L0.232178 12.9467C0.237044 10.7734 0.365905 8.30878 1.7691 7.06427C2.93685 6.02845 3.93015 5.99121 5.18749 5.94551C5.53012 5.93197 5.91832 5.91843 6.36939 5.88289C6.76388 5.83719 7.91592 4.85215 8.67818 4.20053C10.877 2.32014 13.8883 -0.247415 16.6937 1.47388ZM29.2286 2.98327C33.4926 9.59086 33.4926 18.4647 29.2286 25.0673C28.9992 25.421 28.633 25.6106 28.2605 25.6106C28.0279 25.6106 27.7937 25.5361 27.5878 25.3821C27.0534 24.9826 26.9214 24.1922 27.2939 23.6151C31.0549 17.7928 31.0549 10.2628 27.2939 4.43037C26.9214 3.85491 27.0534 3.06451 27.5894 2.66338C28.1237 2.26225 28.8561 2.40612 29.2286 2.98327ZM14.704 3.45582C13.3398 3.45582 11.5952 4.94693 10.143 6.18924C8.74576 7.38246 7.64245 8.32689 6.54227 8.4149C6.05506 8.45214 5.63699 8.46906 5.26922 8.4826C4.09518 8.52491 3.79813 8.55369 3.26848 9.02421C2.66063 9.56179 2.59307 11.5507 2.58989 13.043L2.59108 13.6465L2.59265 14.0205V14.0273L2.59108 14.4013L2.58989 15.0054C2.59307 16.4988 2.66063 18.4877 3.26848 19.0253C3.79656 19.4958 4.0936 19.5229 5.2645 19.5686C5.63385 19.5805 6.05348 19.5974 6.54227 19.6363C7.64245 19.7226 8.74576 20.667 10.143 21.8603C11.8765 23.3412 14.0234 25.1776 15.4474 24.4143C16.6003 23.3382 16.7567 20.5422 16.7656 14.626L16.766 14.0239C16.766 7.69389 16.6387 4.74721 15.4474 3.63353C15.2164 3.50998 14.9665 3.45582 14.704 3.45582ZM25.3497 7.15516C27.6051 11.4 27.6051 16.6637 25.3497 20.895C25.1313 21.3046 24.7352 21.5331 24.3266 21.5331C24.127 21.5331 23.9258 21.479 23.7403 21.3639C23.1761 21.0152 22.9812 20.2383 23.305 19.6324C25.1454 16.178 25.1454 11.8824 23.305 8.41778C22.9812 7.80847 23.1777 7.0333 23.7419 6.68464C24.3077 6.34275 25.026 6.54754 25.3497 7.15516Z" fill="#EEEEEE"/>
</svg>
}
    </button>
    <button onClick={toggleFull} className="text-white" aria-label="Fullscreen">
      {isFull ? <FaCompress /> : <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.02103 9.83319L3.02103 5.10643L11.6797 13.0187C12.2321 13.5235 13.1277 13.5235 13.6801 13.0187C14.2325 12.5139 14.2325 11.6955 13.6801 11.1907L5.12197 3.37031L10.0936 3.37031C10.8748 3.37031 11.5081 2.7916 11.5081 2.07773C11.5081 1.36386 10.8748 0.785156 10.0936 0.785156H1.60652C1.21592 0.785156 0.862292 0.929834 0.606316 1.16374C0.350341 1.39765 0.192017 1.7208 0.192017 2.07773V9.83319C0.192017 10.5471 0.825314 11.1258 1.60653 11.1258C2.38774 11.1258 3.02103 10.5471 3.02103 9.83319ZM26.5833 18.3458V22.9807L17.9247 15.0685C17.3723 14.5637 16.4767 14.5637 15.9243 15.0685C15.3719 15.5732 15.3719 16.3917 15.9243 16.8964L24.5829 24.8087H19.5108C18.7296 24.8087 18.0963 25.3874 18.0963 26.1013C18.0963 26.8152 18.7296 27.3939 19.5108 27.3939H27.9978C28.3884 27.3939 28.7421 27.2492 28.998 27.0153C29.254 26.7814 29.4123 26.4582 29.4123 26.1013V18.3458C29.4123 17.632 28.7791 17.0533 27.9978 17.0533C27.2166 17.0533 26.5833 17.632 26.5833 18.3458Z" fill="#EEEEEE"/>
</svg>
}
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
            className="absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none"
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="pointer-events-auto w-3/4 h-1 accent-white"
              aria-label="Volume"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================== WELL-DONE MODAL ====================== */}
      {showDone && (
        <WellDoneModal
          className="absolute inset-0 z-30"
          message="Great job! You’ve finished the video."
          onTakeQuiz={() => {
            setShowDone(false);
            setShowQuiz(true);
          }}
          onLater={() => setShowDone(false)}
          ongoback={() => handleBack()}
        />
      )}
    </div>
  );
};

export default VideoComponent;
