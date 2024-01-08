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
};
const borderColors = {
  default: "border border-[#8530C1]",
  cream: "border border-cream-500",
  white: "border border-white",
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
}

type TClassName = Omit<
  ButtonProps,
  "action" | "type" | "children" | "className"
>;

const getClassName = (options: TClassName) => {
  const { varient, size, color, backgroundColor, borderColor } = options;
  const btnVarientStyle =
    varient === "filled"
      ? bgColors[backgroundColor || "default"]
      : borderColors[borderColor || "default"];
  // varient  || backgroundColor - border -

  return `rounded-[8px]  text-[16px] ${sizes[size || "md"]} ${
    colors[color || "default"]
  } ${btnVarientStyle}`;
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
      type={type}
      onClick={handleClick}
      className={`${getClassName({
        varient,
        color,
        size,
        backgroundColor,
        borderColor,
      })} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
