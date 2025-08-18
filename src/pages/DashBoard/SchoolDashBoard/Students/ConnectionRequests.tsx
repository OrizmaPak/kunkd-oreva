import React, { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { IoFilterOutline } from "react-icons/io5";
import notfound from "@/assets/notfound.png";
// import placeholder from "@/assets/avatar-placeholder.png"; // use a default avatar
import {
  GetAttemptAllStudentConnect,
  GetAttemptStudentConnect,
  AcceptStudentAdmission,
  RejectStudentAdmission,
} from "@/api/api";

type TParent = { firstname?: string; lastname?: string; user_id?: number; email?: string };
type TClass = { class_id?: number; class_name?: string };
type TRecord = {
  id: number;
  firstname?: string;
  lastname?: string;
  name?: string;
  image?: string;
  parent?: TParent;
  class?: TClass;
  status?: string; // "pending" | "approved" | "declined"
  created_at?: string; // may be missing
  declined_at?: string; // may be missing
  email?: string; // parent email sometimes provided on top-level
};

type TPagedResponse = {
  links: unknown;
  number_pages: number;
  record_per_page: number;
  records: TRecord[];
  totalRecord: number;
};

type TApiEnvelope = {
  status: boolean;
  message: string;
  data: TPagedResponse;
};

const getRole = () => {
  try {
    const s = sessionStorage.getItem("user") || localStorage.getItem("user");
    const u = s ? JSON.parse(s) : null;
    return (u?.role || "").toString();
  } catch {
    return "";
  }
};

const isSchoolAdmin = (role: string) => {
  const r = role.toLowerCase();
  return r === "schooladmin" || r === "school_admin";
};

const fullName = (r: TRecord) =>
  r.name?.trim() ||
  `${(r.firstname || "").trim()} ${(r.lastname || "").trim()}`.trim() ||
  "—";

const parentName = (p?: TParent) =>
  p ? `${p.firstname || ""} ${p.lastname || ""}`.trim() : "—";

const parentEmail = (r: TRecord) => r.parent?.email || r.email || "—";

const classNameOf = (r: TRecord) => r.class?.class_name || "—";

const statusOf = (r: TRecord) => (r.status || "pending").toLowerCase();

const ConnectionRequests: React.FC = () => {
  const role = getRole();
  const admin = isSchoolAdmin(role);

  const [activeTab, setActiveTab] = useState<"pending" | "denied">("pending");
  const [search, setSearch] = useState("");
  const [sortClass, setSortClass] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [showModal, setShowModal] = useState<null | "accept" | "deny">(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSizeFallback = 10;

  // server data for current page
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<TRecord[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // item selected for action
  const [activeItem, setActiveItem] = useState<TRecord | null>(null);
  const [acting, setActing] = useState(false);

  // fetch page
  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = (admin
          ? await GetAttemptAllStudentConnect(String(currentPage))
          : await GetAttemptStudentConnect(String(currentPage))) as unknown as {
          data: TApiEnvelope;
        };
        if (ignore) return;
        const payload = res?.data?.data;
        const recs = payload?.records || [];
        setRecords(recs);

        // prefer backend number_pages if provided
        const np = Number(payload?.number_pages || 0);
        if (np > 0) setTotalPages(np);
        else {
          const per = Number(payload?.record_per_page || pageSizeFallback);
          const total = Number(payload?.totalRecord || recs.length);
          setTotalPages(Math.max(1, Math.ceil(total / (per || pageSizeFallback))));
        }
      } catch {
        if (!ignore) {
          setRecords([]);
          setTotalPages(1);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [admin, currentPage]);

  // class list (for the "Sort by" dropdown)
  const classOptions = useMemo(() => {
    const s = new Set<string>();
    records.forEach((r) => {
      const c = classNameOf(r);
      if (c && c !== "—") s.add(c);
    });
    const arr = Array.from(s);
    // fallback options if no classes yet (keeps your dropdown looking same)
    if (arr.length === 0) return ["Primary 1", "Primary 2", "Class 1", "Class 2"];
    return arr;
  }, [records]);

  // client-side filter for tab + search + class
  const filtered = useMemo(() => {
    let rows = records;

    // tab
    rows = rows.filter((r) => {
      const st = statusOf(r);
      if (activeTab === "pending") return st === "pending";
      // "denied" tab → show declined
      return st === "declined";
    });

    // class
    if (sortClass) {
      rows = rows.filter((r) => classNameOf(r) === sortClass);
    }

    // search (student/parent/class/email)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((r) => {
        const n = fullName(r).toLowerCase();
        const p = parentName(r.parent).toLowerCase();
        const c = classNameOf(r).toLowerCase();
        const e = parentEmail(r).toLowerCase();
        return n.includes(q) || p.includes(q) || c.includes(q) || e.includes(q);
      });
    }

    return rows;
  }, [records, activeTab, sortClass, search]);

  // Your table function expects pageSize = 7 client-side. We’re server-paging already,
  // so we’ll keep the UI pagination as server pagination. The table always renders
  // the current “records” page from the server after local filtering.
  // (If filtering empties the page, the empty state appears — consistent with your UX.)
  const pagedRequests = filtered;
  const headerCount = filtered.length; // badge count in header reflects current tab/filter page

  const onAsk = (type: "accept" | "deny", item: TRecord) => {
    setActiveItem(item);
    setShowModal(type);
  };

  const onConfirm = async () => {
    if (!activeItem || !showModal) return;
    try {
      setActing(true);
      const payload = { student_id: activeItem.id } as any; // backend expects the request/student id
      if (showModal === "accept") {
        await AcceptStudentAdmission(payload);
      } else {
        await RejectStudentAdmission(payload);
      }
      setShowModal(null);
      setActiveItem(null);
      // refetch this page
      const samePage = currentPage;
      setCurrentPage(samePage); // triggers useEffect
    } catch {
      // keep modal closed but do nothing special visually to avoid altering the design
      setShowModal(null);
      setActiveItem(null);
    } finally {
      setActing(false);
    }
  };

  const renderTable = () => {
    if (loading) {
      // lightweight skeleton keeping the same table structure
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-[#F9FAFB] text-left">
                <th className="px-4 py-3">Student's Name</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Parent's Email</th>
                <th className="px-4 py-3">Parent's Name</th>
                {activeTab === "denied" && <th className="px-4 py-3">Date Rejected</th>}
                {activeTab === "pending" && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
                      <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                  </td>
                  {activeTab === "denied" && (
                    <td className="px-4 py-3">
                      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                    </td>
                  )}
                  {activeTab === "pending" && (
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-4">
                        <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (pagedRequests.length === 0) {
      return (
        <div className="text-center py-20">
          <img src={notfound} alt="No Requests" className="mx-auto w-40 mb-4" />
          <h3 className="font-semibold text-lg text-gray-800">No connection requests</h3>
          <p className="text-sm text-gray-500">Connection requests would appear here.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-[#F9FAFB] text-left">
              <th className="px-4 py-3">Student's Name</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Parent's Email</th>
              <th className="px-4 py-3">Parent's Name</th>
              {activeTab === "denied" && <th className="px-4 py-3">Date Rejected</th>}
              {activeTab === "pending" && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {pagedRequests.map((req, i) => {
              const sName = fullName(req);
              const cls = classNameOf(req);
              const pEmail = parentEmail(req);
              const pName = parentName(req.parent);
              const avatar = req.image || '';
              const rejectedDate = req.declined_at || req.created_at || "—";

              return (
                <tr key={`${req.id}-${i}`} className="border-t border-gray-200">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img src={avatar} className="w-8 h-8 rounded-full object-cover" alt="avatar" />
                    <span>{sName}</span>
                  </td>
                  <td className="px-4 py-3">{cls}</td>
                  <td className="px-4 py-3">{pEmail}</td>
                  <td className="px-4 py-3">{pName}</td>
                  {activeTab === "denied" && <td className="px-4 py-3">{rejectedDate}</td>}
                  {activeTab === "pending" && (
                    <td className="px-4 py-3 text-right space-x-4">
                      <button
                        className="text-grey-500 hover:underline cursor-pointer font-semibold"
                        onClick={() => onAsk("deny", req)}
                        disabled={acting}
                      >
                        Deny
                      </button>
                      <button
                        className="text-green-500 hover:underline cursor-pointer font-semibold"
                        onClick={() => onAsk("accept", req)}
                        disabled={acting}
                      >
                        {acting && activeItem?.id === req.id && showModal === "accept"
                          ? "Working..."
                          : "Accept"}
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    );
  };

  // 1. Modal Component (unchanged styles)
  const ConfirmationModal = ({
    type,
    onConfirm,
    onCancel,
  }: {
    type: "accept" | "deny";
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    const isAccept = type === "accept";
    return (
      <div className="fixed -top-6 inset-0 bg-black bg-opacity-20 flex items-center h-screen justify-center z-50">
        <div className="bg-white rounded-3xl w-full max-w-[400px] text-center shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#A7CD3A] py-3 px-3">
            <h3 className="text-base font-semibold text-white text-left">
              {isAccept ? "Accept Request" : "Deny Request"}
            </h3>
          </div>

          {/* Message */}
          <div className="p-5 space-y-6">
            <p className="text-sm text-gray-700">
              Are you sure you want to {isAccept ? "accept" : "deny"} this connection request?
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 font-semibold">
              <button
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 bg-white"
                onClick={onCancel}
                disabled={acting}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-full text-white ${
                  isAccept ? "bg-[#A7CD3A]" : "bg-[#A7CD3A]"
                }`}
                onClick={onConfirm}
                disabled={acting}
              >
                {acting ? "Working..." : isAccept ? "Yes, accept request" : "Yes, deny request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          Requests{" "}
          <span className="ml-2 bg-[#CDE6B5] text-xs text-[#4B6B10] px-2 py-1 rounded-full">
            {headerCount}
          </span>
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        {/* Tabs + Search */}
        <div className="flex flex-wrap justify-between items-center px-4 py-3 border-b border-gray-200 gap-3">
          <div className="flex space-x-0">
            <button
              onClick={() => {
                setActiveTab("pending");
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-md text-sm rounded-r-none font-medium ${
                activeTab === "pending" ? "bg-[#A7CD3A] text-white" : "text-gray-600 bg-gray-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => {
                setActiveTab("denied");
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-md text-sm rounded-l-none font-medium ${
                activeTab === "denied" ? "bg-[#A7CD3A] text-white" : "text-gray-600 bg-gray-100"
              }`}
            >
              Denied
            </button>
          </div>

          <div className="flex items-center gap-3">
            <SearchBar value={search} placeholder="Search here…" onChange={setSearch} />
            <div className="relative">
              <button
                className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white"
                onClick={() => setSortOpen((s) => !s)}
              >
                Sort by
                <IoFilterOutline className="ml-1" />
              </button>

              {sortOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                  {classOptions.map((cls) => (
                    <li
                      key={cls}
                      onClick={() => {
                        setSortClass(cls);
                        setSortOpen(false);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                    >
                      {cls}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {sortClass && (
              <span className="text-gray-600 text-sm italic ml-2">
                Filtering class: {sortClass}
              </span>
            )}
          </div>
        </div>

        {/* Table section */}
        <div className="px-4 py-3">{renderTable()}</div>
      </div>

      {showModal && (
        <ConfirmationModal
          type={showModal}
          onConfirm={onConfirm}
          onCancel={() => {
            setShowModal(null);
            setActiveItem(null);
          }}
        />
      )}
    </div>
  );
};

export default ConnectionRequests;
