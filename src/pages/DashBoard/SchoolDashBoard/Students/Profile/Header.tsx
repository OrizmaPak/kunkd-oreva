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
      <div className="grid grid-cols-3 justify-center items-center w-full px-8 ">
        <div className="flex justify-items-center items-center gap-8">
          <span onClick={() => navigate(-1)}>
            <img src={LessThanIcon} alt="" className="" />
          </span>
          <h1 className="text-[25px] font-bold"> Students profile</h1>
        </div>
        <div className="flex gap-2">
          <span>Sort by</span>
          <span>Newest</span>
          <img src={ArrowDown} alt="Arrowdown" />
        </div>
        <div className="flex justify-end items-end">
          <NewStudent />
        </div>
      </div>
    </div>
  );
};

export default Header;
