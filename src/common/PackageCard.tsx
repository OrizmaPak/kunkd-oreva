import { Link } from "react-router-dom";
import React from "react";

type Props = {
  recommended?: boolean;
  title?: React.ReactNode;
  price?: React.ReactNode;
  btn?: string;
  content?: string[];
  noBorder?: boolean;
  isIcon?: boolean;
};
const PackageCard = ({
  recommended,
  title,
  price,
  btn,
  content,
  noBorder,
  isIcon,
}: Props) => {
  return (
    <div
      className={` min-w-[176px] ${
        noBorder ? "" : "border border-[#E7D4F4]  "
      } ${
        recommended ? "bg-[#8530C1] " : ""
      } px-4 rounded-3xl py-2 pt-8 relative`}
    >
      {recommended && (
        <div className=" absolute left-[0px] top-[-20px] bg-[#FBC70D] p-[7px] rounded-t-3xl w-full text-center">
          <strong className="text-[13px] text-center"> RECOMMENDED</strong>
        </div>
      )}
      {title && (
        <div
          className={`${
            recommended ? "text-white" : ""
          } text-lg font-Hanken font-bold text-center`}
        >
          {title}
        </div>
      )}
      {price && (
        <div
          className={`text-center text-[30px]font-Hanken font-bold text-[#8530C1] ${
            recommended ? "text-white" : ""
          } `}
        >
          {price}
        </div>
      )}
      {content && !isIcon && (
        <div className=" flex flex-col ">
          {content.map((item, index) => (
            <div className="mt-5 " key={index}>
              <p className="text-sm my-5">{item}</p>
            </div>
          ))}
        </div>
      )}

      {content && isIcon && (
        <div className=" flex flex-col ">
          {content.map((item, index) => (
            <div className="mt-7" key={index}>
              <p className=" flex justify-center items-center">
                <img
                  loading="lazy"
                  src={item}
                  alt="icon"
                  className="w-[10px] my-5"
                />
              </p>
            </div>
          ))}
        </div>
      )}

      {btn && (
        <div className="flex justify-center items-center">
          <Link to="/makepayment">
            <button className="mt-8 bg-[#E7D4F4] text-[#8530C1] p-3 rounded-2xl">
              {btn}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
