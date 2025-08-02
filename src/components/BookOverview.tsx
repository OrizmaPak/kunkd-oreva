// src/components/BookOverview.tsx
import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import BookCard, { Book } from "./BookCard";
import AudioComponent from "./AudioComponent";
import FrameImg from "@/assets/bigbook.png";

export interface BookOverviewProps {
  book: Book;
  crumb?: string[];
  onBack?: () => void;
  onRead?: (book: Book) => void;
  onWatch?: (book: Book) => void;
  /** URL or import path to the book’s audio file */
  audioSrc: string;
}

const BookOverview: React.FC<BookOverviewProps> = ({
  book,
  onRead,
  onWatch,
  audioSrc,
}) => {
  // track whether we’re showing the AudioComponent
  const [showAudio, setShowAudio] = useState(false);

  if (showAudio) {
    return (
      <AudioComponent
        book={book}
        audioSrc={audioSrc}
        onClose={() => setShowAudio(false)}
        onRead={() => setShowAudio(false)}
        onComplete={() => setShowAudio(false)}
      />
    );
  }

  return (
    <div className="mx-auto w-[clamp(550px,100%,1440px)] py-8 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-[72px]">
        {/* Use BookCard for the cover + frame */}
        <div className="flex-shrink-0 mt-4 cursor-default w-[250px] h-[300px]">
          <div className="relative flex-shrink-0">
            <img src={FrameImg} alt="frame" className="w-[250px] h-[300px]" />
            <img
              src={book.coverUrl}
              alt={book.title}
              className="absolute top-[13.47px] left-[13.06px] w-[223.88px] h-[236.84px] object-cover rounded"
            />
          </div>
        </div>

        {/* Text and actions */}
        <div className="flex flex-col w-[534.8px] h-[308.24px]">
          <div className="flex items-center justify-between mb-0">
            <h1 className="font-baloo font-bold text-[36px] leading-[100%] tracking-[0px] text-gray-700">
              {book.title}
            </h1>
            <button className="p-2 text-white hover:text-gray-600 bg-[#ECEFF1] p-2 rounded-full">
              <FaBookmark size={20} />
            </button>
          </div>

          <p className="font-arimo font-normal text-[18px] leading-[145%] tracking-[0%] text-gray-500 mb-4">
            Created by Kunda Kids
          </p>

          <h2 className="font-arimo font-bold text-[18px]  tracking-[0%] text-gray-900 mb-0">
            Overview
          </h2>
          <p className="font-arimo font-normal text-[18px] tracking-[0%] text-gray-700 mb-6">
            Splish, splash, and flip! Meet Dilly, the most curious little dolphin
            in the deep blue sea. Whether he's racing with sea turtles, playing
            hide and seek in coral caves, or discovering hidden treasures with
            his ocean friends, every day is a new adventure!
          </p>

          <div className="flex gap-4">
            <button
              className="bg-[#9FC43E] text-white w-[205px] h-[49px] rounded-full shadow-sm"
              onClick={() => onRead?.(book)}
            >
              Read by myself
            </button>
            <button
              className="border border-[#9FC43E] text-[#667185] w-[205px] h-[49px] rounded-full"
              onClick={() => setShowAudio(true)}
            >
              Read to me
            </button>
            <button
              className="border border-[#9FC43E] text-[#667185] w-[205px] h-[49px] rounded-full hover:bg-[#9FC43E] hover:text-white transition"
              onClick={() => onWatch?.(book)}
            >
              Watch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOverview;
