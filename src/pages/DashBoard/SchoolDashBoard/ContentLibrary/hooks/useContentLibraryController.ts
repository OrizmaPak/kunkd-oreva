// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/hooks/useContentLibraryController.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ContentForHome,
  GetSubCategories,
  GetOngoingContents,
  GetLikedContent,
  GetContentById,
} from "@/api/api";
import type { Book } from "@/components/BookCard";
import type { QuizStats, UserAnswer } from "@/components/QuizComponent";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { showNotification } from "@mantine/notifications";
import { homeToCategories, defaultTabs } from "../utils/helpers";
import type { Category, Tab } from "../types/contentLibrary";
import { deriveMediaAttributes } from "@/utils/media";
import { useBookActions } from "./useBookActions";
import { useQuizFlow } from "./useQuizFlow";

type HydratedBookMeta = {
  hasAudio: boolean;
  hasText: boolean;
  audioSources: string[];
};

const FOR_YOU_SKELETON_COUNT = 8;

const mapOngoingToBooks = (raw: any[]): Book[] => {
  if (!Array.isArray(raw)) return [];
  return raw.map((item: any) => {
    const totalPages = Array.isArray(item?.pages) ? item.pages.length : 0;
    const pagesRead = Number(item?.pages_read) || 0;
    const progress =
      totalPages > 0
        ? Math.max(0, Math.min(100, Math.round((pagesRead * 100) / totalPages)))
        : 0;

    const mediaAttributes = deriveMediaAttributes(item);

    return {
      id: item?.id,
      title: item?.name ?? "",
      coverUrl: item?.thumbnail ?? "",
      progress,
      is_liked: item?.is_liked,
      hasAudio: mediaAttributes.hasAudio,
      hasText: mediaAttributes.hasText,
      audioSources: mediaAttributes.audioSources,
    } as Book;
  });
};

const partitionFavouriteRecords = (records: any[]) => {
  const stories: Book[] = [];
  const languages: Book[] = [];
  const storiesBySub: Record<string, Book[]> = {};
  const langsBySub: Record<string, Book[]> = {};

  records.forEach((item: any) => {
    const catLabel = String(
      item?.category ||
        item?.category_name ||
        item?.content_type ||
        item?.category_slug ||
        item?.categoryTitle ||
        ""
    ).toLowerCase();

    const subLabel = String(
      item?.sub_category_name ||
        item?.sub_category ||
        item?.sub_category_title ||
        item?.sub_category_slug ||
        item?.subCategory ||
        ""
    ).trim();

    const mediaAttributes = deriveMediaAttributes(item);

    const book: Book = {
      id: item?.id ?? item?.content_id ?? 0,
      title: item?.name ?? item?.title ?? "",
      coverUrl: item?.thumbnail ?? item?.cover ?? item?.image ?? "",
      progress: Number(item?.percentage ?? item?.progress ?? 0) || 0,
      is_liked: true,
      hasAudio: mediaAttributes.hasAudio,
      hasText: mediaAttributes.hasText,
      audioSources: mediaAttributes.audioSources,
    };

    const isLanguage = /lang/.test(catLabel) || item?.category_id === 4 || item?.content_type_id === 4;

    if (isLanguage) {
      languages.push(book);
      (langsBySub[subLabel] ||= []).push(book);
    } else {
      stories.push(book);
      (storiesBySub[subLabel] ||= []).push(book);
    }
  });

  return { stories, languages, storiesBySub, langsBySub };
};

export interface HeaderController {
  activeIndex: number;
  tabsConfig: Tab[];
  state: string;
  onTabSelect: (idx: number) => void;
}

export interface BreadcrumbController {
  crumbs: string[];
  onCrumbClick: (label: string, idx: number) => void;
}

export interface FavouriteState {
  activeLabel: "Stories" | "Languages";
  loading: boolean;
  selected: Book[];
  empty: boolean;
}

