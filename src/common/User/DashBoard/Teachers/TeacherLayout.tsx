import DasboardIcon from "@/assets/adminIcon.svg";

import StudentIcon from "@/assets/student.svg";

import LogoutIcon from "@/assets/logout.svg";
import Arrow from "@/assets/greatericon.svg";
import { Outlet } from "react-router-dom";
import { useMatch, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import LogoutModal from "@/pages/DashBoard/SchoolDashBoard/LogoutModal";
import Teacher01 from "@/assets/teacher01.svg";
import SchoolIcon from "@/assets/schoolIcon.svg";
import { Header } from "@/common/User/DashBoard/School/SchoolLayout";
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

      <div className="w-full  bg-[#FFF7FD]  px-[100px] py-2 pb-4 mt-[8vh] h-[92vh]  ">
        <div className="flex h-full  gap-8">
          <div className="basis-1/4 bg-white h-full rounded-[40px] px-7 flex  flex-col pb-4 ">
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
              <hr className="my-" />

              <TeacherProfile
                name="Mitchel Mccarty"
                email="mitchelmccarty@mail.com"
                image={Teacher01}
              />
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
      className={`px-4 py-4  rounded-3xl flex items-center gap-8 w-full my-8 ${
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

const TeacherProfile = ({
  image,
  name,
  email,
}: {
  image: string;
  name: string;
  email: string;
}) => {
  return (
    <div className="mt-10">
      <div className="flex justify-center items-center">
        <img loading="lazy" src={image} alt="image" />
      </div>
      <div className="text-center">
        <p className="font-bold text-[20px]">{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};
