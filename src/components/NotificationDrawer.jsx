import React, { useEffect, useMemo, useState } from "react";
import { IoCloseOutline, IoFilterOutline, IoEllipsisVertical } from "react-icons/io5";
import { GetAttemptAllStudentConnect, GetAttemptStudentConnect } from "@/api/api";
// If you want clicking a notification to navigate, uncomment the next line and the onClick handler below.
// import { useNavigate } from "react-router-dom";

/** Demo items (fallback if API returns nothing or fails) */
const seed = [
  {
    id: 1,
    title: "New Connection Request",
    body: "New connection request from Abimbola Roda.",
    read: false,
    date: new Date("2025-08-01T10:00:00"),
  },
  {
    id: 2,
    title: "New Teacher Accepted",
    body: "Adams Babajide has accepted your Teacher Invite.",
    read: false,
    date: new Date("2025-08-01T09:10:00"),
  },
  {
    id: 3,
    title: "New Teacher Accepted",
    body: "Adams Babajide has accepted your Teacher Invite.",
    read: true,
    date: new Date("2025-07-31T17:20:00"),
  },
];

/* ---------------- Helpers (logic only; UI unchanged) ---------------- */
const getRole = () => {
  try {
    const s = sessionStorage.getItem("user") || localStorage.getItem("user");
    const u = s ? JSON.parse(s) : null;
    return (u?.role || "").toString();
  } catch {
    return "";
  }
};
const isSchoolAdmin = (role) => {
  const r = (role || "").toLowerCase();
  return r === "schooladmin" || r === "school_admin";
};
const fullName = (r) =>
  (r?.name && r.name.trim()) ||
  `${(r?.firstname || "").trim()} ${(r?.lastname || "").trim()}`.trim() ||
  "—";
const mapRecordToNotification = (r) => {
  const student = fullName(r);
  const when = r?.created_at || r?.declined_at || new Date().toISOString();
  return {
    id: r?.id ?? Math.random(),
    title: "New Connection Request",
    body: `New connection request from ${student}.`,
    read: false,
    date: new Date(when),
  };
};

