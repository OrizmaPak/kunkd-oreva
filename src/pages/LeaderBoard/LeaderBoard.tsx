import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import LeaderboardBg1 from "@/assets/leaderboardbg1.png";
import { leaderboarData } from "@/pages/SummerLandingPage/Leaderboard";
import { TLeaderBoardData } from "@/pages/SummerLandingPage/Leaderboard";
import FirstMedal from "@/assets/firstMedal.png";
import SecondMedal from "@/assets/secondMedal.png";
import ThirdMedal from "@/assets/thirdMedal.png";
// import { position } from "@chakra-ui/react";

const LeaderBoard = () => {
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
                        src={leaderboarData[1].image}
                        alt=""
                        className="w-[70px]  "
                      />
                    </p>
                    <p className="text-white font-bold">
                      {leaderboarData[1].name}
                    </p>
                    <p className="bg-[#A14FDE] p-2 rounded-xl text-white font-medium px-4">
                      {leaderboarData[1].points} P
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col pb-20">
                    <p>
                      <img src={FirstMedal} alt="image" />
                    </p>
                    <p className="border-[5px] border-[#A14FDE] rounded-full">
                      <img
                        src={leaderboarData[0].image}
                        alt="image"
                        className="w-[70px] "
                      />
                    </p>
                    <p className="text-white font-bold">
                      {leaderboarData[0].name}
                    </p>
                    <p className="bg-[#8632C2] p-2 rounded-xl text-white font-medium px-4">
                      {leaderboarData[0].points} P
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <p>
                      <img src={ThirdMedal} alt="image" />
                    </p>
                    <p className="border-[5px] border-[#A14FDE] rounded-full">
                      <img
                        src={leaderboarData[2].image}
                        alt="image"
                        className="w-[70px]"
                      />
                    </p>
                    <p className="text-white font-bold">
                      {leaderboarData[2].name}
                    </p>
                    <p className="bg-[#8632C2] p-2 rounded-xl text-white font-medium px-4">
                      {leaderboarData[2].points} P
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
                <div>
                  <p className="text25 text-[#15151566] font-medium">Streak:</p>
                  <p className="text30 font-bold">19 days</p>
                </div>
                <div>
                  <p className="text25 text-[#15151566] font-medium">
                    Total points:
                  </p>
                  <p className="text30 font-bold">2,354</p>
                </div>
              </div>
            </div>

            <div className="mt-20">
              {leaderboarData.slice(3).map((datta, index) => (
                <Card {...datta} index={index} />
              ))}
            </div>
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default LeaderBoard;

const Card = ({ name, country, image, points, position }: TLeaderBoardData) => {
  return (
    <>
      <div className="flex justify-between  py-5 px-8 items-center w-full bg-white rounded-3xl shadow-md my-4">
        <div className="flex  items-center gap-4 flex-grow w-full">
          <p
            className={`rounded-full border-[3px] h-8 w-8 text-center   text-[#D2D2DF] border-[#D2D2DF] bg-[#ffff] font-medium`}
          >
            {position}
          </p>
          <img src={image} alt="image" />

          <div>
            <p className="font-bold text1">{name}</p>
          </div>
        </div>
        <div className=" w-full ">
          <p className="text2 text-center text-[#7E7E89] font-medium">
            {points} Points
          </p>
        </div>
        <div className="w-full flex justify-end items-end">
          <img src={country} alt="image" />
        </div>
      </div>
    </>
  );
};
