import DasboardIcon from "@/assets/adminIcon.svg";
import TeacherIcon from "@/assets/teacher.svg";
import StudentIcon from "@/assets/student.svg";
import ClassesIcon from "@/assets/classes.svg";
import LogoutIcon from "@/assets/logout.svg";
import Arrow from "@/assets/greatericon.svg";
import { Outlet } from "react-router-dom";
import { useMatch, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import LogoutModal from "@/pages/DashBoard/SchoolDashBoard/LogoutModal";
import React from "react";

import SchoolIcon from "@/assets/schoolIcon.svg";

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
    label: "Teachers",
    route: routeBaseUrl + "/teacher",
    href: "teacher",
    index: true,
    icon: TeacherIcon,
  },
  {
    label: "Students",
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
  // {
  //   label: "Setting",
  //   href: "setting",
  //   route: routeBaseUrl + "/setting",
  //   icon: SettingIcon,
  // },
];
const SchoolLayout = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // const navigate = useNavigate();
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

      <div className="w-full   bg-[#FFF7FD] px-[100px] mt-[8vh] py-2  pb-4 h-[91vh]  ">
        <div className="flex max-w-[1280px] w-full mx-auto  h-full gap-8 mt-[1vh]">
          <div className="basis-1/4 bg-white   h-full rounded-[40px] px- flex  flex-col pb-4 px-2">
            <div className="flex-grow-1 flex-1">
              <Header
                icon1={
                  <img
                    loading="lazy"
                    src={SchoolIcon}
                    alt="icon"
                    className="w-[40px]"
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
              {/* <hr className="my-10" />
            <NavButton
              title={links[links.length - 1].label}
              href={links[links.length - 1].href}
              route={links[links.length - 1].route}
              icon={<img loading="lazy" src={links[links.length - 1].icon} alt="icon" />}
            /> */}
            </div>
            <div>
              <DasboardButton
                onClick={() => open()}
                title="Logout"
                icon={<img loading="lazy" src={LogoutIcon} alt="icon" />}
              />
            </div>
          </div>

          <div className="basis-full    h-full">{<Outlet />}</div>
        </div>
      </div>
    </>
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
      className={` transition-all duration-700 px-2 py-2  rounded-2xl flex items-center justify-between gap-8 w-full my-8 text2 ${
        active
          ? "bg-[#8530c1] text-white"
          : "hover:bg-[#8530C1] hover:text-white"
      }  my-4`}
    >
      <span className="flex gap-3 justify-center">
        <span className="ml-3">{icon}</span>
        <span className={`${title === "Logout" && "text-red-600"}`}>
          {title}
        </span>
      </span>
      <span className="h-8 w-2 bg-white rounded-2xl"></span>
    </button>
  );
};

export const Header = ({
  icon1,
}: {
  title: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
}) => {
  return (
    <div>
      <button className="px-4 mb-8 py-3   rounded-3xl flex items-center  gap-2 w-full   my-4">
        <span>{icon1}</span>

        <span className="text-[14px] font-bold ml-4">School Logo</span>
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
