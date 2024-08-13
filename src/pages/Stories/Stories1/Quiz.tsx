import { Progress } from "@mantine/core";
import StoriesNav from "./StoriesNav";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RemarkBg from "@/assets/remarkbg.svg";
import RemarkIcon from "@/assets/remarkIcon.svg";
import Button from "@/components/Button";
import { RingProgress, MantineProvider } from "@mantine/core";
// import { Slider, MantineProvider } from "@mantine/core";

import {
  useGetQuiz,
  useSaveQuiz,
  // useSaveQuiz
} from "@/api/queries";
import { STEP_1, STEP_2, STEP_3, STEP_4 } from "@/utils/constants";
import Contour from "@/assets/contour.svg";
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

const Quiz = () => {
  const contentId = sessionStorage.getItem("contentId");
  const { data: quiz, isLoading } = useGetQuiz(contentId?.toString() as string);
  const questions = quiz?.data?.data?.questions;
  const quizId = quiz?.data?.data?.quiz_id;
  const profileId = sessionStorage.getItem("profileId") as string;
  const contentString = sessionStorage.getItem("content");
  const content = JSON.parse(contentString as string);
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

  return (
    <>
      <Wrapper bgColor="#fff7fd">
        <InnerWrapper>
          <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd] w-[100%] ">
            <Skeleton visible={isLoading}>
              <StoriesNav
                category={content?.category}
                genre={content && content.sub_categories[0].sub_category_name}
                title={content && content.name}
                subCategoryId={
                  content && content.sub_categories[0].sub_category_id
                }
                slug={content && content.sub_categories[0].sub_category_name}
                quiz="Quiz"
              />
            </Skeleton>

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
                    />

                    <QuestionPagination
                      handlePagination={handlePagination}
                      totalQuestion={questions && questions?.length}
                      currentQues={questions && currentQues}
                      answers={answers && answers}
                      questions={questions ?? []}
                      handleSelectAnswer={handleSelectAnswer}
                      setShowResult={() => setcurrentStep(STEP_2)}
                    />
                  </div>
                </Skeleton>
              </>
            )}
            {curentStep === STEP_2 && (
              <div className="flex-grow mt-5 pt-10 flex  justify-center items-center  mx-auto w-[100%]  flex-col py-14 bg-white m rounded-3xl ">
                <Result
                  profileId={+profileId}
                  quizId={+quizId as number}
                  answers={answers}
                  setShowRemark={() => setcurrentStep(STEP_3)}
                />
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

export default Quiz;

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
}: {
  quesObject: questionType;
  selected: answerObj[];
  setSelected: (val: answerObj) => void;
  currentQuestion: number;
}) => {
  return (
    <div className=" flex justify-start mt-14 items-center flex-col gap-y-4 flex-grow ">
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
        {quesObject?.option_d && quesObject?.option_d !== "" && (
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
        )}
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
  handleSelectAnswer,
}: {
  handlePagination: (val: string) => void;
  currentQues: number;
  totalQuestion: number;
  answers: answerObj[];
  questions: questionType[];
  setShowResult: () => void;
  handleSelectAnswer: (answer: answerObj) => void;
}) => {
  const question = questions[currentQues];
  const actual_answer = question?.answer
    ? (question[`option_${question?.answer}` as keyof questionType] as string)
    : "";
  const handleNext = () => {
    if (!answers[currentQues]) {
      handleSelectAnswer({
        question: question?.question,
        actual_answer,
      });
    }
    handlePagination("next");
  };
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
            onClick={setShowResult}
            className="py-3 px-16 bg-green-600 rounded  text-white"
          >
            Finish Quiz
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
  setShowYourResult,
  answers,
}: {
  setShowYourResult: () => void;
  answers: answerObj[];
}) => {
  const refreshPage = () => {
    window.location.reload();
  };

  const result = answers.filter(
    (answer) => answer.selected_option_value === answer.actual_answer
  );

  return (
    <>
      {result.length < answers.length / 2 ? (
        <div className="relative flex-grow bg-white ">
          <img
            src={SmileIcon}
            alt="remarkIcon"
            className="absolute left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2"
          />
          <div className="text-center  mt-[290px]">
            <h1 className="font-bold">You can do better!</h1>
            <p className="text-[18px] text-[#B5B5C3]">
              You answered {result.length} questions correct
            </p>
          </div>
        </div>
      ) : (
        <div className="relative flex-grow bg-white ">
          <img
            src={RemarkBg}
            alt=""
            className="absolute left-1/2 top-[30%]  transform -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={RemarkIcon}
            alt="remarkIcon"
            className="absolute left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2"
          />
          <div className="text-center  mt-[290px]">
            <h1 className="font-bold">Good Job!</h1>
            <p className="text-[18px] text-[#B5B5C3]">
              You answered {result.length} questions correct
            </p>
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-between items-center text-white">
          <Button
            onClick={refreshPage}
            size="sm"
            color="black"
            varient="outlined"
          >
            <strong className="text-[#8530C1] py-3">Retake Quiz</strong>
          </Button>
          <div className="flex gap-20">
            <button
              onClick={setShowYourResult}
              className="py-3 px-16 bg-[#8530C1] rounded"
            >
              Review quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Result = ({
  answers,
  profileId,
  quizId,
  setShowRemark,
}: {
  answers: answerObj[];
  profileId: number;
  quizId: number;
  setShowRemark: () => void;
}) => {
  const { mutate, isLoading } = useSaveQuiz();
  const [user] = useStore(getUserState);
  function formatTimeComponent(component: number) {
    return component < 10 ? "0" + component : component;
  }
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
        quiz_id: quizId,
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
          setShowRemark();
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
    <div className="relative mx-auto flex-grow bg-white  w-[780px] rounded-3xl">
      <div className="flex mx-auto relative justify-center items-center gap-10 px-5 bg-[#2BB457] w-[672px] h-[385px] rounded-3xl">
        <img
          src={Contour}
          alt="image"
          className="absolute object-cover w-[100%]"
        />
        <p>
          <RingProgress
            size={300}
            thickness={30}
            sections={[
              {
                value: (100 / answers.length) * attempted.length,
                color: "white",
              },
            ]}
            label={
              <h1 className="font-bold text-white  text-center text-[30px]">
                <span className="text-[40px]">{attempted.length}</span>/
                {answers.length}
              </h1>
            }
            rootColor="rgba(255,255,255,0.4)"
          />
        </p>
        <p className="text-[24px] font-semibold  text-white ">
          You answered {attempted.length} of {answers.length} questions
        </p>
        {/* </div> */}
      </div>
      <div className="my-10 text-center">
        <h1 className="text-[24px] font-bold ">Your Answers</h1>
      </div>
      <div className=" flex bg-[#FFF7FD] py-10 rounded-3xl   flex-col">
        {answers.map((data, index) => (
          <ResultRow {...data} index={index} />
        ))}
        <p className="flex justify-center mt-14 items-center">
          <button
            onClick={handleSaveQuiz}
            className="p-3 px-20 text-white bg-[#8530C1] rounded"
          >
            {isLoading ? (
              <p className="flex justify-center items-center">
                <Loader color="white" size="sm" />
              </p>
            ) : (
              <span className="text3">Submit</span>
            )}
          </button>
        </p>
      </div>
    </div>
  );
};

const YourResult = ({ answers }: { answers: answerObj[] }) => {
  const navigate = useNavigate();
  const [user] = useStore(getUserState);

  return (
    <div className="relative flex-grow    w-[780px] rounded-3xl">
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
              navigate(
                `/${user?.role === "user" ? "parent" : "school"}/stories`
              );
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

const ResultRow = ({
  question,
  selected_option_value,
  index,
}: {
  question: string;
  selected_option_value?: string;
  index?: number;
}) => {
  return (
    <div
      className={`pt-7 py-5 px-16 ${
        !selected_option_value && "bg-[#ED1C241A]"
      } `}
    >
      <p className={`flex gap-10 items-center `}>
        <p className="text-[#8530C1]  rounded-full p-3 bg-white w-[30px] h-[30px] flex justify-center items-center">
          {(index as number) + 1}
        </p>
        <div
          className={`text-[20px]  w-full flex  justify-between font-semibold `}
        >
          <p dangerouslySetInnerHTML={{ __html: question }}></p>
          <p>
            {" "}
            {!selected_option_value && <img src={DangerCircle} alt="image" />}
          </p>
        </div>
      </p>
      <p
        className="pl-20 text-[20px] text-[#B5B5C3] py-2"
        dangerouslySetInnerHTML={{
          __html: `${selected_option_value ? selected_option_value : "-"}`,
        }}
      ></p>
    </div>
  );
};

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
      className={`pt-7 py-5 px-16 ${
        selected_option_value !== actual_answer && "bg-[#ED1C241A]"
      } `}
    >
      <p className={`flex gap-10 items-center `}>
        <p className="text-[#8530C1]  rounded-full p-3 bg-white w-[30px] h-[30px] flex justify-center items-center">
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
            <img src={DangerCircle} alt="image" />
          ) : (
            <img src={CheckCircle} alt="iamge" />
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
                selected_option_value !== actual_answer
                  ? selected_option_value
                  : ""
              }`,
            }}
          ></p>
          <p
            className="text-red-500 font=semibold ml-16 flex gap-2 "
            dangerouslySetInnerHTML={{ __html: ` Answer:${actual_answer}` }}
          ></p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
