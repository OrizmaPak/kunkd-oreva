// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/hooks/useContentLibraryData.ts
import { useState, useEffect, useCallback } from "react";
import { GetSubCategories, GetOngoingContents, GetLikedContent } from "@/api/api";
import { Book } from "@/components/BookCard";

export interface Category {
  name: string;
  books: Book[];
  hasSub?: boolean;
  subId?: number | null;
}

export const useContentLibraryData = (favMode: boolean) => {
  const [allCats, setAllCats] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [crumb, setCrumb] = useState<string[]>([]);
  const [ongoingBooks, setOngoingBooks] = useState<Book[]>([]);

  // 🔹 fetch ongoing books
  const refreshOngoing = useCallback(() => {
    const pid = sessionStorage.getItem("profileId") || "";
    if (!pid) return;

    GetOngoingContents(pid)
      .then((res) => {
        const raw = res?.data?.data?.ongoing_contents ?? [];
        const mapped: Book[] = raw.map((it: any) => {
          const total = it.pages?.length ?? 0;
          const read = Number(it.pages_read) || 0;
          const progress = total > 0 ? Math.round((read * 100) / total) : 0;

          return {
            id: it.id,
            title: it.name ?? "",
            coverUrl: it.thumbnail ?? "",
            progress,
            is_liked: it.is_liked,
          };
        });
        setOngoingBooks(mapped);
      })
      .catch(() => setOngoingBooks([]));
  }, []);

  // 🔹 load favourites
  const loadFavourites = useCallback(async () => {
    const pid = sessionStorage.getItem("profileId") || "";
    if (!pid) {
      setCategories([]);
      setSubcategories([]);
      setCrumb(["Favourites"]);
      return;
    }

    try {
      const res = await GetLikedContent(pid);
      const records = res?.data?.data?.records ?? [];
      const favBooks: Book[] = records.map((it: any) => ({
        id: it.id ?? it.content_id ?? 0,
        title: it.name ?? it.title ?? "",
        coverUrl: it.thumbnail ?? it.cover ?? it.image ?? "",
        progress: it.percentage ?? it.progress ?? 0,
        is_liked: true,
      }));
      setCategories([{ name: "Favourites", books: favBooks, hasSub: false }]);
      setSubcategories([]);
      setCrumb(["Favourites"]);
    } catch {
      setCategories([]);
      setSubcategories([]);
      setCrumb(["Favourites"]);
    }
  }, []);

  // 🔹 load subcategories (Stories/Languages)
  useEffect(() => {
    if (favMode) return;
    GetSubCategories().then((res) => {
      if (res.data.status && Array.isArray(res.data.data)) {
        setAllCats(res.data.data);
      }
    });
  }, [favMode]);

  // fetch ongoing once on mount
  useEffect(() => {
    refreshOngoing();
  }, [refreshOngoing]);

  return {
    allCats,
    setAllCats,      // ✅ added this export
    categories,
    setCategories,
    subcategories,
    setSubcategories,
    crumb,
    setCrumb,
    ongoingBooks,
    refreshOngoing,
    loadFavourites,
  };
};
