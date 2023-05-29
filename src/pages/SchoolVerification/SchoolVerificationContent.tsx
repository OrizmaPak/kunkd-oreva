// import EmailLogo from '@/assets/emaillogo.svg'
import Cancel from "@/assets/Cancel.svg";
// import InputFormat from '@/pages/Login/InputFormat'
import Button from "@/components/Button";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SchoolVerificationContent = () => {
  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute">
          <img src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[40px] font-Recoleta">Verify account</h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          A code has been sent to mail, enter to verify your account{" "}
        </p>
        <form>
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
            <Link to="/schoolcongratulations">
              <Button size="full">Login</Button>
            </Link>
          </p>
        </form>
        <p className="mt-6 text-center text-[]  ">
          <strong>Resend in 59s</strong>
        </p>
      </div>
    </div>
  );
};

export default SchoolVerificationContent;