export interface CategoryState {
  isForYou: boolean;
  isStories: boolean;
  isLanguages: boolean;
  isLiteracy: boolean;
  list: Category[];
  prunedForYou: Category[];
  allCats: any[];
  loading: boolean;
  forYouLoading: boolean;
  showAllStories: boolean;
  storiesActiveSubSlug: string | null;
  setShowAllStories: (value: boolean) => void;
  setStoriesActiveSubSlug: (slug: string | null) => void;
  showAllLanguages: boolean;
  languagesActiveSubSlug: string | null;
  setShowAllLanguages: (value: boolean) => void;
  setLanguagesActiveSubSlug: (slug: string | null) => void;
  expandedSimple: Record<string, boolean>;
  toggleForYouRow: (name: string) => void;
  openBook: (id: number) => void;
  setCrumb: (crumbs: string[]) => void;
}

export interface MediaState {
  readingBook: Book | null;
  readingRef: RefObject<unknown>;
  readingLoading: boolean;
  bookPages: any[];
  startRead: (id: number) => void;
  closeRead: () => void;
  watchingBook: Book | null;
  videoSrc: string;
  videoPoster: string;
  startWatch: (id: number) => void;
  closeWatch: () => void;
  listeningBook: Book | null;
  audioSrc: string;
  listeningHasText: boolean;
  startListen: (id: number, book?: Book | null) => void;
  closeListen: () => void;
  closeBook: () => void;
  selectedBook: Book | null;
  crumbsBeforeBook: string[];
}

export interface QuizState {
  completionMode: "read" | "watch" | "listen";
  showAnswerReview: boolean;
  quizAnswers: UserAnswer[] | null;
  handleReviewDone: () => void;
  handleRetake: () => void;
  handleViewAnswers: () => void;
  handleMediaComplete: (book: Book | null, mode?: "read" | "watch" | "listen") => void;
  handleListenAgain: () => void;
  handleListenGoBack: () => void;
  setAnswers: (answers: UserAnswer[]) => void;
}

export interface BodyController {
  favMode: boolean;
  favourites: FavouriteState;
  categories: CategoryState;
  media: MediaState;
  quiz: QuizState;
  displayCrumbs: string[];
  showFavEmpty: boolean;
  favBuckets: { stories: Book[]; languages: Book[] };
  favStoriesBySub: Record<string, Book[]>;
  favLangsBySub: Record<string, Book[]>;
  showForYouSkeleton: boolean;
  forYouSkeletonCount: number;
}

export interface ModalsController {
  showWell: boolean;
  showQuiz: boolean;
  showResult: boolean;
  quizTarget: Book | null;
  quizStats: QuizStats | null;
  quizReset: number;
  completionMode: "read" | "watch" | "listen";
  onTakeQuiz: () => void;
  onLater: () => void;
  onRetake: () => void;
  onViewAnswers: () => void;
  onCloseResult: () => void;
  onQuizComplete: (stats: QuizStats, answers: UserAnswer[]) => void;
  onAnswersChange: (answers: UserAnswer[]) => void;
  onReplayListen?: () => void;
  onListenGoBack?: () => void;
}

export interface ContentLibraryController {
  layoutClassName: string;
  header: HeaderController;
  breadcrumb: BreadcrumbController;
  body: BodyController;
  modals: ModalsController;
}

type SearchParamsSetter = (
  next: URLSearchParams | string | Record<string, string>,
  options?: { replace?: boolean },
) => void;

type UrlState = {
  tab: number;
  book: number | null;
  read: boolean;
  watch: boolean;
  listen: boolean;
};

