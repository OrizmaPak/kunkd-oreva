// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/hooks/useQuizFlow.ts
import { useState, useRef } from "react";
import { Book } from "@/components/BookCard";
import { QuizStats, UserAnswer } from "@/components/QuizComponent";
import { ReadingHandle } from "@/components/ReadingComponent";

export const useQuizFlow = (closeRead: () => void) => {
  const readingRef = useRef<ReadingHandle>(null);

  const [quizTarget, setQuizTarget] = useState<Book | null>(null);
  const [showWell, setShowWell] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<UserAnswer[] | null>(null);
  const [quizReset, setQuizReset] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState(false);

  // --- Handlers ---
  const handleMediaComplete = (book: Book) => {
    setQuizTarget(book);
    setShowWell(true);
    setShowQuiz(false);
  };

  const handleTakeQuiz = () => {
    setShowWell(false);
    setShowQuiz(true);
  };

  const handleDoLater = () => {
    setShowWell(false);
    setShowQuiz(false);
  };

  const handleQuizComplete = (stats: QuizStats, answers: UserAnswer[]) => {
    setQuizStats(stats);
    setQuizAnswers(answers);
    setShowResult(true);
  };

  const handleViewAnswers = () => {
    setShowResult(false);
    setShowAnswerReview(true);
  };

  const startQuizFlow = () => {
    setShowResult(false);
    setShowWell(true);
    if (quizTarget) handleMediaComplete(quizTarget);
  };

  const handleRetake = () => {
    setShowQuiz(true);
    readingRef.current?.showQuiz();
    setQuizReset((s) => s + 1);
  };

  const handleReviewDone = () => {
    setShowAnswerReview(false);
    closeRead();
  };

  return {
    // --- state
    quizTarget,
    showWell,
    showQuiz,
    quizKey,
    quizStats,
    quizAnswers,
    quizReset,
    showResult, 
    showAnswerReview,
    readingRef,

    // --- setters (explicitly exported ✅)
    setQuizTarget,
    setShowWell,
    setShowQuiz,
    setQuizKey,
    setQuizStats,
    setQuizAnswers,
    setQuizReset,
    setShowResult,
    setShowAnswerReview,

    // --- handlers
    handleMediaComplete,
    handleTakeQuiz,
    handleDoLater,
    handleQuizComplete,
    handleViewAnswers,
    startQuizFlow,
    handleRetake,
    handleReviewDone,
  };
};
