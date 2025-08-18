import SchoolAvatar from "@/assets/SchoolAvatar.png";
import { AiOutlineBell } from "react-icons/ai";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { IoChevronDown, IoNotificationsOutline } from "react-icons/io5";
import { Menu } from "@mantine/core";
import { FaCog, FaRegUserCircle, FaWrench } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { handleEventTracking } from "@/api/moengage";
import { logOut } from "@/auth/sdk";
import { useNavigate } from "react-router-dom";
import { useGetAttemptAllStudentConnect } from "@/api/queries";
import { useEffect, useMemo, useState } from "react";
import { getProfileState } from "@/store/profileStore";
import NotificationDrawer from "@/components/NotificationDrawer"; // adjust alias if needed

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

  // Add these
const [menuOpened, setMenuOpened] = useState(false);
const closeMenu = () => setMenuOpened(false);

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
    } catch (_) { }
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
        s?.setActiveProfileId || s?.setProfileId || s?.setSelectedProfileId || s?.setCurrentProfileId;
      if (typeof setActiveProfileIdAction === "function") {
        setActiveProfileIdAction(p.id);
      }
    } catch (_) {}

    window.dispatchEvent(
      new CustomEvent("profile:changed", { detail: { profileId: p.id, profile: p } })
    );

    // NEW: collapse children + close dropdown
    setChildrenOpen(false);
    closeMenu();
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
      `web_${user?.role == "teacher"
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

  /** NEW: Notification drawer state */
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  /** ---------------- UI ---------------- */
  return (
    <div className="relative flex font-[500] py-4 text-[16px] px-[30px] justify-between items-center z-50 gap-4 h-[8vh] shadow-md bg-white">
      {/* Left: Name + (optional) Burger */}
      <div className="flex items-center gap-3">
        <p className="font-Inter text-[20px]">
          {user?.school?.name || ""}
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
      <div className="flex items-center justify-end pl-2 gap-1">
        <div
          // onClick={() => navigate("schooldashboard/request")}
          onClick={() => setIsNotifOpen(true)}
          className="relative cursor-pointer"
        >
          {(user?.role === "schoolAdmin" || user?.role === "teacher") && (
            <div>
              {/* Notification bell */}
              <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.577 6.31223C16.577 5.71776 16.0951 5.23584 15.5006 5.23584C14.9062 5.23584 14.4242 5.71776 14.4242 6.31223V6.9267C10.773 7.44882 7.96591 10.5879 7.96591 14.384L7.96591 18.69C7.96591 18.69 7.96592 18.6898 7.96591 18.69C7.96581 18.692 7.96508 18.7064 7.96041 18.7347C7.95481 18.7686 7.94486 18.8147 7.92844 18.874C7.89515 18.9942 7.84217 19.1439 7.76815 19.3209C7.61975 19.6757 7.41055 20.0843 7.17917 20.4964C6.74415 21.2714 6.52488 22.1948 6.6895 23.0729C6.8631 23.999 7.45919 24.8066 8.47726 25.1943C9.38671 25.5405 10.5973 25.8572 12.196 26.0457C12.234 26.0787 12.279 26.1164 12.3307 26.1577C12.4924 26.2872 12.7236 26.4549 13.0156 26.6218C13.5954 26.9531 14.4525 27.3018 15.5006 27.3018C16.5488 27.3018 17.4059 26.9531 17.9856 26.6218C18.2777 26.4549 18.5088 26.2872 18.6706 26.1577C18.7223 26.1164 18.7673 26.0787 18.8053 26.0457C20.404 25.8572 21.6146 25.5405 22.524 25.1943C23.5421 24.8066 24.1382 23.999 24.3118 23.0729C24.4764 22.1948 24.2571 21.2714 23.8221 20.4964C23.5907 20.0843 23.3815 19.6757 23.2331 19.3209C23.1591 19.1439 23.1061 18.9942 23.0728 18.874C23.0564 18.8147 23.0465 18.7686 23.0409 18.7347C23.0362 18.7064 23.0355 18.6923 23.0354 18.6902C23.0354 18.69 23.0354 18.6902 23.0354 18.6902L23.0354 18.6811V14.3845C23.0354 10.5885 20.2283 7.44891 16.577 6.92671V6.31223ZM10.1187 14.384C10.1187 11.4119 12.528 9.0032 15.5006 9.0032C18.4731 9.0032 20.8826 11.4123 20.8826 14.3845V18.6907C20.8826 19.189 21.0693 19.7265 21.247 20.1515C21.4401 20.6132 21.6932 21.1018 21.9449 21.5502C22.1896 21.9862 22.248 22.3982 22.1959 22.6763C22.1527 22.9064 22.0377 23.0759 21.758 23.1824C20.601 23.6229 18.6479 24.0726 15.5006 24.0726C12.3534 24.0726 10.4003 23.6229 9.24331 23.1824C8.9636 23.0759 8.84856 22.9064 8.80542 22.6763C8.75329 22.3982 8.81165 21.9862 9.05639 21.5502C9.3081 21.1018 9.56115 20.6132 9.75425 20.1515C9.93199 19.7265 10.1187 19.189 10.1187 18.6907V14.384Z" fill="#667185" />
              </svg>

              <p
                className={`absolute -top-4 text-white  right-[-4px] py-[1px] rounded-full px-[3px] ${totalSchoolConnectList > 0 ? "bg-red-700" : "bg-white"
                  }  `}
              >
                {totalSchoolConnectList || 0}
              </p>
            </div>
          )}
        </div>
        {/* 
        <button
          className="relative rounded-full p-2 text-[#475467] hover:bg-gray-100"
          aria-label="Open notifications"
        >
          <IoNotificationsOutline className="h-6 w-6" />
          <span className="absolute right-2 top-2 inline-block h-2 w-2 rounded-full bg-[#84C127]" />
        </button> */}

        <Menu
          opened={menuOpened}
          onChange={setMenuOpened}
          closeOnItemClick={false}
          withinPortal
          width={280}
          shadow="lg"
          radius={10}
          position="bottom-end"
          styles={{ dropdown: { transform: "translateX(0px)" } }}
        >
          <Menu.Target>
            <div className="flex justify-center items-center gap-2 cursor-pointer rounded-3xl p-2 px-4">
              {/* Parent → show active child’s initials + name; Others → admin avatar + label */}
              {user?.role === "user" ? (
                <div className="flex items-center gap-2">
                  {activeProfile?.image ? (
                    <img
                      src={activeProfile.image}
                      alt={activeProfile.name || "Child Avatar"}
                      className="w-[35px] h-[35px] rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-[35px] h-[35px] bg-[#bcd678] rounded-full">
                      <span className="text-white font-bold">
                        {activeProfile?.name
                          ? activeProfile.name.slice(0, 2).toUpperCase()
                          : "CC"}
                      </span>
                    </div>
                  )}
                  <span className="flex items-center gap-2">
                    <span className="hidden">{activeProfile?.name || "Choose child"}</span>
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
            {user?.role == "user" && (
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
            )}

            {/* Children list (hidden by default, only for parent role) */}
            {user?.role === "user" && childrenOpen && Array.isArray(profiles) && profiles.length > 0 && (
              <div className="px-2 pb-2">
                <div className="px-2 py-1 text-xs text-[#98A2B3] uppercase">Children</div>
                <div className="rounded-md border border-[#EEF2F6] max-h-[240px] overflow-y-auto">
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        handlePickProfile(p);
                        setChildrenOpen(false); // Close the children dropdown
                      }}
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

      <NotificationDrawer open={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
};

export default SchoolDashboardHeader;
