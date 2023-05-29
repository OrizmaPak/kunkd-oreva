import FormWrapper from "../../common/FormWrapper";
import LoginCarousel from "../../common/LoginCarousel";
import LoginContent from "./LoginContent";

const Login = () => {
  return (
    <div className="flex">
      <FormWrapper>
        <LoginContent />
      </FormWrapper>
      <LoginCarousel />
    </div>
  );
};

export default Login;
