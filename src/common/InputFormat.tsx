import { UseFormRegisterReturn } from "react-hook-form";
import ErrorIcon from "@/assets/errorIcon.svg";
import { Img } from "@chakra-ui/react";

type Props = {
  type?: "text" | "password" | "email" | "number" | "date";
  placeholder?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  reg?: UseFormRegisterReturn;

  errorMsg?: string;
};
const InputFormat = ({
  type,
  placeholder,
  rightIcon,
  leftIcon,
  reg,

  errorMsg,
}: Props) => {
  return (
    <div>
      <div
        className={`border ${
          errorMsg ? "border-red-700" : "border-[#F3DAFF]"
        } py-4 px-8 rounded-full flex items-center gap-2 mt-2   `}
      >
        {leftIcon ? <span>{leftIcon}</span> : null}
        <input
          {...reg}
          placeholder={placeholder}
          type={type}
          className="w-full  h-full flex-1  focus:outline-none"
        />
        {rightIcon ? <span>{rightIcon}</span> : null}
        {errorMsg && <img src={ErrorIcon} alt="error icon" />}
      </div>
      {errorMsg && <span className="text-red-700">{errorMsg}</span>}
    </div>
  );
};

export default InputFormat;
