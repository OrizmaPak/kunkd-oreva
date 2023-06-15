import FormWrapper from "../../../common/FormWrapper";
import LoginCarousel from "../../../common/LoginCarousel";
import SecureAdminPortalContent from "./SecureAdminPortalContent";

const SecureAdminPortal = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <SecureAdminPortalContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default SecureAdminPortal;
