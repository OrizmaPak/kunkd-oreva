import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { GrNext } from "react-icons/gr";
import { FiExternalLink } from "react-icons/fi";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { Popover, Text } from "@mantine/core";
import { useGetSummerQuiz } from "@/api/queries";
import { useNavigate } from "react-router-dom";
import { TStoryContent } from "@/api/types";
import { Skeleton } from "@mantine/core";
import CompleteContent from "@/assets/CompletedContent.png";
import OngoingContent from "@/assets/ongoingcontent.png";
import NotTaken from "@/assets/notstartedcontent.png";
import Lock from "@/assets/lock.png";

const PreviewSummerChallengePage = () => {
  const quizId = sessionStorage.getItem("summerQuizId");
  const { data: quiz, isLoading } = useGetSummerQuiz(
    quizId?.toString() as string,
    sessionStorage.getItem("profileId") as string
  );
  const requireData = quiz?.data?.data;
  // const capitalizeFirstLetter = (str: string) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  console.log("The Selected Quiz", requireData?.requirements);
  const checkStatusComplete = (books: TStoryContent[]) => {
    for (let i = 0; i < books?.length; i++) {
      if (books[i]?.status !== "complete") {
        return false; // If any book's status is not 'complete', return false immediately
      }
    }
    return true; // If all books have status 'complete', return true
  };
  const allBooksComplete = checkStatusComplete(requireData?.requirements);
  console.log("allBooksComplete", allBooksComplete);
  const navigate = useNavigate();
  return (
    <div>
      <Wrapper bgColor="white">
        <InnerWrapper>
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => navigate("/summer-quiz")}
              className="text25 font-bold flex"
            >
              Summer Challenge <GrNext size={30} />
            </button>
            <button className="text25 font-bold text-[#8530C1] flex gap-2">
              {requireData?.name}
              <GrNext size={30} color="#8530C1" />
            </button>
          </div>

          {isLoading ? (
            <Skeleton h={500} visible={isLoading} className="mt-10"></Skeleton>
          ) : (
            <div className="mt-16  rounded-xl ">
              <div className="flex justify-between">
                <div className=" w-full flex flex-col">
                  <p className="header1 font-Inter font-bold flex-grow-1  text-black">
                    {requireData?.name}
                  </p>
                  <div className="flex  items-center  gap-3 mt-4">
                    <strong className="text3  h-[28px] w-[56px]    text-[#175CD3]  bg-[#EFF8FF] flex justify-center items-center rounded-3xl">
                      {requireData?.difficulty?.charAt(0).toUpperCase() +
                        requireData?.difficulty?.slice(1)}
                    </strong>
                    <strong className="text3  text-[#C11574] bg-[#FDF2FA] w-[85px] flex justify-center items-center h-[28px]  text-center  rounded-3xl">
                      {requireData?.requirements?.length} Stories
                    </strong>
                  </div>
                </div>
                <div>
                  {allBooksComplete ? (
                    <div className="w-[250px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sessionStorage.setItem("backToChallenge", "true");
                          navigate("../summer-challenge-quiz");
                        }}
                        className="w-[200px] w py-3 rounded bg-green-500 text-white"
                      >
                        Take the Quiz
                      </button>
                      <p className="text2 font-semibold text-[#8530C1] mt-2">
                        All stories have been completed
                      </p>
                    </div>
                  ) : (
                    <div className="w-[250px]">
                      <button
                        disabled
                        onClick={(e) => {
                          e.stopPropagation();
                          sessionStorage.setItem("backToChallenge", "true");
                          navigate("../summer-challenge-quiz");
                        }}
                        className="w-[200px] w py-3 flex justify-center items-center gap-3 border border-gray-00 rounded bg-white text-gray-400"
                      >
                        <img src={Lock} alt="imge" /> Take the Quiz
                      </button>
                      <p className="text2 font-semibold text-[#8530C1] w-full mt-2">
                        Read all stories to unlock quiz.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-16">
                <div className="grid grid-cols-2 gap-20 ">
                  <div className=" text-[16px] border-[#B5B5C340] border-[2px] font-semibold font-Inter  rounded-lg p-[28px] ">
                    <p className="text20 font-Inter text-[#151515] p-3">
                      Read stories below to take Quiz
                    </p>
                    <div className="flex flex-col mt-1 rounded-2xl p-3">
                      {requireData?.requirements?.map(
                        (story: TStoryContent) => {
                          return (
                            <div className="flex justify-between  my-2  ">
                              <div>
                                <div className="flex justify-center items-center gap-3">
                                  {" "}
                                  <img
                                    src={story?.thumbnail}
                                    alt="image"
                                    className="w-[80px] h-[80px] rounded"
                                  />
                                  <button
                                    onClick={() => {
                                      sessionStorage.setItem(
                                        "contentId",
                                        story.id?.toString() as string
                                      );
                                      if (story?.status === "ongoing") {
                                        sessionStorage.setItem(
                                          "continuePage",
                                          story?.pages_read?.toString() as string
                                        );
                                      }
                                      navigate(
                                        `../../parent/stories/sub/${story.slug
                                          ?.toLocaleLowerCase()
                                          .replace(/\s/g, "-")}?from=challenge`
                                      );
                                    }}
                                    className="  text-start py-2 text-black  items-center gap-2 flex flex-col  "
                                  >
                                    {story?.name}
                                    <strong className="w-full text-start text-[#8530C1] rounded-full flex gap-2 p-[1px]">
                                      Read
                                      <FiExternalLink
                                        size={20}
                                        color="#8530C1"
                                      />
                                      {/* {story?.status == "complete" ? (
                                      <IoMdCheckmarkCircleOutline
                                        size={30}
                                        color="green"
                                      />
                                    ) : (
                                      <IoMdCheckmarkCircleOutline
                                        size={30}
                                        color="red"
                                      />
                                    )} */}
                                    </strong>
                                  </button>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  sessionStorage.setItem(
                                    "contentId",
                                    story.id?.toString() as string
                                  );

                                  navigate(
                                    `../../parent/stories/sub/${story.slug
                                      ?.toLocaleLowerCase()
                                      .replace(/\s/g, "-")}?from=challenge`
                                  );
                                }}
                                className="text-white flex gap-2 items-center "
                              >
                                {story?.status == "complete" ? (
                                  <p className="text-[#039855] flex gap-1 items-center">
                                    <img src={CompleteContent} alt="image" />{" "}
                                    Complete
                                  </p>
                                ) : story.status == "ongoing" ? (
                                  <p
                                    onClick={() =>
                                      sessionStorage.setItem(
                                        "continuePage",
                                        story?.pages_read?.toString() as string
                                      )
                                    }
                                    className="text-[#FBC70D] flex gap-1 items-center"
                                  >
                                    <img src={OngoingContent} alt="image" />
                                    On-going
                                  </p>
                                ) : (
                                  <p className="text-[#B5B5C3] flex gap-1 items-center">
                                    <img src={NotTaken} alt="image" />
                                    Not started
                                  </p>
                                )}
                              </button>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className="border-[#B5B5C340] border-[2px] rounded-t-2xl   overflow-hidden">
                    <p className="text-[25px] font-bold font-Inter text-black bg-[#B5B5C333] p-[28px]">
                      Overview
                    </p>
                    <p
                      className="text-black  font-Hanken text1  p-[28px]"
                      dangerouslySetInnerHTML={{
                        __html: `${requireData?.description}`,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default PreviewSummerChallengePage;
