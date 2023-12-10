import Bookbg from "@/assets/bookbg.svg";
import MusicBg from "@/assets/musicbg.svg";
import QuizBg from "@/assets/quizbg.svg";
import VideoBg from "@/assets/videobg.svg";
import { TLogData } from "../../Main/Main";




const ProgressLog = ({
  logData
}: {
  logData?:TLogData
}) => {

 
  return (
    <div className="bg-white flex flex-col  flex-grow rounded-3xl px-6 py-2 pb-6 ">
      <div>
        <div className="flex justify-between my-5 ">
          <h1 className="text-[20px] font-bold">Progress Log</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-grow py-4 ">
        <Card image={Bookbg} title="Stories" total={logData?.stories} />
        <Card image={MusicBg} title="Audiobooks" total={logData?.audio_books} />
        <Card image={VideoBg} title="Videos" total={logData?.languages}  />
        <Card image={QuizBg} title="quiz" total={logData?.quiz} />
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
  total?: number;
}) => {
  return (
    <div className=" rounded-3xl  p-6 border border-purple-300">
      <div>
        <img loading="lazy" src={image} alt="image" className="w-[38px]" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text25 ">{total ? total : 0}</span>
        <span className="text3">{title}</span>
      </div>
    </div>
  );
};
