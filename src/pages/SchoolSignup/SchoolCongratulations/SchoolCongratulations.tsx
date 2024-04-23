import FormWrapper from "../../../common/FormWrapper";
import SchoolCongratulationsContent from "./SchoolCongratulationContent";
import LoginCarousel from "../../../common/LoginCarousel";

const SchoolCongratulations = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <SchoolCongratulationsContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default SchoolCongratulations;
