// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/types.ts
import type { Book } from "@/components/BookCard";

/** Minimal category shape used inside ContentLibrary */
export interface Category {
  name: string;
  books: Book[];
  hasSub?: boolean;
  subId?: number | null;
}

/** Page model for ReadingComponent */
export interface Page {
  id: number;
  imageUrl: string;
  text: string;
}

/** Tab metadata (label/icon + resolved backend id if any) */
export interface Tab {
  label: string;
  icon: string;
  id: number | null;
}
