// import EmailLogo from '@/assets/emaillogo.svg'
import Cancel from "@/assets/Cancel.svg";
// import InputFormat from '@/pages/Login/InputFormat'
import Button from "@/components/Button";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FormEvent } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

const ParentEnterOTP = ({ onSubmit }: { onSubmit: () => void }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    // Form submission logic here
  };
  return (
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
        <form onSubmit={handleSubmit}>
          <div className="mt-8 flex justify-center items-center">
            <HStack>
              <PinInput size="lg" otp>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </div>

          <p className="mt-10">
            <Button size="full" type="submit">
              Login
            </Button>
          </p>
        </form>
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
  );
};

export default ParentEnterOTP;
