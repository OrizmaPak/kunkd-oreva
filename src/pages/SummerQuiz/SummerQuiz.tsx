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

const SummerQuiz = () => {
  const { data } = useGetSummerChallengeQuizzes(
    sessionStorage.getItem("profileId") as string
  );
  console.log("summer challenge quizzes", data);
  const quizzes = data?.data?.data?.quizzes;
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

          <div className="grid grid-cols-5 mt-20 gap-8 justify-center items-center px-10">
            {quizzes?.map((data: SummerCardProps, index: number) => (
              <SummerQuizCard key={index} {...data} />
            ))}
          </div>
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
  const isFuturDate = dayjs().isBefore(publishDate);
  const isToday = dayjs().isSame(publishDate);
  const isPast = dayjs().isAfter(publishDate);
  const [opened, { open, close }] = useDisclosure(false);

  console.log("heeeeeeeee", {
    isFuturDate,
    today: dayjs().format("YYYY-MM-DD"),
    publish_date,
    isToday,
    isPast,
  });
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
  console.log("--------->", profile);
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
        disabled={isFuturDate}
        className={`  ${
          isFuturDate && !completed
            ? "border-[#D0D5DD] border-[2px] text-[#D0D5DD]"
            : isPast || (isToday && !completed)
            ? "bg-[#EBFFE8] text-[#2BB457]"
            : " bg-[#EBFFE8] text-[#2BB457]"
        }  flex justify-center items-center p-2 flex-col rounded w-[200px] h-[135px]`}
      >
        <p className="text-[20px]">{arrayName && arrayName[0]}</p>
        <p className="font-bold text-[20px]">{arrayName && arrayName[1]}</p>
        {/* {!isFuturDate && !completed && (
          <p className="text-[14px]">You haven't taken this Quiz ⚠</p>
        )} */}
        {isFuturDate && <p className="text-[20px]">Coming Soon</p>}
      </button>
    </>
  );
};
