import PieChart from "@/pages/ProgressReport/PieChart";
import DateRadio from "./Dwmy";
import Bookbg from "@/assets/bookicon.svg";
import AudioIcon from "@/assets/audioicon.svg";
import VideoIcon from "@/assets/videoicon.svg";

const Chart = () => {
  return (
    <div className="rounded-3xl bg-white  p-3">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold">Total Contents</h1>
        <div>
          <DateRadio
            onChange={(value: string) => {
              console.log(value);
            }}
          />
        </div>
      </div>

      <div className="flex gap-8 items-center justify-center ">
        <div className="w-[150px]">
          <PieChart />
        </div>

        <div>
          <Card title="Stories" image={Bookbg} amount="38" />
          <Card title="Audiobooks" image={AudioIcon} amount="42" />
          <Card title="Videos" image={VideoIcon} amount="71" />
        </div>
      </div>
    </div>
  );
};

export default Chart;

const Card = ({
  title,
  image,
  amount,
}: {
  title: string;
  image: string;
  amount: string;
}) => {
  return (
    <div className="grid grid-cols-2   items-center justify-center">
      <span>
        <img src={image} alt="image" className="w-[40px] " />
      </span>
      <p className="flex flex-col">
        <span className="font-bold text-[20px] ">{amount}</span>
        <span>{title}</span>
      </p>
    </div>
  );
};
