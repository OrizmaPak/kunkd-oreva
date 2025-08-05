import React from "react";

const sizes = {
  md: "px-[28px] py-[16px]",
  sm: "px-[18px] py-[10px]",
  full: "w-full py-3 text-center",
};
const colors = {
  default: "text-[#F2F2F2]",
  blue: "text-blue",
  black: "text-black",
  white: "text-white",
};

const bgColors = {
  default: "bg-[#8530C1]",
  cream: "bg-cream-500",
  white: "bg-white",
  green: "bg-customGreen",
  grey: "bg-[grey]",
};
const borderColors = {
  default: "border border-[#8530C1]",
  cream: "border border-cream-500",
  white: "border border-white",
  green: "border border-customGreen",
};

interface ButtonProps {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  backgroundColor?: keyof typeof bgColors;
  borderColor?: keyof typeof borderColors;
  varient?: "filled" | "outlined";
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disable?: boolean;
}

type TClassName = Omit<
  ButtonProps,
  "action" | "type" | "children" | "className"
>;

const getClassName = (options: TClassName & { disable?: boolean }) => {
  const { varient, size, color, backgroundColor, borderColor, disable } = options;
  const btnVarientStyle = disable
    ? "bg-gray-400"
    : varient === "filled"
    ? bgColors[backgroundColor || "default"]
    : borderColors[borderColor || "default"];
  const disabledStyle = disable ? "cursor-not-allowed" : "";

  return `rounded-[8px] text-[16px] ${sizes[size || "md"]} ${
    colors[color || "default"]
  } ${btnVarientStyle} ${disabledStyle}`;
};

const Button = ({
  varient = "filled",
  color,
  backgroundColor,
  size = "full",
  children,
  type = "button",
  onClick,
  borderColor = "default",
  disable,
  className = "",
}: ButtonProps) => {
  // const buttonClasses = `w-${width} text-${color}  bg-${backgroundColor} p-${padding} mt-4 rounded-3xl `;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      disabled={disable}
      type={type}
      onClick={handleClick}
      className={`${getClassName({
        varient,
        color,
        size,
        backgroundColor,
        borderColor,
      })} ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
