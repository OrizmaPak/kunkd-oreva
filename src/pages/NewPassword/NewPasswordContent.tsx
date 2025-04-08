// import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
// import { Link } from "react-router-dom";
import useStore from "@/store";
import { getForgotPasswordOtp } from "@/store/forgotPasswordOtp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useResetPassword } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { Loader } from "@mantine/core";
import { AiOutlineEye } from "react-icons/ai";
import { RiLockLine } from "react-icons/ri";
import KundaLogo from "@/assets/KundaLogo.svg";
import SchoolCongratulationsContent from "../SchoolSignup/SchoolCongratulations/SchoolCongratulationContent";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const NewPasswordContent = () => {
  const [ForgotPasswordOtp, ,] = useStore(getForgotPasswordOtp);
  const { isLoading, mutate } = useResetPassword();
  const [opened, { open, close }] = useDisclosure(false);

  const schema: ZodType<FormData> = z.object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
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
          open();
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
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
    <>
      <Modal
        opened={opened}
        radius={34}
        centered
        size={"495px"}
        onClose={close}
        withCloseButton={false}
        closeOnClickOutside={false}
        transitionProps={{ duration: 500, timingFunction: "ease" }}
      >
        <SchoolCongratulationsContent
          route="/login"
          message="The password has been updated"
        />
      </Modal>
      <div className="flex justify-center  rounded-[50px] w-[550px]  py-[40px] bg-white">
        <div className="inner-form-w ">
          <div className="flex justify-center items-center mb-10 mt-8 ">
            <img src={KundaLogo} alt="image" className="w-[160px]" />
          </div>
          <div className="w-[100%]  my-auto ">
            <span></span>
            <h1 className="font-bold text-[36px] font-BalooSemiBold text-center leading-none ">
              Enter New password
            </h1>
            <p className="text3 text-[#A7A7A7] font-Hanken text-center leading-normal">
              Use a password that is easy to remember
            </p>
            <form onSubmit={handleSubmit(submitData)}>
              <p className="text3 text-[#A7A7A7] my-4 mt-10 ">
                <span>Enter new password</span>
                <InputFormat
                  type="password"
                  reg={register("password")}
                  errorMsg={errors.password?.message}
                  placeholder="Enter new password"
                  leftIcon={<RiLockLine size={20} color="#c4ccd0" />}
                  rightIcon={<AiOutlineEye size={22} color="#c4ccd0" />}
                />
              </p>

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
                    <span className="text3"> Update password</span>
                  )}
                </Button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPasswordContent;
