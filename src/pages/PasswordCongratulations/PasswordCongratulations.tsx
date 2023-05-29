import FormWrapper from "../../common/FormWrapper";
import PasswordCongratulationsContent from "./PasswordCongratulationsContent";
import LoginCarousel from "../../common/LoginCarousel";

const PasswordCongratulations = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <PasswordCongratulationsContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default PasswordCongratulations;
