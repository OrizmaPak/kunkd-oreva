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
import { useSearchParams, useLocation } from "react-router-dom";
import VideoComponent from "@/components/VideoComponent";
import WellDoneModal from "@/components/WellDoneModal";
import QuizComponent, { QuizStats, UserAnswer } from "@/components/QuizComponent";
import QuizResultModal from "@/components/QuizResultModal"
import QueenMoremi from "@/audiobooks/QueenMoremi.mp3";
import AnswerReviewModal from "@/components/AnswerReviewModal";
import AudioComponent from "@/components/AudioComponent";


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
import { getUserState } from "@/store/authStore";
import { AlertDialogOverlay } from "@chakra-ui/react";


// --- Empty state for Favourites (Stories/Languages) ---
const EmptyFavourites: React.FC<{ label: "Stories" | "Languages" }> = ({ label }) => (
  <div
    className="w-full rounded-2xl border border-gray-200/70 bg-white dark:bg-slate-900/40 p-10 flex flex-col items-center justify-center text-center shadow-sm"
    data-testid={`empty-${label.toLowerCase()}`}
  >
    {/* envelope/image-ish icon */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="currentColor" className="h-10 w-10 text-gray-300 dark:text-slate-600">
      <path d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Zm2.25-.75a.75.75 0 0 0-.75.75V8.7l3.098-2.066a1.5 1.5 0 0 1 1.704.01l4.593 3.062a.75.75 0 0 0 .84-.001l2.517-1.696A1.5 1.5 0 0 1 19.5 8.7v-1.2a.75.75 0 0 0-.75-.75H5.25Z"/>
    </svg>

    <h3 className="mt-4 text-base font-semibold text-gray-700 dark:text-gray-200">
      No favourites for {label}
    </h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-md">
      When you add {label.toLowerCase()} to favourites, they’ll appear here.
    </p>
  </div>
);

/* helper: map ongoing payload → Book[] */
const mapOngoingToBooks = (raw: any[]): Book[] => {
  if (!Array.isArray(raw)) return [];
  return raw.map((it: any) => {
    const totalPages = Array.isArray(it.pages) ? it.pages.length : 0;
    const pagesRead = Number(it.pages_read) || 0;
    const progress =
      totalPages > 0 ? Math.max(0, Math.min(100, Math.round((pagesRead * 100) / totalPages))) : 0;

    return {
      id: it.id,
      title: it.name ?? "",
      coverUrl: it.thumbnail ?? "",
      progress,
      is_liked: it.is_liked,
    };
  });
};



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



// console.log('GetCompletedContents', GetCompletedContents(sessionStorage.getItem("profileId")));
const ContentLibrary: React.FC<{ state?: string }> = ({ state = 'home' }) => {
  const [user] = useStore(getUserState);
  const defaultTabs: Omit<Tab, "id">[] = [
    // { label: "Literacy", icon: literacy },
    { label: "For you", icon: foryou },
    ...(user?.role !== 'usern' ? [
      { label: "Stories", icon: story },
      { label: "Languages", icon: languages }
    ] : [])
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  // group favourites by top category AND subcategory name
const [favBuckets, setFavBuckets] = useState<{ stories: Book[]; languages: Book[] }>({ stories: [], languages: [] });
const [favStoriesBySub, setFavStoriesBySub] = useState<Record<string, Book[]>>({});
const [favLangsBySub, setFavLangsBySub] = useState<Record<string, Book[]>>({});

  // const location = useLocation() as { state?: any };
  const [favMode, setFavMode] = useState(state === "fav");
  const [favLoading, setFavLoading] = useState(false);
  useEffect(() => {
    console.log('State has changed:', state);
    // alert('State has changed:' + state);
    setFavMode(state === "fav");  
  }, [state]);
  console.log('state', state)
  // ensure we can always do tabsConfig[activeIndex].label without crashing
  const [tabsConfig, setTabsConfig] = useState<Tab[]>(
    defaultTabs
      .filter((tab) => !(favMode && tab.label === "Literacy"))
      .map((tab) => ({ ...tab, id: null }))
  );

  useEffect(() => {
    const updatedTabsConfig = defaultTabs
      .filter((tab) => !(favMode && tab.label === "Literacy"))
      .map((tab) => ({ ...tab, id: null }));
    setTabsConfig(updatedTabsConfig);
  }, [favMode, state]);

  const [profiles] = useStore(getProfileState);

  function getIframeLink() {
    const profileId = sessionStorage.getItem("profileId");
    if(user.role !== 'user') return 'https://interactive-app.kundakidsapi.com/';
    if (!profileId) return null;

    const profile = profiles?.find((p) => p.id === Number(profileId));
    console.log("profile", profile?.interactive_app_url);
    return profile ? profile?.interactive_app_url : 'https://interactive-app.kundakidsapi.com/';
  }

  // ---- ongoing “Continue Reading” state (must be inside the component) ----
  const [ongoingBooks, setOngoingBooks] = useState<Book[]>([]);

  const refreshOngoing = useCallback(() => {
    const pid = sessionStorage.getItem("profileId") || "";
    trace("GetOngoingContents → profileId:", pid);

    GetOngoingContents(pid)
      .then((res) => {
        const raw = res?.data?.data?.ongoing_contents;
        if (!Array.isArray(raw)) {
          trace("GetOngoingContents: no ongoing contents found");
          setOngoingBooks([]);
          return;
        }

        const books: Book[] = raw.map((it: any) => {
          const totalPages = Array.isArray(it.pages) ? it.pages.length : 0;
          const pagesRead = Number(it.pages_read) || 0;
          const progress =
            totalPages > 0 ? Math.max(0, Math.min(100, Math.round((pagesRead * 100) / totalPages))) : 0;

          return {
            id: it.id,
            title: it.name ?? "",
            coverUrl: it.thumbnail ?? "",
            progress,
            is_liked: it.is_liked,
          };
        });

        trace("GetOngoingContents → mapped books:", books);
        setOngoingBooks(books);
      })
      .catch((err) => {
        console.error("GetOngoingContents failed", err);
        setOngoingBooks([]);
      });
      console.log('GetOngoingContents → mapped books:', ongoingBooks);
  }, []);

  // fetch once on mount
  useEffect(() => {
    refreshOngoing();
  }, [refreshOngoing]);

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

  // audio
const [audioSrc, setAudioSrc] = useState<string>("");


  // ─── overview guard state ───
  const [overviewChecking, setOverviewChecking] = useState(false);

  const readingRef = useRef<ReadingHandle>(null);


  // Partition favourites into Stories vs Languages
  const partitionFavouriteRecords = React.useCallback((records: any[]) => {
    const stories: Book[] = [];
    const languages: Book[] = [];
    const storiesBySub: Record<string, Book[]> = {};
    const langsBySub: Record<string, Book[]> = {};
  
    records.forEach((it: any) => {
      const catLabel = String(
        it.category || it.category_name || it.content_type || it.category_slug || it.categoryTitle || ""
      ).toLowerCase();
  
      // try to pick a subcategory label if present; fallback to a stable bucket
      const subLabelRaw =
        it.sub_category_name ||
        it.sub_category ||
        it.sub_category_title ||
        it.sub_category_slug ||
        it.subCategory ||
        "";
      const subLabel = String(subLabelRaw).trim() || (/(lang)/.test(catLabel) ? "" : "");
  
      const book: Book = {
        id: it.id ?? it.content_id ?? 0,
        title: it.name ?? it.title ?? "",
        coverUrl: it.thumbnail ?? it.cover ?? it.image ?? "",
        progress: Number(it.percentage ?? it.progress ?? 0) || 0,
        is_liked: true,
      };
  
      const isLanguage = /lang/.test(catLabel) || it.category_id === 4 || it.content_type_id === 4;
  
      if (isLanguage) {
        languages.push(book);
        (langsBySub[subLabel] ||= []).push(book);
      } else {
        stories.push(book);
        (storiesBySub[subLabel] ||= []).push(book);
      }
    });
  
    return { stories, languages, storiesBySub, langsBySub };
  }, []);
  


  useEffect(() => {
    // For favourites view, we don't need to fetch subcategories or mutate tabsConfig from API.
    if (favMode) {
      // keep default tabs (Stories/Languages), no IDs needed in fav view
      setAllCats([]); // ensure non-favourites logic won't run accidentally
      setTabsConfig(defaultTabs.map((tab) => ({ ...tab, id: null })));
      return;
    }
  
    // Non-favourites: fetch subcategories once and set ids for Stories/Languages
    GetSubCategories().then((res) => {
      if (res?.data?.status && Array.isArray(res.data.data)) {
        const cats = res.data.data;
        setAllCats(cats);
        const populated: Tab[] = defaultTabs.map((tab) => {
          const match = cats.find((c: any) => c.name === tab.label);
          return { ...tab, id: match?.id ?? null };
        });
        setTabsConfig(populated);
      } else {
        setAllCats([]);
        setTabsConfig(defaultTabs.map((tab) => ({ ...tab, id: null })));
      }
    }).catch(() => {
      setAllCats([]);
      setTabsConfig(defaultTabs.map((tab) => ({ ...tab, id: null })));
    });
  }, [favMode]);
  

  // Get profileId from sessionStorage
  const profileId = sessionStorage.getItem("profileId");

  const urlState = React.useMemo(() => {
    const tab = Number(searchParams.get("tab")) || 0;
    const book = Number(searchParams.get("book")) || null;
    const read = searchParams.get("read") === profileId;
    const watch = searchParams.get("watch") === profileId;
    const listen = searchParams.get("listen") === profileId; // NEW
    return { tab, book, read, watch, listen };
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

  const startListen = async (id: number) => {
    trace("startListen()", id);
    setAudioSrc("");
    setSearchParams({ tab: String(urlState.tab), book: String(id), listen: profileId ?? "" });
  
    try {
      const res = await GetContentById(String(id), profileId);
      if (!res?.data?.status) {
        showNotification({ title: "Notification", message: res?.data?.message || "Failed to load audio" });
        return;
      }
      const data = res?.data?.data ?? res?.data;
      // try to pick an audio media; fallback to first media if mp3
      const audioItem = Array.isArray(data?.media)
        ? data.media.find((m: any) =>
            String(m?.type || m?.media_type || "").toLowerCase().includes("audio")
          ) || data.media.find((m: any) => String(m?.file || "").toLowerCase().endsWith(".mp3"))
        : null;
  
      setAudioSrc(audioItem?.file || "");
    } catch (err) {
      console.error("❌ failed to load audio data", err);
      setAudioSrc("");
    }
  };
  
  const closeListen = () => {
    setAudioSrc("");
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

  const loadFavourites = React.useCallback(async () => {
    const pid = sessionStorage.getItem("profileId") || "";
    setFavLoading(true);
    if (!pid) {
      setCategories([]); setSubcategories([]); setCrumb(["Favourites"]);
      setFavBuckets({ stories: [], languages: [] });
      setFavStoriesBySub({}); setFavLangsBySub({});
      setFavLoading(false);
      return;
    }
    try {
      const res = await GetLikedContent(pid);
      const records = res?.data?.data?.records ?? [];
      const { stories, languages, storiesBySub, langsBySub } = partitionFavouriteRecords(records);
  
      setFavBuckets({ stories, languages });
      setFavStoriesBySub(storiesBySub);
      setFavLangsBySub(langsBySub);
  
      // Seed initial list (default to Stories)
      const defaultLabel = tabsConfig[activeIndex]?.label ?? "Stories";
      const sel = defaultLabel === "Languages" ? languages : stories;
      setCategories([{ name: defaultLabel, books: sel, hasSub: false }]);
      setSubcategories([]);
      setCrumb(["Favourites", defaultLabel]);
    } catch (err) {
      console.error("[ContentLibrary] GetLikedContent failed", err);
      setCategories([]); setSubcategories([]); setCrumb(["Favourites"]);
      setFavBuckets({ stories: [], languages: [] });
      setFavStoriesBySub({}); setFavLangsBySub({});
    } finally {
      setFavLoading(false);
    }
  }, [activeIndex, tabsConfig, partitionFavouriteRecords]);
  
  
    useEffect(() => {
      if (favMode) {
        loadFavourites();
      }
    }, [favMode, loadFavourites]);

    // Whenever we switch tabs inside Favourites, show the right bucket
useEffect(() => {
  if (!favMode) return;

  const activeLabel = tabsConfig[activeIndex]?.label ?? "Stories";
  const selected =
    activeLabel === "Languages" ? favBuckets.languages : favBuckets.stories;

  setCategories([{ name: activeLabel, books: selected, hasSub: false }]);
  setSubcategories([]);
  setCrumb(["Favourites", activeLabel]);
}, [favMode, activeIndex, tabsConfig, favBuckets]);



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
  const listeningBook = urlState.listen ? selectedBook : null;


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
    // setQuizTarget(book);
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

  // ── Favourites render helpers (avoid relying on allCats)
  const favTabLabel: "Stories" | "Languages" =
    tabsConfig[activeIndex]?.label === "Languages" ? "Languages" : "Stories";

  const favSelected: Book[] =
    favTabLabel === "Languages" ? (favBuckets.languages ?? []) : (favBuckets.stories ?? []);

  // Is the active favourites tab empty?
  const showFavEmpty = favMode && !favLoading && favSelected.length === 0;



  // 1) Fetch categories whenever the active **tab** changes
 // 1) Fetch categories whenever the active **tab** changes
React.useEffect(() => {
  if (favMode) return; // do not overwrite favourites view
  let cancelled = false;

  // always reset these small flags
  setMainSelected(null);
  setSubRequested(false);
  setSubcategories([]);
  setCrumb([]);

  // ⚠️ Keep current categories on screen for For you to avoid a blink
  const shouldClearList = !(isForYouTab);
  if (shouldClearList) setCategories([]);

  const load = async () => {
    // ------- For you (no flicker) -------
    if (isForYouTab && state !== 'fav') {
      try {
        const pid = sessionStorage.getItem("profileId") || "";

        // Fetch both payloads at once and set UI ONCE.
        const [homeRes, ongoingRes] = await Promise.allSettled([
          ContentForHome({}),
          pid ? GetOngoingContents(pid) : Promise.resolve({ data: { data: { ongoing_contents: [] } } }),
        ]);

        // Home cats
        const homeCats =
          homeRes.status === "fulfilled" && homeRes.value?.data?.status && homeRes.value?.data?.data
            ? homeToCategories(homeRes.value.data.data)
            : [];

        // Ongoing → Book[]
        const ongoingRaw =
          ongoingRes.status === "fulfilled"
            ? ongoingRes.value?.data?.data?.ongoing_contents
            : [];
        const ongoingLocal = mapOngoingToBooks(ongoingRaw || []);

        // Build once, then set
        const withOngoing =
          ongoingLocal.length > 0
            ? [{ name: "Continue Reading", books: ongoingLocal, hasSub: false }, ...homeCats]
            : [{ name: "Continue Reading", books: [], hasSub: false }, ...homeCats];

        // keep only categories that actually have books
if (!cancelled) {
  const pruned = withOngoing.filter((c) => Array.isArray(c.books) && c.books.length > 0);
  setCategories(pruned);
}

        return;
      } catch (e) {
        console.warn("For you load failed, show Continue Reading row only", e);
        if (!cancelled) setCategories([]); // no empty rows on For you
        return;
      }
    }

    // ------- Stories -------
    if (isStoriesTab) {
      if (allCats.length === 0) {
        if (!cancelled) setCategories([{ name: "", books: [], hasSub: false, subId: null }]);
        return;
      }
      const storiesCat = allCats.find((c) => c.name === "Stories");
      if (!cancelled) {
        setCategories(
          (storiesCat?.sub_categories || []).map((sub: any) => ({
            name: sub.name,
            books: [],
            hasSub: false,
            subId: sub.id,
          }))
        );
      }
      return;
    }

    // ------- Languages -------
    if (isLangsTab) {
      if (allCats.length === 0) {
        if (!cancelled) setCategories([{ name: "", books: [], subId: null }]);
        return;
      }
      const langsCat = allCats.find((c) => c.name === "Languages");
      if (!cancelled) {
        setCategories(
          (langsCat?.sub_categories || []).map((sub: any) => ({
            name: sub.name,
            books: [],
            hasSub: false,
            subId: sub.id,
          }))
        );
      }
      return;
    }

    // ------- Literacy -------
    if (isLiteracyTab) {
      if (!cancelled) setCategories([]);
      return;
    }
  };

  // Call immediately (no artificial timeout). We keep old UI for For you.
  load();

  return () => {
    cancelled = true;
  };
  // ⬇️ Notice: ongoingBooks removed from deps to prevent re-run/flicker
}, [activeIndex, tabsConfig, allCats, favMode, isForYouTab, isStoriesTab, isLangsTab, isLiteracyTab, state]);


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

      const displayListPruned = isForYouTab
  ? displayList.filter((cat) => Array.isArray(cat.books) && cat.books.length > 0)
  : displayList;

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
      {/* Banner */}
      {activeLabel === "For you" && state !== 'fav' && (
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
            (state !== 'fav' || tab.label !== "For you") && (
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
            )
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
            src={getIframeLink()}
            className="w-full h-[80vh] rounded-xl border"
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
<>
  {readingBook ? (
    readingLoading ? (
      <div className="py-14 text-center text-sm text-gray-500"></div>
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
        coverUrl: watchingBook.coverUrl,
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
  ) : listeningBook ? (
    <AudioComponent
      book={{
        id: listeningBook.id,
        title: listeningBook.title,
        coverUrl: listeningBook.coverUrl,
        progress: 0,
      }}
      audioSrc={audioSrc}
      onClose={closeListen}
      onRead={() => {
        closeListen();
        startRead(listeningBook.id);
      }}
      onComplete={() => handleMediaComplete(listeningBook)}
    />
  ) : overviewChecking ? (
    <div className="py-14 text-center text-sm text-gray-500">Loading…</div>
  ) : (selectedBook && !readingBook && !watchingBook) ? (
    <BookOverview
      book={selectedBook}
      crumb={displayCrumbs}
      onBack={closeBook}
      onRead={() => startRead(selectedBook.id)}
      onWatch={() => startWatch(selectedBook.id)}
      audioSrc={QueenMoremi}
      onListen={() => startListen(selectedBook.id)}   
    />
  ) : favMode ? (
    // ─────────────── FAVOURITES-ONLY RENDER (no allCats/subcats) ───────────────
    favLoading ? (
      <div className="py-14 text-center text-sm text-gray-500">Loading favourites…</div>
    ) : showFavEmpty ? (
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <EmptyFavourites label={favTabLabel} />
      </div>
    ) : (
      <div className="mt-6 space-y-8">
        <BookCategory
          key={`fav-${favTabLabel}`}
          tabLabel={favTabLabel}
          categoryName={favTabLabel}
          books={favSelected}
          hasSub={false}
          expanded={true}
          onSeeAll={undefined}
          onBookClick={(book: any, bc: any) => {
            openBook(book.id);
            setCrumb(["Favourites", favTabLabel, book.title]);
          }}
        />
      </div>
    )
  ) : (
    // ─────────────── NON-FAVOURITES RENDER (existing logic) ───────────────
    <div className="mt-6 space-y-8">
      {isStoriesTab &&
        (() => {
          const storiesCat = allCats.find((c: any) => c.name === "Stories");
          const rows: Array<{ name: string; subId: number | null }> =
            (storiesCat?.sub_categories ?? []).map((s: any) => ({
              name: s?.name ?? "",
              subId: typeof s?.id === "number" ? s.id : null,
            }));

          const visibleRows = rows.filter(r =>
            !showAllStories || r.name === (storiesActiveSubSlug ?? r.name)
          );

          return visibleRows.map((row) => {
            const originalIndex = rows.findIndex(r => r.subId === row.subId);
            const nextTwo: number[] = [];
            for (let k = originalIndex + 1; k <= originalIndex + 2 && k < rows.length; k++) {
              const nid = rows[k]?.subId;
              if (typeof nid === "number") nextTwo.push(nid);
            }

            return (
              <BookCategory
                key={`${row.name}-${row.subId ?? "x"}`}
                subId={row.subId}
                categoryName={row.name}
                tabLabel="Stories"
                expanded={showAllStories && row.name === storiesActiveSubSlug}
                onSeeAll={() => {
                  if (showAllStories && row.name === storiesActiveSubSlug) {
                    setShowAllStories(false);
                    setStoriesActiveSubSlug(null);
                  } else {
                    setShowAllStories(true);
                    setStoriesActiveSubSlug(row.name);
                  }
                }}
                onBookClick={(book, bc) => {
                  openBook(book.id);
                  setCrumb([...bc, book.title]);
                }}
                prefetchNext={nextTwo}
              />
            );
          });
        })()}

      {isLangsTab &&
        displayList
          .filter(cat => !showAllLanguages || cat.name === languagesActiveSubSlug)
          .map(cat => (
            <BookCategory
              subId={cat.subId}
              key={cat.name}
              categoryName={cat.name}
              tabLabel="Languages"
              parentCategory={undefined}
              books={cat.books}
              hasSub={!!cat.subId}
              onSeeAll={() => handleLanguagesSeeAll(cat.name)}
              expanded={showAllLanguages && cat.name === languagesActiveSubSlug}
              onBookClick={(book: any, bc: any) => {
                openBook(book.id);
                setCrumb([...bc, book.title]);
              }}
            />
          ))}

      {isForYouTab &&
        displayListPruned.map((cat) => (
          <BookCategory
            key={cat.name}
            tabLabel="For you"
            categoryName={cat.name}
            books={cat.books}
            hasSub={false}
            expanded={!!expandedSimple[cat.name]}
            onSeeAll={() => toggleForYouRow(cat.name)}
            onBookClick={(book: any, bc: any) => {
              openBook(book.id);
              setCrumb([...bc, book.title]);
            }}
            emptyMsg={cat.name === "Continue Reading" ? "No ongoing content yet" : undefined}
          />
        ))}
    </div>
  )}
</>
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
          {quizTarget && showQuiz && (
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