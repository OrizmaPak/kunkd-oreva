// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/hooks/useBookActions.ts
import { useState, useCallback } from "react";
import { GetContentById } from "@/api/api";
import { showNotification } from "@mantine/notifications";
import { Book } from "@/components/BookCard";
import { deriveMediaAttributes } from "@/utils/media";
import type { Page } from "../types/contentLibrary";

interface UrlState {
  tab: number;
  book: number | null;
  read: boolean;
  watch: boolean;
  listen: boolean;
}

interface HydratedMetaPayload {
  id: number;
  hasAudio: boolean;
  hasText: boolean;
  audioSources: string[];
}

type SearchParamsSetter = (next: Record<string, string>, options?: { replace?: boolean }) => void;

type ApplyParamsConfig = {
  book?: number | null;
  read?: boolean;
  watch?: boolean;
  listen?: boolean;
  tab?: number;
};

const buildPages = (rawPages: any[]): Page[] => {
  if (!Array.isArray(rawPages)) return [];
  return rawPages
    .map((page: any) => {
      const html = String(page?.web_body ?? page?.body ?? "");
      const match = html.match(/<img[^>]+src="([^">]+)"/i);
      const imageUrl = String(page?.image ?? match?.[1] ?? "");
      const stripped = html.replace(/<img[^>]*>/gi, "").trim();

      return {
        id: Number(page?.page_number ?? page?.id ?? 0) || 0,
        imageUrl,
        text: stripped,
      };
    })
    .sort((a, b) => a.id - b.id);
};

