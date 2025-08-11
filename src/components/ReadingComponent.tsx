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
                      className="w-[100%] h-[90%] object-contain"
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

    const [size, setSize] = useState({ width: 450, height: 400 });
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
                className="flex flex-col items-center text-gray-600 hover:text-gray-800"
                disabled
              >
                <FaHeadphones size={20} />
                <span className="text-xs mt-1">Audiobook</span>
              </button>

              {/* Page modal trigger */}
              <button
                onClick={() => openModal("options")}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800"
              >
                <FaPageIcon size={20} />
                <span className="text-xs mt-1">Page</span>
              </button>

              <button
                onClick={toggleFull}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800"
              >
                <FaExpandArrowsAlt size={20} />
                <span className="text-xs mt-1">
                  {isFull ? "Exit" : "Full"} Screen
                </span>
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
            <div className="mt-6 flex justify-between relative bottom-[39px]">
              <button
                onClick={() => flipRef.current.pageFlip().flipPrev()}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 0
                    ? "bg-gray-300 text-gray-500"
                    : "bg-[#9FC43E] text-white hover:bg-green-600"
                } transition`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className={`px-4 py-2 rounded-lg ${
                  isLastPage
                    ? "bg-[#9FC43E] text-white hover:bg-green-600"
                    : "bg-[#9FC43E] text-white hover:bg-green-600"
                } transition`}
              >
                {isLastPage ? "Complete" : "Next"}
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