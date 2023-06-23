import React from "react";
import SearchIcon from "@/assets/searchicon.svg";
import musicIcon from "@/assets/svgmusic.svg";
import videoIcon from "@/assets/svgvideo.svg";
import BookIcon from "@/assets/svgbook.svg";
import ArrowDown from "@/assets/arrowdown.svg";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-10 px-24">
        <h1 className="font-bold font-Recoleta text-[30px]">My List</h1>
        <span>
          <img src={SearchIcon} alt="SearchIcon " className="" />
        </span>
      </div>

      <div className="flex justify-between items-center p">
        <div className="flex gap-4 pb-4 pl-24">
          <button className="bg-[#FBECFF] flex py-4 px-8 gap-4 rounded-full items-center justify-center">
            <img src={BookIcon} alt="" />
            <span className=" text-[#8530C1]">Stories</span>
          </button>
          <button className="bg-[#FFEDEA] flex py-4 px-8 gap-4 rounded-full items-center justify-center">
            <img src={musicIcon} alt="" />
            <span className="text-[#ED1C24]">Audiobooks</span>
          </button>
          <button className=" bg-[#EBFFE8] flex py-4 px-8 gap-4 rounded-full items-center justify-center">
            <img src={videoIcon} alt="" />
            <span className="text-[#2BB457]">African Languages</span>
          </button>
        </div>

        <span className="flex mr-14 gap-4">
          Recently Added <img src={ArrowDown} alt="arrow down" />
        </span>
      </div>
    </div>
  );
};

export default Header;
