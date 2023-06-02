import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full  bg-[#EBEFF3] px-[130px] py-[40px]  ">
      <div className=" w-full rounded-[35px] bg-white h-full mx-auto   ">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
