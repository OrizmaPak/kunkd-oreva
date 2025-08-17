// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/CategorySections.tsx

import React from "react";
import BookCategory from "@/components/BookCategory";
import { Book } from "@/components/BookCard";

interface Category {
  name: string;
  books: Book[];
  subId?: number | null;
}

interface Props {
  // Which tab are we on?
  isStoriesTab: boolean;
  isLangsTab: boolean;
  isForYouTab: boolean;

  // Categories to render
  displayList: Category[];
  allCats: any[];

  // ---- Stories tab state ----
  showAllStories: boolean;
  storiesActiveSubSlug: string | null;
  setShowAllStories: (v: boolean) => void;
  setStoriesActiveSubSlug: (s: string | null) => void;

  // ---- Languages tab state ----
  showAllLanguages: boolean;
  languagesActiveSubSlug: string | null;
  setShowAllLanguages: (v: boolean) => void;
  setLanguagesActiveSubSlug: (s: string | null) => void;

  // ---- For You tab state ----
  expandedSimple: Record<string, boolean>;
  toggleForYouRow: (name: string) => void;

  // ---- Book actions ----
  openBook: (id: number) => void;
  setCrumb: (crumbs: string[]) => void;
}

/**
 * CategorySections
 * ----------------
 * Renders the Stories, Languages, or For You categories
 * depending on which tab is active.
 */
const CategorySections: React.FC<Props> = ({
  isStoriesTab,
  isLangsTab,
  isForYouTab,
  displayList,
  allCats,
  showAllStories,
  storiesActiveSubSlug,
  setShowAllStories,
  setStoriesActiveSubSlug,
  showAllLanguages,
  languagesActiveSubSlug,
  setShowAllLanguages,
  setLanguagesActiveSubSlug,
  expandedSimple,
  toggleForYouRow,
  openBook,
  setCrumb,
}) => {
  return (
    <>
      {/* ───── Stories Tab ───── */}
      {isStoriesTab &&
        (() => {
          // Grab all subcategories for Stories
          const storiesCat = allCats.find((c: any) => c.name === "Stories");
          const rows: Array<{ name: string; subId: number | null }> =
            (storiesCat?.sub_categories ?? []).map((s: any) => ({
              name: s?.name ?? "",
              subId: typeof s?.id === "number" ? s.id : null,
            }));

          // Show all, or just the expanded one
          const visibleRows = rows.filter(
            (r) => !showAllStories || r.name === (storiesActiveSubSlug ?? r.name)
          );

          return visibleRows.map((row) => (
            <BookCategory
              key={`${row.name}-${row.subId ?? "x"}`}
              subId={row.subId}
              categoryName={row.name}
              tabLabel="Stories"
              expanded={showAllStories && row.name === storiesActiveSubSlug}
              onSeeAll={() => {
                if (showAllStories && row.name === storiesActiveSubSlug) {
                  setShowAllStories(false);
                  setStoriesActiveSubSlug(null);
                } else {
                  setShowAllStories(true);
                  setStoriesActiveSubSlug(row.name);
                }
              }}
              onBookClick={(book, bc) => {
                openBook(book.id);
                setCrumb([...bc, book.title]);
              }}
            />
          ));
        })()}

      {/* ───── Languages Tab ───── */}
      {isLangsTab &&
        displayList
          .filter(
            (cat) => !showAllLanguages || cat.name === languagesActiveSubSlug
          )
          .map((cat) => (
            <BookCategory
              subId={cat.subId}
              key={cat.name}
              categoryName={cat.name}
              tabLabel="Languages"
              books={cat.books}
              hasSub={!!cat.subId}
              onSeeAll={() => setShowAllLanguages(!showAllLanguages)}
              expanded={showAllLanguages && cat.name === languagesActiveSubSlug}
              onBookClick={(book: any, bc: any) => {
                openBook(book.id);
                setCrumb([...bc, book.title]);
              }}
            />
          ))}

      {/* ───── For You Tab ───── */}
      {isForYouTab &&
        displayList.map((cat) => (
          <BookCategory
            key={cat.name}
            tabLabel="For you"
            categoryName={cat.name}
            books={cat.books}
            hasSub={false}
            expanded={!!expandedSimple[cat.name]}
            onSeeAll={() => toggleForYouRow(cat.name)}
            onBookClick={(book: any, bc: any) => {
              openBook(book.id);
              setCrumb([...bc, book.title]);
            }}
            emptyMsg={
              cat.name === "Continue Reading"
                ? "No ongoing content yet"
                : undefined
            }
          />
        ))}
    </>
  );
};

export default CategorySections;
