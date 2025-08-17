import React, { useEffect, useState, useCallback, useRef } from "react";
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
import ReadingComponent, { ReadingHandle } from "@/components/ReadingComponent";
import { useSearchParams, useLocation } from "react-router-dom";import VideoComponent from "@/components/VideoComponent";
import WellDoneModal from "@/components/WellDoneModal";
import QuizComponent, { QuizStats, UserAnswer } from "@/components/QuizComponent";
import QuizResultModal from "@/components/QuizResultModal"
import QueenMoremi from "@/audiobooks/QueenMoremi.mp3";
import ContentLibraryHeader from "./ContentLibraryHeader";
import AnswerReviewModal from "@/components/AnswerReviewModal";
import ContentLibraryModals from "./ContentLibraryModals";
import ContentLibraryBreadcrumb from "./ContentLibraryBreadcrumb";
import CategorySections from "./CategorySections";
import ContentLibraryBody from "./ContentLibraryBody";
import { useContentLibraryData } from "./hooks/useContentLibraryData";
import { useBookActions } from "./hooks/useBookActions";



import KojoAndLolaImage from "@/assets/Kojo and Lola.png";
import KojoAndLolaImage1 from "@/assets/Kojo and Lola (1).png";
import KojoAndLolaImage2 from "@/assets/Kojo and Lola (2).png";
import KojoAndLolaImage3 from "@/assets/Kojo and Lola (3).png";
import KojoAndLolaImage4 from "@/assets/Kojo and Lola (4).png";
import KojoAndLolaImage5 from "@/assets/Kojo and Lola (5).png";
import {
  ContentForHome,
  GetAudioBooks,
  GetContebtBySubCategories,
  GetRecommendedVideo,
  GetSubCategories,
  GetContentById,
  GetCompletedContents,   // (optional)
  GetOngoingContents,     // ← add this
  GetLikedContent,        // ← add this
} from "@/api/api";
import { showNotification } from "@mantine/notifications";
import foryou from "@/assets/foryou.png";
import story from "@/assets/story.png";
import languages from "@/assets/languagev.png";
import literacy from "@/assets/literacy.png";
import useStore from "@/store";
import { on } from "rsuite/esm/DOMHelper";
import { getProfileState } from "@/store/profileStore";


/* ---------------- helper: loud trace ---------------- */
const trace = (...msg: any[]) =>
  console.log('%c[ContentLibrary]', 'color:#BCD678;font-weight:bold', ...msg);

/* helper: snake_case → Title Case */
const toTitle = (s: string) =>
  s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* helper: transform ContentForHome response → Category[] */
const homeToCategories = (payload: any): Category[] => {
  trace("homeToCategories() payload:", payload);

  if (!payload || typeof payload !== "object") return [];

  const uniqueBooks = new Set<string>();
  const catArray: Category[] = [];

  Object.entries(payload).forEach(([key, val]: [string, any]) => {
    if (!Array.isArray(val)) return;

    const books: Book[] = val
      .filter((item) => {
        const uniqueKey = `${key}-${item.id}`;
        if (!uniqueBooks.has(uniqueKey)) {
          uniqueBooks.add(uniqueKey);
          return true;
        }
        return false;
      })
      .map((item) => ({
        id: item.id,
        title: item.name,
        coverUrl: item.thumbnail,
        progress: 0, // default for "for you" rows
        is_liked: item.is_liked,
      }));

    catArray.push({
      name: toTitle(key),
      books,
      hasSub: false, // all For-you categories expand locally
    });
  });

  trace("homeToCategories() →", catArray);
  return catArray;
};

interface Category {
  name: string;
  books: Book[];
  hasSub?: boolean; // 🔹 new flag
  subId?: number | null;   // <-- for lazy subcategory rows
}

interface Page {
  id: number;
  imageUrl: string;
  text: string;
}

interface Tab {
  label: string;
  icon: string; // ✅
  id: number | null;
}

