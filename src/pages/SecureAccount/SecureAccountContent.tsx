import EmailLogo from "@/assets/emaillogo.svg";
import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import FormWrapper from "@/common/FormWrapper";

const SecureAccountContent = () => {
  return (
    <FormWrapper>
      <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
        <Link to="/">
          <span className="absolute right-[-150px] top-[-40px]">
            <img src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%]  my-auto ">
          <span></span>
          <h1 className="font-bold text-[40px] font-Reloc  font-Recoleta">
            Secure your account
          </h1>
          <p className="text-[15px] text-[#A7A7A7] font-Hanken">
            Create a password to secure your account
          </p>
          <form>
            <p className="text-[15px] text-[#A7A7A7] my-4">
              <span>Enter new password</span>
              <InputFormat
                type="password"
                placeholder="password"
                leftIcon={<img src={EmailLogo} alt="pasword icon" />}
              />
            </p>
            <p className="text-[15px] text-[#A7A7A7] my-4">
              <span>Confirm password</span>
              <InputFormat
                type="password"
                placeholder="password"
                leftIcon={<img src={EmailLogo} alt="pasword icon" />}
              />
            </p>
            <p className="mt-10">
              <Link to="/packages">
                <Button size="full">Continue</Button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </FormWrapper>
  );
};

export default SecureAccountContent;
