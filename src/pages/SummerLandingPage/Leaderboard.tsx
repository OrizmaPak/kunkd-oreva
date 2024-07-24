import Av1 from "@/assets/av1.png";
import Av2 from "@/assets/av2.png";
import Av3 from "@/assets/av3.png";
import Av4 from "@/assets/av4.png";
import Av5 from "@/assets/av5.png";
import Av6 from "@/assets/av6.png";
import Av7 from "@/assets/av7.png";
import Nigeria from "@/assets/nigeria.png";
import America from "@/assets/America.png";
import Ghana from "@/assets/ghana.png";
import Portugal from "@/assets/Potugal.png";
import Australia from "@/assets/Australia.png";
import Laugh01 from "@/assets/laugh01.png";
import Laugh02 from "@/assets/laugh02.png";
import Kite from "@/assets/Kite.png";
import Book from "@/assets/Book Illustration.png";
export type TLeaderBoardData = {
  name: string;
  points: number;
  country: string;
  image: string;
  index: number;
  position: number;
};
export const leaderboarData = [
  {
    name: "Aliyah Ojo",
    points: 190,
    country: Nigeria,
    image: Av1,
    position: 1,
  },
  {
    name: "Alfred Jackson",
    points: 180,
    country: Nigeria,
    image: Av2,
    position: 2,
  },
  {
    name: "Mitchelle Memma",
    points: 170,
    country: America,
    image: Av3,
    position: 3,
  },
  {
    name: "Dapo Ogunmekpon",
    points: 120,
    country: Australia,
    image: Av4,
    position: 4,
  },
  {
    name: "Matthew Postomeni",
    points: 180,
    country: Ghana,
    image: Av5,
    position: 5,
  },
  {
    name: "Elon notmusk",
    points: 120,
    country: Nigeria,
    image: Av6,
    position: 6,
  },
  {
    name: "Ebele Tmare",
    points: 75,
    country: America,
    image: Av7,
    position: 7,
  },
  {
    name: "Michael Jone",
    points: 120,
    country: America,
    image: Av4,
    position: 8,
  },
  {
    name: "Kizito Jamba",
    points: 120,
    country: Portugal,
    image: Av2,
    position: 9,
  },
  {
    name: "Aliyah Ojo",
    points: 120,
    country: Nigeria,
    image: Av1,
    position: 10,
  },
  {
    name: "Alfred Jackson",
    points: 150,
    country: Nigeria,
    image: Av2,
    position: 11,
  },
  {
    name: "Mitchelle Memma",
    points: 80,
    country: America,
    image: Av3,
    position: 12,
  },
  {
    name: "Dapo Ogunmekpon",
    points: 120,
    country: Australia,
    image: Av4,
    position: 13,
  },
  {
    name: "Matthew Postomeni",
    points: 180,
    country: Ghana,
    image: Av5,
    position: 14,
  },
  {
    name: "Elon notmusk",
    points: 120,
    country: Nigeria,
    image: Av6,
    position: 15,
  },
  {
    name: "Ebele Tmare",
    points: 75,
    country: America,
    image: Av7,
    position: 16,
  },
  {
    name: "Michael Jone",
    points: 120,
    country: America,
    image: Av4,
    position: 17,
  },
  {
    name: "Kizito Jamba",
    points: 120,
    country: Portugal,
    image: Av2,
    position: 18,
  },
];
const Leaderboard = () => {
  return (
    <div className="bg-[#8530C1] pad-y-96 pad-x-40 relative">
      <img
        src={Laugh02}
        alt="image"
        className=" absolute bottom-0 left-40 hidden md:block"
      />
      <img
        src={Laugh01}
        alt="image"
        className=" absolute bottom-0 right-40 hidden md:block "
      />
      <img
        src={Kite}
        alt="image"
        className=" absolute top-28 left-40 hidden md:block"
      />
      <img
        src={Book}
        alt="image"
        className=" absolute  top-60 right-40 hidden md:block "
      />

      <div className="max-w-[1440px] mx-auto relative">
        <p className="text30 text-center font-medium text-white">
          The Leaderboard
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 md:mt-14 max-w-[1000px] mx-auto px-1">
          {leaderboarData.map((datta, index) => (
            <Card {...datta} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

const Card = ({ name, country, image, points, index }: TLeaderBoardData) => {
  return (
    <>
      <div className="flex justify-between  py-3 px-4 items-center w-full bg-white rounded-3xl">
        <div className="flex  items-center gap-3">
          {index + 1 === 1 && (
            <p
              className={`rounded-full border-[3px] h-10 w-10 text-center p-1 text-[#FFBB0D] border-[#FFBB0D] bg-[#FFDD28] font-medium`}
            >
              {index + 1}
            </p>
          )}
          {index + 1 === 2 && (
            <p
              className={`rounded-full border-[3px] h-10 w-10 text-center  p-1 text-[#727283] border-[#727283] bg-[#D2D2DF] font-medium`}
            >
              {index + 1}
            </p>
          )}
          {index + 1 === 3 && (
            <p
              className={`rounded-full border-[3px] h-10 w-10 text-center  p-1 text-[#C38144] border-[#C38144] bg-[#DCA16A] font-medium`}
            >
              {index + 1}
            </p>
          )}
          {index + 1 > 3 && (
            <p
              className={`rounded-full border-[3px] h-10 w-10 text-center  p-1 text-[#D2D2DF] border-[#D2D2DF] bg-[#ffff] font-medium`}
            >
              {index + 1}
            </p>
          )}
          <img src={image} alt="image" />
          <div>
            <p className="font-medium text1">{name}</p>
            <p className="text2">{points} Points</p>
          </div>
        </div>
        <div>
          <img src={country} alt="image" />
        </div>
      </div>
    </>
  );
};
