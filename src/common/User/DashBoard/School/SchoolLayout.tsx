import DasboardIcon from "@/assets/dashboard.svg";
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

      <div className="w-full   bg-[#FFF7FD]  px-[100px] py-[15px] mt-[8vh] h-[92vh]  ">
        <div className="flex h-[calc(100vh-50px-8vh)] gap-8">
          <div className="basis-1/5 bg-white  h-[calc(100vh-50px-8vh)] rounded-[40px] px-7 flex  flex-col pb-4 ">
            <div className="flex-grow-1 flex-1">
              <Header
                icon1={<img src={SchoolIcon} alt="icon" className="w-[40px]" />}
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
              {/* <hr className="my-10" />
            <NavButton
              title={links[links.length - 1].label}
              href={links[links.length - 1].href}
              route={links[links.length - 1].route}
              icon={<img src={links[links.length - 1].icon} alt="icon" />}
            /> */}
            </div>
            <div>
              <DasboardButton
                onClick={() => open()}
                title="Logout"
                icon={<img src={LogoutIcon} alt="icon" />}
              />
            </div>
          </div>

          <div className="basis-full   h-[calc(100vh-50px-8vh)]">
            {<Outlet />}
          </div>
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
      className={`px-4 py-3  rounded-3xl flex items-center gap-8 w-full my-8 ${
        active
          ? "bg-[#8530c1] text-white"
          : "hover:bg-[#8530C1] hover:text-white"
      }  my-4`}
    >
      <span>{icon}</span>
      <span className={`${title === "Logout" && "text-red-600"}`}>{title}</span>
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
      <button className="px-4 mb-8 py-3  bg-[#EBEFF3]  rounded-3xl flex items-center justify-between gap-2 w-full   my-4">
        <span>{icon1}</span>

        <span className="text-[20px] font-bold">School Logo</span>
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
