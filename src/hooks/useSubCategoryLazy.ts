import { useEffect, useRef, useState } from "react";
import { GetContebtBySubCategories } from "@/api/api";
import { Book } from "@/components/BookCard";

const useSubCategoryLazy = (subId: number | null, expanded: boolean) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMax] = useState<number | null>(null);

  const [loadingInit, setInit] = useState(false);
  const [loadingMore, setMore] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sentryRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    if (busy || subId == null || (maxPage !== null && next > maxPage)) return;

    if (first) {
      setInit(true);
      setHasFetched(true);
    } else {
      setMore(true);
    }

    try {
      const res = await GetContebtBySubCategories(String(subId), String(next));
      const payload = res?.data?.data ?? res?.data;
      const number_pages = payload?.number_pages ?? 0;
      const records = payload?.records ?? [];
      const mapped: Book[] = records.map((r: any) => ({
        id: r.id,
        title: r.name,
        coverUrl: r.thumbnail,
        is_liked: r.is_liked,
        progress: 0,
      }));

      setBooks((prev) => [
        ...prev,
        ...mapped.filter((m) => !prev.some((p) => p.id === m.id)),
      ]);
      setPage(next);
      setMax(number_pages);
      setHasFetched(true);
    } catch (e) {
        setHasFetched(true);
        console.error("GetContebtBySubCategories failed", e);
    } finally {
      first ? setInit(false) : setMore(false);
    }
  };

  useEffect(() => {
    if (subId == null || !sentryRef.current) return;
    const node = sentryRef.current;

    const visible = () =>
      node.getBoundingClientRect().top < window.innerHeight &&
      node.getBoundingClientRect().bottom > 0;

    if (visible()) {
      fetchPage(1);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchPage(1);
          io.disconnect();
        }
      },
      { root: null, threshold: 0, rootMargin: "0px 0px -25% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [subId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || expanded) return;
    const onScroll = () => {
      if (
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 48 &&
        !loadingMore &&
        (maxPage === null || page < maxPage)
      ) {
        fetchPage(page + 1);
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [page, maxPage, loadingMore, expanded]);

  useEffect(() => {
    if (!expanded || !loadMoreRef.current) return;
    const node = loadMoreRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (maxPage === null || page < maxPage)) {
          fetchPage(page + 1);
        }
      },
      { root: null, rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [expanded, page, maxPage, loadingMore]);

  return {
    books,
    loadingInit,
    loadingMore,
    hasFetched,
    containerRef,
    sentryRef,
    loadMoreRef,
    page
  };
};

export default useSubCategoryLazy;
