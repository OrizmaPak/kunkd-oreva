import ArrowDown from "@/assets/arrowdown.svg";
import LessThanIcon from "@/assets/lessthanIcon.svg";
import StudentIcon from "@/assets/studentIcon.svg";

import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center w-full  ">
        <div className="flex justify-items-center items-center gap-4">
          <span onClick={() => navigate(-1)} className=" hover:cursor-pointer">
            <img loading="lazy" src={LessThanIcon} alt="" className="" />
          </span>
          <h1 className="text-[25px] font-bold"> Students profile</h1>
        </div>
        <div className="flex justify-end  gap-2 items-center">
          <span className="text-[#8530C1]">Last 7 days:</span>
          <span className="flex gap-2 justify-center items-center">
            <span> May 21 May 28 2023</span>
            <img
              loading="lazy"
              src={ArrowDown}
              alt="Arrowdown"
              className="w-4"
            />
          </span>
        </div>
        <div>
          <button className="text-white bg-[#ED1C24] p-3 flex gap-2  rounded-3xl">
            <img loading="lazy" src={StudentIcon} alt="" />
            <span>Remove student</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
