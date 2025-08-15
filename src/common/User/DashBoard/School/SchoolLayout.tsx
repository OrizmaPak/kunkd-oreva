import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SchoolDashboardHeader from "./SchoolDashboardHeader";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMatch, useNavigate } from "react-router-dom";

import DashboardIcon from "@/assets/components/DashboardIcon";
import TeachersIcon from "@/assets/components/TeachersIcon";
import ClasssesIcon from "@/assets/components/ClassesIcon";
import FavouritesIcon from "@/assets/components/Favourites";
import StudentsIcon from "@/assets/components/StudentsIcon";
import ConnectionIcon from "@/assets/components/ConnectionIcon";
import ContentIcon from "@/assets/components/ContentIcon";
import { TfiEmail } from "react-icons/tfi";
import ContactUsModal from "@/components/ContactUsModal";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import KundaLogo from "@/assets/KundaLogo.svg";

const routeBaseUrl = "/schooldashboard";
const links = [
  {
    label: "Dashboard",
    route: routeBaseUrl,
    href: "",
    index: true,
    icon: DashboardIcon,
    role: ["schoolAdmin", "teacher"],
  },
  {
    label: "Connection Requests",
    href: "request",
    route: routeBaseUrl + "/request/",
    icon: ConnectionIcon,
    role: ["schoolAdmin", "teacher"],
  },
  {
    label: "Classes",
    href: "classes",
    route: routeBaseUrl + "/classes",
    icon: ClasssesIcon,
    role: ["schoolAdmin"],
  },
  {
    label: "Teachers",
    route: routeBaseUrl + "/teacher",
    href: "teacher",
    index: true,
    icon: TeachersIcon,
    role: ["schoolAdmin"],
  },
  {
    label: "Students",
    href: "students",
    route: routeBaseUrl + "/students/*",
    icon: StudentsIcon,
    hasSub: true,
    role: ["schoolAdmin", "teacher"],
  },
  {
    label: "Content Library",
    href: "content",
    route: routeBaseUrl + "/content/*",
    icon: ContentIcon,
    hasSub: true,
    role: ["schoolAdmin", "teacher", "user"],
  },
  {
    label: "Favourites",
    href: "favourites",
    route: routeBaseUrl + "/favourites/*",
    icon: FavouritesIcon,
    hasSub: true,
    role: ["user"],
  },
  {
    label: "Progress Report",
    href: "progress",
    route: routeBaseUrl + "/progress/",
    icon: StudentsIcon,
    hasSub: true,
    role: ["user"],
  },
];

const DOCK_W = 264;     // docked width (shifts frame)
const RAIL_W = 72;      // collapsed icon rail width (frame does NOT shift on hover)

