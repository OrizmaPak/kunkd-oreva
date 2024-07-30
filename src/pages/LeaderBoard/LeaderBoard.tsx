import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import LeaderboardBg1 from "@/assets/leaderboardbg1.png";
// import { TLeaderBoardData } from "@/pages/SummerLandingPage/Leaderboard";
import FirstMedal from "@/assets/firstMedal.png";
import SecondMedal from "@/assets/secondMedal.png";
import ThirdMedal from "@/assets/thirdMedal.png";
// import { position } from "@chakra-ui/react";
import CountryFlag from "react-country-flag";
import { useGetLeaderBoardList } from "@/api/queries";
import { Skeleton } from "@mantine/core";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TopLeaderboardModal from "../SummerQuiz/TopLeaderboardModal";
import { FaArrowRight } from "react-icons/fa6";

type TLeaderBoardData = {
  username: string;
  score: number;
  avatar: string;
  country: string;
  country_code: string;
  position: number;
};

const LeaderBoard = () => {
  const [
    openedTopLeaderboard,
    { open: openTopLeaderboard, close: closeTopLeaderboard },
  ] = useDisclosure(false);
  const profileId = sessionStorage.getItem("profileId");
  const { data, isLoading } = useGetLeaderBoardList(profileId as string);
  const capitalizeFirstLetter = (str: string) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  };
  const leaderboard = data?.data?.data;

  const viewProfile = leaderboard?.[leaderboard.length - 1];
  const firstPosition = leaderboard?.find(
    (data: TLeaderBoardData) => data?.position == 1
  );
  const secondPosition = leaderboard?.find(
    (data: TLeaderBoardData) => data?.position == 2
  );
  const thirdPosition = leaderboard?.find(
    (data: TLeaderBoardData) => data?.position == 3
  );

  function removeElements(arr: TLeaderBoardData[]) {
    if (arr?.length <= 3) {
      return [];
    }
    return arr?.slice(3, -1);
  }
  const leaderboardTable = removeElements(leaderboard);

  return (
    <div>
      <Modal
        opened={openedTopLeaderboard}
        radius={6}
        size="lg"
        padding={14}
        onClose={closeTopLeaderboard}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
        closeButtonProps={{ size: "lg" }}
        centered
        // closeOnClickOutside={false}
        // withCloseButton={false}
      >
        <TopLeaderboardModal />
      </Modal>
      <Wrapper bgColor="white">
        <InnerWrapper>
          <div className="p-4">
            <div className="flex justify-between">
              <h1 className=" header2  font-Inter font-medium mb-10 pl-4 ">
                Leaderboard
              </h1>
              <button
                onClick={openTopLeaderboard}
                className="text25 text-[#8530C1] font-Inter flex gap-2"
              >
                Read how to top the leaderboard here?{" "}
                <FaArrowRight color="#8530C1" size={30} />
              </button>
            </div>

            <div className="flex h-[416px] gap-10 ">
              <div
                className=" bg-contain bg-no-repeat w-[797px]   bg-left flex-grow b "
                style={{ backgroundImage: `url(${LeaderboardBg1})` }}
              >
                <div className=" grid grid-cols-3 gap-10 h-full px-28  pb-14">
                  <div className="flex justify-center items-center flex-col ">
                    <p>
                      <img src={SecondMedal} alt="image" />
                    </p>
                    <p className="border-[5px] border-[#A14FDE] rounded-full">
                      <img
                        src={secondPosition && secondPosition?.avatar}
                        alt=""
                        className="w-[70px]  "
                      />
                    </p>
                    <p className="text-white font-bold">
                      {secondPosition &&
                        capitalizeFirstLetter(secondPosition?.username)}
                    </p>
                    <p className="bg-[#A14FDE] p-2 rounded-xl text-white font-medium px-4">
                      {secondPosition && secondPosition?.score} P
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col pb-20 ">
                    <p>
                      <img src={FirstMedal} alt="image" />
                    </p>
                    <p className="border-[5px] border-[#A14FDE] rounded-full ">
                      <img
                        src={firstPosition && firstPosition?.avatar}
                        alt="image"
                        className="w-[70px] "
                      />
                    </p>
                    <p className="text-white font-bold">
                      {firstPosition &&
                        capitalizeFirstLetter(firstPosition?.username)}
                    </p>
                    <p className="bg-[#8632C2] p-2 rounded-xl text-white font-medium px-4">
                      {firstPosition && firstPosition?.score} P
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col ">
                    <p>
                      <img src={ThirdMedal} alt="image" />
                    </p>
                    <p className="border-[5px] border-[#A14FDE] rounded-full">
                      <img
                        src={thirdPosition && thirdPosition.avatar}
                        alt=""
                        className="w-[70px]"
                      />
                    </p>
                    <p className="text-white font-bold">
                      {thirdPosition &&
                        capitalizeFirstLetter(thirdPosition?.username)}
                    </p>
                    <p className="bg-[#8632C2] p-2 rounded-xl text-white font-medium px-4">
                      {thirdPosition?.score} P
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-[435px] border-2 border-[#F2F4F7] rounded-3xl p-10 flex flex-col justify-between my-3">
                {viewProfile == undefined ? (
                  <p className="text30  font-Hanken">
                    Take your first quiz to see your rank and point
                  </p>
                ) : (
                  <div className="flex  justify-start  items-center gap-6">
                    <p className="text25 text-[#15151566] font-medium ">
                      <img
                        src={viewProfile?.avatar}
                        alt="image"
                        className="w-[70px]"
                      />
                    </p>
                    <p className="text-[36px] font-bold tracking-wide">
                      {capitalizeFirstLetter(viewProfile?.username)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text25 text-[#15151566] font-medium tracking-wider">
                    My today Rank:
                  </p>
                  <p className="text-[36px] font-bold font-Hanken tracking-wider">
                    {viewProfile?.position || 0}
                  </p>
                </div>

                <div>
                  <p className="text25 text-[#15151566] font-medium tracking-wider">
                    Total points:
                  </p>
                  <p className="text-[36px] font-bold font-Hanken  tracking-wider">
                    {viewProfile?.score || 0}
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <p>
                {isLoading &&
                  new Array(10).fill(1).map((array, index) => (
                    <Skeleton key={index} height={60} my={10} visible={true}>
                      <h1 className="w-full">{array}</h1>
                    </Skeleton>
                  ))}
              </p>
            ) : (
              <div className="mt-20">
                {leaderboardTable?.map(
                  (datta: TLeaderBoardData, index: number) => (
                    <Card {...datta} key={index} />
                  )
                )}
              </div>
            )}
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default LeaderBoard;

const Card = ({
  username,
  avatar,
  score,
  position,
  country_code,
}: //
TLeaderBoardData) => {
  let formattedNumber;

  // Check if the number has decimals
  if (score % 1 !== 0) {
    formattedNumber = score?.toFixed(2); // Rounds to 2 decimal places
  } else {
    formattedNumber = score?.toString(); // Convert to string without formatting
  }
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <>
      <div className="flex justify-between  py-5 px-8 items-center w-full bg-white rounded-3xl shadow-md my-4">
        <div className="flex  items-center gap-4 flex-grow w-full">
          <p
            className={`rounded-full border-[3px] h-8 w-8 text-center   text-[#D2D2DF] border-[#D2D2DF] bg-[#ffff] font-medium`}
          >
            {position}
          </p>
          <img src={avatar} alt="image" className="w-[60px]" />

          <div>
            <p className="font-bold text1">{capitalizeFirstLetter(username)}</p>
          </div>
        </div>
        <div className=" w-full ">
          <p className="text2 text-center text-[#7E7E89] font-medium">
            {formattedNumber} Points
          </p>
        </div>
        <div className="w-full flex justify-end items-end">
          <CountryFlag
            countryCode={country_code}
            svg
            style={{ width: "40px", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
};
