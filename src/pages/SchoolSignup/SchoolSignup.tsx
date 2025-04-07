// import FormWrapper from "../../common/FormWrapper";
import SchSignupContent from "@/pages/SchoolSignup/SchoolSignupContent";
// import LoginCarousel from "../../common/LoginCarousel";
import SignInWrapper from "@/common/SignInWrapper";

const SchoolSignUp = () => {
  return (
    <div className="flex">
      <SignInWrapper>
        <SchSignupContent />
      </SignInWrapper>
      {/* <LoginCarousel /> */}
    </div>
  );
};

export default SchoolSignUp;
