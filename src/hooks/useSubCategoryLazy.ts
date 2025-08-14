// src/hooks/useSubCategoryLazy.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { GetContebtBySubCategories } from "@/api/api";
import type { Book } from "@/components/BookCard";

const TRACE = (...m: any[]) =>
  console.log("%c[useSubCategoryLazy]", "color:#8CBA51;font-weight:bold", ...m);

/**
 * Normalize API result into { number_pages, records[] }
 * NOTE: GetContebtBySubCategories returns response.data directly,
 * not the axios Response object.
 */
function normalizePayload(raw: any): { number_pages: number; records: any[] } {
  // try common shapes in priority order
  const inner = raw?.data ?? raw;

  const number_pages =
    inner?.number_pages ??
    inner?.meta?.pages ??
    inner?.meta?.total_pages ??
    0;

  // records may live in different keys depending on backend
  const records =
    inner?.records ??
    inner?.data ??
    inner?.items ??
    inner?.list ??
    [];

  return {
    number_pages: Number(number_pages) || 0,
    records: Array.isArray(records) ? records : [],
  };
}

/** Map raw content → Book */
function mapToBooks(records: any[]): Book[] {
  return records.map((r: any) => ({
    id: r?.content_id ?? r?.id,
    title: r?.name ?? r?.title ?? "",
    coverUrl: r?.thumbnail ?? r?.cover ?? r?.image ?? "",
    is_liked: r?.is_liked,
    progress: Number(r?.percentage ?? r?.progress ?? 0) || 0,
  }));
}

const useSubCategoryLazy = (subId: number | null, expanded: boolean, options?: { prefetchIds?: number[] }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMax] = useState<number | null>(null);

  const [loadingInit, setInit] = useState(false);
  const [loadingMore, setMore] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentryRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const cache = new Map<number, { books: Book[] }>();

  // Reset when subId changes
  useEffect(() => {
    TRACE("reset state for subId:", subId);
    setBooks([]);
    setPage(0);
    setMax(null);
    setInit(false);
    setMore(false);
    setHasFetched(false);
  }, [subId]);

  const fetchPage = async (id: number, next: number) => {
    const first = next === 1;
    const busy = first ? loadingInit : loadingMore;

    if (busy) {
      TRACE("skip fetch (busy)", { subId: id, next, first, loadingInit, loadingMore });
      return;
    }
    if (id == null) {
      TRACE("skip fetch (no subId)");
      return;
    }
    if (maxPage !== null && next > maxPage) {
      TRACE("skip fetch (beyond max)", { next, maxPage });
      return;
    }

    first ? setInit(true) : setMore(true);
    if (first) setHasFetched(true); // hide first-load skeleton once we start

    try {
      TRACE("→ fetch start", { subId: id, page: next });
      const res = await GetContebtBySubCategories(String(id), String(next));
      // res is already the payload (NOT axios response)
      const norm = normalizePayload(res);
      const mapped = mapToBooks(norm.records);

      TRACE("← fetch done", {
        subId: id,
        next,
        number_pages: norm.number_pages,
        records: norm.records.length,
        mapped: mapped.length,
      });

      setBooks((prev) => [
        ...prev,
        ...mapped.filter((m) => !prev.some((p) => p.id === m.id)),
      ]);
      setPage(next);
      setMax(norm.number_pages ?? null);
      setHasFetched(true);
      cache.set(id, { books: mapped });
    } catch (e) {
      setHasFetched(true);
      console.error("[useSubCategoryLazy] GetContebtBySubCategories failed", { subId: id, next }, e);
    } finally {
      first ? setInit(false) : setMore(false);
    }
  };

  // keep this existing helper:
  const prewarmNeighbors = useCallback(async () => {
    const ids = options?.prefetchIds ?? [];
    console.log(
      "%c[useSubCategoryLazy] PREWARM neighbors",
      "color:#8CBA51;font-weight:bold",
      { subId, ids: ids.slice(0, 2) }
    );
    await Promise.all(ids.slice(0, 2).map((n) => prefetchFirstPage(n)));
  }, [options?.prefetchIds]);

  // NEW: run prewarm once when the row obtains data (from cache or after first fetch)
  const didPrewarmRef = useRef(false);
  useEffect(() => {
    if (!subId && subId !== 0) return;
    if (didPrewarmRef.current) return;
    // If we already have books (from cache) OR we finished initial fetch, prewarm
    const cached = cache.get(subId);
    const haveBooks = (cached?.books?.length ?? 0) > 0 || hasFetched;
    if (haveBooks) {
      didPrewarmRef.current = true;
      prewarmNeighbors();
    }
  }, [subId, hasFetched, prewarmNeighbors]);

  // Instrument the prefetch path
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

  // First page: IntersectionObserver (collapsed rows)
  useEffect(() => {
    if (subId == null || !sentryRef.current) return;

    const node = sentryRef.current;
    const visible = () => {
      const r = node.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    if (visible()) {
      TRACE("sentry visible immediately → fetchPage(1)", { subId });
      fetchPage(subId, 1);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          TRACE("sentry intersected → fetchPage(1)", { subId });
          fetchPage(subId, 1);
          io.disconnect();
        }
      },
      { root: null, threshold: 0, rootMargin: "0px 0px -25% 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subId]);

  // Collapsed horizontal scroll: load next page near end
  useEffect(() => {
    const el = containerRef.current;
    if (!el || expanded) return;

    const onScroll = () => {
      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 48;
      if (nearEnd && !loadingMore && (maxPage === null || page < maxPage)) {
        TRACE("collapsed scroll near end → fetch next", { page, maxPage });
        fetchPage(subId, page + 1);
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, maxPage, loadingMore, expanded]);

  // Expanded rows: bottom sentinel for vertical infinite load
  useEffect(() => {
    if (!expanded || !loadMoreRef.current) return;

    const node = loadMoreRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (maxPage === null || page < maxPage)) {
          TRACE("expanded sentinel intersected → fetch next", { page, maxPage });
          fetchPage(subId, page + 1);
        }
      },
      { root: null, rootMargin: "200px" }
    );

    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, page, maxPage, loadingMore]);

  return {
    books,
    loadingInit,
    loadingMore,
    hasFetched,
    containerRef,
    sentryRef,
    loadMoreRef,
    page,
  };
};

export default useSubCategoryLazy;
