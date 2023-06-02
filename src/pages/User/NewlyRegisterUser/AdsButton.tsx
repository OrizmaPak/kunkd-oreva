import React from "react";

const AdsButton = () => {
  return (
    <div>
      <div>
        <p className="bg-[#8530C1] rounded-3xl mx-20 py-4 flex justify-end items-center gap-4 pr-20 ">
          <p className="font-[bold] text-white">
            Get unlimited access to books in resource
            <span className="text-yellow-600 font-bold ml-2">$59.88</span>/year
          </p>
          <button className="bg-white text-[#8530C1] rounded-3xl px-4 py-2">
            Upgrade Plan
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdsButton;
