// src/hooks/useSubCategoryLazy.ts
import { useEffect, useRef, useState } from "react";
import { GetContebtBySubCategories } from "@/api/api";
import type { Book } from "@/components/BookCard";

const TRACE = (...m: any[]) =>
  console.log("%c[useSubCategoryLazy]", "color:#8CBA51;font-weight:bold", ...m);

/** Normalize response.data -> { number_pages, records[] } */
function normalizePayload(raw: any): { number_pages: number; records: any[] } {
  const inner = raw?.data ?? raw;
  const number_pages =
    inner?.number_pages ?? inner?.meta?.pages ?? inner?.meta?.total_pages ?? 0;
  const records = inner?.records ?? inner?.data ?? inner?.items ?? inner?.list ?? [];
  return {
    number_pages: Number(number_pages) || 0,
    records: Array.isArray(records) ? records : [],
  };
}

/** Map raw records -> Book[] */
function mapToBooks(records: any[]): Book[] {
  return records.map((r: any) => ({
    id: r?.content_id ?? r?.id,
    title: r?.name ?? r?.title ?? "",
    coverUrl: r?.thumbnail ?? r?.cover ?? r?.image ?? "",
    is_liked: r?.is_liked,
    progress: Number(r?.percentage ?? r?.progress ?? 0) || 0,
  }));
}

const useSubCategoryLazy = (
  subId: number | null,
  expanded: boolean,
  disabled: boolean = false              // 👈 NEW
) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMax] = useState<number | null>(null);
  const [loadingInit, setInit] = useState(false);
  const [loadingMore, setMore] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentryRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const aliveRef = useRef(true);

  // mark alive/unmounted to avoid setState after disable/unmount
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  // Reset when subId changes (unless disabled)
  useEffect(() => {
    if (disabled) return;                // 👈 guard
    TRACE("reset state for subId:", subId);
    setBooks([]);
    setPage(0);
    setMax(null);
    setInit(false);
    setMore(false);
    setHasFetched(false);
  }, [subId, disabled]);

  const fetchPage = async (next: number) => {
    if (disabled) {                      // 👈 guard
      TRACE("skip fetch (disabled)", { subId, next });
      return;
    }
    const first = next === 1;
    const busy = first ? loadingInit : loadingMore;
    if (busy) {
      TRACE("skip fetch (busy)", { subId, next, first, loadingInit, loadingMore });
      return;
    }
    if (subId == null) {
      TRACE("skip fetch (no subId)");
      return;
    }
    if (maxPage !== null && next > maxPage) {
      TRACE("skip fetch (beyond max)", { next, maxPage });
      return;
    }

    first ? setInit(true) : setMore(true);
    if (first) setHasFetched(true);

    try {
      TRACE("→ fetch start", { subId, page: next });
      const res = await GetContebtBySubCategories(String(subId), String(next)); // returns .data
      const norm = normalizePayload(res);
      const mapped = mapToBooks(norm.records);
      if (!aliveRef.current) return;     // don’t update after disable/unmount

      setBooks(prev => [
        ...prev,
        ...mapped.filter(m => !prev.some(p => p.id === m.id)),
      ]);
      setPage(next);
      setMax(norm.number_pages ?? null);
      setHasFetched(true);
    } catch (e) {
      if (!aliveRef.current) return;
      setHasFetched(true);
      console.error("[useSubCategoryLazy] GetContebtBySubCategories failed", { subId, next }, e);
    } finally {
      if (!aliveRef.current) return;
      first ? setInit(false) : setMore(false);
    }
  };

  // First page: intersection observer for collapsed rows
  useEffect(() => {
    if (disabled) return;                // 👈 guard
    if (subId == null || !sentryRef.current) return;

    const node = sentryRef.current;
    const visible = () => {
      const r = node.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    if (visible()) {
      TRACE("sentry visible immediately → fetchPage(1)", { subId });
      fetchPage(1);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        TRACE("sentry intersected → fetchPage(1)", { subId });
        fetchPage(1);
        io.disconnect();
      }
    });
    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subId, disabled]);

  // Collapsed horizontal scroll: prefetch next
  useEffect(() => {
    if (disabled) return;                // 👈 guard
    const el = containerRef.current;
    if (!el || expanded) return;

    const onScroll = () => {
      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 48;
      if (nearEnd && !loadingMore && (maxPage === null || page < maxPage)) {
        TRACE("collapsed scroll near end → fetch next", { page, maxPage });
        fetchPage(page + 1);
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, maxPage, loadingMore, expanded, disabled]);

  // Expanded rows: bottom sentinel for vertical infinite load
  useEffect(() => {
    if (disabled) return;                // 👈 guard
    if (!expanded || !loadMoreRef.current) return;

    const node = loadMoreRef.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && (maxPage === null || page < maxPage)) {
        TRACE("expanded sentinel intersected → fetch next", { page, maxPage });
        fetchPage(page + 1);
      }
    }, { root: null, rootMargin: "200px" });

    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, page, maxPage, loadingMore, disabled]);

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
