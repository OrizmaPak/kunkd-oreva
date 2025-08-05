// src/components/Pagination.tsx
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const siblingCount = 1; // how many page numbers to show on each side

  const buildPages = (): (number | string)[] => {
    // Show everything when there are 7 or fewer pages
    if (totalPages <= 7) return range(1, totalPages);

    const pages: (number | string)[] = [1]; // first page always

    const startPage = Math.max(currentPage - siblingCount, 2);
    const endPage = Math.min(currentPage + siblingCount, totalPages - 1);

    // Left ellipsis
    if (startPage > 2) pages.push('...');

    // Middle pages
    pages.push(...range(startPage, endPage));

    // Right ellipsis
    if (endPage < totalPages - 1) pages.push('...');

    pages.push(totalPages); // last page always
    return pages;
  };

  const pages = buildPages();

  return (
    <div className="flex items-center justify-between mt-6 select-none">
      {/* Page indicator */}
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>

      {/* Page buttons */}
      <div className="flex items-center space-x-2">
        {pages.map((p, idx) =>
          p === '...' ? (
            <span key={`dots-${idx}`} className="px-1 text-gray-500">
              …
            </span>
          ) : (
             <button
              key={p}
              onClick={() => onPageChange(Number(p))}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${
                p === currentPage ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 disabled:text-gray-300 disabled:border-gray-100 hover:bg-gray-50"
        >
          <FaChevronLeft className="mr-1" /> Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 disabled:text-gray-300 disabled:border-gray-100 hover:bg-gray-50"
        >
          Next <FaChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
