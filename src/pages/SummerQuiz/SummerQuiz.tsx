import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import SummerBannerImage from "@/assets/summerBannerImage.png";
// import Quiz1 from "@/assets/Quizone.png";
// import Quiz2 from "@/assets/Quiztwo.png";
import { useGetSummerChallengeQuizzes } from "@/api/queries";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import JoinChanllengeModal from "../AfterParentSignIn/JoinChanllengeModal";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { selectAvatarType } from "../AfterParentSignIn/SelectProfile";
import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import moment from "moment";
const SummerQuiz = () => {
  const { data } = useGetSummerChallengeQuizzes(
    sessionStorage.getItem("profileId") as string
  );
  console.log("summer challenge quizzes", data);
  const quizzes = data?.data?.data?.quizzes;
  const [futureQUiz, setFutureQuiz] = useState([]);
  const [missedQuiz, setMissedQuiz] = useState([]);
  const [completedQuiz, setCompletedQuiz] = useState([]);

  useEffect(() => {
    if (quizzes) {
      const currentTime = moment(); // Current date and time
      const specificTime = moment("12:00", "HH:mm"); // Start time at 12:00:00

      const filteredQuizzes = quizzes.filter(
        (quiz: SummerCardProps) =>
          dayjs().isBefore(quiz?.publish_date, "day") ||
          (dayjs().isSame(quiz?.publish_date, "day") && // Quiz publish date is after current time
            currentTime.isBefore(specificTime))
      );
      setFutureQuiz(filteredQuizzes);

      const filteredMissedQuizzes = quizzes.filter(
        (quiz: SummerCardProps) =>
          dayjs().isAfter(quiz?.publish_date, "day") && // Quiz publish date is after current time
          quiz.completed === false // Current time is after start time (12:00:00)
      );
      setMissedQuiz(filteredMissedQuizzes);

      const filteredCompletedQuizzes = quizzes.filter(
        (quiz: SummerCardProps) =>
          dayjs().isAfter(quiz?.publish_date, "day") && // Quiz publish date is after current time
          quiz.completed === true // Current time is after start time (12:00:00)
      );
      setCompletedQuiz(filteredCompletedQuizzes);
    }
  }, [quizzes]);

  return (
    <div>
      <Wrapper bgColor="white">
        <InnerWrapper>
          <div className="h-[390px] w-full bg-[#8530C1] rounded-2xl grid grid-cols-2">
            <div className="flex justify-center items-center header1 px-10 font-Brico text-white">
              Summer Reading Challenge
            </div>
            <div className=" overflow-hidden ">
              <img
                src={SummerBannerImage}
                alt="image"
                className=" object-cover object-center w-full h-full"
              />
            </div>
          </div>

          <Tabs variant="pills" defaultValue="all" className="mt-20 ">
            <Tabs.List className="mb-10 px-8 text-[21px] ">
              <Tabs.Tab value="all" className="text-[21px]">
                All
              </Tabs.Tab>
              <Tabs.Tab value="completed" className="text-[21px]">
                Completed
              </Tabs.Tab>
              <Tabs.Tab value="missed" className="text-[21px]">
                Missed
              </Tabs.Tab>
              <Tabs.Tab value="incoming" className="text-[21px]">
                Incoming
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="all">
              {" "}
              <div className="grid grid-cols-5  gap-8 justify-center items-center px-8">
                {quizzes?.map((data: SummerCardProps, index: number) => (
                  <SummerQuizCard key={index} {...data} />
                ))}
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="completed">
              {" "}
              {completedQuiz?.length > 0 ? (
                <div className="grid grid-cols-5  gap-8 justify-center items-center px-10">
                  {completedQuiz?.map(
                    (data: SummerCardProps, index: number) => (
                      <SummerQuizCard key={index} {...data} />
                    )
                  )}
                </div>
              ) : (
                <p>⁠Take your first quiz </p>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="missed">
              {" "}
              <div className="grid grid-cols-5  gap-8 justify-center items-center px-10">
                {missedQuiz?.map((data: SummerCardProps, index: number) => (
                  <SummerQuizCard key={index} {...data} />
                ))}
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="incoming">
              {" "}
              <div className="grid grid-cols-5  gap-8 justify-center items-center px-10">
                {futureQUiz?.map((data: SummerCardProps, index: number) => (
                  <SummerQuizCard key={index} {...data} />
                ))}
              </div>
            </Tabs.Panel>
          </Tabs>

          {/* <div className="grid grid-cols-5 mt-20 gap-8 justify-center items-center px-10">
            {quizzes?.map((data: SummerCardProps, index: number) => (
              <SummerQuizCard key={index} {...data} />
            ))}
          </div> */}
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default SummerQuiz;

export type SummerCardProps = {
  name: string;
  id: number;
  publish_date: string;
  completed: boolean;
};
export const SummerQuizCard = ({
  name,
  id,
  publish_date,
  completed,
}: SummerCardProps) => {
  console.log(name, "name");
  const arrayName = name && name?.split(" ");

  const publishDate = dayjs(publish_date);
  const isFuturDate = dayjs().isBefore(publishDate, "day");
  const isToday = dayjs().isSame(publishDate, "day");
  const isPast = dayjs().isAfter(publishDate);
  const [opened, { open, close }] = useDisclosure(false);
  console.log("today", dayjs().format("HH:mm:ss"));

  const specificTime = moment("12:00", "HH:mm"); // Example: 14:30

  // Get the current time
  const currentTime2 = moment();

  // Compare times
  const isPastSpecificTime = currentTime2.isAfter(specificTime);

  const navigate = useNavigate();
  const [profiles] = useStore(getProfileState);

  function findObjectById(array: selectAvatarType[]) {
    // Loop through the array to find the object with id === 5
    for (let i = 0; i < array?.length; i++) {
      if (array[i]?.id === Number(sessionStorage.getItem("profileId"))) {
        return array[i];
      }
    }

    // Return null if no object with id === 5 is found
    return null;
  }

  const profile = findObjectById(profiles);
  // console.log("--------->", profile);
  return (
    <>
      <Modal
        opened={opened}
        radius={6}
        size="md"
        padding={14}
        onClose={close}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
        closeButtonProps={{ size: "lg" }}
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        <JoinChanllengeModal close={close} />
      </Modal>
      <button
        onClick={() => {
          if (profile?.accepted_summer_challenge === false) {
            open();
          } else {
            sessionStorage.setItem("summerQuizId", id.toString());
            navigate("/summer-quiz/preview-summer-challenge");
          }
        }}
        disabled={isFuturDate || (isToday && isPastSpecificTime === false)}
        className={`  ${
          isFuturDate || (isToday && !isPastSpecificTime)
            ? "border-[#D0D5DD] text-[#D0D5DD]"
            : (isPast && completed) ||
              (isToday && isPastSpecificTime && completed)
            ? "bg-[#EBFFE8] text-[#2BB457] border-[#2BB457]"
            : (isPast && !completed) ||
              (isToday && isPastSpecificTime && !completed)
            ? " bg-[#FFEDEA] text-[#ED1C24] border-[#ED1C24]"
            : ""
        }  flex justify-center items-center p-2 flex-col rounded-[16px] w-[200px] h-[135px]  border-[2px]`}
      >
        <p className="text-[20px]">{arrayName && arrayName[0]}</p>
        <p className="font-bold text-[40px]">{arrayName && arrayName[1]}</p>
        {/* {!isFuturDate && !completed && (
          <p className="text-[14px]">You haven't taken this Quiz ⚠</p>
        )} */}
        {isFuturDate ||
          (isToday && !isPastSpecificTime ? (
            <p className="text-[20px]">Coming Soon</p>
          ) : (
            ""
          ))}
      </button>
    </>
  );
};
