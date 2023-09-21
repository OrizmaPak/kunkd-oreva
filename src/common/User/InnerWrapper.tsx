import React from "react";

const InnerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-8vh-60px)]  app-mai-nwidth-container   rounded-[35px] bg-white h-full mx-auto  pb-[67px] ">
      {children}
    </div>
  );
};

export default InnerWrapper;
