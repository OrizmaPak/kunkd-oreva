// src/components/BookOverview.tsx
import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import BookCard, { Book } from "./BookCard";
import AudioComponent from "./AudioComponent";
import FrameImg from "@/assets/bigbook.png";
import { GetContentById } from "@/api/api";          // ← new
import Skeleton from "react-loading-skeleton";      // ← new

/* ---------- ① extend the Book shape locally ---------- */
interface FullBook extends Book {
  mediaType?: string;        // "text" | "video" | …  (mind the snake-case in API)
  description?: string;      // web_synopsis / synopsis
}

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

  /* ─── new: fetch full book details ─── */
  const [fullBook, setFullBook] = useState<FullBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* ---------- ② fetch mapping ---------- */
  useEffect(() => {
    console.log('[BookOverview] mount for book-id:', book.id);
    let mounted = true;

    GetContentById(String(book.id), '1')
      .then(res => {
        const data = res?.data?.data ?? res?.data;
        console.log('[BookOverview] API payload', data);

        if (mounted && data) {
          setFullBook({
            id: data.id,
            title: data.name,
            coverUrl: data.thumbnail,
            progress: 0,
            mediaType: data.media_type,                 // ⬅︎ snake-case key
            description: data.web_synopsis || data.synopsis || '',
          });
        }
      })
      .catch(() => {/* fall back to the stub */})
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [book.id]);

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

  /* ---------- UI while fetching ---------- */
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton height={40} width={240} />
        <Skeleton height={300} />
        <Skeleton count={3} />
      </div>
    );
  }

  /* ---------- ③ decide which buttons to render ---------- */
  const displayBook = fullBook ?? book;
  const mediaType   = fullBook?.mediaType ?? 'text';   // default to text

  const isText   = mediaType === 'text';
  const isVideo  = mediaType === 'video';

  return (
    <div className="mx-auto w-[clamp(550px,100%,1440px)] py-8 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-[72px]">
        {/* Use BookCard for the cover + frame */}
        <div className="flex-shrink-0 mt-4 cursor-default w-[250px] h-[300px]">
          <div className="relative flex-shrink-0">
            <img src={FrameImg} alt="frame" className="w-[250px] h-[300px]" />
            <img
              src={displayBook.coverUrl}
              alt={displayBook.title}
              className="absolute top-[13.47px] left-[13.06px] w-[223.88px] h-[236.84px] object-cover rounded"
            />
          </div>
        </div>

        {/* Text and actions */}
        <div className="flex flex-col w-[534.8px] h-[308.24px]">
          <div className="flex items-center justify-between mb-0">
            <h1 className="font-baloo font-bold text-[36px] leading-[100%] tracking-[0px] text-gray-700">
              {displayBook.title}
            </h1>
            <button className="p-2 text-white hover:text-gray-600 bg-[#ECEFF1] p-2 rounded-full">
              <FaBookmark size={20} />
            </button>
          </div>

          <p className="font-arimo font-normal text-[18px] leading-[145%] tracking-[0%] text-gray-500 mb-4">
            Created by Kunda Kids
          </p>

          <h2 className="font-arimo font-bold text-[18px] mb-0">Overview</h2>
          {displayBook.description && (
            <p
              className="font-arimo font-normal text-[18px]  text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: displayBook.description }}
            />
          )}

          <div className="flex gap-4">
            {isText && (
              <>
                <button
                  className="bg-[#9FC43E] text-white w-[205px] h-[49px] rounded-full shadow-sm"
                  onClick={() => onRead?.(displayBook)}
                >
                  Read by myself
                </button>

                <button
                  className="border border-[#9FC43E] text-[#667185] w-[205px] h-[49px] rounded-full"
                  onClick={() => setShowAudio(true)}
                  disabled
                  >
                  Read to me
                </button>
              </>
            )}

            {isVideo && (
              <button
                /* ④ same green style used for “Read by myself” */
                className="bg-[#9FC43E] text-white w-[205px] h-[49px] rounded-full shadow-sm"
                onClick={() => onWatch?.(displayBook)}
              >
                Watch
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOverview;
