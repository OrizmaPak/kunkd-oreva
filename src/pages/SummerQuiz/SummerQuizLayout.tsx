import { Progress } from "@mantine/core";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import RemarkBg from "@/assets/remarkbg.svg";
// import RemarkIcon from "@/assets/remarkIcon.svg";
import WinnerBadge from "@/assets/goodresultIcon.png";
import WeldoneIcone from "@/assets/weldoneIcone.png";
import QuestionIcone from "@/assets/questionIcon.png";

// import Button from "@/components/Button";
import { MantineProvider } from "@mantine/core";
// import { Slider, MantineProvider } from "@mantine/core";

import {
  // useGetQuiz,
  useGetSummerQuiz,
  // useSaveQuiz,
  useSubmmitSummerQuizQandA,
  // useSaveQuiz
} from "@/api/queries";
import { STEP_1, STEP_2, STEP_3, STEP_4 } from "@/utils/constants";
// import Contour from "@/assets/contour.svg";
import DangerCircle from "@/assets/Danger Circle.svg";
import CheckCircle from "@/assets/CheckCircle-f.svg";
import SmileIcon from "@/assets/SmileyMeh-d.svg";
import { Skeleton } from "@mantine/core";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { useNavigate } from "react-router-dom";
import { handleEventTracking } from "@/api/moengage";
import { GrNext } from "react-icons/gr";

const SummerQuizLayout = () => {
  const summerQuizId = sessionStorage.getItem("summerQuizId");
  const profileId = sessionStorage.getItem("profileId") as string;
  const { data: quiz, isLoading } = useGetSummerQuiz(
    summerQuizId?.toString() as string,
    profileId
  );
  const quizName = quiz?.data?.data?.name;
  const questions = quiz?.data?.data?.questions;
  //   const quizId = quiz?.data?.data?.quiz_id;
  // const contentString = sessionStorage.getItem("content");
  // const content = JSON.parse(contentString as string);
  const [currentQues, setCurrentQues] = useState<number>(0);
  const [answers, setAnswers] = useState<answerObj[]>([]);

  const handlePagination = (paginationType: string) => {
    if (paginationType === "next" && currentQues < questions.length - 1) {
      setCurrentQues((el) => (el += 1));
    }
    if (paginationType === "prev" && currentQues >= 1) {
      setCurrentQues((el) => (el -= 1));
    }
  };

  const handleSelectAnswer = ({
    question,
    actual_answer,
    question_id,
    selected_option,
    selected_option_value,
  }: answerObj) => {
    setAnswers((prev) => {
      const newAnswer = [...prev];
      if (newAnswer[currentQues]) {
        newAnswer[currentQues] = {
          question_id: question_id,
          question,
          actual_answer,
          selected_option,
          selected_option_value,
        };
      } else {
        newAnswer.push({
          question_id: question_id,
          question,
          actual_answer,
          selected_option,
          selected_option_value,
        });
      }
      return newAnswer;
    });
  };
  const progress = 100 / questions?.length;
  const [curentStep, setcurrentStep] = useState(STEP_1);
  const navigate = useNavigate();

  return (
    <>
      <Wrapper bgColor="#fff7fd">
        <InnerWrapper>
          <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd] w-[100%] ">
            <div className="flex gap-3 mt-8 px-2">
              <button
                onClick={() => navigate("/summer-quiz")}
                className="text25 font-bold flex"
              >
                Summer Challenge <GrNext size={30} />
              </button>
              <button className="text25 font-bold text-[#8530C1] flex gap-2">
                {quizName}
                <GrNext size={30} color="#8530C1]" />
              </button>
            </div>

            {curentStep === STEP_1 && (
              <>
                <Skeleton visible={isLoading} height={600}>
                  <div className="flex-grow mt-5 pt-5 px-40 flex  h-[100%]  flex-col py-5 bg-white rounded-3xl ">
                    <MantineProvider
                      theme={{
                        colors: {
                          "ocean-blue": [
                            "#8530C1",
                            "#5FCCDB",
                            "#44CADC",
                            "#2AC9DE",
                            "#1AC2D9",
                            "#11B7CD",
                            "#09ADC3",
                            "#0E99AC",
                            "#128797",
                            "#147885",
                          ],
                        },
                      }}
                    >
                      <Progress
                        value={progress * answers.length}
                        size="xl"
                        radius="xl"
                        color="ocean-blue.0"
                      />
                    </MantineProvider>
                    <Question
                      quesObject={questions && questions[currentQues]}
                      selected={answers}
                      setSelected={handleSelectAnswer}
                      currentQuestion={currentQues}
                      currentQues={questions && currentQues}
                    />

                    <QuestionPagination
                      handlePagination={handlePagination}
                      totalQuestion={questions && questions?.length}
                      currentQues={questions && currentQues}
                      answers={answers && answers}
                      questions={questions ?? []}
                      handleSelectAnswer={handleSelectAnswer}
                      setShowResult={() => setcurrentStep(STEP_2)}
                      profileId={+profileId}
                      summerQuizId={(summerQuizId && +summerQuizId) as number}
                    />
                  </div>
                </Skeleton>
              </>
            )}
            {curentStep === STEP_2 && (
              <div className="flex-grow mt-10  flex  justify-center items-center  mx-auto w-[100%]  flex-col py-14 bg-white  rounded-3xl ">
                <Result answers={answers} />
              </div>
            )}
            {curentStep === STEP_3 && (
              <div className="flex-grow mt-5 pt-10 px-40 flex  flex-col py-14 bg-white rounded-3xl ">
                <GoodRemarkMsg
                  answers={answers}
                  setShowYourResult={() => setcurrentStep(STEP_4)}
                />
              </div>
            )}
            {curentStep === STEP_4 && (
              <div className="flex-grow mt-5 pt-10  mx-auto  flex justify-center items-center  flex-col py-14 bg-white   w-[100%] rounded-3xl ">
                <YourResult answers={answers} />
              </div>
            )}
          </div>
        </InnerWrapper>
      </Wrapper>
    </>
  );
};

