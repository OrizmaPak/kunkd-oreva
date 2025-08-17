// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/ContentLibraryBody.tsx

import React, { RefObject } from "react";
import AnswerReviewModal from "@/components/AnswerReviewModal";
import ReadingComponent, { ReadingHandle } from "@/components/ReadingComponent";
import VideoComponent from "@/components/VideoComponent";
import BookOverview from "@/components/BookOverview";
import { Book } from "@/components/BookCard";
import CategorySections from "./CategorySections";

interface Category {
  name: string;
  books: Book[];
  subId?: number | null;
}

interface Props {
  // ---- Review state ----
  showAnswerReview: boolean;
  quizAnswers: any[];
  onReviewDone: () => void;

  // ---- Reading state ----
  readingBook: Book | null;
  readingRef: RefObject<ReadingHandle>;
  readingLoading: boolean;
  bookPages: any[];
  onCloseRead: () => void;
  onRetake: () => void;
  onViewAnswers: () => void;
  onAnswersUpdate: (ans: any) => void;

  // ---- Watching state ----
  watchingBook: Book | null;
  videoSrc: string;
  videoPoster: string;
  onCloseWatch: () => void;
  onCompleteWatch: () => void;

  // ---- Overview state ----
  selectedBook: Book | null;
  overviewChecking: boolean;
  crumbsBeforeBook: string[];
  onBackFromOverview: () => void;
  onStartRead: (book: Book) => void;
  onStartWatch: (book: Book) => void;

  // ---- Categories (Stories / Langs / For You) ----
  isStoriesTab: boolean;
  isLangsTab: boolean;
  isForYouTab: boolean;
  displayList: Category[];
  allCats: any[];
  showAllStories: boolean;
  storiesActiveSubSlug: string | null;
  setShowAllStories: (v: boolean) => void;
  setStoriesActiveSubSlug: (s: string | null) => void;
  showAllLanguages: boolean;
  languagesActiveSubSlug: string | null;
  setShowAllLanguages: (v: boolean) => void;
  setLanguagesActiveSubSlug: (s: string | null) => void;
  expandedSimple: Record<string, boolean>;
  toggleForYouRow: (name: string) => void;
  openBook: (id: number) => void;
  setCrumb: (crumbs: string[]) => void;
}

const ContentLibraryBody: React.FC<Props> = ({
  // ---- Review state ----
  showAnswerReview,
  quizAnswers,
  onReviewDone,

  // ---- Reading state ----
  readingBook,
  readingRef,
  readingLoading,
  bookPages,
  onCloseRead,
  onRetake,
  onViewAnswers,
  onAnswersUpdate,

  // ---- Watching state ----
  watchingBook,
  videoSrc,
  videoPoster,
  onCloseWatch,
  onCompleteWatch,

  // ---- Overview state ----
  selectedBook,
  overviewChecking,
  crumbsBeforeBook,
  onBackFromOverview,
  onStartRead,
  onStartWatch,

  // ---- Categories (Stories / Langs / For You) ----
  isStoriesTab,
  isLangsTab,
  isForYouTab,
  displayList,
  allCats,
  showAllStories,
  storiesActiveSubSlug,
  setShowAllStories,
  setStoriesActiveSubSlug,
  showAllLanguages,
  languagesActiveSubSlug,
  setShowAllLanguages,
  setLanguagesActiveSubSlug,
  expandedSimple,
  toggleForYouRow,
  openBook,
  setCrumb,
}) => {
  /**
   * ---- PRIORITY 1: Show Answer Review ----
   * If user has finished quiz and is reviewing answers,
   * take over the entire body with AnswerReviewModal.
   */
  if (showAnswerReview) {
    return (
      <AnswerReviewModal
        answers={quizAnswers ?? []}
        onDone={onReviewDone}
      />
    );
  }

  /**
   * ---- PRIORITY 2: Reading Mode ----
   * If a book is being read, show ReadingComponent.
   * Otherwise, show a loading spinner until pages arrive.
   */
  if (readingBook) {
    return readingLoading ? (
      <div className="flex justify-center py-20">
        <span>Loading book…</span>
      </div>
    ) : (
      <ReadingComponent
        ref={readingRef}
        book={readingBook}
        onExit={onCloseRead}
        pages={bookPages}
        withIntroPages={false}
        onRetake={onRetake}
        onViewAnswers={onViewAnswers}
        onAnswersUpdate={onAnswersUpdate}
      />
    );
  }

  /**
   * ---- PRIORITY 3: Watching Mode ----
   * If a book is being watched, show the video player.
   */
  if (watchingBook) {
    return (
      <VideoComponent
        book={watchingBook}
        key={videoSrc || watchingBook.id}
        videoSrc={videoSrc}
        poster={videoPoster}
        title={watchingBook.title}
        onRetake={onRetake}
        onClose={onCloseWatch}
        onViewAnswers={onViewAnswers}
        onComplete={() => onCompleteWatch()}
      />
    );
  }

  /**
   * ---- PRIORITY 4: Overview Mode ----
   * If a book is selected (but not reading/watching),
   * show BookOverview with read/watch buttons.
   */
  if (selectedBook && !overviewChecking) {
    return (
      <BookOverview
        book={selectedBook}
        crumb={crumbsBeforeBook}
        onBack={onBackFromOverview}
        onRead={(b: any) => onStartRead(b)}
        onWatch={(b: any) => onStartWatch(b)}
        audioSrc="" // TODO: pass real audio if available
      />
    );
  }

  /**
   * ---- PRIORITY 5: Default Category Lists ----
   * If nothing else is active, fall back to category listings
   * depending on the active tab (Stories, Languages, For You).
   */
  return (
    <CategorySections
      isStoriesTab={isStoriesTab}
      isLangsTab={isLangsTab}
      isForYouTab={isForYouTab}
      displayList={displayList}
      allCats={allCats}
      showAllStories={showAllStories}
      storiesActiveSubSlug={storiesActiveSubSlug}
      setShowAllStories={setShowAllStories}
      setStoriesActiveSubSlug={setStoriesActiveSubSlug}
      showAllLanguages={showAllLanguages}
      languagesActiveSubSlug={languagesActiveSubSlug}
      setShowAllLanguages={setShowAllLanguages}
      setLanguagesActiveSubSlug={setLanguagesActiveSubSlug}
      expandedSimple={expandedSimple}
      toggleForYouRow={toggleForYouRow}
      openBook={openBook}
      setCrumb={setCrumb}
    />
  );
};

export default ContentLibraryBody;
