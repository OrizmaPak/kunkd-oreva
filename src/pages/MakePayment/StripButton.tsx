import { getApiErrorMessage } from "@/api/helper";
import { useStripeInit } from "@/api/queries";
import StripeButton from "@/assets/paymentStripe.svg";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { TStripe } from "./StripWrapper";


const PayWitStripButton = ({setShowStripe, setPaymentType, planId, 
    setStripeData, setStripePromise
} : {
  setShowStripe: React.Dispatch<React.SetStateAction<boolean>>,
  setPaymentType: React.Dispatch<React.SetStateAction<boolean>>,
    
    planId: string,
    setStripeData: React.Dispatch<React.SetStateAction<TStripe | undefined>>,
    setStripePromise: React.Dispatch<React.SetStateAction<Promise<Stripe | null> | undefined>>,
})=>{
   const { mutate , isLoading} = useStripeInit();
 
  
    const handleStripeInit = () => {
      mutate(
        {
          subscription_plan_id: parseInt(planId),
          currency_iso3: "GBP",
        },
        {
          onSuccess(data) {
            setStripeData({ ...data.data.data });
            const publishableKey = data.data.data?.public_key;
            const stripe = loadStripe(publishableKey);
            setStripePromise(stripe);
            notifications.show({
              title: `Notification`,
              message: data.data.message,
            });
            setShowStripe(true);
                setPaymentType(false);
          },
  
          onError(err) {  
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        }
      );
    };
    // handleStripeInit();

  return (
     <button
              onClick={() => {
                handleStripeInit();
              }}
              className="flex justify-center items-center border border-[#F3DAFF]  px-16  py-3 gap-2 rounded-3xl"
            >
                {isLoading ? (
                    <Loader />
                ) : (
<>
<span className="text-[16px] font-semibold"> pay with </span>
<img src={StripeButton} alt="image" className="inline-block" />
</>
                    )} 
            </button>
  )
}

export default PayWitStripButton