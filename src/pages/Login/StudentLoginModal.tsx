import InputFormat from "@/common/InputFormat";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import Button from "@/components/Button";

const StudentLoginModal = () => {
  const schema: ZodType<FormData> = z.object({
    fullName: z
      .string()
      .min(4, { message: "full name must be at least 4 characters long" })
      .max(50, { message: "full name must not exceed 50 characters" }),
    schoolCode: z
      .string()
      .min(4, { message: "School code must be at least 4 characters long" })
      .max(50, { message: "School code must not exceed 20 characters" }),
    selectSchool: z
      .string()
      .min(4, { message: "shool must be at least 4 characters long" })
      .max(50, { message: "School must not exceed 20 characters" }),
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
        <h1 className="text-center font-bold font-Recoleta text-[25px]">
          Enter Login Details
        </h1>
        <p className="text-center"> Input your login details</p>
      </div>

      <div>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="my-5">
            <InputFormat
              type="text"
              reg={register("fullName")}
              errorMsg={errors.fullName?.message}
            />
          </div>

          <div className="my-5">
            <InputFormat
              type="text"
              placeholder="Enter school code"
              reg={register("schoolCode")}
              errorMsg={errors.schoolCode?.message}
            />
          </div>

          <div className="my-5">
            <select
              {...register("selectSchool")}
              id=""
              className="py-4 px-8 rounded-full flex items-center gap-2 mt-2  w-[100%] border border-[#F3DAFF]"
            >
              <option value="">Select School</option>
              <option value="SCH_B">SCH_B</option>
              <option value="SCH_C">SCH_C</option>
              <option value="">SCH_D</option>
            </select>
            {errors.selectSchool && <span>{errors.selectSchool.message}</span>}
          </div>
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginModal;
