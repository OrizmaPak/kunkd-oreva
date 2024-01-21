import { Stripe } from "@stripe/stripe-js";
import { Loader } from "@mantine/core";
import {
  SyntheticEvent,
  //  useLayoutEffect,
  useState,
} from "react";

// import { getApiErrorMessage } from "@/api/helper";
// import { useStripeInit } from "@/api/queries";
// import { Skeleton } from "@mantine/core";
// import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { Skeleton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./stripStyle.css";
// import { useConnectStripe } from "@/api/queries";

export type TStripe = {
  clientSecret: string;
  customerID: string;
  email: string;
  payment_intent_id: string;
  public_key: string;
  transaction_reference: string;
};

const CheckoutForm = ({
  setIsElementLoading,
}: // stripeData
{
  setIsElementLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // stripeData:TStripe
}) => {
  const stripe = useStripe();
  const elements = useElements();
  // const {mutate} =  useConnectStripe()

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    try {
      // const { paymentIntent } = await stripe.retrievePaymentIntent(stripeData?.clientSecret);
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://dev-kundakids.vercel.app/congratulations",
          // return_url: "http://localhost:5173/congratulations",
          // onSuccess:(){}s
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        notifications.show({
          title: `Notification`,
          message: "Payment Successful",
        });
      }
    } catch (error) {
      notifications.show({
        title: `Notification`,
        message: getApiErrorMessage(error),
      });
    }

    setIsLoading(false);
  };

  // const [email, setEmail] = useState("");sss
  const [isLoading, setIsLoading] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  return (
    <form className="strip-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement
        onChange={(event) => {
          if (event.complete) {
            setEnableSubmit(true);
          }
        }}
        onReady={() => {
          setIsElementLoading(false);
          // setIsLoading(true);
        }}
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <button
        className="w-[120px] bg-[#8530C1] rounded flex justify-center items-center py-2"
        disabled={isLoading || !stripe || !elements || !enableSubmit}
        id="submit"
      >
        <span id="button-text " className=" rounded  text-white">
          {isLoading ? (
            <Loader size={20} color="white" />
          ) : (
            <span className="text-center">Pay now</span>
          )}
        </span>
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const PaymentOutlet = ({
  stripeData,
  stripePromise,
}: {
  stripeData: TStripe | undefined;
  stripePromise: Promise<Stripe | null> | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Skeleton height={400} visible={isLoading}>
      <>
        {stripePromise ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: stripeData?.clientSecret,
            }}
          >
            {stripeData ? (
              <CheckoutForm setIsElementLoading={setIsLoading} />
            ) : null}
          </Elements>
        ) : null}
      </>
    </Skeleton>
  );
};

export default PaymentOutlet;
