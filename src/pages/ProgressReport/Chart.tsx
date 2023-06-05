import React from "react";
import musicIcon from "@/assets/musicbg.svg";
import videoIcon from "@/assets/videobg.svg";
import BookIcon from "@/assets/bookbg.svg";
import PieChart from "./PieChart";

const Chart = () => {
  return (
    <div>
      <div className="flex gap-10">
        <div className="w-[300px]">
          <PieChart />
        </div>
        <div className=" flex-col">
          <button className="p-4 flex gap-4 border border-gray-300 rounded-3xl w-[200px] my-4 ">
            <img src={BookIcon} alt="bookicon" />
            <p className="flex flex-col">
              <span className="text-start">36</span>
              <span>Stories & Quiz</span>
            </p>
          </button>
          <button className="p-4 flex gap-4  border border-gray-300 rounded-3xl  w-[200px] my-4">
            <img src={musicIcon} alt="musicicon" />
            <p className="flex flex-col">
              <span className=" text-start">42</span>
              <span>Audiobooks</span>
            </p>
          </button>
          <button className="p-4 flex gap-4  border border-gray-300 rounded-3xl w-[200px] my-4">
            <img src={videoIcon} alt="videoicon" />
            <p className="flex flex-col">
              <span className="text-start">71</span>
              <span>Videos</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chart;
