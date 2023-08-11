import Bookbg from "@/assets/bookbg.svg";
import MusicBg from "@/assets/musicbg.svg";
import VideoBg from "@/assets/videobg.svg";
import QuizBg from "@/assets/quizbg.svg";
const ProgressLog = () => {
  return (
    <div className="bg-white flex flex-col  flex-grow rounded-3xl px-4 py-2 pb-6">
      <div>
        <div className="flex justify-between my-5 ">
          <h1 className="text-[20px] font-bold">Progress Log</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-grow py-4 ">
        <Card image={Bookbg} title="Stories" total="38" />
        <Card image={MusicBg} title="Audiobooks" total="42" />
        <Card image={VideoBg} title="Videos" total="71" />
        <Card image={QuizBg} title="quiz" total="20" />
      </div>
    </div>
  );
};

export default ProgressLog;

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
    <div className=" rounded-3xl py-4 px-3 border border-purple-300">
      <div>
        <img loading="lazy" src={image} alt="image" className="w-[60px]" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-[30px]">{total}</span>
        <span>{title}</span>
      </div>
    </div>
  );
};
