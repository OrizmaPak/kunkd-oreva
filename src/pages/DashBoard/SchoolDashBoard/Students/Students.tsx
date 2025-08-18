// src/components/Students.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import SortDropdown from '@/components/SortDropdown';
import Pagination from '@/components/Pagination';
import AvatarName from '@/components/AvatarName';
import ActionButtons from '@/components/ActionButtons';
import {
  GetAdmittedStudentsInSchool,
  GetAdmittedStudentsInClass,
} from "@/api/api";

import useStore from "@/store";
import { getUserState } from "@/store/authStore";

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

// API response shapes based on your sample payloads
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
    // Your column is labeled "Teacher's Name" — populate with Parent’s name
    teacher: { name: parentName, avatarUrl: "" },
  };
};

/* ------------------------------------------------------------------
Confirm / Success Modals (Confirm styled like the screenshot)
-------------------------------------------------------------------*/
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
        <div className="bg-lime-500 px-5 py-3">
          <h3
            id="disable-student-title"
            className="text-white text-base font-semibold"
          >
            Disable Student
          </h3>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-center text-gray-700 text-sm">{message}</p>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onCancel}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-full bg-lime-500 px-4 py-2 text-sm text-white hover:bg-lime-600"
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

  // Read role from auth store (robustly)
  const authState = useStore(getUserState) as any;
  const roleRaw: string =
    (authState?.user?.role ||
      authState?.role ||
      authState?.user_type ||
      "") ?? "";
  const role = roleRaw.toString().toLowerCase();

  // Controls
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'class' | 'teacher'>('name');
  const [currentPage, setCurrentPage] = useState(1);

  // NEW: Status filter (Active / Disabled)
  const [statusFilter, setStatusFilter] = useState<'active' | 'disabled'>('active');

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

  // Reset to page 1 when status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Fetch one page from the backend whenever currentPage, role, or statusFilter changes
  useEffect(() => {
    let ignore = false;

    const fetchPage = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        // Choose endpoint by role
        const isSchoolAdmin = role === "schooladmin";
        const isTeacher = role === "teacher";

        let res: { data: TListResponse } | undefined;

        if (isSchoolAdmin) {
          res = (await GetAdmittedStudentsInSchool(
            statusFilter,
            String(currentPage)
          )) as unknown as { data: TListResponse };
        } else if (isTeacher) {
          res = (await GetAdmittedStudentsInClass(
            statusFilter,
            String(currentPage)
          )) as unknown as { data: TListResponse };
        } else {
          // default to school-level list if role is unknown
          res = (await GetAdmittedStudentsInSchool(
            statusFilter,
            String(currentPage)
          )) as unknown as { data: TListResponse };
        }

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
  }, [currentPage, role, statusFilter]);

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
      {/* Header (badge uses server total) */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Students{' '}
          <span className="ml-2 inline-block bg-green-100 text-green-600 text-sm px-2 py-0.5 rounded-full">
            {serverTotalRecords}
          </span>
        </h1>

        <div className="flex items-center gap-4">
          {/* Status filter: Active / Disabled */}
          <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`rounded-full px-3 py-1 text-sm transition ${
                statusFilter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-white'
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('disabled')}
              className={`rounded-full px-3 py-1 text-sm transition ${
                statusFilter === 'disabled'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-white'
              }`}
            >
              Disabled
            </button>
          </div>

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
                  <AvatarName name={s.teacher.name} avatarUrl={s.teacher.avatarUrl} teacher={true} />
                </td>
                <td className="py-3 text-right">
                  <ActionButtons
                    status={statusFilter}
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

      {/* Modals */}
      <ConfirmModal
        open={confirmOpen}
        message={`Are you sure you want to disable ${targetStudent?.name ?? "this student"}?`}
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
