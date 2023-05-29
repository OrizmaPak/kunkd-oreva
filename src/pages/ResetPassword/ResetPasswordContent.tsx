// import EmailLogo from '@/assets/emaillogo.svg'
import Cancel from "@/assets/Cancel.svg";
// import InputFormat from '@/pages/Login/InputFormat'
import Button from "@/components/Button";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ResetPasswordContent = () => {
  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute">
          <img src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[40px] font-Recoleta">Reset password</h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Forgot your password? Dont't worry enter your email to reset your
          current password
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
            <Link to="/newpassword">
              <Button size="full">Reset</Button>
            </Link>
          </p>
        </form>
        <p className="mt-2 text-center text-[] text-gray-400 ">Resend in 59s</p>
      </div>
    </div>
  );
};

export default ResetPasswordContent;
