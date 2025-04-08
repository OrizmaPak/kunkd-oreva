import { PinInput, Group } from "@mantine/core";
import Button from "@/components/Button";
import useStore from "@/store";
import { getForgotPasswordOtp } from "@/store/forgotPasswordOtp";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { FormData } from "@/common/User/FormValidation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import KundaLogo from "@/assets/KundaLogo.svg";

const ResetPasswordContent = () => {
  const [forgotPasswordOtp, setFprgotPasswordOtp] =
    useStore(getForgotPasswordOtp);
  console.log(forgotPasswordOtp);
  const navigate = useNavigate();
  // const [pinValue, setPinValue] = useState("");

  const schema: ZodType<Pick<FormData, "otp">> = z.object({
    otp: z
      .string()
      .min(4, { message: " OTP can only be at least 4 characters long" }),
  });

  const { handleSubmit, setValue, trigger, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const otp = watch("otp");
  const submitData = (data: Pick<FormData, "otp">) => {
    setFprgotPasswordOtp(data?.otp);

    navigate("/newpassword");
  };

  const handlePinChange = (value: string) => {
    setValue("otp", value);
    trigger("pin");
  };

  return (
    <div className="flex justify-center   py-[30px] bg-white rounded-[50px] min-w-[550px]">
      <div className="inner-form-w ">
        <div className="flex justify-center items-center mt-8 mb-12">
          <img src={KundaLogo} alt="image" className="w-[160px]" />
        </div>
        <div className=" tracking-wide  my-auto ">
          <span></span>
          <h1 className="font-bold text-[36px]  font-BalooSemiBold  text-center tracking-wide leading-none">
            Reset password
          </h1>
          <p className="text-[14px] text-[#A7A7A7]  font-Arimo text-center leading-none">
            Enter the reset code that was sent to your email.
          </p>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="mt-10 text-black flex justify-center items-center w-full">
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
            </div>

            <p className="mt-10">
              {/* <Link to="/newpassword"> */}
              <Button
                type="submit"
                size="full"
                backgroundColor="green"
                className="rounded-full w-full"
              >
                Reset
              </Button>
              {/* </Link> */}
            </p>
          </form>
          <p className="mt-2 text-center text-[] text-gray-400 ">
            Resend in 59s
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordContent;
