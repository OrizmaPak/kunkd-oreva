import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { GrNext } from "react-icons/gr";
import { FiExternalLink } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Popover, Text } from "@mantine/core";
import { useGetSummerQuiz } from "@/api/queries";
import { useNavigate } from "react-router-dom";
import { TStoryContent } from "@/api/types";
import { Skeleton } from "@mantine/core";

const PreviewSummerChallengePage = () => {
  const quizId = sessionStorage.getItem("summerQuizId");
  const { data: quiz, isLoading } = useGetSummerQuiz(
    quizId?.toString() as string,
    sessionStorage.getItem("profileId") as string
  );
  const requireData = quiz?.data?.data;

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
              className="text-[18px] font-bold flex"
            >
              Summer Challenge <GrNext size={20} />
            </button>
            <button className="text-[18px] font-bold text-[#8530C1] flex gap-2">
              {requireData?.name}
              <GrNext size={20} color="#8530C1" />
            </button>
          </div>

          {isLoading ? (
            <Skeleton h={500} visible={isLoading} className="mt-10"></Skeleton>
          ) : (
            <div className="grid grid-cols-2 mt-10 bg-gradient-to-r from-[#8530C1]  to-[#3F175B] p-16 rounded-xl ">
              <div>
                <p className="text-[25px] font-Inter font-bold flex-grow-1 mb-10 text-white">
                  {requireData?.name}
                </p>

                {allBooksComplete ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sessionStorage.setItem("backToChallenge", "true");
                      navigate("../summer-challenge-quiz");
                    }}
                    className="px-10 py-3 rounded bg-green-500 text-white"
                  >
                    Take the Quiz{" "}
                  </button>
                ) : (
                  <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="px-10 py-3 rounded bg-green-500 text-white"
                      >
                        Take the Quiz{" "}
                      </button>
                    </Popover.Target>

                    <Popover.Dropdown>
                      <Text size="xs">
                        Before attempting the quiz, all assigned stories must be
                        completed.
                      </Text>
                    </Popover.Dropdown>
                  </Popover>
                )}
              </div>
              <div>
                {" "}
                <p className="text-[25px] font-bold font-Inter text-white">
                  Overview
                </p>
                <p
                  className="text-white"
                  dangerouslySetInnerHTML={{
                    __html: `${requireData?.description}`,
                  }}
                ></p>
                <div className="mt-4 text-[16px] font-semibold font-Inter ">
                  <p className="text-white text-[18px] font-bold ">
                    Stories to read
                  </p>
                  <div className="flex flex-col mt-5">
                    {requireData?.requirements?.map((story: TStoryContent) => {
                      return (
                        <div className="flex justify-between pr-28">
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
                            className="  text-start py-2 text-white flex items-center gap-2 "
                          >
                            <strong className="bg-white rounded-full p-[1px]">
                              {story?.status == "complete" ? (
                                <IoMdCheckmarkCircleOutline
                                  size={30}
                                  color="green"
                                />
                              ) : (
                                <IoMdCheckmarkCircleOutline
                                  size={30}
                                  color="red"
                                />
                              )}
                            </strong>
                            {story?.name}
                          </button>
                          <button
                            onClick={() => {
                              sessionStorage.setItem(
                                "contentId",
                                story.id?.toString() as string
                              );

                              navigate(
                                `../../parent/stories/sub/${story.slug
                                  ?.toLocaleLowerCase()
                                  .replace(/\s/g, "-")}`
                              );
                            }}
                            className="text-white flex gap-2 items-center"
                          >
                            Read
                            <FiExternalLink size={20} color="white" />
                          </button>
                        </div>
                      );
                    })}
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
