import { Link } from "react-router-dom";
// import BellIcon from "@/assets/bellicon.svg";
import UserIcon from "@/assets/usericon.svg";
import ArrowDown from "@/assets/arrowdown.svg";
// import SearchIcon from "@/assets/searchicon.svg";
import { Menu } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import EnterPassCode from "@/pages/DashBoard/SchoolDashBoard/Main/EnterPassCode";
// import { userContext } from "@/Context/StateProvider";
import UserIcon2 from "@/assets/userIcon2.svg";
import KundaLogo from "@/assets/schoolIcon.svg";
import Blxst from "@/assets/Blxst.svg";
import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";
import { getProfileState } from "@/store/profileStore";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import SchLogo from "@/assets/schLogo.svg";

const notificationData = [
  {
    image: Blxst,
    msg: "  is trying to add her child to your class",
    name: "Ella Mia",
  },
  {
    image: Blxst,
    msg: "  is trying to add her child to your class",
    name: "Ella Mia",
  },
];

const SchoolHeader = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [user] = useStore(getUserState);
  const [profile] = useStore(getProfileState);
  const handleDashboard = () => {
    if (user?.role === "teacher") {
      navigate("../teacherdashboard");
    }
    if (user?.role === "schoolAdmin") {
      open();
    }
  };
  const handLogOut = () => {
    navigate("/");
    localStorage.clear();
  };

  const handleChangeProfile = (id: number) => {
    localStorage.setItem("profileId", JSON.stringify(id));
    window.location.reload();
  };
  return (
    <div className="bg-white w-full fixed top-0 h-[8vh] z-50">
      <div className="flex text-[#B5B5C3] text-[14px]  font-normal top-0 left-0 right-0  mx-auto  max-w-[1280px] w-full   py-4   justify-between items-center bg-white  z-[1000] gap-4  h-[8vh] ">
        <Modal
          opened={opened}
          onClose={close}
          centered
          size="lg"
          radius={"xl"}
          closeOnClickOutside={false}
          withCloseButton={false}
        >
          <EnterPassCode onSubmit={close} />

          <style>
            {`
         .mantine-kea9ny {
            background-color: rgba(0, 0, 0, 0.9);
          
          }
          
                `}
          </style>
        </Modal>
        <div className="flex items-center gap-10">
          <Link to="/">
            <div>
              <img
                src={KundaLogo}
                alt="logo"
                width="45.91px"
                height="35pxs"
                className="min-w-[45.91px]"
              />
            </div>
          </Link>

          <div className="flex gap-8">
            <NavLink
              to={user?.role === "parent" ? "parent" : "/school"}
              className={({ isActive }) =>
                isActive ? " text-[#8530C1]" : "text-black"
              }
            >
              <button>Home</button>
            </NavLink>
            {/* <NavLink
              to="/librarynotpaid"
              className={({ isActive }) =>
                isActive ? " text-[#8530C1]" : "text-black"
              }
            >
              <button>Library</button>
            </NavLink> */}
            <NavLink
              to="/mylist"
              className={({ isActive }) =>
                isActive ? " text-[#8530C1]" : "text-black"
              }
            >
              <button>My List</button>
            </NavLink>
            <NavLink
              to="/progressreport"
              className={({ isActive }) =>
                isActive ? " text-[#8530C1]" : "text-black"
              }
            >
              <button>Progress Report</button>
            </NavLink>
          </div>
        </div>

        {/* <div className="max-w-[700px] w-full rounded-3xl  flex  px-4  bg-gray-100  ">
        <img loading="lazy" src={SearchIcon} alt="search icon" className="" />
        <input
          type="text"
          className="w-full h-full py-4 rounded-3xl px-4 focus:outline-none  bg-inherit"
        />
      </div> */}

        <div className="flex items-center justify-center pl-2 gap-10">
          {/* <div className="flex gap-14">
          <button>Home</button>
          <button>Library</button>
          <button>My List</button>
          <button>Progress Report</button>

          <span>
            <img loading="lazy" src={BadgeIcon} alt="badge icon" className="min-w-[17px]" />
          </span>
          <span>
            <img
              src={BatteryIcon}
              alt="battery icon"
              className="min-w-[17px]"
            />
          </span>
          <span>
            <img loading="lazy" src={BellIcon} alt="bell icon" className="min-w-[17px]" />
          </span>
        </div> */}

          <div className="max-w-[700px] w-full rounded-3xl  flex  px-4  bg-gray-100  ">
            {/* <img
              loading="lazy"
              src={SearchIcon}
              alt="search icon"
              className=""
            /> */}
            <AiOutlineSearch size={30} className={" mx-auto my-auto"} />
            <input
              type="text"
              className="w-full h-full py-4 rounded-3xl px-4 focus:outline-none  bg-inherit"
            />
          </div>

          <Menu>
            <Menu.Target>
              <div>
                <span>
                  {/* <img
                    loading="lazy"
                    src={BellIcon}
                    alt="bell icon"
                    className="min-w-[17px]"
                  /> */}
                  <AiOutlineBell
                    size={20}
                    className={" mx-auto"}
                    color="black"
                  />
                </span>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <p className="text-center text-[18px] font-bold my-2">
                Notification
              </p>
              {user?.role === "parent" &&
                notificationData.slice(1).map((data, index) => (
                  // <Menu.Item>
                  <ParentNotification key={index} {...data} />
                  // </Menu.Item>
                ))}
              {user?.role === "schoolAdmin" &&
                notificationData.map((data, index) => (
                  // <Menu.Item>
                  <SchNotification key={index} {...data} />
                  // </Menu.Item>
                ))}
            </Menu.Dropdown>
          </Menu>

          {user?.role === "parent" ? (
            <Menu>
              <Menu.Target>
                <div className="flex justify-center items-center gap-5  px-10 bg-gray-100 rounded-3xl p-2  hover:cursor-pointer">
                  <img
                    loading="lazy"
                    src={UserIcon}
                    alt="user icon"
                    className="w-[30px]"
                  />

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
                <div className="flex flex-col py-2 px-2 ">
                  {profile.map((profile, index) => (
                    <Menu.Item
                      key={index}
                      onClick={() => handleChangeProfile(profile.id)}
                    >
                      <button key={index}>{profile.name}</button>
                    </Menu.Item>
                  ))}

                  <Menu.Item>
                    <button
                      onClick={() => navigate("/account")}
                      className="p-2 px-4 hover:cursor-pointer hover:text-[#8530C1] flex gap-2 items-center"
                    >
                      <img loading="lazy" src={UserIcon2} alt="userIcon" />{" "}
                      <span> Account</span>
                    </button>
                  </Menu.Item>
                  <hr />
                  <Menu.Item>
                    <button
                      onClick={handLogOut}
                      className="p-2 px-4  hover:cursor-pointer  text-red-500"
                    >
                      Sign out of Kunda kids
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Menu>
              <Menu.Target>
                <div className="flex justify-center items-center gap-7  px-6 bg-gray-100 rounded-3xl p-2  hover:cursor-pointer">
                  <img
                    loading="lazy"
                    src={UserIcon}
                    alt="user icon"
                    className="w-[25px]"
                  />

                  <span>
                    <img
                      src={ArrowDown}
                      alt="arrow down icon"
                      className="min-w-[12px]"
                    />
                  </span>
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <div className="flex flex-col py-2 px-1">
                  <Menu.Item>
                    <button
                      onClick={handleDashboard}
                      className="p-2 px-14  hover:cursor-pointer hover:text-[#8530C1]"
                    >
                      Admin
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => navigate("/account")}
                      className="p-2 px-14  hover:cursor-pointer hover:text-[#8530C1]"
                    >
                      Account
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={handLogOut}
                      className="p-2 px-14  hover:cursor-pointer  text-red-500"
                    >
                      Sign out of Kunda kids
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolHeader;

const SchNotification = ({
  image,
  msg,
  name,
}: {
  image: string;
  msg: string;
  name: string;
}) => {
  return (
    <div className="py-1 ">
      <hr />
      <p className="flex my-2 px-6 justify-center items-center gap-2">
        <img
          src={image}
          alt="image"
          className="w-[70px] h-[70px] rounded-full"
        />
        <span className="text-[#8530C1] ml-4">{name}</span>
        <span>{msg}</span>
      </p>
      <p className="my-1  pl-32  flex gap-4 text-white">
        <button className="p-2 px-8 bg-[#F3DAFF] rounded-3xl">Delete</button>
        <button className="p-2 px-8 bg-[#8530C1] rounded-3xl">Accept</button>
      </p>
    </div>
  );
};

const ParentNotification = ({ name }: { name: string }) => {
  return (
    <div className="py-2 w-[400px] ">
      <hr />
      <p className="flex my-2 px-6 justify-center items-center gap-2 ">
        <img
          src={SchLogo}
          alt="image"
          className="w-[40px] h-[40px] rounded-full"
        />
        <span className=" text-[14px] font-medium ml-4">
          <span className="text-[#8530C1]">{name} </span>
          has accepted your request for your child join her class.
        </span>
        <span>Now</span>
      </p>
    </div>
  );
};
