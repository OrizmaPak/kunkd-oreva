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

const SchoolVerificationContent = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useVerifyOtp();
  const [, setUser] = useStore(getUserState);

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
          navigate("/secureadminportal");
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

  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute">
          <img loading="lazy" src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className=" font-semibold text-[40px] font-Recoleta">
          Verify account
        </h1>
        <p className="text-[14px] text-[#A7A7A7] font-Hanken">
          A code has been sent to mail, enter to verify your account{" "}
        </p>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="mt-8 flex justify-center items-center flex-col">
            <Group position="center">
              <PinInput value={otp} onChange={handlePinChange} />
            </Group>
            <br />
            {formState.errors.otp && (
              <p className="text-red-700">
                PIN must be exactly 4 characters long
              </p>
            )}
          </div>

          <p className="mt-10">
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
        <p className="mt-6 text-center text-[]  ">
          <strong>Resend in 59s</strong>
        </p>
      </div>
    </div>
  );
};

export default SchoolVerificationContent;
