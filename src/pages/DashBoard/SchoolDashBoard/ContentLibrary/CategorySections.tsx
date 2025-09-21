import React from "react";
import BookCategory from "@/components/BookCategory";
import type { CategoryState } from "./hooks/useContentLibraryController";

interface Props {
  categories: CategoryState;
}

const CategorySections: React.FC<Props> = ({ categories }) => {
  const {
    isStories,
    isLanguages,
    isForYou,
    list,
    prunedForYou,
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
  } = categories;

  if (isStories) {
    const rows = list.map((cat) => ({
      name: cat.name,
      subId: typeof cat.subId === "number" ? cat.subId : null,
    }));

    const visibleRows = rows.filter((row) => !showAllStories || row.name === storiesActiveSubSlug);

    return (
      <>
        {visibleRows.map((row) => (
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
                setShowAllLanguages(false);
              }
            }}
            onBookClick={(book, crumbs) => {
              openBook(Number(book.id));
              setCrumb([...crumbs, book.title]);
            }}
          />
        ))}
      </>
    );
  }

  if (isLanguages) {
    return (
      <>
        {list
          .filter((cat) => !showAllLanguages || cat.name === languagesActiveSubSlug)
          .map((cat) => (
            <BookCategory
              key={cat.name}
              subId={typeof cat.subId === "number" ? cat.subId : undefined}
              categoryName={cat.name}
              tabLabel="Languages"
              books={cat.books}
              hasSub={!!cat.subId}
              expanded={showAllLanguages && cat.name === languagesActiveSubSlug}
              onSeeAll={() => {
                if (showAllLanguages && cat.name === languagesActiveSubSlug) {
                  setShowAllLanguages(false);
                  setLanguagesActiveSubSlug(null);
                } else {
                  setShowAllLanguages(true);
                  setLanguagesActiveSubSlug(cat.name);
                  setShowAllStories(false);
                }
              }}
              onBookClick={(book, crumbs) => {
                openBook(Number(book.id));
                setCrumb([...crumbs, book.title]);
              }}
            />
          ))}
      </>
    );
  }

  if (isForYou) {
    const source = prunedForYou.length > 0 ? prunedForYou : list;
    return (
      <>
        {source.map((cat) => (
          <BookCategory
            key={cat.name}
            tabLabel="For you"
            categoryName={cat.name}
            books={cat.books}
            hasSub={false}
            expanded={!!expandedSimple[cat.name]}
            onSeeAll={() => toggleForYouRow(cat.name)}
            onBookClick={(book, crumbs) => {
              openBook(Number(book.id));
              setCrumb([...crumbs, book.title]);
            }}
            emptyMsg={
              cat.name === "Continue Reading" ? "No ongoing content yet" : undefined
            }
          />
        ))}
      </>
    );
  }

  return null;
};

export default CategorySections;
