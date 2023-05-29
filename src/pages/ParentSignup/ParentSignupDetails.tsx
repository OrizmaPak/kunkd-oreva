import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import PasswordIcon from "@/assets/passwordIcon.svg";
import EmailLogo from "@/assets/emaillogo.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import Cancel from "@/assets/Cancel.svg";
import { Link } from "react-router-dom";
import { FormEvent } from "react";

const ParentSignupDetails = ({ onSubmit }: { onSubmit: () => void }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    // Form submission logic here
  };
  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative">
      <Link to="/">
        <span className="absolute right-0 top-[-30px]">
          <img src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%] pt-20">
        <span></span>
        <h1 className="font-bold fon text-[40px] font-Recoleta">
          Sign up of parent
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Start learning and reading without restrictions.{" "}
        </p>
        <form className="mt-8" onSubmit={handleSubmit}>
          <p className="my-8">
            <InputFormat type="text" placeholder="Your name" />
          </p>
          <p className="my-8">
            <InputFormat type="text" placeholder="House address" />
          </p>
          <p className="my-8">
            <InputFormat
              type="text"
              placeholder="Email"
              leftIcon={<img src={EmailLogo} alt="pasword icon" />}
            />
          </p>

          <p className="text-center font-Hanken m-3 mt-4 text-gray-400">
            By continuing you agree to Kunda Kids{" "}
            <strong className=" text-black"> Terms of Service </strong>and{" "}
            <strong className="text-black"> Privacy Policy </strong>
          </p>
          <Button size="full" type="submit">
            Create free account
          </Button>
        </form>

        <p className="mt-2 text-center text-[] text-gray-400 ">
          <span className="font-Hanken">Already hava an account? </span>
          <button
            className="mt-6 text-[#8530C1] font-bold
              "
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ParentSignupDetails;
