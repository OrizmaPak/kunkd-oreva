import React from "react";
import ArrowDown from "@/assets/arrowdown.svg";
import NewStudent from "../NewStudent";
import LessThanIcon from "@/assets/lessthanIcon.svg";

type Props = {};
import { Navigation, useNavigate } from "react-router-dom";
const Header = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-2 justify-center items-center w-full px-8 ">
        <div className="flex justify-items-center items-center gap-8">
          <span onClick={() => navigate(-1)} className=" hover:cursor-pointer">
            <img src={LessThanIcon} alt="" className="" />
          </span>
          <h1 className="text-[25px] font-bold"> Students profile</h1>
        </div>
        <div className="flex justify-end px-8 gap-2 items-center">
          <span className="text-[#8530C1]">Last 7 days:</span>
          <span className="flex gap-2 justify-center items-center">
            <span> May 21 May 28 2023</span>
            <img src={ArrowDown} alt="Arrowdown" className="w-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
