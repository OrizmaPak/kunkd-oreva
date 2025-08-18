import screenfull from "screenfull";
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
// @ts-ignore
import HTMLFlipBook from "react-pageflip";
import { Book } from "./BookCard";
import {
  FaHeadphones,
  FaBookOpen as FaPageIcon,
  FaExpandArrowsAlt,
  FaArrowLeft,
} from "react-icons/fa";
import kundakidpng from "@/assets/kundakids.png";
import AudioComponent from "./AudioComponent";
import queenMoremi from "@/audiobooks/QueenMoremi.mp3";
import WellDoneModal from "./WellDoneModal";
import QuizComponent from "./QuizComponent"; // Assuming you have a QuizComponent
import QuizResultModal from "./QuizResultModal"; // Assuming you have a QuizResultModal
import AnswerReview from "./AnswerReview"; // Assuming you have an AnswerReview component

// --- ADDED TRACKING IMPORTS ---
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import {
  useContentTracking,
  useContentSchoolTracking,
  useLearningHour,
} from "@/api/queries";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";

export interface Page {
  id: number;
  imageUrl?: string;
  text: string;
}

export interface ReadingHandle {
  showQuiz: () => void; // 👈 parent can call this
}

export interface ReadingComponentProps {
  book: Book;
  pages: Page[];
  onExit: () => void;
  onRetake: () => void;
  innerCoverUrl?: string;
  /** whether to include front, cover & title pages */
  withIntroPages?: boolean;
  onViewAnswers?: () => void;
  onAnswersUpdate?: (answers: UserAnswer[] | null) => void;
}

type SpreadPage =
  | { type: "front" }
  | { type: "title-left" }
  | { type: "title-right" }
  | (Page & { type: "text" })
  | (Page & { type: "image" });

interface FlipProps {
  spread: SpreadPage[];
  size: { width: number; height: number };
  onFlip: (e: any) => void;
  fontSize: number;
  book: Book;
  showCover: boolean; // whether we rendered the intro spreads
}

