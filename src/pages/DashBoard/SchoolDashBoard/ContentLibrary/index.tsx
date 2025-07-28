import React, { useState } from "react";
import TeacherIllustration from "@/assets/Teacher's_Library_.png";
import {
  FaUser,
  FaBookOpen,
  FaGlobe,
  FaKeyboard,
  FaChevronRight,
} from "react-icons/fa";
import { motion, LayoutGroup } from "framer-motion";
import BookCategory from "@/components/BookCategory";
import BookOverview from "@/components/BookOverview";
import BookCategoryProps from "@/components/BookCategory";
import { Book } from "@/components/BookCard";
import ReadingComponent from "@/components/ReadingComponent";
import { useSearchParams } from "react-router-dom";
import VideoComponent from "@/components/VideoComponent";
import NigeriaFlag from "@/assets/nigeria-flag.png";
import WellDoneModal from "@/components/WellDoneModal";
import QuizComponent, { QuizStats, UserAnswer } from "@/components/QuizComponent";
import QuizResultModal from "@/components/QuizResultModal";
import AnswerReviewModal from "@/components/AnswerReviewModal";

import KojoAndLolaImage from "@/assets/Kojo and Lola.png";
import KojoAndLolaImage1 from "@/assets/Kojo and Lola (1).png";
import KojoAndLolaImage2 from "@/assets/Kojo and Lola (2).png";
import KojoAndLolaImage3 from "@/assets/Kojo and Lola (3).png";
import KojoAndLolaImage4 from "@/assets/Kojo and Lola (4).png";
import KojoAndLolaImage5 from "@/assets/Kojo and Lola (5).png";

interface Category {
  name: string;
  books: Book[];
}

interface Page {
  id: number;
  imageUrl: string;
  text: string;
}

/** MAIN categories */
const generateAllCategories = (): Category[] => [
  {
    name: "Continue Reading",
    books: [
      { id: 1, title: "Book One", coverUrl: KojoAndLolaImage, progress: 20 },
      { id: 2, title: "Book Two", coverUrl: KojoAndLolaImage1, progress: 50 },
      { id: 3, title: "Book Three", coverUrl: KojoAndLolaImage2, progress: 30 },
      { id: 4, title: "Book Four", coverUrl: KojoAndLolaImage3, progress: 60 },
      { id: 5, title: "Book Five", coverUrl: KojoAndLolaImage4, progress: 40 },
      { id: 6, title: "Book Six", coverUrl: KojoAndLolaImage5, progress: 70 },
      { id: 7, title: "Book Seven", coverUrl: KojoAndLolaImage, progress: 80 },
    ],
  },
  {
    name: "Ages 5-7: Growing Readers",
    books: [
      { id: 8, title: "Story One", coverUrl: KojoAndLolaImage1, progress: 70 },
      { id: 9, title: "Story Two", coverUrl: KojoAndLolaImage2, progress: 90 },
      { id: 10, title: "Story Three", coverUrl: KojoAndLolaImage3, progress: 50 },
      { id: 11, title: "Story Four", coverUrl: KojoAndLolaImage4, progress: 60 },
      { id: 12, title: "Story Five", coverUrl: KojoAndLolaImage5, progress: 30 },
      { id: 13, title: "Story Six", coverUrl: KojoAndLolaImage, progress: 40 },
      { id: 14, title: "Story Seven", coverUrl: KojoAndLolaImage1, progress: 20 },
    ],
  },
  {
    name: "Popular reads",
    books: [
      { id: 15, title: "Language One", coverUrl: KojoAndLolaImage2, progress: 30 },
      { id: 16, title: "Language Two", coverUrl: KojoAndLolaImage3, progress: 60 },
      { id: 17, title: "Language Three", coverUrl: KojoAndLolaImage4, progress: 50 },
      { id: 18, title: "Language Four", coverUrl: KojoAndLolaImage5, progress: 70 },
      { id: 19, title: "Language Five", coverUrl: KojoAndLolaImage, progress: 20 },
      { id: 20, title: "Language Six", coverUrl: KojoAndLolaImage1, progress: 40 },
      { id: 21, title: "Language Seven", coverUrl: KojoAndLolaImage2, progress: 80 },
    ],
  },
  {
    name: "Literacy",
    books: [
      { id: 22, title: "Literacy One", coverUrl: KojoAndLolaImage3, progress: 40 },
      { id: 23, title: "Literacy Two", coverUrl: KojoAndLolaImage4, progress: 80 },
      { id: 24, title: "Literacy Three", coverUrl: KojoAndLolaImage5, progress: 60 },
      { id: 25, title: "Literacy Four", coverUrl: KojoAndLolaImage, progress: 30 },
      { id: 26, title: "Literacy Five", coverUrl: KojoAndLolaImage1, progress: 50 },
      { id: 27, title: "Literacy Six", coverUrl: KojoAndLolaImage2, progress: 20 },
      { id: 28, title: "Literacy Seven", coverUrl: KojoAndLolaImage3, progress: 70 },
    ],
  },
];

