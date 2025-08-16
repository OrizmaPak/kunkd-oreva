import React from "react";

export default function EmptyTopConsumed({ onAddStudent }) {
  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 md:p-6 shadow-sm">
      <div className="grid items-center gap-6 md:grid-cols-3">
        {/* LEFT: label, zero views, devices */}
        <div>
          <p className="text-[13px] text-[#667185]">Top Consumed Content</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[28px] font-semibold text-[#101928]">0</span>
            <span className="text-xs text-[#667185]">views</span>
          </div>

          <div className="mt-6">
            <p className="text-[13px] text-[#667185]">Devices Used</p>
            <p className="text-sm">
              <span className="font-medium text-[#344054]">Web</span>
              <span className="text-[#98A2B3]"> (0)</span>
            </p>
            <p className="text-sm -mt-1">
              <span className="font-medium text-[#344054]">Mobile</span>
              <span className="text-[#98A2B3]"> (0)</span>
            </p>
          </div>
        </div>

        {/* CENTER/RIGHT: call to action */}
        <div className="col-span-2 flex flex-col items-center justify-center py-6 text-center">
          <p className="text-[16px] font-semibold text-[#101928]">No student added</p>
          <p className="mt-1 text-sm text-[#667185]">
            Add students to access content analytics.
          </p>
          <button
            onClick={onAddStudent}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#84C127] px-4 py-2 text-sm font-semibold text-white hover:bg-[#74AE1F]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="white" opacity=".2" />
              <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Add New Student
          </button>
        </div>
      </div>
    </div>
  );
}
