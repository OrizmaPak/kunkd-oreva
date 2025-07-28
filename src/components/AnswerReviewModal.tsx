// src/components/AnswerReviewModal.tsx
import React from "react";
import { UserAnswer } from "./QuizComponent";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";

interface AnswerReviewModalProps {
  answers: UserAnswer[];
  onDone: () => void;
}

const AnswerReviewModal: React.FC<AnswerReviewModalProps> = ({
  answers,
  onDone,
}) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl w-full max-w-lg h-[80vh] flex flex-col overflow-hidden">
      {/* Done button (fixed) */}
      <div className="p-4 border-b flex justify-start">
        <button
          onClick={onDone}
          className="bg-[#9FC43E] text-white px-4 py-2 rounded-full"
        >
          Done
        </button>
      </div>

      {/* scrollable answers list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {answers.map((ua, i) => {
          const { question, selectedIdx } = ua;
          const correct = selectedIdx === question.answerIdx;
          return (
            <div
              key={i}
              className={`p-4 rounded-lg ${
                correct ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                    correct ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {i + 1}
                </div>
                <p className="ml-3 font-medium flex-1">{question.q}</p>
                <div className="ml-2">
                  {correct ? (
                    <MdOutlineCheckCircle className="text-green-600" size={20} />
                  ) : (
                    <MdOutlineHighlightOff className="text-red-600" size={20} />
                  )}
                </div>
              </div>
              <p className="mt-2 text-gray-700">
                Your answer:{" "}
                {selectedIdx !== null ? (
                  question.choices[selectedIdx]
                ) : (
                  <span className="italic">Skipped</span>
                )}
              </p>
              {!correct && (
                <p className="mt-1 text-red-600">
                  Correct answer: {question.choices[question.answerIdx]}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default AnswerReviewModal;
