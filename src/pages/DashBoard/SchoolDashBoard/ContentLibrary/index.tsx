import React, { useEffect, useMemo, useState } from "react";
import TeacherIllustration from "@/assets/Teacher's_Library_.png";
import {
  FaUser,
  FaBookOpen,
  FaGlobe,
  FaKeyboard,
  FaChevronRight,
} from "react-icons/fa";
import { motion, LayoutGroup } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import BookCategory from "@/components/BookCategory";
import BookOverview from "@/components/BookOverview";
import ReadingComponent from "@/components/ReadingComponent";
import VideoComponent from "@/components/VideoComponent";
import WellDoneModal from "@/components/WellDoneModal";
import QuizComponent, {
  QuizStats,
  UserAnswer,
} from "@/components/QuizComponent";
import QuizResultModal from "@/components/QuizResultModal";
import AnswerReviewModal from "@/components/AnswerReviewModal";

import QueenMoremi from "@/audiobooks/QueenMoremi.mp3";
import NigeriaFlag from "@/assets/nigeria-flag.png";
import {
  ContentForHome,
  GetSubCategories,
  GetContebtBySubCategories,
  GetRecommendedVideo,
  GetAudioBooks,
} from "@/api/api";

import {
  KojoAndLolaImage,
  KojoAndLolaImage1,
  KojoAndLolaImage2,
  KojoAndLolaImage3,
  KojoAndLolaImage4,
  KojoAndLolaImage5,
} from "@/assets";

import { Book } from "@/components/BookCard";

/* ──────────────────── helper types ─────────────────── */

interface Category {
  name: string;
  books: Book[];
  hasSub?: boolean;
  subId?: number | null;
}

interface Page {
  id: number;
  imageUrl: string;
  text: string;
}

interface Tab {
  label: string;
  icon: JSX.Element;
  id: number | null;
}

/* ──────────────────── constants ─────────────────────── */

const defaultTabs: Omit<Tab, "id">[] = [
  { label: "For you", icon: <FaUser /> },
  { label: "Stories", icon: <FaBookOpen /> },
  { label: "Languages", icon: <FaGlobe /> },
  { label: "Literacy", icon: <FaKeyboard /> },
];

/* snake_case → Title Case */
const toTitle = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* transform ContentForHome → Category[] */
const homeToCategories = (payload: Record<string, any>): Category[] => {
  if (!payload || typeof payload !== "object") return [];

  const catArray: Category[] = [
    { name: "Continue Reading", books: [], hasSub: false },
  ];

  Object.entries(payload).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      catArray.push({
        name: toTitle(key),
        books: val.map((item) => ({
          id: item.id,
          title: item.name,
          coverUrl: item.thumbnail,
          progress: 0,
        })),
        hasSub: false,
      });
    }
  });

  return catArray;
};

/* ─────────────────── component ──────────────────────── */

const ContentLibrary: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /* tabs */
  const [tabsConfig, setTabsConfig] = useState<Tab[]>(
    defaultTabs.map((t) => ({ ...t, id: null }))
  );

  /* categories state */
  const [allCats, setAllCats] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[] | null>(null);

  /* mount — get IDs */
  useEffect(() => {
    GetSubCategories().then((res) => {
      if (res.data?.status && Array.isArray(res.data.data)) {
        const cats = res.data.data;
        setAllCats(cats);
        setTabsConfig(
          defaultTabs.map((tab) => ({
            ...tab,
            id: cats.find((c) => c.name === tab.label)?.id ?? null,
          }))
        );
      }
    });
  }, []);

  /* url helpers */
  const urlState = useMemo(() => {
    const tab = Number(searchParams.get("tab") || 0);
    const book = Number(searchParams.get("book") || NaN);
    const read = searchParams.get("read") === "1";
    const watch = searchParams.get("watch") === "1";
    return { tab, book: isNaN(book) ? null : book, read, watch };
  }, [searchParams]);

  const setTab = (idx: number) => setSearchParams({ tab: String(idx) });

  /* banner + tabs layout */
  return (
    <>
      {/* ───── Banner ───── */}
      <section className="mb-6 flex items-center gap-4">
        <img
          src={TeacherIllustration}
          alt="Teacher Illustration"
          className="w-20 h-20"
        />
        <div>
          <h1 className="text-2xl font-semibold">Content Library</h1>
          <p className="text-sm text-gray-600">
            Curated selections just for you
          </p>
        </div>
      </section>

      {/* ───── Tabs ───── */}
      <LayoutGroup id="tabs">
        <div className="mb-6 flex gap-3 overflow-x-auto">
          {tabsConfig.map((tab, idx) => (
            <motion.button
              key={tab.label}
              layout
              onClick={() => setTab(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: idx === urlState.tab ? "#BCD678" : "#FFF",
              }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium whitespace-nowrap"
            >
              {idx === urlState.tab && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-0 rounded-lg bg-[#BCD678] z-[-1]"
                />
              )}
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>
      </LayoutGroup>

      {/* TODO: categories / book grid goes here */}
      {categories === null && (
        <p className="text-center text-gray-500">Loading …</p>
      )}
    </>
  );
};

export default ContentLibrary;