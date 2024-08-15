import Laugh01 from "@/assets/laugh01.png";
import Laugh02 from "@/assets/laugh02.png";
import Kite from "@/assets/Kite.png";
import Book from "@/assets/Book Illustration.png";
import { useGetLeaderBoardList } from "@/api/queries";
import CountryFlag from "react-country-flag";
import { Skeleton } from "@mantine/core";

export type TLeaderBoardData = {
  username: string;
  position: number;
  score: number;
  avatar: string;
  country: string;
  country_code: string;
};

const Leaderboard = () => {
  const { data, isLoading } = useGetLeaderBoardList();

  const leaderboarData = data?.data?.data;

  return (
    <div className="bg-[#8530C1] pad-y-96 pad-x-40 relative my-20 pb-10">
      <img
        src={Laugh02}
        alt="image"
        className=" absolute bottom-0 left-40 hidden lg:block"
      />
      <img
        src={Laugh01}
        alt="image"
        className=" absolute bottom-0 right-40 hidden lg:block "
      />
      <img
        src={Kite}
        alt="image"
        className=" absolute top-28 left-40 hidden lg:block"
      />
      <img
        src={Book}
        alt="image"
        className=" absolute  top-60 right-40 hidden lg:block "
      />

      <div className="max-w-[1440px] mx-auto relative">
        <p className="header-1 font-Inter text-center font-medium text-white pt-10">
          The Leaderboard
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-x-20 mt-8 md:mt-14 max-w-[1100px] mx-auto px-1">
          {isLoading &&
            new Array(10).fill(1).map((array, index) => (
              <Skeleton key={index} height={60} my={10} visible={true}>
                <h1 className="w-full">{array}</h1>
              </Skeleton>
            ))}
          {leaderboarData?.map((datta: TLeaderBoardData) => (
            <Card {...datta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

const Card = ({
  username,
  avatar,
  score,
  position,
  country_code,
}: TLeaderBoardData) => {
  return (
    <>
      <div className="flex justify-between  py-[10px] md:py-3 px-4 md:px-6 items-center w-full bg-white rounded">
        <div className="flex  items-center gap-3">
          {position === 1 && (
            <strong
              className={`rounded-full border-[3px] h-8 w-8  md:h-10 md:w-10 text-center  md:p-1 text-[#FFBB0D] border-[#FFBB0D] bg-[#FFDD28] font-medium`}
            >
              {position}
            </strong>
          )}
          {position === 2 && (
            <p
              className={`rounded-full border-[3px] h-8 w-8  md:h-10 md:w-10 text-center  md:p-1 text-[#727283] border-[#727283] bg-[#D2D2DF] font-medium`}
            >
              {position}
            </p>
          )}
          {position === 3 && (
            <p
              className={`rounded-full border-[3px] h-8 w-8  md:h-10 md:w-10 text-center  md:p-1 text-[#C38144] border-[#C38144] bg-[#DCA16A] font-medium`}
            >
              {position}
            </p>
          )}
          {position > 3 && (
            <p
              className={`rounded-full border-[3px] h-8 w-8  md:h-10 md:w-10   text-center  md:p-1 text-[#D2D2DF] border-[#D2D2DF] bg-[#ffff] font-medium`}
            >
              {position}
            </p>
          )}
          <img src={avatar} alt="image" className="md:w-[80px] w-[50px]" />
          <div>
            <p className="font-medium text1">{username}</p>
            <p className="text2">{score} Points</p>
          </div>
        </div>
        <div>
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
