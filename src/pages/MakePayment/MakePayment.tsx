import MakePaymentContent from "./MakePaymentContent";
import { useState } from "react";
import { STEP_1 } from "@/utils/constants";
import ParentSignupLayout from "@/common/ParentSignupLayout";

const MakePayment = () => {
  const [activeStep, ,] = useState(STEP_1);
  const isHome = localStorage.getItem("gotToHome");

  return (
    <div>
      {isHome === "true" ? (
        <MakePaymentContent />
      ) : (
        <ParentSignupLayout active={3}>
          {activeStep === STEP_1 ? <MakePaymentContent /> : null}
        </ParentSignupLayout>
      )}
    </div>
  );
};

export default MakePayment;
