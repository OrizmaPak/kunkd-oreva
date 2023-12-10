import DasboardIcon from "@/assets/adminIcon.svg";

import StudentIcon from "@/assets/student.svg";
import UserIcon from "@/assets/usericon.svg";


import Arrow from "@/assets/greatericon.svg";
import LogoutIcon from "@/assets/logout.svg";
import LogoutModal from "@/pages/DashBoard/SchoolDashBoard/LogoutModal";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
// import Teacher01 from "@/assets/teacher01.svg";
import SchoolIcon from "@/assets/schoolIcon.svg";
import { Header } from "@/common/User/DashBoard/School/SchoolLayout";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import React from "react";

const routeBaseUrl = "/teacherdashboard";
const links = [
  {
    label: "Dashboard",
    route: routeBaseUrl,
    href: "",
    index: true,
    icon: DasboardIcon,
  },
  {
    label: "Student",
    href: "student",
    route: routeBaseUrl + "/student/*",
    icon: StudentIcon,
    hasSub: true,
  },
  {
    label: "Request",
    href: "request",
    route: routeBaseUrl + "/request",
    icon: StudentIcon,
    hasSub: true,
  },
  // {
  //   label: "Classes",
  //   href: "classes",
  //   route: routeBaseUrl + "/classes",
  //   icon: ClassesIcon,
  // },
  // {
  //   label: "Setting",
  //   href: "setting",
  //   route: routeBaseUrl + "/setting",
  //   icon: SettingIcon,
  // },
];
const TeacherLayout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        radius={"xl"}
        size="lg"
        opened={opened}
        onClose={close}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <LogoutModal onCloseModal={() => close()} />
      </Modal>

      <div className="w-full  bg-[#FFF7FD]  px-[100px] py-2 pb-4 mt-[8vh] h-[91vh]  ">
        <div className="flex max-w-[1280px] w-full mx-auto  h-full gap-4  mt-[1vh]">
          <div className="basis-1/4 bg-white h-full rounded-[40px] px-4 flex  flex-col pb-4 ">
            <div className="flex-grow-1 flex-1">
              <Header
                icon1={
                  <img
                    loading="lazy"
                    src={SchoolIcon}
                    alt="icon"
                    className="w-[30px]"
                  />
                }
                title="Pampers Schools"
                icon2={<img loading="lazy" src={Arrow} alt="icon" />}
              />
              {links.slice(0, 4).map((link) => (
                <NavButton
                  key={link.label}
                  title={link.label}
                  href={link.href}
                  route={link.route}
                  icon={<img loading="lazy" src={link.icon} alt="icon" />}
                />
              ))}
              <hr className="my-" />

              <TeacherProfile />
            </div>
            <div>
              <DasboardButton
                onClick={() => open()}
                title="Logout"
                icon={<img loading="lazy" src={LogoutIcon} alt="icon" />}
              />
            </div>
          </div>
          <div className="basis-full  h-full">{<Outlet />}</div>
        </div>
      </div>
    </>
  );
};

export default TeacherLayout;

const DasboardButton = ({
  title,
  icon,
  onClick,
  active = false,
}: {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={() => {
        console.log("testing");
        onClick();
      }}
      className={`transition-all duration-500 px-2 py-2  rounded flex items-center justify-between gap-8 w-full my-4 ${
        active
          ? "bg-[#8530c1] text-white"
          : "hover:bg-[#8530C1] hover:text-white"
      }  my-4`}
    >
      <span className="flex gap-3 justify-center">
        <span>{icon}</span>
        <span className={`${title === "Logout" && "text-red-600"}`}>
          {title}
        </span>
      </span>
      <span className="h-8 w-2 bg-white rounded-2xl"></span>
    </button>
  );
};

const NavButton = (props: {
  title: string;
  icon: React.ReactNode;
  href: string;
  route: string;
}) => {
  const { icon, title, href, route } = props;
  const match = useMatch(route);
  console.log(match);
  const navigate = useNavigate();

  const handleNavigate = () => {
    console.log("mat", href);
    navigate(href);
  };
  return (
    <DasboardButton
      onClick={handleNavigate}
      {...{ title, icon }}
      active={match ? true : false}
    />
  );
};

const TeacherProfile = () => {
  const [user, ,] = useStore(getUserState);
  return (
    <div className="mt-10">
      <div className="flex justify-center items-center">
        <img
          loading="lazy"
          src={user?.user_image || UserIcon}
          alt="image"
          className="rounded-full h-[110px] w-[110px] object-cover"
        />
      </div>
      <div className="text-center">
        <p className="font-bold text-[20px]">
          {user?.firstname} {user?.lastname}
        </p>
        <p>{user?.email}</p>
        <p className="font-semibold mt-2">
          {user?.school?.class?.class_name}
        </p>
      </div>
    </div>
  );
};
