import React from "react";

interface EmptyFavouritesProps {
  label: "Stories" | "Languages";
}

const EmptyFavourites: React.FC<EmptyFavouritesProps> = ({ label }) => (
  <div
    className="w-full rounded-2xl border border-gray-200/70 bg-white dark:bg-slate-900/40 p-10 flex flex-col items-center justify-center text-center shadow-sm"
    data-testid={`empty-${label.toLowerCase()}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-10 w-10 text-gray-300 dark:text-slate-600"
    >
      <path d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Zm2.25-.75a.75.75 0 0 0-.75.75V8.7l3.098-2.066a1.5 1.5 0 0 1 1.704.01l4.593 3.062a.75.75 0 0 0 .84-.001l2.517-1.696A1.5 1.5 0 0 1 19.5 8.7v-1.2a.75.75 0 0 0-.75-.75H5.25Z" />
    </svg>

    <h3 className="mt-4 text-base font-semibold text-gray-700 dark:text-gray-200">
      No favourites for {label}
    </h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-md">
      When you add {label.toLowerCase()} to favourites, they will appear here.
    </p>
  </div>
);

export default EmptyFavourites;
