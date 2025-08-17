// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/hooks/useBookActions.ts
import { useState, useCallback } from "react";
import { GetContentById } from "@/api/api";
import { showNotification } from "@mantine/notifications";
import { Book } from "@/components/BookCard";

interface Page {
  id: number;
  imageUrl: string;
  text: string;
}

export const useBookActions = (
  profileId: string | null,
  setSearchParams: (params: any, opts?: any) => void,
  urlState: any
) => {
  const [bookPages, setBookPages] = useState<Page[]>([]);
  const [readingLoading, setReadingLoading] = useState(false);

  const [videoSrc, setVideoSrc] = useState<string>("");
  const [videoPoster, setVideoPoster] = useState<string>("");

  const [overviewChecking, setOverviewChecking] = useState(false);

  /** fetch + normalize pages for a given book id */
  const fetchBookPages = useCallback(
    async (id: number) => {
      setReadingLoading(true);
      try {
        const res = await GetContentById(String(id), profileId ?? "");
        if (!res.data.status) {
          showNotification({ message: res.data.message, title: "Notification" });
          return;
        }
        const data = res?.data?.data ?? res?.data;
        const rawPages: any[] = data.pages || [];
        const pages: Page[] = rawPages.map((p) => {
          const html = p.web_body || p.body || "";
          const match = html.match(/<img[^>]+src="([^">]+)"/i);
          const imgSrc = p.image || (match && match[1]) || "";
          const text = html.replace(/<img[^>]*>/gi, "").trim();
          return { id: p.page_number, imageUrl: imgSrc, text };
        });
        setBookPages(pages);
      } catch (err) {
        console.error("failed to load pages", err);
        setBookPages([]);
      } finally {
        setReadingLoading(false);
      }
    },
    [profileId]
  );

  const startRead = async (id: number) => {
    setSearchParams({ tab: String(urlState.tab), book: String(id), read: profileId ?? "" });
    await fetchBookPages(id);
  };

  const closeRead = () => {
    setBookPages([]);
    setSearchParams({ tab: String(urlState.tab), book: String(urlState.book!) });
  };

  const startWatch = async (id: number) => {
    setVideoSrc("");
    setVideoPoster("");
    setSearchParams({ tab: String(urlState.tab), book: String(id), watch: profileId ?? "" });

    try {
      const res = await GetContentById(String(id), profileId ?? "");
      if (!res.data.status) {
        showNotification({ message: res.data.message, title: "Notification" });
        return;
      }
      const data = res?.data?.data ?? res?.data;
      const mediaItem = data.media?.[0] || {};
      setVideoSrc(mediaItem.file || "");
      setVideoPoster(mediaItem.thumbnail || "");
    } catch (err) {
      console.error("failed to load video data", err);
      setVideoSrc("");
      setVideoPoster("");
    }
  };

  const closeWatch = () => {
    setVideoSrc("");
    setVideoPoster("");
    setSearchParams({ tab: String(urlState.tab), book: String(urlState.book!) });
  };

  const closeBook = () => setSearchParams({ tab: String(urlState.tab) });

  return {
    // states
    bookPages,
    setBookPages,        // ✅ export setter
    readingLoading,
    setReadingLoading,   // ✅ export setter
    videoSrc,
    setVideoSrc,         // ✅ export setter
    videoPoster,
    setVideoPoster,      // ✅ export setter
    overviewChecking,
    setOverviewChecking, // ✅ export setter

    // actions
    startRead,
    closeRead,
    startWatch,
    closeWatch,
    closeBook,
    fetchBookPages,
  };
};
