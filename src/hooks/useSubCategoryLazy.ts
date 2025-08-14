// src/hooks/useSubCategoryLazy.ts
import { useEffect, useRef, useState } from "react";
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

const useSubCategoryLazy = (subId: number | null, expanded: boolean) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMax] = useState<number | null>(null);

  const [loadingInit, setInit] = useState(false);
  const [loadingMore, setMore] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentryRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

  const fetchPage = async (next: number) => {
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
    if (first) setHasFetched(true); // hide first-load skeleton once we start

    try {
      TRACE("→ fetch start", { subId, page: next });
      const res = await GetContebtBySubCategories(String(subId), String(next));
      // res is already the payload (NOT axios response)
      const norm = normalizePayload(res);
      const mapped = mapToBooks(norm.records);

      TRACE("← fetch done", {
        subId,
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
    } catch (e) {
      setHasFetched(true);
      console.error("[useSubCategoryLazy] GetContebtBySubCategories failed", { subId, next }, e);
    } finally {
      first ? setInit(false) : setMore(false);
    }
  };

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
      fetchPage(1);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          TRACE("sentry intersected → fetchPage(1)", { subId });
          fetchPage(1);
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
        fetchPage(page + 1);
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
          fetchPage(page + 1);
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
