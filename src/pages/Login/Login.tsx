import SignInWrapper from "@/common/SignInWrapper";
import FormWrapper from "../../common/FormWrapper";
import LoginCarousel from "../../common/LoginCarousel";
import LoginContent from "./LoginContent";

const Login = () => {
  return (
    <div className="flex">
      <SignInWrapper>
        <LoginContent />
      </SignInWrapper>
      {/* <LoginCarousel /> */}
    </div>
  );
};

export default Login;
