// import FormWrapper from "../../common/FormWrapper";
import ForgotPasswordContent from "./ForgotPasswordContent";
// import LoginCarousel from "../../common/LoginCarousel";
import SignInWrapper from "@/common/SignInWrapper";

const ForgotPassword = () => {
  return (
    <div className="flex">
      <SignInWrapper>
        <ForgotPasswordContent />
      </SignInWrapper>
      {/* <LoginCarousel /> */}
    </div>
  );
};

export default ForgotPassword;
