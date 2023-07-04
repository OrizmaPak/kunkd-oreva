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
      className="    mx-auto w-full bg-[#EBEFF3] px-[px] py-[30px] mt-[8vh] h-[100%]"
      style={{ backgroundColor: `${bgColor}` }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
