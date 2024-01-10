import React from "react";
import { useNavigate } from "react-router-dom";
import "./packagecard.css";

type Props = {
  recommended?: boolean;
  title?: React.ReactNode;
  price?: React.ReactNode;
  btn?: string;
  content?: React.ReactNode[];
  noBorder?: boolean;
  isIcon?: boolean;
  plan?: TPlan;
  countryCode?: string;
};

export type TPlan = {
  dollar_value: string;
  duration_days: number;
  id: number;
  naira_value: string;
  name: string;
  pounds_value: string;
};
const PackageCard = ({
  recommended,
  title,
  price,
  btn,
  content,
  noBorder,
  isIcon,
  plan,
  countryCode,
}: Props) => {
  const navigate = useNavigate();
  const handlePaln = (planId: number) => {
    const currencyIso =
      countryCode === "NG" ? "NGN" : countryCode === "UK" ? "GBP" : "USD";
    if (!plan) {
      navigate("/childprofilesetup");
      if (localStorage.getItem("gotToHome") === "true") {
        navigate("/parent");
      } else {
        navigate("/childprofilesetup");
      }
    } else {
      localStorage.setItem("planId", planId?.toString());
      localStorage.setItem("currency_iso3", currencyIso);
      navigate("/makepayment");
    }
  };
  return (
    <div
      className={`packageCard-w ${noBorder ? "" : " bg-[#fffbff]  "} ${
        recommended ? "bg-[#8530C1] " : ""
      }  rounded-3xl py-2  relative`}
    >
      {recommended && (
        <div className=" absolute left-[0px] top-[-20px] bg-[#FBC70D] p-[7px] rounded-t-3xl w-full text-center">
          <strong className="text3 text-center"> RECOMMENDED</strong>
        </div>
      )}
      {title && (
        <div
          className={`${
            recommended ? "text-white" : ""
          } text-lg font-Hanken font-bold text-center pt-2 mt-5`}
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
            <div className="mt-2 " key={index}>
              <p className="text-sm  py-[10.5px]  border-b-[0.5px] border-[#FBECFF]">
                {item}
              </p>
            </div>
          ))}
        </div>
      )}

      {content && isIcon && (
        <div className=" flex flex-col ">
          {content.map((item, index) => (
            <div className="mt-2" key={index}>
              <p className=" flex py-2 justify-center items-center border-b-[0.5px] border-[#FBECFF]">
                {/* <img
                  loading="lazy"
                  src={item}
                  alt="icon"
                  className="w-[10px] my-3 object-cover"
                /> */}
                {item}
              </p>
            </div>
          ))}
        </div>
      )}

      {btn && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => handlePaln(plan?.id as number)}
            className="mt-8 pad-x-40 bg-[#E7D4F4] text-[#8530C1] p-3 rounded-2xl"
          >
            {btn}
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
