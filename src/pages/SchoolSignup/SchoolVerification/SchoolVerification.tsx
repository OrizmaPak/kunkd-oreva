import FormWrapper from "../../../common/FormWrapper";
import SchoolVerificationContent from "./SchoolVerificationContent";
import LoginCarousel from "../../../common/LoginCarousel";

const SchoolVerification = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <SchoolVerificationContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default SchoolVerification;
