import Button from "@/components/Button";
import ParentSignupLayout from "@/common/ParentSignupLayout";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useEffect } from "react";
import { handleEventTracking, timeString } from "@/api/moengage";
import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";
// import { useConnectStripe } from "@/api/queries";
// import { notifications } from "@mantine/notifications";
// import { getApiErrorMessage } from "@/api/helper";
// import { Loader } from "@mantine/core";
// import { TStripe } from "./StripWrapper";

const PaymentCompletedContent = () => {
  const navigate = useNavigate();
  // const stripe= sessionStorage.getItem("stripeData")
  // const stripeData:TStripe = JSON.parse(stripe as string)
  // const {mutate, isLoading} = useConnectStripe()
  const handleContinue = () => {
    if (sessionStorage.getItem("gotToHome") === "true") {
      navigate("/parent");
    } else {
      navigate("/profilesetup");
    }
    // mutate({ subscription_plan_id:Number(sessionStorage.getItem("planId")),
    // currency_iso3:"GBP",
    // reference:stripeData?.transaction_reference,
    // customer_id: stripeData?.customerID},{
    //   onSuccess(){

    //   }
    // })
  };
  const isHome = sessionStorage.getItem("gotToHome");
  const [user] = useStore(getUserState);

  useEffect(() => {
    handleEventTracking("web_subscribed", {
      user_id: user?.user_id,
      subsription_plan: "annual",
      date: timeString,
      amount: sessionStorage.getItem("price"),
      currency:
        sessionStorage.getItem("currency_iso3") === "NG"
          ? "NGN"
          : sessionStorage.getItem("currency_iso3") === "UK"
          ? "GBP"
          : "USD",
    });
  }, []);

  return (
    <div>
      {isHome === "true" ? (
        <div className="w-[100%] max-w-[500px] mx-auto relative mt-48 h-full flex item-center justify-center ">
          <div className="inner-form-w2 mx-auto relative  flex item-center">
            <div className="w-[100%]  my-auto ">
              <span></span>
              <div>
                <div className=" flex justify-center items-center">
                  {/* <img loading="lazy" src={Congrats} alt="Congrats" /> */}
                  <IoCheckmarkCircleOutline
                    // className="congrat-w"
                    color="#8530C1"
                    size={100}
                  />
                </div>
                <h1 className="font-bold header2 text-center mt-4 font-Recoleta">
                  Congratulations
                </h1>
                <p className="text2 text-[#A7A7A7] text-center mt-4 mb-10 font-Hanken">
                  Payment receipt has been sent to your email address
                </p>
                <Button onClick={handleContinue} size="full">
                  Continue
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="w-[100%]  my-auto ">
            <span></span>
            <div>
              <div className=" flex justify-center items-center">
              <IoCheckmarkCircleOutline size={150} color="#8530C1" />
              </div>
              <h1 className="font-bold text-[40px] text-center mt-4 font-Recoleta">
                Payment Completed
              </h1>
              <p className="text-[15px] text-[#A7A7A7] text-center mt-4 mb-16 font-Hanken">
                Payment receipt has been sent to your email address
              </p>

              <Button
                onClick={() => {
                  if (sessionStorage.getItem("gotToHome") === "true") {
                    navigate("/parent");
                  } else {
                    navigate("/childprofilesetup");
                  }
                }}
                size="full"
              >
                Continue
              </Button>
            </div>
          </div> */}
        </div>
      ) : (
        <ParentSignupLayout active={3}>
          <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex item-center justify-center ">
            <div className="inner-form-w2 mx-auto relative  flex item-center">
              <div className="w-[100%]  my-auto ">
                <span></span>
                <div>
                  <div className=" flex justify-center items-center">
                    {/* <img loading="lazy" src={Congrats} alt="Congrats" /> */}
                    <IoCheckmarkCircleOutline
                      className="congrat-w"
                      color="#8530C1"
                    />
                  </div>
                  <h1 className="font-bold header2 text-center mt-4 font-Recoleta">
                    Congratulations
                  </h1>
                  <p className="text2 text-[#A7A7A7] text-center mt-4 mb-10 font-Hanken">
                    Payment receipt has been sent to your email address
                  </p>
                  <Button onClick={handleContinue} size="full">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
            {/* <div className="w-[100%]  my-auto ">
            <span></span>
            <div>
              <div className=" flex justify-center items-center">
              <IoCheckmarkCircleOutline size={150} color="#8530C1" />
              </div>
              <h1 className="font-bold text-[40px] text-center mt-4 font-Recoleta">
                Payment Completed
              </h1>
              <p className="text-[15px] text-[#A7A7A7] text-center mt-4 mb-16 font-Hanken">
                Payment receipt has been sent to your email address
              </p>

              <Button
                onClick={() => {
                  if (sessionStorage.getItem("gotToHome") === "true") {
                    navigate("/parent");
                  } else {
                    navigate("/childprofilesetup");
                  }
                }}
                size="full"
              >
                Continue
              </Button>
            </div>
          </div> */}
          </div>
        </ParentSignupLayout>
      )}
    </div>
  );
};

export default PaymentCompletedContent;
