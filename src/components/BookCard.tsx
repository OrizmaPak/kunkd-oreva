import React from "react";
import FrameImg from "@/assets/bookframe.png";
import FavouriteHeart from "@/components/FavouriteHeart";
import { IoHeadsetOutline } from "react-icons/io5";

export interface Book {
  id: number | string;
  title: string;
  coverUrl: string;
  progress: number; // 0-100
  is_liked?: boolean; // backend flag if available
  category?: string;
  hasAudio?: boolean;
  hasText?: boolean;
  audioSources?: string[];
}

export interface BookCardProps {
  book: Book;
  onClick?: () => void;

  /** If true (e.g. Continue Reading), always show the bar */
  forceProgress?: boolean;

  /** Used when progress is missing/0 and forceProgress=true */
  fallbackProgress?: number; // default 50
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onClick,
  forceProgress = false,
  fallbackProgress = 50,
}) => {
  // /* dev-trace */ console.log('[BookCard] render', book.id, book.is_liked);
  console.log('BookCard → book', book);

  // --- compute effective progress without changing markup/position ---
  const hasNumeric = typeof book.progress === "number" && !Number.isNaN(book.progress);
  const effectiveProgress =
    hasNumeric && book.progress > 0
      ? Math.min(100, Math.max(0, Math.round(book.progress)))
      : (forceProgress ? Math.min(100, Math.max(0, Math.round(fallbackProgress))) : undefined);

  const showBar = typeof effectiveProgress === "number";

  return (
    <button
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className="relative flex-shrink-0 w-fit transition-transform duration-300 active:scale-95 mt-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9FC43E] group"
    >
      {/* Heart — top-left, only visible on hover */}
      <div className="absolute left-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FavouriteHeart
          bookId={typeof book.id === "string" ? parseInt(book.id, 10) : book.id}
          isFavorite={book.is_liked}
          contentType="book"
        />
      </div>

      {book.hasAudio && (
        <span
          className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-medium text-[#667185] shadow-sm"
        >
          <IoHeadsetOutline className="h-4 w-4 text-[#9FC43E]" />
          Audio
        </span>
      )}

      {/* Frame PNG */}
      <img src={FrameImg} alt="frame" className="block w-[134px] h-[152px]" />

      {/* Cover sits behind bumping into the frame’s transparent window */}
      <img
        src={book.coverUrl}
        alt={book.title}
        className={`absolute ${window.location.href.includes('/favourites') && new URLSearchParams(window.location.search).get('tab') === '2' ? 'top-[10%]' : (window.location.href.includes('/favourites') ? 'top-[5%]' : (showBar ? 'top-[7.9%]' : 'top-[10.5%]'))} left-[4.85%] w-[120px] h-[120px] object-cover transition-transform duration-1000 hover:scale-105`}
      />

      {/* Progress bar aligned with the width of the book cover */}
      {showBar && (
        <div
          className="relative -bottom-1 left-1/2 -translate-x-1/2 w-[95%] h-[7px] rounded-full bg-black/10 overflow-visible"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={effectiveProgress}
          aria-label="Reading progress"
          title={`${effectiveProgress}% complete`}
        >
          <div className="h-full bg-[#9FC43E] rounded-full" style={{ width: `${effectiveProgress}%` }} />
        </div>
      )}
    </button>
  );
};

export default BookCard;
