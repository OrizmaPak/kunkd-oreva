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
          <button
            onClick={onRead}
            className="hidden sm:flex flex-col items-center justify-center gap-1
                       absolute right-[-86px] top-1/2 -translate-y-1/2"
            aria-label="Read"
          >
            <svg width="49" height="63" viewBox="0 0 49 63" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0555 57.851L15.8855 57.8433C16.2788 57.8397 16.5913 57.7501 16.823 57.5746C17.0547 57.3991 17.169 57.1414 17.1659 56.8014C17.1628 56.4681 17.0438 56.2158 16.8088 56.0447C16.5739 55.8735 16.2298 55.79 15.7765 55.7942C15.6431 55.7955 15.5132 55.8033 15.3867 55.8178C15.2601 55.8257 15.1435 55.8401 15.0371 55.8611L15.0555 57.851ZM15.9846 58.8324L13.8047 58.8526L13.7729 55.4228C13.7718 55.3028 13.8043 55.2091 13.8703 55.1418C13.9431 55.0745 14.0359 55.0203 14.1489 54.9793C14.3616 54.9106 14.6111 54.8583 14.8974 54.8223C15.1904 54.7863 15.4869 54.7669 15.7869 54.7641C16.6669 54.7559 17.3252 54.9332 17.7619 55.2958C18.2053 55.6517 18.4298 56.1463 18.4357 56.7796C18.4394 57.1796 18.3394 57.5339 18.1355 57.8425C17.9384 58.151 17.6573 58.3936 17.2922 58.5703C16.9271 58.7404 16.4913 58.8277 15.9846 58.8324ZM15.8117 58.514L16.8887 58.194C17.0574 58.4125 17.2295 58.6342 17.4049 58.8593C17.587 59.0776 17.759 59.2927 17.9209 59.5045C18.0895 59.7096 18.2379 59.8983 18.3662 60.0704C18.5011 60.2425 18.6058 60.3849 18.6802 60.4975C18.635 60.6646 18.5462 60.7954 18.4138 60.89C18.288 60.9845 18.1484 61.0325 17.9951 61.0339C17.7951 61.0357 17.638 60.9939 17.5239 60.9083C17.4164 60.8159 17.3119 60.6935 17.2105 60.5411L15.8117 58.514ZM13.8006 58.4126L15.0706 58.4009L15.0943 60.9608C15.0411 60.9813 14.958 60.9987 14.8448 61.0131C14.7383 61.0341 14.6251 61.0451 14.5051 61.0462C14.2651 61.0484 14.0913 61.0067 13.9839 60.921C13.8764 60.8287 13.8216 60.6759 13.8196 60.4625L13.8006 58.4126ZM20.0873 59.1944L20.0293 58.3349L22.7055 57.9101C22.6832 57.657 22.5845 57.4379 22.4094 57.2528C22.2344 57.0678 21.9802 56.9768 21.6468 56.9799C21.3069 56.983 21.0246 57.1057 20.8002 57.3478C20.5757 57.5832 20.4622 57.9209 20.4596 58.361L20.4944 58.8807C20.5583 59.3067 20.7246 59.6186 20.9931 59.8161C21.2683 60.0135 21.6125 60.1104 22.0258 60.1065C22.3058 60.1039 22.5654 60.0615 22.8047 59.9793C23.0439 59.8904 23.233 59.7953 23.3721 59.694C23.4659 59.7532 23.54 59.8292 23.5942 59.922C23.655 60.0081 23.6859 60.1045 23.6869 60.2111C23.6885 60.3845 23.6132 60.5352 23.461 60.6633C23.3088 60.7847 23.103 60.8799 22.8437 60.949C22.5843 61.0181 22.2879 61.0541 21.9546 61.0572C21.4413 61.062 20.9838 60.9729 20.5821 60.7899C20.187 60.6002 19.8743 60.3165 19.6442 59.9386C19.4207 59.5606 19.3063 59.0883 19.301 58.5217C19.2973 58.115 19.3573 57.7578 19.4811 57.45C19.6049 57.1422 19.7726 56.8873 19.984 56.6853C20.2021 56.4766 20.454 56.3209 20.7398 56.2183C21.0254 56.109 21.3249 56.0528 21.6382 56.0499C22.0782 56.0459 22.4624 56.1323 22.7907 56.3093C23.1256 56.4795 23.3878 56.7204 23.5774 57.032C23.7736 57.3435 23.8736 57.7026 23.8774 58.1093C23.8791 58.2959 23.8304 58.4364 23.7313 58.5307C23.6388 58.6182 23.5059 58.6728 23.3328 58.6944L20.0873 59.1944ZM26.7478 60.0828C26.9478 60.0809 27.1276 60.0593 27.2873 60.0178C27.4469 59.9763 27.5631 59.9319 27.636 59.8846L27.6255 58.7446L26.6364 58.8538C26.3633 58.8763 26.1539 58.9382 26.0081 59.0396C25.869 59.1342 25.8003 59.2749 25.802 59.4615C25.8038 59.6548 25.8819 59.8075 26.0363 59.9194C26.1907 60.0313 26.4278 60.0857 26.7478 60.0828ZM26.66 56.0034C27.3134 55.9974 27.8346 56.1325 28.2239 56.409C28.6131 56.6787 28.8104 57.1102 28.8159 57.7035L28.8372 60.0034C28.8387 60.1634 28.7998 60.2905 28.7207 60.3845C28.6482 60.4785 28.5524 60.5628 28.433 60.6372C28.2474 60.7456 28.0115 60.8344 27.7255 60.9038C27.4395 60.9798 27.1165 61.0194 26.7565 61.0227C26.0899 61.0289 25.5654 60.9071 25.1831 60.6573C24.8007 60.4008 24.6072 60.0193 24.6025 59.5126C24.5983 59.066 24.7352 58.7247 25.013 58.4888C25.2974 58.2461 25.7094 58.0957 26.2489 58.0373L27.6075 57.8847L27.6058 57.7047C27.6034 57.4381 27.5083 57.2456 27.3205 57.1274C27.1394 57.009 26.8822 56.9514 26.5489 56.9545C26.2889 56.9569 26.0358 56.9926 25.7898 57.0615C25.5438 57.1305 25.3245 57.2125 25.1321 57.3076C25.0649 57.2549 25.0042 57.1821 24.95 57.0893C24.8958 56.9965 24.8683 56.9001 24.8673 56.8001C24.8651 56.5601 24.9968 56.3822 25.2624 56.2664C25.4483 56.178 25.6643 56.1127 25.9106 56.0704C26.1636 56.028 26.4134 56.0057 26.66 56.0034ZM33.2301 59.7727L33.201 56.6329L34.4309 56.6215L34.4612 59.8913C34.4626 60.038 34.4304 60.1616 34.3647 60.2622C34.3055 60.3561 34.2064 60.4471 34.0672 60.535C33.9082 60.6432 33.689 60.7385 33.4098 60.8211C33.1373 60.9103 32.8244 60.9565 32.471 60.9598C31.9444 60.9647 31.4836 60.8823 31.0887 60.7126C30.7004 60.5362 30.3979 60.2657 30.1811 59.901C29.9644 59.5296 29.8533 59.0606 29.8481 58.494C29.8427 57.914 29.945 57.4364 30.1548 57.0611C30.3714 56.6857 30.6622 56.4097 31.0272 56.233C31.3922 56.0496 31.798 55.9558 32.2447 55.9517C32.4913 55.9494 32.7149 55.9773 32.9155 56.0355C33.1227 56.0936 33.29 56.162 33.4174 56.2408L33.4271 57.2908C33.3195 57.1918 33.1787 57.1064 33.0047 57.0347C32.8307 56.963 32.6304 56.9282 32.4037 56.9303C32.1571 56.9325 31.9342 56.9879 31.7352 57.0965C31.5362 57.1983 31.3811 57.3664 31.2699 57.6008C31.1587 57.8285 31.1047 58.1257 31.1081 58.4923C31.113 59.0123 31.2365 59.3912 31.4787 59.6289C31.7209 59.8667 32.0453 59.9837 32.452 59.9799C32.632 59.9783 32.7851 59.9569 32.9114 59.9157C33.0377 59.8745 33.1439 59.8269 33.2301 59.7727ZM34.4333 56.8715L33.2034 56.8929L33.1795 54.313C33.2261 54.2992 33.2992 54.2819 33.399 54.2609C33.5055 54.2399 33.6154 54.2289 33.7287 54.2279C33.9687 54.2257 34.1425 54.2674 34.2499 54.3531C34.3573 54.4321 34.412 54.5782 34.414 54.7916L34.4333 56.8715Z" fill="#96A1B4"/>
