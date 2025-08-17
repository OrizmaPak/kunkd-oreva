import { Book } from "@/components/BookCard";
import { Category } from "../types/contentLibrary";
import KojoAndLolaImage from "@/assets/Kojo and Lola.png";

/* ---------------- Logger ---------------- */
export const trace = (...msg: any[]) =>
  console.log('%c[ContentLibrary]', 'color:#BCD678;font-weight:bold', ...msg);

/* ---------------- String Helpers ---------------- */
export const toTitle = (s: string) =>
  s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* ---------------- Transformers ---------------- */
export const homeToCategories = (payload: any): Category[] => {
  trace("homeToCategories() payload:", payload);

  if (!payload || typeof payload !== "object") return [];

  const uniqueBooks = new Set<string>();
  const catArray: Category[] = [];

  Object.entries(payload).forEach(([key, val]: [string, any]) => {
    if (!Array.isArray(val)) return;

    const books: Book[] = val
      .filter((item) => {
        const uniqueKey = `${key}-${item.id}`;
        if (!uniqueBooks.has(uniqueKey)) {
          uniqueBooks.add(uniqueKey);
          return true;
        }
        return false;
      })
      .map((item) => ({
        id: item.id,
        title: item.name,
        coverUrl: item.thumbnail,
        progress: 0, // default for "for you" rows
        is_liked: item.is_liked,
      }));

    catArray.push({
      name: toTitle(key),
      books,
      hasSub: false,
    });
  });

  trace("homeToCategories() →", catArray);
  return catArray;
};

/* ---------------- Fallback Subcategories ---------------- */
export const generateAllSubcategories = (): Category[] => [
  {
    name: "Advanced Reading",
    books: [
      {
        id: 29,
        title: "Advanced Book One",
        coverUrl: KojoAndLolaImage,
        progress: 10,
      },
    ],
  },
];

/* ---------------- Default Tabs ---------------- */
import foryou from "@/assets/foryou.png";
import story from "@/assets/story.png";
import languages from "@/assets/languagev.png";
import literacy from "@/assets/literacy.png";
import { Tab } from "../types/contentLibrary";

export const defaultTabs: Omit<Tab, "id">[] = [
  { label: "For you", icon: foryou },
  { label: "Stories", icon: story },
  { label: "Languages", icon: languages },
  { label: "Literacy", icon: literacy },
];
