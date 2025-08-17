// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/ContentLibraryModals.tsx

import React from "react";
import WellDoneModal from "@/components/WellDoneModal";
import QuizComponent, { QuizStats, UserAnswer } from "@/components/QuizComponent";
import QuizResultModal from "@/components/QuizResultModal";
import { Book } from "@/components/BookCard";

interface Props {
  // ---- Quiz/Modal state ----
  showWell: boolean;
  showQuiz: boolean;
  showResult: boolean;
  quizTarget: Book | null;
  quizStats: QuizStats | null;
  quizReset: number;

  // ---- Quiz answers ----
  setQuizAnswers: (ans: UserAnswer[]) => void;

  // ---- Handlers ----
  onTakeQuiz: () => void;
  onLater: () => void;
  onRetake: () => void;
  onViewAnswers: () => void;
  onCloseResult: () => void;
}

const ContentLibraryModals: React.FC<Props> = ({
  showWell,
  showQuiz,
  showResult,
  quizTarget,
  quizStats,
  quizReset,
  setQuizAnswers,
  onTakeQuiz,
  onLater,
  onRetake,
  onViewAnswers,
  onCloseResult,
}) => {
  return (
    <>
      {/* 1) Well Done Modal — appears when media is completed */}
      {showWell && quizTarget && (
        <WellDoneModal
          message="You've just finished!"
          onTakeQuiz={onTakeQuiz}
          onLater={onLater}
          onRetake={onRetake}
        />
      )}

      {/* 2) Quiz Component — appears when user chooses to take quiz */}
      {quizTarget && showQuiz && (
        <QuizComponent
          onRetake={onRetake}
          key={quizTarget.id}
          book={quizTarget}
          onComplete={(stats, answers) => {
            setQuizAnswers(answers);
            console.log("Quiz complete in modals:", stats, answers);
          }}
          resetSignal={quizReset}
          onAnswersChange={(ans) => {
            console.log("sync parent answers:", ans);
            setQuizAnswers(ans);
          }}
        />
      )}

      {/* 3) Quiz Result Modal — shows stats after quiz is completed */}
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
