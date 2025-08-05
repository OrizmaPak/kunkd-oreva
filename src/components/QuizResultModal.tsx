// File: src/components/QuizResultModal.tsx

import React from "react";
import Content from "@/assets/Content.png";

export interface QuizStats {
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
}

interface QuizResultModalProps {
  stats: QuizStats;
  onViewAnswers: () => void;
  onRetake: () => void;
  onClose?: () => void; // optional ✕
}

const QuizResultModal: React.FC<QuizResultModalProps> = ({
  stats,
  onViewAnswers,
  onRetake,
  onClose,
}) => {
  const completion = Math.round((stats.correct / stats.total) * 100);

  console.log('onViewAnswers555', onViewAnswers);


  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[5000]">
      {/* optional close */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-2xl hover:opacity-80 focus:outline-none"
        >
          ✕
        </button>
      )}

      {/* card */}
      <div className="bg-white rounded-[28px] shadow-2xl w-[420px] max-w-[90%] px-10 py-12 text-center">
        {/* medal */}
        <div className="relative w-[333px] h-[143.0368px] mx-auto mb-[10px] opacity-100">
          <img
            src={Content}
            alt="medal"
            className="w-full h-full object-contain"
          />

          {/* simple confetti dots */}
          {[
            "top-1 left-6",
            "top-2 right-3",
            "bottom-3 left-4",
            "bottom-2 right-8",
            "top-10 left-2",
            "top-11 right-2",
          ].map((pos, i) => (
            <span
              key={i}
              className={`absolute w-[6px] h-[6px] rounded-full bg-[#BCD678] ${pos}`}
            />
          ))}
        </div>

        {/* ===== stats, Figma-style ===== */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-3 text-left text-[13px] mb-2" style={{ width: '333px', height: '142px', transform: 'rotate(0deg)', opacity: 1 }}>
          {/* col 1, row 1 */}
          <div style={{ width: '158px', height: '49px', transform: 'rotate(0deg)', opacity: 1, top: '175.04px', gap: '10px' }}>
            <div className="text-gray-500 mb-1">Correct Answer</div>
            <div className="font-semibold text-gray-900">{stats.correct} correct</div>
          </div>

          {/* col 2, row 1 */}
          <div style={{ width: '158px', height: '49px', transform: 'rotate(0deg)', opacity: 1, top: '175.04px', gap: '10px' }}>
            <div className="text-gray-500 mb-1">Completion</div>
            <div className="font-semibold text-gray-900">{completion}%</div>
          </div>

          {/* col 1, row 2 */}
          <div style={{ width: '158px', height: '49px', transform: 'rotate(0deg)', opacity: 1, top: '175.04px', gap: '10px' }}>
            <div className="text-gray-500 mb-1">Skipped</div>
            <div className="font-semibold text-gray-900">{stats.skipped} questions</div>
          </div>

          {/* col 2, row 2 */}
          <div style={{ width: '158px', height: '49px', transform: 'rotate(0deg)', opacity: 1, top: '175.04px', gap: '10px' }}>
            <div className="text-gray-500 mb-1">Incorrect Answer</div>
            <div className="font-semibold text-gray-900">{stats.total - stats.correct} questions</div>
          </div>
        </div>

        {/* buttons */}
        <button
          onClick={onViewAnswers}
          className="block w-full bg-[#9FC43E] hover:bg-[#86b23a] text-white font-medium py-3 rounded-full mb-4 transition"
        >
          View Answers
        </button>

        <button
          onClick={() => {
            console.log("onRetake", onRetake);
            onRetake();       // parent handles modal close
            onClose?.();        // <- pretend user clicked X  (optional)
          }}
          className="block w-full font-medium py-3 rounded-full border border-[#9FC43E] text-[#9FC43E] hover:bg-[#f6fdf0] transition"
        >
          Retake quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResultModal;
