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
  expanded: boolean // now tracks expanded state
) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState<number | null>(null);
  const [loadingInit, setLoadingInit] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sentryRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  /* ---------------- fetch helper ---------------- */
  const fetchPage = async (next: number) => {
    if (
      loading ||
      subId == null ||
      (maxPage !== null && next > maxPage)
    ) return;

    setLoading(true);
    try {
      const res = await GetContebtBySubCategories(subId, String(next));

      /** payload is sometimes at res.data, sometimes res.data.data */
      const payload = res?.data?.data ?? res?.data;
      const number_pages = payload?.number_pages ?? 0;
      const records      = payload?.records      ?? [];

      const mapped: Book[] = records.map((r: any) => ({
        id:       r.id,
        title:    r.name,
        coverUrl: r.thumbnail,
        progress: 0,
      }));

      setBooks(prev => [...prev, ...mapped]);
      setPage(next);
      setMaxPage(number_pages);
    } catch (e) {
      console.error("GetContebtBySubCategories failed", e);
    } finally {
      setLoading(false);
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

  /* -------- 2. more pages on horizontal scroll -------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 48 && // near right edge
        !loading &&
        (maxPage === null || page < maxPage)
      ) {
        fetchPage(page + 1);
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, maxPage, loading]);

  return { books, loading, containerRef, sentryRef };
};

export default useSubCategoryLazy;
