// src/components/BookOverview.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import BookCard, { Book } from "./BookCard";
import AudioComponent from "./AudioComponent";
import FrameImg from "@/assets/bigbook.png";
import {
  GetContentById,
  GetLikedContent,
  LikedContent,
  UnLikedContent,
} from "@/api/api"; // ← added GetLikedContent, LikedContent, UnLikedContent
import Skeleton from "react-loading-skeleton";
import { showNotification } from "@mantine/notifications";
import { deriveMediaAttributes } from "@/utils/media";

/* ---------- ① extend the Book shape locally ---------- */
interface FullBook extends Book {
  mediaType?: string;        // "text" | "video" | "audio" | …
  description?: string;      // web_synopsis / synopsis
}

export interface BookOverviewProps {
  book: Book;
  crumb?: string[];
  onBack?: () => void;
  onRead?: (book: Book) => void;
  onWatch?: (book: Book) => void;
  onListen?: (book: Book) => void;
  /** URL or import path to the book's audio file */
  audioSrc: string;
}

const BookOverview: React.FC<BookOverviewProps> = ({
  book,
  onRead,
  onWatch,
  onListen,
  audioSrc,
}) => {
  // track whether we’re showing the AudioComponent
  const [showAudio, setShowAudio] = useState(false);

  const [fullBook, setFullBook] = useState<FullBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [shouldMount, setShouldMount] = useState<boolean>(true);
  const fetchRef = useRef<{ key: string; promise: ReturnType<typeof GetContentById> } | null>(null);

  const profileId = useMemo(() => {
    return `${sessionStorage.getItem("profileId") || ""}`.trim();
  }, []);

  /* ─── local like state ─── */
  const [isLiked, setIsLiked] = useState<boolean>(!!book.is_liked);
  const [likeBusy, setLikeBusy] = useState<boolean>(false);

  /* ─── fetch full book details ─── */
  useEffect(() => {
    if (!book?.id) {
      return;
    }

    const userKey = profileId || "";
    const requestKey = `${book.id}-${userKey}`;

    const runRequest = (promise: ReturnType<typeof GetContentById>, key: string) => {
      promise
        .then((res) => {
          if (fetchRef.current?.key !== key) {
            return;
          }

          if (!res?.data?.status) {
            setShouldMount(false);
            showNotification({
              title: "Unavailable",
              message: res?.data?.message || "This book is currently unavailable.",
              color: "red",
            });
            onBack?.();
            fetchRef.current = null;
            setLoading(false);
            return;
          }

          const data = res?.data?.data ?? res?.data;
          if (!data) {
            setShouldMount(false);
            fetchRef.current = null;
            setLoading(false);
            return;
          }

          const mediaAttributes = deriveMediaAttributes(data);

          setFullBook({
            id: data.id,
            title: data.name,
            coverUrl: data.thumbnail,
            progress: 0,
            mediaType: data.media_type,
            description: data.web_synopsis || data.synopsis || "",
            is_liked: typeof data.is_liked !== "undefined" ? !!data.is_liked : undefined,
            hasAudio: mediaAttributes.hasAudio,
            hasText: mediaAttributes.hasText,
            audioSources: mediaAttributes.audioSources,
          });

          if (typeof data.is_liked !== "undefined") {
            setIsLiked(!!data.is_liked);
          }
        })
        .catch(() => {
          if (fetchRef.current?.key !== key) {
            return;
          }
          setShouldMount(false);
          showNotification({
            title: "Error",
            message: "Could not load book details.",
            color: "red",
          });
          onBack?.();
          fetchRef.current = null;
          setLoading(false);
        })
        .finally(() => {
          if (fetchRef.current?.key === key) {
            setLoading(false);
          }
        });
    };

    if (fetchRef.current?.key === requestKey) {
      runRequest(fetchRef.current.promise, requestKey);
      return;
    }

    setShouldMount(true);
    setFullBook(null);
    setLoading(true);
    setIsLiked(!!book.is_liked);

    const promise = GetContentById(String(book.id), profileId);
    fetchRef.current = { key: requestKey, promise };
    runRequest(promise, requestKey);
  }, [book.id, profileId, book.is_liked]);
  /* ---------- ③ fallback check against favourites list (only if unknown) ---------- */
  useEffect(() => {
    // If we still don't know the like state (e.g., list pages didn’t include it and /content/:id didn’t return it),
    // we cheaply verify once from the favourites endpoint.
    const shouldProbe =
      fullBook &&
      typeof fullBook.is_liked === "undefined" &&
      !!profileId;

    if (!shouldProbe) return;

    let active = true;
    GetLikedContent(profileId)
      .then((res) => {
        const items: any[] = res?.data?.data || [];
        if (!active) return;
        const exists = items.some((it) => `${it?.id}` === `${book.id}`);
        setIsLiked(exists);
        // persist it on the fullBook object so re-renders remain consistent
        setFullBook((prev) => (prev ? { ...prev, is_liked: exists } : prev));
      })
      .catch(() => {
        /* ignore — non-blocking */
      });

    return () => {
      active = false;
    };
  }, [fullBook, profileId, book.id]);

  /* ---------- ④ like/unlike toggle ---------- */
  const toggleLike = async () => {
    if (!profileId) {
      showNotification({
        title: "Select a profile",
        message: "Please select a child profile to use favourites.",
        color: "yellow",
      });
      return;
    }
    if (likeBusy) return;

    const contentId = Number(book.id);
    const payload = { profile_id: Number(profileId), content_id: contentId };

    try {
      setLikeBusy(true);
      if (!isLiked) {
        await LikedContent(payload);
        setIsLiked(true);
        setFullBook((prev) => (prev ? { ...prev, is_liked: true } : prev));
        showNotification({
          title: "Added to Favourites",
          message: "This item is now in your favourites.",
          color: "green",
        });
      } else {
        await UnLikedContent(payload);
        setIsLiked(false);
        setFullBook((prev) => (prev ? { ...prev, is_liked: false } : prev));
        showNotification({
          title: "Removed from Favourites",
          message: "This item has been removed from your favourites.",
          color: "gray",
        });
      }
    } catch (err: any) {
      showNotification({
        title: "Action failed",
        message: err?.response?.data?.message || "Could not update favourite.",
        color: "red",
      });
    } finally {
      setLikeBusy(false);
    }
  };

  if (!shouldMount) {
    return null;
  }

  if (showAudio) {
    return (
      <AudioComponent
        book={displayBook}
        audioSrc={effectiveAudioSrc}
        onClose={() => setShowAudio(false)}
        onRead={() => {
          setShowAudio(false);
          onRead?.(displayBook);
        }}
        onComplete={() => setShowAudio(false)}
        showReadButton={canRead}
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

  /* ---------- decide which buttons to render ---------- */
  const displayBook = fullBook ? { ...book, ...fullBook } : book;
  const audioCandidates =
    fullBook?.audioSources && fullBook.audioSources.length > 0
      ? fullBook.audioSources
      : Array.isArray(book.audioSources)
      ? book.audioSources
      : [];
  const effectiveAudioSrc =
    audioCandidates.find(
      (src) => typeof src === "string" && src.trim().length > 0
    ) || audioSrc;

  const rawMediaType = String(fullBook?.mediaType ?? "").toLowerCase();
  const canRead =
    (fullBook?.hasText ?? book.hasText) ??
    (rawMediaType === "text" || rawMediaType === "");
  const canListen =
    (fullBook?.hasAudio ?? book.hasAudio ?? false) ||
    rawMediaType === "audio";
  const canWatch = rawMediaType === "video";
  const listenLabel = canRead ? "Read to me" : "Listen";

  const handleListen = () => {
    if (!canListen) {
      return;
    }

    if (onListen) {
      onListen(displayBook);
      return;
    }

    if (!effectiveAudioSrc) {
      showNotification({
        title: "Unavailable",
        message: "Audio for this book is currently unavailable.",
        color: "red",
      });
      return;
    }

    setShowAudio(true);
  };

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

            {/* ♥ Favourite toggle */}
            <button
              type="button"
              onClick={toggleLike}
              disabled={likeBusy}
              aria-pressed={isLiked}
              title={isLiked ? "Remove from favourites" : "Add to favourites"}
              className={[
                "p-2 rounded-full transition-colors",
                isLiked
                  ? "bg-[#F3FAE6] text-[#9FC43E]" // green tint when liked
                  : "bg-[#ECEFF1] text-white hover:text-gray-600",
                likeBusy ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
              ].join(" ")}
            >
              <FaHeart className={isLiked ? "scale-110" : ""} />
            </button>
          </div>

          <p className="font-arimo font-normal text-[18px] leading-[145%] tracking-[0%] text-gray-500 mt-2 mb-[12px]">
            Created by Kunda Kids
          </p>

          <h2 className="font-arimo font-bold text-[18px] leading-[145%] mb-[6px]">
            Overview
          </h2>

          {displayBook.description && (
            <p
              className="font-arimo font-[400] text-[18px] leading-[145%] text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: displayBook.description }}
            />
          )}

          <div className="flex flex-wrap gap-4 mt-auto mb-3">
            {canRead && (
              <button
                className="bg-[#9FC43E] text-white w-[205px] h-[49px] rounded-full shadow-sm"
                onClick={() => onRead?.(displayBook)}
              >
                Read by myself
              </button>
            )}

            {canListen && (
              <button
                className="bg-[#9FC43E] text-white w-[205px] h-[49px] rounded-full shadow-sm"
                onClick={handleListen}
                disabled={!effectiveAudioSrc && !onListen}
              >
                {listenLabel}
              </button>
            )}

            {canWatch && (
              <button
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
