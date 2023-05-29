import EmailLogo from "@/assets/emaillogo.svg";
import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

const ForgotPasswordContent = () => {
  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute">
          <img src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[50px] font-Recoleta mb-2">
          Forgot password?
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Forgot your password? Dont't worry enter your email to reset your
          current password
        </p>
        <form className="mt-8">
          <InputFormat
            type="password"
            placeholder="password"
            leftIcon={<img src={EmailLogo} alt="pasword icon" />}
          />
          <p className="mt-10">
            <Link to="/resetpassword">
              <Button size="full">Login</Button>
            </Link>
          </p>
        </form>
        <p className="mt-2 text-center text-[] text-gray-400 ">
          <span className="font-Hanken">Don't hava an account? </span>
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

export default ForgotPasswordContent;
