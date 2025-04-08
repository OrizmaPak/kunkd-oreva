// import FormWrapper from "../../common/FormWrapper";
import ResetPasswordContent from "./ResetPasswordContent";
// import LoginCarousel from "../../common/LoginCarousel";
import SignInWrapper from "@/common/SignInWrapper";

const ResetPassword = () => {
  return (
    <div className="flex">
      <SignInWrapper>
        <ResetPasswordContent />
      </SignInWrapper>
      {/* <LoginCarousel /> */}
    </div>
  );
};

export default ResetPassword;