const FlipBook = React.memo(
  React.forwardRef((props: FlipProps, ref) => (
    // @ts-ignore
    <HTMLFlipBook
      ref={ref}
      width={props.size.width}
      height={props.size.height}
      size="stretch"
      showPageCorners
      drawShadow
      mobileScrollSupport={true}
      showCover={props.showCover} // 🔹 use prop so we can turn it off
      onFlip={props.onFlip}
      className="rounded-2xl shadow-2xl"
    >
      {props.spread.map((page, idx) => {
        const style = { width: props.size.width / 2, height: props.size.height };

        switch (page.type) {
          case "front":
            return (
              <div
                key="front"
                className="flex items-center justify-center bg-[#FCFBF6] rounded-2xl border-2 border-[#e2dccf]"
                style={style}
              >
                <img
                  src={props.book.coverUrl}
                  alt="Cover"
                  className="w-[100%] h-[100%] object-cover rounded"
                />
              </div>
            );
          case "title-left":
            return (
              <div
                key="title-left"
                className="flex items-center justify-center bg-[#FCFBF6] rounded-2xl border-2 border-[#e2dccf]"
                style={style}
              >
                <img
                  src={kundakidpng}
                  alt="Kunda Kids"
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
            );
          case "title-right":
            return (
              <div
                key="title-right"
                className=" relative flex items-center justify-center bg-[#FCFBF6] w-[100%] h-[100%] rounded-2xl border-2 border-[#e2dccf] p-4"
                style={style}
              >
                <div className=" relative w-full h-full flex justify-center items-center">
                  <h3 className="text-2xl font-bold text-gray-800 text-center relative">
                    {props.book.title}
                  </h3>
                </div>
              </div>
            );
          case "text":
            return (
              <div
                key={`text-${page.id}`}
                className="relative flex h-full items-center bg-[#FCFBF6] rounded-2xl border-2 border-[#e2dccf] p-4 overflow-hidden"
                style={style}
              >
                <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
                  <p
                    style={{
                      fontSize: `${props.fontSize}px`,
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                    className="font-semibold h-full text-gray-800 whitespace-pre-wrap w-[80%] overflow-auto"
                  >
                    <span dangerouslySetInnerHTML={{ __html: page.text }} />
                  </p>
                  <style>
                    {`
                      p::-webkit-scrollbar {
                        display: none;
                      }
                    `}
                  </style>
                  {/* page number */}
                </div>
                  <div className="fixed bottom-2 right-2 text-xs text-gray-500">
                    Page{" "}
                    {
                      /* 🔹 correct numbering based on showCover (intro) */
                      props.showCover
                        ? Math.ceil(idx / 2) - 1
                        : Math.floor(idx / 2) + 1
                    }
                  </div>
              </div>
            );
          case "image":
            return (
              <div
                key={`img-${page.id}`}
                className="flex items-center justify-center bg-[#FCFBF6] rounded-2xl border-2 border-[#e2dccf] p-4"
                style={style}
              >
                {page.imageUrl ? (
                  <div className="relative w-full h-full flex justify-center items-center">
                    {/* page number */}
                    <div className="fixed bottom-2 left-2 text-xs text-gray-500">
                      Page{" "}
                      {
                        /* 🔹 correct numbering based on showCover */
                        props.showCover
                          ? Math.ceil(idx / 2) - 1
                          : Math.floor(idx / 2) + 1
                      }
                    </div>
                    <img
                      src={page.imageUrl}
                      alt={`Page ${page.id}`}
                      className="w-[352.197509765625px] h-[352.197509765625px] object-contain rounded-[52.83px]"
                    />
                  </div>
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </HTMLFlipBook>
  ))
);

const ReadingComponent = forwardRef<ReadingHandle, ReadingComponentProps>(
  ({ book, pages, onExit, onRetake, innerCoverUrl, withIntroPages = true, onViewAnswers, onAnswersUpdate }, ref) => {
    const shellRef = useRef<HTMLDivElement>(null);
    const flipRef = useRef<any>(null);

    // --- TRACKING STATE ---
    // tracking
    const contentId = book.id;
    const profileId = sessionStorage.getItem("profileId");
    const { mutate } = useContentTracking();
    const { mutate: mutateSchool } = useContentSchoolTracking();
    const { mutate: mutateLearning } = useLearningHour();
    const [user] = useStore(getUserState);

    // current page & reading timer
    const [currentPage, setCurrentPage] = useState(0);
    const [elapsed, setElapsed] = useState(0);   // seconds total
    const [delay, setDelay] = useState(0);       // heartbeat ticks
    const [lastTime, setLastTime] = useState(0); // last second flushed
    const [isReading, setIsReading] = useState(true); // treat open as reading

    const [size, setSize] = useState({ width: 450, height: 100 });
    const [isFull, setIsFull] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [showDone, setShowDone] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [quizStats, setQuizStats] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState<UserAnswer[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState<"options" | "pages" | "font">(
      "options"
    );
    const [fontSize, setFontSize] = useState(16);

    // console.log('onViewAnswers11', onViewAnswers);

    // 👇 expose the setter to the parent
    useImperativeHandle(ref, () => ({
      showQuiz: () => setShowQuiz(true),
    }));

    // fullscreen handlers
    const toggleFull = async () => {
      if (!screenfull.isEnabled || !shellRef.current) return;
      if (screenfull.isFullscreen) {
        await screenfull.exit();
        setIsFull(false);
      } else {
        await screenfull.request(shellRef.current);
        setIsFull(true);
      }
    };

    useEffect(() => {
      if (quizAnswers !== null) {
        onAnswersUpdate?.(quizAnswers);
      }
      if (quizAnswers) {
        console.log('quizAnswers rc', quizAnswers);
        onViewAnswers?.();
      }
    }, [quizAnswers, onViewAnswers, onAnswersUpdate]);

    useEffect(() => {
      const onChange = () => setIsFull(screenfull.isFullscreen);
      screenfull.on("change", onChange);
      return () => void screenfull.off("change", onChange);
    }, []);

    // build the spread: front, covers, then for each Page → [image, text]
    const spread = useMemo<SpreadPage[]>(() => {
      // build the main content pages
      const content = pages.flatMap((p) => [
        { ...p, type: "image" as const },
        { ...p, type: "text" as const },
      ]);

      if (withIntroPages) {
        const front: SpreadPage = { type: "front" };
        const tl: SpreadPage = { type: "title-left" };
        const tr: SpreadPage = { type: "title-right" };
        return [front, tl, tr, ...content];
      }

      // skip intro spreads and start directly at page 1
      return content;
    }, [pages, withIntroPages]);

    // responsive sizing
    useEffect(() => {
      const onResize = () => {
        const w = Math.min(450, window.innerWidth * 0.9);
        setSize({ width: w, height: (w * 400) / 450 });
      };
      window.addEventListener("resize", onResize);
      onResize();
      return () => window.removeEventListener("resize", onResize);
    }, []);

    // --- FLIPBOOK PAGE EVENT (TRACKING) ---
    const onFlip = React.useCallback(
      (e: any) => {
        // many libs expose e.data for the page index; fall back safely
        const page = typeof e?.data === "number" ? e.data : currentPage;
        setCurrentPage(page);
        setIsReading(true);
      },
      [currentPage]
    );

    // --- HEARTBEAT TIMER (only while reading) ---
    useEffect(() => {
      let interval: number | undefined;
      if (isReading) {
        interval = window.setInterval(() => {
          setDelay((d) => d + 1);
          setElapsed((s) => s + 5);
        }, 5000);
      }
      return () => {
        if (interval) window.clearInterval(interval);
      };
    }, [isReading]);

    // --- SEND "ONGOING" PROGRESS EVERY HEARTBEAT ---
    useEffect(() => {
      if (!delay) return;
      if (!contentId) return;

      const now = Math.ceil(elapsed);
      if (now <= 0) return;

      const payload = {
        content_id: Number(contentId),
        status: "ongoing",
        pages_read: Math.max(1, currentPage), // backend expects a number
        timespent: now,
      };

      const onErr = (err: any) =>
        notifications.show({ title: "Notification", message: getApiErrorMessage(err) });

      try {
        if (user?.role === "user") {
          mutate(
            { profile_id: Number(profileId), ...payload },
            {
              onSuccess: () => {
                console.log("[TRACK][read][user] ongoing ok", payload);
                setLastTime(now);
              },
              onError: (err) => {
                console.log("[TRACK][read][user] ongoing failed", payload, err);
                onErr(err);
              },
            }
          );
        } else {
          mutateSchool(
            { ...payload },
            {
              onSuccess: () => {
                console.log("[TRACK][read][school] ongoing ok", payload);
                setLastTime(now);
              },
              onError: (err) => {
                console.log("[TRACK][read][school] ongoing failed", payload, err);
                onErr(err);
              },
            }
          );
        }

        const delta = Math.max(0, now - lastTime);
        mutateLearning(
          {
            content_id: Number(contentId),
            profile_id: Number(profileId),
            timespent: delta,
          },
          {
            onSuccess: () => console.log("[TRACK][read] learning-hour ok", { delta }),
            onError: (err) => console.log("[TRACK][read] learning-hour failed", err),
          }
        );
      } catch (err) {
        console.log("[TRACK][read] unexpected error", err);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay]);

    // --- FLUSH COMPLETE (when user finishes or exits) ---
    const flushComplete = () => {
      if (!contentId) return;
      const now = Math.ceil(elapsed);
      const payload = {
        content_id: Number(contentId),
        status: "complete",
        pages_read: Math.max(1, currentPage),
        timespent: now,
      };
      if (user?.role === "user") {
        mutate(
          { profile_id: Number(profileId), ...payload },
          {
            onSuccess: () => console.log("[TRACK][read] complete ok", payload),
            onError: (err) =>
              console.log("[TRACK][read] complete failed", payload, err),
          }
        );
      } else {
        mutateSchool(
          { ...payload },
          {
            onSuccess: () => console.log("[TRACK][read] complete ok (school)", payload),
            onError: (err) =>
              console.log("[TRACK][read] complete failed (school)", payload, err),
          }
        );
      }
    };

    // modal handlers
    const openModal = (view: "options" | "pages" | "font" = "options") => {
      setModalView(view);
      setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const goBack = () => setModalView("options");

    /* jumpToPage replaces the old implementation */
    const jumpToPage = (pageNum: number) => {
      const startOffset = withIntroPages ? 3 : 0; // 🔹 adjust for intro toggle
      const targetIndex = startOffset + (pageNum - 1) * 2;
      flipRef.current?.pageFlip().flip(targetIndex);
      setIsModalOpen(false); // close picker
    };

    const isLastPage = currentPage === spread.length -2;
    const handleNext = () => {
      if (isLastPage) {
        flushComplete(); // --- TRACKING: mark complete
        setShowDone(true);            // open “Well-done” modal
      } else {
        flipRef.current.pageFlip().flipNext();
      }
    };

    // --- WRAP onExit to flush complete before exit ---
    const handleExit = () => {
      flushComplete();
      onExit();
    };

    // ─── UNIFIED RENDER ─────────────────────────────────────────
    // Everything below now renders inside the same main container,
    // including breadcrumbs that update for Reading, Audio, Quiz, and Result.
    return (
      <div id="reader-shell" ref={shellRef} className="relative mx-auto w-full max-w-[90vw] py-6">

        {/* ─── (Removed internal breadcrumbs—parent will render the main crumb) ─── */}

        {/* Conditional content: Quiz, Audio, or Reading */}
        {showQuiz ? (
          <QuizComponent
            book={book}
            onComplete={(stats, answers) => {
              setShowQuiz(false);
              setQuizStats(stats);
              setQuizAnswers(answers);
              setShowResult(true);
            }}
            onExit={() => {
              setShowQuiz(false);
            }}
            onRetake={onRetake}
          />
        ) : showAudio ? (
          <div className="relative mx-auto max-w-[100vw]">
            <AudioComponent
              book={book}
              audioSrc={queenMoremi}
              onClose={() => setShowAudio(false)}
              onRead={() => setShowAudio(false)}
              onComplete={() => setShowDone(true)}
            />
          </div>
        ) : (
          <>
            {/* Existing reading UI: Exit, Title, FlipBook, Toolbar, Prev/Next */}
            {/* Exit */}
            <button
              onClick={handleExit}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 z-10"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
              {book.title}
            </h2>

            {/* Flipbook */}
            <div
              className={`flex justify-center p-1 ${
                withIntroPages ? "" : "bg-white"
              }`}                                   /* 🔹 white background when intro skipped */
              style={
                withIntroPages
                  ? {
                      backgroundImage:
                        'url(https://t4.ftcdn.net/jpg/02/23/06/05/360_F_223060577_Up871tVFzW9s3J5y6ILNQnDiPeOOsBTC.jpg)',
                      backgroundSize: "cover",
                    }
                  : undefined
              }
            >
              <FlipBook
                ref={flipRef}
                spread={spread}
                size={size}
                onFlip={onFlip}
                fontSize={fontSize}
                book={book}
                showCover={withIntroPages}          /* 🔹 hard-cover only if intro pages present */
              />
            </div>

            {/* Toolbar */}
            <div className="mt-4 flex justify-center gap-12">
              <button
                onClick={() => setShowAudio(true)}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800 hidden"
                disabled
              >
              
              <svg width="49" height="64" viewBox="0 0 49 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.02671 56.0855L3.97671 56.086C3.89227 56.3268 3.79814 56.601 3.69432 56.9087C3.59716 57.2162 3.49346 57.5372 3.38322 57.8716C3.27292 58.1993 3.16919 58.5169 3.07204 58.8245L2.93778 59.4458C2.89896 59.5728 2.85693 59.7132 2.81168 59.867C2.7731 60.0207 2.72789 60.1778 2.67604 60.3382C2.6308 60.492 2.58549 60.6391 2.54012 60.7795C2.50142 60.9199 2.4659 61.0436 2.43355 61.1505C2.36707 61.1711 2.2939 61.1885 2.21403 61.2026C2.14088 61.2232 2.05098 61.2341 1.94432 61.2351C1.73099 61.237 1.56063 61.1986 1.43323 61.1198C1.31243 61.0342 1.25126 60.9081 1.24971 60.7415C1.24903 60.6681 1.25832 60.5914 1.27758 60.5112C1.30351 60.431 1.32934 60.3407 1.35508 60.2405C1.4197 60.0199 1.50717 59.7457 1.61747 59.418C1.72771 59.0836 1.84771 58.7225 1.97745 58.3346C2.1072 57.9467 2.24025 57.5555 2.3766 57.1609C2.51961 56.7662 2.65288 56.3983 2.77639 56.0571C2.89984 55.7093 3.00715 55.4183 3.09832 55.1841C3.17788 55.1367 3.30081 55.0922 3.4671 55.0507C3.63339 55.0091 3.8032 54.9876 3.97652 54.986C4.20318 54.9839 4.41014 55.0153 4.59742 55.0802C4.79136 55.1451 4.91235 55.2506 4.96037 55.3969C5.10376 55.7622 5.25764 56.1808 5.42202 56.6526C5.5864 57.1245 5.75429 57.6163 5.92571 58.128C6.09712 58.6398 6.26175 59.1383 6.41958 59.6235C6.57742 60.1088 6.71815 60.5475 6.84179 60.9397C6.7758 61.0136 6.68303 61.0745 6.56347 61.1223C6.45057 61.17 6.31746 61.1946 6.16413 61.196C5.94414 61.198 5.78378 61.1595 5.68304 61.0804C5.58891 60.9946 5.51438 60.8653 5.45944 60.6925L5.03732 59.3863L4.9014 58.7476C4.79159 58.4086 4.68184 58.0762 4.57215 57.7506C4.46907 57.4182 4.36954 57.1091 4.27355 56.8233C4.17757 56.5375 4.09529 56.2916 4.02671 56.0855ZM2.38003 59.691L2.84084 58.6966L5.34073 58.6735L5.5399 59.6617L2.38003 59.691ZM7.64163 59.2822L7.63431 58.4922L8.86426 58.4808L8.87139 59.2508C8.87466 59.6041 8.967 59.8566 9.14842 60.0083C9.3365 60.1599 9.59386 60.2342 9.92051 60.2311C10.1338 60.2292 10.3136 60.2075 10.4599 60.1661C10.6062 60.1248 10.7158 60.0804 10.7887 60.0331L10.7742 58.4632L12.0041 58.4518L12.0196 60.1217C12.021 60.275 11.9956 60.4053 11.9432 60.5124C11.8975 60.6128 11.805 60.707 11.6658 60.795C11.4735 60.9101 11.2277 61.0057 10.9284 61.0818C10.6359 61.1646 10.2996 61.2077 9.91959 61.2112C9.45961 61.2154 9.05901 61.1525 8.71779 61.0223C8.37657 60.8921 8.1113 60.6846 7.92199 60.3997C7.73928 60.108 7.64583 59.7355 7.64163 59.2822ZM12.0086 58.9317L10.7786 58.9431L10.7545 56.3432C10.8077 56.3294 10.8843 56.3154 10.9842 56.3011C11.0906 56.2801 11.2005 56.2691 11.3139 56.2681C11.5472 56.2659 11.7176 56.3043 11.825 56.3833C11.9324 56.4623 11.9871 56.6118 11.9891 56.8318L12.0086 58.9317ZM8.8687 58.9608L7.63876 58.9722L7.61467 56.3723C7.66788 56.3585 7.74442 56.3445 7.84429 56.3302C7.9441 56.3093 8.05401 56.2983 8.174 56.2971C8.40733 56.295 8.57769 56.3334 8.68509 56.4124C8.79249 56.4914 8.84721 56.6409 8.84925 56.8609L8.8687 58.9608ZM16.4327 59.9708L16.4036 56.8309L17.6335 56.8195L17.6638 60.0894C17.6652 60.2361 17.633 60.3597 17.5673 60.4603C17.5081 60.5542 17.409 60.6451 17.2698 60.7331C17.1108 60.8412 16.8916 60.9366 16.6124 61.0192C16.3399 61.1084 16.027 61.1546 15.6736 61.1579C15.147 61.1628 14.6862 61.0804 14.2913 60.9107C13.903 60.7343 13.6005 60.4637 13.3837 60.0991C13.167 59.7277 13.0559 59.2587 13.0507 58.6921C13.0453 58.1121 13.1476 57.6345 13.3574 57.2592C13.574 56.8838 13.8648 56.6078 14.2298 56.4311C14.5948 56.2477 15.0006 56.1539 15.4472 56.1498C15.6939 56.1475 15.9175 56.1754 16.1181 56.2336C16.3253 56.2916 16.4926 56.3601 16.62 56.4389L16.6297 57.4889C16.5221 57.3899 16.3813 57.3045 16.2073 57.2328C16.0333 57.1611 15.833 57.1262 15.6063 57.1283C15.3597 57.1306 15.1368 57.186 14.9378 57.2945C14.7388 57.3964 14.5836 57.5645 14.4725 57.7989C14.3612 58.0266 14.3073 58.3238 14.3107 58.6904C14.3155 59.2104 14.4391 59.5893 14.6813 59.827C14.9235 60.0648 15.2479 60.1818 15.6546 60.178C15.8346 60.1764 15.9877 60.1549 16.114 60.1138C16.2403 60.0726 16.3465 60.0249 16.4327 59.9708ZM17.6359 57.0695L16.406 57.0909L16.3821 54.511C16.4286 54.4973 16.5018 54.4799 16.6016 54.459C16.7081 54.438 16.818 54.427 16.9313 54.426C17.1713 54.4237 17.3451 54.4655 17.4525 54.5511C17.5599 54.6301 17.6146 54.7763 17.6166 54.9896L17.6359 57.0695ZM18.8594 54.8481C18.8576 54.6548 18.9228 54.4908 19.0549 54.3563C19.1936 54.2217 19.3663 54.1534 19.573 54.1515C19.7863 54.1495 19.9569 54.2146 20.0848 54.3467C20.2194 54.4788 20.2875 54.6415 20.2893 54.8349C20.2911 55.0215 20.2259 55.1855 20.0939 55.3267C19.9685 55.4612 19.7991 55.5294 19.5858 55.5314C19.3791 55.5333 19.2052 55.4683 19.0639 55.3362C18.9293 55.1975 18.8611 55.0348 18.8594 54.8481ZM18.9918 58.347L20.2318 58.3355L20.256 60.9554C20.2029 60.9759 20.1264 60.9933 20.0265 61.0076C19.9267 61.0285 19.8168 61.0395 19.6968 61.0406C19.4701 61.0427 19.2998 61.0043 19.1857 60.9253C19.0716 60.8397 19.0135 60.6903 19.0115 60.4769L18.9918 58.347ZM20.2376 58.9655L18.9976 58.977L18.9728 56.2971C19.026 56.2766 19.1025 56.2593 19.2024 56.245C19.3088 56.224 19.4221 56.213 19.5421 56.2118C19.7754 56.2097 19.9458 56.2514 20.0532 56.3371C20.1606 56.4161 20.2154 56.5656 20.2174 56.7856L20.2376 58.9655ZM26.2014 58.5503C26.2062 59.0636 26.1103 59.5111 25.9138 59.893C25.7173 60.2682 25.4367 60.5608 25.0719 60.7708C24.7138 60.9741 24.2881 61.0781 23.7948 61.0827C23.3015 61.0872 22.8706 60.9912 22.5021 60.7946C22.1335 60.5914 21.8441 60.304 21.634 59.9326C21.4306 59.5612 21.3265 59.1154 21.3216 58.5955C21.3169 58.0822 21.4161 57.6379 21.6193 57.2627C21.8225 56.8874 22.1065 56.5981 22.4713 56.3947C22.836 56.1847 23.2617 56.0774 23.7484 56.0729C24.235 56.0684 24.6593 56.1678 25.0212 56.3711C25.3897 56.5677 25.6757 56.8551 25.8792 57.2332C26.0893 57.6046 26.1967 58.0436 26.2014 58.5503ZM23.7575 57.0528C23.3908 57.0562 23.102 57.1922 22.8912 57.4609C22.687 57.7294 22.5871 58.1037 22.5916 58.5837C22.5961 59.077 22.703 59.456 22.9121 59.7208C23.1212 59.9789 23.4124 60.1062 23.7857 60.1027C24.1524 60.0993 24.4378 59.9633 24.642 59.6948C24.8461 59.4262 24.946 59.0486 24.9415 58.5619C24.9371 58.0886 24.8303 57.7196 24.6212 57.4549C24.412 57.1834 24.1241 57.0494 23.7575 57.0528ZM29.6015 56.0187C30.0281 56.0147 30.4123 56.1045 30.754 56.288C31.1023 56.4648 31.3782 56.7389 31.5817 57.1104C31.7851 57.4752 31.8893 57.9342 31.8944 58.4875C31.8996 59.0475 31.7973 59.5151 31.5874 59.8904C31.3842 60.2657 31.0935 60.5484 30.7152 60.7385C30.3437 60.9287 29.9079 61.026 29.4079 61.0307C29.0279 61.0342 28.6942 60.9906 28.4066 60.8999C28.1259 60.8159 27.8882 60.7147 27.6938 60.5965C27.5529 60.4978 27.4486 60.3988 27.381 60.2994C27.3201 60.1933 27.2888 60.0636 27.2874 59.9103L27.2575 56.6804L28.4875 56.669L28.5166 59.8189C28.6039 59.8781 28.721 59.9337 28.8682 59.9856C29.022 60.0309 29.1955 60.0526 29.3888 60.0508C29.7688 60.0473 30.071 59.9178 30.2953 59.6624C30.5262 59.4069 30.6393 59.0192 30.6345 58.4992C30.6296 57.9726 30.5127 57.5903 30.2839 57.3524C30.055 57.1145 29.7572 56.9973 29.3906 57.0007C29.1572 57.0028 28.951 57.0481 28.7718 57.1364C28.5926 57.2247 28.4402 57.3261 28.3146 57.4406L28.2253 56.4414C28.3778 56.3467 28.567 56.2549 28.7928 56.1662C29.0253 56.0707 29.2948 56.0215 29.6015 56.0187ZM28.4901 56.949L27.2601 56.9604L27.2365 54.4105C27.2897 54.3967 27.3662 54.3793 27.466 54.3584C27.5658 54.3374 27.6757 54.3264 27.7957 54.3253C28.029 54.3232 28.1994 54.3649 28.3069 54.4506C28.4143 54.5296 28.469 54.6758 28.471 54.8891L28.4901 56.949ZM37.5877 58.4448C37.5924 58.9581 37.4966 59.4057 37.3001 59.7875C37.1035 60.1627 36.8229 60.4553 36.4582 60.6654C36.1 60.8687 35.6743 60.9726 35.181 60.9772C34.6877 60.9818 34.2568 60.8858 33.8883 60.6892C33.5197 60.4859 33.2304 60.1986 33.0203 59.8272C32.8168 59.4557 32.7127 59.01 32.7079 58.49C32.7031 57.9767 32.8023 57.5324 33.0055 57.1572C33.2087 56.782 33.4927 56.4926 33.8575 56.2893C34.2223 56.0792 34.648 55.9719 35.1346 55.9674C35.6212 55.9629 36.0455 56.0623 36.4074 56.2656C36.7759 56.4622 37.0619 56.7496 37.2654 57.1277C37.4756 57.4991 37.583 57.9382 37.5877 58.4448ZM35.1437 56.9474C34.777 56.9508 34.4883 57.0868 34.2774 57.3554C34.0732 57.624 33.9734 57.9983 33.9778 58.4782C33.9824 58.9715 34.0892 59.3506 34.2984 59.6153C34.5074 59.8734 34.7986 60.0007 35.1719 59.9972C35.5386 59.9938 35.824 59.8579 36.0282 59.5893C36.2324 59.3207 36.3322 58.9431 36.3277 58.4565C36.3233 57.9832 36.2166 57.6141 36.0074 57.3494C35.7983 57.078 35.5103 56.944 35.1437 56.9474ZM43.2808 58.3921C43.2855 58.9054 43.1897 59.3529 42.9932 59.7348C42.7967 60.11 42.516 60.4026 42.1513 60.6126C41.7932 60.8159 41.3674 60.9199 40.8741 60.9245C40.3808 60.929 39.9499 60.833 39.5814 60.6364C39.2128 60.4332 38.9235 60.1458 38.7134 59.7744C38.5099 59.403 38.4058 58.9572 38.401 58.4373C38.3962 57.924 38.4954 57.4797 38.6986 57.1044C38.9018 56.7292 39.1858 56.4399 39.5506 56.2365C39.9154 56.0265 40.3411 55.9192 40.8277 55.9147C41.3144 55.9102 41.7386 56.0096 42.1005 56.2129C42.469 56.4095 42.755 56.6969 42.9586 57.075C43.1687 57.4464 43.2761 57.8854 43.2808 58.3921ZM40.8368 56.8946C40.4701 56.898 40.1814 57.034 39.9705 57.3027C39.7664 57.5712 39.6665 57.9455 39.6709 58.4255C39.6755 58.9188 39.7823 59.2978 39.9915 59.5626C40.2005 59.8207 40.4917 59.948 40.865 59.9445C41.2317 59.9411 41.5171 59.8051 41.7213 59.5366C41.9255 59.268 42.0253 58.8904 42.0208 58.4037C42.0164 57.9304 41.9097 57.5614 41.7006 57.2967C41.4914 57.0252 41.2034 56.8912 40.8368 56.8946ZM46.1475 58.7455L45.2823 58.1835L47.5313 55.9026C47.778 55.907 47.9752 55.9651 48.1229 56.0771C48.2705 56.1824 48.3452 56.3217 48.3468 56.4951C48.3481 56.6351 48.2992 56.7622 48.2003 56.8764C48.108 56.9906 47.966 57.1319 47.7742 57.3004L46.1475 58.7455ZM45.3139 58.3632L46.2597 57.9044L48.6099 60.0728C48.592 60.293 48.5269 60.4669 48.4148 60.5946C48.3026 60.7223 48.1465 60.7871 47.9465 60.7889C47.7932 60.7904 47.6529 60.755 47.5255 60.6828C47.3981 60.604 47.267 60.4852 47.1322 60.3265L45.3139 58.3632ZM44.3514 58.0921L45.5819 58.1407L45.6058 60.7206C45.5527 60.7411 45.4761 60.7585 45.3763 60.7728C45.2765 60.7937 45.1666 60.8047 45.0466 60.8058C44.8199 60.8079 44.6495 60.7695 44.5355 60.6905C44.428 60.6049 44.3733 60.4554 44.3713 60.242L44.3514 58.0921ZM45.5877 58.7707L44.3572 58.7221L44.3158 54.2523C44.369 54.2385 44.4455 54.2211 44.5454 54.2002C44.6452 54.1792 44.7551 54.1682 44.8751 54.1671C45.1084 54.165 45.2788 54.2067 45.3862 54.2924C45.4937 54.3714 45.5483 54.5176 45.5503 54.7309L45.5877 58.7707Z" fill="#96A1B4"/>
<path d="M0.954712 24.71C0.954712 11.4551 11.6999 0.709961 24.9547 0.709961C38.2095 0.709961 48.9547 11.4551 48.9547 24.71C48.9547 37.9648 38.2095 48.71 24.9547 48.71C11.6999 48.71 0.954712 37.9648 0.954712 24.71Z" fill="#E6E6E6"/>
<path d="M15.6212 30.957L15.6212 24.957C15.6212 22.5701 16.5694 20.2809 18.2573 18.5931C19.9451 16.9052 22.2343 15.957 24.6212 15.957C27.0082 15.957 29.2973 16.9052 30.9852 18.5931C32.673 20.2809 33.6212 22.5701 33.6212 24.957L33.6212 30.957M33.6212 31.957C33.6212 32.4875 33.4105 32.9962 33.0354 33.3712C32.6604 33.7463 32.1516 33.957 31.6212 33.957H30.6212C30.0908 33.957 29.5821 33.7463 29.207 33.3712C28.8319 32.9962 28.6212 32.4875 28.6212 31.957L28.6212 28.957C28.6212 28.4266 28.8319 27.9179 29.207 27.5428C29.5821 27.1677 30.0908 26.957 30.6212 26.957H33.6212L33.6212 31.957ZM15.6212 31.957C15.6212 32.4875 15.8319 32.9962 16.207 33.3712C16.5821 33.7463 17.0908 33.957 17.6212 33.957H18.6212C19.1516 33.957 19.6604 33.7463 20.0354 33.3712C20.4105 32.9962 20.6212 32.4875 20.6212 31.957L20.6212 28.957C20.6212 28.4266 20.4105 27.9179 20.0354 27.5428C19.6604 27.1677 19.1516 26.957 18.6212 26.957H15.6212L15.6212 31.957Z" stroke="black" stroke-width="1.4418" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


              </button>

              {/* Page modal trigger */}
              <button
                onClick={() => openModal("options")}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800  z-[100]"
              >
               <svg width="50" height="64" viewBox="0 0 50 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.03 58.0953L16.77 58.0884C17.1766 58.0847 17.4958 57.9917 17.7274 57.8095C17.959 57.6207 18.0732 57.3497 18.0699 56.9963C18.0666 56.6364 17.9508 56.3707 17.7225 56.1995C17.5009 56.0282 17.1835 55.9445 16.7702 55.9483C16.6235 55.9497 16.4869 55.9576 16.3604 55.9721C16.2338 55.98 16.1172 55.9944 16.0108 56.0154L16.03 58.0953ZM16.8493 59.0977L14.7794 59.1169L14.7466 55.5771C14.7455 55.4571 14.778 55.3634 14.844 55.2961C14.9168 55.2288 15.0096 55.1746 15.1225 55.1336C15.3353 55.0649 15.5881 55.0126 15.8811 54.9765C16.1741 54.9405 16.4473 54.9213 16.7006 54.9189C17.5806 54.9108 18.239 55.0914 18.6757 55.4607C19.1192 55.8299 19.3439 56.3345 19.3498 56.9745C19.3537 57.4011 19.2605 57.772 19.0701 58.0871C18.8796 58.4022 18.5986 58.6482 18.2269 58.825C17.8552 59.0017 17.396 59.0927 16.8493 59.0977ZM14.7741 58.5469L16.0441 58.5352L16.068 61.1151C16.0148 61.1356 15.9317 61.153 15.8185 61.1674C15.712 61.1884 15.5987 61.1994 15.4788 61.2005C15.2388 61.2027 15.065 61.161 14.9576 61.0753C14.85 60.983 14.7953 60.8302 14.7933 60.6168L14.7741 58.5469ZM22.1651 60.2885C22.3651 60.2867 22.5449 60.265 22.7045 60.2236C22.8642 60.1821 22.9804 60.1377 23.0533 60.0903L23.0428 58.9504L22.0537 59.0595C21.7806 59.0821 21.5712 59.144 21.4254 59.2454C21.2863 59.34 21.2176 59.4806 21.2193 59.6673C21.2211 59.8606 21.2992 60.0132 21.4536 60.1251C21.608 60.237 21.8451 60.2915 22.1651 60.2885ZM22.0773 56.2092C22.7306 56.2031 23.2519 56.3383 23.6412 56.6147C24.0303 56.8845 24.2277 57.316 24.2332 57.9093L24.2545 60.2092C24.256 60.3692 24.2171 60.4962 24.138 60.5903C24.0655 60.6843 23.9696 60.7685 23.8503 60.843C23.6647 60.9514 23.4288 61.0402 23.1428 61.1095C22.8568 61.1855 22.5338 61.2252 22.1738 61.2285C21.5072 61.2347 20.9827 61.1129 20.6004 60.8631C20.218 60.6066 20.0244 60.225 20.0198 59.7184C20.0156 59.2717 20.1525 58.9305 20.4303 58.6946C20.7147 58.4519 21.1267 58.3014 21.6662 58.2431L23.0248 58.0905L23.0231 57.9105C23.0207 57.6438 22.9255 57.4514 22.7378 57.3331C22.5567 57.2148 22.2995 57.1572 21.9661 57.1603C21.7062 57.1627 21.4531 57.1983 21.2071 57.2673C20.9611 57.3362 20.7418 57.4183 20.5494 57.5134C20.4822 57.4607 20.4215 57.3879 20.3673 57.2951C20.3131 57.2022 20.2856 57.1058 20.2846 57.0058C20.2824 56.7658 20.4141 56.5879 20.6797 56.4721C20.8656 56.3838 21.0816 56.3184 21.3279 56.2761C21.5809 56.2338 21.8307 56.2115 22.0773 56.2092ZM27.4855 60.8593C27.0922 60.8629 26.7282 60.793 26.3935 60.6494C26.0588 60.4992 25.7898 60.2516 25.5866 59.9068C25.3834 59.562 25.2792 59.1063 25.2739 58.5397C25.2691 58.0197 25.3651 57.5855 25.5619 57.237C25.7652 56.8817 26.0495 56.6157 26.4145 56.439C26.7861 56.2556 27.212 56.1616 27.6919 56.1572C28.0319 56.154 28.3456 56.1945 28.6331 56.2785C28.9272 56.3624 29.1615 56.4602 29.3359 56.572C29.4499 56.6443 29.5407 56.7334 29.6083 56.8395C29.6826 56.9388 29.7204 57.0618 29.7218 57.2084L29.7507 60.3283L28.5507 60.3394L28.5228 57.3295C28.4357 57.277 28.3286 57.2313 28.2016 57.1925C28.0745 57.1537 27.9177 57.1351 27.731 57.1369C27.3644 57.1403 27.0654 57.2564 26.8342 57.4852C26.6096 57.7139 26.4995 58.0616 26.5039 58.5283C26.5086 59.0416 26.6219 59.4006 26.8438 59.6052C27.0724 59.8097 27.35 59.9105 27.6767 59.9075C27.93 59.9051 28.1329 59.8599 28.2854 59.7718C28.4446 59.6837 28.5771 59.5891 28.6828 59.4881L28.7321 60.4877C28.613 60.5822 28.4471 60.667 28.2344 60.7424C28.0285 60.8176 27.7788 60.8566 27.4855 60.8593ZM28.5773 61.0492L28.5682 60.0692L29.7482 60.0583L29.7576 61.0783C29.7618 61.5316 29.6619 61.8992 29.4578 62.1811C29.2538 62.4697 28.9724 62.6823 28.6137 62.8189C28.2616 62.9555 27.8656 63.0259 27.4256 63.0299C27.0789 63.0332 26.7753 63.0026 26.5147 62.9384C26.2608 62.8741 26.0735 62.8058 25.9528 62.7336C25.7316 62.6023 25.6199 62.42 25.6177 62.1867C25.6166 62.0667 25.6423 61.9597 25.6947 61.8659C25.7472 61.7721 25.8099 61.7015 25.8828 61.6542C26.0504 61.7593 26.2579 61.8507 26.5053 61.9284C26.7594 62.0061 27.0264 62.0436 27.3064 62.041C27.7064 62.0373 28.019 61.9544 28.2442 61.7923C28.4694 61.6369 28.5804 61.3892 28.5773 61.0492ZM31.5488 59.2516L31.4909 58.3921L34.167 57.9673C34.1447 57.7141 34.046 57.4951 33.8709 57.31C33.6959 57.1249 33.4417 57.034 33.1084 57.0371C32.7684 57.0402 32.4862 57.1628 32.2617 57.4049C32.0372 57.6403 31.9237 57.9781 31.9211 58.4181L31.9559 58.9378C32.0199 59.3639 32.1861 59.6757 32.4546 59.8732C32.7298 60.0707 33.074 60.1675 33.4873 60.1637C33.7673 60.1611 34.027 60.1187 34.2662 60.0365C34.5054 59.9476 34.6945 59.8525 34.8336 59.7512C34.9275 59.8103 35.0015 59.8863 35.0557 59.9791C35.1165 60.0652 35.1474 60.1616 35.1484 60.2683C35.15 60.4416 35.0747 60.5923 34.9226 60.7204C34.7703 60.8418 34.5646 60.9371 34.3052 61.0061C34.0458 61.0752 33.7495 61.1113 33.4161 61.1144C32.9028 61.1191 32.4453 61.03 32.0436 60.8471C31.6485 60.6574 31.3359 60.3736 31.1057 59.9957C30.8822 59.6178 30.7678 59.1455 30.7625 58.5788C30.7588 58.1722 30.8188 57.815 30.9426 57.5071C31.0665 57.1993 31.2341 56.9444 31.4456 56.7424C31.6636 56.5337 31.9155 56.3781 32.2013 56.2754C32.4869 56.1661 32.7864 56.11 33.0998 56.1071C33.5397 56.103 33.9239 56.1895 34.2522 56.3664C34.5871 56.5367 34.8494 56.7776 35.0389 57.0892C35.2352 57.4007 35.3352 57.7598 35.3389 58.1664C35.3407 58.3531 35.292 58.4936 35.1928 58.5878C35.1003 58.6753 34.9675 58.7299 34.7943 58.7515L31.5488 59.2516Z" fill="#96A1B4"/>
<path d="M1 24.9512C1 11.6963 11.7452 0.951172 25 0.951172C38.2548 0.951172 49 11.6963 49 24.9512C49 38.206 38.2548 48.9512 25 48.9512C11.7452 48.9512 1 38.206 1 24.9512Z" fill="#E6E6E6"/>
<path d="M25 33C23.6855 32.0049 22.1638 31.3707 20.5681 31.1573C19.4364 30.91 18.2834 30.7932 17.1286 30.8088C16.9809 30.8102 16.8343 30.7801 16.6975 30.7202C16.5606 30.6604 16.4361 30.5719 16.3312 30.4601C16.2262 30.3482 16.1429 30.2151 16.0861 30.0684C16.0293 29.9217 16 29.7643 16 29.6054L16.0204 18.2068C16.0198 17.901 16.1275 17.6063 16.3216 17.3828C16.5157 17.1593 16.7816 17.0236 17.0654 17.0034C18.2409 16.9783 19.4154 17.0913 20.5681 17.3404C22.1621 17.5615 23.6826 18.1941 25 19.1842M25 33V19.1842M25 33C26.3145 32.0049 27.8362 31.3707 29.4319 31.1573C30.5636 30.91 31.7166 30.7932 32.8714 30.8088C33.0191 30.8102 33.1657 30.7801 33.3025 30.7202C33.4394 30.6604 33.5639 30.5719 33.6688 30.4601C33.7738 30.3482 33.8571 30.2151 33.9139 30.0684C33.9707 29.9217 34 29.7643 34 29.6054L33.9786 18.2068C33.9792 17.9011 33.8717 17.6067 33.6778 17.3832C33.4839 17.1597 33.2182 17.0239 32.9346 17.0034C31.7591 16.9783 30.5846 17.0913 29.4319 17.3404C27.8379 17.5615 26.3174 18.1941 25 19.1842" stroke="#101928" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </button>

              <button
                onClick={toggleFull}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800 z-[100]"
              >
                 {isFull ? (
                   <svg 
                     width="49" 
                     height="63" 
                     viewBox="0 0 49 63" 
                     fill="none" 
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M1.58104 58.501L0.321095 58.5126L0.294049 55.5928C0.292135 55.3861 0.35062 55.2222 0.469503 55.1011C0.595053 54.9799 0.761156 54.9184 0.967814 54.9165C1.08114 54.9154 1.19123 54.9244 1.29808 54.9434C1.41159 54.9624 1.49508 54.9783 1.54853 54.9911L1.58104 58.501ZM0.9919 58.5964L0.98236 57.5665L3.97223 57.5388C4.00606 57.5918 4.0367 57.6615 4.06417 57.7479C4.09831 57.8343 4.11584 57.9275 4.11676 58.0275C4.11837 58.2008 4.07961 58.3345 4.00047 58.4285C3.92134 58.5226 3.80845 58.5703 3.66179 58.5717L0.9919 58.5964ZM0.977354 55.9464L0.967814 54.9165L4.28767 54.8857C4.32144 54.9321 4.35208 55.0018 4.37961 55.0949C4.41375 55.1812 4.43128 55.2744 4.4322 55.3744C4.43381 55.5477 4.39505 55.6814 4.31591 55.7755C4.23678 55.8696 4.12389 55.9173 3.97723 55.9187L0.977354 55.9464ZM0.313871 57.7327L1.58382 57.7209L1.61392 60.9708C1.56071 60.9846 1.4775 60.9987 1.3643 61.0131C1.25782 61.0341 1.14792 61.0451 1.03459 61.0461C0.794602 61.0484 0.617542 61.0067 0.503411 60.921C0.395884 60.8287 0.341164 60.6792 0.339249 60.4725L0.313871 57.7327ZM5.24592 59.137L5.2386 58.3471L6.46855 58.3357L6.47568 59.1057C6.47895 59.459 6.5713 59.7115 6.75271 59.8631C6.94079 60.0147 7.19815 60.089 7.52481 60.086C7.73813 60.084 7.91794 60.0623 8.06423 60.021C8.21052 59.9796 8.32011 59.9353 8.39301 59.8879L8.37847 58.318L9.60841 58.3066L9.62388 59.9765C9.6253 60.1299 9.59984 60.2601 9.5475 60.3673C9.50176 60.4677 9.40929 60.5619 9.2701 60.6498C9.07783 60.765 8.83204 60.8606 8.53273 60.9367C8.24015 61.0194 7.90387 61.0625 7.52388 61.066C7.0639 61.0703 6.6633 61.0073 6.32208 60.8771C5.98086 60.747 5.71559 60.5394 5.52628 60.2545C5.34357 59.9628 5.25012 59.5904 5.24592 59.137ZM9.61286 58.7866L8.38291 58.798L8.35883 56.1981C8.41204 56.1843 8.48858 56.1702 8.58845 56.156C8.69493 56.135 8.80483 56.1239 8.91816 56.1229C9.15148 56.1207 9.32184 56.1592 9.42925 56.2382C9.53665 56.3172 9.59137 56.4667 9.59341 56.6867L9.61286 58.7866ZM6.47299 58.8157L5.24305 58.8271L5.21896 56.2272C5.27217 56.2133 5.34871 56.1993 5.44858 56.185C5.54839 56.1641 5.6583 56.1531 5.77829 56.152C6.01162 56.1498 6.18198 56.1882 6.28938 56.2673C6.39678 56.3463 6.45151 56.4958 6.45354 56.7158L6.47299 58.8157ZM10.9623 58.2541L12.1928 58.3027L12.2165 60.8626C12.1634 60.883 12.0868 60.9004 11.987 60.9147C11.8872 60.9356 11.7773 60.9466 11.6573 60.9477C11.4306 60.9498 11.2602 60.9114 11.1462 60.8325C11.0387 60.7468 10.984 60.5973 10.982 60.384L10.9623 58.2541ZM12.1986 58.9326L10.9681 58.884L10.9265 54.3942C10.9731 54.3805 11.0462 54.3631 11.1461 54.3422C11.2525 54.3212 11.3624 54.3102 11.4758 54.3091C11.7158 54.3069 11.8895 54.3486 11.9969 54.4343C12.1043 54.5133 12.159 54.6595 12.161 54.8728L12.1986 58.9326ZM13.6184 58.2295L14.8489 58.2781L14.8726 60.8379C14.8195 60.8584 14.743 60.8758 14.6431 60.8901C14.5433 60.911 14.4334 60.922 14.3134 60.9231C14.0867 60.9252 13.9164 60.8868 13.8023 60.8079C13.6948 60.7222 13.6401 60.5727 13.6381 60.3594L13.6184 58.2295ZM14.8548 58.908L13.6243 58.8594L13.5827 54.3696C13.6292 54.3559 13.7024 54.3385 13.8022 54.3176C13.9087 54.2966 14.0186 54.2856 14.1319 54.2845C14.3719 54.2823 14.5456 54.324 14.6531 54.4097C14.7605 54.4887 14.8152 54.6349 14.8172 54.8482L14.8548 58.908ZM20.1031 59.9295C20.4898 59.9259 20.7757 59.8466 20.9609 59.6915C21.1461 59.5298 21.2376 59.3323 21.2355 59.0989C21.2336 58.8923 21.1587 58.7263 21.0108 58.601C20.8696 58.469 20.6519 58.361 20.3578 58.277L19.706 58.0831C19.3716 57.9728 19.0771 57.8489 18.8225 57.7112C18.5746 57.5735 18.3796 57.3953 18.2375 57.1766C18.1021 56.9512 18.0329 56.6752 18.0299 56.3485C18.0249 55.8085 18.2209 55.38 18.618 55.063C19.0217 54.7459 19.5736 54.5841 20.2736 54.5777C20.6469 54.5742 20.9772 54.6111 21.2646 54.6885C21.5586 54.7591 21.7896 54.8603 21.9575 54.9921C22.132 55.1238 22.2201 55.2797 22.2218 55.4596C22.223 55.5863 22.1907 55.6999 22.125 55.8006C22.0658 55.8944 21.9899 55.9718 21.8971 56.0327C21.7427 55.9208 21.5318 55.8261 21.2644 55.7485C20.997 55.6643 20.7066 55.6237 20.3933 55.6266C20.0466 55.6298 19.7806 55.6956 19.5951 55.824C19.4096 55.9524 19.3178 56.1232 19.3198 56.3366C19.3214 56.5099 19.386 56.6493 19.5137 56.7548C19.648 56.8602 19.8489 56.9517 20.1163 57.0292L20.6978 57.1938C21.2727 57.3619 21.7216 57.5944 22.0443 57.8914C22.367 58.1818 22.5308 58.5836 22.5355 59.0969C22.5406 59.6435 22.3347 60.0888 21.9179 60.4327C21.5077 60.7765 20.916 60.952 20.1427 60.9591C19.736 60.9629 19.3756 60.9229 19.0615 60.8392C18.7474 60.7554 18.4963 60.6377 18.3082 60.4861C18.1268 60.3345 18.0352 60.162 18.0334 59.9686C18.032 59.822 18.0775 59.6949 18.1699 59.5874C18.2622 59.4798 18.3615 59.3989 18.4676 59.3446C18.6423 59.4896 18.8669 59.6242 19.1414 59.7484C19.4159 59.8725 19.7365 59.9329 20.1031 59.9295ZM25.9957 56.8748C25.5957 56.8785 25.2603 57.0116 24.9894 57.2741C24.7251 57.5366 24.5953 57.9178 24.5999 58.4177C24.6045 58.9111 24.738 59.2832 25.0003 59.5341C25.2626 59.785 25.6004 59.9085 26.0138 59.9047C26.2604 59.9024 26.4668 59.8705 26.6329 59.809C26.8056 59.7407 26.955 59.6693 27.0809 59.5948C27.1815 59.6539 27.2588 59.7265 27.313 59.8127C27.3737 59.8921 27.4046 59.9918 27.4057 60.1118C27.4078 60.3385 27.2729 60.5264 27.0009 60.6756C26.7289 60.8181 26.3696 60.8915 25.9229 60.8956C25.4163 60.9003 24.9688 60.8144 24.5805 60.638C24.1988 60.4549 23.8962 60.1777 23.6728 59.8064C23.456 59.4351 23.345 58.9761 23.34 58.4294C23.3347 57.8628 23.4437 57.3917 23.6669 57.0163C23.8968 56.6409 24.2009 56.3614 24.5792 56.1778C24.9641 55.9876 25.3866 55.8904 25.8465 55.8861C26.2865 55.882 26.6405 55.9554 26.9086 56.1063C27.1767 56.2571 27.3118 56.4459 27.3139 56.6725C27.3148 56.7725 27.289 56.8661 27.2365 56.9533C27.1839 57.0404 27.1213 57.111 27.0484 57.165C26.9144 57.0863 26.7637 57.0176 26.5965 56.9592C26.4293 56.9007 26.229 56.8726 25.9957 56.8748ZM29.6321 57.1211L29.6448 58.491L28.4149 58.5024L28.4012 57.0325C28.3997 56.8658 28.4384 56.7255 28.5174 56.6114C28.5962 56.4906 28.7085 56.3796 28.8543 56.2783C29.0532 56.1564 29.3056 56.0541 29.6115 55.9712C29.9174 55.8884 30.247 55.8453 30.6003 55.8421C31.227 55.8363 31.5421 56.0267 31.5456 56.4133C31.5465 56.5067 31.534 56.5934 31.5081 56.6737C31.4821 56.7473 31.4494 56.8142 31.4099 56.8746C31.3431 56.8619 31.2597 56.8527 31.1596 56.8469C31.0595 56.8345 30.9528 56.8288 30.8395 56.8299C30.5995 56.8321 30.3731 56.8609 30.1602 56.9162C29.954 56.9648 29.778 57.0331 29.6321 57.1211ZM28.4111 58.0924L29.6416 58.141L29.6653 60.7009C29.6121 60.7214 29.5356 60.7388 29.4358 60.7531C29.3359 60.774 29.226 60.785 29.106 60.7861C28.8794 60.7882 28.709 60.7498 28.595 60.6708C28.4875 60.5852 28.4328 60.4357 28.4308 60.2223L28.4111 58.0924ZM32.7873 58.9519L32.7294 58.0924L35.4056 57.6676C35.3832 57.4145 35.2845 57.1954 35.1095 57.0103C34.9344 56.8253 34.6802 56.7343 34.3469 56.7374C34.0069 56.7405 33.7247 56.8632 33.5003 57.1053C33.2758 57.3407 33.1622 57.6784 33.1596 58.1185L33.1944 58.6382C33.2584 59.0642 33.4246 59.3761 33.6931 59.5736C33.9683 59.771 34.3126 59.8678 34.7259 59.864C35.0059 59.8614 35.2655 59.819 35.5047 59.7368C35.7439 59.6479 35.933 59.5528 36.0721 59.4515C36.166 59.5107 36.24 59.5866 36.2942 59.6795C36.355 59.7656 36.3859 59.862 36.3869 59.9686C36.3885 60.142 36.3132 60.2927 36.1611 60.4208C36.0089 60.5422 35.8031 60.6374 35.5437 60.7065C35.2843 60.7756 34.988 60.8116 34.6547 60.8147C34.1414 60.8195 33.6838 60.7304 33.2821 60.5474C32.887 60.3577 32.5744 60.074 32.3442 59.6961C32.1207 59.3181 32.0063 58.8458 32.0011 58.2792C31.9973 57.8725 32.0573 57.5153 32.1812 57.2075C32.305 56.8996 32.4726 56.6448 32.6841 56.4428C32.9022 56.2341 33.1541 56.0784 33.4398 55.9758C33.7255 55.8664 34.025 55.8103 34.3383 55.8074C34.7783 55.8034 35.1624 55.8898 35.4907 56.0668C35.8257 56.237 36.0879 56.4779 36.2775 56.7895C36.4737 57.101 36.5737 57.4601 36.5774 57.8668C36.5792 58.0534 36.5305 58.1939 36.4313 58.2882C36.3388 58.3757 36.206 58.4302 36.0328 58.4519L32.7873 58.9519ZM38.1191 58.9025L38.0612 58.043L40.7374 57.6182C40.715 57.3651 40.6163 57.146 40.4413 56.961C40.2662 56.7759 40.012 56.6849 39.6787 56.688C39.3387 56.6912 39.0565 56.8138 38.8321 57.0559C38.6076 57.2913 38.494 57.629 38.4914 58.0691L38.5263 58.5888C38.5902 59.0149 38.7564 59.3267 39.0249 59.5242C39.3001 59.7216 39.6444 59.8185 40.0577 59.8146C40.3377 59.812 40.5973 59.7696 40.8365 59.6874C41.0757 59.5985 41.2648 59.5034 41.4039 59.4021C41.4978 59.4613 41.5718 59.5373 41.626 59.6301C41.6868 59.7162 41.7177 59.8126 41.7187 59.9193C41.7203 60.0926 41.645 60.2433 41.4929 60.3714C41.3407 60.4928 41.1349 60.588 40.8755 60.6571C40.6161 60.7262 40.3198 60.7622 39.9865 60.7653C39.4732 60.7701 39.0157 60.681 38.6139 60.498C38.2188 60.3084 37.9062 60.0246 37.676 59.6467C37.4525 59.2687 37.3381 58.7964 37.3329 58.2298C37.3291 57.8232 37.3891 57.4659 37.513 57.1581C37.6368 56.8503 37.8044 56.5954 38.0159 56.3934C38.234 56.1847 38.4859 56.029 38.7716 55.9264C39.0573 55.8171 39.3568 55.761 39.6701 55.758C40.1101 55.754 40.4942 55.8404 40.8225 56.0174C41.1575 56.1876 41.4197 56.4285 41.6093 56.7401C41.8055 57.0517 41.9055 57.4107 41.9093 57.8174C41.911 58.0041 41.8623 58.1445 41.7631 58.2388C41.6706 58.3263 41.5378 58.3809 41.3646 58.4025L38.1191 58.9025ZM47.2683 57.4677L47.2773 58.4377L46.0473 58.4491L46.0388 57.5291C46.0361 57.2358 45.9508 57.0233 45.7829 56.8915C45.6149 56.753 45.3909 56.6851 45.111 56.6877C44.9043 56.6896 44.7179 56.718 44.5517 56.7729C44.3922 56.821 44.2494 56.879 44.1233 56.9469L44.1374 58.4668L42.9074 58.4782L42.8926 56.8782C42.8911 56.7183 42.9233 56.588 42.989 56.4873C43.0547 56.3801 43.1538 56.2825 43.2863 56.1946C43.4851 56.0594 43.7407 55.947 44.0532 55.8575C44.3723 55.7612 44.7252 55.7112 45.1119 55.7076C45.7852 55.7014 46.3099 55.8466 46.686 56.1431C47.0687 56.4395 47.2628 56.8811 47.2683 57.4677ZM42.9029 57.9882L44.1329 57.9768L44.1568 60.5667C44.1037 60.5872 44.0272 60.6046 43.9273 60.6188C43.8275 60.6398 43.7176 60.6508 43.5976 60.6519C43.371 60.654 43.2006 60.6156 43.0865 60.5366C42.9791 60.4509 42.9243 60.3014 42.9224 60.0881L42.9029 57.9882ZM46.0428 57.9591L47.2727 57.9477L47.2967 60.5376C47.2502 60.558 47.1737 60.5754 47.0672 60.5897C46.9674 60.6107 46.8608 60.6217 46.7475 60.6227C46.5142 60.6249 46.3405 60.5865 46.2264 60.5075C46.1189 60.4219 46.0642 60.2724 46.0622 60.059L46.0428 57.9591Z" fill="#96A1B4"/>
                     <path d="M0.045166 24.5469C0.045166 11.292 10.7903 0.546875 24.0452 0.546875C37.3 0.546875 48.0452 11.292 48.0452 24.5469C48.0452 37.8017 37.3 48.5469 24.0452 48.5469C10.7903 48.5469 0.045166 37.8017 0.045166 24.5469Z" fill="#E6E6E6"/>
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4998 22.2412L17.4998 19.4986L22.0907 24.0896C22.3836 24.3825 22.8585 24.3825 23.1514 24.0896C23.4443 23.7967 23.4443 23.3218 23.1514 23.0289L18.6137 18.4912L21.2498 18.4912C21.664 18.4912 21.9998 18.1554 21.9998 17.7412C21.9998 17.327 21.664 16.9912 21.2498 16.9912L16.7498 16.9912C16.5426 16.9912 16.3551 17.0752 16.2194 17.2109C16.0837 17.3466 15.9998 17.5341 15.9998 17.7412L15.9998 22.2412C15.9998 22.6554 16.3355 22.9912 16.7498 22.9912C17.164 22.9912 17.4998 22.6554 17.4998 22.2412ZM29.9922 27.1805L29.9922 29.8699L25.4012 25.2789C25.1083 24.986 24.6334 24.986 24.3405 25.2789C24.0476 25.5718 24.0476 26.0466 24.3405 26.3395L28.9315 30.9305L26.2422 30.9305C25.828 30.9305 25.4922 31.2663 25.4922 31.6805C25.4922 32.0947 25.828 32.4305 26.2422 32.4305L30.7422 32.4305C30.9493 32.4305 31.1368 32.3466 31.2725 32.2108C31.4082 32.0751 31.4922 31.8876 31.4922 31.6805V27.1805C31.4922 26.7663 31.1564 26.4305 30.7422 26.4305C30.328 26.4305 29.9922 26.7663 29.9922 27.1805Z" fill="black"/>
                   </svg>
                 ) : (
                   <svg 
                     width="49" 
                     height="64" 
                     viewBox="0 0 49 64" 
                     fill="none" 
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M1.62634 58.6553L0.366391 58.6669L0.339345 55.7471C0.337431 55.5404 0.395915 55.3765 0.514799 55.2554C0.640348 55.1342 0.806452 55.0727 1.01311 55.0708C1.12644 55.0697 1.23653 55.0787 1.34337 55.0977C1.45689 55.1167 1.54037 55.1326 1.59383 55.1454L1.62634 58.6553ZM1.0372 58.7507L1.02766 57.7208L4.01753 57.6931C4.05135 57.7461 4.082 57.8158 4.10947 57.9022C4.1436 57.9886 4.16113 58.0818 4.16206 58.1818C4.16367 58.3551 4.1249 58.4888 4.04577 58.5828C3.96664 58.6769 3.85374 58.7246 3.70708 58.726L1.0372 58.7507ZM1.02265 56.1007L1.01311 55.0708L4.33297 55.04C4.36673 55.0864 4.39738 55.1561 4.42491 55.2492C4.45904 55.3355 4.47657 55.4287 4.4775 55.5287C4.47911 55.702 4.44034 55.8357 4.36121 55.9298C4.28208 56.0239 4.16918 56.0716 4.02252 56.073L1.02265 56.1007ZM0.359166 57.887L1.62911 57.8752L1.65921 61.1251C1.60601 61.1389 1.5228 61.153 1.4096 61.1674C1.30312 61.1884 1.19322 61.1994 1.07989 61.2004C0.839898 61.2027 0.662838 61.161 0.548706 61.0753C0.44118 60.983 0.386459 60.8335 0.384545 60.6268L0.359166 57.887ZM5.29121 59.2913L5.2839 58.5014L6.51384 58.49L6.52098 59.2599C6.52425 59.6133 6.61659 59.8658 6.798 60.0174C6.98608 60.169 7.24345 60.2433 7.5701 60.2403C7.78343 60.2383 7.96323 60.2166 8.10952 60.1753C8.25581 60.1339 8.36541 60.0896 8.4383 60.0422L8.42376 58.4723L9.65371 58.4609L9.66918 60.1308C9.6706 60.2842 9.64514 60.4144 9.59279 60.5215C9.54705 60.622 9.45459 60.7162 9.3154 60.8041C9.12312 60.9192 8.87733 61.0149 8.57802 61.091C8.28544 61.1737 7.94916 61.2168 7.56918 61.2203C7.1092 61.2246 6.7086 61.1616 6.36738 61.0314C6.02616 60.9013 5.76089 60.6937 5.57158 60.4088C5.38887 60.1171 5.29541 59.7447 5.29121 59.2913ZM9.65816 58.9409L8.42821 58.9523L8.40413 56.3524C8.45733 56.3386 8.53387 56.3245 8.63375 56.3103C8.74022 56.2893 8.85012 56.2782 8.96345 56.2772C9.19678 56.275 9.36714 56.3135 9.47454 56.3925C9.58195 56.4715 9.63667 56.621 9.6387 56.841L9.65816 58.9409ZM6.51829 58.97L5.28834 58.9814L5.26426 56.3815C5.31747 56.3676 5.39401 56.3536 5.49388 56.3393C5.59369 56.3184 5.70359 56.3074 5.82359 56.3063C6.05691 56.3041 6.22727 56.3425 6.33468 56.4216C6.44208 56.5006 6.4968 56.6501 6.49884 56.87L6.51829 58.97ZM11.0076 58.4084L12.2381 58.457L12.2618 61.0168C12.2086 61.0373 12.1321 61.0547 12.0323 61.069C11.9325 61.0899 11.8226 61.1009 11.7026 61.102C11.4759 61.1041 11.3055 61.0657 11.1915 60.9868C11.084 60.9011 11.0293 60.7516 11.0273 60.5383L11.0076 58.4084ZM12.2439 59.0869L11.0134 59.0383L10.9718 54.5485C11.0184 54.5348 11.0915 54.5174 11.1914 54.4965C11.2978 54.4755 11.4077 54.4645 11.5211 54.4634C11.761 54.4612 11.9348 54.5029 12.0422 54.5886C12.1496 54.6676 12.2043 54.8138 12.2063 55.0271L12.2439 59.0869ZM13.6637 58.3838L14.8942 58.4324L14.9179 60.9922C14.8648 61.0127 14.7883 61.0301 14.6884 61.0444C14.5886 61.0653 14.4787 61.0763 14.3587 61.0774C14.132 61.0795 13.9617 61.0411 13.8476 60.9622C13.7401 60.8765 13.6854 60.727 13.6834 60.5137L13.6637 58.3838ZM14.9001 59.0623L13.6695 59.0137L13.628 54.5239C13.6745 54.5102 13.7477 54.4928 13.8475 54.4719C13.954 54.4509 14.0639 54.4399 14.1772 54.4388C14.4172 54.4366 14.5909 54.4783 14.6984 54.564C14.8058 54.643 14.8605 54.7892 14.8624 55.0025L14.9001 59.0623ZM20.1484 60.0838C20.5351 60.0802 20.821 60.0009 21.0062 59.8458C21.1914 59.6841 21.2829 59.4866 21.2808 59.2532C21.2789 59.0466 21.204 58.8806 21.0561 58.7553C20.9149 58.6233 20.6972 58.5153 20.4031 58.4313L19.7513 58.2374C19.4169 58.1271 19.1224 58.0032 18.8678 57.8655C18.6199 57.7278 18.4249 57.5496 18.2828 57.3309C18.1474 57.1055 18.0782 56.8295 18.0752 56.5028C18.0702 55.9628 18.2662 55.5343 18.6633 55.2173C19.067 54.9002 19.6189 54.7384 20.3188 54.732C20.6922 54.7285 21.0225 54.7654 21.3099 54.8428C21.6039 54.9134 21.8349 55.0146 22.0028 55.1464C22.1773 55.2781 22.2654 55.434 22.2671 55.6139C22.2683 55.7406 22.236 55.8542 22.1703 55.9549C22.1111 56.0487 22.0352 56.1261 21.9424 56.187C21.788 56.0751 21.5771 55.9804 21.3097 55.9028C21.0423 55.8186 20.7519 55.778 20.4386 55.7809C20.0919 55.7841 19.8258 55.8499 19.6404 55.9783C19.4549 56.1067 19.3631 56.2775 19.3651 56.4909C19.3667 56.6642 19.4313 56.8036 19.559 56.9091C19.6933 57.0145 19.8942 57.106 20.1615 57.1835L20.7431 57.3481C21.318 57.5162 21.7669 57.7487 22.0896 58.0457C22.4123 58.336 22.576 58.7379 22.5808 59.2512C22.5859 59.7978 22.38 60.2431 21.9631 60.587C21.553 60.9308 20.9612 61.1063 20.1879 61.1134C19.7813 61.1172 19.4209 61.0772 19.1068 60.9934C18.7927 60.9097 18.5416 60.792 18.3535 60.6404C18.1721 60.4888 18.0805 60.3163 18.0787 60.1229C18.0773 59.9763 18.1228 59.8492 18.2152 59.7417C18.3075 59.6341 18.4068 59.5532 18.5129 59.4989C18.6876 59.6439 18.9122 59.7785 19.1867 59.9027C19.4612 60.0268 19.7818 60.0872 20.1484 60.0838ZM26.041 57.0291C25.641 57.0328 25.3056 57.1659 25.0346 57.4284C24.7704 57.6908 24.6406 58.0721 24.6452 58.572C24.6498 59.0654 24.7832 59.4375 25.0456 59.6884C25.3079 59.9393 25.6457 60.0628 26.0591 60.059C26.3057 60.0567 26.5121 60.0248 26.6782 59.9633C26.8509 59.895 27.0003 59.8236 27.1262 59.7491C27.2268 59.8082 27.3041 59.8808 27.3583 59.967C27.419 60.0464 27.4499 60.1461 27.451 60.2661C27.4531 60.4928 27.3182 60.6807 27.0462 60.8299C26.7742 60.9724 26.4149 61.0458 25.9682 61.0499C25.4616 61.0546 25.0141 60.9687 24.6258 60.7923C24.2441 60.6092 23.9415 60.332 23.718 59.9607C23.5013 59.5894 23.3903 59.1304 23.3853 58.5837C23.38 58.0171 23.489 57.546 23.7122 57.1706C23.9421 56.7951 24.2462 56.5157 24.6245 56.3321C25.0094 56.1419 25.4318 56.0447 25.8918 56.0404C26.3318 56.0363 26.6858 56.1097 26.9539 56.2606C27.222 56.4114 27.3571 56.6002 27.3592 56.8268C27.3601 56.9268 27.3343 57.0204 27.2818 57.1076C27.2292 57.1947 27.1666 57.2653 27.0937 57.3193C26.9597 57.2406 26.809 57.1719 26.6418 57.1135C26.4746 57.055 26.2743 57.0269 26.041 57.0291ZM29.6774 57.2754L29.6901 58.6453L28.4602 58.6567L28.4465 57.1868C28.445 57.0201 28.4837 56.8798 28.5626 56.7657C28.6415 56.6449 28.7538 56.5339 28.8996 56.4325C29.0985 56.3107 29.3509 56.2084 29.6568 56.1255C29.9627 56.0427 30.2923 55.9996 30.6456 55.9964C31.2722 55.9906 31.5874 56.181 31.5909 56.5676C31.5918 56.661 31.5793 56.7477 31.5534 56.828C31.5274 56.9016 31.4947 56.9685 31.4552 57.0289C31.3884 57.0162 31.305 57.007 31.2049 57.0012C31.1048 56.9888 30.9981 56.9831 30.8848 56.9842C30.6448 56.9864 30.4184 57.0152 30.2055 57.0705C29.9993 57.1191 29.8233 57.1874 29.6774 57.2754ZM28.4564 58.2467L29.6869 58.2953L29.7106 60.8552C29.6574 60.8757 29.5809 60.8931 29.481 60.9074C29.3812 60.9283 29.2713 60.9393 29.1513 60.9404C28.9247 60.9425 28.7543 60.9041 28.6402 60.8251C28.5328 60.7395 28.4781 60.59 28.4761 60.3766L28.4564 58.2467ZM32.8326 59.1062L32.7747 58.2467L35.4508 57.8219C35.4285 57.5688 35.3298 57.3497 35.1547 57.1646C34.9797 56.9796 34.7255 56.8886 34.3922 56.8917C34.0522 56.8948 33.77 57.0175 33.5456 57.2596C33.3211 57.495 33.2075 57.8327 33.2049 58.2727L33.2397 58.7924C33.3037 59.2185 33.4699 59.5303 33.7384 59.7279C34.0136 59.9253 34.3578 60.0221 34.7712 60.0183C35.0512 60.0157 35.3108 59.9733 35.55 59.8911C35.7892 59.8022 35.9783 59.7071 36.1174 59.6058C36.2113 59.665 36.2853 59.7409 36.3395 59.8338C36.4003 59.9199 36.4312 60.0163 36.4322 60.1229C36.4338 60.2963 36.3585 60.447 36.2064 60.575C36.0542 60.6965 35.8484 60.7917 35.589 60.8608C35.3296 60.9298 35.0333 60.9659 34.7 60.969C34.1867 60.9738 33.7291 60.8847 33.3274 60.7017C32.9323 60.512 32.6197 60.2283 32.3895 59.8504C32.166 59.4724 32.0516 59.0001 32.0464 58.4335C32.0426 58.0268 32.1026 57.6696 32.2264 57.3618C32.3503 57.0539 32.5179 56.799 32.7294 56.5971C32.9475 56.3884 33.1994 56.2327 33.4851 56.1301C33.7708 56.0207 34.0703 55.9646 34.3836 55.9617C34.8236 55.9577 35.2077 56.0441 35.536 56.2211C35.871 56.3913 36.1332 56.6322 36.3228 56.9438C36.519 57.2553 36.619 57.6144 36.6227 58.0211C36.6245 58.2077 36.5758 58.3482 36.4766 58.4425C36.3841 58.53 36.2513 58.5845 36.0781 58.6062L32.8326 59.1062ZM38.1644 59.0568L38.1065 58.1973L40.7827 57.7725C40.7603 57.5194 40.6616 57.3003 40.4866 57.1153C40.3115 56.9302 40.0573 56.8392 39.724 56.8423C39.384 56.8455 39.1018 56.9681 38.8774 57.2102C38.6529 57.4456 38.5393 57.7833 38.5367 58.2234L38.5715 58.7431C38.6355 59.1692 38.8017 59.481 39.0702 59.6785C39.3454 59.8759 39.6897 59.9728 40.103 59.9689C40.383 59.9663 40.6426 59.9239 40.8818 59.8417C41.121 59.7528 41.3101 59.6577 41.4492 59.5564C41.5431 59.6156 41.6171 59.6916 41.6713 59.7844C41.7321 59.8705 41.763 59.9669 41.764 60.0735C41.7656 60.2469 41.6903 60.3976 41.5382 60.5257C41.386 60.6471 41.1802 60.7423 40.9208 60.8114C40.6614 60.8805 40.3651 60.9165 40.0318 60.9196C39.5185 60.9244 39.0609 60.8353 38.6592 60.6523C38.2641 60.4626 37.9515 60.1789 37.7213 59.801C37.4978 59.423 37.3834 58.9507 37.3782 58.3841C37.3744 57.9775 37.4344 57.6202 37.5583 57.3124C37.6821 57.0046 37.8497 56.7497 38.0612 56.5477C38.2793 56.339 38.5312 56.1833 38.8169 56.0807C39.1026 55.9714 39.4021 55.9152 39.7154 55.9123C40.1554 55.9083 40.5395 55.9947 40.8678 56.1717C41.2028 56.3419 41.465 56.5828 41.6546 56.8944C41.8508 57.206 41.9508 57.565 41.9545 57.9717C41.9563 58.1584 41.9076 58.2988 41.8084 58.3931C41.7159 58.4806 41.5831 58.5352 41.4099 58.5568L38.1644 59.0568ZM47.3136 57.622L47.3226 58.592L46.0926 58.6034L46.0841 57.6834C46.0814 57.3901 45.9961 57.1776 45.8282 57.0458C45.6602 56.9073 45.4362 56.8394 45.1563 56.842C44.9496 56.8439 44.7632 56.8723 44.597 56.9272C44.4375 56.9753 44.2947 57.0333 44.1686 57.1011L44.1827 58.6211L42.9527 58.6325L42.9379 57.0325C42.9364 56.8726 42.9686 56.7422 43.0343 56.6416C43.1 56.5344 43.1991 56.4368 43.3316 56.3489C43.5304 56.2137 43.786 56.1013 44.0985 56.0118C44.4176 55.9155 44.7705 55.8655 45.1572 55.8619C45.8305 55.8557 46.3552 56.0008 46.7313 56.2974C47.114 56.5938 47.3081 57.0354 47.3136 57.622ZM42.9482 58.1425L44.1782 58.1311L44.2021 60.721C44.149 60.7415 44.0725 60.7589 43.9726 60.7731C43.8728 60.794 43.7629 60.8051 43.6429 60.8062C43.4162 60.8083 43.2459 60.7699 43.1318 60.6909C43.0244 60.6052 42.9696 60.4557 42.9677 60.2424L42.9482 58.1425ZM46.0881 58.1134L47.318 58.102L47.342 60.6919C47.2955 60.7123 47.219 60.7297 47.1125 60.744C47.0127 60.765 46.9061 60.776 46.7928 60.777C46.5594 60.7792 46.3857 60.7408 46.2717 60.6618C46.1642 60.5761 46.1095 60.4266 46.1075 60.2133L46.0881 58.1134Z" fill="#96A1B4"/>
                     <path d="M0.0905533 24.7012C0.0905533 11.4463 10.8357 0.701172 24.0906 0.701172C37.3454 0.701172 48.0906 11.4463 48.0906 24.7012C48.0906 37.956 37.3454 48.7012 24.0906 48.7012C10.8357 48.7012 0.0905533 37.956 0.0905533 24.7012Z" fill="#E6E6E6"/>
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5451 22.3955L17.5451 19.6529L22.1361 24.2439C22.429 24.5368 22.9039 24.5368 23.1968 24.2439C23.4897 23.951 23.4897 23.4761 23.1968 23.1832L18.6591 18.6455L21.2951 18.6455C21.7094 18.6455 22.0451 18.3097 22.0451 17.8955C22.0451 17.4813 21.7094 17.1455 21.2951 17.1455L16.7951 17.1455C16.588 17.1455 16.4005 17.2295 16.2648 17.3652C16.1291 17.5009 16.0451 17.6884 16.0451 17.8955L16.0451 22.3955C16.0451 22.8097 16.3809 23.1455 16.7951 23.1455C17.2094 23.1455 17.5451 22.8097 17.5451 22.3955ZM30.0376 27.3348L30.0376 30.0242L25.4466 25.4332C25.1537 25.1403 24.6788 25.1403 24.3859 25.4332C24.093 25.7261 24.093 26.2009 24.3859 26.4938L28.9769 31.0848L26.2876 31.0848C25.8733 31.0848 25.5376 31.4206 25.5376 31.8348C25.5376 32.249 25.8733 32.5848 26.2876 32.5848L30.7876 32.5848C30.9947 32.5848 31.1822 32.5009 31.3179 32.3651C31.4536 32.2294 31.5376 32.0419 31.5376 31.8348V27.3348C31.5376 26.9206 31.2018 26.5848 30.7876 26.5848C30.3733 26.5848 30.0376 26.9206 30.0376 27.3348Z" fill="black"/>
                   </svg>
                 )}
                 
              </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white rounded-lg w-64 p-4 relative">
                  {/* Close icon */}
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  >
                    ✕
                  </button>

                  {/* Options menu */}
                  {modalView === "options" && (
                    <div className="space-y-3">
                      <button
                        onClick={() => setModalView("pages")}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                      >
                        Pages
                      </button>
                      <button
                        onClick={() => setModalView("font")}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                      >
                        Font size
                      </button>
                    </div>
                  )}

                  {/* Pages submenu */}
                  {modalView === "pages" && (
                    <>
                      <button
                        onClick={goBack}
                        className="flex items-center mb-2 text-gray-600"
                      >
                        <FaArrowLeft className="mr-1" /> Back
                      </button>
                      <div className="grid grid-cols-4 gap-2">
                        {pages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => jumpToPage(idx + 1)}
                            className="border rounded py-1 hover:bg-gray-100"
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Font‑size submenu */}
                  {modalView === "font" && (
                    <>
                      <button
                        onClick={goBack}
                        className="flex items-center mb-2 text-gray-600"
                      >
                        <FaArrowLeft className="mr-1" /> Back
                      </button>
                      <label className="block mb-1 font-medium">Font size</label>
                      <input
                        type="range"
                        min="12"
                        max="28"
                        value={fontSize}
                        onChange={(e) => setFontSize(+e.target.value)}
                        className="w-full"
                      />
                      <div className="text-right text-sm text-gray-500">
                        {fontSize}px
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Prev / Next */}
            <div className="mt-6 flex justify-between relative bottom-[100px]">
              <button
                onClick={() => flipRef.current.pageFlip().flipPrev()}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 0
                    ? "text-gray-500"
                    : " text-white "
                } transition`}
              >
                {currentPage === 0 ? (
                  <svg
                    width="48"
                    height="49"
                    viewBox="0 0 48 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 0.154297L24.6714 0.163523C37.6094 0.519489 48 11.1308 48 24.1543C48 37.3783 37.248 48.1543 24 48.1543C10.776 48.1543 0 37.3783 0 24.1543C0 10.9063 10.776 0.154297 24 0.154297ZM28.752 14.5543C28.032 13.8343 26.904 13.8343 26.208 14.5543L17.832 22.8823C17.496 23.2183 17.304 23.6743 17.304 24.1543C17.304 24.6343 17.496 25.0903 17.832 25.4263L26.208 33.7543C26.544 34.1143 27 34.2823 27.456 34.2823C27.936 34.2823 28.392 34.1143 28.752 33.7543C29.448 33.0343 29.448 31.9063 28.728 31.2103L21.648 24.1543L28.728 17.0983C29.448 16.4023 29.448 15.2503 28.752 14.5543Z"
                      fill="#E2EED0"
                    />
                  </svg>
                ) : (
                  <svg
                    width="48"
                    height="49"
                    viewBox="0 0 48 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.0908 48.1543L24.7623 48.1451C37.7002 47.7891 48.0908 37.1778 48.0908 24.1543C48.0908 10.9303 37.3388 0.154297 24.0908 0.154299C10.8668 0.1543 0.0908171 10.9303 0.0908182 24.1543C0.0908194 37.4023 10.8668 48.1543 24.0908 48.1543ZM28.8428 33.7543C28.1228 34.4743 26.9948 34.4743 26.2988 33.7543L17.9228 25.4263C17.5868 25.0903 17.3948 24.6343 17.3948 24.1543C17.3948 23.6743 17.5868 23.2183 17.9228 22.8823L26.2988 14.5543C26.6348 14.1943 27.0908 14.0263 27.5468 14.0263C28.0268 14.0263 28.4828 14.1943 28.8428 14.5543C29.5388 15.2743 29.5388 16.4023 28.8188 17.0983L21.7388 24.1543L28.8188 31.2103C29.5388 31.9063 29.5388 33.0583 28.8428 33.7543Z"
                      fill="#9FC43E"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={handleNext}
                className={`px-4 py-2 rounded-lg ${
                  isLastPage
                    ? "text-white"
                    : "text-white"
                } transition`}
              >
                {isLastPage ? (
                  <svg
                    width="49"
                    height="49"
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.0906 48.1543L23.4191 48.1451C10.4812 47.7891 0.0905771 37.1778 0.0905783 24.1543C0.0905794 10.9303 10.8426 0.154297 24.0906 0.154299C37.3146 0.1543 48.0906 10.9303 48.0906 24.1543C48.0906 37.4023 37.3146 48.1543 24.0906 48.1543ZM19.3386 33.7543C20.0586 34.4743 21.1866 34.4743 21.8826 33.7543L30.2586 25.4263C30.5946 25.0903 30.7866 24.6343 30.7866 24.1543C30.7866 23.6743 30.5946 23.2183 30.2586 22.8823L21.8826 14.5543C21.5466 14.1943 21.0906 14.0263 20.6346 14.0263C20.1546 14.0263 19.6986 14.1943 19.3386 14.5543C18.6426 15.2743 18.6426 16.4023 19.3626 17.0983L26.4426 24.1543L19.3626 31.2103C18.6426 31.9063 18.6426 33.0583 19.3386 33.7543Z"
                      fill="#9FC43E"
                    />
                  </svg>
                ) : (
                  <svg
                    width="49"
                    height="49"
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.0906 48.1543L23.4191 48.1451C10.4812 47.7891 0.0905771 37.1778 0.0905783 24.1543C0.0905794 10.9303 10.8426 0.154297 24.0906 0.154299C37.3146 0.1543 48.0906 10.9303 48.0906 24.1543C48.0906 37.4023 37.3146 48.1543 24.0906 48.1543ZM19.3386 33.7543C20.0586 34.4743 21.1866 34.4743 21.8826 33.7543L30.2586 25.4263C30.5946 25.0903 30.7866 24.6343 30.7866 24.1543C30.7866 23.6743 30.5946 23.2183 30.2586 22.8823L21.8826 14.5543C21.5466 14.1943 21.0906 14.0263 20.6346 14.0263C20.1546 14.0263 19.6986 14.1943 19.3386 14.5543C18.6426 15.2743 18.6426 16.4023 19.3626 17.0983L26.4426 24.1543L19.3626 31.2103C18.6426 31.9063 18.6426 33.0583 19.3386 33.7543Z"
                      fill="#9FC43E"
                    />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}

        {/* Modals */}
        {showDone && (
          <WellDoneModal
            onTakeQuiz={() => {
              setShowDone(false);
              setShowAudio(false);
              setShowQuiz(true);
            }}
            onLater={() => setShowDone(false)}
            onRetake={onRetake}
          />
        )}
        {showResult && (
          <QuizResultModal
            stats={quizStats!}
            answers={quizAnswers!}
            onRetake={onRetake}
            onClose={() => setShowResult(false)}
            onViewAnswers={() => {
              onViewAnswers?.();
              setShowResult(false);
            }}
          />
        )}
      </div>
    );
  }
);

export default ReadingComponent;