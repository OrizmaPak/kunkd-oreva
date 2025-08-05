import React, { useState, useEffect } from "react";
import { GetQuiz } from "@/api/api";
import { Book } from "./BookCard";

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
  isCorrect: boolean;
}

export interface QuizComponentProps {
  book: Book;
  onComplete: (stats: QuizStats, answers: UserAnswer[]) => void;
  resetSignal?: number; 
  onRetake: () => void;
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

const QuizComponent: React.FC<QuizComponentProps> = ({ book, onComplete, resetSignal, onRetake }) => {

  // console.log('onRetaker ampper', onComplete, onRetake);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [step, setStep] = useState(0); // current question/page
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [finished, setFinished] = useState(false);

  /* NEW: whenever resetSignal ticks, clear everything */
  useEffect(() => {
    if (resetSignal === undefined) return;

    setStep(0);          // back to the first question
    setAnswers([]);      // wipe old answers
    setFinished(false);  // reopen submit button etc.
  }, [resetSignal]);

  useEffect(() => {
    (async () => {
      try {
        const res = await GetQuiz(String(book.id));
        setQuestions(res.data.data.questions);
      } finally {
        setLoading(false);
      }
    })();
  }, [book.id]);

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

  const picked = answers.find(a => a.questionId === q.question_id)?.selectedOption;

  const select = (letter: "a" | "b" | "c" | "d") => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== q.question_id);
      return [...filtered, {
        questionId: q.question_id,
        questionText: q.question,
        selectedOption: letter,
        correctOption: q.answer,
        isCorrect: letter === q.answer
      }];
    });
  };

  const next = () => {
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      const correctCount = answers.filter(a => a.isCorrect).length;
      const skippedCount = total - answers.length;
      console.log('ANSWERS3', onComplete, answers);
      onComplete({ correct: correctCount, total, skipped: skippedCount }, answers);
      setFinished(true);
      console.log('ANSWERS1', answers);
    }
  };

  const skip = () => {
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      const correctCount = answers.filter(a => a.isCorrect).length;
      const skippedCount = total - answers.length;
      onComplete({ correct: correctCount, total, skipped: skippedCount }, answers);
      setFinished(true);
      console.log('ANSWERS2', answers);
    }
  };


  return (
    <div className="w-full mx-auto p-10 space-y-6 bg-white">
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
            const optionValue = q[`option_${opt}`];
            return optionValue ? (
              <button
                key={opt}
                onClick={() => select(opt)}
                className={`border rounded-lg px-4 py-3 text-left transition ${
                  isPicked
                    ? "bg-[#BCD678]/40 border-[#BCD678] text-gray-900"
                    : "bg-white border-[#BCD678] hover:border-[#BCD678] hover:bg-[#F0F9E8]"
                }`}
                dangerouslySetInnerHTML={{ __html: optionValue }}
              />
            ) : null;
          })}
        </div>
      </div>

      {/* Next and Skip buttons */}
      <div className="flex justify-end items-center gap-10">
        {/* Previous */}
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-10 py-3 rounded-full border border-gray-300 text-gray-700 hover:border-[#BCD678] hover:text-[#BCD678] transition"
          >
            Previous
          </button>
        ) : (
          <div /> /* placeholder to keep spacing */
        )}

        {/* Skip */}
        <button
          onClick={skip}
          disabled={finished}
          className="px-10 py-3 rounded-full bg-gray-300 text-white font-medium disabled:opacity-50 transition"
        >
          Skip
        </button>

        {/* Next / Finish */}
        <button
          onClick={next}
          disabled={!picked || finished}
          className="px-10 py-3 rounded-full bg-[#BCD678] text-white font-medium disabled:opacity-50 transition"
        >
          {step + 1 === total ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
