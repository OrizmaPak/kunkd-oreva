// import PasswordIcon from "@/assets/passwordIcon.svg";
import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import FormWrapper from "@/common/FormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useSetPassword } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { getApiErrorMessage } from "@/api/helper";
// import { AiOutlineEye } from "react-icons/ai";
import { RiLockLine } from "react-icons/ri";
// import useStore from "@/store";
// import { getUserState } from "@/store/authStore";

const SecureAccountContent = () => {
  const navigate = useNavigate();
  // const [user] = useStore(getUserState);
  const { isLoading, mutate } = useSetPassword();

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
      { password: data.password },
      {
        onSuccess(data) {
          console.log("success", data.data.message);

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          navigate("/packages");
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
    <FormWrapper>
      <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
        <Link to="/">
          <span className="absolute right-[-150px] top-[-40px]">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%]  my-auto ">
          <span></span>
          <h1 className="font-bold text-[40px] font-Reloc  font-Recoleta">
            Secure your account
          </h1>
          <p className="text-[15px] text-[#A7A7A7] font-Hanken">
            Create a password to secure your account
          </p>
          <form onSubmit={handleSubmit(submitData)}>
            <p className="text-[15px] text-[#A7A7A7] my-4">
              <span>Enter new password</span>
              <InputFormat
                type="password"
                placeholder="password"
                leftIcon={<RiLockLine size={25} color="#c4ccd0" />}
                reg={register("password")}
                errorMsg={errors.password?.message}
              />
            </p>
            <p className="text-[15px] text-[#A7A7A7] my-4">
              <span>Confirm password</span>
              <InputFormat
                type="password"
                placeholder="Confirm password"
                leftIcon={<RiLockLine size={25} color="#c4ccd0" />}
                reg={register("confirmPassword")}
                errorMsg={errors.confirmPassword?.message}
              />
            </p>
            <p className="mt-10">
              <Button type="submit" size="full">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span>Continue</span>
                )}
              </Button>
            </p>
          </form>
        </div>
      </div>
    </FormWrapper>
  );
};

export default SecureAccountContent;
