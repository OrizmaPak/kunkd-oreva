import FormWrapper from "../../common/FormWrapper";
import ResetPasswordContent from "./ResetPasswordContent";
import LoginCarousel from "../../common/LoginCarousel";

const ResetPassword = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <ResetPasswordContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default ResetPassword;
