import React from "react";

const Wrapper = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) => {
  return (
    <div
      className="w-full  bg-[#EBEFF3] px-[130px] py-[40px] h-[100%]  "
      style={{ backgroundColor: `${bgColor}` }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
