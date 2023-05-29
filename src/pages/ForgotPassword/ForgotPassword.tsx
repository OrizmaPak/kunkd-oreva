import FormWrapper from "../../common/FormWrapper";
import ForgotPasswordContent from "./ForgotPasswordContent";
import LoginCarousel from "../../common/LoginCarousel";

const ForgotPassword = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <ForgotPasswordContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default ForgotPassword;
