import { Progress } from "@mantine/core";
import StoriesNav from "./StoriesNav";
import {
  Location,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { storiesData, StoriesType } from "../Stories";
import { useState } from "react";
import RemarkBg from "@/assets/remarkbg.svg";
import RemarkIcon from "@/assets/remarkIcon.svg";
import Button from "@/components/Button";

const Quiz = () => {
  const { id, story_type } = useParams();
  const questions = [
    {
      qus: " Why did Chisom’s grand-mother seize her phone?",
      ans: [
        "She wanted her to help clean",
        "She wanted to get her angry",
        "Chisom wasn’t listening to her",
        "Chisom refused to eat",
      ],
      myAnswer: null,
    },
    {
      qus: " Why did Chisom’s grand-mother seize her phone?",
      ans: [
        "She wanted her to help clean",
        "She wanted to get her angry",
        "Chisom wasn’t listening to her",
        "Chisom refused to eat",
      ],
      myAnswer: null,
    },
    {
      qus: " Why did Chisom’s grand-mother seize her phone?",
      ans: [
        "She wanted her to help clean",
        "She wanted to get her angry",
        "Chisom wasn’t listening to her",
        "Chisom refused to eat",
      ],
      myAnswer: null,
    },
    {
      qus: " Why did Chisom’s grand-mother seize her phone?",
      ans: [
        "She wanted her to help clean",
        "She wanted to get her angry",
        "Chisom wasn’t listening to her",
        "Chisom refused to eat",
      ],
      myAnswer: null,
    },
  ];

  const [currentQues, setCurrentQues] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const handlePagination = (paginationType: string) => {
    if (
      paginationType === "next" &&
      currentQues < questions.length - 1 &&
      answers.length >= currentQues + 1
    ) {
      setCurrentQues((el) => (el += 1));
      console.log("currentpage", currentQues, "answer", answers);
    }
    if (paginationType === "prev" && currentQues >= 1) {
      setCurrentQues((el) => (el -= 1));
      // setAnswers((val) => (val -= 1));
    }
  };
  const story = storiesData.find((el) => `${el.id}` === id);
  const handleSelectAnswer = (answer: string) => {
    setAnswers((prev) => {
      const newAnswer = [...prev];
      if (newAnswer[currentQues]) {
        newAnswer[currentQues] = answer;
      } else {
        newAnswer.push(answer);
      }
      return newAnswer;
    });
  };
  const progress = 100 / questions.length;
  const [showRemark, setShowRemark] = useState(false);
  return (
    <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd] ">
      {story && (
        <StoriesNav
          category="Stories"
          genre={story_type}
          title={story?.title}
          quiz="quiz"
        />
      )}
      {!showRemark && (
        <div className="flex-grow mt-5 pt-10 px-40 flex  flex-col py-14 bg-white rounded-3xl ">
          <Progress value={progress * answers.length} size="xl" radius="xl" />

          {/* Question  */}
          <Question
            quesObject={questions[currentQues]}
            selected={answers}
            setSelected={handleSelectAnswer}
            currentQuestion={currentQues}
          />

          <QuestionPagination
            handlePagination={handlePagination}
            totalQuestion={questions.length}
            currentQues={currentQues}
            answers={answers}
            setShowRemark={() => setShowRemark(true)}
          />
        </div>
      )}
      {showRemark && (
        <div className="flex-grow mt-5 pt-10 px-40 flex  flex-col py-14 bg-white rounded-3xl ">
          <GoodRemarkMsg />
        </div>
      )}
    </div>
  );
};

export default Quiz;

type questionType = {
  qus: string;
  ans: string[];
};

const Question = ({
  quesObject,
  selected,
  setSelected,
  currentQuestion,
}: {
  quesObject: questionType;
  selected: string[];
  setSelected: (val: string) => void;
  currentQuestion: number;
}) => {
  return (
    <div className="mt-[100px] flex justify-center items-center flex-col gap-y-8 flex-grow">
      <h1 className="text-[20px] font-bold  text-center">{quesObject.qus}</h1>
      <div className=" flex flex-col gap-10">
        {quesObject.ans.map((ans, index) => (
          <AnsButton
            key={index}
            title={ans}
            selected={selected[currentQuestion]}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

const AnsButton = ({
  title,
  selected,
  setSelected,
}: {
  title: string;
  selected: string;
  setSelected: (val: string) => void;
}) => {
  const handleSelected = () => {
    setSelected(title);
    console.log(title);
    console.log(selected);
  };
  return (
    <button
      onClick={handleSelected}
      className={`py-2 px-20 ${
        selected === title ? "bg-[#8530C1] text-white " : ""
      } border border-[#8530C1] rounded-3xl`}
    >
      {title}
    </button>
  );
};

const QuestionPagination = ({
  handlePagination,
  currentQues,
  totalQuestion,
  answers,
  setShowRemark,
}: {
  handlePagination: (val: string) => void;
  currentQues: number;
  totalQuestion: number;
  answers: string[];
  setShowRemark: () => void;
}) => {
  return (
    <div>
      <hr className="mb-5" />
      <div className="flex justify-between items-center">
        <button
          onClick={() => handlePagination("prev")}
          className="py-3 px-16 bg-[#E2B6FF]   rounded-3xl text-white"
        >
          Prev
        </button>
        <span>
          Question {currentQues + 1} of {totalQuestion}
        </span>
        {answers.length === totalQuestion &&
        currentQues + 1 === totalQuestion ? (
          <button
            onClick={setShowRemark}
            className="py-3 px-16 bg-green-600 rounded-3xl  text-white"
          >
            Finish Quiz
          </button>
        ) : (
          <button
            onClick={() => handlePagination("next")}
            className="py-3 px-16 bg-[#8530C1] rounded-3xl text-white"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const GoodRemarkMsg = () => {
  const location = useLocation();

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="relative flex-grow">
        <img
          src={RemarkBg}
          alt=""
          className="absolute left-[520px] top-[100px] "
        />
        <img
          src={RemarkIcon}
          alt="remarkIcon"
          className="absolute left-[600px] top-[100px]"
        />
        <div className="text-center  mt-[350px]">
          <h1 className="font-bold">Good Job!</h1>
          <p className="text-[18px] text-[#B5B5C3]">
            You answered 7 questions correct
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center text-white">
          <button className="py-3 px-16 bg-[#E2B6FF]  text-white rounded-3xl">
            Review quiz
          </button>
          <div className="flex gap-20">
            <Button
              onClick={refreshPage}
              size="md"
              color="black"
              varient="outlined"
            >
              <strong className="text-[#8530C1]">Retake Quiz</strong>
            </Button>

            <button className="py-3 px-16 bg-[#8530C1] rounded-3xl">
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
