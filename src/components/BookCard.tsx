import React from "react";
import FrameImg from "@/assets/bookframe.png";
import FavouriteHeart from "@/components/FavouriteHeart";
import { IoHeadsetOutline } from "react-icons/io5";
import BlurImage from "@/components/atoms/BlurImage";

export interface Book {
  id: number | string;
  title: string;
  coverUrl: string;
  progress: number; // 0-100
  is_liked?: boolean;
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
  fallbackProgress?: number;
}

const resolveCoverTop = (showBar: boolean): string => {
  if (typeof window === "undefined") {
    return showBar ? "top-[7.9%]" : "top-[10.5%]";
  }

  const isFavourites = window.location.href.includes("/favourites");
  if (!isFavourites) {
    return showBar ? "top-[7.9%]" : "top-[10.5%]";
  }

  const tab = new URLSearchParams(window.location.search).get("tab");
  if (tab === "2") {
    return "top-[10%]";
  }
  return "top-[5%]";
};

const BookCard: React.FC<BookCardProps> = ({
  book,
  onClick,
  forceProgress = false,
  fallbackProgress = 50,
}) => {
  const hasNumeric = typeof book.progress === "number" && !Number.isNaN(book.progress);
  const effectiveProgress =
    hasNumeric && book.progress > 0
      ? Math.min(100, Math.max(0, Math.round(book.progress)))
      : forceProgress
        ? Math.min(100, Math.max(0, Math.round(fallbackProgress)))
        : undefined;

  const showBar = typeof effectiveProgress === "number";
  const coverTopClass = resolveCoverTop(showBar);

  return (
    <button
      onClick={onClick}
      onKeyDown={(event) => event.key === "Enter" && onClick?.()}
      className="relative mt-4 w-fit flex-shrink-0 cursor-pointer transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9FC43E] active:scale-95 group"
    >
      <div className="absolute left-2 top-2 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <FavouriteHeart
          bookId={typeof book.id === "string" ? parseInt(book.id, 10) : book.id}
          isFavorite={book.is_liked}
          contentType="book"
        />
      </div>

      {book.hasAudio && (
        <span className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-medium text-[#667185] shadow-sm">
          <IoHeadsetOutline className="h-4 w-4 text-[#9FC43E]" />
          Audio
        </span>
      )}

      <img src={FrameImg} alt="frame" className="block h-[152px] w-[134px]" />

      <div className={`absolute ${coverTopClass} left-[4.85%] h-[120px] w-[120px] overflow-hidden`}>
        <BlurImage
          src={book.coverUrl}
          alt={book.title}
          fallbackColor="#F3F4F6"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
        />
      </div>

      {showBar && (
        <div
          className="absolute bottom-[-6px] left-1/2 h-[7px] w-[95%] -translate-x-1/2 overflow-visible rounded-full bg-black/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={effectiveProgress}
          aria-label="Reading progress"
          title={`${effectiveProgress}% complete`}
        >
          <div className="h-full rounded-full bg-[#9FC43E]" style={{ width: `${effectiveProgress}%` }} />
        </div>
      )}
    </button>
  );
};

export default BookCard;
