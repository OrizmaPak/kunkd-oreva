// src/components/EmptyState.tsx
import React from "react";
import notfound from "@/assets/notfound.png";

type Props = {
  /** Big heading line (e.g. “No students found”) */
  title?: string;
  /** Supporting sentence */
  message?: string;
  /** Show / hide the illustration (defaults to true) */
  showImage?: boolean;
  /** Let parent add spacing or width tweaks */
  className?: string;
  /** Useful when used inside short containers (px, rem, etc.) */
  minHeight?: number | string;
  /** Indicates if the component is inside a table */
  insideTable?: boolean;
};

const EmptyState: React.FC<Props> = ({
  title = "Not found",
  message = "No records match your query.",
  showImage = true,
  className = "",
  minHeight = 220,
  insideTable = false,
}) => {
  const content = (
    <div
      className={`w-full flex items-center justify-center py-10 ${className}`}
      style={{ minHeight }}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center text-[#667185]">
        {showImage && (
          <img
            src={notfound}
            alt=""
            className="w-40 h-40 object-contain mb-4 opacity-90 pointer-events-none select-none"
            draggable={false}
          />
        )}
         <h3 className="text-lg font-semibold">{title}</h3>
        {message && <p className="text-sm text-gray-500 mt-1">{message}</p>}
      </div>
    </div>
  );

  if (insideTable) {
    return (
      <tr>
        <td colSpan={100}>{content}</td>
      </tr>
    );
  }

  return content;
};

export default EmptyState;
