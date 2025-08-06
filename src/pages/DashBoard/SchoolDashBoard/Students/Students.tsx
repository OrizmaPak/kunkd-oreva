// src/components/Students.tsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import SortDropdown from '@/components/SortDropdown';
import Pagination from '@/components/Pagination';
import AvatarName from '@/components/AvatarName';
import ActionButtons from '@/components/ActionButtons';

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

/* ------------------------------------------------------------------
   Utilities
-------------------------------------------------------------------*/
const generateStudents = (total: number): Student[] => {
  const names = [
    'Jaydon Korsgaard',
    'Avery Johnson',
    'Riley Smith',
    'Jordan Lee',
    'Taylor Brown',
    'Morgan Davis',
    'Casey Wilson',
    'Dakota Taylor',
  ];
  return Array.from({ length: total }, (_, i) => {
    const name = names[i % names.length];
    return {
      id: i + 1,
      name,
      avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      class: `Primary ${((i % 6) + 1)}`,
      teacher: {
        name: names[(i + 3) % names.length],
        avatarUrl: `https://i.pravatar.cc/150?img=${((i + 5) % 70) + 1}`,
      },
    };
  });
};

/* ------------------------------------------------------------------
   Local modal components
-------------------------------------------------------------------*/
const ConfirmModal: React.FC<{
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-sm rounded-lg p-6 space-y-6 shadow-lg">
        <p className="text-center text-gray-700 text-base">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Yes
          </button>
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
   Main component
-------------------------------------------------------------------*/
const Students: React.FC = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'class' | 'teacher'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [targetStudent, setTargetStudent] = useState<Student | null>(null);

  const allStudents = useMemo(() => generateStudents(200), []);

  // Search filter
  const filtered = useMemo(
    () =>
      allStudents.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      ),
    [allStudents, query]
  );

  // Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ax = sortKey === 'teacher' ? a.teacher.name : (a as any)[sortKey];
      const bx = sortKey === 'teacher' ? b.teacher.name : (b as any)[sortKey];
      return ax.localeCompare(bx);
    });
  }, [filtered, sortKey]);

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  /* ---------------- Disable logic ----------------- */
  const handleDisableClick = (student: Student) => {
    setTargetStudent(student);
    setConfirmOpen(true);
  };

  const confirmDisable = () => {
    // Here you’d call the API to disable. For demo, we just show success.
    setConfirmOpen(false);
    setSuccessOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Students{' '}
          <span className="ml-2 inline-block bg-green-100 text-green-600 text-sm px-2 py-0.5 rounded-full">
            {allStudents.length}
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

      {/* Table */}
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
          {paged.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="py-3">
                <AvatarName name={s.name} avatarUrl={s.avatarUrl} />
              </td>
              <td className="py-3 text-sm text-gray-600">{s.class}</td>
              <td className="py-3">
                <AvatarName name={s.teacher.name} avatarUrl={s.teacher.avatarUrl} />
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modals */}
      <ConfirmModal
        open={confirmOpen}
        message={`Are you sure you want to disable ${targetStudent?.name}?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDisable}
      />

      <SuccessModal
        open={successOpen}
        message={targetStudent ? `${targetStudent.name} disabled successfully!` : 'Disabled'}
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  );
};

export default Students;
