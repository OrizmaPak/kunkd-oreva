import React, { useState, useEffect } from "react";
import { GetQuiz, SaveQuiz, SaveSchoolQuiz } from "@/api/api";
import { Book } from "./BookCard";
import QuizResultModal from "@/components/QuizResultModal";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";

export interface QuizStats {
  correct: number;
  total: number;
  skipped: number;
}

export interface UserAnswer {
  questionId: number;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  selectedOptionValue: string; // ← new
  correctOptionValue: string;  // ← new
  isCorrect: boolean;
}

export interface QuizComponentProps {
  book: Book;
  onComplete: (stats: QuizStats, answers: UserAnswer[]) => void;
  resetSignal?: number; 
  onRetake: () => void;
  onAnswersChange?: (answers: UserAnswer[]) => void; // ← new
}

interface QuizQuestion {
  question_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: "a" | "b" | "c" | "d";
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  book,
  onComplete,
  resetSignal,
  onRetake,
  onAnswersChange,
}) => {
  const [user] = useStore(getUserState);

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [finished, setFinished] = useState(false);
  const [showMustAnswerWarning, setShowMustAnswerWarning] = useState(false);

  // NEW: result-first modal state
  const [showResult, setShowResult] = useState(false);
  const [quiz_id, setQuiz_id] = useState(0);
  const [resultStats, setResultStats] = useState<{
    correct: number;
    incorrect: number;
    skipped: number;
    total: number;
  } | null>(null);

  // 🔹 NEW: trigger re-fetch on retake
  const [reloadKey, setReloadKey] = useState(0);

  // 🔹 NEW: central reset used by Retake and external resetSignal
  const resetQuiz = () => {
    setShowResult(false);
    setResultStats(null);
    setFinished(false);
    setShowMustAnswerWarning(false);
    setStep(0);
    setAnswers([]);
    setLoading(true);       // show loading while we re-fetch
    setReloadKey((k) => k + 1); // bump to re-run fetch effect
  };

  /* respect external resetSignal as before */
  useEffect(() => {
    if (resetSignal === undefined) return;
    resetQuiz();
  }, [resetSignal]);

  // ⬇️ fetch questions; now runs on book change AND retake (reloadKey)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true); // 🔹 ensure loading shows on retake
        const res = await GetQuiz(String(book.id));
        setQuestions(res.data?.data?.questions ?? []);
        setQuiz_id(res.data?.data?.quiz_id ?? 0);
      } finally {
        setLoading(false);
      }
    })();
  }, [book.id, reloadKey]); // 🔹 include reloadKey

  // Notify parent component whenever answers change
  useEffect(() => {
    if (onAnswersChange) onAnswersChange(answers);
  }, [answers, onAnswersChange]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">Loading quiz…</div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">No quiz available.</div>
    );
  }

  const q = questions[step];
  const total = questions.length;
  const progressPct = ((step + 1) / total) * 100;
  const canFinish = answers.length > 0;

  const picked = answers.find(a => a.questionId === q.question_id)?.selectedOption;

  const select = (letter: "a" | "b" | "c" | "d") => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== q.question_id);
      const updated = [
        ...filtered,
        {
          questionId: q.question_id,
          questionText: q.question,
          selectedOption: letter,
          correctOption: q.answer,
          selectedOptionValue: (q as any)[`option_${letter}`],
          correctOptionValue: (q as any)[`option_${q.answer}`],
          isCorrect: letter === q.answer,
        },
      ];
      if (onAnswersChange) onAnswersChange(updated); // notify parent on every change
      return updated;
    });
  };

  // submit answers (fire-and-forget) based on role
  const submitAnswers = async () => {
    const payload: any = {
      quiz_id: Number(quiz_id),
      profile_id: Number(sessionStorage.getItem("profileId") || 0),
      questions: answers.map(a => ({
        question_id: a.questionId,
        question: a.questionText,
        actual_answer: a.correctOptionValue,
        selected_option: a.selectedOption,
        selected_option_value: a.selectedOptionValue,
      })),
    };

    if (user?.role === "user") {
      const profileId = Number(sessionStorage.getItem("profileId") || 0);
      payload.profile_id = profileId;
      try { await SaveQuiz(payload); } catch { /* silent */ }
    } else {
      try { await SaveSchoolQuiz(payload); } catch { /* silent */ }
    }
  };

  const finishFlow = () => {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const skippedCount = total - answers.length;
    const incorrectCount = Math.max(answers.length - correctCount, 0);

    // 1) show result modal FIRST
    setResultStats({
      correct: correctCount,
      incorrect: incorrectCount,
      skipped: skippedCount,
      total,
    });
    setShowResult(true);

    // 2) mark finished to disable controls
    setFinished(true);

    // 3) submit in the background (role-based)
    void submitAnswers();
  };

  const next = () => {
    const isLast = step + 1 === total;
    if (isLast && !canFinish) {
      setShowMustAnswerWarning(true);
      return;
    }
    if (!isLast) {
      setStep(step + 1);
    } else {
      finishFlow();
    }
  };

  const skip = () => {
    const isLast = step + 1 === total;
    if (isLast && !canFinish) {
      setShowMustAnswerWarning(true);
      return;
    }
    if (!isLast) {
      setStep(step + 1);
    } else {
      finishFlow();
    }
  };

  return (
    <div className="w-full mx-auto p-10 space-y-6 bg-white">
      {showMustAnswerWarning && (
        <div className="text-red-600 font-medium">
          Please answer at least one question before finishing.
        </div>
      )}

      {/* Progress bar + header */}
      <div className="space-y-2 w-[150px] mb-[-15px]">
        <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden h-[7px]  mb-[29px]">
          <div
            className="h-full bg-[#BCD678] transition-width duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="text-sm text-gray-700 font-medium">
          Question {step + 1} of {total}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: question */}
        <div className="prose prose-lg border-r">
          <div dangerouslySetInnerHTML={{ __html: q.question }} />
        </div>

        {/* Right: options */}
        <div className="flex flex-col space-y-4">
          {(["a", "b", "c", "d"] as const).map(opt => {
            const isPicked = picked === opt;
            const optionValue = (q as any)[`option_${opt}`];
            return optionValue ? (
              <button
                key={opt}
                onClick={() => select(opt)}
                className={`border rounded-lg px-4 py-3 text-left transition font-bold text-black font-Inter ${
                  isPicked
                    ? "bg-[#BCD678]/40 border-[#BCD678] text-gray-900"
                    : "bg-white border-[#BCD678] hover:border-[#BCD678] hover:bg-[#F0F9E8]"
                }`}
                dangerouslySetInnerHTML={{ __html: optionValue }}
              />
            ) : null;
          })}
          <p
            onClick={skip}
            className="text-black underline text-sm px-4 cursor-pointer"
          >
            Skip
          </p>
        </div>
      </div>

      {/* Next and Skip buttons */}
      <div className="flex justify-end items-center gap-10">
        {/* Previous */}
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="w-[150px] h-[48px] opacity-100 gap-[6.16px] pr-[18.49px] pl-[18.49px] rounded-[154.12px] font-bold border  text-gray-400 border-[#BCD678] hover:text-[#BCD678] transition"
          >
            Previous
          </button>
        ) : (
          <div /> /* placeholder to keep spacing */
        )}

        {/* Next / Finish */}
        <button
          onClick={next}
          disabled={
            finished ||
            (step + 1 === total ? !canFinish : !picked)
          }
          className="w-[150px] h-[48px] opacity-100 gap-[6.16px] pr-[18.49px] pl-[18.49px] rounded-[154.12px] font-bold bg-[#BCD678] text-white font-medium disabled:opacity-50 transition"
        >
          {step + 1 === total ? "Finish" : "Next"}
        </button>
      </div>

      {/* Result-first: show this BEFORE your usual onComplete flow */}
      {showResult && resultStats && (
        <QuizResultModal
          stats={resultStats}
          onViewAnswers={() => {
            setShowResult(false);
            onComplete(
              { correct: resultStats.correct, total: resultStats.total, skipped: resultStats.skipped },
              answers
            );
          }}
          onRetake={() => {
            // 🔹 reset internally, then bubble to parent (if it does extra UI work)
            resetQuiz();
            onRetake?.();
          }}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
};

export default QuizComponent;
