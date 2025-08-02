import React, { useEffect, useState } from "react";
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
import { Book } from "@/components/BookCard";
import ReadingComponent from "@/components/ReadingComponent";
import { useSearchParams } from "react-router-dom";
import VideoComponent from "@/components/VideoComponent";
import NigeriaFlag from "@/assets/nigeria-flag.png";
import WellDoneModal from "@/components/WellDoneModal";
import QuizComponent, { QuizStats, UserAnswer } from "@/components/QuizComponent";
import QuizResultModal from "@/components/QuizResultModal";
import QueenMoremi from "@/audiobooks/QueenMoremi.mp3";
import AnswerReviewModal from "@/components/AnswerReviewModal";

import KojoAndLolaImage from "@/assets/Kojo and Lola.png";
import KojoAndLolaImage1 from "@/assets/Kojo and Lola (1).png";
import KojoAndLolaImage2 from "@/assets/Kojo and Lola (2).png";
import KojoAndLolaImage3 from "@/assets/Kojo and Lola (3).png";
import KojoAndLolaImage4 from "@/assets/Kojo and Lola (4).png";
import KojoAndLolaImage5 from "@/assets/Kojo and Lola (5).png";
import { ContentForHome, GetAudioBooks, GetContebtBySubCategories, GetRecommendedVideo, GetSubCategories } from "@/api/api";

/* helper: snake_case → Title Case */
const toTitle = (s: string) =>
  s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* helper: transform ContentForHome response → Category[] */
const homeToCategories = (payload: any): Category[] => {
  if (!payload || typeof payload !== "object") return [];
  const catArray: Category[] = [
    {
      name: "Continue Reading",
      books: [],
      hasSub: false, // no sub-view for Continue Reading
    },
  ];
  console.log('payload', payload)
  Object.entries(payload).forEach(([key, val]: [string, any]) => {
    if (Array.isArray(val)) {
      catArray.push({
        name: toTitle(key),
        books: val.map((item) => ({
          id: item.id,
          title: item.name,
          coverUrl: item.thumbnail,
          progress: 0,
        })),
        hasSub: false, // all For-you categories expand locally
      });
    }
  });
  console.log('catArray', catArray)
  return catArray;
};

interface Category {
  name: string;
  books: Book[];
  hasSub?: boolean; // 🔹 new flag
  subId?: number;   // <-- for lazy subcategory rows
}

interface Page {
  id: number;
  imageUrl: string;
  text: string;
}

interface Tab {
  label: string;
  icon: JSX.Element;
  id: number | null;
}

