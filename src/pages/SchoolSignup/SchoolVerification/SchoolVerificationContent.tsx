// import EmailLogo from '@/assets/emaillogo.svg'
// import Cancel from "@/assets/Cancel.svg";
import Button from "@/components/Button";
import { PinInput, Group } from "@mantine/core";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useVerifyOtp } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { getApiErrorMessage } from "@/api/helper";
import { getUserState } from "@/store/authStore";
import useStore from "@/store";
import { TUser } from "@/api/types";
import { useState, useEffect } from "react";
import { handleEventTracking } from "@/api/moengage";
import moengage from "@moengage/web-sdk";
import KundaLogo from "@/assets/KundaLogo.svg";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import SchoolCongratulationsContent from "../SchoolCongratulations/SchoolCongratulationContent";

const SchoolVerificationContent = () => {
  const { isLoading, mutate } = useVerifyOtp();
  const [, setUser] = useStore(getUserState);
  // const [isActive, setIsActive] = useState(false);
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

  const [secondsLeft, setSecondsLeft] = useState(60);
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

  const schema: ZodType<Pick<FormData, "otp">> = z.object({
    otp: z
      .string()
      .min(4, { message: " OTP can only be at least 4 characters long" }),
  });

  const { handleSubmit, setValue, watch, trigger, formState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
    });

  const otp = watch("otp");

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
          moengage.add_unique_user_id(res?.user_id);
          moengage.add_first_name(res?.firstname);
          moengage.add_last_name(res?.lastname);
          moengage.add_email(res?.email);
          moengage.add_mobile(res?.phoneNumber);
          handleEventTracking("web_school_registered", {
            email_address: res?.email,
            user_id: res?.user_id,
            registration_date: formattedDate,
            schoolname: res?.school?.name,
            registration_method: "manual",
            registration_platform: "webapp",
          });
          handleEventTracking("school_otp_verification_status", {
            school_id: res?.user_id,
            verification_status: "true",
          });
          setUser({ ...res });
          open();
          // navigate("/schoolcongratulations");
        },
        onError(err) {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(
              "You have entered a wrong verification code"
            ),
          });
          return err;
        },
      }
    );
  };

  const handlePinChange = (value: string) => {
    setValue("otp", value);
    trigger("pin");
  };
  const [opened, { open, close }] = useDisclosure(false);
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
        <SchoolCongratulationsContent />
      </Modal>
      <div className="flex justify-center  rounded-[50px] w-[550px]  py-[50px] bg-white">
        <div className="inner-form-w mx-auto relative">
          <div className="flex justify-center items-center  mb-7 ">
            <img src={KundaLogo} alt="image" className="w-[200px]" />
          </div>
          <div className="w-[100%]  my-auto mt-12 ">
            <h1 className=" font-semibold header2 font-BalooSemiBold text-center">
              Verify account
            </h1>
            <p className="text3 text-[#A7A7A7]  font-ArimoRegular text-center mb-8 mt-2">
              A code has been sent to email, enter to verify your account{" "}
            </p>
            <form onSubmit={handleSubmit(submitData)}>
              <div className="mt-8 flex justify-center items-center gap-4 flex-col">
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

              <p className="mt-4 flex justify-center items-center">
                <Button
                  type="submit"
                  // onClick={}
                  size="sm"
                  backgroundColor="green"
                  className="px-[50px] rounded-full px-[80px]"
                >
                  {isLoading ? (
                    <p className="flex justify-center items-center">
                      <Loader color="white" size="sm" />
                    </p>
                  ) : (
                    <span className="text2 py-3">Verify</span>
                  )}
                </Button>
              </p>
            </form>
            <p className="mt-4 text-center text3  ">
              <p className="font-ArimoRegular">
                Resend in{" "}
                <span className="text-customGreen">{secondsLeft}s </span>
              </p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolVerificationContent;
