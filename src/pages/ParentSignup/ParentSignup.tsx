import ParentSignupLayout from "@/common/ParentSignupLayout";
import ParentSignupDetails from "./ParentSignupDetails";
import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";
import ParentEnterOTP from "./ParentEnterOTP";
import ParentCongratulations from "./ParentCongratulations";
import { useState } from "react";

const ParentSignup = () => {
  const [activeStep, setActiveStep] = useState(STEP_1);
  const handleNext = (step: number) => {
    setActiveStep(step);
  };
  return (
    <div className="bg-yellow-400">
      <ParentSignupLayout active={0}>
        {activeStep === STEP_1 ? (
          <ParentSignupDetails onSubmit={() => handleNext(STEP_2)} />
        ) : null}

        {activeStep === STEP_2 ? (
          <ParentEnterOTP
            onSubmit={() => {
              handleNext(STEP_3);
            }}
          />
        ) : null}

        {activeStep === STEP_3 ? (
          <ParentCongratulations
            onSubmit={() => {
              handleNext(STEP_3);
            }}
          />
        ) : null}
        {/* <div className="flex gap-2 justify-center  bottom-20  items-center  bg-red-400 w-full ">
          <div
            className={`w-4 h-4 rounded-full ${
              activeStep === STEP_1
                ? "bg-[#8530C1]"
                : "border-2 border-blue-[#8530C1]"
            }`}
          />
          <div
            className={`w-4 h-4 rounded-full ${
              activeStep === STEP_2
                ? "bg-[#8530C1]"
                : "border-2 border-blue-[#8530C1]"
            }`}
          />
          <div
            className={`w-4 h-4 rounded-full ${
              activeStep === STEP_3
                ? "bg-[#8530C1]"
                : "border-2 border-blue-[#8530C1]"
            }`}
          />
        </div> */}
      </ParentSignupLayout>
    </div>
  );
};

export default ParentSignup;
