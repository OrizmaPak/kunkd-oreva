import React, { useMemo, useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useGetLicense } from "@/api/queries";
import { TLicense } from "../Main/Main";
import Button from "@/components/Button";
import ClassesIcon from "@/assets/components/ClassesIcon";
import TeachersIcon from "@/assets/components/TeachersIcon";
import StudentsIcon from "@/assets/components/StudentsIcon";

const Billing = () => {
  const { data: dataLicense } = useGetLicense();
  const license: TLicense = dataLicense?.data.data.school.licence;

  type HistoryItem = {
    id: string;
    date: string; // e.g. "Nov 21, 2024"
    plan: "Monthly" | "Annual";
    amount: number; // store raw number e.g. 3399.15
    status: "Completed" | "Pending" | "Failed";
  };

  const [activeTab, setActiveTab] = useState<"All" | "Assigned" | "Ongoing" | "Completed">("Assigned");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "amount_desc" | "amount_asc">("newest");
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const history: HistoryItem[] = [
    { id: "1", date: "Nov 21, 2024", plan: "Monthly", amount: 3399.15, status: "Completed" },
    { id: "2", date: "Oct 21, 2024", plan: "Monthly", amount: 3399.15, status: "Pending" },
    { id: "3", date: "Sept 21, 2024", plan: "Monthly", amount: 3399.15, status: "Failed" },
    { id: "4", date: "Aug 21, 2024", plan: "Monthly", amount: 3399.15, status: "Completed" },
    { id: "5", date: "Jul 21, 2024", plan: "Monthly", amount: 3399.15, status: "Completed" },
    { id: "6", date: "May 21, 2024", plan: "Monthly", amount: 3399.15, status: "Failed" },
    { id: "7", date: "Mar 21, 2024", plan: "Monthly", amount: 3399.15, status: "Completed" },
    // add more rows if you want to see more pages
  ];

  const naira = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 2 }).format(n);

  const filtered = useMemo(() => {
    const list = history.filter((h) => {
      const hay = `${h.date} ${h.plan} ${h.status}`.toLowerCase();
      const q = query.trim().toLowerCase();
      if (activeTab === "Ongoing" && h.status !== "Pending") return false;
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
    return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles}`}>{status}</span>;
  };

  return (
    <div className="px-8 py-5">
      <div className="border-[2px] border-[#ECEFF1] p-8 rounded-md">
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

        <p className="text-[14px] font-InterReg mt-8">Subscription Plan</p>
        <hr className="mb-5 mt-2" />
        <div className="flex justify-between items-center my-4">
          <div className="w-[60%] flex justify-between items-center">
            <div>
              <p className="font-Inter text-[20px]">Starter Plan</p>
              <p className="text-[14px] font-InterReg">Annual</p>
            </div>
            <div>
              <p className="text-[#696969]">Start date</p>
              <p className="text-[#2C3137]">Nov 19, 2024</p>
            </div>
            <div>
              <p className="text-[#696969]">Expiry</p>
              <p className="text-[#2C3137]">Nov 19, 2025</p>
            </div>
          </div>
          <div className="w-[40%] flex justify-end items-end">
            <Button
              size="sm"
              backgroundColor="green"
              className="px-[14px] rounded-full"
            >
              Upgrade plan
            </Button>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          {/* Tabs */}
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {(["Assigned", "Ongoing", "Completed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setPage(1); }}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  activeTab === tab ? "bg-[#ebf5e9] text-[#2d7a34]" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search here..."
                className="w-64 rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div className="relative">
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                Sort by <FiChevronDown className="text-gray-500" />
              </button>
              {/* Simple dropdown */}
              <div className="absolute right-0 z-10 mt-1 w-44 rounded-lg border border-gray-200 bg-white shadow-sm">
                <ul className="py-1 text-sm">
                  <li><button onClick={() => setSortBy("newest")} className="block w-full px-3 py-1.5 text-left hover:bg-gray-50">Newest first</button></li>
                  <li><button onClick={() => setSortBy("oldest")} className="block w-full px-3 py-1.5 text-left hover:bg-gray-50">Oldest first</button></li>
                  <li><button onClick={() => setSortBy("amount_desc")} className="block w-full px-3 py-1.5 text-left hover:bg-gray-50">Amount (High → Low)</button></li>
                  <li><button onClick={() => setSortBy("amount_asc")} className="block w-full px-3 py-1.5 text-left hover:bg-gray-50">Amount (Low → High)</button></li>
                </ul>
              </div>
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
                  <td className="px-5 py-4"><StatusBadge status={row.status} /></td>
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

        {/* Pagination */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>Page {page} of {totalPages}</span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 hover:bg-gray-50"
            >
              ← Previous
            </button>

            {/* simple page numbers */}
            <div className="hidden md:flex items-center gap-1">
              {Array.from({ length: totalPages }).slice(0, Math.min(totalPages, 12)).map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`h-8 w-8 rounded-md text-sm ${
                      page === n ? "bg-emerald-600 text-white" : "border border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
              {totalPages > 12 && <span className="px-2">…</span>}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 hover:bg-gray-50"
            >
              Next →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Billing;
