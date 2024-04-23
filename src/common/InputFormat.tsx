import ErrorIcon from "@/assets/errorIcon.svg";
import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
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
  dateMax?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputFormat = ({
  type,
  placeholder,
  rightIcon,
  reg,
  value,
  smallPadding,
  readonly,
  onChange,
  dateMax,
  errorMsg,
}: Props) => {
  const [ttype, setType] = useState(type);
  const handlePaswordToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        <input
          {...reg}
          placeholder={placeholder}
          type={ttype}
          defaultValue={value}
          readOnly={readonly}
          onChange={onChange}
          max={dateMax}
          className="w-full  h-full flex-1 text-black text-[14px]  focus:outline-none"
        />
        {rightIcon ? (
          <span
            onClick={handlePaswordToggle}
            className="flex justify-center items-center"
          >
            {ttype === "text" ? (
              <button className="flex justify-between items-center">
                <AiOutlineEyeInvisible size={20} color="#c4ccd0" />
              </button>
            ) : (
              <button className="flex justify-between items-center">
                <AiOutlineEye size={20} color="#c4ccd0" />
              </button>
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
