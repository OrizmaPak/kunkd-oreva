import MakePaymentContent from "./MakePaymentContent";
import { useState } from "react";
import { STEP_1 } from "@/utils/constants";
import ParentSignupLayout from "@/common/ParentSignupLayout";
import BgImage from "@/assets/newBackground.svg"; 


const MakePayment = () => {
  const [activeStep, ,] = useState(STEP_1);
  const isHome = sessionStorage.getItem("gotToHome");

  return (
    <div
     style={{
    backgroundImage: `url(${BgImage})`,
    backgroundSize: "cover",      // Optional
    backgroundRepeat: "no-repeat", // Optional
    backgroundPosition: "center",  // Optional
    height: "100vh",
    width: "100%",
  }} className="py-4">
   
        <MakePaymentContent />
    
    </div>
  );
};

export default MakePayment;
