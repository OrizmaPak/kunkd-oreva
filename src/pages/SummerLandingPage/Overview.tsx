import Button from "@/components/Button";
import { CiCalendar } from "react-icons/ci";
import { LuSmilePlus } from "react-icons/lu";
import { LuUserPlus } from "react-icons/lu";

const Overview = () => {
  return (
    <div className="bg-[#8530C1] pad-y-96 pad-x-10 ">
      <div className="max-w-[1440px] mx-auto relative">
        <div className="grid  grid-cols-1 md:grid-cols-2  gap-5 md:gap-10 mx-auto text1  max-w-[800px]   px-3">
          <div className="">
            <p className="text-[#a5a1a1] text-center md:text-start font-InterReg ">
              TIMELINE
            </p>
            <p className="text-white text20 flex gap-2 font-medium  justify-center items-center md:justify-start font-InterReg">
              <CiCalendar size={25} /> August 1st - August 21st, 2024.
            </p>
          </div>
          <div className="  text-[#a5a1a1] flex md:justify-end md:items-end flex-col">
            <p className="md:pr-4 text-center font-InterReg"> ELIGIBILITY</p>
            <p className="text-white flex gap-2 font-medium text20 justify-center items-center md:justify-start font-InterReg">
              <LuSmilePlus size={25} />
              All young scholars aged 6 to 10
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6 md:mt-14">
          <Button
            size="md"
            className="text-black bg-white flex gap-1 font-Inter"
          >
            <LuUserPlus size={20} />
            Sign Up for the Summer Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
