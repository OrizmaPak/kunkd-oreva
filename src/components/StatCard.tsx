 // -------------------------------
// src/components/StatCard.tsx
// -------------------------------
import React from "react";

interface StatCardProps {
  /** Pass any React icon or <img>. Leave null for placeholder */
  icon?: React.ReactNode;
  label: string;
  /** e.g. "200/300" */
  value: string;
  onView: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, onView }) => (
  <div className="bg-white rounded-3xl border border-gray-200 px-6 py-8 flex items-center justify-between">
    {/* icon */}
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50">
      {icon ? <img src={icon} alt="icon" className="w-full h-full object-cover" /> : <span className="text-gray-300 text-xl">—</span>}
    </div>

    {/* label + value */}
    <div className="flex-1 ml-4">
        <p className="font-inter font-normal not-italic text-[14px] leading-[145%] tracking-[0%] text-gray-500">{label}</p>
       <p className="font-inter font-semibold text-gray-900 text-[24px] leading-[120%] tracking-[-2%]">{value}</p>
    </div>

    {/* view link */}
    <button onClick={onView} className="text-sm text-blue-500 hover:underline">
      View
    </button>
  </div>
);

export default StatCard;