<path d="M0.527344 24.7871C0.527344 11.5323 11.2725 0.787109 24.5273 0.787109C37.7822 0.787109 48.5273 11.5323 48.5273 24.7871C48.5273 38.0419 37.7822 48.7871 24.5273 48.7871C11.2725 48.7871 0.527344 38.0419 0.527344 24.7871Z" fill="#E6E6E6"/>
<path d="M26.9609 20.875H31.7734V22.25H26.9609V20.875ZM26.9609 24.3125H31.7734V25.6875H26.9609V24.3125ZM26.9609 27.75H31.7734V29.125H26.9609V27.75ZM18.0234 20.875H22.8359V22.25H18.0234V20.875ZM18.0234 24.3125H22.8359V25.6875H18.0234V24.3125ZM18.0234 27.75H22.8359V29.125H18.0234V27.75Z" fill="black"/>
<path d="M33.1484 17.4375H16.6484C16.2838 17.4375 15.934 17.5824 15.6762 17.8402C15.4183 18.0981 15.2734 18.4478 15.2734 18.8125V31.1875C15.2734 31.5522 15.4183 31.9019 15.6762 32.1598C15.934 32.4176 16.2838 32.5625 16.6484 32.5625H33.1484C33.5131 32.5625 33.8628 32.4176 34.1207 32.1598C34.3786 31.9019 34.5234 31.5522 34.5234 31.1875V18.8125C34.5234 18.4478 34.3786 18.0981 34.1207 17.8402C33.8628 17.5824 33.5131 17.4375 33.1484 17.4375ZM16.6484 18.8125H24.2109V31.1875H16.6484V18.8125ZM25.5859 31.1875V18.8125H33.1484V31.1875H25.5859Z" fill="black"/>
</svg>

          </button>
        </div>
      </div>

      {/* hidden audio element powering WaveSurfer */}
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioComponent;
