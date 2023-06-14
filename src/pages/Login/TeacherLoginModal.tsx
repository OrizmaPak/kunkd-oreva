import InputFormat from "@/common/InputFormat";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import Button from "@/components/Button";

const TeacherLoginModal = () => {
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
      <div>
        <h1>Welcome </h1>
        <p>daniel@pampers.school</p>
      </div>

      <div>
        <h1>Create password</h1>
        <p>create a password that you dont't use for other websites</p>
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <label htmlFor="password">Enter New Password</label>
            <InputFormat
              type="password"
              placeholder="password"
              reg={register("password")}
              leftIcon={<img src={PasswordIcon} alt="pasword icon" />}
              rightIcon={<img src={PasswordEye} alt="paswordeye icon" />}
              errorMsg={errors.password?.message}
            />
          </div>

          <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <InputFormat
              type="password"
              placeholder="password"
              reg={register("confirmPassword")}
              leftIcon={<img src={PasswordIcon} alt="pasword icon" />}
              rightIcon={<img src={PasswordEye} alt="paswordeye icon" />}
              errorMsg={errors.password?.message}
            />
          </div>
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </div>
  );
};

export default TeacherLoginModal;
