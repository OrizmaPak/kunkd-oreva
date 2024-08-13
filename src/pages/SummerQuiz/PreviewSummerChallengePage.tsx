// import InnerWrapper from "@/common/User/InnerWrapper";
// import Wrapper from "@/common/User/Wrapper";
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
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MySummerQuizResult from "./MySummerQuizResult";

const PreviewSummerChallengePage = () => {
  const quizId = sessionStorage.getItem("summerQuizId");
  const { data: quiz, isLoading } = useGetSummerQuiz(
    quizId?.toString() as string,
    sessionStorage.getItem("profileId") as string
  );
  const requireData = quiz?.data?.data;
  const [opened, { open, close }] = useDisclosure(false);
  // const { data } = useGetSummerQuizAnswers(
  //   quizId?.toString() as string,
  //   sessionStorage.getItem("profileId") as string
  // );

  // const myResultData = data?.data?.data;
  // console.log("my quiz answers", myResultData?.completed);
  // const capitalizeFirstLetter = (str: string) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  const checkStatusComplete = (books: TStoryContent[]) => {
    for (let i = 0; i < books?.length; i++) {
      if (books[i]?.status !== "complete") {
        return false; // If any book's status is not 'complete', return false immediately
      }
    }
    return true; // If all books have status 'complete', return true
  };
  const allBooksComplete = checkStatusComplete(requireData?.requirements);
  const navigate = useNavigate();
  return (
    <>
      <Modal
        opened={opened}
        radius={6}
        size="1000px"
        padding={14}
        onClose={close}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
        closeOnClickOutside={true}
        closeButtonProps={{ size: "lg" }}
        centered
        // closeOnClickOutside={false}
        // withCloseButton={false}
      >
        <MySummerQuizResult close={close} />
      </Modal>
      <div>
        <div className="bg-[#8530C1]  h-[30%] overflow-visible ">
          <div className="max-w-[1280px] w -full mx-auto  h-[500px]">
            <div className=" pt-20">
              <div className="flex gap-3 mt-8 y">
                <button
                  onClick={() => navigate("/summer-quiz")}
                  className="text25 font-bold flex text-white"
                >
                  Summer Challenge <GrNext size={30} color="white" />
                </button>
                <button className="text25 font-bold text-white flex gap-2">
                  {requireData?.name}
                  <GrNext size={30} color="white" />
                </button>
              </div>

              {isLoading ? (
                <Skeleton
                  h={500}
                  visible={isLoading}
                  className="mt-10"
                ></Skeleton>
              ) : (
                <div className=" mt-10  rounded-xl ">
                  <div className="flex justify-between">
                    <div className=" w-full flex flex-col">
                      <p className="header1 font-Inter font-bold flex-grow-1  text-white">
                        {requireData?.name}
                      </p>
                      <div className="flex  items-center  gap-3 mt-4">
                        <strong className="text3  h-[28px] w-[56px]    text-[#175CD3]  bg-[#EFF8FF] flex justify-center items-center rounded-[16px]">
                          {requireData?.difficulty?.charAt(0).toUpperCase() +
                            requireData?.difficulty?.slice(1)}
                        </strong>
                        <strong className="text3  text-[#C11574] bg-[#FDF2FA] w-[85px] flex justify-center items-center h-[28px]  text-center  rounded-[16px]">
                          {requireData?.requirements?.length} Stories
                        </strong>
                      </div>
                    </div>
                    <div>
                      {requireData?.completed ? (
                        <button
                          onClick={open}
                          className="w-[200px] w py-3 rounded bg-green-500 text-white"
                        >
                          View Result
                        </button>
                      ) : allBooksComplete ? (
                        <div className="w-[250px] ">
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
                          <p className="text2 font-semibold text-white mt-2">
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
                          <p className="text2 font-semibold text-white w-full mt-2">
                            Read all stories to unlock quiz.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-16">
                    <div className="grid  gap-20 ">
                      <div className=" text-[16px] border-[#B5B5C340] bg-white border-[2px] shadow-lg font-semibold font-Inter  rounded-lg p-[28px] ">
                        <p className="text20 font-Inter text-[#151515] p-3">
                          Read stories below to take Quiz
                        </p>
                        <div className="flex flex-col mt-1 rounded-2xl p-3">
                          <div className="grid   grid-cols-[600px_1fr_1fr] mb-3 ">
                            <p>Stories</p>
                            <p>Action</p>
                            <p>Status</p>
                          </div>
                          {requireData?.requirements?.map(
                            (story: TStoryContent) => {
                              return <TableRow story={story} />;
                            }
                          )}
                        </div>
                      </div>

                      {/* <div className="border-[#B5B5C340] border-[2px] rounded-t-2xl  shadow-lg bg-white  overflow-hidden">
                        <p className="text-[25px] font-bold font-Inter text-black bg-[#B5B5C333] p-[28px]">
                          Overview
                        </p>
                        <p
                          className="text-black  font-Hanken text1  p-[28px]"
                          dangerouslySetInnerHTML={{
                            __html: `${requireData?.description}`,
                          }}
                        ></p>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewSummerChallengePage;

const TableRow = ({ story }: { story: TStoryContent }) => {
  const navigate = useNavigate();
  return (
    <div className="grid   grid-cols-[600px_1fr_1fr]  my-2  border-t-[1px] py-4 ">
      <div>
        <div className="flex gap-4 items-center">
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
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          sessionStorage.setItem("contentId", story.id?.toString() as string);

          navigate(
            `../../parent/stories/sub/${story.slug
              ?.toLocaleLowerCase()
              .replace(/\s/g, "-")}?from=challenge`
          );
        }}
        className="text-white flex gap-2 items-center "
      >
        {story?.status == "complete" ? (
          <p className="bg-[#8530C1] text-white flex gap-2 p-3 rounded items-center justify-center">
            Completed <FiExternalLink size={20} color="white" />
          </p>
        ) : story.status == "ongoing" ? (
          <p
            onClick={() =>
              sessionStorage.setItem(
                "continuePage",
                story?.pages_read?.toString() as string
              )
            }
            className="bg-[#8530C1] text-white  gap-1  p-3 rounded flex items-center justify-center"
          >
            Continue reading <FiExternalLink size={20} color="white" />
          </p>
        ) : (
          <p className="bg-[#8530C1] text-white flex gap-1  p-3 rounded items-center justify-center">
            Read <FiExternalLink size={20} color="white" />
          </p>
        )}
      </button>

      <button
        onClick={() => {
          sessionStorage.setItem("contentId", story.id?.toString() as string);

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
            <img src={CompleteContent} alt="image" /> Completed
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
};
