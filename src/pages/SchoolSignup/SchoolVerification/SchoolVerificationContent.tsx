// import EmailLogo from '@/assets/emaillogo.svg'
import Cancel from "@/assets/Cancel.svg";
import Button from "@/components/Button";
import { PinInput, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const SchoolVerificationContent = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useVerifyOtp();
  const [, setUser] = useStore(getUserState);
  // const [isActive, setIsActive] = useState(false);
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
          setUser({ ...res });
          navigate("/schoolcongratulations");
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

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="inner-form-w mx-auto relative">
        <Link to="/">
          <span className="absolute top-[-200px]">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%]  my-auto ">
          <span></span>
          <h1 className=" font-semibold header2 font-Recoleta">
            Verify account
          </h1>
          <p className="text3 text-[#A7A7A7] font-Hanken">
            A code has been sent to email, enter to verify your account{" "}
          </p>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="mt-8 flex justify-center items-center flex-col">
              <Group position="center">
                <PinInput value={otp} onChange={handlePinChange} />
              </Group>
              <br />
              {formState.errors.otp && (
                <p className="text-red-700 text3">
                  PIN must be exactly 4 characters long
                </p>
              )}
            </div>

            <p className="mt-4">
              <Button type="submit" size="full">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="text2">Verify</span>
                )}
              </Button>
            </p>
          </form>
          <p className="mt-4 text-center text3  ">
            <strong>Resend in {secondsLeft}s</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchoolVerificationContent;
