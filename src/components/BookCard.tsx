import React from "react";
import FrameImg from "@/assets/bookframe.png";
import FavouriteHeart from "@/components/FavouriteHeart";

export interface Book { 
  id: number | string;
  title: string;
  coverUrl: string;
  progress: number; // 0–100
  is_liked?: boolean; // backend flag if available
}

export interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  /* dev-trace */ console.log('[BookCard] render', book.id, book.is_liked);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className="
        relative flex-shrink-0 w-fit transition-transform duration-300 active:scale-95 mt-4 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9FC43E]
        group
      "
    >
      {/* Heart — top-left, only visible on hover */}
      <div className="absolute left-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FavouriteHeart
          bookId={typeof book.id === "string" ? parseInt(book.id, 10) : book.id}
          isFavorite={book.is_liked}
          contentType="book"
        />
      </div>

      {/* Frame PNG */}
      <img src={FrameImg} alt="frame" className="block w-[134px] h-[152px]" />

      {/* Cover sits behind bumping into the frame’s transparent window */}
      <img
        src={book.coverUrl}
        alt={book.title}
        className="absolute top-[4.5%] left-[4.85%] w-[120px] h-[120px] object-cover transition-transform duration-1000 hover:scale-105"
      />

      {/* Progress bar aligned with the width of the book cover */}
      {book.progress > 0 && (
        <div
          className="absolute bottom-[-10px] left-[0%] w-[100%] h-[6px] bg-green-200 rounded-full group"
        >
          <div
            className="h-full bg-[#BCD678] rounded-full transition-width duration-20000"
            style={{ width: `${book.progress}%` }}
          />
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {`${book.progress}%`}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
