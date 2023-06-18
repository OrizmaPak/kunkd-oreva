import React from "react";

const AdsButton = () => {
  return (
    <div>
      <div>
        <p className="bg-[#8530C1] rounded-3xl mx-20 py-4 flex justify-between items-center gap-4 px-20 ">
          <p className="font-[bold] text-white text-[18px]">
            Get unlimited access to books in resource
            <span className="text-[#FBC70D] font-bold ml-2 text-[20px]">
              $59.88
            </span>
            /year
          </p>
          <button className="bg-white text-[#8530C1] font-bold rounded-3xl px-4 py-2">
            Upgrade Plan
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdsButton;