const generateAllSubcategories = (): Category[] => [
  {
    name: "Advanced Reading",
    books: [
      {
        id: 29,
        title: "Advanced Book One",
        coverUrl: KojoAndLolaImage,
        progress: 10,
      },
    ],
  },
];

const defaultTabs: Omit<Tab, "id">[] = [
   { label: "For you", icon: foryou },
  { label: "Stories", icon: story },
  { label: "Languages", icon: languages },
  { label: "Literacy", icon: literacy },
];

// console.log('GetCompletedContents', GetCompletedContents(sessionStorage.getItem("profileId")));
const ContentLibrary: React.FC<{ state?: string }> = ({ state = 'home' }) => {

  const profileId = sessionStorage.getItem("profileId");
  
  
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation() as { state?: any };
  const favMode =
  state === "fav" ||
  searchParams.get("state") === "fav" ||
  location?.state === "fav" ||
  location?.state?.fav === true;
  // ensure we can always do tabsConfig[activeIndex].label without crashing
  const [tabsConfig, setTabsConfig] = useState<Tab[]>(
    defaultTabs.map((tab) => ({ ...tab, id: null }))
  );


  const urlState = React.useMemo(() => {
    const tab = Number(searchParams.get("tab")) || 0;
    const book = Number(searchParams.get("book")) || null;
    const read = searchParams.get("read") === profileId;
    const watch = searchParams.get("watch") === profileId;
    return { tab, book, read, watch };
  }, [searchParams, profileId]);

  const {
    allCats,
    setAllCats,        // ✅ now available
    categories,
    setCategories,
    subcategories,
    setSubcategories,
    crumb,
    setCrumb,
    ongoingBooks,
    refreshOngoing,
    loadFavourites,
  } = useContentLibraryData(favMode);

  const {
    bookPages,
    setBookPages,
    readingLoading,
    setReadingLoading,
    videoSrc,
    setVideoSrc,
    videoPoster,
    setVideoPoster,
    overviewChecking,
    setOverviewChecking,
    startRead,
    closeRead,
    startWatch,
    closeWatch,
    closeBook,
    fetchBookPages,
  } = useBookActions(profileId, setSearchParams, urlState);
  
  

  const [profiles] = useStore(getProfileState);

  function getIframeLink() {
    const profileIdchild = sessionStorage.getItem("profileId");
    if (!profileIdchild) return null;

    const profile = profiles?.find((p) => p.id === Number(profileIdchild));
    console.log("profile", profile, profile?.interactive_app_url);
    return profile ? profile?.interactive_app_url : 'https://interactive-app.kundakidsapi.com/';
  }

  // ---- ongoing “Continue Reading” state (must be inside the component) ----

 

  // a) Keep the entire cats array so we can reuse sub-categories

  // Stories expansion state
  const [showAllStories, setShowAllStories] = useState(false);
  const [storiesActiveSubSlug, setStoriesActiveSubSlug] = useState<string | null>(null);

  // Languages expansion state
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [languagesActiveSubSlug, setLanguagesActiveSubSlug] = useState<string | null>(null);

  const readingRef = useRef<ReadingHandle>(null);

 

  useEffect(() => {
    if (favMode) return; // do not overwrite favourites view
    GetSubCategories().then((res) => {
      console.log("res", res);
      if (res.data.status && Array.isArray(res.data.data)) {
        const cats = res.data.data;
        console.log("cats", cats);
        setAllCats(cats);            // <-- NEW
        const populated: Tab[] = defaultTabs.map((tab) => {
          const match = cats.find((c:any) => c.name === tab.label);
          return { ...tab, id: match?.id ?? null };
        });
        setTabsConfig(populated);
      } else {
        // fallback: assign null IDs
        setTabsConfig(defaultTabs.map((tab) => ({ ...tab, id: null })));
      }
    });
  }, [favMode]);

 


  const setTab = (idx: number) => setSearchParams({ tab: String(idx) });

  const openBook = (id: number) => {
    trace('openBook()', id);
    setSearchParams({ tab: String(urlState.tab), book: String(id) });
  };

  const activeIndex = urlState.tab;

  const [mainSelected, setMainSelected] = useState<string | null>(null);
  const [subRequested, setSubRequested] = useState(false);
  const [expandedSimple, setExpandedSimple] = useState<Record<string, boolean>>(
    {}
  );

  const allBooks = React.useMemo(
    () =>
      [...generateAllSubcategories()].flatMap(
        (c) => c.books
      ),
    []
  );

  

  

  // ---------- quiz flow state ----------
  const [quizTarget, setQuizTarget] = useState<Book | null>(null);
  const [showWell, setShowWell] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const [quizKey, setQuizKey] = useState(0);
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<UserAnswer[] | null>(null);
  const [quizReset, setQuizReset] = useState(0);

  const [showResult, setShowResult] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState(false);

  // ---------- handlers ----------
  const handleMediaComplete = (book: Book) => {
    setQuizTarget(book);
    setShowWell(true);
    setShowQuiz(false);   // don’t show quiz yet
  };

  const handleTakeQuiz = () => {
    setShowWell(false);
    setShowQuiz(true);    // now show quiz
  };

  const handleDoLater = () => {
    setShowWell(false);
    setShowQuiz(false);
  };

  const handleQuizComplete = (stats: QuizStats, answers: UserAnswer[]) => {
    setQuizStats(stats);
    setQuizAnswers(answers);
    setShowResult(true);
    console.log('ANSWERS222', answers);
  };
  useEffect(() => { console.log('quizAnswers ts', quizAnswers); }, [quizAnswers]);


  const handleViewAnswers = () => {
    // 🔍 diagnostic: make sure we actually captured answers
    console.log("▶️ handleViewAnswers – quizAnswers state:", quizAnswers);

    // 1) hide the results modal
    setShowResult(false);

    // 2) show the review modal immediately
    setShowAnswerReview(true);
  };

  const startQuizFlow = () => {
    setShowResult(false);       // hide results modal
    setShowWell(true);  
    console.log("quizTarget", quizTarget);          // show the *Well-done* modal
    if (quizTarget) {
      handleMediaComplete(quizTarget);
    }
  };

  // ─── Retake quiz ──────────────────────────────────────────────
  const handleRetake = () => {
    setShowQuiz(true);          // keep quiz visible on retake
    readingRef.current?.showQuiz();   // 👈 flips internal state
    setQuizReset((s) => s + 1);       // clears answers
  };

  const handleReviewDone = () => {
    setShowAnswerReview(false);
    // leave “read” mode so we fall back to the overview
    closeRead();
  };

  // Stories “See All” handler
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

  // Languages “See All” handler
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
  const isForYouTab = activeLabel === "For you" && state !== 'fav';
  const isStoriesTab = activeLabel === "Stories";
  const isLangsTab = activeLabel === "Languages";
  const isLiteracyTab = activeLabel === "Literacy";

  // 1) Fetch categories whenever the active **tab** changes
  React.useEffect(() => {
    if (favMode) return; // do not overwrite favourites view
    setMainSelected(null);
    setSubRequested(false);
    setSubcategories([]);
    setCrumb([]);
    setCategories([]);

    const load = async () => {
      // 1) For-you -------------------------------
      if (isForYouTab && state !== 'fav') {
        // ensure profile id is read fresh on each entry to For You
        // refreshOngoing();
        try {
          const res = await ContentForHome({});
          if (res?.data?.status && res.data?.data) {
            const cats = homeToCategories(res.data.data);

            // prepend Continue Reading if we have anything
            const withOngoing = 
              Array.isArray(ongoingBooks) && ongoingBooks.length > 0
                ? [
                    {
                      name: "Continue Reading", 
                      books: ongoingBooks,
                      hasSub: false,
                    },
                    ...cats,
                  ]
                : [
                    // still show the row (empty) so users know the section exists
                    { name: "Continue Reading", books: [], hasSub: false },
                    ...cats,
                  ];

            setCategories(withOngoing);
            return;
          }
        } catch (e) {
          console.warn("ContentForHome failed, still showing Continue Reading stub", e);
        }


        // Even if ContentForHome fails, render at least the Continue Reading row.
        setCategories([{ name: "Continue Reading", books: [], hasSub: false }]);
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
  }, [activeIndex, tabsConfig, allCats, ongoingBooks, favMode]);

  // when you land with ?read=1&book=### in the URL, rehydrate the pages
  useEffect(() => {
    if (urlState.read && urlState.book != null) {
      fetchBookPages(urlState.book);
    }
  }, [urlState.read, urlState.book, fetchBookPages]);

  // ─── new: on a fresh load with ?book=…, pull its real category & slug ───
  useEffect(() => {
    if (favMode) return; // do not overwrite favourites view
    // only do this once, when we have a book but no crumb yet
    if (urlState.book == null || crumb.length > 0 || tabsConfig.length === 0) return;

    (async () => {
      try {
        const res = await GetContentById(String(urlState.book), profileId);
        if (!res.data.status) {
          // Assuming there's a notification system in place
          showNotification({
            message: res.data.message,
            title: "Notification"
          });
          setSearchParams({ tab: String(urlState.tab) }); // Go back to the tab
          return;
        }
        const data = res?.data?.data ?? res?.data;

        const tabLabel = data.category; 
        const subLabel = data.sub_categories?.[0]?.sub_category_name || "";
        const bookName = data.name;

        // find the tab index
        const idx = tabsConfig.findIndex((t) => t.label === tabLabel);

        // if the URL’s tab param is out of sync, correct it
        if (idx >= 0 && urlState.tab !== idx) {
          setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set('tab', String(idx));
            params.set('book', String(urlState.book));
            if (urlState.read) {
              params.set('read', profileId ?? "");
            } else {
              params.delete('read');
            }
            if (urlState.watch) {
              params.set('watch', profileId ?? "");
            } else {
              params.delete('watch');
            }
            return params;
          }, { replace: true });
          return;
        }

        // otherwise, expand the right row in‐UI:
        if (tabLabel === "Stories") {
          setShowAllStories(true);
          setStoriesActiveSubSlug(subLabel);
        } else if (tabLabel === "Languages") {
          setShowAllLanguages(true);
          setLanguagesActiveSubSlug(subLabel);
        } else if (tabLabel === "For you") {
          // expand For-you row
          setExpandedSimple({ [subLabel]: true });
          setMainSelected(subLabel);
        }

        // finally seed the breadcrumb
        setCrumb([tabLabel, subLabel, bookName]);
      } catch (err) {
        console.error("Failed to rehydrate breadcrumb:", err);
      }
    })();
  }, [
    urlState.book,
    urlState.tab,
    urlState.read,
    urlState.watch,
    tabsConfig,
    crumb.length,
    profileId,
    favMode
  ]);



  const selectedBook = React.useMemo<Book | null>(() => {
    if (urlState.book == null) return null;

    // 1️⃣ look in the demo list
    let found =
      allBooks.find((b) => b.id === urlState.book) ?? null;
    if (found) return found;

    // 2️⃣ look in the currently displayed categories / sub-categories
    const searchPools = [categories, subcategories];
    for (const pool of searchPools) {
      for (const cat of pool) {
        const hit = cat.books?.find((b) => b.id === urlState.book);
        if (hit) return hit;
      }
    }

    // 3️⃣ still nothing? return a stub so BookOverview
    //    can fetch real data via GetContentById
    return {
      id: urlState.book,
      title: "",
      coverUrl: "",
      progress: 0,
    };
  }, [urlState.book, allBooks, categories, subcategories]);

  // ─── guard: when you land on ?book=### (but not reading or watching),
  //      verify that GetContentById returns status=true before showing overview.
  useEffect(() => {
    if (
      urlState.book == null ||
      urlState.read ||
      urlState.watch ||
      !selectedBook
    ) {
      return;
    }

    setOverviewChecking(false);
    GetContentById(String(urlState.book), profileId)
      .then((res) => {
        if (!res.data.status) {
          showNotification({
            title: "Oops!",
            message: res.data.message,
            color: "red",
          });
          // clear the book query param, stay on tab
          setSearchParams({ tab: String(urlState.tab) }, { replace: true });
        }
      })
      .catch((err) => {
        console.error("Overview guard error", err);
        showNotification({
          title: "Error",
          message: "Failed to verify book overview.",
          color: "red",
        });
      })
      .finally(() => {
        setOverviewChecking(false);
      });
  }, [
    urlState.book,
    urlState.read,
    urlState.watch,
    selectedBook,
    urlState.tab,
    setSearchParams,
    profileId
  ]);

  const readingBook = urlState.read ? selectedBook : null;
  const watchingBook = urlState.watch ? selectedBook : null;

  useEffect(() => {
    if (favMode) {
      loadFavourites();
    }
  }, [favMode, loadFavourites]);

   // fetch once on mount
   useEffect(() => {
    refreshOngoing();
  }, [refreshOngoing]);

  // 2) Main “See all” handler
  const handleMainSeeAll = (name: string) => {
    setMainSelected(name);
    setSubRequested(true);
    setSubcategories([]);

    const t = setTimeout(() => {
      setSubcategories(generateAllSubcategories());
    }, 300);
    return () => clearTimeout(t);
  };

  // 4) Decide which list to show
  const isSubView = subRequested;
  const loading = isSubView ? subcategories.length === 0 : categories.length === 0;
  let list: Category[];
  if (!isSubView) {
    list = categories;
  } else if (isStoriesTab && showAllStories && storiesActiveSubSlug) {
    list = subcategories.filter(c => c.name === storiesActiveSubSlug);
  } else if (isLangsTab && showAllLanguages && languagesActiveSubSlug) {
    list = subcategories.filter(c => c.name === languagesActiveSubSlug);
  } else {
    list = subcategories.length ? subcategories : generateAllSubcategories();
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
    if (isStoriesTab && storiesActiveSubSlug) {
      return ["Stories", storiesActiveSubSlug];
    }
    if (isLangsTab && languagesActiveSubSlug) {
      return ["Languages", languagesActiveSubSlug];
    }
    return [tabsConfig[activeIndex].label];
  }, [activeIndex, expandedSimple, tabsConfig, storiesActiveSubSlug, languagesActiveSubSlug]);

  // include book-title crumbs when a book is open
  const displayCrumbs = selectedBook && crumb.length > 0
    ? crumb
    : crumbsBeforeBook;

  /* ───────── helpers specific to “For you” breadcrumb ───────── */
  const toggleForYouRow = (catName: string) => {
    setExpandedSimple(prev => {
      const now = !prev[catName];
      setMainSelected(now ? catName : null); // controls breadcrumb level-2
      return { ...prev, [catName]: now };
    });
  };

  // console.log('displayList', handleRetake)

  /* ---------- breadcrumb click handler ---------- */
  const handleBreadcrumbClick = useCallback((label: string, level: number) => {
    // 1) Always close detail view
    closeBook();

    // 2) Level 0 = top‐level tab
    if (level === 0) {
      const tabIndex = tabsConfig.findIndex((t) => t.label === label);
      if (tabIndex >= 0) {
        setTab(tabIndex);
        // reset any open sub‐views / expansions
        setMainSelected(null);
        setShowAllStories(false);
        setStoriesActiveSubSlug(null);
        setShowAllLanguages(false);
        setLanguagesActiveSubSlug(null);
        setExpandedSimple({});
      }
      return;
    }

    // 3) Level 1 = sub‐category or “For you” row
    if (level === 1) {
      if (activeLabel === "For you") {
        // expand that row (or collapse if same)
        toggleForYouRow(label);
      } else if (activeLabel === "Stories") {
        setShowAllStories(true);
        setStoriesActiveSubSlug(label);
        setShowAllLanguages(false);
      } else if (activeLabel === "Languages") {
        setShowAllLanguages(true);
        setLanguagesActiveSubSlug(label);
        setShowAllStories(false);
      }
    }
  }, [
    tabsConfig,
    activeLabel,
    setTab,
    toggleForYouRow,
    closeBook,
    setMainSelected,
    setShowAllStories,
    setStoriesActiveSubSlug,
    setShowAllLanguages,
    setLanguagesActiveSubSlug,
    setExpandedSimple,
  ]);

  return (
     <div className={`mx-auto w-[clamp(550px,100%,1440px)] relative ${activeLabel !== "For you" ? "top-[-70px]" : ""}`}>
       {/* Header (Banner + Tabs) */}
    <ContentLibraryHeader
      activeIndex={activeIndex}
      tabsConfig={tabsConfig}
      state={state}
      onTabSelect={setTab}
    />
    

      {/* Unified Breadcrumb */}
      <ContentLibraryBreadcrumb
        crumbs={displayCrumbs}
        onCrumbClick={handleBreadcrumbClick}
      />


        {/* Show the Literacy iframe if the tab is selected */}
         {tabsConfig[activeIndex]?.label === "Literacy" && (
        <div className="mt-6 w-full">
          <iframe
            src={getIframeLink()}
            className="w-full h-[100vh] rounded-xl border"
            allow="fullscreen; autoplay; clipboard-read; clipboard-write"
            loading="lazy"
            title="Kunda Kids Interactive App"
          />
        </div>
      )}

     {/* Unified content body (handles review, reading, watching, overview, categories) */}
<div className="mt-8 space-y-8">
  <ContentLibraryBody
    // ---- Review props ----
    showAnswerReview={showAnswerReview}
    quizAnswers={quizAnswers ?? []}
    onReviewDone={handleReviewDone}

    // ---- Reading props ----
    readingBook={readingBook}
    readingRef={readingRef}
    readingLoading={readingLoading}
    bookPages={bookPages}
    onCloseRead={closeRead}
    onRetake={handleRetake}
    onViewAnswers={handleViewAnswers}
    onAnswersUpdate={(ans) => setQuizAnswers(ans)}

    // ---- Watching props ----
    watchingBook={watchingBook}
    videoSrc={videoSrc}
    videoPoster={videoPoster}
    onCloseWatch={closeWatch}
    onCompleteWatch={() => handleMediaComplete(watchingBook!)}

    // ---- Overview props ----
    selectedBook={selectedBook}
    overviewChecking={overviewChecking}
    crumbsBeforeBook={crumbsBeforeBook}
    onBackFromOverview={closeBook}
    onStartRead={(b) => startRead(b.id)}
    onStartWatch={(b) => startWatch(b.id)}

    // ---- Category rendering props ----
    isStoriesTab={isStoriesTab}
    isLangsTab={isLangsTab}
    isForYouTab={isForYouTab}
    displayList={displayList}
    allCats={allCats}
    showAllStories={showAllStories}
    storiesActiveSubSlug={storiesActiveSubSlug}
    setShowAllStories={setShowAllStories}
    setStoriesActiveSubSlug={setStoriesActiveSubSlug}
    showAllLanguages={showAllLanguages}
    languagesActiveSubSlug={languagesActiveSubSlug}
    setShowAllLanguages={setShowAllLanguages}
    setLanguagesActiveSubSlug={setLanguagesActiveSubSlug}
    expandedSimple={expandedSimple}
    toggleForYouRow={toggleForYouRow}
    openBook={openBook}
    setCrumb={setCrumb}
  />
</div>


      {/* --------- MODALS & QUIZ (only when NOT reviewing) --------- */}
{!showAnswerReview && (
  <ContentLibraryModals
    showWell={showWell}
    showQuiz={showQuiz}
    showResult={showResult}
    quizTarget={quizTarget}
    quizStats={quizStats}
    quizReset={quizReset}
    setQuizAnswers={(ans) => setQuizAnswers(ans)}
    onTakeQuiz={handleTakeQuiz}
    onLater={handleDoLater}
    onRetake={handleRetake}
    onViewAnswers={handleViewAnswers}
    onCloseResult={() => setShowResult(false)}
  />
)}

    </div>
  );
};
export default ContentLibrary; 
