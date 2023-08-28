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
import { useSecurePortal } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { getApiErrorMessage } from "@/api/helper";
// import { getUserState } from "@/store/authStore";
// import useStore from "@/store";

const SecureAdminPortalContent = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useSecurePortal();
  // const [user] = useStore(getUserState);

  const schema: ZodType<Pick<FormData, "pin">> = z.object({
    pin: z
      .string()
      .min(4, { message: " Pin can only be at least 4 characters long" }),
  });

  const { handleSubmit, setValue, watch, trigger, formState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
    });

  const pin = watch("pin");

  const submitData = (data: Pick<FormData, "pin">) => {
    console.log("testing");
    console.log("It is working", data);

    mutate(
      { ...data },
      {
        onSuccess(data) {
          console.log("success", data.data.message);

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          navigate("/schoolcongratulations");
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
    setValue("pin", value);
    trigger("pin");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="inner-form-w mx-auto relative  ">
        <Link to="/">
          <span className="absolute top-[-60px]">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%]  my-auto ">
          <span></span>
          <h1 className="font-bold header2 font-Recoleta">
            Secure admin portal
          </h1>
          <p className="text2 text-[#A7A7A7] font-Hanken">
            create a passcode to secure your admin portal
          </p>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="mt-8 flex justify-center items-center flex-col">
              <Group position="center">
                <PinInput value={pin} onChange={handlePinChange} />
              </Group>
              <br />
              {formState.errors.pin && (
                <p className="text-red-700 text3">
                  PIN must be exactly 4 characters long
                </p>
              )}
            </div>

            <p className="mt-4">
              {/* <Link to="/schoolcongratulations"> */}
              <Button type="submit" size="full">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="text2">Continue</span>
                )}
              </Button>
              {/* </Link> */}
            </p>
          </form>
          <p className="mt-6 text-center text3  ">
            <strong>Resend in 59s</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureAdminPortalContent;