const SchoolLayout: React.FC = () => {
  const [user] = useStore(getUserState);
  const [openedContactUs, { open: openContactUs, close: closeContactUs }] =
    useDisclosure(false);

  const [profileKey, setProfileKey] = useState(
    String(sessionStorage.getItem("profileId") || "0")
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const nextKey = String(detail?.profileId ?? Date.now());
      setProfileKey(nextKey);
    };
    window.addEventListener("profile:changed", handler);
    return () => window.removeEventListener("profile:changed", handler);
  }, []);

  const [docked, setDocked] = useState<boolean>(() => {
    const stored = localStorage.getItem("kk.sidebarDocked");
    return stored === null ? true : stored === "true";
  });

  const [hoverOpen, setHoverOpen] = useState<boolean>(false);

  useEffect(() => {
    const onDockToggle = () => setDocked((s) => !s);
    window.addEventListener("sidebar:dockToggle", onDockToggle);
    return () => window.removeEventListener("sidebar:dockToggle", onDockToggle);
  }, []);

  useEffect(() => {
    localStorage.setItem("kk.sidebarDocked", String(docked));
    window.dispatchEvent(new CustomEvent("sidebar:state", { detail: { docked } }));
  }, [docked]);

  const userRole = (user?.role as string) || "user";
  const allowedLinks = links.filter((l) => l.role.includes(userRole));

  const [sidebarDocked, setSidebarDocked] = useState<boolean>(true);
  useEffect(() => {
    const initial =
      localStorage.getItem("kk.sidebarDocked") === "false" ? false : true;
    setSidebarDocked(initial);

    const sync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail?.docked === "boolean") setSidebarDocked(detail.docked);
    };
    window.addEventListener("sidebar:state", sync);
    return () => window.removeEventListener("sidebar:state", sync);
  }, []);

  const toggleSidebarDock = () => {
    window.dispatchEvent(new CustomEvent("sidebar:dockToggle"));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <SchoolDashboardHeader /> */}
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

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .w-smooth { transition: width .4s cubic-bezier(.2,.8,.2,1); }
          .ml-smooth { transition: margin-left .4s cubic-bezier(.2,.8,.2,1); }
          .fade { transition: opacity .25s ease, visibility .25s ease; }
          .slide-x { transition: transform .35s cubic-bezier(.2,.8,.2,1); will-change: transform; }
        }
      `}</style>

      <div key={`profile-scope-${profileKey}`} className="flex-1">
        <div className="w-full h-[92vh] overflow-hidden bg-[#F6F7FB]">
          <div className="relative w-full h-full flex">
            <aside
              className="relative bg-white h-full pt-6 flex flex-col pb-4 border-r border-[#E4E7EC] w-smooth"
              style={{ width: docked ? DOCK_W : RAIL_W }}
              onMouseEnter={() => !docked && setHoverOpen(true)}
              onMouseLeave={() => !docked && setHoverOpen(false)}
            >
              <button
                aria-label={sidebarDocked ? "Collapse sidebar" : "Expand sidebar"}
                onClick={toggleSidebarDock}
                className="relative inline-flex items-center ml-4 justify-center rounded-md border border-[#E4E7EC] bg-white h-10 w-10 hover:bg-gray-50 transition"
              >
                <span
                  className={`absolute h-[2px] w-5 bg-[#101928] transition
                ${sidebarDocked ? "translate-y-[6px] rotate-45" : "-translate-y-[6px]"}
              `}
                />
                <span
                  className={`absolute h-[2px] w-5 bg-[#101928] transition
                ${sidebarDocked ? "opacity-0" : "opacity-100"}
              `}
                />
                <span
                  className={`absolute h-[2px] w-5 bg-[#101928] transition
                ${sidebarDocked ? "-translate-y-[-6px] -rotate-45" : "translate-y-[6px]"}
              `}
                />
              </button>
              <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 ">
                {allowedLinks.map((link) => (
                  <NavButton
                    key={link.label}
                    title={link.label}
                    href={link.href || ""}
                    route={link.route || ""}
                    icon={<link.icon />}
                    collapsed={!docked}
                  />
                ))}
              </nav>

              <div className="px-2">
                <DasboardButton
                  title="Contact Us"
                  icon={<TfiEmail size={20} />}
                  onClick={openContactUs}
                  collapsed={!docked}
                />
              </div>
              <div className={`flex ${hoverOpen ? "px-4" : "justify-center"} items-center mb-2 mt-4`}>
                <img src={KundaLogo} alt="" className="h-6" />
              </div>
            </aside>

            {!docked && (
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 z-30 ${hoverOpen ? "opacity-100 visible" : "opacity-0 invisible"} fade`}
              >
                <div
                  className="pointer-events-auto bg-white h-full pt-6 flex flex-col pb-4 border-r border-[#E4E7EC] shadow-2xl slide-x !z-[1000000] relative"
                  style={{ width: DOCK_W, transform: hoverOpen ? "translateX(0)" : "translateX(-20px)" }}
                  onMouseEnter={() => setHoverOpen(true)}
                  onMouseLeave={() => setHoverOpen(false)}
                >
                  <nav className="flex-1 overflow-y-auto px-3 !z-[1000000] relative">
                    <button
                      aria-label={sidebarDocked ? "Collapse sidebar" : "Expand sidebar"}
                      onClick={toggleSidebarDock}
                      className="relative inline-flex items-center mx-auto justify-center rounded-md border border-[#E4E7EC] bg-white h-10 w-10 hover:bg-gray-50 transition"
                    >
                      <span
                        className={`absolute h-[2px] w-5 bg-[#101928] transition
                      ${sidebarDocked ? "translate-y-[6px] rotate-45" : "-translate-y-[6px]"}
                    `}
                      />
                      <span
                        className={`absolute h-[2px] w-5 bg-[#101928] transition
                      ${sidebarDocked ? "opacity-0" : "opacity-100"}
                    `}
                      />
                      <span
                        className={`absolute h-[2px] w-5 bg-[#101928] transition
                      ${sidebarDocked ? "-translate-y-[-6px] -rotate-45" : "translate-y-[6px]"}
                    `}
                      />
                    </button>
                    {allowedLinks.map((link) => (
                      <NavButton
                        key={link.label}
                        title={link.label}
                        href={link.href || ""}
                        route={link.route || ""}
                        icon={<link.icon />}
                        collapsed={false}
                      />
                    ))}
                  </nav>

                  <div className="px-3 relative z-100">
                    <DasboardButton
                      title="Contact Us"
                      icon={<TfiEmail size={20} />}
                      onClick={openContactUs}
                      collapsed={false}
                    />
                  </div>

                  <div className={`flex ${hoverOpen ? "px-4" : "justify-center"} items-center mb-2 mt-4`}>
                    <img src={KundaLogo} alt="" className="h-6" />
                  </div>
                </div>
              </div>
            )}

            <div
              className="flex-1 bg-[#f5f6fb] ml-smooth"
              style={{ marginLeft: docked ? 0 : 0 }}
            >
              <div className="px-8 pt-6 h-full overflow-hidden overflow-y-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolLayout;

const DasboardButton = ({
  title,
  icon,
  onClick,
  active = false,
  collapsed = false,
}: {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`transition-all duration-200 px-2 py-3 text-[#101928] rounded-[8px] flex items-center ${collapsed ? "justify-center" : "justify-start"
        } gap-3 w-full text-[14px] ${active ? "bg-customGreen" : "hover:bg-customGreen"
        } my-2 relative group`}
      style={{
        fontFamily: "Inter",
        fontWeight: 400,
        fontStyle: "Regular",
        fontSize: "14px",
        lineHeight: "145%",
        letterSpacing: "0%",
      }}
    >
      <span className="flex-shrink-0"> {icon} </span>

      {!collapsed && (
        <span className="text-[15px] font-normal">{title}</span>
      )}

      {collapsed && (
        <span className="pointer-events-none absolute left-[70px] top-1/2 -translate-y-1/2 bg-[#101928] text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
          {title}
        </span>
      )}
    </button>
  );
};

const NavButton = (props: {
  title: string;
  icon: React.ReactNode;
  href: string;
  route: string;
  collapsed?: boolean;
}) => {
  const { icon, title, href, route, collapsed } = props;
  const match = useMatch(route);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(href);
  };

  return (
    <DasboardButton
      onClick={handleNavigate}
      {...{ title, collapsed }}
      icon={React.cloneElement(icon as React.ReactElement, {
        color: match ? "#101928" : "#667185",
      })}
      active={!!match}
    />
  );
};
