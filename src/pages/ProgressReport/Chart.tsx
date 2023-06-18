import React from "react";
import musicIcon from "@/assets/musicbg.svg";
import videoIcon from "@/assets/videobg.svg";
import BookIcon from "@/assets/bookbg.svg";
import PieChart from "./PieChart";

const Chart = () => {
  return (
    <div>
      <div className="flex  justify-between px-10">
        <div className="w-[250px]">
          <PieChart />
        </div>
        <div className=" flex  justify-center items-center gap-14 ">
          <button className="p-4 flex flex-col gap-4 border border-gray-300 rounded-3xl w-[200px] my-4 ">
            <img src={BookIcon} alt="bookicon" className="w-[50%]" />
            <p className="flex flex-col">
              <span className="text-start font-bold text-[20px]">36</span>
              <span>Stories & Quiz</span>
            </p>
          </button>
          <button className="p-4 flex gap-4 flex-col  border border-gray-300 rounded-3xl  w-[200px] my-4">
            <img src={musicIcon} alt="musicicon" className="w-[50%]" />
            <p className="flex flex-col">
              <span className=" text-start font-bold text-[20px]">42</span>
              <span>Audiobooks</span>
            </p>
          </button>
          <button className="p-4 flex flex-col gap-4  border border-gray-300 rounded-3xl w-[200px] my-4">
            <img src={videoIcon} alt="videoicon" className="w-[50%]" />
            <p className="flex flex-col">
              <span className="text-start font-bold text-[20px]">71</span>
              <span>Videos</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chart;
