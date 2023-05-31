import MakePaymentContent from "./MakePaymentContent";
import PaymentCompletedContent from "./PaymentCompletedContent";
import { useState } from "react";
import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";
import ParentSignupLayout from "@/common/ParentSignupLayout";

const MakePayment = () => {
  const [activeStep, setActiveStep] = useState(STEP_1);
  const handleNext = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div>
      <ParentSignupLayout active={3}>
        {activeStep === STEP_1 ? (
          <MakePaymentContent onSubmit={() => handleNext(STEP_2)} />
        ) : null}

        {activeStep === STEP_2 ? (
          <PaymentCompletedContent
            onSubmit={() => {
              handleNext(STEP_3);
            }}
          />
        ) : null}
      </ParentSignupLayout>
    </div>
  );
};

export default MakePayment;
