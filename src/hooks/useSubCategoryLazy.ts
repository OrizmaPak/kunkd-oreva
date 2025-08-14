// src/hooks/useSubCategoryLazy.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { GetContebtBySubCategories } from "@/api/api";
import type { Book } from "@/components/BookCard";

type UseLazyOptions = {
  /** When THIS row starts its first load, also prefetch these subIds (e.g. the next two categories) */
  prefetchIds?: number[];
  /** How early we trigger before the row actually enters the viewport */
  rootMargin?: string;
};

type CacheEntry = {
  books: Book[];
  pageLoaded: number; // max page loaded
  done: boolean;
};

const cache = new Map<number, CacheEntry>();
const inflight = new Map<string, Promise<CacheEntry>>(); // `${id}:${page}`

/** Normalize API response defensively to Book[] */
function normalizeToBooks(payload: any): Book[] {
  const arr =
    payload?.data?.data ??
    payload?.data ??
    payload?.items ??
    payload ??
    [];
  if (!Array.isArray(arr)) return [];
  return arr.map((it: any) => ({
    id: it?.content_id ?? it?.id,
    title: it?.name ?? it?.title ?? "",
    coverUrl: it?.thumbnail ?? it?.cover ?? it?.image ?? "",
    progress: Number(it?.percentage ?? it?.progress ?? 0) || 0,
    is_liked: it?.is_liked,
  })) as Book[];
}

function fetchPage(id: number, page: number): Promise<CacheEntry> {
  const key = `${id}:${page}`;
  if (inflight.has(key)) return inflight.get(key)!;

  const p = GetContebtBySubCategories(String(id), String(page))
    .then((res: any) => {
      const list = normalizeToBooks(res);
      console.log("%c[useSubCategoryLazy] fetchPage done", "color:#8CBA51", {
        id,
        page,
        listLen: list.length,
      });
      const prev = cache.get(id);
      const books = page === 1 ? list : [...(prev?.books ?? []), ...list];
      const done = list.length === 0;
      const entry: CacheEntry = { books, pageLoaded: page, done };
      cache.set(id, entry);
      inflight.delete(key);
      return entry;
    })
    .catch((e) => {
      inflight.delete(key);
      throw e;
    });

  console.log("%c[useSubCategoryLazy] fetchPage start", "color:#8CBA51", {
    id,
    page,
  });
  inflight.set(key, p);
  return p;
}

async function prefetchFirstPage(id?: number | null) {
  if (!id && id !== 0) return;
  if (cache.has(id)) {
    console.log("%c[useSubCategoryLazy] PREFETCH skip (cached)", "color:#8CBA51", { id });
    return;
  }
  console.log("%c[useSubCategoryLazy] PREFETCH start", "color:#8CBA51", { id });
  await fetchPage(id, 1).catch((e) => {
    console.warn("[useSubCategoryLazy] PREFETCH failed", { id }, e);
  });
}

export default function useSubCategoryLazy(
  subId: number | null,
  expanded: boolean,
  options?: UseLazyOptions
) {
  const rootMargin = options?.rootMargin ?? "1000px 0px 1000px 0px"; // earlier trigger

  const [books, setBooks] = useState<Book[]>([]);
  const [loadingInit, setLoadingInit] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentryRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const id = subId ?? undefined;

  console.log("%c[useSubCategoryLazy] mount", "color:#8CBA51", {
    id,
    expanded,
    rootMargin,
  });

  // Initialize from cache if present
  useEffect(() => {
    if (!id && id !== 0) return;
    const cached = cache.get(id);
    if (cached) {
      setBooks(cached.books);
      setHasFetched(true);
      console.log("%c[useSubCategoryLazy] hydrate from cache", "color:#8CBA51", {
        id,
        books: cached.books.length,
      });
    }
  }, [id]);

  const loadFirstPage = useCallback(async () => {
    if (!id && id !== 0) return;
    const cached = cache.get(id);
    if (cached) {
      setBooks(cached.books);
      setHasFetched(true);
      return;
    }

    setLoadingInit(true);
    try {
      const entry = await fetchPage(id, 1);
      setBooks(entry.books);
      setHasFetched(true);
    } finally {
      setLoadingInit(false);
    }
  }, [id]);

  const loadNextPage = useCallback(async () => {
    if (!id && id !== 0) return;
    const cached = cache.get(id);
    if (!cached || cached.done) return;
    const nextPage = (cached.pageLoaded ?? 1) + 1;

    setLoadingMore(true);
    try {
      const entry = await fetchPage(id, nextPage);
      setBooks(entry.books);
    } finally {
      setLoadingMore(false);
    }
  }, [id]);

  // Prefetch the “next two” neighbors
  const prewarmNeighbors = useCallback(async () => {
    const ids = options?.prefetchIds ?? [];
    console.log("%c[useSubCategoryLazy] PREWARM neighbors", "color:#8CBA51", {
      subId: id,
      ids: ids.slice(0, 2),
    });
    await Promise.all(ids.slice(0, 2).map((n) => prefetchFirstPage(n)));
  }, [options?.prefetchIds, id]);

  // NEW: if we’re already hydrated (from cache) or once first fetch marks hasFetched,
  // run prewarm once so neighbors get warmed even if this row never intersects again.
  const didPrewarmRef = useRef(false);
  useEffect(() => {
    if (!id && id !== 0) return;
    if (didPrewarmRef.current) return;

    const cached = cache.get(id);
    const haveBooks = (cached?.books?.length ?? 0) > 0 || hasFetched;
    if (haveBooks) {
      didPrewarmRef.current = true;
      prewarmNeighbors();
    }
  }, [id, hasFetched, prewarmNeighbors]);

  // First-load observer
  useEffect(() => {
    if (!id && id !== 0) return;

    const el = sentryRef.current ?? containerRef.current;
    if (!el) return;

    if (hasFetched) return; // already loaded/hydrated

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          console.log("%c[useSubCategoryLazy] first intersect → load + prewarm", "color:#8CBA51", { id });
          loadFirstPage();
          prewarmNeighbors();
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [id, hasFetched, loadFirstPage, prewarmNeighbors, rootMargin]);

  // Load-more observer (only when expanded)
  useEffect(() => {
    if (!id && id !== 0) return;
    if (!expanded) return;

    const more = loadMoreRef.current;
    if (!more) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        loadNextPage();
      },
      { root: null, rootMargin: "1200px 0px 1200px 0px", threshold: 0.01 }
    );

    io.observe(more);
    return () => io.disconnect();
  }, [id, expanded, loadNextPage]);

  return {
    books,
    loadingInit,
    loadingMore,
    hasFetched,
    containerRef,
    sentryRef,
    loadMoreRef,
  };
}
