// src/components/AnswerReviewModal.tsx
import React, { useMemo } from "react";
import { UserAnswer } from "@/components/QuizComponent";
import { MdOutlineCheckCircle, MdOutlineErrorOutline, MdOutlineHighlightOff } from "react-icons/md";

interface AnswerReviewModalProps {
  answers: UserAnswer[];
  onDone: () => void;
}

const AnswerReviewModal: React.FC<AnswerReviewModalProps> = ({
  answers,
  onDone,
}) => {
  /** keep the original quiz order */
  const ordered = useMemo(
    () => [...answers].sort((a, b) => a.questionId - b.questionId),
    [answers]
  );

  return (
    <div className="w-full max-h-[85vh] flex gap-8 bg-white rounded-2xl p-8 shadow-lg">
      {/* ───────── Left: fixed header / button ───────── */}
      <aside className="w-44 flex-shrink-0 space-y-6 sticky top-0 self-start">
        <h2 className="text-xl font-semibold">Answers</h2>

        <button
          onClick={onDone}
          className="w-[150px] h-[48px] opacity-100 gap-[6.16px] pr-[18.49px] pl-[18.49px] rounded-[154.12px] bg-[#9FC43E] text-white font-medium shadow-sm hover:brightness-105 transition"
        >
          Done
        </button>
      </aside>

      {/* ───────── Right: scrollable answer list ───────── */}
      <section className="w-full max-w-[600px] mx-auto mt-2">
           <div className="h-full max-h-[95vh] overflow-y-auto rounded-2xl bg-[#F7F8FC] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-opacity-50">
          {ordered.length === 0 && (
            <p className="p-8 text-center text-red-600">
              Failed to load answers. Please try again.
            </p>
          )}

          {ordered.map((a, idx) => {
            const isCorrect = a.isCorrect;

            return (
               <div
                key={a.questionId}
                className={`flex items-start justify-between gap-4 px-6 py-5 border-b last:border-b-0 ${
                  isCorrect ? "bg-transparent" : "bg-[#FBE9EC]"
                }`}
              >
                {/* number bullet */}
                  <span className="flex-none w-7 h-7 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#9FC43E] opacity-100 font-[Hanken Grotesk] font-bold text-[14px] leading-[100%] tracking-[0px] text-center">
                  {idx + 1}
                </span>

                {/* question & answer text */}
                 <div className="flex-1 space-y-[17px] w-[314px] opacity-100">
                   <p
                    className="font-[400] text-[14px] leading-[100%] text-[#151515] tracking-[0px]"
                    dangerouslySetInnerHTML={{ __html: a.questionText }}
                  />

                  {/* user’s answer */}
                  <p
                    className={`text-xs flex ${
                      isCorrect ? "text-[#ADADAD]" : "text-[#ADADAD]" 
                    }`}
                  >
                    
                    <p className="font-[500] font-medium text-[14px] leading-[100%] tracking-[0px] my-2 flex">
                       {isCorrect ? "" : ""}{" "} <span dangerouslySetInnerHTML={{ __html: a.selectedOptionValue }} />
                    </p>
                  </p>

                  {/* show correct option when they were wrong */}
                  {!isCorrect && (
                    <p className="text-sm text-gray-500">
                       <p className={`!font-bold flex ${isCorrect ? "text-gray-500" : "text-red-700"}`}>
                       {isCorrect ? "" : "Answer:"}&nbsp;{" "} <span className="font-medium" dangerouslySetInnerHTML={{ __html: a.correctOptionValue }} />
                      </p>
                    </p>
                  )}
                </div>

                {/* status icon */}
                {isCorrect ? (
                  <MdOutlineCheckCircle
                    className="bg-[#BCD678] rounded-full border-none text-white flex-none mt-1"
                    size={20}
                  />
                ) : (
                   <MdOutlineErrorOutline
                    className="text-[#F75C5C] flex-none mt-1"
                    size={20}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AnswerReviewModal;
