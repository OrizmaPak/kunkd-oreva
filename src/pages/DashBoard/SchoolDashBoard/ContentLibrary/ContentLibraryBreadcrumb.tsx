// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/ContentLibraryBreadcrumb.tsx
import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  crumbs: string[];
  onCrumbClick: (label: string, level: number) => void;
}

const ContentLibraryBreadcrumb: React.FC<Props> = ({
  crumbs,
  onCrumbClick,
}) => {
    console.log('crumbs', crumbs);    
  if (crumbs.length <= 1 || !crumbs) return null;


  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center text-sm text-gray-600 space-x-2">
        {crumbs.map((label, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <FaChevronRight className="text-gray-400" />}
            <span
              className={`${
                idx === crumbs.length - 1
                  ? "font-bold text-gray-900"
                  : "hover:underline cursor-pointer"
              } font-arimo text-[14px] leading-[21px] tracking-[0.1px] align-middle`}
              onClick={() => onCrumbClick(label, idx)}
            >
              {label}
            </span>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default ContentLibraryBreadcrumb;
