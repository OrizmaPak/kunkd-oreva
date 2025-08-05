// -------------------------------
// src/components/StatCard.tsx
// -------------------------------
import React from "react";

interface StatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  onView: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, onView }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="text-2xl">{icon /* placeholder */}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
    <button onClick={onView} className="text-sm text-blue-500 hover:underline">
      View
    </button>
  </div>
);

export default StatCard;