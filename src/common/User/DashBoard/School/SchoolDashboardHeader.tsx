import { Link } from "react-router-dom";
import Logo from "@/assets/KundaLogo.svg";
import BellIcon from "@/assets/bellicon.svg";
import UserIcon from "@/assets/usericon.svg";
import SearchIcon from "@/assets/searchicon.svg";

const SchoolDashboardHeader = () => {
  return (
    <div className="flex font-[500] py-4 text-[16px] px-[130px] justify-between items-center bg-white z-50 gap-4   h-[8vh] ">
      <Link to="/">
        <div>
          <img
            src={Logo}
            alt="logo"
            width="155.91px"
            height="35pxs"
            className="min-w-[155.91px]"
          />
        </div>
      </Link>
      <div className="max-w-[700px] w-full rounded-3xl  flex  px-4  bg-gray-100  ">
        <img src={SearchIcon} alt="search icon" className="" />
        <input
          type="text"
          className="w-full h-full py-4 rounded-3xl px-4 focus:outline-none  bg-inherit"
        />
      </div>

      <div className="flex items-center justify-center pl-2 gap-20">
        <div className="flex gap-14">
          <span>
            <img src={BellIcon} alt="bell icon" className="min-w-[17px]" />
          </span>
        </div>
        <div className="flex justify-center items-center gap-4  bg-gray-100 rounded-3xl p-2 px-4">
          <img src={UserIcon} alt="user icon" />
          <span>Mikel Daniel</span>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboardHeader;