/** SUB categories */
const generateAllSubcategories = (): Category[] => [
  {
    name: "Advanced Reading",
    books: [
      { id: 29, title: "Advanced Book One", coverUrl: KojoAndLolaImage, progress: 10 },
      { id: 30, title: "Advanced Book Two", coverUrl: KojoAndLolaImage1, progress: 20 },
      { id: 31, title: "Advanced Book Three", coverUrl: KojoAndLolaImage2, progress: 30 },
      { id: 32, title: "Advanced Book Four", coverUrl: KojoAndLolaImage3, progress: 40 },
      { id: 33, title: "Advanced Book Five", coverUrl: KojoAndLolaImage4, progress: 50 },
      { id: 34, title: "Advanced Book Six", coverUrl: KojoAndLolaImage5, progress: 60 },
      { id: 35, title: "Advanced Book Seven", coverUrl: KojoAndLolaImage, progress: 70 },
      { id: 36, title: "Advanced Book Eight", coverUrl: KojoAndLolaImage1, progress: 80 },
      { id: 37, title: "Advanced Book Nine", coverUrl: KojoAndLolaImage2, progress: 90 },
      { id: 38, title: "Advanced Book Ten", coverUrl: KojoAndLolaImage3, progress: 100 },
      { id: 49, title: "Advanced Book Eleven", coverUrl: KojoAndLolaImage4, progress: 15 },
      { id: 50, title: "Advanced Book Twelve", coverUrl: KojoAndLolaImage5, progress: 25 },
    ],
  },
  {
    name: "Young Explorers",
    books: [
      { id: 39, title: "Explorer One", coverUrl: KojoAndLolaImage4, progress: 15 },
      { id: 40, title: "Explorer Two", coverUrl: KojoAndLolaImage5, progress: 25 },
      { id: 41, title: "Explorer Three", coverUrl: KojoAndLolaImage, progress: 35 },
      { id: 42, title: "Explorer Four", coverUrl: KojoAndLolaImage1, progress: 45 },
      { id: 43, title: "Explorer Five", coverUrl: KojoAndLolaImage2, progress: 55 },
      { id: 44, title: "Explorer Six", coverUrl: KojoAndLolaImage3, progress: 65 },
      { id: 45, title: "Explorer Seven", coverUrl: KojoAndLolaImage4, progress: 75 },
      { id: 46, title: "Explorer Eight", coverUrl: KojoAndLolaImage5, progress: 85 },
      { id: 47, title: "Explorer Nine", coverUrl: KojoAndLolaImage, progress: 95 },
      { id: 48, title: "Explorer Ten", coverUrl: KojoAndLolaImage1, progress: 100 },
      { id: 51, title: "Explorer Eleven", coverUrl: KojoAndLolaImage2, progress: 20 },
      { id: 52, title: "Explorer Twelve", coverUrl: KojoAndLolaImage3, progress: 30 },
    ],
  },
  {
    name: "New Discoveries",
    books: [
      { id: 53, title: "Discovery One", coverUrl: KojoAndLolaImage4, progress: 5 },
      { id: 54, title: "Discovery Two", coverUrl: KojoAndLolaImage5, progress: 15 },
      { id: 55, title: "Discovery Three", coverUrl: KojoAndLolaImage, progress: 25 },
      { id: 56, title: "Discovery Four", coverUrl: KojoAndLolaImage1, progress: 35 },
      { id: 57, title: "Discovery Five", coverUrl: KojoAndLolaImage2, progress: 45 },
      { id: 58, title: "Discovery Six", coverUrl: KojoAndLolaImage3, progress: 55 },
      { id: 59, title: "Discovery Seven", coverUrl: KojoAndLolaImage4, progress: 65 },
      { id: 60, title: "Discovery Eight", coverUrl: KojoAndLolaImage5, progress: 75 },
      { id: 61, title: "Discovery Nine", coverUrl: KojoAndLolaImage, progress: 85 },
      { id: 62, title: "Discovery Ten", coverUrl: KojoAndLolaImage1, progress: 95 },
    ],
  },
];

