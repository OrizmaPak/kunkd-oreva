import SchoolAvatar from "@/assets/SchoolAvatar.png";
import { AiOutlineBell } from "react-icons/ai";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { IoChevronDown } from "react-icons/io5";
import { Menu } from "@mantine/core";
import { FaCog, FaRegUserCircle, FaWrench } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { handleEventTracking } from "@/api/moengage";
import { logOut } from "@/auth/sdk";
import { useNavigate } from "react-router-dom";
import { useGetAttemptAllStudentConnect } from "@/api/queries";
import { useEffect, useMemo, useState } from "react";
import { getProfileState } from "@/store/profileStore";

/** Small avatar helper with safe fallback */
const AvatarCircle = ({
  src,
  label,
  size = 40,
}: {
  src?: string;
  label?: string;
  size?: number;
}) => {
  const initials =
    (label || "")
      .trim()
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "🙂";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {src ? (
        <img
          loading="lazy"
          src={src}
          alt={label || "avatar"}
          className="rounded-full object-cover w-full h-full"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const sib = (e.currentTarget.nextSibling || null) as HTMLDivElement | null;
            if (sib) sib.style.display = "grid";
          }}
        />
      ) : null}
      {/* fallback initials layer */}
      <div
        className="hidden place-items-center rounded-full bg-[#EEF2FF] text-[#475569] font-semibold"
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    </div>
  );
};

type Profile = {
  id: number;
  name: string;
  image?: string;
  emoji?: string;
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
  const [profiles] = useStore(getProfileState) as [Profile[]];

  const { data } = useGetAttemptAllStudentConnect(user?.role === "schoolAdmin");
  const totalSchoolConnectList = data?.data?.data?.totalRecord;

  /** ---------------- Active child handling ---------------- */
  const [activeProfileId, setActiveProfileId] = useState<number | null>(null);

  useEffect(() => {
    if (!Array.isArray(profiles) || profiles.length === 0) return;

    const fromSessionRaw = sessionStorage.getItem("profileId");
    const fromSession = fromSessionRaw ? Number(fromSessionRaw) : null;

    const validSessionId = profiles.some((p) => p.id === fromSession)
      ? fromSession
      : profiles[0].id;

    setActiveProfileId(validSessionId);

    if (fromSession !== validSessionId) {
      sessionStorage.setItem("profileId", String(validSessionId));
    }

    try {
      const s: any = (useStore as any).getState?.();
      const setActiveProfileIdAction =
        s?.setActiveProfileId ||
        s?.setProfileId ||
        s?.setSelectedProfileId ||
        s?.setCurrentProfileId;

      if (typeof setActiveProfileIdAction === "function") {
        setActiveProfileIdAction(validSessionId);
      }
    } catch (_) {}
  }, [profiles]);

  const activeProfile = useMemo(
    () => profiles?.find((p) => p.id === activeProfileId) || null,
    [profiles, activeProfileId]
  );

  const handlePickProfile = (p: Profile) => {
    setActiveProfileId(p.id);
    sessionStorage.setItem("profileId", String(p.id));
    try {
      const s: any = (useStore as any).getState?.();
      const setActiveProfileIdAction =
        s?.setActiveProfileId ||
        s?.setProfileId ||
        s?.setSelectedProfileId ||
        s?.setCurrentProfileId;

      if (typeof setActiveProfileIdAction === "function") {
        setActiveProfileIdAction(p.id);
      }
    } catch (_) {}
    window.dispatchEvent(
      new CustomEvent("profile:changed", { detail: { profileId: p.id, profile: p } })
    );
  };

  // Sidebar dock sync (unchanged if you’re moving the toggle elsewhere)
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

  /** NEW: control expand/collapse of children inside dropdown */
  const [childrenOpen, setChildrenOpen] = useState(false);

  /** ---------------- UI ---------------- */
  return (
    <div className="relative flex font-[500] py-4 text-[16px] px-[30px] justify-between items-center z-50 gap-4 h-[8vh] shadow-md bg-white">
      {/* Left: Name + (optional) Burger */}
      <div className="flex items-center gap-3">
        <p className="font-Inter text-[20px]">
          {user?.school?.name || "Greenfield Academy"}
        </p>

        {/* If you moved the burger to the sidebar, keep this hidden */}
        <button
          aria-label={sidebarDocked ? "Collapse sidebar" : "Expand sidebar"}
          onClick={toggleSidebarDock}
          className="relative hidden inline-flex items-center justify-center rounded-md border border-[#E4E7EC] bg-white h-10 w-10 hover:bg-gray-50 transition"
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
              <AiOutlineBell size={22} className={" mx-auto"} color="#667185" />
              <p
                className={`absolute -top-4 text-white  right-[-14px] py-[1px] rounded-full px-[3px] ${
                  totalSchoolConnectList > 0 ? "bg-red-700" : "bg-white"
                }  `}
              >
                {totalSchoolConnectList || 0}
              </p>
            </div>
          )}
        </div>

        <Menu
          width={280}
          shadow="lg"
          radius={10}
          position="bottom-end"
          styles={{ dropdown: { transform: "translateX(0px)" } }}
          closeOnItemClick={false} // Prevent dropdown from closing on item click
        >
          <Menu.Target>
            <div className="flex justify-center items-center gap-2 cursor-pointer rounded-3xl p-2 px-4">
              {/* Parent → show active child’s initials + name; Others → admin avatar + label */}
              {user?.role === "user" ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-[40px] h-[40px] bg-gray-300 rounded-full">
                    <span className="text-white font-bold">
                      {activeProfile?.name
                        ? activeProfile.name.slice(0, 2).toUpperCase()
                        : "CC"}
                    </span>
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
            {/* Collapsible 'Profile' row (click to show children for parents) */}
            <Menu.Item
              onClick={() => setChildrenOpen((v) => !v)}
              rightSection={
                <IoChevronDown
                  className={`transition-transform duration-200 ${childrenOpen ? "rotate-180" : ""}`}
                  size={18}
                  color="#667185"
                />
              }
            >
              <div className="flex items-center gap-2 text-[14px] text-[#667185] font-Arimo">
                <FaRegUserCircle color="#667185" size={20} />
                Profiles
              </div>
            </Menu.Item>

            {/* Children list (hidden by default, only for parent role) */}
            {user?.role === "user" && childrenOpen && Array.isArray(profiles) && profiles.length > 0 && (
              <div className="px-2 pb-2">
                <div className="px-2 py-1 text-xs text-[#98A2B3] uppercase">Children</div>
                <div className="rounded-md border border-[#EEF2F6] max-h-[240px] overflow-y-auto">
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePickProfile(p)}
                      className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#F9FAFB]"
                    >
                      <div className="flex items-center justify-center w-[28px] h-[28px] bg-gray-300 rounded-full">
                        <span className="text-white text-xs font-bold">
                          {p.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="truncate text-[14px] text-[#344054]">{p.name}</span>
                      {activeProfileId === p.id && (
                        <span className="ml-auto text-[10px] px-2 py-[2px] rounded-full bg-[#E3F2D1] text-[#3F6212]">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Regular items */}
            <Menu.Divider />

            <Menu.Item onClick={() => navigate("schooldashboard/settings")}>
              <p className="flex items-center gap-2 text-[14px] text-[#667185] font-Arimo">
                <FaCog color="#667185" size={18} />
                Settings
              </p>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item>
              <p
                onClick={handLogOut}
                className="flex items-center gap-2 text-[14px] text-[#667185] font-Arimo"
              >
                <CiLogout size={20} />
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
