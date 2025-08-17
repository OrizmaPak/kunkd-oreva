// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/useContentLibraryData.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

import type { Category, Page, Tab } from "./types";
import { homeToCategories, trace } from "./helpers";
import type { Book } from "@/components/BookCard";

import {
  ContentForHome,
  GetSubCategories,
  GetContentById,
  GetOngoingContents,
} from "@/api/api";

/** Default tabs — caller can override icons in UI */
const DEFAULT_TABS: Omit<Tab, "id">[] = [
  { label: "For you", icon: "" },
  { label: "Stories", icon: "" },
  { label: "Languages", icon: "" },
  { label: "Literacy", icon: "" },
];

export interface URLState {
  tab: number;
  book: number | null;
  read: boolean;
  watch: boolean;
}

export function useContentLibraryData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const profileId = useMemo(() => sessionStorage.getItem("profileId") ?? "", []);

  // ────────────────────────────────────────────────────────────
  // Tabs (ids are resolved from GetSubCategories)
  // ────────────────────────────────────────────────────────────
  const [tabsConfig, setTabsConfig] = useState<Tab[]>(
    DEFAULT_TABS.map((t) => ({ ...t, id: null }))
  );

  const setTab = useCallback(
    (idx: number) => {
      setSearchParams({ tab: String(idx) });
    },
    [setSearchParams]
  );

  // ────────────────────────────────────────────────────────────
  // URL-derived state
  // ────────────────────────────────────────────────────────────
  const urlState: URLState = useMemo(() => {
    const tab = Number(searchParams.get("tab")) || 0;
    const book = searchParams.get("book")
      ? Number(searchParams.get("book"))
      : null;
    const read = searchParams.get("read") === profileId;
    const watch = searchParams.get("watch") === profileId;
    return { tab, book, read, watch };
  }, [searchParams, profileId]);

  const openBook = useCallback(
    (id: number) => {
      setSearchParams({ tab: String(urlState.tab), book: String(id) });
    },
    [setSearchParams, urlState.tab]
  );

  const closeBook = useCallback(() => {
    setSearchParams({ tab: String(urlState.tab) });
  }, [setSearchParams, urlState.tab]);

  // ────────────────────────────────────────────────────────────
  // Subcategories catalog (Stories/Languages etc.)
  // ────────────────────────────────────────────────────────────
  const [allCats, setAllCats] = useState<any[]>([]);

  useEffect(() => {
    GetSubCategories()
      .then((res) => {
        const ok = res?.data?.status;
        const data = Array.isArray(res?.data?.data) ? res?.data?.data : [];
        if (!ok) {
          setAllCats([]);
          return;
        }
        setAllCats(data);
        // Map ids into the tabsConfig
        setTabsConfig((prev) =>
          prev.map((t) => {
            const match = data.find((c: any) => c?.name === t.label);
            return { ...t, id: match?.id ?? null };
          })
        );
      })
      .catch(() => {
        setAllCats([]);
      });
  }, []);

  // ────────────────────────────────────────────────────────────
  // Ongoing (Continue Reading)
  // ────────────────────────────────────────────────────────────
  const [ongoingBooks, setOngoingBooks] = useState<Book[]>([]);

  const refreshOngoing = useCallback(() => {
    const pid = sessionStorage.getItem("profileId") || "";
    trace("GetOngoingContents → profileId:", pid);

    GetOngoingContents(pid)
      .then((res) => {
        const raw = res?.data?.data?.ongoing_contents;
        if (!Array.isArray(raw)) {
          setOngoingBooks([]);
          return;
        }
        const books: Book[] = raw.map((it: any) => {
          const total = Array.isArray(it.pages) ? it.pages.length : 0;
          const read = Number(it.pages_read) || 0;
          const progress =
            total > 0 ? Math.max(0, Math.min(100, Math.round((read * 100) / total))) : 0;
          return {
            id: it.id,
            title: it.name ?? "",
            coverUrl: it.thumbnail ?? "",
            progress,
            is_liked: it.is_liked,
          };
        });
        setOngoingBooks(books);
      })
      .catch(() => setOngoingBooks([]));
  }, []);

  useEffect(() => {
    refreshOngoing();
  }, [refreshOngoing]);

  // ────────────────────────────────────────────────────────────
  // For You rows (ContentForHome)
  // ────────────────────────────────────────────────────────────
  const [forYouRows, setForYouRows] = useState<Category[]>([]);

  useEffect(() => {
    const config = profileId ? { params: { id: profileId } } : undefined;
    ContentForHome(config as any)
      .then((res) => {
        const payload = res?.data?.data ?? res?.data;
        setForYouRows(homeToCategories(payload));
      })
      .catch(() => setForYouRows([]));
  }, [profileId]);

  // ────────────────────────────────────────────────────────────
  // Reading (pages)
  // ────────────────────────────────────────────────────────────
  const readingRef = useRef<any>(null);
  const [bookPages, setBookPages] = useState<Page[]>([]);
  const [readingLoading, setReadingLoading] = useState(false);

  const fetchBookPages = useCallback(
    async (id: number) => {
      setReadingLoading(true);
      try {
        const res = await GetContentById(String(id), profileId || "0");
        if (!res?.data?.status) {
          showNotification({
            title: "Notification",
            message: res?.data?.message || "Failed to load content",
          });
          return;
        }

        const data = res?.data?.data ?? res?.data;
        const rawPages: any[] = data?.pages ?? [];
        const pages: Page[] = rawPages.map((p) => {
          const html = p.web_body || p.body || "";
          const match = html.match(/<img[^>]+src="([^">]+)"/i);
          const imgSrc = p.image || (match && match[1]) || "";
          const text = html.replace(/<[^>]*>/gi, "").trim();
          return { id: p.page_number, imageUrl: imgSrc, text };
        });

        setBookPages(pages);
      } catch {
        setBookPages([]);
      } finally {
        setReadingLoading(false);
      }
    },
    [profileId]
  );

  const startRead = useCallback(
    async (id: number) => {
      setSearchParams({
        tab: String(urlState.tab),
        book: String(id),
        read: profileId ?? "",
      });
      await fetchBookPages(id);
    },
    [fetchBookPages, profileId, setSearchParams, urlState.tab]
  );

  const closeRead = useCallback(() => {
    setBookPages([]);
    if (urlState.book != null) {
      setSearchParams({ tab: String(urlState.tab), book: String(urlState.book) });
    } else {
      setSearchParams({ tab: String(urlState.tab) });
    }
  }, [setSearchParams, urlState.book, urlState.tab]);

  // ────────────────────────────────────────────────────────────
  // Video (watch)
  // ────────────────────────────────────────────────────────────
  const [videoSrc, setVideoSrc] = useState("");
  const [videoPoster, setVideoPoster] = useState("");

  const startWatch = useCallback(
    async (id: number) => {
      setVideoSrc("");
      setVideoPoster("");
      setSearchParams({
        tab: String(urlState.tab),
        book: String(id),
        watch: profileId ?? "",
      });

      try {
        const res = await GetContentById(String(id), profileId || "0");
        if (!res?.data?.status) {
          showNotification({
            title: "Notification",
            message: res?.data?.message || "Failed to load content",
          });
          return;
        }
        const data = res?.data?.data ?? res?.data;
        const media = data?.media?.[0] || {};
        setVideoSrc(media.file || "");
        setVideoPoster(media.thumbnail || "");
      } catch {
        setVideoSrc("");
        setVideoPoster("");
      }
    },
    [profileId, setSearchParams, urlState.tab]
  );

  const closeWatch = useCallback(() => {
    setVideoSrc("");
    setVideoPoster("");
    if (urlState.book != null) {
      setSearchParams({ tab: String(urlState.tab), book: String(urlState.book) });
    } else {
      setSearchParams({ tab: String(urlState.tab) });
    }
  }, [setSearchParams, urlState.book, urlState.tab]);

  // ────────────────────────────────────────────────────────────
  // Selected book & breadcrumbs / expands
  // ────────────────────────────────────────────────────────────
  const [crumb, setCrumb] = useState<string[]>([]);
  const [storiesExpanded, setStoriesExpanded] = useState(false);
  const [languagesExpanded, setLanguagesExpanded] = useState(false);
  const [expandedSimple, setExpandedSimple] = useState<Record<string, boolean>>({});

  const toggleStories = useCallback(
    () => setStoriesExpanded((s) => !s),
    []
  );
  const toggleLanguages = useCallback(
    () => setLanguagesExpanded((s) => !s),
    []
  );
  const toggleRowExpand = useCallback((key: string) => {
    setExpandedSimple((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  const selectedBook: Book | null = useMemo(() => {
    if (urlState.book == null) return null;

    // Look inside For You rows
    for (const c of forYouRows) {
      const hit = c.books.find((b) => Number(b.id) === urlState.book);
      if (hit) return hit;
    }
    // Look inside Ongoing
    const ongoingHit = ongoingBooks.find((b) => Number(b.id) === urlState.book);
    if (ongoingHit) return ongoingHit;

    // Fallback stub (BookOverview can still resolve details)
    return { id: urlState.book, title: "", coverUrl: "", progress: 0 } as Book;
  }, [forYouRows, ongoingBooks, urlState.book]);

  // ────────────────────────────────────────────────────────────
  // Return shape
  // ────────────────────────────────────────────────────────────
  return {
    profileId,

    // URL+Tabs
    urlState,
    tabsConfig,
    setTabsConfig,
    setTab,

    // Datasets
    allCats,
    forYouRows,
    ongoingBooks,
    refreshOngoing,

    // Selection
    selectedBook,
    openBook,
    closeBook,

    // Reading
    readingRef,
    bookPages,
    readingLoading,
    startRead,
    closeRead,

    // Video
    videoSrc,
    videoPoster,
    startWatch,
    closeWatch,

    // UI state
    crumb,
    setCrumb,
    storiesExpanded,
    toggleStories,
    languagesExpanded,
    toggleLanguages,
    expandedSimple,
    toggleRowExpand,
  };
}
