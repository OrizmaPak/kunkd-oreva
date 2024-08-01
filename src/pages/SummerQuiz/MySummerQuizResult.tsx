import DangerCircle from "@/assets/Danger Circle.svg";
import CheckCircle from "@/assets/CheckCircle-f.svg";
import { useGetSummerQuizAnswers } from "@/api/queries";
import GoodJob from "@/assets/goodJob.png";
import Excellent from "@/assets/excellent.png";

type TquestionAnswer = {
  question: string;
  selected_option_value?: string;
  index?: number;
  option_a: string;
  option_b: string;
  option_c: string;
  selected_option_key: string;
  option_d: string;
  answer: string;
  actual_answer?: string;
};
const MySummerQuizResult = ({ close }: { close: () => void }) => {
  const quizId = sessionStorage.getItem("summerQuizId");
  const { data } = useGetSummerQuizAnswers(
    quizId?.toString() as string,
    sessionStorage.getItem("profileId") as string
  );

  const questionAnswer = data?.data?.data;
  console.log("my quiz answers", questionAnswer);
  const result = questionAnswer?.questions.filter(
    (answer: TquestionAnswer) => answer?.selected_option_key === answer?.answer
  );
  return (
    <div>
      <div className="relative mx-auto flex-grow bg-white  w-[900px] rounded-3xl">
        <div className="">
          <p>
            <>
              {result?.length < questionAnswer?.questions?.length / 2 ? (
                <div className="">
                  <div className="flex justify-center items-center">
                    <img
                      src={GoodJob}
                      alt="remarkIcon"
                      // className="absolute left-1/2 top-[-150%] transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div className="text-center  ">
                    <h1 className="font-bold"></h1>Good Job!
                    <p className="text25 text-[#667085]">
                      You answered {result?.length}{" "}
                      {`question${result?.length > 1 ? "s" : ""}`} correctly out
                      of {questionAnswer?.questions?.length} questions
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative flex-grow mt-4 bg-white ">
                  <div className="flex justify-center items-center">
                    <img src={Excellent} alt="" className="" />
                  </div>
                  <div className="text-center ">
                    <h1 className="font-bold">Excellent</h1>
                    <p className="text25 text-[#667085]">
                      You answered {result?.length} questions correctly out of{" "}
                      {questionAnswer?.questions?.length} questions
                    </p>
                  </div>
                </div>
              )}
            </>
          </p>

          {/* <p className="text-[24px] font-semibold  text-white ">
            You answered {attempted.length} of {answers.length} questions
          </p> */}
          {/* </div> */}
        </div>
        <div className="my-3 text-center">
          <h1 className="text-[24px] font-bold ">Your Answers</h1>
        </div>
        <div className=" flex bg-[#FFF7FD] py-10 rounded-3xl   flex-col">
          {questionAnswer?.questions?.map(
            (data: TquestionAnswer, index: number) => (
              <ResultRow2 {...data} index={index} />
            )
          )}
          <p className="flex justify-center mt-14 items-center">
            <button
              onClick={() => {
                close();
              }}
              className="p-3 px-20 text-white bg-[#8530C1] rounded"
            >
              <span className="text25">Close</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MySummerQuizResult;

const ResultRow2 = ({
  question,
  //   selected_option_value,
  index,
  option_a,
  option_b,
  option_c,
  option_d,
  selected_option_key,
  answer,
}: //   actual_answer,
{
  question: string;
  selected_option_value?: string;
  index?: number;
  option_a: string;
  option_b: string;
  option_c: string;
  selected_option_key: string;
  option_d: string;
  answer: string;
  actual_answer?: string;
}) => {
  const optionsMap: Record<string, string> = {
    a: option_a,
    b: option_b,
    c: option_c,
    d: option_d,
  };

  return (
    <div
      className={`pt-7 py-5 px-10 ${
        selected_option_key !== answer && "bg-[#ED1C241A]"
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
          {selected_option_key !== answer ? (
            <img src={DangerCircle} alt="image" className="w-10" />
          ) : (
            <img src={CheckCircle} alt="iamge" className="w-10" />
          )}
        </p>
      </p>

      {selected_option_key === answer && (
        <p
          className="pl-20 text-[20px] text-[#B5B5C3] py-2"
          dangerouslySetInnerHTML={{ __html: `${optionsMap[`${answer}`]}` }}
        ></p>
      )}
      {selected_option_key !== answer ? (
        <div>
          <p
            className="pl-16 text-[20px] text-[#B5B5C3] py-2"
            dangerouslySetInnerHTML={{
              __html: `${optionsMap[`${answer}`]}`,
            }}
          ></p>
          <p
            className="text-red-500 font=semibold ml-16 flex gap-2 "
            dangerouslySetInnerHTML={{
              __html: `${optionsMap[`${selected_option_key}`]}`,
            }}
          ></p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
