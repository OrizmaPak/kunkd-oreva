import EmailLogo from "@/assets/emaillogo.svg";
import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import useStore from "@/store";
import { getForgotPasswordOtp } from "@/store/forgotPasswordOtp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useResetPassword } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

const NewPasswordContent = () => {
  const [ForgotPasswordOtp, ,] = useStore(getForgotPasswordOtp);
  const { isLoading, mutate } = useResetPassword();

  const navigate = useNavigate();
  const schema: ZodType<FormData> = z
    .object({
      password: z
        .string()
        .min(4, { message: "Password must be at least 4 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),
      confirmPassword: z
        .string()
        .min(4, { message: "Password must be at least 4 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);

    mutate(
      { otp: ForgotPasswordOtp, password: data.password },
      {
        onSuccess(data) {
          console.log("success", data.data.message);

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          navigate("/passwordCongratulations");
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
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute">
          <img loading="lazy" src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[40px] font-Reloc  font-Recoleta">
          Enter New password
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Use a password that is easy to remember
        </p>
        <form onSubmit={handleSubmit(submitData)}>
          <p className="text-[15px] text-[#A7A7A7] my-4">
            <span>Enter new password</span>
            <InputFormat
              type="password"
              reg={register("password")}
              errorMsg={errors.password?.message}
              placeholder="password"
              leftIcon={
                <img loading="lazy" src={EmailLogo} alt="pasword icon" />
              }
            />
          </p>
          <p className="text-[15px] text-[#A7A7A7] my-4">
            <span>Confirm password</span>
            <InputFormat
              type="password"
              reg={register("confirmPassword")}
              errorMsg={errors.confirmPassword?.message}
              placeholder="password"
              leftIcon={
                <img loading="lazy" src={EmailLogo} alt="pasword icon" />
              }
            />
          </p>
          <p className="mt-10">
            <Button type="submit" size="full">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span> Update password</span>
              )}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordContent;
