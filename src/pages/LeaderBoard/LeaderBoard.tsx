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

type TLeaderBoardData = {
  username: string;
  score: number;
  avatar: string;
  country: string;
  country_code: string;
  index: number;
};

const LeaderBoard = () => {
  const { data, isLoading } = useGetLeaderBoardList();
  const leaderboard = data?.data?.data;
  console.log(data);
  return (
    <div>
      <Wrapper bgColor="white">
        <InnerWrapper>
          <div className="p-4">
            <h1 className=" header2  font-Brico font-medium mb-10 pl-4">
              Leader Board
            </h1>

            <div className="flex h-[416px] gap-14">
              <div
                className=" bg-contain bg-no-repeat w-[797px]  bg-center flex-grow "
                style={{ backgroundImage: `url(${LeaderboardBg1})` }}
              >
                <div className=" grid grid-cols-3 gap-10 h-full px-28  pb-14">
                  <div className="flex justify-center items-center flex-col">
                    <p>
                      <img src={SecondMedal} alt="image" />
                    </p>
                    <p className="border-[5px] border-[#A14FDE] rounded-full">
                      <img
                        src={leaderboard && leaderboard[1]?.avatar}
                        alt=""
                        className="w-[70px]  "
                      />
                    </p>
                    <p className="text-white font-bold">
                      {leaderboard && leaderboard[1]?.username}
                    </p>
                    <p className="bg-[#A14FDE] p-2 rounded-xl text-white font-medium px-4">
                      {leaderboard && leaderboard[1]?.score} P
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col pb-20">
                    <p>
                      <img src={FirstMedal} alt="image" />
                    </p>
                    <p className="border-[5px] border-[#A14FDE] rounded-full">
                      <img
                        src={leaderboard && leaderboard[0]?.avatar}
                        alt="image"
                        className="w-[70px] "
                      />
                    </p>
                    <p className="text-white font-bold">
                      {leaderboard && leaderboard[0]?.username}
                    </p>
                    <p className="bg-[#8632C2] p-2 rounded-xl text-white font-medium px-4">
                      {leaderboard && leaderboard[0]?.score} P
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <p>
                      <img src={ThirdMedal} alt="image" />
                    </p>
                    <p className="border-[5px] border-[#A14FDE] rounded-full">
                      <img
                        src={leaderboard && leaderboard[2]?.avatar}
                        alt="image"
                        className="w-[70px]"
                      />
                    </p>
                    <p className="text-white font-bold">
                      {leaderboard && leaderboard[2]?.username}
                    </p>
                    <p className="bg-[#8632C2] p-2 rounded-xl text-white font-medium px-4">
                      {leaderboard && leaderboard[2]?.score} P
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[435px] border-2 border-[#F2F4F7] rounded-3xl p-10 flex flex-col justify-between my-3">
                <div>
                  <p className="text25 text-[#15151566] font-medium">
                    Rank today:
                  </p>
                  <p className="text30 font-bold">1st Place</p>
                </div>
                {/* <div>
                  <p className="text25 text-[#15151566] font-medium">Streak:</p>
                  <p className="text30 font-bold">19 days</p>
                </div> */}
                <div>
                  <p className="text25 text-[#15151566] font-medium">
                    Total points:
                  </p>
                  <p className="text30 font-bold">2,354</p>
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
                {leaderboard?.map((datta: TLeaderBoardData, index: number) => (
                  <Card {...datta} index={index} />
                ))}
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
  index,
  country_code,
}: TLeaderBoardData) => {
  let formattedNumber;

  // Check if the number has decimals
  if (score % 1 !== 0) {
    formattedNumber = score?.toFixed(2); // Rounds to 2 decimal places
  } else {
    formattedNumber = score?.toString(); // Convert to string without formatting
  }
  return (
    <>
      <div className="flex justify-between  py-5 px-8 items-center w-full bg-white rounded-3xl shadow-md my-4">
        <div className="flex  items-center gap-4 flex-grow w-full">
          <p
            className={`rounded-full border-[3px] h-8 w-8 text-center   text-[#D2D2DF] border-[#D2D2DF] bg-[#ffff] font-medium`}
          >
            {index + 1}
          </p>
          <img src={avatar} alt="image" className="w-[60px]" />

          <div>
            <p className="font-bold text1">{username}</p>
          </div>
        </div>
        <div className=" w-full ">
          <p className="text2 text-center text-[#7E7E89] font-medium">
            {formattedNumber} Points
          </p>
        </div>
        <div className="w-full flex justify-end items-end">
          <CountryFlag
            countryCode="NG"
            svg
            style={{ width: "40px", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
};
