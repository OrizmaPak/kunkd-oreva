import React, { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import Pagination from "@/components/Pagination";

export interface ContentItem {
  id: number;
  title: string;
  category: string;
  readType: "School Assigned" | "Self Read";
  dateAssigned: string; // use "—" if unknown
  dateStarted: string;  // use "—" if unknown
  status: "Ongoing" | "Completed";
  thumb: string;
}

type Props = {
  /** REAL data from parent (StudentView). Do not pass dummy. */
  data: ContentItem[];
  /** Show skeletons when true */
  loading?: boolean;
};

const ContentTable: React.FC<Props> = ({ data, loading = false }) => {
  const allContent = useMemo(() => (loading ? [] : data ?? []), [data, loading]);

  const [tab, setTab] = useState<ContentItem["status"]>("Ongoing");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"title" | "category" | "dateAssigned">(
    "title"
  );
  const [page, setPage] = useState(1);
  const pageSize = 7;

  /* ---- filtering ---- */
  const filtered = useMemo(
    () =>
      allContent
        .filter((c) => c.status === tab)
        .filter((c) => c.title.toLowerCase().includes(query.toLowerCase())),
    [allContent, tab, query]
  );

  /* ---- sorting ---- */
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => (a[sortKey] as string).localeCompare(b[sortKey] as string));
    return arr;
  }, [filtered, sortKey]);

  /* ---- pagination ---- */
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  /* ---- skeleton helpers ---- */
  const SkeletonRow: React.FC = () => (
    <tr className="border-t">
      <td className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded border bg-gray-100 animate-pulse" />
          <div className="h-4 w-44 bg-gray-100 rounded animate-pulse" />
        </div>
      </td>
      <td className="p-3">
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="p-3">
        <div className="h-5 w-28 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="p-3">
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="p-3">
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="p-3">
        <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
      </td>
    </tr>
  );

  return (
    <div className="space-y-4 bg-white rounded-3xl border border-gray-200 px-8 py-6">
      {/* Tabs + search */}
      <div className="flex justify-between items-center">
        {/* Tabs */}
        {loading ? (
          <div className="flex gap-2">
            <div className="h-8 w-28 rounded-xs border border-gray-300 bg-gray-100 animate-pulse" />
            <div className="h-8 w-28 rounded-xs border border-gray-300 bg-gray-100 animate-pulse" />
          </div>
        ) : (
          <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
          {(["Ongoing", "Completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setPage(1);
              }}
              className={`rounded-full px-3 py-1 text-sm transition ${
                tab === t
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        )}

        {/* Controls */}
        {loading ? (
          <div className="flex justify-end gap-5 items-center">
            <div className="h-9 w-44 rounded border border-gray-200 bg-gray-100 animate-pulse" />
            <div className="h-9 w-44 rounded border border-gray-200 bg-gray-100 animate-pulse" />
          </div>
        ) : (
          <div className="flex justify-end gap-5 items-center">
            <SearchBar value={query} onChange={setQuery} placeholder="Search here…" />
            <SortDropdown
              value={sortKey}
              onChange={(v) => setSortKey(v as any)}
              options={[
                { label: "Title", value: "title" },
                { label: "Category", value: "category" },
                { label: "Date Assigned", value: "dateAssigned" },
              ]}
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-left text-sm text-gray-500">
            <tr>
              <th className="p-3">Content Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Read Type</th>
              <th className="p-3">Date Assigned</th>
              <th className="p-3">Date Started</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {Array.from({ length: 7 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </>
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No content found.
                </td>
              </tr>
            ) : (
              paged.map((c) => (
                <tr key={c.id} className="border-t text-sm">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={c.thumb}
                      alt=""
                      className="w-10 h-10 rounded object-cover border"
                    />
                    <span className="text-gray-800">{c.title}</span>
                  </td>
                  <td className="p-3 text-gray-600">{c.category}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        c.readType === "School Assigned"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.readType}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{c.dateAssigned || "—"}</td>
                  <td className="p-3 text-gray-600">{c.dateStarted || "—"}</td>
                  <td className="p-3 text-blue-500 hover:underline cursor-pointer">
                    View
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {loading ? (
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
          <div className="h-8 w-64 bg-gray-100 rounded animate-pulse" />
        </div>
      ) : (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default ContentTable;
