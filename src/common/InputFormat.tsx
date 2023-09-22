import { UseFormRegisterReturn } from "react-hook-form";
import ErrorIcon from "@/assets/errorIcon.svg";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  type?: "text" | "password" | "email" | "number" | "date";
  placeholder?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  reg?: UseFormRegisterReturn;
  value?: string;
  smallPadding?: "true";
  readonly?: true | false;
  errorMsg?: string;
};
const InputFormat = ({
  type,
  placeholder,
  rightIcon,
  leftIcon,
  reg,
  value,
  smallPadding,
  readonly,

  errorMsg,
}: Props) => {
  const [ttype, setType] = useState(type);
  const handlePaswordToggle = () => {
    if (ttype === "password") {
      setType("text");
    }
    if (ttype === "text") {
      setType("password");
    }
  };
  return (
    <div>
      <div
        className={`border ${
          errorMsg ? "border-red-700" : "border-[#F3DAFF]"
        } py-3 ${
          smallPadding ? "px-2" : "px-8"
        }  rounded-full flex items-center gap-2 mt-1   `}
      >
        {leftIcon ? <span>{leftIcon}</span> : null}
        <input
          {...reg}
          placeholder={placeholder}
          type={ttype}
          defaultValue={value}
          readOnly={readonly}
          className="w-full  h-full flex-1 text-black text-[14px]  focus:outline-none"
        />
        {rightIcon ? (
          <span onClick={handlePaswordToggle}>
            {ttype === "text" ? (
              <AiOutlineEyeInvisible size={20} color="#c4ccd0" />
            ) : (
              <AiOutlineEye size={20} color="#c4ccd0" />
            )}
          </span>
        ) : null}
        {errorMsg && <img loading="lazy" src={ErrorIcon} alt="error icon" />}
      </div>
      {errorMsg && <span className="text-red-700">{errorMsg}</span>}
    </div>
  );
};

export default InputFormat;
