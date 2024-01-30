import { Link } from "react-router-dom";
import ArrowDown from "@/assets/arrowdown.svg";
import UserIcon from "@/assets/usericon.svg";
import { Menu, Popover } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetMainSearch } from "@/api/queries";
import KundaLogo from "@/assets/schoolIcon.svg";
// import UserIcon2 from "@/assets/userIcon2.svg";
import useDebounce from "@/hooks/useDebounce";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { useState } from "react";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { selectAvatarType } from "@/pages/AfterParentSignIn/SelectProfile";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAttemptAllStudentConnect,
  useGetAttemptStudentConnect,
} from "@/api/queries";
import { TRequestStudents } from "@/pages/DashBoard/TeacherDashboard/Request/Request";
import { LuUser2 } from "react-icons/lu";
import { logOut } from "@/auth/sdk";

type THints = {
  id: number;
  file: string;
  name: string;
  content_category: string;
  content_id: number;
  order: number;
  slug: string;
  content_type: string;
  media_type: string;
  thumbnail: string;
};

const SchoolHeader = ({
  childProfile,
  setChildProfile,
}: {
  childProfile: string;
  setChildProfile: (val: string) => void;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user] = useStore(getUserState);
  const [profiles, setProfiles] = useStore(getProfileState);
  const [dashboardActive, setDashboardActive] = useState(false);
  const handleDashboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem("schoolDashboard", "true");
    setDashboardActive(true);
    e.preventDefault();
    if (user?.role === "teacher") {
      navigate("../teacherdashboard");
    }
    if (user?.role === "schoolAdmin") {
      // open();
      navigate("../schooldashboard");
    }
  };
  const handLogOut = () => {
    logOut();
    localStorage.clear();
    setProfiles([]);
    navigate("/");
  };

  const handleChangeProfile = (id: number) => {
    setChildProfile(id.toString());
    navigate("/parent");
    queryClient.invalidateQueries(["GetOngoingContents"]);
  };

  const currentId = childProfile;
  const currentProfile: selectAvatarType | undefined = profiles?.find(
    (profile: selectAvatarType) => profile.id === Number(currentId)
  );

  const { data } = useGetAttemptAllStudentConnect(user?.role === "schoolAdmin");
  const { data: classConnect } = useGetAttemptStudentConnect(
    user?.role === "teacher"
  );
  const schoolConnectList = data?.data?.data?.records;
  const totalSchoolConnectList = data?.data?.data?.totalRecord;
  const classConnectList = classConnect?.data?.data?.records;
  const totalConnectList = classConnect?.data?.data?.totalRecord;

  return (
    <div className="bg-white w-full fixed top-0 h-[8vh] z-50">
      <div className="flex text-[#B5B5C3] text-[15px] text3  font-medium top-0 left-0 right-0  mx-auto  app-mai-nwidth-container  w-full   py-4   justify-between items-center bg-white  z-[1000] gap-4  h-[8vh] ">
        <div className="flex items-center gap-10">
          <Link
            onClick={() => {
              setDashboardActive(false);
            }}
            to="/"
          >
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

          <div className="flex gap-8 ">
            <NavLink
              onClick={() => {
                setDashboardActive(false);
              }}
              to={user?.role === "user" ? "/parent" : "/school"}
              // to={"/school"}
              className={({ isActive }) =>
                isActive ? " text-[#8530C1]" : "text-[#B5B5C3]"
              }
            >
              <button className="text-[16px]  font-bold">Home</button>
            </NavLink>

            <NavLink
              onClick={() => {
                setDashboardActive(false);
              }}
              to="/mylist"
              className={({ isActive }) =>
                isActive
                  ? " text-[#8530C1] font-medium"
                  : "text-[#B5B5C3] font-medium"
              }
            >
              <button className="text-[16px]  font-bold">My List</button>
            </NavLink>
            <NavLink
              onClick={() => {
                setDashboardActive(false);
              }}
              to="/progressreport"
              className={({ isActive }) =>
                isActive ? " text-[#8530C1]" : "text-[#B5B5C3]"
              }
            >
              <button className="text-[16px]  font-bold">
                Progress Report
              </button>
            </NavLink>

            <p className="w-40  flex justisfy-center item-center">
              {user?.role === "schoolAdmin" && (
                <button
                  onClick={handleDashboard}
                  className={` block text-[16px]  font-bold ${
                    dashboardActive ? " text-[#8530C1]" : "text-[#B5B5C3]"
                  }`}
                >
                  School Dashboard
                </button>
              )}
              {user?.role === "teacher" && user?.status === "active" ? (
                <button
                  onClick={handleDashboard}
                  className={` block text-[16px]  font-bold ${
                    dashboardActive ? " text-[#8530C1]" : "text-[#B5B5C3]"
                  }`}
                >
                  Teacher Dashboard
                </button>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pl-2 gap-10 ">
          <SearchService />

          <Menu>
            {" "}
            <Menu.Target>
              <div className="relative">
                {user?.role === "schoolAdmin" || user?.role === "teacher" ? (
                  <div>
                    <AiOutlineBell
                      size={20}
                      className={" mx-auto"}
                      color="black"
                    />
                    <p
                      className={`absolute -top-4 text-white  right-[-14px] py-[1px] rounded-full px-[3px] ${
                        totalSchoolConnectList > 0 || totalConnectList > 0
                          ? "bg-red-700"
                          : "bg-white"
                      }  `}
                    >
                      {totalSchoolConnectList || totalConnectList || 0}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Item> */}
              <SchNotification
                data={
                  user?.role === "schoolAdmin"
                    ? schoolConnectList
                    : classConnectList
                }
              />
              {/* </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>

          {user?.role === "parent" || user?.role === "user" ? (
            <Menu>
              <Menu.Target>
                <div className="flex justify-center items-center gap-5  px-6 bg-gray-100 rounded-3xl p-2  hover:cursor-pointer">
                  <img
                    loading="lazy"
                    src={currentProfile ? currentProfile.image : UserIcon}
                    alt="user icon"
                    className="w-[24px] h-[24px] object-cover rounded-full"
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
                  {profiles?.map((profile, index) => (
                    <Menu.Item
                      key={index}
                      onClick={() => handleChangeProfile(profile.id)}
                    >
                      <button className="py-1" key={index}>
                        {profile?.name.charAt(0).toUpperCase() +
                          profile?.name.slice(1)}
                      </button>
                    </Menu.Item>
                  ))}

                  <Menu.Item onClick={() => navigate("/account")}>
                    <button
                      onClick={() => navigate("/account")}
                      className="hover:cursor-pointer hover:text-[#8530C1] flex gap-2 items-center "
                    >
                      <LuUser2 size={25} color={"gray"} /> <span> Account</span>
                    </button>
                  </Menu.Item>
                  <hr />
                  <Menu.Item onClick={handLogOut}>
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
                <div className="flex justify-center items-center gap-7  h-[42px] px-6 bg-gray-100 rounded-3xl p-2  hover:cursor-pointer">
                  <img
                    loading="lazy"
                    src={user?.user_image ? user.user_image : UserIcon}
                    alt="user icon"
                    className="w-[24px] h-[24px] object-cover rounded-full"
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
                  {/* <Menu.Item>
                    <button
                      onClick={handleDashboard}
                      className="p-2 px-4  hover:cursor-pointer hover:text-[#8530C1]"
                    >
                      Admin
                    </button>
                  </Menu.Item> */}
                  <Menu.Item onClick={() => navigate("/account")}>
                    <button
                      onClick={() => navigate("/account")}
                      className="p-2 px-4  hover:cursor-pointer hover:text-[#8530C1]"
                    >
                      Account
                    </button>
                  </Menu.Item>
                  <Menu.Item onClick={handLogOut}>
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
          )}
        </div>
      </div>
    </div>
  );
};

