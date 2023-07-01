import EmailLogo from "@/assets/emaillogo.svg";
import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";

const ForgotPasswordContent = () => {
  const navigate = useNavigate();
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    console.log("It is working", data);
    navigate("/resetpassword");
  };

  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute">
          <img loading="lazy" src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[50px] font-Recoleta mb-2">
          Forgot password?
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Forgot your password? Dont't worry enter your email to reset your
          current password
        </p>
        <form onSubmit={handleSubmit(submitData)} className="mt-8">
          <InputFormat
            type="email"
            placeholder="email"
            reg={register("email")}
            errorMsg={errors.email?.message}
            leftIcon={<img loading="lazy" src={EmailLogo} alt="email icon" />}
          />
          <p className="mt-10">
            {/* <Link to="/resetpassword"> */}
            <Button type="submit" size="full">
              Get verification code
            </Button>
            {/* </Link> */}
          </p>
        </form>
        <p className="mt-2 text-center text-[] text-gray-400 ">
          <span className="font-Hanken">Don't hava an account? </span>
          <button
            className="mt-8 text-[#8530C1] font-bold
        "
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordContent;
