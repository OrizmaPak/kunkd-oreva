import Bookbg from "@/assets/bookbg.svg";
import MusicBg from "@/assets/musicbg.svg";
import VideoBg from "@/assets/videobg.svg";
import QuizBg from "@/assets/quizbg.svg";
import DateRadio from "@/pages/DashBoard/SchoolDashBoard/Main/Dwmy";
const TotalContent = () => {
  return (
    <div className="bg-white rounded-3xl px-8 py-4">
      <div>
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">Total Content</h1>
          <div>
            <DateRadio
              onChange={(value: string) => {
                console.log(value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Card image={Bookbg} title="Stories" total="38" />
        <Card image={MusicBg} title="Audiobooks" total="42" />
        <Card image={VideoBg} title="Videos" total="71" />
        <Card image={QuizBg} title="quiz" total="20" />
      </div>
    </div>
  );
};

export default TotalContent;

const Card = ({
  image,
  title,
  total,
}: {
  image: string;
  title: string;
  total: string;
}) => {
  return (
    <div className=" rounded-3xl py-4 px-8 border border-purple-300">
      <div>
        <img src={image} alt="image" className="w-[60px]" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-[30px]">{total}</span>
        <span>{title}</span>
      </div>
    </div>
  );
};