export const useContentLibraryController = (state: string): ContentLibraryController => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user] = useStore(getUserState);

  const profileId = useMemo(() => sessionStorage.getItem("profileId"), []);

  const baseTabs: Omit<Tab, "id">[] = useMemo(() => {
    const includeStoryAndLanguage = user?.role !== "usern";
    const coreTabs = defaultTabs.filter((tab) => tab.label !== "Literacy");
    if (includeStoryAndLanguage) return coreTabs;
    return coreTabs.filter((tab) => tab.label === "For you");
  }, [user?.role]);

  const [tabsConfig, setTabsConfig] = useState<Tab[]>(baseTabs.map((tab) => ({ ...tab, id: null })));

  useEffect(() => {
    setTabsConfig(baseTabs.map((tab) => ({ ...tab, id: null })));
  }, [baseTabs]);

  const [favMode, setFavMode] = useState(state === "fav");
  useEffect(() => {
    setFavMode(state === "fav");
  }, [state]);

  const urlState: UrlState = useMemo(() => {
    const tabIndex = Number(searchParams.get("tab") ?? "0");
    const bookParam = searchParams.get("book");
    const bookId = bookParam != null ? Number(bookParam) : NaN;
    const readParam = searchParams.get("read");
    const watchParam = searchParams.get("watch");
    const listenParam = searchParams.get("listen");

    return {
      tab: Number.isFinite(tabIndex) ? tabIndex : 0,
      book: Number.isFinite(bookId) ? bookId : null,
      read: !!readParam && readParam === (profileId ?? readParam),
      watch: !!watchParam && watchParam === (profileId ?? watchParam),
      listen: !!listenParam && listenParam === (profileId ?? listenParam),
    };
  }, [searchParams, profileId]);

  const activeIndex = useMemo(() => {
    if (!tabsConfig.length) return 0;
    return Math.min(Math.max(urlState.tab, 0), tabsConfig.length - 1);
  }, [tabsConfig.length, urlState.tab]);

  const setTab = useCallback(
    (idx: number) => {
      const params = new URLSearchParams();
      params.set("tab", String(idx));
      setSearchParams(params, { replace: true });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (urlState.tab !== activeIndex) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", String(activeIndex));
      setSearchParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, urlState.tab]);

  const [allCats, setAllCats] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [forYouLoading, setForYouLoading] = useState(false);
  const forYouLoadedRef = useRef(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const [storiesActiveSubSlug, setStoriesActiveSubSlug] = useState<string | null>(null);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [languagesActiveSubSlug, setLanguagesActiveSubSlug] = useState<string | null>(null);
  const [expandedSimple, setExpandedSimple] = useState<Record<string, boolean>>({});
  const [crumb, setCrumb] = useState<string[]>([]);
  const [hydratedBooks, setHydratedBooks] = useState<Record<number, HydratedBookMeta>>({});

  const [favBuckets, setFavBuckets] = useState<{ stories: Book[]; languages: Book[] }>({
    stories: [],
    languages: [],
  });
  const [favStoriesBySub, setFavStoriesBySub] = useState<Record<string, Book[]>>({});
  const [favLangsBySub, setFavLangsBySub] = useState<Record<string, Book[]>>({});
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    if (favMode) {
      setAllCats([]);
      setTabsConfig(baseTabs.map((tab) => ({ ...tab, id: null })));
      return;
    }

    let cancelled = false;
    GetSubCategories()
      .then((res) => {
        if (cancelled) return;
        if (res?.data?.status && Array.isArray(res.data.data)) {
          const cats = res.data.data;
          setAllCats(cats);
          const populated = baseTabs.map((tab) => {
            const match = cats.find((cat: any) => cat.name === tab.label);
            return { ...tab, id: match?.id ?? null };
          });
          setTabsConfig(populated);
        } else {
          setAllCats([]);
          setTabsConfig(baseTabs.map((tab) => ({ ...tab, id: null })));
        }
      })
      .catch(() => {
        if (cancelled) return;
        setAllCats([]);
        setTabsConfig(baseTabs.map((tab) => ({ ...tab, id: null })));
      });

    return () => {
      cancelled = true;
    };
  }, [baseTabs, favMode]);

  const loadFavourites = useCallback(async () => {
    const pid = sessionStorage.getItem("profileId") || "";
    setFavLoading(true);

    if (!pid) {
      setFavBuckets({ stories: [], languages: [] });
      setFavStoriesBySub({});
      setFavLangsBySub({});
      setFavLoading(false);
      return;
    }

    try {
      const res = await GetLikedContent(pid);
      const records = res?.data?.data?.records ?? [];
      const partitions = partitionFavouriteRecords(records);
      setFavBuckets({ stories: partitions.stories, languages: partitions.languages });
      setFavStoriesBySub(partitions.storiesBySub);
      setFavLangsBySub(partitions.langsBySub);
    } catch (error) {
      console.error("[ContentLibrary] GetLikedContent failed", error);
      setFavBuckets({ stories: [], languages: [] });
      setFavStoriesBySub({});
      setFavLangsBySub({});
    } finally {
      setFavLoading(false);
    }
  }, []);

  useEffect(() => {
    if (favMode) {
      loadFavourites();
    }
  }, [favMode, loadFavourites]);

  useEffect(() => {
    if (!favMode) return;
    const activeLabel = tabsConfig[activeIndex]?.label === "Languages" ? "Languages" : "Stories";
    const selected = activeLabel === "Languages" ? favBuckets.languages : favBuckets.stories;
    setCategories([{ name: activeLabel, books: selected, hasSub: false }]);
    setCrumb(["Favourites", activeLabel]);
  }, [favMode, tabsConfig, activeIndex, favBuckets.languages, favBuckets.stories]);

  const activeLabel = tabsConfig[activeIndex]?.label ?? baseTabs[0]?.label ?? "For you";
  const isForYouTab = activeLabel === "For you" && !favMode;
  const isStoriesTab = activeLabel === "Stories";
  const isLanguagesTab = activeLabel === "Languages";
  const isLiteracyTab = activeLabel === "Literacy";
  useEffect(() => {
    setExpandedSimple({});
    setShowAllStories(false);
    setStoriesActiveSubSlug(null);
    setShowAllLanguages(false);
    setLanguagesActiveSubSlug(null);
  }, [activeIndex, favMode]);


  useEffect(() => {
    if (favMode || isForYouTab) return;

    if (isStoriesTab) {
      const storiesCat = allCats.find((cat: any) => cat.name === "Stories");
      setCategories(
        (storiesCat?.sub_categories ?? []).map((sub: any) => ({
          name: sub?.name ?? "",
          books: [],
          hasSub: false,
          subId: typeof sub?.id === "number" ? sub.id : null,
        }))
      );
      return;
    }

    if (isLanguagesTab) {
      const languagesCat = allCats.find((cat: any) => cat.name === "Languages");
      setCategories(
        (languagesCat?.sub_categories ?? []).map((sub: any) => ({
          name: sub?.name ?? "",
          books: [],
          hasSub: false,
          subId: typeof sub?.id === "number" ? sub.id : null,
        }))
      );
      return;
    }

    if (isLiteracyTab) {
      setCategories([]);
    }
  }, [allCats, favMode, isForYouTab, isLanguagesTab, isLiteracyTab, isStoriesTab]);

  useEffect(() => {
    if (!isForYouTab || favMode) {
      if (!isForYouTab) {
        setForYouLoading(false);
      }
      forYouLoadedRef.current = false;
      return;
    }

    if (forYouLoadedRef.current) {
      return;
    }

    forYouLoadedRef.current = true;

    let cancelled = false;
    setForYouLoading(true);

    const run = async () => {
      try {
        const pid = sessionStorage.getItem("profileId") || "";
        const [homeRes, ongoingRes] = await Promise.allSettled([
          ContentForHome({}),
          pid ? GetOngoingContents(pid) : Promise.resolve({ data: { data: { ongoing_contents: [] } } }),
        ]);

        const homeCats =
          homeRes.status === "fulfilled" && homeRes.value?.data?.status && homeRes.value?.data?.data
            ? homeToCategories(homeRes.value.data.data)
            : [];

        const ongoingRaw =
          ongoingRes.status === "fulfilled"
            ? ongoingRes.value?.data?.data?.ongoing_contents || []
            : [];
        const ongoingLocal = mapOngoingToBooks(ongoingRaw);

        const combined: Category[] =
          ongoingLocal.length > 0
            ? [{ name: "Continue Reading", books: ongoingLocal, hasSub: false }, ...homeCats]
            : [{ name: "Continue Reading", books: [], hasSub: false }, ...homeCats];

        if (!cancelled) {
          setCategories(combined);
        }
      } catch (error) {
        console.warn("[ContentLibrary] Failed to load For You", error);
        if (!cancelled) setCategories([]);
      } finally {
        if (!cancelled) setForYouLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [favMode, isForYouTab, profileId]);

  const displayList = categories;
  const displayListPruned = isForYouTab
    ? categories.filter((cat) => Array.isArray(cat.books) && cat.books.length > 0)
    : categories;

  const toggleForYouRow = useCallback((name: string) => {
    setExpandedSimple((prev) => {
      const isExpanded = !!prev[name];
      if (isExpanded) {
        const { [name]: _omit, ...rest } = prev;
        return rest;
      }
      return { [name]: true };
    });
  }, []);

  const openBook = useCallback(
    (id: number) => {
      const params = new URLSearchParams();
      params.set("tab", String(activeIndex));
      params.set("book", String(id));
      setSearchParams(params, { replace: true });
    },
    [activeIndex, setSearchParams],
  );

  const setSearchParamsCompat = useCallback<SearchParamsSetter>(
    (next, options) => {
      setSearchParams(next as any, options);
    },
    [setSearchParams],
  );

  const handleHydrateBook = useCallback(
    (meta: { id: number; hasAudio: boolean; hasText: boolean; audioSources: string[] }) => {
      const key = Number(meta.id);
      if (!Number.isFinite(key)) return;
      setHydratedBooks((prev) => ({
        ...prev,
        [key]: {
          hasAudio: meta.hasAudio,
          hasText: meta.hasText,
          audioSources: meta.audioSources,
        },
      }));
    },
    [],
  );

  const {
    bookPages,
    readingLoading,
    videoSrc,
    videoPoster,
    audioSrc,
    listeningHasText,
    startRead,
    closeRead,
    startWatch,
    closeWatch,
    startListen,
    closeListen,
    closeBook,
    fetchBookPages,
  } = useBookActions(
    profileId ?? null,
    setSearchParamsCompat,
    {
      tab: activeIndex,
      book: urlState.book,
      read: urlState.read,
      watch: urlState.watch,
      listen: urlState.listen,
    },
    handleHydrateBook,
  );

  const bookPools = useMemo(() => {
    const pools: Book[] = [];
    displayList.forEach((cat) => {
      if (Array.isArray(cat.books)) {
        pools.push(...cat.books);
      }
    });

    Object.values(favStoriesBySub).forEach((list) => pools.push(...list));
    Object.values(favLangsBySub).forEach((list) => pools.push(...list));
    pools.push(...favBuckets.stories, ...favBuckets.languages);

    return pools;
  }, [displayList, favBuckets.languages, favBuckets.stories, favLangsBySub, favStoriesBySub]);

  const selectedBook = useMemo(() => {
    if (urlState.book == null) return null;
    const targetId = Number(urlState.book);
    if (!Number.isFinite(targetId)) return null;

    const found = bookPools.find((book) => Number(book.id) === targetId);
    const base: Book = found
      ? { ...found }
      : {
          id: targetId,
          title: "",
          coverUrl: "",
          progress: 0,
          hasAudio: false,
          hasText: false,
        };

    const meta = hydratedBooks[targetId];
    if (meta) {
      base.hasAudio = meta.hasAudio;
      base.hasText = meta.hasText;
      base.audioSources = meta.audioSources;
    }

    return base;
  }, [bookPools, hydratedBooks, urlState.book]);

  const readingBook = urlState.read ? selectedBook : null;
  const watchingBook = urlState.watch ? selectedBook : null;
  const listeningBook = urlState.listen ? selectedBook : null;

  useEffect(() => {
    if (urlState.read && urlState.book != null) {
      fetchBookPages(urlState.book);
    }
  }, [fetchBookPages, urlState.book, urlState.read]);

  useEffect(() => {
    if (favMode) return;
    if (urlState.book == null) return;
    if (crumb.length > 0) return;
    if (!tabsConfig.length) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await GetContentById(String(urlState.book), profileId || "0");
        if (!res?.data?.status) {
          showNotification({
            message: res?.data?.message || "Content unavailable",
            title: "Notification",
          });
          const params = new URLSearchParams();
          params.set("tab", String(activeIndex));
          setSearchParams(params, { replace: true });
          return;
        }

        const data = res?.data?.data ?? res?.data;
        const tabLabel = data?.category;
        const subLabel = data?.sub_categories?.[0]?.sub_category_name || "";
        const bookName = data?.name ?? "";

        const idx = tabsConfig.findIndex((tab) => tab.label === tabLabel);
        if (idx >= 0 && urlState.tab !== idx) {
          const params = new URLSearchParams();
          params.set("tab", String(idx));
          params.set("book", String(urlState.book));
          if (urlState.read) params.set("read", profileId ?? "");
          if (urlState.watch) params.set("watch", profileId ?? "");
          if (urlState.listen) params.set("listen", profileId ?? "");
          setSearchParams(params, { replace: true });
          return;
        }

        if (tabLabel === "Stories") {
          setShowAllStories(true);
          setStoriesActiveSubSlug(subLabel);
        } else if (tabLabel === "Languages") {
          setShowAllLanguages(true);
          setLanguagesActiveSubSlug(subLabel);
        } else if (tabLabel === "For you" && subLabel) {
          setExpandedSimple({ [subLabel]: true });
        }

        const attrs = deriveMediaAttributes(data);
        handleHydrateBook({
          id: Number(urlState.book),
          hasAudio: attrs.hasAudio,
          hasText: attrs.hasText,
          audioSources: attrs.audioSources,
        });

        const crumbs = [tabLabel, subLabel, bookName].filter(Boolean) as string[];
        if (!cancelled) {
          setCrumb(crumbs);
        }
      } catch (error) {
        console.error("[ContentLibrary] Failed to rehydrate breadcrumb", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    activeIndex,
    favMode,
    handleHydrateBook,
    profileId,
    setSearchParams,
    tabsConfig,
    urlState.book,
    urlState.listen,
    urlState.read,
    urlState.tab,
    urlState.watch,
    crumb.length,
  ]);

  const crumbsBeforeBook = useMemo(() => {
    if (activeLabel === "For you") {
      const expandedRow = Object.keys(expandedSimple).find((key) => expandedSimple[key]);
      return expandedRow ? ["For you", expandedRow] : ["For you"];
    }

    if (isStoriesTab && storiesActiveSubSlug) {
      return ["Stories", storiesActiveSubSlug];
    }

    if (isLanguagesTab && languagesActiveSubSlug) {
      return ["Languages", languagesActiveSubSlug];
    }

    return [activeLabel];
  }, [
    activeLabel,
    expandedSimple,
    isLanguagesTab,
    isStoriesTab,
    languagesActiveSubSlug,
    storiesActiveSubSlug,
  ]);

  const displayCrumbs = selectedBook && crumb.length > 0 ? crumb : crumbsBeforeBook;

  const handleBreadcrumbClick = useCallback(
    (label: string, level: number) => {
      closeBook();

      if (level === 0) {
        const idx = tabsConfig.findIndex((tab) => tab.label === label);
        if (idx >= 0) {
          setTab(idx);
          setShowAllStories(false);
          setStoriesActiveSubSlug(null);
          setShowAllLanguages(false);
          setLanguagesActiveSubSlug(null);
          setExpandedSimple({});
        }
        return;
      }

      if (level === 1) {
        if (activeLabel === "For you") {
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
    },
    [
      activeLabel,
      closeBook,
      setTab,
      tabsConfig,
      toggleForYouRow,
      setShowAllStories,
      setStoriesActiveSubSlug,
      setShowAllLanguages,
      setLanguagesActiveSubSlug,
      setExpandedSimple,
    ],
  );

  const favTabLabel: "Stories" | "Languages" =
    tabsConfig[activeIndex]?.label === "Languages" ? "Languages" : "Stories";

  const favSelected = favTabLabel === "Languages" ? favBuckets.languages : favBuckets.stories;
  const showFavEmpty = favMode && !favLoading && favSelected.length === 0;

  const showForYouSkeleton = isForYouTab && (forYouLoading || categories.length === 0);

  const quizFlow = useQuizFlow(closeRead);
  const [completionMode, setCompletionMode] = useState<"read" | "watch" | "listen">("read");

  const handleMediaComplete = useCallback(
    (book: Book | null, mode: "read" | "watch" | "listen" = "read") => {
      const target = book ?? selectedBook ?? quizFlow.quizTarget;
      if (!target) return;
      setCompletionMode(mode);
      quizFlow.handleMediaComplete(target);
    },
    [quizFlow, selectedBook],
  );

  const handleListenAgain = useCallback(() => {
    if (!quizFlow.quizTarget) return;
    const targetId = Number(quizFlow.quizTarget.id);
    if (Number.isNaN(targetId)) return;
    startListen(targetId, quizFlow.quizTarget).catch(() => undefined);
    quizFlow.setShowWell(false);
  }, [startListen, quizFlow]);

  const handleListenGoBack = useCallback(() => {
    quizFlow.setShowWell(false);
    setCompletionMode("read");
    closeListen();
  }, [closeListen, quizFlow]);

  const onQuizComplete = useCallback(
    (stats: QuizStats, answers: UserAnswer[]) => {
      quizFlow.handleQuizComplete(stats, answers);
    },
    [quizFlow],
  );

  const onAnswersChange = useCallback(
    (answers: UserAnswer[]) => {
      quizFlow.setQuizAnswers(answers);
    },
    [quizFlow],
  );

  const header: HeaderController = {
    activeIndex,
    tabsConfig,
    state,
    onTabSelect: setTab,
  };

  const breadcrumb: BreadcrumbController = {
    crumbs: displayCrumbs,
    onCrumbClick: handleBreadcrumbClick,
  };

  const favourites: FavouriteState = {
    activeLabel: favTabLabel,
    loading: favLoading,
    selected: favSelected,
    empty: showFavEmpty,
  };

  const categoriesState: CategoryState = {
    isForYou: isForYouTab,
    isStories: isStoriesTab,
    isLanguages: isLanguagesTab,
    isLiteracy: isLiteracyTab,
    list: displayList,
    prunedForYou: displayListPruned,
    allCats,
    loading: !favMode && !isForYouTab && displayList.length === 0,
    forYouLoading,
    showAllStories,
    storiesActiveSubSlug,
    setShowAllStories,
    setStoriesActiveSubSlug,
    showAllLanguages,
    languagesActiveSubSlug,
    setShowAllLanguages,
    setLanguagesActiveSubSlug,
    expandedSimple,
    toggleForYouRow,
    openBook,
    setCrumb,
  };

  const mediaState: MediaState = {
    readingBook,
    readingRef: quizFlow.readingRef,
    readingLoading,
    bookPages,
    startRead,
    closeRead,
    watchingBook,
    videoSrc,
    videoPoster,
    startWatch,
    closeWatch,
    listeningBook,
    audioSrc,
    listeningHasText,
    startListen: (id: number, book: Book | null = selectedBook) => {
      startListen(id, book).catch(() => undefined);
    },
    closeListen,
    closeBook,
    selectedBook,
    crumbsBeforeBook,
  };

  const quizState: QuizState = {
    completionMode,
    showAnswerReview: quizFlow.showAnswerReview,
    quizAnswers: quizFlow.quizAnswers,
    handleReviewDone: quizFlow.handleReviewDone,
    handleRetake: quizFlow.handleRetake,
    handleViewAnswers: quizFlow.handleViewAnswers,
    handleMediaComplete,
    handleListenAgain,
    handleListenGoBack,
      setAnswers: quizFlow.setQuizAnswers,
    };

  const body: BodyController = {
    favMode,
    favourites,
    categories: categoriesState,
    media: mediaState,
    quiz: quizState,
    displayCrumbs,
    showFavEmpty,
    favBuckets,
    favStoriesBySub,
    favLangsBySub,
    showForYouSkeleton,
    forYouSkeletonCount: FOR_YOU_SKELETON_COUNT,
  };

  const modals: ModalsController = {
    showWell: quizFlow.showWell,
    showQuiz: quizFlow.showQuiz,
    showResult: quizFlow.showResult,
    quizTarget: quizFlow.quizTarget,
    quizStats: quizFlow.quizStats,
    quizReset: quizFlow.quizReset,
    completionMode,
    onTakeQuiz: quizFlow.handleTakeQuiz,
    onLater: quizFlow.handleDoLater,
    onRetake: quizFlow.handleRetake,
    onViewAnswers: quizFlow.handleViewAnswers,
    onCloseResult: () => quizFlow.setShowResult(false),
    onQuizComplete,
    onAnswersChange,
    onReplayListen: completionMode === "listen" ? handleListenAgain : undefined,
    onListenGoBack: completionMode === "listen" ? handleListenGoBack : undefined,
  };

  return {
    layoutClassName: `mx-auto w-[clamp(550px,100%,1440px)] relative ${
      activeLabel !== "For you" ? "top-[-70px]" : ""
    }`,
    header,
    breadcrumb,
    body,
    modals,
  };
};











