import React from "react";
import PieChart from "@/pages/ProgressReport/PieChart";
import DateRadio from "@/pages/DashBoard/SchoolDashBoard/Main/Dwmy";
import Bookbg from "@/assets/bookicon.svg";
import AudioIcon from "@/assets/audioicon.svg";
import VideoIcon from "@/assets/videoicon.svg";

const TopContents = () => {
  return (
    <div className="rounded-3xl bg-white  p-3 mt-4">
      <div className="flex justify-between px-16">
        <h1 className="text-[20px] font-bold ">Total Contents</h1>
        <div>
          <DateRadio
            onChange={(value: string) => {
              console.log(value);
            }}
          />
        </div>
      </div>

      <div className="flex gap-28 items-center justify-center  ">
        <div className="w-[250px]">
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

export default TopContents;
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
    <div className="grid grid-cols-2 my-2  items-center justify-center">
      <span>
        <img src={image} alt="image" className="w-[60px] " />
      </span>
      <p className="flex flex-col">
        <span className="font-bold text-[20px] ">{amount}</span>
        <span>{title}</span>
      </p>
    </div>
  );
};
