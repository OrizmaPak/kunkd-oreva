// src/components/Students.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import SortDropdown from '@/components/SortDropdown';
import Pagination from '@/components/Pagination';
import AvatarName from '@/components/AvatarName';
import ActionButtons from '@/components/ActionButtons';
import { GetAdmittedStudentsInSchool } from "@/api/api";

/* ------------------------------------------------------------------
Types (kept minimal and aligned with your existing table)
-------------------------------------------------------------------*/
interface Student {
  id: number;
  name: string;
  class: string;
  avatarUrl: string;
  teacher: {
    name: string;
    avatarUrl: string;
  };
}

// API response shapes based on your sample payload
type TApiParent = {
  firstname?: string;
  lastname?: string;
  user_id?: number;
};

type TApiClass = {
  class_id?: number;
  class_name?: string;
};

type TApiStudent = {
  id: number;
  parent?: TApiParent;
  class?: TApiClass;
  name?: string;
  firstname?: string;
  lastname?: string;
  image?: string;
  status?: string;
};

type TPagedStudents = {
  links: unknown | null;
  number_pages: number;
  record_per_page: number;
  records: TApiStudent[];
  totalRecord: number;
};

type TListResponse = {
  status: boolean;
  message: string;
  data: TPagedStudents;
};

/* ------------------------------------------------------------------
Mapper: API row -> UI row (no visual change to your table)
-------------------------------------------------------------------*/
const mapApiToStudent = (r: TApiStudent): Student => {
  const displayName =
    (r.name ?? `${r.firstname ?? ""} ${r.lastname ?? ""}`)?.trim() || "—";
  const parentName =
    `${r.parent?.firstname ?? ""} ${r.parent?.lastname ?? ""}`.trim() || "—";

  return {
    id: r.id,
    name: displayName,
    class: r.class?.class_name || "—",
    avatarUrl: r.image || "",
    // Your column is labeled "Teacher's Name" — we’ll populate it with Parent’s name
    teacher: { name: parentName, avatarUrl: "" },
  };
};