const generateAllSubcategories = (): Category[] => [{ name: "Advanced Reading", books: [{ id: 29, title: "Advanced Book One", coverUrl: KojoAndLolaImage, progress: 10 }, { id: 30, title: "Advanced Book Two", coverUrl: KojoAndLolaImage1, progress: 20 }, { id: 31, title: "Advanced Book Three", coverUrl: KojoAndLolaImage2, progress: 30 }, { id: 32, title: "Advanced Book Four", coverUrl: KojoAndLolaImage3, progress: 40 }, { id: 33, title: "Advanced Book Five", coverUrl: KojoAndLolaImage4, progress: 50 }, { id: 34, title: "Advanced Book Six", coverUrl: KojoAndLolaImage5, progress: 60 }, { id: 35, title: "Advanced Book Seven", coverUrl: KojoAndLolaImage, progress: 70 }, { id: 36, title: "Advanced Book Eight", coverUrl: KojoAndLolaImage1, progress: 80 }, { id: 37, title: "Advanced Book Nine", coverUrl: KojoAndLolaImage2, progress: 90 }, { id: 38, title: "Advanced Book Ten", coverUrl: KojoAndLolaImage3, progress: 100 }, { id: 49, title: "Advanced Book Eleven", coverUrl: KojoAndLolaImage4, progress: 15 }, { id: 50, title: "Advanced Book Twelve", coverUrl: KojoAndLolaImage5, progress: 25 },], }, { name: "Young Explorers", books: [{ id: 39, title: "Explorer One", coverUrl: KojoAndLolaImage4, progress: 15 }, { id: 40, title: "Explorer Two", coverUrl: KojoAndLolaImage5, progress: 25 }, { id: 41, title: "Explorer Three", coverUrl: KojoAndLolaImage, progress: 35 }, { id: 42, title: "Explorer Four", coverUrl: KojoAndLolaImage1, progress: 45 }, { id: 43, title: "Explorer Five", coverUrl: KojoAndLolaImage2, progress: 55 }, { id: 44, title: "Explorer Six", coverUrl: KojoAndLolaImage3, progress: 65 }, { id: 45, title: "Explorer Seven", coverUrl: KojoAndLolaImage4, progress: 75 }, { id: 46, title: "Explorer Eight", coverUrl: KojoAndLolaImage5, progress: 85 }, { id: 47, title: "Explorer Nine", coverUrl: KojoAndLolaImage, progress: 95 }, { id: 48, title: "Explorer Ten", coverUrl: KojoAndLolaImage1, progress: 100 }, { id: 51, title: "Explorer Eleven", coverUrl: KojoAndLolaImage2, progress: 20 }, { id: 52, title: "Explorer Twelve", coverUrl: KojoAndLolaImage3, progress: 30 },], }, { name: "New Discoveries", books: [{ id: 53, title: "Discovery One", coverUrl: KojoAndLolaImage4, progress: 5 }, { id: 54, title: "Discovery Two", coverUrl: KojoAndLolaImage5, progress: 15 }, { id: 55, title: "Discovery Three", coverUrl: KojoAndLolaImage, progress: 25 }, { id: 56, title: "Discovery Four", coverUrl: KojoAndLolaImage1, progress: 35 }, { id: 57, title: "Discovery Five", coverUrl: KojoAndLolaImage2, progress: 45 }, { id: 58, title: "Discovery Six", coverUrl: KojoAndLolaImage3, progress: 55 }, { id: 59, title: "Discovery Seven", coverUrl: KojoAndLolaImage4, progress: 65 }, { id: 60, title: "Discovery Eight", coverUrl: KojoAndLolaImage5, progress: 75 }, { id: 61, title: "Discovery Nine", coverUrl: KojoAndLolaImage, progress: 85 }, { id: 62, title: "Discovery Ten", coverUrl: KojoAndLolaImage1, progress: 95 },], },];

const defaultTabs: Omit<Tab, "id">[] = [
  { label: "For you", icon: <FaUser /> },
  { label: "Stories", icon: <FaBookOpen /> },
  { label: "Languages", icon: <FaGlobe /> },
  { label: "Literacy", icon: <FaKeyboard /> },
];

