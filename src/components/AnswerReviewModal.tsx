// src/components/AnswerReviewModal.tsx
import React, { useEffect } from "react";
import { UserAnswer } from "@/components/QuizComponent";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";

interface AnswerReviewModalProps {
  /** The list of user answers (may be empty) */
  answers: UserAnswer[];
  onDone: () => void;
}

const AnswerReviewModal: React.FC<AnswerReviewModalProps> = ({
  answers,
  onDone,
}) => {
  useEffect(() => {
    console.log("▶️ AnswerReviewModal mounted with answers:", answers);
  }, [answers]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-[600px] rounded-lg shadow-xl flex flex-col max-h-[80vh]">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {answers.length === 0 ? (
            <div className="text-center text-red-600">
              Failed to load answers. Please try again.
            </div>
          ) : (
            answers.map((a, idx) => (
              <div
                key={a.questionId}
                className={`border p-4 rounded-lg ${
                  a.isCorrect
                    ? "border-green-400 bg-green-50"
                    : "border-red-400 bg-red-50"
                }`}
              >
                <p className="font-medium">
                  {idx + 1}. {a.questionText}
                </p>
                <p className="mt-2">
                  Your answer:{" "}
                  <span
                    className={
                      a.isCorrect ? "text-green-700" : "text-red-700"
                    }
                  >
                    {a.selectedOption}
                  </span>
                </p>
                {!a.isCorrect && (
                  <p>
                    Correct answer:{" "}
                    <span className="font-semibold">{a.correctOption}</span>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
        <div className="border-t p-4 flex justify-end bg-white">
          <button
            onClick={onDone}
            className="px-6 py-2 bg-[#9FC43E] text-white rounded-lg shadow"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
export default AnswerReviewModal;
