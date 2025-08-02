import { useEffect, useRef, useState } from "react";
import { GetContebtBySubCategories } from "@/api/api";
import { Book } from "@/components/BookCard";

/**
 * Lazily loads and paginates books for ONE sub-category row.
 * • page-1 loads when the row becomes visible
 * • further pages load when row expanded and last item enters viewport
 */
const useSubCategoryLazy = (
  subId: number | null,
  expanded: boolean // track Show-All state
) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMax] = useState<number | null>(null);

  // separate flags for page-1 vs. page>1
  const [loadingInit, setInit] = useState(false);
  const [loadingMore, setMore] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sentryRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  /* 0️⃣ Clear state when the row switches to a new sub-category */
  useEffect(() => {
    setBooks([]);
    setPage(0);
    setMax(null);
  }, [subId]);

  /* ---------------- fetch helper ---------------- */
  const fetchPage = async (next: number) => {
    const first = next === 1;
    const busy = first ? loadingInit : loadingMore;

    if (busy || subId == null || (maxPage !== null && next > maxPage)) return;

    first ? setInit(true) : setMore(true);
    try {
      const res = await GetContebtBySubCategories(subId, String(next));

      /** payload is sometimes at res.data, sometimes res.data.data */
      const payload = res?.data?.data ?? res?.data;
      const number_pages = payload?.number_pages ?? 0;
      const records = payload?.records ?? [];

      const mapped: Book[] = records.map((r: any) => ({
        id: r.id,
        title: r.name,
        coverUrl: r.thumbnail,
        progress: 0,
      }));

      setBooks((prev) => [...prev, ...mapped]);
      setPage(next);
      setMax(number_pages);
    } catch (e) {
      console.error("GetContebtBySubCategories failed", e);
    } finally {
      first ? setInit(false) : setMore(false);
    }
  };

  /* -------- 1. first page when row becomes (or is) visible -------- */
  useEffect(() => {
    if (subId == null || !sentryRef.current) return;
    const node = sentryRef.current;

    /* 1️⃣ already visible at mount? */
    const appears = () =>
      node.getBoundingClientRect().top < window.innerHeight &&
      node.getBoundingClientRect().bottom > 0;

    if (appears()) {
      fetchPage(1);
      return;
    }

    /* 2️⃣ otherwise: observe until it enters view */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subId]);

  /* 2️⃣ More pages on horizontal scroll */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || expanded) return; // ignore when expanded

    const onScroll = () => {
      if (
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 48 && // near right edge
        !loadingMore &&
        (maxPage === null || page < maxPage)
      ) {
        fetchPage(page + 1);
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [page, maxPage, loadingMore, expanded]); // include expanded

  /* 3️⃣   when expanded, load on sentinel */
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
  }, [expanded, page, maxPage, loadingMore]); // eslint-disable-line

  return {
    books,
    loadingInit,
    loadingMore,
    containerRef,
    sentryRef,
    loadMoreRef,
  };
};

export default useSubCategoryLazy;
