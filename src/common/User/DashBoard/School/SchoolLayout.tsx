import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

import DashboardIcon from "@/assets/components/DashboardIcon";
import TeachersIcon from "@/assets/components/TeachersIcon";
import ClasssesIcon from "@/assets/components/ClassesIcon";
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
const TOPBAR_H = "8vh"; // height used in header

const SchoolLayout = () => {
  const [user] = useStore(getUserState);
  const [openedContactUs, { open: openContactUs, close: closeContactUs }] =
    useDisclosure(false);

  // Docked state (persistent) — when true, content shifts; when false, thin rail.
  const [docked, setDocked] = useState<boolean>(() => {
    const stored = localStorage.getItem("kk.sidebarDocked");
    return stored === null ? true : stored === "true";
  });

  // Hover overlay (only used when collapsed)
  const [hoverOpen, setHoverOpen] = useState<boolean>(false);

  // Events: header burger toggles docked
  useEffect(() => {
    const onDockToggle = () => setDocked((s) => !s);
    window.addEventListener("sidebar:dockToggle", onDockToggle);
    return () => window.removeEventListener("sidebar:dockToggle", onDockToggle);
  }, []);

  // Broadcast for header sync + persist
  useEffect(() => {
    localStorage.setItem("kk.sidebarDocked", String(docked));
    window.dispatchEvent(new CustomEvent("sidebar:state", { detail: { docked } }));
  }, [docked]);

  const userRole = (user?.user_type as string) || "user";
  const allowedLinks = useMemo(
    () => links.filter((l) => l.role.includes(userRole)),
    [userRole]
  );

  return (
    <>
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

      {/* Fixed frame; only content scrolls */}
      <div className="w-full h-[92vh] overflow-hidden bg-[#F6F7FB]">
        <div className="relative w-full h-full flex">

          {/* Base rail (docked or thin) */}
          <aside
            className="relative bg-white h-full pt-6 flex flex-col pb-4 border-r border-[#E4E7EC] w-smooth"
            style={{ width: docked ? DOCK_W : RAIL_W }}
            onMouseEnter={() => !docked && setHoverOpen(true)}
            onMouseLeave={() => !docked && setHoverOpen(false)}
          >
            {/* Nav items (icon rail still interactive) */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 z-[8999]">
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

            {/* Bottom actions */}
            <div className="px-2">
              <DasboardButton
                title="Contact Us"
                icon={<TfiEmail size={20} />}
                onClick={openContactUs}
                collapsed={!docked}
              />
            </div>
            <div className={`flex ${hoverOpen ? "px-4" : "justify-center"} items-center mb-2 mt-4`}>
                {hoverOpen ? (
                  <img src={KundaLogo} alt="" className="h-6" />
                ) : (
                  <img src={KundaLogo} alt="" className="h-6" />
                )}
              </div>
          </aside>

          {/* HOVER OVERLAY: appears when collapsed and hovered; DOES NOT shift frame */}
          {!docked && (
            <div
              className={`pointer-events-none absolute inset-y-0 left-0 z-30 ${hoverOpen ? "opacity-100 visible" : "opacity-0 invisible"} fade`}
            >
              <div
                className="pointer-events-auto bg-white h-full pt-6 flex flex-col pb-4 border-r border-[#E4E7EC] shadow-2xl slide-x"
                style={{ width: DOCK_W, transform: hoverOpen ? "translateX(0)" : "translateX(-20px)" }}
                onMouseEnter={() => setHoverOpen(true)}
                onMouseLeave={() => setHoverOpen(false)}
              >
                <nav className="flex-1 overflow-y-auto px-3">
                  {allowedLinks.map((link) => (
                    <NavButton
                      key={link.label}
                      title={link.label}
                      href={link.href || ""}
                      route={link.route || ""}
                      icon={<link.icon />}
                      collapsed={false} // full labels in overlay
                    />
                  ))}

           
                </nav>

                <div className="px-3">
                  <DasboardButton
                    title="Contact Us"
                    icon={<TfiEmail size={20} />}
                    onClick={openContactUs}
                    collapsed={false}
                  />
                </div>

                <div className={`flex ${hoverOpen ? "px-4" : "justify-center"} items-center mb-2 mt-4`}>
                {hoverOpen ? (
                  <img src={KundaLogo} alt="" className="h-6" />
                ) : (
                  <img src={KundaLogo} alt="" className="h-6" />
                )}
              </div>
              </div>
            </div>
          )}

          {/* Right content — margin only depends on DOCKED state (burger) */}
          <div
            className="flex-1 bg-[#f5f6fb] ml-smooth"
            style={{ marginLeft: docked ? 0 : 0 }} // frame stays; header handles its own width
          >
            <div className="px-8 pt-6 h-full overflow-hidden overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolLayout;

/* ─────────── Buttons ─────────── */

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
      className={`transition-all duration-200 px-2 py-3 text-[#101928] rounded-[8px] flex items-center ${
        collapsed ? "justify-center" : "justify-start"
      } gap-3 w-full text-[14px] ${
        active ? "bg-customGreen" : "hover:bg-customGreen"
      } my-2 relative group`}
    >
      <span className="flex-shrink-0"> {icon} </span>

      {/* Hide label when collapsed */}
      {!collapsed && (
        <span className="text-[15px] font-normal">{title}</span>
      )}

      {/* Tooltip when collapsed (rail) — optional since overlay opens on hover */}
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

  return (<>
  <DasboardButton
      onClick={handleNavigate}
      {...{ title, collapsed }}
      icon={React.cloneElement(icon as React.ReactElement, {
        color: match ? "#101928" : "#667185",
      })}
      active={!!match}
    />
  </>
    
  );
};
