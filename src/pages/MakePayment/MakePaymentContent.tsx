import Visa from "@/assets/visa.svg";
import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { usePayStackInit, useVerifyCompletePayStack } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { usePaystackPayment } from "react-paystack";
import { Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigation } from "react-router-dom";

import StripWrapper from "./StripWrapper";

type TPayStack = {
  access_code: string;
  amount: number;
  email: string;
  public_key: string;
  transaction_reference: string;
};

// interface PaystackButtonProps {
//   reference?: string;
//   email?: string;
//   amount?: number;
//   publicKey?: string;
//   onSuccess?: () => void;
//   onClose?: () => void;
//   text?: string;
//   access_code?: string;
// }

const MakePaymentContent = ({ onSubmit }: { onSubmit: () => void }) => {
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   onSubmit();
  //   console.log("matthew");
  //   // Form submission logic here
  // };

  // const { mutate: stripeMutate, isLoading: stripIsLoading } = useStripeInit();
  const planId = localStorage.getItem("planId");
  // const [isLoading, setIsLoading] = useState(false);

  // const handleStripeInit = () => {
  //   stripeMutate(
  //     {
  //       subscription_plan_id: planId,
  //       currency_iso3: "GBP",
  //     },
  //     {
  //       onSuccess(data) {
  //         console.log("success", data);
  //         setStripeData({ ...data.data.data });
  //         notifications.show({
  //           title: `Notification`,
  //           message: data.data.message,
  //         });
  //       },

  //       onError(err) {
  //         notifications.show({
  //           title: `Notification`,
  //           message: getApiErrorMessage(err),
  //         });
  //       },
  //     }
  //   );
  // };

  const { mutate: verifyMutate } = useVerifyCompletePayStack();
  const { mutate, isLoading } = usePayStackInit();
  const [payStatckData, setPayStatckData] = useState<TPayStack>();
  const [verifyResponse, setVerifyResponse] = useState("");
  const handlePayStackInit = () => {
    console.log("planId", planId);
    mutate(
      {
        subscription_plan_id: Number(planId),
      },
      {
        onSuccess(data) {
          console.log("success", data);
          // <PaystackButton {...data.data.data} />;
          setPayStatckData({ ...data.data.data });
          console.log("PayStackData", payStatckData);
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
  // const navigate = useNavigation();
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
                console.log("verify resonse ----------", data);
                // navigate('payment')
                window.location.href = "http://localhost:5173/congratulations";
                // onSubmit();
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
          // notifications.show({
          //   message: "Property booked successfully",
          //   title: "Booking Successfull",
          // });
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

  // useEffect(() => {
  //  const  navigate = useNavigation();
  //   navigate("payment")
  //   window.location()
  // },[verifyResponse])
  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute right-[-150px] top-[40px]">
          <img loading="lazy" src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div>
        <div className="w-[100%]  my-auto ">
          <span></span>
          <h1 className="font-bold text-[40px] font-Reloc  font-Recoleta">
            Make payment
          </h1>
          <p className="text-[15px] text-[#A7A7A7] font-Hanken">
            Kindly complete your payment using a valid credit card.
          </p>
          <form>
            <p className="text-[15px] text-[#A7A7A7] my-4">
              <span>Card number</span>
              <InputFormat
                type="number"
                placeholder="54737 347373 34774"
                leftIcon={<img loading="lazy" src={Visa} alt=" visa icon" />}
              />
            </p>
            <div className="flex justify-between">
              <p className="text-[15px] text-[#A7A7A7] my-4">
                <span>Expiry</span>
                <InputFormat type="date" placeholder="12 / 28" />
              </p>

              <p className="text-[15px] text-[#A7A7A7] my-4">
                <span>CVC</span>
                <InputFormat type="number" placeholder="* * *" />
              </p>
            </div>
            <p className="mt-10">
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
          </form>
        </div>
        <p className="mt-10">
          <StripWrapper planId={planId!} onSubmit={onSubmit} />
        </p>
      </div>
    </div>
  );
};

export default MakePaymentContent;
