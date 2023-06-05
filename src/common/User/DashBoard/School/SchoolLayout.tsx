import { Img } from "@chakra-ui/react";
import React from "react";
import UserIcon from "@/assets/usericon.svg";
import DasboardIcon from "@/assets/Dashboard.svg";
import TeacherIcon from "@/assets/teacher.svg";
import StudentIcon from "@/assets/student.svg";
import ClassesIcon from "@/assets/classes.svg";
import SettingIcon from "@/assets/searchicon.svg";
import LogoutIcon from "@/assets/logout.svg";
import SchoolLogo from "@/assets/schlogo.svg";
import Arrow from "@/assets/greatericon.svg";
import { Outlet } from "react-router-dom";
import { useMatch, useNavigate } from "react-router-dom";

const routeBaseUrl = "/schooldashboard";
const links = [
  {
    label: "Dashboard",
    route: routeBaseUrl,
    href: "",
    index: true,
    icon: DasboardIcon,
  },
  {
    label: "Teacher",
    route: routeBaseUrl + "/teacher",
    href: "teacher",
    index: true,
    icon: TeacherIcon,
  },
  {
    label: "Student",
    href: "student",
    route: routeBaseUrl + "/student/*",
    icon: StudentIcon,
    hasSub: true,
  },
  {
    label: "Classes",
    href: "classes",
    route: routeBaseUrl + "/classes",
    icon: ClassesIcon,
  },
  {
    label: "Setting",
    href: "setting",
    route: routeBaseUrl + "/setting",
    icon: SettingIcon,
  },
];
const SchoolLayout = () => {
  return (
    <div className="w-full  bg-[#EBEFF3]  px-[100px] py-[15px] h-[100%]  ">
      <div className="flex h-[calc(100vh-50px-8vh)]  gap-8">
        <div className="basis-1/5 bg-white h-full rounded-[40px] px-7 flex  flex-col pb-4 ">
          <div className="flex-grow-1 flex-1">
            <Header
              icon1={<img src={SchoolLogo} alt="icon" />}
              title="Pampers Schools"
              icon2={<img src={Arrow} alt="icon" />}
            />
            {links.slice(0, 4).map((link) => (
              <NavButton
                key={link.label}
                title={link.label}
                href={link.href}
                route={link.route}
                icon={<img src={link.icon} alt="icon" />}
              />
            ))}
            <hr className="my-10" />
            <NavButton
              title={links[links.length - 1].label}
              href={links[links.length - 1].href}
              route={links[links.length - 1].route}
              icon={<img src={links[links.length - 1].icon} alt="icon" />}
            />

            <DasboardButton
              title="Logout"
              icon={<img src={LogoutIcon} alt="icon" />}
            />
          </div>
          <div>
            <button className="p-4 rounded-full border border-[#8530C1] w-full">
              Upgrage Plan
            </button>
          </div>
        </div>
        <div className="basis-full  h-full">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default SchoolLayout;

const DasboardButton = ({
  title,
  icon,
  onClick = () => {},
  active = false,
}: {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3  rounded-3xl flex items-center gap-8 w-full ${
        active
          ? "bg-[#8530c1] text-white"
          : "hover:bg-[#8530C1] hover:text-white"
      }  my-4`}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </button>
  );
};

const Header = ({
  title,
  icon1,
  icon2,
}: {
  title: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
}) => {
  return (
    <div>
      <button className="px-4 mb-8 py-3  bg-[#EBEFF3]  rounded-3xl flex items-center justify-between gap-2 w-full   my-4">
        <span>{icon1}</span>
        <span className="flex flex-col">
          <span className="text-black">
            <small> {title}</small>
          </span>
          <span className="text-gray-400">School</span>
        </span>
        <span>{icon2}</span>
      </button>
    </div>
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