export default SummerQuizLayout;

type questionType = {
  answer: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  question: string;
  question_id: number;
};

const Question = ({
  quesObject,
  selected,
  setSelected,
  currentQuestion,
  currentQues,
}: {
  quesObject: questionType;
  selected: answerObj[];
  setSelected: (val: answerObj) => void;
  currentQuestion: number;
  currentQues: number;
}) => {
  const currentPage = currentQues + 1;
  const isDivisibleBy5 = currentPage % 5 === 0;

  return (
    <div className=" flex justify-start mt-20 items-center flex-col gap-y-4 flex-grow relative ">
      {isDivisibleBy5 && (
        <img src={WeldoneIcone} alt="" className="absolute left-[-220px]" />
      )}
      {isDivisibleBy5 && (
        <img src={QuestionIcone} alt="" className="absolute right-[-100px]" />
      )}
      <h1
        className="text-[24px] font-bold  text-center mb-8"
        dangerouslySetInnerHTML={{ __html: `${quesObject?.question}` }}
      ></h1>
      <div className=" flex flex-col gap-6">
        <AnsButton
          selected_option={"a"}
          question_id={quesObject?.question_id}
          title={quesObject?.option_a}
          actual_answer={
            quesObject?.answer
              ? (quesObject[
                  `option_${quesObject?.answer}` as keyof questionType
                ] as string)
              : ""
          }
          question={quesObject?.question}
          selected={selected[currentQuestion]}
          setSelected={setSelected}
        />
        <AnsButton
          selected_option={"b"}
          question_id={quesObject?.question_id}
          title={quesObject?.option_b}
          question={quesObject?.question}
          selected={selected[currentQuestion]}
          actual_answer={
            quesObject?.answer
              ? (quesObject[
                  `option_${quesObject?.answer}` as keyof questionType
                ] as string)
              : ""
          }
          setSelected={setSelected}
        />
        <AnsButton
          selected_option={"c"}
          question_id={quesObject?.question_id}
          title={quesObject?.option_c}
          question={quesObject?.question}
          selected={selected[currentQuestion]}
          actual_answer={
            quesObject?.answer
              ? (quesObject[
                  `option_${quesObject?.answer}` as keyof questionType
                ] as string)
              : ""
          }
          setSelected={setSelected}
        />
        <AnsButton
          selected_option={"d"}
          question_id={quesObject?.question_id}
          title={quesObject?.option_d}
          question={quesObject?.question}
          selected={selected[currentQuestion]}
          actual_answer={
            quesObject?.answer
              ? (quesObject[
                  `option_${quesObject?.answer}` as keyof questionType
                ] as string)
              : ""
          }
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

const AnsButton = ({
  title,
  question,
  selected,
  setSelected,
  actual_answer,
  question_id,
  selected_option,
}: {
  title: string;
  question: string;
  selected: answerObj;
  setSelected: (val: answerObj) => void;
  actual_answer: string;
  question_id: number;
  selected_option: string;
}) => {
  const handleSelected = () => {
    setSelected({
      selected_option_value: title,
      question,
      actual_answer,
      question_id,
      selected_option,
    });
  };
  return (
    <button
      onClick={handleSelected}
      className={`py-3 px-10 w-[478px] ${
        selected?.selected_option_value === title
          ? "bg-[#8530C1] text-white "
          : "text-[#8530C1]"
      } border border-[#8530C1] rounded-2xl texx`}
      dangerouslySetInnerHTML={{ __html: title }}
    ></button>
  );
};

type answerObj = {
  selected_option_value?: string;
  question: string;
  actual_answer: string;
  question_id?: number;
  selected_option?: string;
};
const QuestionPagination = ({
  handlePagination,
  currentQues,
  totalQuestion,
  answers,
  setShowResult,
  questions,
  profileId,
  summerQuizId,
  handleSelectAnswer,
}: {
  handlePagination: (val: string) => void;
  currentQues: number;
  totalQuestion: number;
  answers: answerObj[];
  profileId: number;
  summerQuizId: number;
  questions: questionType[];
  setShowResult: () => void;
  handleSelectAnswer: (answer: answerObj) => void;
}) => {
  const question = questions[currentQues];
  const actual_answer = question?.answer
    ? (question[`option_${question?.answer}` as keyof questionType] as string)
    : "";
  const handleNext = () => {
    console.log("Next-Button", actual_answer, answers);
    if (!answers[currentQues]) {
      handleSelectAnswer({
        question: question?.question,
        actual_answer,
      });
    }
    if (answers[currentQues]?.selected_option != undefined) {
      handlePagination("next");
    }
  };

  const { mutate, isLoading } = useSubmmitSummerQuizQandA();
  const [user] = useStore(getUserState);
  function formatTimeComponent(component: number) {
    return component < 10 ? "0" + component : component;
  }
  // const navigate = useNavigate();
  const currentTime = new Date();
  // Extract hours, minutes, and seconds
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  // Formatting the time components
  const timeString =
    formatTimeComponent(hours) +
    ":" +
    formatTimeComponent(minutes) +
    ":" +
    formatTimeComponent(seconds);

  const handleSaveQuiz = () => {
    mutate(
      {
        summer_challenge_quiz_id: summerQuizId,
        profile_id: profileId ? profileId : 0,
        questions: [...answers],
      },
      {
        onSuccess(data) {
          handleEventTracking(
            `${
              user?.role == "teacher"
                ? "teacher"
                : user?.role == "user"
                ? "parent"
                : "school"
            }_quiz_completed`,
            {
              user_id: user?.user_id,
              profile_d: sessionStorage.getItem("profileId"),
              lesson_id: sessionStorage.getItem("contentId"),
              lesson_category: "stories",
              media_type: "text",
              start_time: timeString,
              quiz_score: (100 / answers.length) * attempted.length,
            }
          );
          setShowResult();
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },

        onError(err) {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };
  const attempted = answers.filter(
    (answer) => answer.selected_option_value !== undefined
  );
  return (
    <div>
      <hr className="mb-5" />
      <div className="flex justify-between items-center">
        <button
          onClick={() => handlePagination("prev")}
          className="py-3 px-16 bg-[#E2B6FF]   rounded text-white"
        >
          Prev
        </button>
        <span>
          Question {currentQues + 1} of {totalQuestion}
        </span>
        {answers.length === totalQuestion &&
        currentQues + 1 === totalQuestion ? (
          <button
            onClick={handleSaveQuiz}
            className="py-3 px-16 bg-green-600 rounded  text-white"
          >
            {isLoading ? (
              <p className="flex justify-center items-center">
                <Loader color="white" size="sm" />
              </p>
            ) : (
              <span className="text20"> Finish Quiz</span>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="py-3 px-16 bg-[#8530C1] rounded text-white"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const GoodRemarkMsg = ({
  // setShowYourResult,
  answers,
}: {
  setShowYourResult?: () => void;
  answers: answerObj[];
}) => {
  // const refreshPage = () => {
  //   window.location.reload();
  // };

  const result = answers.filter(
    (answer) => answer.selected_option_value === answer.actual_answer
  );

  return (
    <>
      {result.length < answers.length / 2 ? (
        <div className="">
          <div className="flex justify-center items-center">
            <img
              src={SmileIcon}
              alt="remarkIcon"
              // className="absolute left-1/2 top-[-150%] transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="text-center  ">
            <h1 className="font-bold">You can do better!</h1>
            <p className="text25 text-[#667085]">
              You answered {result.length}{" "}
              {`question${result.length > 1 ? "s" : ""}`} correctly out of{" "}
              {answers?.length} questions
            </p>
          </div>
        </div>
      ) : (
        <div className="relative flex-grow mt-4 bg-white ">
          <div className="flex justify-center items-center">
            <img src={WinnerBadge} alt="" className="" />
          </div>
          <div className="text-center ">
            <h1 className="font-bold">Good Job!</h1>
            <p className="text25 text-[#667085]">
              You answered {result.length} questions correctly out of{" "}
              {answers?.length} questions
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const Result = ({ answers }: { answers: answerObj[] }) => {
  const navigate = useNavigate();

  const attempted = answers.filter(
    (answer) => answer.selected_option_value !== undefined
  );
  return (
    <div className="relative mx-auto flex-grow bg-white  w-[900px] rounded-3xl">
      <div className="">
        <p>
          <GoodRemarkMsg
            answers={answers}
            // setShowYourResult={() => setcurrentStep(STEP_4)}
          />
        </p>

        <p className="text-[24px] font-semibold  text-white ">
          You answered {attempted.length} of {answers.length} questions
        </p>
        {/* </div> */}
      </div>
      <div className="my-3 text-center">
        <h1 className="text-[24px] font-bold ">Your Answers</h1>
      </div>
      <div className=" flex bg-[#FFF7FD] py-10 rounded-3xl   flex-col">
        {answers.map((data, index) => (
          <ResultRow2 {...data} index={index} />
        ))}
        <p className="flex justify-center mt-14 items-center">
          <button
            onClick={() => navigate("/summer-quiz")}
            className="p-3 px-20 text-white bg-[#8530C1] rounded"
          >
            <span className="text20"> Done</span>
          </button>
        </p>
      </div>
    </div>
  );
};

const YourResult = ({ answers }: { answers: answerObj[] }) => {
  const navigate = useNavigate();
  // const [user] = useStore(getUserState);

  return (
    <div className="relative flex-grow    w-[1000px]  bg-red-500 rounded-3xl">
      <div className="my-10 text-center">
        <h1 className="text-[24px] font-bold ">Your Answers</h1>
      </div>
      <div className=" flex bg-[#FFF7FD] py-10 rounded-3xl    flex-col">
        {answers.map((data, index) => (
          <ResultRow2 {...data} index={index} />
        ))}
        <p className="flex justify-center mt-14 items-center">
          <button
            onClick={() => {
              navigate("/summer-quiz");
            }}
            className="p-3 px-20 text-white bg-[#8530C1] rounded"
          >
            Done
          </button>
        </p>
      </div>
    </div>
  );
};

// const ResultRow = ({
//   question,
//   selected_option_value,
//   index,
// }: {
//   question: string;
//   selected_option_value?: string;
//   index?: number;
// }) => {
//   return (
//     <div
//       className={`pt-7 py-5 px-16 ${
//         !selected_option_value && "bg-[#ED1C241A]"
//       } `}
//     >
//       <p className={`flex gap-10 items-center `}>
//         <p className="text-[#8530C1]  rounded-full p-3 bg-white w-[30px] h-[30px] flex justify-center items-center">
//           {(index as number) + 1}
//         </p>
//         <div
//           className={`text-[20px]  w-full flex  justify-between font-semibold `}
//         >
//           <p dangerouslySetInnerHTML={{ __html: question }}></p>
//           <p>
//             {" "}
//             {!selected_option_value && <img src={DangerCircle} alt="image" />}
//           </p>
//         </div>
//       </p>
//       <p
//         className="pl-20 text-[20px] text-[#B5B5C3] py-2"
//         dangerouslySetInnerHTML={{
//           __html: `${selected_option_value ? selected_option_value : "-"}`,
//         }}
//       ></p>
//     </div>
//   );
// };

const ResultRow2 = ({
  question,
  selected_option_value,
  index,
  actual_answer,
}: {
  question: string;
  selected_option_value?: string;
  index?: number;
  actual_answer?: string;
}) => {
  return (
    <div
      className={`pt-7 py-5 px-10 ${
        selected_option_value !== actual_answer && "bg-[#ED1C241A]"
      } `}
    >
      <p className={`flex gap-10 items-center `}>
        <p className="text-[#8530C1]  rounded-full p-3 bg-white w-[40px] h-[40px] flex justify-center items-center text25">
          {(index as number) + 1}
        </p>
        <div
          className={`text-[20px]  w-full flex  justify-between font-semibold `}
        >
          <p dangerouslySetInnerHTML={{ __html: question }}></p>
          {/* <p  dangerouslySetInnerHTML={{ __html: `${!selected_option_value || selected_option_value !== actual_answer ? (
            <img src={DangerCircle} alt="image" />
          ) : (
            <img src={CheckCircle} alt="iamge" />
          )}`}}> </p> */}
        </div>
        <p>
          {!selected_option_value || selected_option_value !== actual_answer ? (
            <img src={DangerCircle} alt="image" className="w-10" />
          ) : (
            <img src={CheckCircle} alt="iamge" className="w-10" />
          )}
        </p>
      </p>

      {selected_option_value === actual_answer && (
        <p
          className="pl-20 text-[20px] text-[#B5B5C3] py-2"
          dangerouslySetInnerHTML={{ __html: `${selected_option_value}` }}
        ></p>
      )}
      {selected_option_value !== actual_answer ? (
        <div>
          <p
            className="pl-16 text-[20px] text-[#B5B5C3] py-2"
            dangerouslySetInnerHTML={{
              __html: `${
                selected_option_value !== actual_answer ? actual_answer : ""
              }`,
            }}
          ></p>
          <p
            className="text-red-500 font=semibold ml-16 flex gap-2 "
            dangerouslySetInnerHTML={{
              __html: ` Answer:${selected_option_value}`,
            }}
          ></p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
