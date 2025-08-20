// src/components/BookCategory.tsx
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
  emptyMsg?: string;
  lazyDisabled?: boolean; // 👇 NEW: hard-disable lazy hook (used in Favourites)
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
  emptyMsg,
  lazyDisabled = false, // 👈 NEW
}) => {
  const actuallyDisabled = lazyDisabled || !hasSub; // 👈 treat no-sub as disabled
  const usingLazy = subId != null && !actuallyDisabled;

  const {
    books: lazyBooks,
    loadingInit,
    loadingMore,
    hasFetched,
    containerRef,
    sentryRef,
    loadMoreRef,
  } = useSubCategoryLazy(subId ?? null, expanded, actuallyDisabled); // 👈 pass disabled

  const list = usingLazy ? lazyBooks : books;
  const rowLoading = usingLazy ? loadingInit : loading;

  const containerClass = expanded
    ? "flex flex-wrap gap-4"
    : "flex space-x-4 overflow-x-auto no-scrollbar";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-[600] font-BalooSemiBold text-[28px] leading-[120%] tracking-[-0.02em] text-center align-middle text-[#667185] mt-[15px]">
          {categoryName.trim().length > 0 ? (
            categoryName
          ) : (
            <Skeleton width={100} />
          )}
        </h3>
        {!rowLoading && onSeeAll && (list.length > 3) && (
          <button
            onClick={onSeeAll}
            className="text-sm text-[#9FC43E] hover:underline"
          >
            {expanded ? "Show less" : "See all"}
          </button>
        )}
      </div>

      {usingLazy && !expanded && (
        <div ref={sentryRef} className="h-1" />
      )}

      <div ref={containerRef} className={containerClass}>
        <>
          {((!rowLoading && hasFetched && list.length === 0 && tabLabel != "For you") || (!rowLoading && list.length === 0 && tabLabel == "For you")) ? (
            <div className="text-gray-400 h-[50px] flex items-center justify-center w-full text-sm italic">
              {emptyMsg ?? "No content available"}
            </div>
          ) : (
            list.map((book, idx) => (
              <div key={book.id} className="flex-shrink-0">
                <BookCard
                  book={book}
                  onClick={() => {
                    const crumbs = [tabLabel];
                    if (parentCategory) crumbs.push(parentCategory);
                    crumbs.push(categoryName);
                    onBookClick?.(book, crumbs);
                  }}
                />
              </div>
            ))
          )}

          {((rowLoading || !hasFetched && tabLabel != "For you") || (rowLoading && tabLabel == "For you")) && (
            Array.from({ length: 7 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-32 h-44 rounded"
              />
            ))
          )}

          {usingLazy && expanded && (
            <div ref={loadMoreRef} className="h-1" />
          )}

          {loadingMore &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-32 h-44 rounded"
              />
            ))}
        </>
      </div>
    </div>
  );
};

export default BookCategory;
