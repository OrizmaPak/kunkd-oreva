// import { Link } from "react-router-dom";
// import Logo from "@/assets/KundaLogo.svg";
// import BellIcon from "@/assets/bellicon.svg";
import SchoolAvatar from "@/assets/SchoolAvatar.png";
// import SearchIcon from "@/assets/searchicon.svg";
import { AiOutlineBell } from "react-icons/ai";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { IoChevronDown } from "react-icons/io5";
import { Menu } from "@mantine/core";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { handleEventTracking } from "@/api/moengage";
import { logOut } from "@/auth/sdk";
import { useNavigate } from "react-router-dom";
import { useGetAttemptAllStudentConnect } from "@/api/queries";
const SchoolDashboardHeader = () => {
  const navigate = useNavigate();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);
  const handLogOut = () => {
    handleEventTracking(
      `web_${
        user?.role == "teacher"
          ? "teacher"
          : user?.role == "user"
          ? "parent"
          : "school"
      }
_logout`,
      {
        user_id: user?.user_id,
        login_date: formattedDate,
      }
    );
    logOut();
    sessionStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  const [user] = useStore(getUserState);
  const { data } = useGetAttemptAllStudentConnect(user?.role === "schoolAdmin");

  const totalSchoolConnectList = data?.data?.data?.totalRecord;

  return (
    <div className="relative flex font-[500] py-4 text-[16px] px-[30px] justify-between items-center z-50 gap-4 h-[8vh] shadow-md bg-white">
      <div>
        <p className=" font-Inter text-[20px] ">
          {user?.school?.name || "Greenfield Academy"}
        </p>
      </div>

      <div className="flex items-center  justify-end pl-2 gap-5">
        <div
          onClick={() => navigate("schooldashboard/request")}
          className="relative cursor-pointer"
        >
          {user?.role === "schoolAdmin" || user?.role === "teacher" ? (
            <div>
              <AiOutlineBell size={22} className={" mx-auto"} color="#667185" />
              <p
                className={`absolute -top-4 text-white  right-[-14px] py-[1px] rounded-full px-[3px] ${
                  totalSchoolConnectList > 0 ? "bg-red-700" : "bg-white"
                }  `}
              >
                {totalSchoolConnectList || 0}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <Menu
          width={250}
          shadow="lg"
          radius={10}
          position="bottom-end" // Adjust the position of the dropdown
          styles={{
            dropdown: {
              transform: "translateX(0px)", // Shift the dropdown 20px to the left
            },
          }}
        >
          <Menu.Target>
            <div className="flex justify-center items-center gap-2 cursor-pointer  rounded-3xl p-2 px-4">
              <img
                loading="lazy"
                src={SchoolAvatar}
                alt="user icon"
                className="w-[40px] h-[40px]"
              />
              <span className="flex items-center gap-2">
                Administrator
                <IoChevronDown size={22} color="#667185" />
              </span>
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigate("schooldashboard/settings")}>
              <p className="flex items-center gap-2 text-[14] text-[#667185] font-Arimo">
                <FaRegUserCircle color="#667185" size={25} />
                Settings
              </p>
            </Menu.Item>

            <hr className="my-2" />

            <Menu.Item>
              <p
                onClick={handLogOut}
                className="flex items-center gap-2 text-[14] text-[#667185] font-Arimo"
              >
                <CiLogout size={25} />
                Log out
              </p>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default SchoolDashboardHeader;
