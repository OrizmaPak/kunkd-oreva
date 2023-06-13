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
const TeacherLayout = () => {
  return (
    <div className="w-full  bg-[#EBEFF3]  px-[100px] py-[15px] h-[100%]  ">
      <div className="flex h-[calc(100vh-50px-8vh)]  gap-8">
        <div className="basis-1/5 bg-white h-full rounded-[40px] px-7 flex  flex-col pb-4 ">
          <div className="flex-grow-1 flex-1">
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

            <DasboardButton
              title="Logout"
              icon={<img src={LogoutIcon} alt="icon" />}
            />
          </div>
        </div>
        <div className="basis-full  h-full">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default TeacherLayout;

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
      onClick={() => {
        console.log("testing");
        onClick();
      }}
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
