/* --- components/BookCategory.tsx ---------------------------------- */
/* make sure only ONE copy of this file exists and it imports the hook */
import React from "react";
import Skeleton from "react-loading-skeleton";
import BookCard, { Book } from "./BookCard";
import useSubCategoryLazy from "@/hooks/useSubCategoryLazy";

interface BookCategoryProps {
  books?: Book[];
  subId?: number | null;
  categoryName: string;
  loading?: boolean;
  expanded?: boolean;
  onSeeAll?: () => void;
  onBookClick?: (book: Book, crumb: string[]) => void;
  tabLabel: string;
  parentCategory?: string;
  hasSub?: boolean;
  emptyMsg?: string; // ← NEW
}

const BookCategory: React.FC<BookCategoryProps> = ({
  books = [],
  subId = null,
  categoryName,
  loading = false,
  expanded = false,
  onSeeAll,
  onBookClick,
  tabLabel,
  parentCategory,
  hasSub = true,
  emptyMsg, // ← NEW
}) => {
  console.log('categoryName', subId, categoryName)
  // decide data source
  const {
    books: lazyBooks,
    loading: lazyInit,
    loadingMore, 
    containerRef,
    sentryRef,
  } = useSubCategoryLazy(subId, expanded);

  const usingLazy = subId !== null;
  const list = usingLazy ? lazyBooks : books;

  console.log('list', list, usingLazy, lazyBooks)

  /* show skeletons **only** while we are actually fetching;
     once the fetch is done (even if the list is empty) we’ll
     fall through to the “No content available” message.        */
  const rowLoading = usingLazy
    ? lazyInit                                   // first lazy page
    : loading;                                   // non-lazy rows

  // layout helpers
  const containerClass = expanded
    ? "flex flex-wrap gap-4"
    : "flex space-x-4 overflow-x-auto no-scrollbar";

  // ──────────  RENDER  ──────────
  return (
    <section className="mx-auto w-[clamp(300px,100%,1440px)] pb-8 px-0">
      {/* =====  HEADER  ===== */}
      <div className="flex items-center justify-between">
        <h4 className="font-baloo font-semibold text-[24px] text-[#667185]">
          {categoryName.trim().length > 0 ? categoryName : <Skeleton width={150} />}
        </h4>
        {!rowLoading && onSeeAll && (hasSub || list.length > 3) && (
          <button
            onClick={onSeeAll}
            className="font-inter font-medium text-[14px] text-[#9FC43E] hover:underline"
          >
            {expanded ? "Show less" : "See all"}
          </button>
        )}
      </div>

      {/* 👇 sentinel sits *between* header and the scroll list */}
      {usingLazy && <span ref={sentryRef} className="block h-px w-full" />}

      {/* =====  HORIZONTAL LIST  ===== */}
      <div
        className={`${containerClass} pb-4`}
        ref={usingLazy ? containerRef : undefined}
      >
        {/* --- 1️⃣  finished loading but the list is empty ----------- */}
        {!rowLoading && list.length === 0 ? (
          <div className="flex w-full h-24 items-center justify-center text-xs italic text-gray-400">
            {emptyMsg ?? "No content available"}
          </div>
        ) : (
          list.map((book, i) => (
            <div
              key={`${book.id}-${i}`}
              className="flex-shrink-0 cursor-pointer"
              onClick={() =>
                onBookClick?.(book, [tabLabel, parentCategory ?? "", categoryName])
              }
            >
              <BookCard book={book} />
            </div>
          ))
        )}

        {/* --- 2️⃣  skeletons while loading  ------------------------- */}
        {rowLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-24 sm:w-32 md:w-40">
              <Skeleton height={160} borderRadius={8} />
              <Skeleton height={8} className="mt-2" borderRadius={4} />
            </div>
          ))}

        {/* skeletons while fetching additional pages */}
        {loadingMore &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`more-${i}`} className="flex-shrink-0 w-24 sm:w-32 md:w-40">
              <Skeleton height={160} borderRadius={8} />
              <Skeleton height={8} className="mt-2" />
            </div>
          ))}
      </div>
    </section>
  );
};

export default BookCategory;
