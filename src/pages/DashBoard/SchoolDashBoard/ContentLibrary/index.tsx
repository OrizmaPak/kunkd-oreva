import React, { useMemo } from "react";
import { LayoutGroup } from "framer-motion";

// Components you already have
import BookCategory from "@/components/BookCategory";
import BookOverview from "@/components/BookOverview";
import ReadingComponent from "@/components/ReadingComponent";
import VideoComponent from "@/components/VideoComponent";
import type { Book } from "@/components/BookCard";
import type { Category, Tab } from "./types";

// Our data hook (new)
import { useContentLibraryData } from "./useContentLibraryData";
// Helpers for “next two” prefetch (small, local)
const nextTwo = (arr: number[], i: number) => arr.slice(i + 1, i + 3);

// Icons (use your originals)
import foryou from "@/assets/foryou.png";
import story from "@/assets/story.png";
import languages from "@/assets/languagev.png";
import literacy from "@/assets/literacy.png";

const ContentLibrary: React.FC = () => {
  const {
    // url/tabs
    urlState,
    tabsConfig,
    setTabsConfig,
    setTab,

    // datasets
    allCats,
    forYouRows,
    ongoingBooks,

    // selection
    selectedBook,
    openBook,
    closeBook,

    // reading
    readingRef,
    bookPages,
    readingLoading,
    startRead,
    closeRead,

    // video
    videoSrc,
    videoPoster,
    startWatch,
    closeWatch,

    // ui state
    crumb,
    setCrumb,
    storiesExpanded,
    toggleStories,
    languagesExpanded,
    toggleLanguages,
    expandedSimple,
    toggleRowExpand,
  } = useContentLibraryData();

  // Ensure tab icons match your design (we keep ids from hook)
  const tabsWithIcons: Tab[] = useMemo(
    () =>
      (tabsConfig || []).map((t) => {
        if (t.label === "For you") return { ...t, icon: foryou };
        if (t.label === "Stories") return { ...t, icon: story };
        if (t.label === "Languages") return { ...t, icon: languages };
        if (t.label === "Literacy") return { ...t, icon: literacy };
        return t;
      }),
    [tabsConfig]
  );

  // We keep your original Stories/Languages structure
  const storiesCat = useMemo(
    () => allCats.find((c: any) => c?.name === "Stories"),
    [allCats]
  );
  const languagesCat = useMemo(
    () => allCats.find((c: any) => c?.name === "Languages"),
    [allCats]
  );

  // ───────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────
  return (
    <LayoutGroup>
      <div className="mx-auto w-[clamp(320px,100%,1280px)] py-6 px-4 space-y-8">

        {/** ── TABS BAR (KEEP YOUR ORIGINAL MARKUP IF YOU HAVE CUSTOM STYLES) ── */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-4">
            {tabsWithIcons.map((t, i) => (
              <button
                key={`${t.label}-${i}`}
                onClick={() => setTab(i)}
                className={[
                  "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap",
                  i === urlState.tab
                    ? "bg-[#9FC43E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                ].join(" ")}
                aria-pressed={i === urlState.tab}
              >
                {!!t.icon && (
                  <img
                    src={t.icon}
                    alt=""
                    className="w-6 h-6 object-contain pointer-events-none"
                  />
                )}
                <span className="font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/** ── END TABS BAR ── */}

        {/* TAB 0: For you */}
        {urlState.tab === 0 && (
          <div className="space-y-8">
            {/* Continue Reading */}
            {ongoingBooks.length > 0 && (
              <BookCategory
                tabLabel="For you"
                categoryName="Continue Reading"
                books={ongoingBooks}
                hasSub={false}
                expanded={false}
                onBookClick={(book: Book) => {
                  setCrumb(["For you", "Continue Reading"]);
                  openBook(Number(book.id));
                }}
                emptyMsg="No content available"
              />
            )}

            {/* Other For-you rows */}
            {forYouRows.map((cat: Category, idx: number) => {
              const rowKey = `foryou-${cat.name}-${idx}`;
              const expanded = !!expandedSimple[rowKey];
              return (
                <BookCategory
                  key={rowKey}
                  tabLabel="For you"
                  categoryName={cat.name}
                  books={cat.books}
                  hasSub={false}
                  expanded={expanded}
                  onSeeAll={() => toggleRowExpand(rowKey)}
                  onBookClick={(book: Book) => {
                    setCrumb(["For you", cat.name]);
                    openBook(Number(book.id));
                  }}
                  emptyMsg="No content available"
                />
              );
            })}
          </div>
        )}

        {/* TAB 1: Stories */}
        {urlState.tab === 1 && storiesCat && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Stories</h3>
              <button
                onClick={toggleStories}
                className="text-[#9FC43E] font-medium hover:underline"
              >
                {storiesExpanded ? "Show less" : "See all"}
              </button>
            </div>
            {(storiesCat?.sub_categories ?? []).map((sub: any, idx: number) => {
              const ids = (storiesCat?.sub_categories ?? []).map((x: any) => x.id);
              return (
                <BookCategory
                  key={sub.id}
                  tabLabel="Stories"
                  categoryName={sub.name}
                  subId={sub.id}
                  hasSub
                  expanded={storiesExpanded}
                  prefetchNext={nextTwo(ids, idx)}
                  onBookClick={(book: Book) => {
                    setCrumb(["Stories", sub.name]);
                    openBook(Number(book.id));
                  }}
                />
              );
            })}
          </div>
        )}

        {/* TAB 2: Languages */}
        {urlState.tab === 2 && languagesCat && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Languages</h3>
              <button
                onClick={toggleLanguages}
                className="text-[#9FC43E] font-medium hover:underline"
              >
                {languagesExpanded ? "Show less" : "See all"}
              </button>
            </div>
            {(languagesCat?.sub_categories ?? []).map((sub: any, idx: number) => {
              const ids = (languagesCat?.sub_categories ?? []).map((x: any) => x.id);
              return (
                <BookCategory
                  key={sub.id}
                  tabLabel="Languages"
                  categoryName={sub.name}
                  subId={sub.id}
                  hasSub
                  expanded={languagesExpanded}
                  prefetchNext={nextTwo(ids, idx)}
                  onBookClick={(book: Book) => {
                    setCrumb(["Languages", sub.name]);
                    openBook(Number(book.id));
                  }}
                />
              );
            })}
          </div>
        )}

        {/* TAB 3: Literacy (placeholder) */}
        {urlState.tab === 3 && (
          <div className="text-gray-500">Literacy content coming soon.</div>
        )}

        {/* OVERVIEW (only when a book is selected and not reading or watching) */}
        {urlState.book && !urlState.read && !urlState.watch && selectedBook && (
          <div className="mt-2">
            <BookOverview
              book={selectedBook as Book}
              onBack={closeBook}
              onRead={(b) => startRead(Number(b.id))}
              onWatch={(b) => startWatch(Number(b.id))}
            />
          </div>
        )}

        {/* READING */}
        {urlState.read && (
          <div className="mt-2">
            <ReadingComponent
              ref={readingRef}
              title={String(selectedBook?.title || "")}
              pages={bookPages}
              loading={readingLoading}
              onClose={closeRead}
            />
          </div>
        )}

        {/* VIDEO */}
        {urlState.watch && selectedBook && (
          <div className="mt-2">
            <VideoComponent
              title={String(selectedBook?.title || "")}
              flagUrl={""}
              videoSrc={videoSrc}
              poster={videoPoster}
              onClose={closeWatch}
              onComplete={() => {}}
              onRetake={() => startWatch(Number(selectedBook.id))}
              book={selectedBook}
            />
          </div>
        )}
      </div>
    </LayoutGroup>
  );
};

export default ContentLibrary;
