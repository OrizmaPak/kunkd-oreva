// import EmailLogo from '@/assets/emaillogo.svg'
import Cancel from "@/assets/Cancel.svg";
// import InputFormat from '@/pages/Login/InputFormat'
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { PinInput, Group } from "@mantine/core";
import { useState } from "react";
import { FormEvent } from "react";
import FormWrapper from "@/common/FormWrapper";
// import { useForm, SubmitHandler } from "react-hook-form";

const ParentEnterOTP = ({ onSubmit }: { onSubmit: () => void }) => {
  const [pinValue, setPinValue] = useState("");

  const handlePinChange = (value: string) => {
    setPinValue(value);
    // console.log(value);
  };

  const submitData = () => {
    console.log("It is working");
    console.log(pinValue);
    if (pinValue.length < 4) {
      console.log(pinValue.length);
      return;
    } else {
      onSubmit();
    }
  };

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   // Form submission logic here
  // };
  return (
    <FormWrapper>
      <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
        <Link to="/">
          <span className="absolute right-0 top[-50px]">
            <img src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%]  my-auto ">
          <span></span>
          <h1 className="font-bold text-[40px] font-Recoleta">Enter OTP</h1>
          <p className="text-[15px] text-[#A7A7A7] font-Hanken">
            A code has been sent to your email, enter to verify your account.
          </p>
          {/* <form> */}
          <div className="mt-8 flex justify-center items-center relative">
            <Group position="center">
              <PinInput value={pinValue} onChange={handlePinChange} />
            </Group>
          </div>

          <p className="mt-10">
            <Button onClick={submitData} size="full" type="submit">
              Login
            </Button>
          </p>
          {/* </form> */}
          <p className="mt-2 text-center text-[] text-gray-400 ">
            <span>Don't hava an account? </span>
            <button
              className="mt-8 text-[#8530C1] font-bold
        "
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ParentEnterOTP;
