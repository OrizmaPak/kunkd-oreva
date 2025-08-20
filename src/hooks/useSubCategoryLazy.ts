// src/hooks/useSubCategoryLazy.ts
import { useEffect, useRef, useState } from "react";
import { GetContebtBySubCategories } from "@/api/api";
import type { Book } from "@/components/BookCard";

function normalizePayload(raw: any) {
  const inner = raw?.data ?? raw;
  const number_pages =
    inner?.number_pages ?? inner?.meta?.pages ?? inner?.meta?.total_pages ?? 0;
  const records = inner?.records ?? inner?.data ?? inner?.items ?? inner?.list ?? [];
  return { number_pages: Number(number_pages) || 0, records: Array.isArray(records) ? records : [] };
}

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
  disabled: boolean = false // 👈 NEW
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

  useEffect(() => {
    if (disabled) return; // 👈 short-circuit
    setBooks([]); setPage(0); setMax(null);
    setInit(false); setMore(false); setHasFetched(false);
  }, [subId, disabled]);

  const fetchPage = async (next: number) => {
    if (disabled) return; // 👈
    const first = next === 1;
    const busy = first ? loadingInit : loadingMore;
    if (busy || subId == null || (maxPage !== null && next > maxPage)) return;

    first ? setInit(true) : setMore(true);
    if (first) setHasFetched(true);
    try {
      const res = await GetContebtBySubCategories(String(subId), String(next));
      const norm = normalizePayload(res);
      const mapped = mapToBooks(norm.records);
      setBooks(prev => [...prev, ...mapped.filter(m => !prev.some(p => p.id === m.id))]);
      setPage(next);
      setMax(norm.number_pages ?? null);
    } catch (e) {
      setHasFetched(true);
      console.error("[useSubCategoryLazy] failed", { subId, next }, e);
    } finally {
      first ? setInit(false) : setMore(false);
    }
  };

  // first page (collapsed)
  useEffect(() => {
    if (disabled) return; // 👈
    if (subId == null || !sentryRef.current) return;
    const node = sentryRef.current;
    const visible = () => {
      const r = node.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    if (visible()) { fetchPage(1); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { fetchPage(1); io.disconnect(); }
    });
    io.observe(node);
    return () => io.disconnect();
  }, [subId, disabled]);

  // collapsed horizontal prefetch
  useEffect(() => {
    if (disabled) return; // 👈
    const el = containerRef.current;
    if (!el || expanded) return;
    const onScroll = () => {
      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 48;
      if (nearEnd && !loadingMore && (maxPage === null || page < maxPage)) {
        fetchPage(page + 1);
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [page, maxPage, loadingMore, expanded, disabled]);

  // expanded vertical sentinel
  useEffect(() => {
    if (disabled) return; // 👈
    if (!expanded || !loadMoreRef.current) return;
    const node = loadMoreRef.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && (maxPage === null || page < maxPage)) {
        fetchPage(page + 1);
      }
    }, { root: null, rootMargin: "200px" });
    io.observe(node);
    return () => io.disconnect();
  }, [expanded, page, maxPage, loadingMore, disabled]);

  return { books, loadingInit, loadingMore, hasFetched, containerRef, sentryRef, loadMoreRef, page };
};

export default useSubCategoryLazy;
