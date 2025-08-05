// File: src/components/AnswerReview.tsx

import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Question, UserAnswer } from "./QuizComponent"; // re‑use existing types

interface AnswerReviewProps {
  answers: UserAnswer[];           // array in the order answered
  onDone: () => void;              // closes this view
}

/* ------------------------------------------------------------------ */

const AnswerReview: React.FC<AnswerReviewProps> = ({ answers, onDone }) => {
  console.log('anseras', answers);
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex gap-8">
      {/* left rail with Done button */}
      <aside className="hidden md:block w-32 shrink-0 pt-2">
        <h3 className="mb-6 font-semibold text-gray-700">Answers</h3>
        <button
          onClick={onDone}
          className="bg-[#9FC43E] hover:bg-[#85ab36] text-white py-2 px-4 rounded-full w-full text-center transition"
        >
          Done
        </button>
      </aside>

      {/* answer list */}
      <div className="flex-1 overflow-auto max-h-[80vh] pr-2">
        <ol className="space-y-4">
          {answers.map((a, idx) => {
            const q = a.question;
            const isCorrect = a.selectedIdx === q.answerIdx;
            const isSkipped = a.selectedIdx === null;

            return (
              <li
                key={idx}
                className={`relative flex items-start gap-4 rounded-xl p-4 md:p-5 shadow-sm border
                  ${isCorrect ? "bg-[#F7FCF3] border-[#d7e9ce]" : isSkipped ? "bg-white border-gray-200" : "bg-[#FFF5F5] border-[#f5dada]"}`}
              >
                {/* index bubble */}
                <span
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-[13px] font-medium text-gray-500 mt-1"
                >
                  {idx + 1}
                </span>

                <div className="flex-1">
                  {/* question */}
                  <p className="font-medium text-gray-800 mb-1 leading-snug">
                    {q.q}
                  </p>

                  {/* your answer or skipped */}
                  <p
                    className={`text-[13px] leading-snug mb-1 ${{
                      true: "text-gray-700", // default
                    }["true"]}`}
                  >
                    {isSkipped ? "You skipped this question" : `Your answer: ${q.choices[a.selectedIdx!]}`}
                  </p>

                  {/* correct answer if wrong / skipped */}
                  {!isCorrect && (
                    <p className="text-[13px] text-[#e53e3e] leading-snug">
                      Answer: {q.choices[q.answerIdx]}
                    </p>
                  )}
                </div>

                {/* status icon */}
                <div className="mt-1">
                  {isSkipped ? null : isCorrect ? (
                    <FaCheckCircle className="text-[#58c064]" size={18} />
                  ) : (
                    <FaTimesCircle className="text-[#e53e3e]" size={18} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default AnswerReview;
