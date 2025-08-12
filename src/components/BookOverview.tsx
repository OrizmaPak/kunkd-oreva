// src/components/BookOverview.tsx
import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import BookCard, { Book } from "./BookCard";
import AudioComponent from "./AudioComponent";
import FrameImg from "@/assets/bigbook.png";
import { GetContentById } from "@/api/api";          // ← new
import Skeleton from "react-loading-skeleton";      // ← new
import { showNotification } from "@mantine/notifications";

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
  const [shouldMount, setShouldMount] = useState<boolean>(true);

  /* ---------- ② fetch mapping ---------- */
  useEffect(() => {
    console.log('[BookOverview] mount for book-id:', book.id);
    let mounted = true;

    const profileId:any = sessionStorage.getItem("profileId");

    GetContentById(String(book.id), profileId)
      .then(res => {
        if (!res.data.status) {
          // alert('Error');
          // Assuming there's a notification system in place
          // showNotification({
          //   message: res.data.message,
          //   title: "Notification"
          // });
          setShouldMount(false);
          return;
        }
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

  if (!shouldMount) {
    return null;
  }

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
        <div className="flex-shrink-0 mt-[-10px] cursor-default w-[250px] h-[300px]">
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
        <div className="flex flex-col w-[534.8px] h-[308.24px] text-[#667185]">
          <div className="flex items-center justify-between mb-0">
            <h1 className="font-BalooSemiBold font-bold text-[36px] leading-[100%] tracking-[0px] text-[#667185]">
              {displayBook.title}
            </h1>
             <button className="p-2 text-white hover:text-gray-600 bg-[#ECEFF1] p-2 rounded-full">
             <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.742065 24.8783C0.742065 11.2592 11.7825 0.21875 25.4016 0.21875C39.0207 0.21875 50.0612 11.2592 50.0612 24.8783C50.0612 38.4974 39.0207 49.5379 25.4016 49.5379C11.7825 49.5379 0.742065 38.4974 0.742065 24.8783Z" fill="#ECEFF1"/>
                <path d="M32.3778 33.6503L25.8639 28.9975L19.3501 33.6503V18.7615C19.3501 18.2679 19.5462 17.7945 19.8952 17.4455C20.2442 17.0965 20.7176 16.9004 21.2112 16.9004H30.5167C31.0103 16.9004 31.4837 17.0965 31.8327 17.4455C32.1817 17.7945 32.3778 18.2679 32.3778 18.7615V33.6503Z" stroke="#AEB7BF" stroke-width="3.08245" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

              
            </button>
          </div>

          <p className="font-arimo font-normal text-[18px] leading-[145%] tracking-[0%] text-gray-500 mt-2 mb-[12px]">
            Created by Kunda Kids
          </p>

          <h2 className="font-arimo font-bold text-[18px] leading-[145%] mb-[6px]">Overview</h2>
          {displayBook.description && (
            <p
              className="font-arimo font-[400] text-[18px] leading-[145%] text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: displayBook.description }}
            />
          )}

          <div className="flex gap-4 mt-auto mb-3">
            {isText && (
              <>
                <button
                  className="bg-[#9FC43E] text-white w-[205px] h-[49px] rounded-full shadow-sm"
                  onClick={() => onRead?.(displayBook)}
                >
                  Read by myself
                </button>

                <button
                  className="border hidden border-[#9FC43E] text-[#667185] w-[205px] h-[49px] rounded-full "
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
