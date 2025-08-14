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
import { useSearchParams } from "react-router-dom";
import VideoComponent from "@/components/VideoComponent";
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
import {
  ContentForHome,
  GetAudioBooks,
  GetContebtBySubCategories,
  GetRecommendedVideo,
  GetSubCategories,
  GetContentById,
  GetCompletedContents,   // (optional)
  GetOngoingContents,     // ← add this
} from "@/api/api";
import { showNotification } from "@mantine/notifications";
import foryou from "@/assets/foryou.png";
import story from "@/assets/story.png";
import languages from "@/assets/languagev.png";
import literacy from "@/assets/literacy.png";
import useStore from "@/store";

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
  console.log('payload', payload)
  if (!payload || typeof payload !== "object") return [];
  const catArray: Category[] = [
    // {
    //   name: "Continue Reading",
    //   books: [],
    //   hasSub: false, // no sub-view for Continue Reading
    // },
  ];
  console.log('payload', payload)
  const uniqueBooks = new Set<number | string>();

  Object.entries(payload).forEach(([key, val]: [string, any]) => {
    if (Array.isArray(val)) {
      const books = val
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
          progress: 0,
          is_liked: item.is_liked,
        }));

      catArray.push({
        name: toTitle(key),
        books,
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
  subId?: number | null;   // <-- for lazy subcategory rows
}

interface Page {
  id: number;
  imageUrl: string;
  text: string;
}

interface Tab {
  label: string;
  icon: String;
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

const ContentLibrary: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // ensure we can always do tabsConfig[activeIndex].label without crashing
  const [tabsConfig, setTabsConfig] = useState<Tab[]>(
    defaultTabs.map((tab) => ({ ...tab, id: null }))
  );

  // a) Keep the entire cats array so we can reuse sub-categories
  const [allCats, setAllCats] = useState<any[]>([]);

  // Stories expansion state
  const [showAllStories, setShowAllStories] = useState(false);
  const [storiesActiveSubSlug, setStoriesActiveSubSlug] = useState<string | null>(null);

  // Languages expansion state
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [languagesActiveSubSlug, setLanguagesActiveSubSlug] = useState<string | null>(null);

  // ─── 1) state for pages + loading ───
  const [bookPages, setBookPages] = useState<Page[]>([]);
  const [readingLoading, setReadingLoading] = useState(false);

  // ─── 2) state for real video URL + poster ───
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [videoPoster, setVideoPoster] = useState<string>("");

  // ─── overview guard state ───
  const [overviewChecking, setOverviewChecking] = useState(false);

  const readingRef = useRef<ReadingHandle>(null);

  // 2) Track ongoing books state
  const [ongoingBooks, setOngoingBooks] = useState<Book[] | null>(null);

  useEffect(() => {
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
  }, []);

  // 3) Fetch ongoing and map to Book[]
  useEffect(() => {
    const pid = sessionStorage.getItem("profileId") || "";
    GetOngoingContents(pid)
      .then((res) => {
        const arr = res?.data?.data ?? res?.data ?? [];
        const books: Book[] = Array.isArray(arr)
          ? arr.map((it: any) => ({
              id: it.content_id ?? it.id,
              title: it.name ?? it.title ?? "",
              coverUrl: it.thumbnail ?? it.cover ?? it.image ?? "",
              progress: it.percentage ?? it.progress ?? 0,
              is_liked: it.is_liked,
            }))
          : [];
        setOngoingBooks(books);
      })
      .catch((err) => {
        console.error("GetOngoingContents failed", err);
        setOngoingBooks([]); // treat failure as “no ongoing” to hide section
      });
  }, []);

  // Get profileId from sessionStorage
  const profileId = sessionStorage.getItem("profileId");

  const urlState = React.useMemo(() => {
    const tab = Number(searchParams.get("tab")) || 0;
    const book = Number(searchParams.get("book")) || null;
    const read = searchParams.get("read") === profileId;
    const watch = searchParams.get("watch") === profileId;
    return { tab, book, read, watch };
  }, [searchParams, profileId]);

  const setTab = (idx: number) => setSearchParams({ tab: String(idx) });

  const openBook = (id: number) => {
    trace('openBook()', id);
    setSearchParams({ tab: String(urlState.tab), book: String(id) });
  };

  /** fetch + normalize pages for a given book id */
  const fetchBookPages = useCallback(async (id: number) => {
    setReadingLoading(true);
    try {
       const profileId = sessionStorage.getItem("profileId") || 0;
      const res = await GetContentById(String(id), profileId);
      if (!res.data.status) {
        // Assuming there's a notification system in place
        showNotification({
          message: res.data.message,
          title: "Notification"
        });
        return;
      }
      const data = res?.data?.data ?? res?.data;
      const rawPages: any[] = data.pages || [];
      const pages: Page[] = rawPages.map((p) => {
        // 2) pull image either from p.image or from an <img> in the HTML
        const html = p.web_body || p.body || "";
        const match = html.match(/<img[^>]+src="([^">]+)"/i);
        const imgSrc = p.image || (match && match[1]) || "";
        // 3) strip out any <img> tags so only text remains
        const text = html.replace(/<img[^>]*>/gi, "").trim();
        return { id: p.page_number, imageUrl: imgSrc, text };
      });
      setBookPages(pages);
    } catch (err) {
      console.error("🔴 failed to load pages", err);
      setBookPages([]);
    } finally {
      setReadingLoading(false);
    }
  }, []);

  const startRead = async (id: number) => {
    trace("startRead()", id);
    setSearchParams({ tab: String(urlState.tab), book: String(id), read: profileId ?? "" });
    await fetchBookPages(id);
  };

  const closeRead = () => {
    setBookPages([]);
    setSearchParams({ tab: String(urlState.tab), book: String(urlState.book!) });
  };

  const startWatch = async (id: number) => {
    trace("startWatch()", id);
    // 1) clear any previous video
    setVideoSrc("");
    setVideoPoster("");

    // 2) flip into “watch” mode
    setSearchParams({ tab: String(urlState.tab), book: String(id), watch: profileId ?? "" });

    // 3) fetch this book’s media[0]
    try {
      const res = await GetContentById(String(id), profileId);
      if (!res.data.status) {
        // Assuming there's a notification system in place
        showNotification({
          message: res.data.message,
          title: "Notification"
        });
        return;
      }
      const data = res?.data?.data ?? res?.data;
      const mediaItem = data.media?.[0] || {};
      setVideoSrc(mediaItem.file || "");
      setVideoPoster(mediaItem.thumbnail || "");
    } catch (err) {
      console.error("❌ failed to load video data", err);
      setVideoSrc("");
      setVideoPoster("");
    }
  };

  const closeWatch = () => {
    // clear out before we go
    setVideoSrc("");
    setVideoPoster("");
    setSearchParams({ tab: String(urlState.tab), book: String(urlState.book!) });
  };

  const closeBook = () => setSearchParams({ tab: String(urlState.tab) });

  const activeIndex = urlState.tab;

  const [mainSelected, setMainSelected] = useState<string | null>(null);
  const [subRequested, setSubRequested] = useState(false);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [crumb, setCrumb] = useState<string[]>([]);
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

  // ---------- quiz flow state ----------
  const [quizTarget, setQuizTarget] = useState<Book | null>(null);
  const [showWell, setShowWell] = useState(false);

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
  };

  const handleTakeQuiz = () => { setShowWell(false); };

  const handleDoLater = () => setShowWell(false);

  const handleQuizComplete = (stats: QuizStats, answers: UserAnswer[]) => {
    alert('handleQuizComplete');
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
  const isForYouTab = activeLabel === "For you";
  const isStoriesTab = activeLabel === "Stories";
  const isLangsTab = activeLabel === "Languages";
  const isLiteracyTab = activeLabel === "Literacy";

  // 1) Fetch categories whenever the active **tab** changes
  React.useEffect(() => {
    setMainSelected(null);
    setSubRequested(false);
    setSubcategories([]);
    setCrumb([]);
    setCategories([]);

    const load = async () => {
      // 1) For-you -------------------------------
      if (isForYouTab) {
        try {
          const res = await ContentForHome({});
          if (res?.status && res.data) {
            // 4) Inject “Continue Reading” only if we have items
            const cats = homeToCategories(res.data.data);
            const withOngoing =
              ongoingBooks && ongoingBooks.length > 0
                ? [{ name: "Continue Reading", books: ongoingBooks, hasSub: false }, ...cats]
                : cats;
            setCategories(withOngoing);
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
  }, [activeIndex, tabsConfig, allCats, ongoingBooks]);

  // when you land with ?read=1&book=### in the URL, rehydrate the pages
  useEffect(() => {
    if (urlState.read && urlState.book != null) {
      fetchBookPages(urlState.book);
    }
  }, [urlState.read, urlState.book, fetchBookPages]);

  // ─── new: on a fresh load with ?book=…, pull its real category & slug ───
  useEffect(() => {
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
    profileId
  ]);

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
    <div className="mx-auto w-[clamp(550px,100%,1440px)]">
      {/* Banner */}
      {activeLabel === "For you" && (
        <div className="relative h-auto sm:h-[220px] z-10 rounded-3xl bg-[#BCD678] px-4 py-6 sm:px-8 sm:py-10 overflow-visible mt-10">
          <div className="flex flex-col justify-center h-full">
            <h1 className="font-Inter font-[600] text-[36px] leading-[120%] mb-[14px] tracking-[-0.02em] text-gray-900">
              Content Library
            </h1>
            <p className="mt-1 font-Inter font-[500] text-[16px] leading-[145%] tracking-[0%] text-gray-700">
              Content Library
            </p>
          </div>
          <img
            src={TeacherIllustration}
            alt="Illustration"
            className="absolute bottom-[-20px] sm:bottom-[-38px] right-4 sm:right-6 w-20 sm:w-auto select-none pointer-events-none"
          />
        </div>
      )}

      {/* Tabs */}
      <LayoutGroup>
        <div className="sticky top-[-22px] flex gap-3 mb-6 flex-wrap mt-[52px] z-10">
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
              className="relative flex items-center gap-[7px] p-[12px] w-fit h-[48px] rounded-[8px] border border-gray-200 text-sm font-medium outline-none"
            >
              {idx === activeIndex && (
                <motion.div
                  layoutId="tabHighlight"
                  className="absolute inset-0 rounded-[8px] bg-[#BCD678] z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <img src={tab.icon} alt="Tab Icon" />
              </span>
              <span className="relative z-10 font-Inter font-[100] text-[16px] leading-[120%] tracking-[-0.02em] align-middle">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </LayoutGroup>

    

      {/* Unified Breadcrumb */}
      {displayCrumbs.length > 1 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center text-sm text-gray-600 space-x-2">
            {displayCrumbs.map((label, idx) => (
               <React.Fragment key={idx}>
                {idx > 0 && <FaChevronRight className="text-gray-400" />}
                <span
                  className={`${
                    idx === displayCrumbs.length - 1
                      ? "font-bold text-gray-900"
                      : "hover:underline cursor-pointer"
                  } font-arimo text-[14px] leading-[21px] tracking-[0.1px] align-middle`}
                  onClick={() => handleBreadcrumbClick(label, idx)}
                >
                  {label}
                </span>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      )}

        {/* Show the Literacy iframe if the tab is selected */}
        {tabsConfig[activeIndex]?.label === "Literacy" && (
        <div className="mt-6 w-full">
          <iframe
            src="https://interactive-app.kundakidsapi.com/"
            className="w-full h-[100vh] rounded-xl border"
            allow="fullscreen; autoplay; clipboard-read; clipboard-write"
            loading="lazy"
            title="Kunda Kids Interactive App"
          />
        </div>
      )}

      {/* 1) If we’re in “review answers” mode, only show the inline panel */}
      {showAnswerReview ? (
        <AnswerReviewModal
          answers={quizAnswers ?? []}
          onDone={handleReviewDone}
        />
      ) : (
        /* 2) Otherwise show the normal content area (reader / video / overview / categories) */
        <div className="mt-8 space-y-8">
          {readingBook ? (
            readingLoading ? (
              <div className="flex justify-center py-20">
                <span>Loading book…</span>
              </div>
            ) : (
              <ReadingComponent
                ref={readingRef}
                book={readingBook}
                onExit={closeRead}
                pages={bookPages}
                withIntroPages={false}
                onRetake={handleRetake}
                onViewAnswers={handleViewAnswers}
                onAnswersUpdate={(ans) => {
                  console.log("Parent got answers from ReadingComponent:", ans);
                  setQuizAnswers(ans);
                }}
              />
            )
          ) : watchingBook ? (
            <VideoComponent
              book={{
                id: watchingBook.id,
                title: watchingBook.title,
                coverUrl: watchingBook.title,
                progress: 0,
              }}
              key={videoSrc || watchingBook.id}
              videoSrc={videoSrc}
              poster={videoPoster}
              title={watchingBook.title}
              onRetake={handleRetake}
              onClose={closeWatch}
              onViewAnswers={handleViewAnswers}
              onComplete={() => handleMediaComplete(watchingBook)}
            />
          ) : /* don't mount overview while checking or if guard failed */ 
            (selectedBook && !overviewChecking) ? (
            <BookOverview
              book={selectedBook}
              crumb={crumbsBeforeBook}
              onBack={closeBook}
              onRead={(b: any) => startRead(b.id)}
              onWatch={(b: any) => startWatch(b.id)}
              audioSrc={QueenMoremi}
            />
          ) : (
            <>
              {/* ───── Stories tab ───── */}
              {/* ───── Stories tab ───── */}
{/* ───── Stories tab ───── */}
{isStoriesTab &&
  displayList
    .filter((cat) => !showAllStories || cat.name === storiesActiveSubSlug)
    .map((cat) => {
      // full ordered list for the Stories tab
      const allRows = categories; // your existing ordered array for the tab
      const idx = allRows.findIndex((r: any) => r?.subId === cat?.subId);

      // compute the next two unseen neighbors
      const nextTwo: number[] = [];
      for (let k = idx + 1; k <= idx + 2 && k < allRows.length; k++) {
        const nid = allRows[k]?.subId;
        if (typeof nid === "number") nextTwo.push(nid);
      }

      console.log("%c[ContentLibrary] prefetchNext (Stories)",
        "color:#BCD678;font-weight:bold",
        { for: cat.name, subId: cat.subId, nextTwo }
      );

      return (
        <BookCategory
          key={`${cat.name}-${cat.subId ?? "x"}`}
          subId={cat.subId}
          categoryName={cat.name}
          tabLabel="Stories"
          onSeeAll={() => handleStoriesSeeAll(cat.name)}
          expanded={showAllStories && cat.name === storiesActiveSubSlug}
          onBookClick={(book: any, bc: any) => {
            openBook(book.id);
            setCrumb([...bc, book.title]);
          }}
          // **this is the important part**
          prefetchNext={nextTwo}
        />
      );
    })}



              {/* ───── Languages tab ───── */}
             {/* ───── Languages tab ───── */}
{/* ───── Languages tab ───── */}
{isLangsTab &&
  displayList
    .filter((cat) => !showAllLanguages || cat.name === languagesActiveSubSlug)
    .map((cat) => {
      const allRows = categories; // full ordered list for Languages
      const idx = allRows.findIndex((r: any) => r?.subId === cat?.subId);

      const nextTwo: number[] = [];
      for (let k = idx + 1; k <= idx + 2 && k < allRows.length; k++) {
        const nid = allRows[k]?.subId;
        if (typeof nid === "number") nextTwo.push(nid);
      }

      console.log("%c[ContentLibrary] prefetchNext (Languages)",
        "color:#BCD678;font-weight:bold",
        { for: cat.name, subId: cat.subId, nextTwo }
      );

      return (
        <BookCategory
          key={`${cat.name}-${cat.subId ?? "x"}`}
          subId={cat.subId}
          categoryName={cat.name}
          tabLabel="Languages"
          onSeeAll={() => handleLanguagesSeeAll(cat.name)}
          expanded={showAllLanguages && cat.name === languagesActiveSubSlug}
          onBookClick={(book: any, bc: any) => {
            openBook(book.id);
            setCrumb([...bc, book.title]);
          }}
          prefetchNext={nextTwo}
        />
      );
    })}



              {/* ───── For-you tab ───── */}
              {isForYouTab &&
                displayList.map(cat => (
                  <BookCategory
                    key={cat.name}
                    categoryName={cat.name}
                    tabLabel="For you"
                    parentCategory={mainSelected ?? undefined}
                    books={cat.books}
                    hasSub={cat.hasSub}
                    onSeeAll={() => toggleForYouRow(cat.name)}
                    expanded={!!expandedSimple[cat.name]}
                    emptyMsg={
                      cat.name === "Continue Reading" ? "No content available" : undefined
                    }
                    onBookClick={(book: any, bc: any) => {
                      openBook(book.id);
                      setCrumb([...bc, book.title]);
                    }}
                  />
                ))}
            </>
          )}
        </div>
      )}

      {/* --------- MODALS & QUIZ (only when NOT reviewing) --------- */}
      {!showAnswerReview && (
        <>
          {showWell && quizTarget && (
            <WellDoneModal
              message="You've just finished!"
              onTakeQuiz={handleTakeQuiz}
              onLater={handleDoLater}
              onRetake={handleRetake}
            />
          )}
          {quizTarget && (
            <QuizComponent
              onRetake={handleRetake}
              key={quizTarget.id}    
              book={quizTarget}
              onComplete={handleQuizComplete}
              resetSignal={quizReset}
              onAnswersChange={(ans) => {
                console.log("sync parent answers:", ans);
                setQuizAnswers(ans);
              }}
            />
          )}
          {showResult && quizStats && (
             <QuizResultModal
              stats={{
                correct: quizStats.correct,
                 incorrect: quizStats.total - quizStats.correct,
                skipped: quizStats.skipped,
                total: quizStats.total
              }}
              onClose={() => setShowResult(false)}
              onRetake={handleRetake}
              onViewAnswers={handleViewAnswers}
            />
          )}
        </>
      )}
    </div>
  );
};
export default ContentLibrary;