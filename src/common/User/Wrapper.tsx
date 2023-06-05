import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full  bg-[#EBEFF3] px-[130px] py-[40px] h-[100%]  ">
      {children}
    </div>
  );
};

export default Wrapper;
