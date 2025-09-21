import React from "react";
import AnswerReviewModal from "@/components/AnswerReviewModal";
import ReadingComponent from "@/components/ReadingComponent";
import VideoComponent from "@/components/VideoComponent";
import BookOverview from "@/components/BookOverview";
import AudioComponent from "@/components/AudioComponent";
import BookCategory from "@/components/BookCategory";
import EmptyFavourites from "./components/EmptyFavourites";
import CategorySections from "./CategorySections";
import type { BodyController } from "./hooks/useContentLibraryController";

interface Props {
  controller: BodyController;
}

const ContentLibraryBody: React.FC<Props> = ({ controller }) => {
  const {
    favMode,
    favourites,
    categories,
    media,
    quiz,
    showFavEmpty,
    showForYouSkeleton,
  } = controller;

  if (quiz.showAnswerReview) {
    return (
      <AnswerReviewModal
        answers={quiz.quizAnswers ?? []}
        onDone={quiz.handleReviewDone}
      />
    );
  }

  if (media.readingBook) {
    if (media.readingLoading) {
      return (
        <div className="flex justify-center py-20 text-sm text-gray-500" role="status">
          Loading book...
        </div>
      );
    }

    return (
      <ReadingComponent
        ref={media.readingRef as any}
        book={media.readingBook}
        pages={media.bookPages}
        withIntroPages={false}
        onExit={media.closeRead}
        onRetake={quiz.handleRetake}
        onViewAnswers={quiz.handleViewAnswers}
        onAnswersUpdate={(answers) => quiz.setAnswers(Array.isArray(answers) ? answers : [])}
      />
    );
  }

  if (media.watchingBook) {
    return (
      <VideoComponent
        key={media.videoSrc || media.watchingBook.id}
        book={media.watchingBook}
        videoSrc={media.videoSrc}
        poster={media.videoPoster}
        title={media.watchingBook.title}
        onRetake={quiz.handleRetake}
        onClose={media.closeWatch}
        onViewAnswers={quiz.handleViewAnswers}
        onComplete={() => quiz.handleMediaComplete(media.watchingBook, "watch")}
      />
    );
  }

  if (media.listeningBook) {
    return (
      <AudioComponent
        book={media.listeningBook}
        audioSrc={media.audioSrc}
        onClose={media.closeListen}
        showReadButton={media.listeningHasText}
        onRead={() => {
          media.closeListen();
          media.startRead(Number(media.listeningBook?.id));
        }}
        onComplete={() => quiz.handleMediaComplete(media.listeningBook, "listen")}
      />
    );
  }

  if (media.selectedBook) {
    return (
      <BookOverview
        book={media.selectedBook}
        crumb={media.crumbsBeforeBook}
        onBack={media.closeBook}
        onRead={(book) => media.startRead(Number(book.id))}
        onWatch={(book) => media.startWatch(Number(book.id))}
        onListen={() => media.startListen(Number(media.selectedBook?.id), media.selectedBook)}
        audioSrc={media.audioSrc}
      />
    );
  }

  if (favMode) {
    if (favourites.loading) {
      return (
        <div className="flex justify-center py-20 text-sm text-gray-500" role="status">
          Loading favourites...
        </div>
      );
    }

    if (showFavEmpty) {
      return (
        <div className="mt-6">
          <EmptyFavourites label={favourites.activeLabel} />
        </div>
      );
    }

    return (
      <div className="mt-6 space-y-8">
        <BookCategory
          key={`fav-${favourites.activeLabel}`}
          tabLabel={favourites.activeLabel}
          categoryName={favourites.activeLabel}
          books={favourites.selected}
          hasSub={false}
          expanded
          onBookClick={(book, crumbTrail) => {
            categories.openBook(Number(book.id));
            categories.setCrumb([...crumbTrail, book.title]);
          }}
        />
      </div>
    );
  }

  const renderForYouSkeleton = categories.isForYou && showForYouSkeleton;

  return (
    <div className="mt-6 space-y-8">
      {renderForYouSkeleton
        ? Array.from({ length: 3 }).map((_, index) => (
            <BookCategory
              key={`for-you-skeleton-${index}`}
              tabLabel="For you"
              categoryName=""
              loading
              hasSub={false}
            />
          ))
        : <CategorySections categories={categories} />}
    </div>
  );
};

export default ContentLibraryBody;