const ContentLibrary: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // ensure we can always do tabsConfig[activeIndex].label without crashing
  const [tabsConfig, setTabsConfig] = useState<Tab[]>(
    defaultTabs.map((tab) => ({ ...tab, id: null }))
  );

  // a) Keep the entire cats array so we can reuse sub-categories
  const [allCats, setAllCats] = useState<any[]>([]);

  const [showAllStories, setShowAllStories] = useState(false);
  const [storiesActiveSubSlug, setStoriesActiveSubSlug] = useState<string | null>(null);

  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [languagesActiveSubSlug, setLanguagesActiveSubSlug] = useState<string | null>(null);

  useEffect(() => {
    GetSubCategories().then((res) => {
      console.log("res", res);
      if (res.data.status && Array.isArray(res.data.data)) {
        const cats = res.data.data;
        console.log("cats", cats);
        setAllCats(cats);            // <-- NEW
        const populated: Tab[] = defaultTabs.map((tab) => {
          const match = cats.find((c) => c.name === tab.label);
          return { ...tab, id: match?.id ?? null };
        });
        setTabsConfig(populated);
      } else {
        // fallback: assign null IDs
        setTabsConfig(defaultTabs.map((tab) => ({ ...tab, id: null })));
      }
    });
  }, []);

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
      [...generateAllSubcategories()].flatMap(
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
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [crumb, setCrumb] = useState<string[]>([]);
  const [expandedSimple, setExpandedSimple] = useState<Record<string, boolean>>(
    {}
  );

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

  // STORIES “See All” handler
  const handleStoriesSeeAll = (slug: string) => {
    if (showAllStories && storiesActiveSubSlug === slug) {
      setShowAllStories(false);
      setStoriesActiveSubSlug(null);
    } else {
      setShowAllStories(true);
      setStoriesActiveSubSlug(slug);
      // collapse Languages if open
      setShowAllLanguages(false);
    }
  };

  // LANGUAGES “See All” handler
  const handleLanguagesSeeAll = (slug: string) => {
    if (showAllLanguages && languagesActiveSubSlug === slug) {
      setShowAllLanguages(false);
      setLanguagesActiveSubSlug(null);
    } else {
      setShowAllLanguages(true);
      setLanguagesActiveSubSlug(slug);
      // collapse Stories if open
      setShowAllStories(false);
    }
  };

  // Helper to detect active tab
  const activeLabel = tabsConfig[activeIndex]?.label;
  const isForYouTab = activeLabel === "For you";
  const isStoriesTab = activeLabel === "Stories";
  const isLangsTab = activeLabel === "Languages";
  const isLiteracyTab = activeLabel === "Literacy";

  // 1) Fetch categories whenever the active **tab** changes
  React.useEffect(() => {
    setMainSelected(null);
    setSubRequested(false);
    setSubcategories(null);
    setCrumb([]);
    setCategories(null);

    const load = async () => {
      // 1) For-you -------------------------------
      if (isForYouTab) {
        try {
          const res = await ContentForHome();
          if (res?.status && res.data) {
            setCategories(homeToCategories(res.data.data));
            return;
          }
        } catch { /* ignore */ }
        // even if it fails we still want the Continue-Reading row
        setCategories([{ name: "Continue Reading", books: [] }]);
        return;
      }

      // 2) Stories ------------------------------
      if (isStoriesTab) {
        // (a) still waiting on GetSubCategories()
        if (allCats.length === 0) {
          console.log("allCats.length === 0", allCats.length, allCats);
          // show one placeholder row so BookCategory shows header skeleton + book skeletons
          setCategories([{ name: "", books: [], hasSub: false, subId: null }]);
          return;
        }

        // (b) now we have the real “Stories” category
        const storiesCat = allCats.find((c) => c.name === "Stories");
        setCategories(
          (storiesCat?.sub_categories || []).map((sub: any) => ({
            name: sub.name,
            books: [], // BookCategory will render its skeletons
            hasSub: false,
            subId: sub.id,
          }))
        );
        return;
      }

      // 3) Languages ----------------------------
      if (isLangsTab) {
        if (allCats.length === 0) {
          // show a single placeholder row until GetSubCategories() resolves
          setCategories([{ name: "", books: [], subId: null }]);
          return;
        }

        const langsCat = allCats.find((c) => c.name === "Languages");
        setCategories(
          (langsCat?.sub_categories || []).map((sub: any) => ({
            name: sub.name,
            books: [], // BookCategory shows skeleton cards
            hasSub: false,
            subId: sub.id,
          }))
        );
        return;
      }

      // 4) Literacy ----------------------------
      if (isLiteracyTab) {
        setCategories([]); // nothing to map; we’ll render “Coming soon”
        return;
      }
    };

    // show skeletons for ~300ms
    const t = setTimeout(load, 1);
    return () => clearTimeout(t);
  }, [activeIndex, tabsConfig, allCats]);

  // 2) Main “See all” handler
  const handleMainSeeAll = (name: string) => {
    setMainSelected(name);
    setSubRequested(true);
    setSubcategories(null);

    const t = setTimeout(() => {
      setSubcategories(generateAllSubcategories());
    }, 300);
    return () => clearTimeout(t);
  };

  // 4) Decide which list to show
  const isSubView = subRequested;
  const loading = isSubView ? subcategories === null : categories === null;
  let list: Category[];
  if (!isSubView) {
    list = categories ?? [];
  } else {
    list = subcategories ?? generateAllSubcategories();
  }

  // --- new: when a For-you category is locally expanded, hide all others
  const expandedNames = Object.entries(expandedSimple)
    .filter(([, val]) => val)
    .map(([name]) => name);
  const displayList =
    isForYouTab && expandedNames.length === 1
      ? list.filter((cat) => cat.name === expandedNames[0])
      : list;

  // 5) Build breadcrumb levels (before book) - REWRITTEN
  /* ---------- breadcrumb construction ---------- */
  const crumbsBeforeBook = React.useMemo(() => {
    if (tabsConfig[activeIndex].label === "For you") {
      const expandedRow = Object.keys(expandedSimple).find((k) => expandedSimple[k]);
      return expandedRow ? ["For you", expandedRow] : ["For you"];
    }
    if (["Stories", "Languages"].includes(tabsConfig[activeIndex].label)) {
      return [tabsConfig[activeIndex].label];
    }
    return [tabsConfig[activeIndex].label];
  }, [activeIndex, expandedSimple, tabsConfig]);

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

/* ───────── helpers specific to “For you” breadcrumb ───────── */
const toggleForYouRow = (catName: string) => {
  setExpandedSimple(prev => {
    const now = !prev[catName];
    setMainSelected(now ? catName : null); // controls breadcrumb level-2
    return { ...prev, [catName]: now };
  });
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
                  /* ---------- breadcrumb click handler ---------- */
                  onClick={() => {
                    if (i === 0) {
                      setExpandedSimple({});
                    }
                    if (tabsConfig[activeIndex].label === "For you" && i === 1) {
                      /* toggle just the clicked row */
                      setExpandedSimple(prev => ({
                        ...Object.fromEntries(Object.keys(prev).map(k => [k, false])),
                        [level]: !prev[level]
                      }));
                    }
                    if (tabsConfig[activeIndex].label !== "For you" && i === 1) {
                      /* Stories / Languages breadcrumb behaviour stays unchanged */
                      setSubRequested(true);
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
            withIntroPages={false}  // <-- start directly at page 1
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
            audioSrc={QueenMoremi}
          />
        ) : isLiteracyTab ? (
          <div className="flex items-center justify-center h-40 text-lg font-semibold text-gray-500">
            Coming soon
          </div>
        ) : (
          <>
            {isStoriesTab &&
              displayList
                .filter(cat =>
                  !showAllStories || cat.name === storiesActiveSubSlug
                )
                .map(cat => (
                  <BookCategory
                    key={cat.name}
                    name={cat.name}
                    books={cat.books}
                    hasSub={!!cat.subId}
                    onSeeAll={() => handleStoriesSeeAll(cat.name)}
                    expanded={showAllStories && cat.name === storiesActiveSubSlug}
                  />
                ))}

            {isLangsTab &&
              displayList
                .filter(cat =>
                  !showAllLanguages || cat.name === languagesActiveSubSlug
                )
                .map(cat => (
                  <BookCategory
                    key={cat.name}
                    name={cat.name}
                    books={cat.books}
                    hasSub={!!cat.subId}
                    onSeeAll={() => handleLanguagesSeeAll(cat.name)}
                    expanded={showAllLanguages && cat.name === languagesActiveSubSlug}
                  />
                ))}

            {isForYouTab &&
              displayList.map(cat => (
                <BookCategory
                  key={cat.name}
                  subId={(cat as any).subId ?? null}
                  categoryName={cat.name}
                  books={loading ? [] : cat.books}
                  loading={loading}
                  expanded={!!expandedSimple[cat.name]}
                  hasSub={false} // “For you” categories never drill down
                  onSeeAll={() => toggleForYouRow(cat.name)}
                  tabLabel={tabsConfig[activeIndex].label}
                  parentCategory={mainSelected ?? undefined}
                  emptyMsg={
                    isForYouTab && cat.name === "Continue Reading"
                      ? "No content available"
                      : undefined
                  }
                  onBookClick={(book: any, bc) => {
                    openBook(book.id);
                    setCrumb(bc);
                  }}
                />
              ))}
          </>
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