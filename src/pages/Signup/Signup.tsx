import FormWrapper from "../../common/FormWrapper";
import SignupContent from "./SignupContent";
import LoginCarousel from "../../common/LoginCarousel";

const Signup = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <SignupContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default Signup;