const tabsConfig = [
  { label: "For you", icon: <FaUser /> },
  { label: "Stories", icon: <FaBookOpen /> },
  { label: "Languages", icon: <FaGlobe /> },
  { label: "Literacy", icon: <FaKeyboard /> },
];

const ContentLibrary: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlState = React.useMemo(() => {
    const tab = Number(searchParams.get("tab")) || 0;
    const book = Number(searchParams.get("book")) || null;
    const read = searchParams.get("read") === "1";
    const watch = searchParams.get("watch") === "1";
    return { tab, book, read, watch };
  }, [searchParams]);

  const setTab = (idx: number) => setSearchParams({ tab: String(idx) });

  const openBook = (id: number) =>
    setSearchParams({ tab: String(urlState.tab), book: String(id) });

  const startRead = (id: number) =>
    setSearchParams({ tab: String(urlState.tab), book: String(id), read: "1" });

  const closeRead = () =>
    setSearchParams({ tab: String(urlState.tab), book: String(urlState.book!) });

  const startWatch = (id: number) =>
    setSearchParams({ tab: String(urlState.tab), book: String(id), watch: "1" });

  const closeWatch = () =>
    setSearchParams({ tab: String(urlState.tab), book: String(urlState.book!) });

  const closeBook = () => setSearchParams({ tab: String(urlState.tab) });

  const activeIndex = urlState.tab;

  const allBooks = React.useMemo(
    () =>
      [...generateAllCategories(), ...generateAllSubcategories()].flatMap(
        (c) => c.books
      ),
    []
  );

  const selectedBook = allBooks.find((b) => b.id === urlState.book) || null;
  const readingBook = urlState.read ? selectedBook : null;
  const watchingBook = urlState.watch ? selectedBook : null;

  const [mainSelected, setMainSelected] = useState<string | null>(null);
  const [subRequested, setSubRequested] = useState(false);
  const [subcategories, setSubcategories] = useState<Category[] | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [crumb, setCrumb] = useState<string[]>([]);

  // ---------- quiz flow state ----------
  const [quizTarget, setQuizTarget] = useState<Book | null>(null);
  const [showWell, setShowWell] = useState(false);

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<UserAnswer[] | null>(null);

  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // ---------- handlers ----------
  const handleMediaComplete = (book: Book) => {
    setQuizTarget(book);
    setShowWell(true);
  };

  const handleTakeQuiz = () => { setShowWell(false); setShowQuiz(true); };
  const handleDoLater = () => setShowWell(false);

  const handleQuizComplete = (stats: QuizStats, answers: UserAnswer[]) => {
    setShowQuiz(false);
    setQuizStats(stats);
    setQuizAnswers(answers);
    setShowResult(true);
  };

  const handleViewAnswers = () => { setShowResult(false); setShowReview(true); };
  const handleRetake = () => { setShowResult(false); setShowQuiz(true); };

  const handleReviewDone = () => setShowReview(false);

  // 1) Fetch main categories & reset entire view on tab change
  React.useEffect(() => {
    setMainSelected(null);
    setSubRequested(false);
    setSubcategories(null);
    setExpandedSub(null);
    setCrumb([]);
    setCategories(null);
    const t = setTimeout(() => {
      setCategories(generateAllCategories());
    }, 300);
    return () => clearTimeout(t);
  }, [activeIndex]);

  // 2) Main “See all” handler
  const handleMainSeeAll = (name: string) => {
    setMainSelected(name);
    setSubRequested(true);
    setSubcategories(null);
    setExpandedSub(null);

    const t = setTimeout(() => {
      setSubcategories(generateAllSubcategories());
    }, 300); 
    return () => clearTimeout(t);
  };

  // 3) Sub “See all” handler
  const handleSubSeeAll = (name: string) => {
    setExpandedSub((prev) => (prev === name ? null : name));
  };

  // 4) Decide which list to show
  const isSubView = subRequested;
  const loading = isSubView ? subcategories === null : categories === null;
  let list: Category[];
  if (!isSubView) {
    list = categories ?? generateAllCategories();
  } else if (expandedSub) {
    list = subcategories?.filter((c) => c.name === expandedSub) ?? [
      { name: expandedSub, books: [] },
    ];
  } else {
    list = subcategories ?? generateAllSubcategories();
  }

  // 5) Build breadcrumb levels (before book)
  const crumbsBeforeBook = [
    tabsConfig[activeIndex].label,
    mainSelected,
    expandedSub,
  ].filter(Boolean) as string[];

  // Simulate pages for a book
  const generateBookPages = (book: Book): Page[] => {
    const images = [
      KojoAndLolaImage,
      KojoAndLolaImage1,
      KojoAndLolaImage,
      KojoAndLolaImage1,
      KojoAndLolaImage
    ];

    const texts = [
      "Splish, splash, and flip! Meet Dilly, the most curious little dolphin…",
      "Dolphins are super smart. They use their voices to talk…",
      "On this page, Dilly meets a sea turtle and they race across the reef…",
      "Next, Dilly discovers a hidden cave full of sparkly shells…",
      "Finally, Dilly shares his adventure with his ocean friends…"
    ];

    return Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      imageUrl: images[index % images.length],
      text: texts[index % texts.length]
    }));
  };

  return (
    <div className="mx-auto w-[clamp(550px,100%,1440px)]">
      {/* Banner */}
      <div className="relative h-auto sm:h-[220px] z-10 rounded-lg bg-[#BCD678] px-4 py-6 sm:px-8 sm:py-10 overflow-visible">
        <div className="flex flex-col justify-center h-full">
          <h1 className="font-inter font-semibold text-[24px] sm:text-[36px] text-gray-900">
            Content Library
          </h1>
          <p className="mt-1 font-inter font-medium text-[14px] sm:text-[16px] text-gray-700">
            Curated selections just for you
          </p>
        </div>
        <img
          src={TeacherIllustration}
          alt="Illustration"
          className="absolute bottom-[-20px] sm:bottom-[-38px] right-4 sm:right-6 w-20 sm:w-auto select-none pointer-events-none"
        />
      </div>

      {/* Tabs */}
      <LayoutGroup>
        <div className="flex gap-3 mb-6 flex-wrap mt-[52px]">
          {tabsConfig.map((tab, idx) => (
            <motion.button
              key={tab.label}
              layout
              onClick={() => setTab(idx)}
              animate={{
                backgroundColor: idx === activeIndex ? "#BCD678" : "#FFF",
                color: idx === activeIndex ? "#1F2937" : "#4B5563",
                boxShadow: idx === activeIndex
                  ? "0 10px 20px rgba(188,214,120,0.3)"
                  : "0 2px 4px rgba(0,0,0,0.05)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-[7px] px-3 py-3 rounded-lg border border-gray-200 text-sm font-medium outline-none"
            >
              {idx === activeIndex && (
                <motion.div
                  layoutId="tabHighlight"
                  className="absolute inset-0 rounded-lg bg-[#BCD678] z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </LayoutGroup>

      {/* Unified Breadcrumb */}
      {crumbsBeforeBook.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center text-sm text-gray-600 space-x-2">
            {crumbsBeforeBook.map((level, i) => (
              <React.Fragment key={i}>
                {i > 0 && <FaChevronRight className="text-gray-400" />}
                <span
                  className={
                    i === crumbsBeforeBook.length - 1 && !selectedBook
                      ? "font-bold text-gray-900"
                      : "hover:underline cursor-pointer"
                  }
                  onClick={() => {
                    // clicking any crumb resets deeper views
                    if (i === 0) {
                      setTab(activeIndex);
                      setMainSelected(null);
                      setSubRequested(false);
                      setExpandedSub(null);
                      setCrumb([]);
                    }
                    if (i === 1) {
                      setSubRequested(true);
                      setExpandedSub(null);
                      setCrumb([]);
                    }
                  }}
                >
                  {level}
                </span>
              </React.Fragment>
            ))}

            {/* Book title */}
            {selectedBook && (
              <>
                <FaChevronRight className="text-gray-400" />
                <span className="font-bold text-gray-900">
                  {selectedBook.title}
                </span>

                {/* Quiz crumb when active */}
                {showQuiz && (
                  <>
                    <FaChevronRight className="text-gray-400" />
                    <span className="font-bold text-gray-900">
                      Quiz
                    </span>
                  </>
                )}

                {/* Result crumb when showing results */}
                {showResult && (
                  <>
                    <FaChevronRight className="text-gray-400" />
                    <span className="font-bold text-gray-900">
                      Result
                    </span>
                  </>
                )}
              </>
            )}
          </ol>
        </nav>
      )}

      {/* Content area */}
      <div className="mt-8 space-y-8">
        {readingBook ? (
          <ReadingComponent
            book={readingBook}
            onExit={closeRead}
            pages={generateBookPages(readingBook)}
          />
        ) : watchingBook ? (
          <VideoComponent
            // videoSrc={`/videos/${watchingBook.id}.mp4`}
            poster={`/videos/${watchingBook.id}-thumb.jpg`}
            title={watchingBook.title}
            flagUrl={NigeriaFlag}
            onClose={closeWatch}
            onComplete={() => handleMediaComplete(watchingBook)}
          />
        ) : selectedBook ? (
          <BookOverview
            book={selectedBook}
            crumb={crumbsBeforeBook}
            onBack={closeBook}
            onRead={(b: any) => startRead(b.id)}
            onWatch={(b: any) => startWatch(b.id)}
          />
        ) : (
          list.map((cat) => (
            <BookCategory
              key={cat.name}
              categoryName={cat.name}
              books={loading ? [] : cat.books}
              loading={loading}
              expanded={expandedSub === cat.name}
              onSeeAll={() =>
                isSubView
                  ? handleSubSeeAll(cat.name)
                  : handleMainSeeAll(cat.name)
              }
              tabLabel={tabsConfig[activeIndex].label}
              parentCategory={mainSelected ?? undefined}
              onBookClick={(book:any, bc) => {
                openBook(book.id);
                setCrumb(bc);
              }}
            />
          ))
        )}
      </div>

      {/* --------- MODALS & QUIZ --------- */}
      {showWell && quizTarget && (
        <WellDoneModal
          message="You've just finished!"
          onTakeQuiz={handleTakeQuiz}
          onLater={handleDoLater}
        />
      )}
      {showQuiz && quizTarget && (
        <QuizComponent
          book={quizTarget}
          onComplete={handleQuizComplete}
        />
      )}
      {showResult && quizStats && (
        <QuizResultModal
          stats={quizStats}
          onViewAnswers={handleViewAnswers}
          onRetake={handleRetake}
        />
      )}
      {showReview && quizAnswers && (
        <AnswerReviewModal
          answers={quizAnswers}
          onDone={handleReviewDone}
        />
      )}
    </div>
  );
};

export default ContentLibrary;