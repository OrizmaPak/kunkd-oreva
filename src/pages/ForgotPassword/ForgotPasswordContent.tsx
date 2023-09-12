import EmailLogo from "@/assets/emaillogo.svg";
import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useForgotPassword } from "@/api/queries";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
const ForgotPasswordContent = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useForgotPassword();

  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    mutate(
      { ...data },
      {
        onSuccess(data) {
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          navigate("/resetpassword");
        },

        onError(err) {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="inner-form-w relative  my-auto flex justify-end items-center ">
        <Link to="/">
          <span className="absolute top-[-60px]">
            <img loading="lazy" src={Cancel} alt="cancel" className="" />
          </span>
        </Link>
        <div className="w-[90%]  mx-auto my-auto ">
          <span></span>
          <h1 className="font-bold text-[40px] font-Recoleta mb-2">
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
              <Button type="submit" size="full">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span>Get verification code</span>
                )}
              </Button>
            </p>
          </form>
          <p className="mt-2 text-center text-[] text-gray-400 ">
            <span className="font-Hanken">Don't hava an account? </span>
            <button
              onClick={() => navigate("/signup")}
              className="mt-8 text-[#8530C1] font-bold
        "
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordContent;
