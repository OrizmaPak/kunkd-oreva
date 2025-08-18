// src/components/// src/components/ActionButtons.tsx
import React from "react";
import { FaEye, FaBan } from "react-icons/fa";

interface ActionButtonsProps {
  onView: () => void;
  onDisable: () => void;
  status: "active" | "disabled";
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onView, onDisable, status }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      {status !== "disabled" && (
        <button
          onClick={onDisable}
          className="p-2 rounded-md hover:bg-gray-100 text-[#344054] hover:text-red-700 transition font-inter font-semibold text-[14px] leading-[145%] tracking-[0%] text-center align-middle"
          title="Disable"
        >
          Disable
        </button>
      )}
       <button
        onClick={onView}
        className="p-2 rounded-md hover:bg-gray-100 text-[#9FC43E] hover:text-gray-800 transition font-inter font-semibold text-[14px] leading-[145%] tracking-[0%] text-center align-middle"
        title="View"
      >
        View
      </button>
    </div>
  );
};

export default ActionButtons;
