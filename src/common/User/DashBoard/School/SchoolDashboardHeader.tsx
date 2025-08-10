// import { Link } from "react-router-dom";
// import Logo from "@/assets/KundaLogo.svg";
// import BellIcon from "@/assets/bellicon.svg";
import SchoolAvatar from "@/assets/SchoolAvatar.png";
// import SearchIcon from "@/assets/searchicon.svg";
import { AiOutlineBell } from "react-icons/ai";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { IoChevronDown } from "react-icons/io5";
import { Menu } from "@mantine/core";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { handleEventTracking } from "@/api/moengage";
import { logOut } from "@/auth/sdk";
import { useNavigate } from "react-router-dom";
import { useGetAttemptAllStudentConnect } from "@/api/queries";
import { useEffect, useState } from "react";
import { getProfileState } from "@/store/profileStore";

// tiny avatar helper for safe fallback
const AvatarCircle = ({ src, label, size = 40 }: { src?: string; label?: string; size?: number }) => {
  const initials =
    (label || "")
      .trim()
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "🙂";

  return src ? (
    <img
      loading="lazy"
      src={src}
      alt={label || "avatar"}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
      onError={(e) => {
        // hide broken image, show initials style
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = "none";
        const sib = el.nextElementSibling as HTMLDivElement | null;
        if (sib) sib.style.display = "grid";
      }}
    />
  ) : (
    <div
      className="hidden place-items-center rounded-full bg-[#EEF2FF] text-[#475569] font-semibold"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
};

const SchoolDashboardHeader = () => {
  const navigate = useNavigate();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);

  const [user] = useStore(getUserState);
  const [profiles] = useStore(getProfileState);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const activeProfile = profiles?.find((p) => p.id === activeProfileId);
  console.log("profile", profiles);
  const { data } = useGetAttemptAllStudentConnect(user?.role === "schoolAdmin");
  const totalSchoolConnectList = data?.data?.data?.totalRecord;

  // Sync burger with sidebar docked state
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
    // Layout listens and is source of truth
    window.dispatchEvent(new CustomEvent("sidebar:dockToggle"));
  };

  const handLogOut = () => {
    handleEventTracking(
      `web_${
        user?.role == "teacher"
          ? "teacher"
          : user?.role == "user"
          ? "parent"
          : "school"
      }_logout`,
      {
        user_id: user?.user_id,
        login_date: formattedDate,
      }
    );
    logOut();
    sessionStorage.clear();
    navigate("/");
  };

  const handlePickProfile = (p: any) => {
    setActiveProfileId(p.id);
    sessionStorage.setItem("profileId", String(p.id));

    // if your zustand profile store exposes an action, call it here:
    try {
      const storeState: any = (useStore as any).getState?.();
      const setActiveProfileId = storeState?.setActiveProfileId || storeState?.setProfileId;
      if (typeof setActiveProfileId === "function") {
        setActiveProfileId(p.id);
      }
    } catch (_) {}

    window.dispatchEvent(
      new CustomEvent("profile:changed", { detail: { profileId: p.id, profile: p } })
    );
  };

  return (
    <div className="relative flex font-[500] py-4 text-[16px] px-[30px] justify-between items-center z-50 gap-4 h-[8vh] shadow-md bg-white">
      {/* Left: Name + Burger (burger AFTER name) */}
      <div className="flex items-center gap-3">
        <p className="font-Inter text-[20px]">
          {user?.school?.name || "Greenfield Academy"}
        </p>

        {/* Burger (morphs to X), placed after the name */}
        <button
          aria-label={sidebarDocked ? "Collapse sidebar" : "Expand sidebar"}
          onClick={toggleSidebarDock}
          className="relative inline-flex items-center justify-center rounded-md border border-[#E4E7EC] bg-white h-10 w-10 hover:bg-gray-50 transition"
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
      </div>

      {/* Right cluster */}
      <div className="flex items-center justify-end pl-2 gap-5">
        <div
          onClick={() => navigate("schooldashboard/request")}
          className="relative cursor-pointer"
        >
          {(user?.role === "schoolAdmin" || user?.role === "teacher") && (
            <div>
              <AiOutlineBell size={22} className="mx-auto" color="#667185" />
              <p
                className={`absolute -top-4 text-white right-[-14px] py-[1px] rounded-full px-[3px] ${
                  totalSchoolConnectList > 0 ? "bg-red-700" : "bg-white"
                }`}
              >
                {totalSchoolConnectList || 0}
              </p>
            </div>
          )}
        </div>

        <Menu
          width={250}
          shadow="lg"
          radius={10}
          position="bottom-end"
          styles={{ dropdown: { transform: "translateX(0px)" } }}
        >
          <Menu.Target>
            <div className="flex justify-center items-center gap-2 cursor-pointer rounded-3xl p-2 px-4">
              {/* if role is parent → show active child’s photo; else fallback to SchoolAvatar */}
              {user?.role === "user" ? (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <AvatarCircle src={activeProfile?.image} label={activeProfile?.name} size={40} />
                    {/* fallback initials layer is handled inside AvatarCircle */}
                  </div>
                  <span className="flex items-center gap-2">
                    {activeProfile?.name || "Choose child"}
                    <IoChevronDown size={22} color="#667185" />
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    loading="lazy"
                    src={SchoolAvatar}
                    alt="user icon"
                    className="w-[40px] h-[40px]"
                  />
                  <span className="flex items-center gap-2">
                    Administrator
                    <IoChevronDown size={22} color="#667185" />
                  </span>
                </div>
              )}
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            {/* Parent: list children ABOVE Settings */}
            {user?.role === "user" && Array.isArray(profiles) && profiles.length > 0 && (
              <>
                <Menu.Label>Children</Menu.Label>
                <div style={{ maxHeight: 240, overflowY: "auto" }}>
                  {profiles.map((p: any) => (
                    <Menu.Item key={p.id} onClick={() => handlePickProfile(p)}>
                      <div className="flex items-center gap-2 text-[14px] text-[#667185] font-Arimo">
                        <div className="relative">
                          <AvatarCircle src={p.image} label={p.name} size={28} />
                        </div>
                        <span className="truncate">{p.name}</span>
                        {activeProfileId === p.id && (
                          <span className="ml-auto text-xs px-2 py-[2px] rounded-full bg-[#E3F2D1] text-[#3F6212]">
                            Active
                          </span>
                        )}
                      </div>
                    </Menu.Item>
                  ))}
                </div>
                <Menu.Divider />
              </>
            )}

            {/* Settings (unchanged) */}
            <Menu.Item onClick={() => navigate("schooldashboard/settings")}>
              <p className="flex items-center gap-2 text-[14px] text-[#667185] font-Arimo">
                <FaRegUserCircle color="#667185" size={25} />
                Settings
              </p>
            </Menu.Item>

            <Menu.Divider />

            {/* Logout (unchanged) */}
            <Menu.Item>
              <p
                onClick={handLogOut}
                className="flex items-center gap-2 text-[14px] text-[#667185] font-Arimo"
              >
                <CiLogout size={25} />
                Log out
              </p>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default SchoolDashboardHeader;
