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
import { handleEventTracking } from "@/api/moengage";
import moengage from "@moengage/web-sdk";
import SignInWrapper from "@/common/SignInWrapper";
import KundaLogo from "@/assets/KundaLogo.svg";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import ParentCongratulations from "./ParentCongratulations";


// import { motion } from "framer-motion";

const ParentVerification = () => {
    const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, mutate } = useVerifyOtp();
  const { mutate: resendOTPMutate } = useResendOTP();
  const [user, setUser] = useStore(getUserState);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day = currentDate.getDate();
  const formattedDate =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);

  const schema: ZodType<Pick<FormData, "otp">> = z.object({
    otp: z
      .string()
      .min(4, { message: " OTP can only be at least 4 characters long" }),
  });

  const { handleSubmit, setValue, watch, trigger, formState } = useForm<FormData>({
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
    mutate(
      { ...data },
      {
        onSuccess(data) {
          const res = data?.data?.data as TUser;
          
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          open()
          moengage.add_unique_user_id(res?.user_id);
          moengage.add_first_name(res?.firstname);
          moengage.add_last_name(res?.lastname);
          moengage.add_email(res?.email);
          moengage.add_mobile(res?.phoneNumber);
          handleEventTracking("web_parent_registered", {
            email_address: res?.email,
            user_id: res?.user_id,
            registration_date: formattedDate,
            registration_method: "manual",
            registration_platform: "webapp",
          });
          setUser({ ...res });
        },
        onError() {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage("You have  entered a wrong code"),
          });
        },
      }
    );
  };

  const handlePinChange = (value: string) => {
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
    <>
    
    <Modal 
     opened={opened}
        radius={34}
        centered
        size={"495px"}
        onClose={close}
        withCloseButton={false}
        closeOnClickOutside={false}
        transitionProps={{ duration: 500, timingFunction: "ease" }}>
      <ParentCongratulations/>
    </Modal>
    <SignInWrapper>
      <div className="flex justify-center  rounded-[50px] w-[550px]  py-[30px] bg-white">
        <div className="inner-form-w mx-auto relative">
          <div className="flex justify-center items-center mt-8 mb-12 ">
            <img src={KundaLogo} alt="image" className="w-[160px]" />
          </div>
          <div className="w-[100%]  my-auto ">
            <span></span>
            <h1 className=" font-semibold header2 font-BalooSemiBold text-center">Enter OTP</h1>
            <p className="text3 text-[#A7A7A7]  font-ArimoRegular text-center mb-8 mt-2">
              A code has been sent to your email, enter to verify your account.
            </p>
            <form onSubmit={handleSubmit(()=> open())}>
              <div className="mt-10 flex justify-center items-center gap-4 flex-col">
                <Group position="center">
                  <PinInput
                    value={otp}
                    onChange={handlePinChange}
                    size="5"
                    color="red"
                    radius={10}
                    placeholder=""
                    autoFocus
                  />
                </Group>
                <br />
                {formState.errors.otp && (
                  <p className="text-red-700 text3">
                    PIN must be exactly 4 characters long
                  </p>
                )}
              </div>

              <p className="">
                <Button type="submit" size="full" 
                     backgroundColor="green"
                >
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
    </SignInWrapper>
    
    </>
  );
};

export default ParentVerification;
