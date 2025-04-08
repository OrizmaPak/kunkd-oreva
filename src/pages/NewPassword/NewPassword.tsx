// import FormWrapper from "../../common/FormWrapper";
import NewPasswordContent from "./NewPasswordContent";
// import LoginCarousel from "../../common/LoginCarousel";
import SignInWrapper from "@/common/SignInWrapper";

const NewPassword = () => {
  return (
    <div className="flex">
      <SignInWrapper>
        <NewPasswordContent />
      </SignInWrapper>
      {/* <LoginCarousel /> */}
    </div>
  );
};

export default NewPassword;
