import React, { useMemo, useRef, useState } from "react";
import { FiSearch, FiChevronDown, FiMoreVertical } from "react-icons/fi";
import { useGetLicense, useCancelSubscription } from "@/api/queries";
import { TLicense } from "../Main/Main";
import Button from "@/components/Button";
import ClassesIcon from "@/assets/components/ClassesIcon";
import TeachersIcon from "@/assets/components/TeachersIcon";
import StudentsIcon from "@/assets/components/StudentsIcon";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/Pagination";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { notifications } from "@mantine/notifications";

const Billing = () => {
  const navigate = useNavigate();

  // ---- data: license + user (for subscription card) ----
  const { data: dataLicense } = useGetLicense();
  const license: TLicense = dataLicense?.data?.data?.school?.licence;
  const [user] = useStore(getUserState) as any[];

  // ---- subscription helpers ----
  const subscription = user?.subscription || null;
  const hasActiveSub = Boolean(subscription?.status);
  const planName = (subscription?.plan && String(subscription.plan).trim()) || "Unknown plan";
  const planCycle =
    (subscription?.cycle && String(subscription.cycle).trim()) ||
    (subscription?.tenure && String(subscription.tenure).trim()) ||
    ""; // e.g. "Annual" if provided by API
  const startDate = subscription?.start_date || subscription?.start || "--";
  const expiryDate = subscription?.end_date || subscription?.expiry || "--";

  // ---- payment history (table area) ----
  type HistoryItem = {
    id: string;
    date: string;
    plan: "Monthly" | "Annual";
    amount: number;
    status: "Completed" | "Pending" | "Failed";
  };

  // demo rows – replace with API list when available
  const history: HistoryItem[] = [
    { id: "1", date: "Nov 21, 2024", plan: "Monthly", amount: 3399.15, status: "Completed" },
    { id: "2", date: "Oct 21, 2024", plan: "Monthly", amount: 3399.15, status: "Pending" },
    { id: "3", date: "Sept 21, 2024", plan: "Monthly", amount: 3399.15, status: "Failed" },
    { id: "4", date: "Aug 21, 2024", plan: "Monthly", amount: 3399.15, status: "Completed" },
    { id: "5", date: "Jul 21, 2024", plan: "Monthly", amount: 3399.15, status: "Completed" },
    { id: "6", date: "May 21, 2024", plan: "Monthly", amount: 3399.15, status: "Failed" },
    { id: "7", date: "Mar 21, 2024", plan: "Monthly", amount: 3399.15, status: "Completed" },
  ];

  // ---- filters/sort/search/pagination (table features only) ----
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Failed" | "Completed">("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "amount_desc" | "amount_asc">("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortBtnRef = useRef<HTMLButtonElement | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 7;

  const naira = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 2 }).format(n);

  const filtered = useMemo(() => {
    const list = history.filter((h) => {
      const hay = `${h.date} ${h.plan} ${h.status}`.toLowerCase();
      const q = query.trim().toLowerCase();
      if (activeTab === "Pending" && h.status !== "Pending") return false;
      if (activeTab === "Failed" && h.status !== "Failed") return false;
      if (activeTab === "Completed" && h.status !== "Completed") return false;
      return hay.includes(q);
    });

    const sorted = [...list].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      if (sortBy === "newest") return db - da;
      if (sortBy === "oldest") return da - db;
      if (sortBy === "amount_desc") return b.amount - a.amount;
      if (sortBy === "amount_asc") return a.amount - b.amount;
      return 0;
    });

    return sorted;
  }, [history, query, sortBy, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  const StatusBadge: React.FC<{ status: HistoryItem["status"] }> = ({ status }) => {
    const styles =
      status === "Completed"
        ? "bg-green-100 text-green-700 border-green-200"
        : status === "Pending"
        ? "bg-gray-100 text-gray-700 border-gray-200"
        : "bg-red-100 text-red-700 border-red-200";
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${styles}`}>
        {status}
      </span>
    );
  };

  // ---- cancel subscription (3-dot menu + modal) ----
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { mutate: cancelSubscription, isLoading: canceling } = useCancelSubscription();

  const handleCancel = () => {
    const subId = subscription?.id;
    // per instruction: when role is 'user', pass sub id; otherwise call normally
    const payload = user?.role === "user" ? String(subId ?? "") : "";
    cancelSubscription(payload as any, {
      onSuccess: (res: any) => {
        notifications.show({
          title: "Subscription cancelled",
          message: res?.data?.message || "Your subscription has been cancelled successfully.",
          color: "green",
        });
        setShowCancelModal(false);
        setMenuOpen(false);
        // optional: refresh profile page state
        // window.location.reload();
      },
      onError: (err: any) => {
        notifications.show({
          title: "Error",
          message: err?.response?.data?.message || "Could not cancel subscription.",
          color: "red",
        });
      },
    });
  };

  return (
    <div className="px-8 py-5">
      {/* ------------------- Current Plan Summary (UNCHANGED content box) ------------------- */}
      <div className="border-[2px] border-[#ECEFF1] p-8 rounded-md">
        <div className="flex items-start justify-between">
          <p className="text-[14px] font-InterReg">Subscription Plan</p>

          {/* 3-dot menu only when not free */}
          {hasActiveSub && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 rounded-md hover:bg-gray-50"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <FiMoreVertical className="text-gray-600" />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <button
                    onClick={() => {
                      setShowCancelModal(true);
                      setMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    Cancel Subscription
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className="mb-5 mt-2" />

        <div className="flex items-center justify-between my-4">
          <div className="w-[60%] flex justify-between items-center">
            {/* Left: plan title + cycle badge */}
            <div>
              <p className="font-Inter text-[20px]">
                {hasActiveSub ? `${planName} ${planName && "Plan"}` : "Free"}
              </p>
              <p className="text-[12px] inline-block rounded border px-2 py-0.5 text-gray-600">
                {hasActiveSub ? planCycle || "Annual" : "--"}
              </p>
            </div>

            {/* fee / start / expiry */}
            <div>
              <p className="text-[#696969]">Subscription fee</p>
              <p className="text-[#2C3137]">
                {hasActiveSub && subscription?.fee
                  ? new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      minimumFractionDigits: 2,
                    }).format(subscription.fee)
                  : "--"}
              </p>
            </div>

            <div>
              <p className="text-[#696969]">Start date</p>
              <p className="text-[#2C3137]">{hasActiveSub ? startDate : "--"}</p>
            </div>
            <div>
              <p className="text-[#696969]">Expiry</p>
              <p className="text-[#2C3137]">{hasActiveSub ? expiryDate : "--"}</p>
            </div>
          </div>

          <div className="w-[40%] flex justify-end">
            {hasActiveSub ? (
              <Button
                size="sm"
                backgroundColor="green"
                className="px-[14px] rounded-full"
                onClick={() => {
                  localStorage.setItem('from', '/schooldashboard/settings');
                  navigate("/packages");
                }}
              >
                Upgrade Subscription
              </Button>
            ) : (
              <Button
                size="sm"
                backgroundColor="green"
                className="px-[14px] rounded-full"
                onClick={() => {
                  localStorage.setItem('from', '/schooldashboard/settings');
                  navigate("/packages");
                }}
              >
                Buy Subscription
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------- Current License Summary (LEFT AS-IS) ------------------- */}
      <div className="border-[2px] border-[#ECEFF1] p-8 rounded-md mt-6">
        <p className="text-[14px] font-InterReg">Current Plan Summary</p>
        <hr className="mb-5 mt-2" />
        <div className="flex justify-between items-center">
          <div className="w-[165px] h-[94px] text-[14px] font-InterReg">
            <p className="text-[14px] font-Inter flex gap-2 justify-center">
              <ClassesIcon /> Class
            </p>
            <p className="font-Inter text-[20px] text-center">
              {license?.license_class_count || "0"}
            </p>
            <p className="text-[#98A2B3] font-InterReg text-center text-[12px]">
              <span className="text-[14px] px-1 font-Inter text-customGreen">
                {license?.added_class_count || "0 "}
              </span>
              slots available of
              <span className="text-[14px] font-Inter px-1">
                {license?.license_class_count || "0"}
              </span>
            </p>
          </div>

          <div className="w-[165px] h-[94px]">
            <p className="text-[14px] font-Inter flex gap-2 justify-center">
              <TeachersIcon />
              Teachers
            </p>
            <p className="font-Inter text-[20px] text-center">
              {license?.license_teacher_count || "0"}
            </p>
            <p className="text-[#98A2B3] font-InterReg text-center text-[12px]">
              <span className="text-[14px] px-1 font-Inter text-customGreen">
                {license?.added_teacher_count || "0"}
              </span>
              slots available of
              <span className="text-[14px] font-Inter px-1">
                {license?.license_teacher_count || "0"}
              </span>
            </p>
          </div>

          <div className="w-[165px] h-[94px]">
            <p className="text-[14px] font-Inter flex gap-2 justify-center">
              <StudentsIcon />
              Students
            </p>
            <p className="font-Inter text-[20px] text-center">
              {license?.license_student_count || "0"}
            </p>
            <p className="text-[#98A2B3] font-InterReg text-center text-[12px]">
              <span className="text-[16px] font-Inter px-1 text-customGreen">
                {license?.added_student_count || "0"}
              </span>
              slots available of
              <span className="text-[14px] font-Inter px-1">
                {license?.license_student_count || "0"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ------------------- Payment History (HIDE WHEN FREE) ------------------- */}
      {hasActiveSub && (
        <section className="mt-8">
          <div className="flex items-center justify-between">
            {/* Tabs */}
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              {(["All", "Pending", "Failed", "Completed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    activeTab === tab ? "bg-[#ebf5e9] text-[#2d7a34]" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search + Sort (Sort menu now toggles open/closed) */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search here..."
                  className="w-64 rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div className="relative">
                <button
                  ref={sortBtnRef}
                  onClick={() => setSortOpen((v) => !v)}
                  onBlur={(e) => {
                    // close if focus leaves dropdown area
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setSortOpen(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                  Sort by <FiChevronDown className="text-gray-500" />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 z-10 mt-1 w-44 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <ul className="py-1 text-sm">
                      <li>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSortBy("newest");
                            setSortOpen(false);
                          }}
                          className="block w-full px-3 py-1.5 text-left hover:bg-gray-50"
                        >
                          Newest first
                        </button>
                      </li>
                      <li>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSortBy("oldest");
                            setSortOpen(false);
                          }}
                          className="block w-full px-3 py-1.5 text-left hover:bg-gray-50"
                        >
                          Oldest first
                        </button>
                      </li>
                      <li>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSortBy("amount_desc");
                            setSortOpen(false);
                          }}
                          className="block w-full px-3 py-1.5 text-left hover:bg-gray-50"
                        >
                          Amount (High → Low)
                        </button>
                      </li>
                      <li>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSortBy("amount_asc");
                            setSortOpen(false);
                          }}
                          className="block w-full px-3 py-1.5 text-left hover:bg-gray-50"
                        >
                          Amount (Low → High)
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Plan Purchased</th>
                  <th className="px-5 py-3">Amount paid</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {current.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="px-5 py-4 text-gray-800">{row.date}</td>
                    <td className="px-5 py-4 text-gray-600">{row.plan}</td>
                    <td className="px-5 py-4 font-medium">{naira(row.amount)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => console.log("View clicked for", row.id)}
                        className="text-emerald-700 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {current.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Shared Pagination (consistent across app) */}
          <div className="mt-3 flex items-center justify-end">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))}
            />
          </div>
        </section>
      )}

      {/* ------------------- Cancel Modal ------------------- */}
      {showCancelModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="w-[min(480px,92vw)] overflow-hidden rounded-xl border bg-white shadow-xl">
            <div className="bg-[#bcd678] px-5 py-3 text-base font-medium text-white">Cancel Subscription</div>
            <div className="px-5 py-6 text-center">
              <p className="text-gray-700">
                Are you sure you want to cancel your subscription? It cannot be undone.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="rounded-full border border-gray-300 bg-gray-100 px-5 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancel}
                  disabled={canceling}
                  className="rounded-full bg-[#bcd678] px-5 py-2 text-sm text-white disabled:opacity-60"
                >
                  {canceling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
