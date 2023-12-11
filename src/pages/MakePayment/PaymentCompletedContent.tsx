import Button from "@/components/Button";
import ParentSignupLayout from "@/common/ParentSignupLayout";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useConnectStripe } from "@/api/queries";
// import { notifications } from "@mantine/notifications";
// import { getApiErrorMessage } from "@/api/helper";
import { Loader } from "@mantine/core";



const PaymentCompletedContent = () => {
  const navigate = useNavigate();
  const stripe= localStorage.getItem("stripeData")
  const stripeData = JSON.parse(stripe as string)
  const {mutate, isLoading} = useConnectStripe()
  const handleContinue = ()=>{
    if (localStorage.getItem("gotToHome") === "true") {
      navigate("/parent");
    } else {
      navigate("/childprofilesetup");
    }
    mutate({  subscription_plan_id:Number(localStorage.getItem("planId")),
    currency_iso3:"GBP",
    reference:stripeData?.transaction_reference,
    customer_id:stripeData?.customerID},{
      onSuccess() {
       
      //  console.log(data)
      },

      onError() {
        // notifications.show({
        //   title: `Notification`,
        //   message: getApiErrorMessage(err),
        // });
      },
    })
  }
  return (
    <div>
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
              <Button
                onClick={handleContinue}
                size="full"
              >
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Continue</span>
              )}
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
            </div>
          </div> */}
        </div>
      </ParentSignupLayout>
    </div>
  );
};

export default PaymentCompletedContent;




