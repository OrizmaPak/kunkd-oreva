import React from "react";
import WellDoneModal from "@/components/WellDoneModal";
import QuizComponent from "@/components/QuizComponent";
import QuizResultModal from "@/components/QuizResultModal";
import type { ModalsController } from "./hooks/useContentLibraryController";

interface Props {
  controller: ModalsController;
}

const ContentLibraryModals: React.FC<Props> = ({ controller }) => {
  const {
    showWell,
    showQuiz,
    showResult,
    quizTarget,
    quizStats,
    quizReset,
    completionMode,
    onTakeQuiz,
    onLater,
    onRetake,
    onViewAnswers,
    onCloseResult,
    onQuizComplete,
    onAnswersChange,
    onReplayListen,
    onListenGoBack,
  } = controller;

  return (
    <>
      {showWell && quizTarget && (
        <WellDoneModal
          message="You've just finished!"
          variant={completionMode}
          onTakeQuiz={completionMode === "listen" ? undefined : onTakeQuiz}
          onLater={completionMode === "listen" ? onListenGoBack : onLater}
          onRetake={completionMode === "listen" ? undefined : onRetake}
          onReplay={completionMode === "listen" ? onReplayListen : undefined}
          onGoBack={completionMode === "listen" ? onListenGoBack : undefined}
        />
      )}

      {quizTarget && showQuiz && (
        <QuizComponent
          key={quizTarget.id}
          book={quizTarget}
          onRetake={onRetake}
          onComplete={onQuizComplete}
          resetSignal={quizReset}
          onAnswersChange={onAnswersChange}
        />
      )}

      {showResult && quizStats && (
        <QuizResultModal
          stats={{
            correct: quizStats.correct,
            incorrect: quizStats.total - quizStats.correct,
            skipped: quizStats.skipped,
            total: quizStats.total,
          }}
          onClose={onCloseResult}
          onRetake={onRetake}
          onViewAnswers={onViewAnswers}
        />
      )}
    </>
  );
};

export default ContentLibraryModals;
