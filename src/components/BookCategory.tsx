// src/components/BookCategory.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import BookCard, { Book } from "./BookCard";
import useSubCategoryLazy from "@/hooks/useSubCategoryLazy";

interface BookCategoryProps {
  /** Static list of books (used when subId is null) */
  books?: Book[];
  /** Sub-category ID for lazy loading (null for For You tab) */
  subId?: number | null;
  /** Category title shown above the list */
  categoryName: string;
  /** Loading indicator for non-lazy rows */
  loading?: boolean;
  /** Whether this category is currently expanded (Show all) */
  expanded?: boolean;
  /** Callback for toggling "See All" / "Show Less" */
  onSeeAll?: () => void;
  /** Callback when a book is clicked; receives the book and breadcrumb array */
  onBookClick?: (book: Book, crumb: string[]) => void;
  /** Top-level tab label ("For you", "Stories", "Languages") */
  tabLabel: string;
  /** Parent category when navigating into a sub-view */
  parentCategory?: string;
  /** Whether this category supports sub-view (default true) */
  hasSub?: boolean;
  /** Message to show when empty */
  emptyMsg?: string;
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
}) => {
  // Lazy-loading hook for sub-categories
  const {
    books: lazyBooks,
    loadingInit,
    loadingMore,
    hasFetched,
    containerRef,
    sentryRef,
    loadMoreRef,
  } = useSubCategoryLazy(subId, expanded);

  const usingLazy = subId != null;
  // Choose data source based on lazy vs. static
  const list = usingLazy ? lazyBooks : books;
  // First-page load vs. static loading
  const rowLoading = usingLazy ? loadingInit : loading;

  // Layout classes
  const containerClass = expanded
    ? "flex flex-wrap gap-4"
    : "flex space-x-4 overflow-x-auto no-scrollbar";

  return (
    <div className="mb-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">
          {categoryName.trim().length > 0 ? (
            categoryName
          ) : (
            <Skeleton width={100} />
          )}
        </h3>
        {/* {!rowLoading && onSeeAll && (hasSub || list.length > 3) && ( */}
        {!rowLoading && onSeeAll && (list.length > 3) && (
          <button
            onClick={onSeeAll}
            className="text-sm text-[#9FC43E] hover:underline"
          >
            {expanded ? "Show less" : "See all"}
          </button>
        )}
      </div>

      {/* Sentinel for initial lazy load (collapsed state) */}
      {usingLazy && !expanded && (
        <div ref={sentryRef} className="h-1" />
      )}

      {/* BOOK LIST */}
      <div ref={containerRef} className={containerClass}>
        {/* Special case for "Continue Reading" category */}
        {categoryName === "Continue Reading" ? (
          <div className="text-gray-400 h-[50px] flex items-center justify-center w-full text-sm italic">
            No content available
          </div>
        ) : (
          <>
            {/* Empty state after load */}
            {((!rowLoading && hasFetched && list.length === 0 && tabLabel != "For you") || (!rowLoading && list.length === 0 && tabLabel == "For you") ) ? (
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

            {/* Skeletons for first-page loading/static loading */}
            {((rowLoading || !hasFetched && tabLabel != "For you") || (rowLoading && tabLabel == "For you")) && (
              Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-32 h-44 rounded"
                />
              ))
            )}

            {/* Sentinel for infinite scroll when expanded */}
            {usingLazy && expanded && (
              <div ref={loadMoreRef} className="h-1" />
            )}

            {/* Skeletons for loading more pages */}
            {loadingMore &&
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-32 h-44 rounded"
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BookCategory;
