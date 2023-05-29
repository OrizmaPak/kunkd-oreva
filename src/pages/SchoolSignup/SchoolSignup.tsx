import FormWrapper from "../../common/FormWrapper";
import SchSignupContent from "@/pages/SchoolSignup/SchoolSignupContent";
import LoginCarousel from "../../common/LoginCarousel";

const SchoolSignUp = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <SchSignupContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default SchoolSignUp;
