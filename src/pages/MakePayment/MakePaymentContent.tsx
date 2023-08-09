import Cancel from "@/assets/Cancel.svg";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { usePayStackInit, useVerifyCompletePayStack } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { usePaystackPayment } from "react-paystack";
import { Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import StripeButton from "@/assets/paymentStripe.svg";
import PayStackButton from "@/assets/paymentPaystack.svg";
import StripWrapper from "./StripWrapper";

type TPayStack = {
  access_code: string;
  amount: number;
  email: string;
  public_key: string;
  transaction_reference: string;
};

const MakePaymentContent = () => {
  const planId = localStorage.getItem("planId");

  const { mutate: verifyMutate } = useVerifyCompletePayStack();
  const { mutate, isLoading } = usePayStackInit();
  const [payStatckData, setPayStatckData] = useState<TPayStack>();
  const [verifyResponse, setVerifyResponse] = useState("");
  console.log(verifyResponse);
  const handlePayStackInit = () => {
    mutate(
      {
        subscription_plan_id: Number(planId),
      },
      {
        onSuccess(data) {
          // <PaystackButton {...data.data.data} />;
          setPayStatckData({ ...data.data.data });
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
  };
  const [isPaymentLoading, setLoading] = useState(false);

  const options = {
    reference: payStatckData?.transaction_reference!,
    email: payStatckData?.email!,
    amount: payStatckData?.amount!, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: payStatckData?.public_key!,
  };

  const initializePayment = usePaystackPayment(options);
  useEffect(() => {
    let res = payStatckData;
    if (!isPaymentLoading && res?.transaction_reference && res.amount) {
      setLoading(true);
      initializePayment(
        () => {
          setLoading(false);
          verifyMutate(
            { reference: payStatckData?.transaction_reference },

            {
              onSuccess(data) {
                window.location.href = "http://localhost:5173/congratulations";
                setVerifyResponse(data.data.data.transaction_reference);
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
  }, [payStatckData]);

  const [patmentType, setPaymentType] = useState(true);
  const [showStripe, setShowStripe] = useState(false);
  const [showPatStack, setShowPatStack] = useState(false);
  return (
    <div className="w-[100%] max-w-[800px] mx-auto relative  h-full pt-[20%] ">
      <Link to="/">
        <span className="absolute right-[-150px] top-[40px]">
          <img loading="lazy" src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[40px] font-Reloc  text-center font-Recoleta">
          Make payment
        </h1>
        <p className="text-[15px] text-center  text-[#A7A7A7] font-Hanken">
          Kindly complete your payment using a valid credit card.
        </p>

        {patmentType && (
          <div className="flex gap-10 justify-center items-center mt-10">
            <button
              onClick={() => {
                setShowStripe(true);
                setPaymentType(false);
              }}
              className="flex justify-center items-center border border-[#F3DAFF]  px-16  py-3 gap-2 rounded-3xl"
            >
              <span className="text-[16px] font-semibold"> pay with </span>
              <img src={StripeButton} alt="image" className="inline-block" />
            </button>
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
            <Button onClick={handlePayStackInit} size="full">
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
        {showStripe && (
          <p className="mt-10 flex items-center justify-center">
            <StripWrapper planId={planId!} />
          </p>
        )}
      </div>
    </div>
  );
};

export default MakePaymentContent;
