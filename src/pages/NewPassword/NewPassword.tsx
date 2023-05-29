import FormWrapper from "../../common/FormWrapper";
import NewPasswordContent from "./NewPasswordContent";
import LoginCarousel from "../../common/LoginCarousel";

const NewPassword = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <NewPasswordContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default NewPassword;