const SearchService = () => {
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);

  const { data } = useGetMainSearch(debounceValue);

  const arrayOfHint: THints[] = data?.data.data.hits;
  const arrayOfHintId = arrayOfHint?.filter((data) => data?.content_id > 0);

  // const uniqueObjects = Array.from(
  //   new Set(arrayOfHintId.map(JSON.stringify))
  // ).map(JSON.parse);

  //  const uniqueObjects = Array.from(new Set(arrayOfHintId.map(JSON.stringify)))

  //  const uniqueObjects = Object.values(
  //    arrayOfHintId.reduce((unique:THints, obj) => {
  //      unique[JSON.stringify(obj)]: = obj;
  //      return unique;
  //    }, {})
  //  );

  const removeDuplicatesByKey = (array: THints[], key: keyof THints) => {
    const seen = new Set();
    return array?.filter((item) => {
      const value = item[key];
      return seen.has(value) ? false : seen.add(value);
    });
  };

  // Call the function to remove duplicates based on the 'id' key
  const uniqueObjects = removeDuplicatesByKey(arrayOfHintId, "id");

  return (
    <Popover opened={!!search} width={350}>
      <Popover.Target>
        <div className="max-w-[300px] w-full rounded-3xl  flex  px-4  bg-gray-100  ">
          {/* <img
              loading="lazy"
              src={SearchIcon}
              alt="search icon"
              className=""
            /> */}
          <AiOutlineSearch size={30} className={" mx-auto my-auto"} />

          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="w-full h-[42px] text-black  py-4 rounded-3xl px-4 focus:outline-none  bg-inherit"
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        {uniqueObjects?.map((data, index) => (
          <p className="text-black" key={index}>
            {data.name}
          </p>
        ))}
      </Popover.Dropdown>
    </Popover>
  );
};

export default SchoolHeader;

const SchNotification = ({ data }: { data: TRequestStudents[] }) => {
  const [user] = useStore(getUserState);
  const navigate = useNavigate();
  return (
    <>
      {data?.length < 1 || (!data && <p>No notifications</p>)}
      {data?.length > 0 && (
        <div className="py-2 ">
          {/* <hr /> */}

          {data?.map((each, index) => (
            <div className="cursor-pointer" key={index}>
              <p
                onClick={() => {
                  if (user?.role === "schoolAdmin") {
                    navigate(`/schooldashboard/request`);
                  } else if (user?.role === "teacher") {
                    navigate(`/teacherdashboard/request`);
                  }
                }}
                className="flex my-2 px-3 justify-center items-center gap-2"
              >
                <span className="text-[#8530C1] ml-4">
                  {each?.firstname} {each.lastname} has made a request to your{" "}
                  {user?.role === "schoolAdmin" ? "School" : "class"}
                </span>
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// const ParentNotification = ({ name }: { name: string }) => {
//   return (
//     <div className="py-2 w-[400px] ">
//       <hr />
//       <p className="flex my-2 px-6 justify-center items-center gap-2 ">
//         <img
//           src={Blxst}
//           alt="image"
//           className="w-[40px] h-[40px] rounded-full"
//         />
//         <span className=" text-[14px] font-medium ml-4">
//           <span className="text-[#8530C1]">{name} </span>
//           has accepted your request for your child join her class.
//         </span>
//         <span>Now</span>
//       </p>
//     </div>
//   );
// };
