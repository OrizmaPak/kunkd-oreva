import ParentSignupLayout from "@/common/ParentSignupLayout";
import { useState } from "react";
import MomthPackage from "@/pages/ChoosePlan/ChoosePlanContent";
import YearPackage from "@/pages/ChoosePlan/YearPackage";
import Cancel from "@/assets/Cancel.svg";
import { Link } from "react-router-dom";

const ChoosePlan = () => {
  // const [isMonth, setIsMonth] = useState(true);

  // const handleMonth = () => {
  //   setIsMonth(true);
  // };
  // const handleYear = () => {
  //   setIsMonth(false);
  // };
  return (
    <>
      <ParentSignupLayout active={2}>
        <div className="mt-20 relative">
          <Link to="/">
            <span className="absolute top-0 right-32">
              <img src={Cancel} alt="cancel" />
            </span>
          </Link>
          <h1 className="text-center font-Recoleta font-bold text-[30px]">
            Get KundaKids Unlimited
          </h1>
          <p className=" text-center  text-gray-300">
            Start learning and reading without restrictions.
          </p>
          {/* <div className="flex j justify-center items-center mt-5">
            <div className="border border-[#E7D4F4] rounded-full gap-4">
              <button
                onClick={handleMonth}
                className={`p-2 px-4 ${
                  isMonth ? "bg-[#8530C1] text-white" : ""
                }  rounded-full text-black`}
              >
                Monthly
              </button>
              <button
                onClick={handleYear}
                className={`p-2 px-4 ${
                  !isMonth ? "bg-[#8530C1] text-white" : ""
                } rounded-full text-black`}
              >
                Yearly
              </button>
            </div>
          </div> */}
          <MomthPackage />
        </div>
      </ParentSignupLayout>
    </>
  );
};

export default ChoosePlan;
