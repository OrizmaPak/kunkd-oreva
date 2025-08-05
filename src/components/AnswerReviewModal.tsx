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
}) => (
  <section className="w-full bg-white rounded-lg shadow p-6 space-y-6">
    <h2 className="text-2xl font-semibold">Answers</h2>
    {answers.length === 0 ? (
      <div className="text-red-600">Failed to load answers. Please try again.</div>
    ) : (
      answers.map((a, idx) => (
        <div
          key={a.questionId}
          className={`border p-4 rounded-lg ${
            a.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
          }`}
        >
          {/* render HTML question text */}
          <p
            className="font-medium"
            dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${a.questionText}` }}
          />
          <p className="mt-2">
            Your answer:{" "}
            <span className={a.isCorrect ? "text-green-700" : "text-red-700"}>
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
    <div className="flex justify-end">
      <button
        onClick={onDone}
        className="px-6 py-2 bg-[#9FC43E] text-white rounded-lg shadow"
      >
        Done
      </button>
    </div>
  </section>
);

export default AnswerReviewModal;
