import { Link } from "react-router-dom";
import Logo from "@/assets/KundaLogo.svg";
import BadgeIcon from "@/assets/badge.svg";
import BatteryIcon from "@/assets/battery.svg";
import BellIcon from "@/assets/bellicon.svg";
import UserIcon from "@/assets/usericon.svg";
import ArrowDown from "@/assets/arrowdown.svg";
import SearchIcon from "@/assets/searchicon.svg";
import { Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const SchoolHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex font-[500] py-4 text-[16px] px-[130px] justify-between items-center bg-white z-50 gap-4  h- h-[8vh] ">
      <div className="flex items-center gap-20">
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

        <div className="flex gap-14">
          <button>Home</button>
          <button>Library</button>
          <button>My List</button>
          <button>Progress Report</button>
        </div>
      </div>

      {/* <div className="max-w-[700px] w-full rounded-3xl  flex  px-4  bg-gray-100  ">
        <img src={SearchIcon} alt="search icon" className="" />
        <input
          type="text"
          className="w-full h-full py-4 rounded-3xl px-4 focus:outline-none  bg-inherit"
        />
      </div> */}

      <div className="flex items-center justify-center pl-2 gap-20">
        {/* <div className="flex gap-14">
          <button>Home</button>
          <button>Library</button>
          <button>My List</button>
          <button>Progress Report</button>

          <span>
            <img src={BadgeIcon} alt="badge icon" className="min-w-[17px]" />
          </span>
          <span>
            <img
              src={BatteryIcon}
              alt="battery icon"
              className="min-w-[17px]"
            />
          </span>
          <span>
            <img src={BellIcon} alt="bell icon" className="min-w-[17px]" />
          </span>
        </div> */}

        <div className="max-w-[700px] w-full rounded-3xl  flex  px-4  bg-gray-100  ">
          <img src={SearchIcon} alt="search icon" className="" />
          <input
            type="text"
            className="w-full h-full py-4 rounded-3xl px-4 focus:outline-none  bg-inherit"
          />
        </div>

        <div>
          <span>
            <img src={BellIcon} alt="bell icon" className="min-w-[17px]" />
          </span>
        </div>

        <Menu>
          <Menu.Target>
            <div className="flex justify-center items-center gap-10  px-10 bg-gray-100 rounded-3xl p-2  hover:cursor-pointer">
              <img src={UserIcon} alt="user icon" className="w-[30px]" />

              <span>
                <img
                  src={ArrowDown}
                  alt="arrow down icon"
                  className="min-w-[17px]"
                />
              </span>
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <div className="flex flex-col py-2 px-1">
              <button className="p-2 px-14  hover:cursor-pointer hover:bg-slate-300 hover:text-[#8530C1]">
                View Profile
              </button>
              <button
                onClick={() => navigate("../schooldashboard")}
                className="p-2 px-14  hover:cursor-pointer hover:bg-slate-300 hover:text-[#8530C1]"
              >
                Dashboard
              </button>
              <button className="p-2 px-14  hover:cursor-pointer hover:bg-slate-300 hover:text-[#8530C1]">
                Setting
              </button>
              <button className="p-2 px-14  hover:cursor-pointer hover:bg-slate-300 text-red-500">
                Log Out
              </button>
            </div>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default SchoolHeader;
