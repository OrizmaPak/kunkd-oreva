import React from "react";

const InnerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" max-w-[1440px] rounded-[35px] bg-white h-full mx-auto    ">
      {children}
    </div>
  );
};

export default InnerWrapper;
