import React, { useState } from "react";
import { Book } from "./BookCard";

export interface Question {
  q: string;
  choices: string[];
  answerIdx: number;
}
export interface UserAnswer {
  question: Question;
  selectedIdx: number | null; // null = skipped
}

export interface QuizStats {
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
}

interface QuizComponentProps {
  book: Book; // handy if you wish to display breadcrumbs / cover later
  onComplete: (stats: QuizStats, answers: UserAnswer[]) => void;
  onExit?: () => void; // optional close handler
}

/* -------------------------------------------------------------------- */

const QUESTIONS: Question[] = [
  {
    q: "Why did Chisom’s grandmother seize her phone?",
    choices: [
      "She wanted her to help clean",
      "She wanted to make her angry",
      "Chisom wasn’t listening to her",
      "Chisom refused to eat",
    ],
    answerIdx: 0,
  },
  {
    q: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answerIdx: 2,
  },
  {
    q: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answerIdx: 1,
  },
  {
    q: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answerIdx: 1,
  },
  {
    q: "Who wrote 'Romeo and Juliet'?",
    choices: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Jane Austen",
    ],
    answerIdx: 1,
  },
];

/* -------------------------------------------------------------------- */

const QuizComponent: React.FC<QuizComponentProps> = ({ book, onComplete, onExit }) => {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const q = QUESTIONS[idx];
  const total = QUESTIONS.length;
  const progress = (idx / total) * 100; // idx starts at 0

  const nextEnabled = selected !== null; // require a pick (user can also skip)

  // --- FIX: addAnswer always adds the current question and choice to answers
  const addAnswer = (choice: number | null) => {
    setAnswers(prev => [...prev, { question: q, selectedIdx: choice }]);
  };

  const handleNext = () => {
    if (idx + 1 < total) {
      addAnswer(selected);
      setSelected(null);
      setIdx(i => i + 1);
    } else {
      finishQuiz(selected);
    }
  };

  // --- FIX: finishQuiz always computes stats from all answers including the last
  const finishQuiz = (choice: number | null) => {
    addAnswer(choice);
    const all = [...answers, { question: q, selectedIdx: choice }];
    const correct   = all.filter(a => a.selectedIdx === a.question.answerIdx).length;
    const skipped   = all.filter(a => a.selectedIdx === null).length;
    const incorrect = all.length - correct - skipped;
    onComplete({ correct, incorrect, skipped, total: all.length }, all);
  };

  /* -------------------------------------------------------------- */

  return (
    <div className="relative max-w-5xl mx-auto w-full py-8 px-4 sm:px-8">
      {/* progress bar */}
      <div className="h-2 w-[110px] bg-gray-200 rounded overflow-hidden mb-8">
        <div
          className="h-full bg-[#9FC43E] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* question column */}
        <div className="col-span-12 md:col-span-5 pr-0 md:pr-6">
          <p className="text-sm text-gray-500 mb-1">
            Question {idx + 1} of {total}
          </p>
          <p className="font-semibold text-gray-800 leading-relaxed">
            {q.q}
          </p>
        </div>

        {/* divider */}
        <div className="invisible col-span-0 border-r border-gray-300" />

        {/* answers column */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
          {q.choices.map((choice, i) => {
            const isPicked = selected === i;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3 rounded-2xl border-[1px] transition  border-[#9FC43E]
                  ${isPicked ? "bg-[#9FC43E] text-white" : " hover:bg-gray-50"}`}
              >
                {choice}
              </button>
            );
          })}
          {selected === null && (
            <button
              onClick={() => setSelected(null)}
              className="w-full text-left px-4 py-3 text-gray-500 hover:text-gray-700"
            >
              Skip
            </button>
          )}
        </div>
      </div>

      {/* nav buttons */}
      <div className="mt-10 flex justify-end md:justify-end gap-4">
        {idx !== 0 && (
          <button
            onClick={() => {
              const prevAnswer = answers.pop();
              setAnswers([...answers]);
              setSelected(prevAnswer?.selectedIdx ?? null);
              setIdx(i => i - 1);
            }}
            className="px-8 py-2 rounded-full border border-[#9FC43E] text-[#9FC43E] hover:bg-gray-50"
          >
            Previous
          </button>
        )}

        <button
          disabled={!nextEnabled && idx + 1 < total}
          onClick={handleNext}
          className="px-8 py-2 rounded-full bg-[#9FC43E] text-white hover:bg-green-600 disabled:opacity-50"
        >
          {idx + 1 === total ? "Finish" : "Next"}
        </button>
      </div>

      {onExit && (
        <button
          onClick={onExit}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default QuizComponent;
