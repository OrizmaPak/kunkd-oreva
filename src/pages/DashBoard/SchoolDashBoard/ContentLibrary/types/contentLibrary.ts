import { Book } from "@/components/BookCard";

/* Category type used across the library */
export interface Category {
  name: string;
  books: Book[];
  hasSub?: boolean;      // whether it has sub-categories
  subId?: number | null; // lazy subcategory rows
}

/* A single page inside a book */
export interface Page {
  id: number;
  imageUrl: string;
  text: string;
}

/* Tabs at the top of the content library */
export interface Tab {
  label: string;
  icon: string;  // path to the icon (imported asset)
  id: number | null;
}