const normaliseId = (value: number | string | null | undefined): number | null => {
  if (value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const ensureParams = (
  setter: SearchParamsSetter,
  profileId: string | null,
  urlState: UrlState,
) =>
  (config: ApplyParamsConfig, options?: { replace?: boolean }) => {
    const params: Record<string, string> = {
      tab: String(config.tab ?? urlState.tab ?? 0),
    };

    const bookId = normaliseId(config.book);
    if (bookId != null) {
      params.book = String(bookId);
    }

    if (config.read) {
      params.read = profileId ?? "";
    }

    if (config.watch) {
      params.watch = profileId ?? "";
    }

    if (config.listen) {
      params.listen = profileId ?? "";
    }

    setter(params, { replace: true, ...(options ?? {}) });
  };

export const useBookActions = (
  profileId: string | null,
  setSearchParams: SearchParamsSetter,
  urlState: UrlState,
  onHydrateBook?: (meta: HydratedMetaPayload) => void,
) => {
  const [bookPages, setBookPages] = useState<Page[]>([]);
  const [readingLoading, setReadingLoading] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [videoPoster, setVideoPoster] = useState<string>("");
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [listeningHasText, setListeningHasText] = useState(false);

  const applyParams = useCallback(
    ensureParams(setSearchParams, profileId, urlState),
    [setSearchParams, profileId, urlState],
  );

  const pushHydratedMeta = useCallback(
    (id: number, hasAudio: boolean, hasText: boolean, audioSources: string[]) => {
      if (!onHydrateBook) return;
      onHydrateBook({ id, hasAudio, hasText, audioSources });
    },
    [onHydrateBook],
  );

  const fetchBookPages = useCallback(
    async (id: number) => {
      setReadingLoading(true);
      try {
        const res = await GetContentById(String(id), profileId || "0");
        if (!res?.data?.status) {
          showNotification({
            message: res?.data?.message ?? "Unable to load book",
            title: "Notification",
          });
          return null;
        }

        const data = res?.data?.data ?? res?.data;
        const pages = buildPages(data?.pages ?? []);
        setBookPages(pages);

        const mediaAttributes = deriveMediaAttributes(data);
        pushHydratedMeta(
          id,
          mediaAttributes.hasAudio,
          mediaAttributes.hasText || pages.some((page) => page.text.length > 0),
          mediaAttributes.audioSources,
        );

        return mediaAttributes;
      } catch (error) {
        console.error("[ContentLibrary] failed to load book pages", error);
        setBookPages([]);
        return null;
      } finally {
        setReadingLoading(false);
      }
    },
    [profileId, pushHydratedMeta],
  );

  const startRead = useCallback(
    async (id: number) => {
      applyParams({ book: id, read: true });
      await fetchBookPages(id);
    },
    [applyParams, fetchBookPages],
  );

  const closeRead = useCallback(() => {
    setBookPages([]);
    applyParams({ book: urlState.book });
  }, [applyParams, urlState.book]);

  const startWatch = useCallback(
    async (id: number) => {
      setVideoSrc("");
      setVideoPoster("");
      applyParams({ book: id, watch: true });

      try {
        const res = await GetContentById(String(id), profileId || "0");
        if (!res?.data?.status) {
          showNotification({
            message: res?.data?.message ?? "Unable to load video",
            title: "Notification",
          });
          return;
        }

        const data = res?.data?.data ?? res?.data;
        const mediaItem = Array.isArray(data?.media)
          ? data.media.find((m: any) =>
              String(m?.type ?? m?.media_type ?? "").toLowerCase().includes("video"),
            ) || data.media[0]
          : undefined;

        setVideoSrc(String(mediaItem?.file ?? ""));
        setVideoPoster(String(mediaItem?.thumbnail ?? ""));
      } catch (error) {
        console.error("[ContentLibrary] failed to load video", error);
        setVideoSrc("");
        setVideoPoster("");
      }
    },
    [applyParams, profileId],
  );

  const closeWatch = useCallback(() => {
    setVideoSrc("");
    setVideoPoster("");
    applyParams({ book: urlState.book });
  }, [applyParams, urlState.book]);

  const startListen = useCallback(
    async (id: number, fallbackBook?: Book | null) => {
      setAudioSrc("");
      setListeningHasText(false);
      applyParams({ book: id, listen: true });

      try {
        const res = await GetContentById(String(id), profileId || "0");
        if (!res?.data?.status) {
          showNotification({
            message: res?.data?.message ?? "Failed to load audio",
            title: "Notification",
          });
          return;
        }

        const data = res?.data?.data ?? res?.data;
        const mediaAttributes = deriveMediaAttributes(data);

        const audioItem = Array.isArray(data?.media)
          ? data.media.find((m: any) =>
              String(m?.type ?? m?.media_type ?? "").toLowerCase().includes("audio"),
            ) || data.media.find((m: any) => String(m?.file ?? "").toLowerCase().endsWith(".mp3"))
          : undefined;

        const resolvedAudio = String(audioItem?.file ?? mediaAttributes.audioSources[0] ?? "");
        setAudioSrc(resolvedAudio);
        setListeningHasText(mediaAttributes.hasText || Boolean(fallbackBook?.hasText));

        pushHydratedMeta(
          id,
          mediaAttributes.hasAudio || resolvedAudio.length > 0,
          mediaAttributes.hasText || Boolean(fallbackBook?.hasText),
          mediaAttributes.audioSources.length > 0
            ? mediaAttributes.audioSources
            : resolvedAudio
              ? [resolvedAudio]
              : [],
        );
      } catch (error) {
        console.error("[ContentLibrary] failed to load audio", error);
        setAudioSrc("");
        setListeningHasText(false);
      }
    },
    [applyParams, profileId, pushHydratedMeta],
  );

  const closeListen = useCallback(() => {
    setAudioSrc("");
    setListeningHasText(false);
    applyParams({ book: urlState.book });
  }, [applyParams, urlState.book]);

  const closeBook = useCallback(() => {
    setBookPages([]);
    setVideoSrc("");
    setVideoPoster("");
    setAudioSrc("");
    setListeningHasText(false);
    applyParams({ tab: urlState.tab });
  }, [applyParams, urlState.tab]);

  return {
    bookPages,
    readingLoading,
    videoSrc,
    videoPoster,
    audioSrc,
    listeningHasText,
    startRead,
    closeRead,
    startWatch,
    closeWatch,
    startListen,
    closeListen,
    closeBook,
    fetchBookPages,
  };
};
