import Cancel from "@/assets/Cancel.svg";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { PinInput, Group } from "@mantine/core";
import FormWrapper from "@/common/FormWrapper";
import { useVerifyOtp, useResendOTP } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { getApiErrorMessage } from "@/api/helper";
import { getUserState } from "@/store/authStore";
import useStore from "@/store";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { FormData } from "@/common/User/FormValidation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUser } from "@/api/types";
import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

const ParentEnterOTP = ({ onSubmit }: { onSubmit: () => void }) => {
  const { isLoading, mutate } = useVerifyOtp();
  const { mutate: resendOTPMutate } = useResendOTP();
  const [user, setUser] = useStore(getUserState);

  const schema: ZodType<Pick<FormData, "otp">> = z.object({
    otp: z
      .string()
      .min(4, { message: " OTP can only be at least 4 characters long" }),
  });

  const { handleSubmit, setValue, watch, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const otp = watch("otp");

  // const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (secondsLeft === 0) {
      // setIsActive(true);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const submitData = (data: Pick<FormData, "otp">) => {
    console.log("testing");
    console.log("It is working", data);

    mutate(
      { ...data },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          const res = data?.data?.data as TUser;

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          setUser({ ...res });
          onSubmit();
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

  const handlePinChange = (value: string) => {
    console.log("-- pin value: ", value);
    setValue("otp", value);
    trigger("pin");
  };
  const handleResendOTP = () => {
    resendOTPMutate(
      { email: user?.email },
      {
        onSuccess(data) {
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          setSecondsLeft(300);
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
      {/* <motion.div
        animate={{ x: 100 }}
        transition={{ ease: "easeOut", duration: 2 }}
      > */}
      <div className=" w-full h-full flex justify-center items-center">
        <div className="inner-form-w2 mx-auto relative">
          <Link to="/">
            <span className="absolute right-0 top-[-80px]">
              <img loading="lazy" src={Cancel} alt="cancel" />
            </span>
          </Link>
          <div className="w-[100%]  my-auto ">
            <span></span>
            <h1 className="font-bold text-[40px] font-Recoleta">Enter OTP</h1>
            <p className="text-[15px] text-[#A7A7A7] font-Hanken">
              A code has been sent to your email, enter to verify your account.
            </p>
            <form onSubmit={handleSubmit(submitData)}>
              <div className="mt-8 flex justify-center items-center relative">
                <Group position="center">
                  <PinInput value={otp} onChange={handlePinChange} />
                </Group>
              </div>

              <p className="mt-8">
                <Button type="submit" size="full">
                  {isLoading ? (
                    <p className="flex justify-center items-center">
                      <Loader color="white" size="sm" />
                    </p>
                  ) : (
                    <span>Verify</span>
                  )}
                </Button>
              </p>
            </form>
            <p className="mt-2 text-center text-[] text-gray-400 ">
              {secondsLeft === 0 ? (
                <button onClick={handleResendOTP} className="font-semibold">
                  Resend
                </button>
              ) : (
                <strong>Resend in {secondsLeft}s</strong>
              )}
            </p>
          </div>
        </div>
      </div>
      {/* </motion.div> */}
    </FormWrapper>
  );
};

export default ParentEnterOTP;
