import React from "react";
import Skeleton from "react-loading-skeleton";
import BookCard, { Book } from "./BookCard";

interface BookCategoryProps {
  books?: Book[];
  categoryName: string;
  loading?: boolean;
  expanded?: boolean;
  onSeeAll?: () => void;
  onBookClick?: (book: Book, crumb: string[]) => void;
  tabLabel: string;
  parentCategory?: any;
}

const BookCategory: React.FC<BookCategoryProps> = ({
  books = [],
  categoryName,
  loading = false,
  expanded = false,
  onSeeAll,
  onBookClick,
  tabLabel,
  parentCategory,
}) => {
  // container classes: scroll vs wrap
  const containerClass = expanded
    ? "flex flex-wrap gap-4"
    : "flex space-x-4 overflow-x-auto no-scrollbar";

  return (
    <section className="mx-auto w-[clamp(300px,100%,1440px)] pb-8 px-0">
      <div className="flex items-center justify-between">
        <h4 className="font-baloo font-semibold text-[24px] text-[#667185]">
          {loading ? <Skeleton width={150} /> : categoryName}
        </h4>
        {!loading && onSeeAll && (
          <button
            onClick={onSeeAll}
            className="font-inter font-medium text-[14px] text-[#9FC43E] hover:underline"
          >
            {expanded ? "Show less" : "See all"}
          </button>
        )}
      </div>

      <div className={`${containerClass} pb-4`}>
        {loading
          ? // skeleton placeholders
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-24 sm:w-32 md:w-40">
                <Skeleton height={160} borderRadius={8} />
                <Skeleton
                  height={8}
                  width="100%"
                  className="mt-2"
                  borderRadius={4}
                />
              </div>
            ))
          : // real book cards
            books.map((book) => (
              <div
                key={book.id}
                className="flex-shrink-0 cursor-pointer"
                onClick={() =>
                  onBookClick &&
                  onBookClick(book, [tabLabel, parentCategory, categoryName])
                }
              >
                <BookCard book={book} />
              </div>
            ))}
      </div>
    </section>
  );
};

export default BookCategory;
