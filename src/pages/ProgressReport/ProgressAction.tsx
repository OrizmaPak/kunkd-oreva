import React from "react";

const ProgressAction = () => {
  return (
    <div className="rounded-full w-full flex max-w-[800px] mx-auto bg-gray-300 ">
      <button className="bg-[#8530C1] flex-grow p-4 rounded-full">All</button>
      <button className="flex-grow">Ongoing</button>
      <button className="flex-grow">Completed</button>
    </div>
  );
};

export default ProgressAction;
