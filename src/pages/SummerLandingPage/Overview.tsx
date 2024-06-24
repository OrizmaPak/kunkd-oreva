import Button from "@/components/Button";
import { CiCalendar } from "react-icons/ci";
import { LuSmilePlus } from "react-icons/lu";
import { LuUserPlus } from "react-icons/lu";
import Ball from "@/assets/ball.png";
import ABCPencil from "@/assets/abcpencil.png";

const Overview = () => {
  return (
    <div className="bg-[#8530C1] pad-y-96 pad-x-10 ">
      <div className="max-w-[1440px] mx-auto relative">
        <img src={Ball} alt="" className=" absolute hidden lg:block" />
        <img
          src={ABCPencil}
          alt=""
          className=" absolute bottom-[40px] right-0 hidden lg:block "
        />
        <div className="flex justify-center items-center ">
          <button className="bg-[rgba(214,211,211,.5)] p-2 px-3 text1 tracking-wider rounded-full text-white mb-2">
            Overview
          </button>
        </div>
        <p className="header2 text-center text-white  font-medium max-w-[950px] mx-auto px-2">
          The competition aims to encourage reading and celebrate a love of
          books. <br />
          Participants have to be subscribed users on the platform
        </p>

        <div className="grid  grid-cols-1 md:grid-cols-2 mt-10 gap-5 md:gap-10 mx-auto text1  max-w-[500px]   px-3">
          <div className="">
            <p className="text-[#a5a1a1] text-center md:text-start">TIMELINE</p>
            <p className="text-white text20 flex gap-2 font-medium  justify-center items-center md:justify-start ">
              <CiCalendar size={25} /> 25 June – 25 July 2024
            </p>
          </div>
          <div className="  text-[#a5a1a1] flex md:justify-end md:items-end flex-col">
            <p className="md:pr-4 text-center"> ELIGIBILITY</p>
            <p className="text-white flex gap-2 font-medium text20 justify-center items-center md:justify-start">
              <LuSmilePlus size={25} />
              Age 5 - 10
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6 md:mt-8">
          <Button size="md" className="text-black bg-white flex gap-1">
            {" "}
            <LuUserPlus size={20} />
            Register for the Summer Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
