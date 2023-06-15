import InputFormat from "@/common/InputFormat";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import Congrat from "@/assets/congrats.svg";

const TeacherLoginModal = ({ onContinue }: { onContinue: () => void }) => {
  const navigate = useNavigate();
  const schema: ZodType<FormData> = z
    .object({
      password: z
        .string()
        .min(4, { message: "Password must be at least 4 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),

      confirmPassword: z.string(),
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

  console.log("--- errors", errors);
  const submitData = (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-center font-bold text-[25px]">Welcome </h1>
        <p className="text-center">daniel@pampers.school</p>
      </div>

      <div className="px-10">
        <h1 className="font-bold text-[20px]">Create password</h1>
        <p className="mb-10">
          create a password that you dont't use for other websites
        </p>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="mb-10">
            <label htmlFor="password">Enter New Password</label>
            <InputFormat
              type="password"
              reg={register("password")}
              leftIcon={<img src={PasswordIcon} alt="pasword icon" />}
              rightIcon={<img src={PasswordEye} alt="paswordeye icon" />}
              errorMsg={errors.password?.message}
            />
          </div>

          <div className="mb-10">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <InputFormat
              type="password"
              reg={register("confirmPassword")}
              leftIcon={<img src={PasswordIcon} alt="pasword icon" />}
              rightIcon={<img src={PasswordEye} alt="paswordeye icon" />}
              errorMsg={errors.password?.message}
            />
          </div>
          <div className="mb-10">
            <Button onClick={onContinue} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherLoginModal;

export const CongratulationsModal = () => {
  const navigate = useNavigate();
  return (
    <div className="px-14">
      <div className="flex justify-center items-center my-14">
        <img src={Congrat} alt="congrate" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-center font-bold font-Recoleta text-[40px]">
          Congratulations
        </h1>
        <p className="mb-10">Your profile has be updated</p>
        <Button onClick={() => navigate("/paiduser")}>Continue</Button>
      </div>
    </div>
  );
};
