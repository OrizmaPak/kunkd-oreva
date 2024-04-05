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
import { AiOutlineEye } from "react-icons/ai";
import { RiLockLine } from "react-icons/ri";

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
    mutate(
      { otp: ForgotPasswordOtp, password: data.password },
      {
        onSuccess(data) {
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
    <div className="flex justify-center items-center w-full h-full">
      <div className="inner-form-w relative  my-auto flex justify-end items-center ">
        <Link to="/">
          <span className="absolute top-[-60px]">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%]  my-auto ">
          <span></span>
          <h1 className="font-bold header2 font-Reloc  font-Recoleta">
            Enter New password
          </h1>
          <p className="text3 text-[#A7A7A7] font-Hanken">
            Use a password that is easy to remember
          </p>
          <form onSubmit={handleSubmit(submitData)}>
            <p className="text3 text-[#A7A7A7] my-4">
              <span>Enter new password</span>
              <InputFormat
                type="password"
                reg={register("password")}
                errorMsg={errors.password?.message}
                placeholder="password"
                leftIcon={<RiLockLine size={20} color="#c4ccd0" />}
                rightIcon={<AiOutlineEye size={22} color="#c4ccd0" />}
              />
            </p>
            <p className=" text-[#A7A7A7] my-4">
              <span className="text3">Confirm password</span>
              <InputFormat
                type="password"
                reg={register("confirmPassword")}
                errorMsg={errors.confirmPassword?.message}
                placeholder="password"
                leftIcon={<RiLockLine size={20} color="#c4ccd0" />}
                rightIcon={<AiOutlineEye size={22} color="#c4ccd0" />}
              />
            </p>
            <p className="mt-10">
              <Button type="submit" size="full">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="text3"> Update password</span>
                )}
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordContent;
