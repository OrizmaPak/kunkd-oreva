import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ErrorIcon from "@/assets/errorIcon.svg";

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
  const [hasInput, setHasInput] = useState(false); // State to track if the user has input something

  const handlePasswordToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ttype === "password") {
      setType("text");
    } else if (ttype === "text") {
      setType("password");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInput(!!e.target.value); // Update state based on whether the input has a value
    if (onChange) {
      onChange(e); // Call the passed onChange handler if provided
    }
  };

  return (
    <div>
      <div
        className={`border h-[44px] ${
          errorMsg ? "border-red-700" : "bg-[#F1F1F1]"
        } py-3 ${
          smallPadding ? "px-2" : "px-8"
        } rounded-full flex items-center gap-2 mt-1 ${
          hasInput ? "bg-[#FFF6D9]" : "bg-[#ECEFF1]" // Change background color if input has value
        }`}
      >
        <input
          {...reg}
          placeholder={placeholder}
          type={ttype}
          defaultValue={value}
          readOnly={readonly}
          onChange={handleInputChange} // Use the custom input change handler
          max={dateMax}
          className="w-full h-full flex-1 text-black text-[14px] bg-inherit focus:outline-none"
        />
        {rightIcon ? (
          <span
            onClick={handlePasswordToggle}
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
