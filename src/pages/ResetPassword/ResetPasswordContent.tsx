import Cancel from "@/assets/Cancel.svg";
import { PinInput, Group } from "@mantine/core";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import useStore from "@/store";
import { getForgotPasswordOtp } from "@/store/forgotPasswordOtp";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { FormData } from "@/common/User/FormValidation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const ResetPasswordContent = ({}: { onSubmit?: () => void }) => {
  const [forgotPasswordOtp, setFprgotPasswordOtp] =
    useStore(getForgotPasswordOtp);
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
    <div className="flex justify-center items-center w-full h-full">
      <div className="inner-form-w relative  my-auto flex justify-end items-center ">
        <Link to="/">
          <span className="absolute top-[-60px]">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[90%] tracking-wide  my-auto ">
          <span></span>
          <h1 className="font-bold text-[40px] font-Recoleta tracking-wide">
            Reset password
          </h1>
          <p className="text-[15px] text-[#A7A7A7] font-Hanken tracking-wide">
            Enter the reset code that was sent to your email.
          </p>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="mt-8 text-black flex justify-center items-center">
              <Group position="center">
                <PinInput value={otp} onChange={handlePinChange} />
              </Group>
            </div>

            <p className="mt-10">
              {/* <Link to="/newpassword"> */}
              <Button type="submit" size="full">
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
