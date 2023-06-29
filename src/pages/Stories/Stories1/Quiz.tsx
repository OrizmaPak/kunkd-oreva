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
import { ThemeIcon, RingProgress, Text, Center } from "@mantine/core";
import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";
type ObjAnsQuestionType = {
  question: string;
  answer: string;
};
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
  const [answers, setAnswers] = useState<ObjAnsQuestionType[]>([]);

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
    // console.log(answers);
  };

  const story = storiesData.find((el) => `${el.id}` === id);
  const handleSelectAnswer = ({
    answer,
    question,
  }: {
    answer: string;
    question: string;
  }) => {
    setAnswers((prev) => {
      const newAnswer = [...prev];
      if (newAnswer[currentQues]) {
        newAnswer[currentQues] = { answer, question };
      } else {
        newAnswer.push({ answer, question });
      }
      return newAnswer;
    });
  };
  const progress = 100 / questions.length;
  const [curentStep, setcurrentStep] = useState(STEP_1);
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
      {curentStep === STEP_1 && (
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
            setShowRemark={() => setcurrentStep(STEP_2)}
          />
        </div>
      )}
      {curentStep === STEP_2 && (
        <div className="flex-grow mt-5 pt-10 px-40 flex  flex-col py-14 bg-white rounded-3xl ">
          <GoodRemarkMsg setShowResult={() => setcurrentStep(STEP_3)} />
        </div>
      )}
      {curentStep === STEP_3 && (
        <div className="flex-grow mt-5 pt-10 px-[450px] flex  flex-col py-14 bg-white rounded-3xl ">
          <Result answers={answers} />
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
  selected: ObjAnsQuestionType[];
  setSelected: (val: ObjAnsQuestionType) => void;
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
            question={quesObject.qus}
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
  question,
  selected,
  setSelected,
}: {
  title: string;
  question: string;
  selected: ObjAnsQuestionType;
  setSelected: (val: ObjAnsQuestionType) => void;
}) => {
  const handleSelected = () => {
    setSelected({ answer: title, question });
    console.log(title);
    console.log(selected);
  };
  return (
    <button
      onClick={handleSelected}
      className={`py-2 px-20 ${
        selected?.answer === title ? "bg-[#8530C1] text-white " : ""
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
  answers: ObjAnsQuestionType[];
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

const GoodRemarkMsg = ({ setShowResult }: { setShowResult: () => void }) => {
  const location = useLocation();

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="relative flex-grow bg-white">
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

            <button
              onClick={setShowResult}
              className="py-3 px-16 bg-[#8530C1] rounded-3xl"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Result = ({ answers }: { answers: ObjAnsQuestionType[] }) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex-grow bg-white">
      <div className="bg-[#B76DEB] rounded-3xl pt-16 px-16">
        <div className="flex justify-center items-center gap-10 px-8 bg-[#FBC70D] rounded-t-3xl">
          <p>
            <RingProgress
              size={300}
              thickness={40}
              sections={[{ value: 70, color: "white" }]}
              label={
                <Text color="black" weight={700} align="center" size="xxl">
                  7/10
                </Text>
              }
              rootColor="rgba(255,255,255,0.4)"
            />
          </p>
          <p className="text-[24px] font-bold ">
            You answered 7 of 10 questions
          </p>
        </div>
      </div>
      <div className="my-10 text-center">
        <h1 className="text-[24px] font-bold ">Your Answers</h1>
      </div>
      <div className=" flex bg-[#FFF7FD] py-10 rounded-3xl  justify-items-center items-center flex-col">
        {answers.map((data, index) => (
          <ResultRow {...data} index={index} />
        ))}
        <p>
          <button
            onClick={() => navigate("/librarynotpaid")}
            className="p-4 px-20 text-white bg-[#8530C1] rounded-3xl"
          >
            Done
          </button>
        </p>
      </div>
    </div>
  );
};

const ResultRow = ({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) => {
  return (
    <div className="my-5">
      <p className="flex gap-10 items-center ">
        <p className="bg-[#8530C1]  rounded-full p-3 text-white w-[30px] h-[30px] flex justify-center items-center">
          {index + 1}
        </p>
        <p className="text-[20px] font-bold">{question}</p>
      </p>
      <p className="pl-20 text-[20px] text-[#B5B5C3] py-5">{answer}</p>
    </div>
  );
};
