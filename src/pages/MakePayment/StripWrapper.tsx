import { SyntheticEvent, useLayoutEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import "./stripStyle.css";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { useStripeInit } from "@/api/queries";
import { Skeleton } from "@mantine/core";

type TStripe = {
  clientSecret: string;
  customerID: string;
  email: string;
  payment_intent_id: string;
  public_key: string;
  transaction_reference: string;
};

const CheckoutForm = ({ data }: { data: TStripe }) => {
  const stripe = useStripe();
  const elements = useElements();

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

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const {
      clientSecret,
      // customerID,
      // email,
      // payment_intent_id,
      // public_key,
      // transaction_reference,
    } = data;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://dev-kundakids.vercel.app/congratulations",
        // return_url: "http://localhost:5173/congratulations",
        // onSuccess:(){}
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
    }
    setIsLoading(false);
  };

  // const [email, setEmail] = useState("");sss
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className="strip-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => {
          console.log("e", e);
          // setEmail(e.value.email);
        }}
      />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <button
        className=""
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const PaymentOutlet = ({ planId }: { planId: string }) => {
  const { mutate } = useStripeInit();
  const [isLoading, setIsLoading] = useState(true);
  const [stripeData, setStripeData] = useState<TStripe>();
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  console.log("StripeInit", isLoading);
  console.log("strip data", planId);
  const handleStripeInit = () => {
    mutate(
      {
        subscription_plan_id: parseInt(planId),
        currency_iso3: "GBP",
      },
      {
        onSuccess(data) {
          console.log("success", data);
          setStripeData({ ...data.data.data });
          const publishableKey = data.data.data?.public_key;
          const stripe = loadStripe(publishableKey);
          setStripePromise(stripe);
          setIsLoading(false);
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },

        onError(err) {
          setIsLoading(false);

          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };
  useLayoutEffect(() => {
    handleStripeInit();
  }, []);

  return (
    <Skeleton height={400} visible={isLoading}>
      {stripePromise ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: stripeData?.clientSecret,
          }}
        >
          <CheckoutForm data={stripeData!} />
        </Elements>
      ) : null}
    </Skeleton>
  );
};

export default PaymentOutlet;
