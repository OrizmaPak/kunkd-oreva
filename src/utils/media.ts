export interface MediaAttributes {
  hasAudio: boolean;
  hasText: boolean;
  audioSources: string[];
}

const extractFileUrl = (entry: any): string => {
  const candidates = [entry?.file, entry?.url, entry?.audio, entry?.path];
  const found = candidates.find((value) => typeof value === "string" && value.trim().length > 0);
  return found ? String(found) : "";
};

const isAudioEntry = (entry: any): boolean => {
  const type = String(entry?.type ?? entry?.media_type ?? entry?.format ?? "").toLowerCase();
  if (type.includes("audio")) return true;

  const file = extractFileUrl(entry).toLowerCase();
  return file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".m4a") || file.endsWith(".aac");
};

const hasTextFromItem = (item: any): boolean => {
  if (Array.isArray(item?.pages) && item.pages.length > 0) return true;
  const fromFlag = Boolean(item?.has_text || item?.has_pages);
  if (fromFlag) return true;
  const mediaType = String(item?.media_type ?? item?.content_type ?? "").toLowerCase();
  return mediaType.includes("text");
};

export const deriveMediaAttributes = (item: any): MediaAttributes => {
  const mediaList = Array.isArray(item?.media) ? item.media : [];
  const audioEntries = mediaList.filter(isAudioEntry);

  const mediaType = String(item?.media_type ?? item?.content_type ?? item?.type ?? "").toLowerCase();
  const hasAudio = audioEntries.length > 0 || mediaType.includes("audio") || Boolean(item?.has_audio);

  const audioSources = audioEntries
    .map((entry) => extractFileUrl(entry))
    .filter((url) => url.length > 0);

  return {
    hasAudio,
    hasText: hasTextFromItem(item),
    audioSources,
  };
};
