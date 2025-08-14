// src/hooks/useSubCategoryLazy.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { GetContebtBySubCategories } from "@/api/api";
import type { Book } from "@/components/BookCard";

/** Optional controls coming from the caller (BookCategory) */
type UseLazyOptions = {
  /** When THIS row starts its first load, also prefetch these subIds (e.g. the next two categories) */
  prefetchIds?: number[];
  /** How early we trigger (in px) before the row actually enters the viewport */
  rootMargin?: string;
};

/** Cache per sub-category id so we never refetch first page twice */
type CacheEntry = {
  books: Book[];
  pageLoaded: number; // max page loaded
  done: boolean; // true when there's nothing else to load
};
const cache = new Map<number, CacheEntry>();
const inflight = new Map<string, Promise<CacheEntry>>(); // `${id}:${page}` → promise

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

/** Internal fetch that dedupes via `inflight` and writes to `cache` */
function fetchPage(id: number, page: number): Promise<CacheEntry> {
  const key = `${id}:${page}`;
  if (inflight.has(key)) return inflight.get(key)!;

  const p = GetContebtBySubCategories(String(id), String(page))
    .then((res: any) => {
      const list = normalizeToBooks(res);
      console.log('fetchPage', id, page, list);
      const prev = cache.get(id);
      const books = page === 1 ? list : [...(prev?.books ?? []), ...list];
      const done = list.length === 0; // defensive: if API gives meta, this still works
      const entry: CacheEntry = {
        books,
        pageLoaded: page,
        done,
      };
      cache.set(id, entry);
      inflight.delete(key);
      return entry;
    })
    .catch((e) => {
      inflight.delete(key);
      throw e;
    });

  inflight.set(key, p);
  return p;
}

/** Public prefetch helper (first page) used by the hook */
async function prefetchFirstPage(id?: number | null) {
  if (!id && id !== 0) return;
  if (cache.has(id)) return; // already cached
  await fetchPage(id, 1).catch(() => {
    /* ignore failure; it's just a prefetch */
  });
}

export default function useSubCategoryLazy(
  subId: number | null,
  expanded: boolean,
  options?: UseLazyOptions
) {
  const rootMargin = options?.rootMargin ?? "420px 0px 420px 0px";

  // ── State exposed to the row component ───────────────────────
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingInit, setLoadingInit] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // ── Sentinels / anchors for intersection observers ───────────
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentryRef = useRef<HTMLDivElement | null>(null); // triggers first page
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // triggers next pages when expanded

  const id = subId ?? undefined;

console.log('useSubCategoryLazy', id, expanded, rootMargin);

  // Initialize from cache if present (instant paint on reuse/prefetch)
  useEffect(() => {
    if (!id && id !== 0) return;
    const cached = cache.get(id);
    if (cached) {
      setBooks(cached.books);
      setHasFetched(true);
    }
  }, [id]);

  /** Actually load first page for THIS row */
  const loadFirstPage = useCallback(async () => {
    if (!id && id !== 0) return;
    // If cached, don't hit network
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

  /** Load next page ONLY when in expanded mode */
  const loadNextPage = useCallback(async () => {
    if (!id && id !== 0) return;
    const cached = cache.get(id);
    if (!cached || cached.done) return; // nothing to do yet / or already finished
    const nextPage = (cached.pageLoaded ?? 1) + 1;

    setLoadingMore(true);
    try {
      const entry = await fetchPage(id, nextPage);
      setBooks(entry.books);
    } finally {
      setLoadingMore(false);
    }
  }, [id]);

  // When this row starts fetching its first page (via intersection),
  // also kick off prefetch for the "next two" rows provided by parent.
  const prewarmNeighbors = useCallback(async () => {
    const ids = options?.prefetchIds ?? [];
    // Fire them in parallel; cache will dedupe naturally
    await Promise.all(ids.slice(0, 2).map((n) => prefetchFirstPage(n)));
  }, [options?.prefetchIds]);

  // First-load observer
  useEffect(() => {
    if (!id && id !== 0) return;

    const el = sentryRef.current ?? containerRef.current;
    if (!el) return;

    // If already fetched (from cache or a previous view), do nothing
    if (hasFetched) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // 1) Load THIS row
          loadFirstPage();
          // 2) Prefetch NEXT rows (best effort)
          prewarmNeighbors();
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [id, hasFetched, loadFirstPage, prewarmNeighbors, rootMargin]);

  // Load-more observer (only useful when expanded == true)
  useEffect(() => {
    if (!id && id !== 0) return;
    if (!expanded) return; // do not paginate when collapsed

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