/* ------------------------------------------------------------------
Local modal components (unchanged)
-------------------------------------------------------------------*/
// --- Replace your current ConfirmModal with this version ---
const ConfirmModal: React.FC<{
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disable-student-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header (lime bar) */}
        <div className="bg-lime-500 w-[449px] h-[51px] flex justify-between items-center opacity-100 pt-[12px] pr-[20px] pb-[12px] pl-[20px] rounded-tl-[12px] rounded-tr-[12px]">
          <h3
            id="disable-student-title"
            className="text-white font-medium text-[18px] leading-[27px] font-inter"
          >
            Disable Student
          </h3>
        </div>

        {/* Body */}
        <div className="w-[450px] h-[157px] opacity-100 pt-[32px] pr-[24px] pb-[32px] pl-[24px]">
          <p className="text-center text-gray-700 font-inter font-normal text-[16px] leading-[21px] tracking-[0.1px]">{message}</p>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onCancel}
              className="w-[97px] h-[40px] rounded-[100px] border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 opacity-100 px-[16px] py-[6px] gap-[6px]"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-[189px] h-[40px] rounded-[100px] bg-lime-500 text-sm text-white hover:bg-lime-600 opacity-100 px-[16px] py-[6px]"
            >
              Yes, disable student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const SuccessModal: React.FC<{
  open: boolean;
  message: string;
  onClose: () => void;
}> = ({ open, message, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-sm rounded-lg p-6 space-y-6 shadow-lg text-center">
        <p className="text-gray-700 text-base">{message}</p>
        <button
          onClick={onClose}
          className="mx-auto px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
Main component (table layout preserved exactly)
-------------------------------------------------------------------*/
const Students: React.FC = () => {
  const navigate = useNavigate();

  // Controls
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'class' | 'teacher'>('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Server-backed pagination counts
  const [serverTotalPages, setServerTotalPages] = useState(1);
  const [serverTotalRecords, setServerTotalRecords] = useState(0);

  // Data & meta
  const [rows, setRows] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [targetStudent, setTargetStudent] = useState<Student | null>(null);

  // Backend status filter, sample payload shows "approved"
  const STATUS = "approved"; // change to "admitted" if your backend expects that

  // Fetch one page from the backend whenever currentPage changes
  useEffect(() => {
    let ignore = false;

    const fetchPage = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const res = (await GetAdmittedStudentsInSchool(
          STATUS,
          String(currentPage)
        )) as unknown as { data: TListResponse };

        if (ignore) return;

        const pageData = res?.data?.data;
        const records = pageData?.records ?? [];

        setRows(records.map(mapApiToStudent));
        setServerTotalRecords(pageData?.totalRecord ?? 0);

        // Prefer backend-provided number_pages; if 0, compute fallback
        const totalPages =
          pageData?.number_pages && pageData.number_pages > 0
            ? pageData.number_pages
            : Math.max(
                1,
                Math.ceil(
                  (pageData?.totalRecord ?? 0) / (pageData?.record_per_page ?? 10)
                )
              );
        setServerTotalPages(totalPages);
      } catch (err) {
        console.error("[Students] fetch error", err);
        if (!ignore) {
          setRows([]);
          setServerTotalRecords(0);
          setServerTotalPages(1);
          setErrorMsg("Failed to load students.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchPage();
    return () => {
      ignore = true;
    };
  }, [currentPage]);

  /* ---------------- Search & Sort (on the current server page) ----------------- */
  const filtered = useMemo(
    () => rows.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())),
    [rows, query]
  );

  const paged = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const ax =
        sortKey === 'teacher' ? a.teacher.name : (a as any)[sortKey] || '';
      const bx =
        sortKey === 'teacher' ? b.teacher.name : (b as any)[sortKey] || '';
      return String(ax).localeCompare(String(bx));
    });
    return copy;
  }, [filtered, sortKey]);

  /* ---------------- Disable logic ----------------- */
  const handleDisableClick = (student: Student) => {
    setTargetStudent(student);
    setConfirmOpen(true);
  };

  const confirmDisable = () => {
    // TODO: Call backend to disable the student when endpoint/payload is ready
    setConfirmOpen(false);
    setSuccessOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      {/* Header (badge now uses server total) */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Students{' '}
          <span className="ml-2 inline-block bg-green-100 text-green-600 text-sm px-2 py-0.5 rounded-full">
            {serverTotalRecords}
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <SearchBar value={query} onChange={setQuery} placeholder="Search here…" />
          <SortDropdown
            options={[
              { label: 'Name', value: 'name' },
              { label: 'Class', value: 'class' },
              { label: 'Teacher', value: 'teacher' },
            ]}
            value={sortKey}
            onChange={(val) => setSortKey(val as any)}
          />
        </div>
      </div>

      {/* Table (layout unchanged) */}
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="py-2">Student's Name</th>
            <th className="py-2">Class</th>
            <th className="py-2">Teacher's Name</th>
            <th className="py-2"></th>
          </tr>
        </thead>

        <tbody>
          {/* Loading row */}
          {loading && (
            <tr>
              <td colSpan={4} className="py-10 text-center text-gray-500">
                Loading students…
              </td>
            </tr>
          )}

          {/* Error row */}
          {!loading && errorMsg && (
            <tr>
              <td colSpan={4} className="py-10 text-center text-red-600">
                {errorMsg}
              </td>
            </tr>
          )}

          {/* Empty row */}
          {!loading && !errorMsg && paged.length === 0 && (
            <tr>
              <td colSpan={4} className="py-10 text-center text-gray-500">
                No students found.
              </td>
            </tr>
          )}

          {/* Data rows */}
          {!loading &&
            !errorMsg &&
            paged.length > 0 &&
            paged.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="py-3">
                  <AvatarName name={s.name} avatarUrl={s.avatarUrl} />
                </td>
                <td className="py-3 text-sm text-gray-600">{s.class}</td>
                <td className="py-3">
                  <AvatarName name={s.teacher.name} avatarUrl={s.teacher.avatarUrl} teacher={true}/>
                </td>
                <td className="py-3 text-right">
                  <ActionButtons
                    onView={() => navigate(`/schooldashboard/students/${s.id}`)}
                    onDisable={() => handleDisableClick(s)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination (use server total pages; same component/visuals) */}
      <Pagination
        currentPage={currentPage}
        totalPages={serverTotalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modals (unchanged) */}
      <ConfirmModal
        open={confirmOpen}
        message={`Are you sure you want to disable ${targetStudent?.name}?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDisable}
      />
      <SuccessModal
        open={successOpen}
        message={
          targetStudent
            ? `${targetStudent.name} disabled successfully!`
            : 'Disabled'
        }
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  );
};

export default Students;
