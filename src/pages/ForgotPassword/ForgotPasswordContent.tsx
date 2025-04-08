import EmailLogo from "@/assets/emaillogo.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useForgotPassword } from "@/api/queries";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import KundaLogo from "@/assets/KundaLogo.svg";

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
    <div className="flex justify-center py-[30px] bg-white rounded-[50px] min-w-[550px]">
      <div className="inner-form-w ">
        <div className="flex justify-center items-center mt-8 mb-12 ">
          <img src={KundaLogo} alt="image" className="w-[160px]" />
        </div>
        <div className="w-[90%]  mx-auto my-auto ">
          <span></span>
          <h1 className="font-bold text-[36px] text-center  leading-none font-BalooSemiBold mb-2">
            Forgot password?
          </h1>
          <p className="text-[14px] text-[#A7A7A7] font-Arimo text-center leading-none">
            Don't worry enter your email to reset your current password
          </p>
          <form onSubmit={handleSubmit(submitData)} className="mt-10">
            <InputFormat
              type="email"
              placeholder="email"
              reg={register("email")}
              errorMsg={errors.email?.message}
              leftIcon={<img loading="lazy" src={EmailLogo} alt="email icon" />}
            />
            <p className="mt-10">
              <Button
                type="submit"
                size="full"
                backgroundColor="green"
                className="rounded-full"
              >
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
              className="mt-8 text-customGreen font-bold
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
