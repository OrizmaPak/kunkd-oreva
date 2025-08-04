// src/components/AnswerReviewModal.tsx
import React from "react";
import { UserAnswer } from "@/components/QuizComponent";
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
      <div className="p-4 border-b flex justify-start">
        <button
          onClick={onDone}
          className="bg-[#9FC43E] text-white px-4 py-2 rounded-full"
        >
          Done
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {answers.map((a, idx) => (
          <div
            key={a.questionId}
            className={`border p-4 rounded-lg ${
              a.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
            }`}
          >
            <div className="flex items-start">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                  a.isCorrect ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {idx + 1}
              </div>
              <p className="ml-3 font-medium flex-1">{a.questionText}</p>
              <div className="ml-2">
                {a.isCorrect ? (
                  <MdOutlineCheckCircle className="text-green-600" size={20} />
                ) : (
                  <MdOutlineHighlightOff className="text-red-600" size={20} />
                )}
              </div>
            </div>
            <p className="mt-2 text-gray-700">
              Your answer:{" "}
              <span className={a.isCorrect ? "text-green-700" : "text-red-700"}>
                {a.selectedOption}
              </span>
            </p>
            {!a.isCorrect && (
              <p className="mt-1 text-red-600">
                Correct answer: <span className="font-semibold">{a.correctOption}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AnswerReviewModal;