export default function NotificationDrawer({ open, onClose, items = seed }) {
  // const navigate = useNavigate(); // uncomment if you want navigation on click

  const [local, setLocal] = useState(items);
  const [sortOpen, setSortOpen] = useState(false);
  const [itemMenu, setItemMenu] = useState(null); // id of item menu open
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'unread'
  const [loading, setLoading] = useState(false); // <-- skeleton controller

  /* keep prop items in sync as fallback */
  useEffect(() => setLocal(items), [items]);

  /* close on ESC */
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  /* fetch role-based connection requests when drawer opens; show skeleton first */
  useEffect(() => {
    if (!open) return; // only fetch when opening the drawer
    let ignore = false;

    (async () => {
      try {
        setLoading(true); // show skeleton immediately
        const role = getRole();
        const admin = isSchoolAdmin(role);

        const res = admin
          ? await GetAttemptAllStudentConnect("1")
          : await GetAttemptStudentConnect("1");

        const records = res?.data?.data?.records || [];
        console.log('records', records)
        const mapped = records.map(mapRecordToNotification);

        if (!ignore) {
          // Always set to API result (even if empty) so we don't keep stale seed
          setLocal(mapped.length ? mapped : []);
        }
      } catch (e) {
        // keep whatever is in local (seed) if API fails
      } finally {
        if (!ignore) setLoading(false); // hide skeletons
      }
    })();

    return () => {
      ignore = true;
    };
  }, [open]);

  /* sorting (unchanged) */
  const sorted = useMemo(() => {
    const data = [...local];
    if (sortBy === "unread") data.sort((a, b) => Number(a.read) - Number(b.read));
    else if (sortBy === "oldest") data.sort((a, b) => a.date - b.date);
    else data.sort((a, b) => b.date - a.date);
    return data;
  }, [local, sortBy]);

  const markAsRead = (id, read = true) =>
    setLocal((curr) => curr.map((n) => (n.id === id ? { ...n, read } : n)));

  /* skeleton list renderer (UI matches your layout spacing) */
  const SkeletonList = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative border-[0.1px] border-b-[0px] border-[#D7DAE0] bg-[#f5f7f8] px-4 py-3"
        >
          <div className="pr-8">
            <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
            <div className="mt-[6px] h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
          </div>
          <div className="absolute right-1 top-3 h-5 w-5 rounded bg-gray-200 animate-pulse" />
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      {/* drawer */}
      <aside
        aria-label="Notifications"
        className={`fixed right-0 top-0 z-[61] h-full w-full max-w-[520px] transform bg-white shadow-xl transition-transform duration-300 sm:max-w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-[#E4E7EC] bg-[#C9DE73] px-4 py-3">
          <button
            aria-label="Close"
            onClick={onClose}
            className="flex items-center gap-2 text-white/90"
          >
            <IoCloseOutline className="text-2xl" />
            <span className="font-Inter font-medium text-[18px] leading-[27px]">
              Notification
            </span>
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen((s) => !s)}
              className="flex items-center gap-2 text-white/90"
            >
              <IoFilterOutline className="text-xl" />
              <span className="text-[13px]">Sort by</span>
            </button>

            {/* sort dropdown */}
            {sortOpen && (
              <div
                className="absolute right-0 mt-2 w-40 rounded-md border border-[#E4E7EC] bg-white py-1 text-sm shadow-lg z-[1000]"
                onMouseLeave={() => setSortOpen(false)}
              >
                <button
                  className={`block w-full px-3 py-2 text-left hover:bg-gray-50 ${
                    sortBy === "newest" ? "font-medium text-gray-900" : "text-gray-600"
                  }`}
                  onClick={() => {
                    setSortBy("newest");
                    setSortOpen(false);
                  }}
                >
                  Newest first
                </button>
                <button
                  className={`block w-full px-3 py-2 text-left hover:bg-gray-50 ${
                    sortBy === "oldest" ? "font-medium text-gray-900" : "text-gray-600"
                  }`}
                  onClick={() => {
                    setSortBy("oldest");
                    setSortOpen(false);
                  }}
                >
                  Oldest first
                </button>
                <button
                  className={`block w-full px-3 py-2 text-left hover:bg-gray-50 ${
                    sortBy === "unread" ? "font-medium text-gray-900" : "text-gray-600"
                  }`}
                  onClick={() => {
                    setSortBy("unread");
                    setSortOpen(false);
                  }}
                >
                  Unread on top
                </button>
              </div>
            )}
          </div>
        </div>

        {/* list */}
        <div className="h-[calc(100%-56px)] overflow-y-auto p-3 bg-white">
          {/* Skeleton first while loading */}
          {loading ? (
            <SkeletonList />
          ) : (
            <>
              {(sorted.length ? sorted : seed).map((n) => (
                <div
                  key={n.id}
                  className="cursor-pointer relative border-[0.1px] border-b-[0px] border-[#D7DAE0] bg-[#f5f7f8] px-4 py-3"
                  // If you want navigation to the requests page on click, uncomment:
                  // onClick={() => {
                  //   navigate("/schooldashboard/students/connection-requests");
                  //   onClose?.();
                  // }}
                >
                  <div className="pr-8">
                    <p
                      className={`font-Arimo font-bold text-[16px] leading-[21px] tracking-[0.1px] ${
                        n.read ? "text-[#475467]" : "text-[#2C3137]"
                      }`}
                    >
                      {n.title}
                    </p>
                    <p className="mt-0.5 font-Arimo font-normal mt-[6px] text-[14px] leading-[18px] tracking-[0.1px] text-[#51575E]">
                      {n.body}
                    </p>
                  </div>

                  {/* item menu trigger */}
                  <button
                    className="absolute right-1 top-3 rounded p-1 text-[#98A2B3] hover:bg-gray-50"
                    onClick={() =>
                      setItemMenu((cur) => (cur === n.id ? null : n.id))
                    }
                  >
                    <IoEllipsisVertical className="text-lg" />
                  </button>

                  {/* item dropdown */}
                  {itemMenu === n.id && (
                    <div className="absolute right-2 top-9 z-[62] w-44 rounded-md border border-[#E4E7EC] bg-white py-1 text-sm shadow-lg">
                      {!n.read ? (
                        <button
                          className="block w-full px-3 py-2 text-left hover:bg-gray-50 font-[SF Pro Rounded] font-medium text-[14px] leading-[21px] tracking-[0.6px]"
                          onClick={() => {
                            setItemMenu(null);
                            setLocal((curr) =>
                              curr.map((x) =>
                                x.id === n.id ? { ...x, read: true } : x
                              )
                            );
                          }}
                        >
                          Mark as read
                        </button>
                      ) : (
                        <button
                          className="block w-full px-3 py-2 text-left hover:bg-gray-50 font-[SF Pro Rounded] font-medium text-[14px] leading-[21px] tracking-[0.6px]"
                          onClick={() => {
                            setItemMenu(null);
                            setLocal((curr) =>
                              curr.map((x) =>
                                x.id === n.id ? { ...x, read: false } : x
                              )
                            );
                          }}
                        >
                          Mark as unread
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Optional empty state if API returns none and you don't want seed fallback:
                  {sorted.length === 0 && (
                    <div className="text-center text-sm text-gray-500 py-10">
                      No notifications yet.
                    </div>
                  )}
              */}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
