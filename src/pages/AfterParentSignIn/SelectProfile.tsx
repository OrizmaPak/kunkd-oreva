import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import Hero from "./Hero";
import userImage from "@/assets/userimage1.svg";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import CardNdRange from "@/common/User/CardNdRange";
import AdsButton from "@/common/User/AdsButton";
import {
  data,
  DataType,
} from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";

import { STEP_1, STEP_2, STEP_3, STEP_4, STEP_5 } from "@/utils/constants";
import { useState } from "react";
import {
  WelcomeModal,
  ChildAgeModal,
  ChildNameModal,
  SelectAvatar,
  WellDoneModal,
} from "./ChildProfileSetUp";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import LessDownIcon from "@/assets/lessthanIcon.svg";
import Avatar1 from "@/assets/Avatar1.svg";
import Avatar2 from "@/assets/Avatar2.svg";
import Avatar3 from "@/assets/Avatar3.svg";
import Avatar4 from "@/assets/Avatar4.svg";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@/assets/groupIcons.svg";

const SelectProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${GroupIcon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        className="relative h-screen w-full flex justify-center items-center  "
      >
        <div>
          <div className="text-center  font-bold  mb-10 text-black">
            <h1 className="text-[60px] font-Recoleta">Who's Learning?</h1>
            <p className=" font-Hanken">Select which kid is learning now </p>
          </div>
          <div className="flex text-white text-center gap-10 justify-center items-center bg-transparent">
            <p>
              <img
                onClick={() => navigate("/parenthomepage")}
                src={Avatar1}
                alt="avatar"
                className=" cursor-pointer"
              />
              <span className="text-black">Ema</span>
            </p>

            <p>
              <img
                onClick={() => navigate("/parenthomepage")}
                src={Avatar2}
                alt="avatar"
                className=" cursor-pointer"
              />
              <span className="text-black">Mabel</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectProfile;
