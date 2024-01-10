import { getApiErrorMessage } from "@/api/helper";
import { usePayStackInit, useVerifyCompletePayStack } from "@/api/queries";
import Cancel from "@/assets/Cancel.svg";
import PayStackButton from "@/assets/paymentPaystack.svg";
// import StripeButton from "@/assets/paymentStripe.svg";
import Button from "@/components/Button";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import PayWitStripButton from "./StripButton";
import StripWrapper, { TStripe } from "./StripWrapper";
import { ImCancelCircle } from "react-icons/im";

type TPayStack = {
  access_code: string;
  amount: number;
  email: string;
  public_key: string;
  transaction_reference: string;
};

const payInit: TPayStack = {
  transaction_reference: "",
  email: "",
  amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  public_key: "",
  access_code: "",
};

const MakePaymentContent = () => {
  const planId = localStorage.getItem("planId");
  const currencyIso3 = localStorage.getItem("currency_iso3");
  const navigate = useNavigate();

  const { mutate: verifyMutate } = useVerifyCompletePayStack();
  const { mutate, isLoading } = usePayStackInit();
  const [payStatckData, setPayStatckData] = useState<TPayStack>(payInit);
  // const [verifyResponse, setVerifyResponse] = useState("");

  const [stripeData, setStripeData] = useState<TStripe>();
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const [hasClickpayStack, setHasClickedPaystack] = useState(false);
  const handlePayStackInit = () => {
    setHasClickedPaystack(true);
    mutate(
      {
        subscription_plan_id: Number(planId),
      },
      {
        onSuccess(data) {
          setPayStatckData({ ...data.data.data });
          // notifications.show({
          //   title: `Notification`,
          //   message: data.data.message,
          // });
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
  const [isPaymentLoading, setLoading] = useState(false);

  const options = {
    reference: payStatckData?.transaction_reference,
    email: payStatckData?.email,
    amount: payStatckData?.amount, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: payStatckData?.public_key,
  };

  const initializePayment = usePaystackPayment(options);

  useEffect(() => {
    const res = payStatckData;
    if (!isPaymentLoading && res?.transaction_reference && res.amount) {
      setLoading(true);
      initializePayment(
        () => {
          setLoading(false);
          verifyMutate(
            { reference: payStatckData?.transaction_reference },

            {
              onSuccess(data) {
                // window.location.href =
                // "https://dev-kundakids.vercel.app/congratulations";
                // window.location.href =
                //   "http://localhost:5173/congratulations";
                navigate("/congratulations");
                // setVerifyResponse(data.data.data.transaction_reference);
                notifications.show({
                  title: `Notification`,
                  message: data.data.message,
                });
              },

              onError(err) {
                notifications.show({
                  title: `Notification`,
                  message: getApiErrorMessage(err),
                });
              },
            }
          );
        },
        () => {
          setLoading(false);
          notifications.show({
            message: "Plan payment canceled",
            title: "Notification",
          });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payStatckData]);

  const [patmentType, setPaymentType] = useState(true);
  const [showStripe, setShowStripe] = useState(false);
  const [showPatStack, setShowPatStack] = useState(false);
  return (
    <div className="w-[100%] max-w-[800px] mx-auto relative  h-full pt-[10%] ">
      <button
        onClick={() => {
          navigate(-1);
          // if (localStorage.getItem("gotToHome") === "true") {
          //   navigate("/parent");
          // } else {
          //   navigate("/");
          //   localStorage.clear();
          // }
        }}
      >
        <span className="absolute right-[-150px] top-[40px]">
          <ImCancelCircle size={40} color={"#8530C1"} />
        </span>
      </button>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[40px] font-Reloc  text-center font-Recoleta">
          Make payment
        </h1>
        <p className="text-[15px] text-center  text-[#A7A7A7] font-Hanken">
          Kindly complete your payment using a valid credit card.
        </p>

        {planId && patmentType && (
          <div className="flex gap-10 justify-center items-center mt-10">
            <PayWitStripButton
              currencyIso3={currencyIso3 as string}
              planId={planId}
              setStripeData={setStripeData}
              setStripePromise={setStripePromise}
              setShowStripe={setShowStripe}
              setPaymentType={setPaymentType}
            />
            <button
              onClick={() => {
                setShowPatStack(true);
                setPaymentType(false);
              }}
              className="flex justify-center items-center border border-[#F3DAFF]  px-8  py-3 gap-2 rounded-3xl"
            >
              <span className="text-[16px] font-semibold"> pay with </span>
              <img src={PayStackButton} alt="image" className="inline-block" />
            </button>
          </div>
        )}
        {showPatStack && (
          <p className="mt-10 px-40 flex justify-center items-center">
            <Button
              disable={hasClickpayStack}
              onClick={handlePayStackInit}
              size="full"
            >
              {isLoading || isPaymentLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Pay now</span>
              )}
            </Button>
          </p>
        )}
        {planId && showStripe && (
          // <Skeleton height={400} width={800} visible={isLoading}>
          <p className="mt-10 flex items-center justify-center">
            <StripWrapper
              stripeData={stripeData}
              stripePromise={stripePromise}
            />
          </p>
          // </Skeleton>
        )}
      </div>
    </div>
  );
};

export default MakePaymentContent;
