import Button from "@/components/Button";
import Congrats from "@/assets/congrats.svg";
import ParentSignupLayout from "@/common/ParentSignupLayout";
import { useNavigate } from "react-router-dom";

const PaymentCompletedContent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ParentSignupLayout active={3}>
        <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
          <div className="w-[100%]  my-auto ">
            <span></span>
            <div>
              <div className=" flex justify-center items-center">
                <img loading="lazy" src={Congrats} alt="Congrats" />
              </div>
              <h1 className="font-bold text-[40px] text-center mt-4 font-Recoleta">
                Payment Completed
              </h1>
              <p className="text-[15px] text-[#A7A7A7] text-center mt-4 mb-16 font-Hanken">
                Payment receipt has been sent to your email address
              </p>
              {/* <Link to="/childprofilesetup"> */}

              <Button
                onClick={() => {
                  if (localStorage.getItem("gotToHome") === "true") {
                    navigate("/parent");
                  } else {
                    navigate("/childprofilesetup");
                  }
                }}
                size="full"
              >
                Continue
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </ParentSignupLayout>
    </div>
  );
};

export default PaymentCompletedContent;
