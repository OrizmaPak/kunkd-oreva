// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/helpers.ts
import type { Book } from "@/components/BookCard";
import type { Category } from "./types";

/** Dev-only tracer; same name/signature as before to preserve existing logs */
export const trace = (...msg: any[]) =>
  console.log("%c[ContentLibrary]", "color:#BCD678;font-weight:bold", ...msg);

/** snake_case → Title Case (kept identical to avoid behavior drift) */
export const toTitle = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Normalize ContentForHome() → Category[]
 * - De-dupes items using `<key>-<id|content_id>`
 * - Preserves field picks your UI expects (title, coverUrl, progress, is_liked)
 * - Marks rows as local (hasSub = false) so existing “See all / Show less” still works
 */
export const homeToCategories = (payload: any): Category[] => {
  trace("homeToCategories() payload:", payload);
  if (!payload || typeof payload !== "object") return [];

  const seen = new Set<string>();
  const out: Category[] = [];

  Object.entries(payload).forEach(([key, val]) => {
    if (!Array.isArray(val)) return;

    const books: Book[] = (val as any[])
      .filter((item) => {
        const uid = `${key}-${item?.id ?? item?.content_id}`;
        if (!seen.has(uid)) {
          seen.add(uid);
          return true;
        }
        return false;
      })
      .map((item) => ({
        id: item?.id ?? item?.content_id,
        title: item?.name ?? item?.title ?? "",
        coverUrl: item?.thumbnail ?? item?.cover ?? item?.image ?? "",
        progress: Number(item?.percentage ?? item?.progress ?? 0) || 0,
        is_liked: item?.is_liked,
      }));

    out.push({
      name: toTitle(key),
      books,
      hasSub: false,
    });
  });

  trace("homeToCategories() →", out);
  return out;
};
