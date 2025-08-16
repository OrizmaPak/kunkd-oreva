import React from "react";

export default function EmptyClassPerformance({ onAddClass }) {
  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-[#101928]">Class Performance</h2>

      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-[16px] font-semibold text-[#101928]">No classes added</p>
        <p className="mt-1 text-sm text-[#667185]">
          Add classrooms to access their performance analytics.
        </p>

        <button
          onClick={onAddClass}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#84C127] px-4 py-2 text-sm font-semibold text-white hover:bg-[#74AE1F]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="white" opacity=".2" />
            <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Add New Class
        </button>
      </div>
    </div>
  );
}
