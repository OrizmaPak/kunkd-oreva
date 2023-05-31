import React from "react";
type Props = {
  type?: "text" | "password" | "email" | "number" | "date";
  placeholder?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
};
const InputFormat = ({ type, placeholder, rightIcon, leftIcon }: Props) => {
  return (
    <div className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
      {leftIcon ? <span>{leftIcon}</span> : null}
      <input
        placeholder={placeholder}
        type={type}
        className="w-full  h-full flex-1  focus:outline-none"
      />
      {rightIcon ? <span>{rightIcon}</span> : null}
    </div>
  );
};

export default InputFormat;
