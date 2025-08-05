// import DasboardIcon from "@/assets/adminIcon.svg";
// import ClassesIcon from "@/assets/classes.svg";
// import Arrow from "@/assets/greatericon.svg";
// import LogoutIcon from "@/assets/logout.svg";d
// import StudentIcon from "@/assets/student.svg";
// import TeacherIcon from "@/assets/teacher.svg";
// import LogoutModal from "@/pages/DashBoard/SchoolDashBoard/LogoutModal";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
// import { getUserState } from "@/store/authStore";
// import useStore from "@/store/index";
// import { getProfileState } from "@/store/profileStore";

// import SchoolIcon from "@/assets/schoolIcon.svg";
import DashboardIcon from "@/assets/components/DashboardIcon";
// import { Icon } from "@chakra-ui/react";
import TeachersIcon from "@/assets/components/TeachersIcon";
import ClasssesIcon from "@/assets/components/ClassesIcon";
import StudentsIcon from "@/assets/components/StudentsIcon";
import ConnectionIcon from "@/assets/components/ConnectionIcon";
import KundaLogo from "@/assets/KundaLogo.svg";
// import { SlSettings } from "react-icons/sl";
import ContentIcon from "@/assets/components/ContentIcon";
import { TfiEmail } from "react-icons/tfi";
import ContactUsModal from "@/components/ContactUsModal";

const routeBaseUrl = "/schooldashboard";
const links = [
  {
    label: "Dashboard",
    route: routeBaseUrl,
    href: "",
    index: true,
    icon: DashboardIcon,
  },
  {
    label: "Connection Requests",
    href: "request",
    route: routeBaseUrl + "/request/",
    icon: ConnectionIcon,
  },
  {
    label: "Classes",
    href: "classes",
    route: routeBaseUrl + "/classes",
    icon: ClasssesIcon,
  },
  {
    label: "Teachers",
    route: routeBaseUrl + "/teacher",
    href: "teacher",
    index: true,
    icon: TeachersIcon,
  },
  {
    label: "Students",
    href: "student",
    route: routeBaseUrl + "/student/*",
    icon: StudentsIcon,
    hasSub: true,
  },
  {
    label: "Content Library",
    href: "content",
    route: routeBaseUrl + "/content/*",
    icon: ContentIcon,
    hasSub: true,
  },
  // {
  //   label: "Setting",
  //   href: "setting",
  //   route: routeBaseUrl + "/setting",
  //   icon: SettingIcon,
  // },
];
const SchoolLayout = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [openedContactUs, { open: openContactUs, close: closeContactUs }] =
    useDisclosure(false);

  // const [profiles, setProfiles] = useStore(getProfileState);

  // const navigate = useNavigate();

  return (
    <>
      {/* <Modal
        radius={6}
        size="md"
        opened={opened}
        onClose={close}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <LogoutModal onCloseModal={() => close()} />
      </Modal> */}

      <Modal
        radius={20}
        padding={0}
        size={450}
        opened={openedContactUs}
        onClose={closeContactUs}
        withCloseButton={false}
        centered
      >
        <ContactUsModal close={closeContactUs} />
      </Modal>

      <div className="w-full   bg-[#FFF7FD]   h-[91vh]  ">
        <div className="flex  w-full   h-full ">
          <div className="w-[18%] bg-white   h-full  pt-8 flex  flex-col pb-4 px-2  border-r-[1px] border-[#E4E7EC] ">
            <div className="flex-grow-1 flex-1">
              {links.map((link) => (
                <NavButton
                  key={link.label}
                  title={link.label}
                  href={link.href || ""}
                  route={link.route || ""}
                  icon={<link.icon />}
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
                onClick={() => openContactUs()}
                title="Contact Us"
                icon={<TfiEmail size={20} />}
              />

              <div className="flex px-4  justify-start items-center mb-8 mt-4">
                <img src={KundaLogo} alt="" />
              </div>
            </div>
          </div>

          <div className="w-[82%]  bg-[#F0F2F5] px-8 pt-10  overflow-hidden overflow-y-auto  ">
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
  onClick,
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
      className={` transition-all duration-700 px-1 py-4  text-[#101928] font-InterReg rounded-[4px] flex items-center justify-between gap-8 w-full  text-[14px]  ${
        active ? "bg-customGreen " : "hover:bg-customGreen "
      }  my-4`}
    >
      <span className="flex gap-3 justify-center items-center">
        <span className="ml-3"> {icon} </span>
        <span
          className={` text-[16px] font-normal ${
            title === "Logout" && "text-red-600"
          }`}
        >
          {title}
        </span>
      </span>
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

        <span className="text-[14px] font-bold ml-4"></span>
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
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(href);
  };
  return (
    <DasboardButton
      onClick={handleNavigate}
      {...{ title }}
      icon={React.cloneElement(icon as React.ReactElement, {
        color: match ? "#101928" : "#667185", // Active color: #9FC43E, Inactive color: #667185
      })}
      active={match ? true : false}
    />
  );
};
