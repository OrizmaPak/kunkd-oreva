import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
// import PasswordIcon from "@/assets/passwordIcon.svg";
// import PasswordEye from "@/assets/passwordeye.svg";
import { motion } from "framer-motion";
import { AiOutlineEye } from "react-icons/ai";
import { RiLockLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
// import { useNavigate } from "react-router-dom";
// import useStore from "@/store";
import { useGetClassList } from "@/api/queries";
// import { getPushTokenState } from "@/store/pushTokenStore";
// import { Loader } from "@mantine/core";
// import { notifications } from "@mantine/notifications";
// import { getApiErrorMessage } from "@/api/helper";
import { AiOutlineMail } from "react-icons/ai";

export type Tclass = {
  id: number;
  name: string;
  slug: string;
  student_count: number;
  teacher_count: number;
};

export type TTeacherData = {
  firstname: string;
  lastname: string;
  genderid: string;
  email: string;
  password: string;
  confirmPassword: string;
  classid: string;
};

const AddTeacherForm = ({
  handleContinue,
  setTeacherData,
}: {
  handleContinue: () => void;
  setTeacherData: (val: TTeacherData) => void;
}) => {
  const { data } = useGetClassList();
  const classList = data?.data?.data.records;
  // console.log("Class list", classList);
  const schema: ZodType<FormData> = z
    .object({
      firstname: z
        .string()
        .min(4, { message: "First name must be at least 4 characters long" })
        .max(40, { message: "First name must not exceed 20 characters" }),
      lastname: z
        .string()
        .min(4, { message: "Last name must be at least 4 characters long" })
        .max(50, { message: "Last name must not exceed 40 characters" }),
      genderid: z
        .string()
        .min(1, { message: "Select gender" })
        .max(20, { message: "Gender must not exceed 20 characters" }),
      classid: z
        .string()
        .min(1, { message: "Select a class" })
        .max(20, { message: "Class must not exceed 20 characters" }),
      email: z.string().email(),
      password: z
        .string()
        .min(4, { message: "Password must be at least 4 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),
      confirmPassword: z
        .string()
        .min(4, { message: "Password must be at least 4 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),
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

  const submitData = async (data: FormData) => {
    setTeacherData(data as TTeacherData);
    handleContinue();
    console.log("TeacherDta", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="p-4 px-8">
        <div>
          <h1 className="font-bold  font-Recoleta text-center mb-8">
            Add New Teacher
          </h1>
        </div>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex gap-2 mb-8">
            <div className="flex-grow">
              <label htmlFor="firstname">Enter first Name</label>
              <InputFormat
                reg={register("firstname")}
                errorMsg={errors?.firstname?.message}
                placeholder="First name"
                type="text"
              />
            </div>
            <div className="flex-grow">
              <label htmlFor="lastname">Enter Last name</label>
              <InputFormat
                reg={register("lastname")}
                errorMsg={errors?.lastname?.message}
                placeholder="Last name"
                type="text"
              />
            </div>
          </div>
          <div className="mb-8">
            <label htmlFor="email">Enter Email Address</label>
            <InputFormat
              reg={register("email")}
              errorMsg={errors.email?.message}
              type="email"
              placeholder="Email"
              leftIcon={<AiOutlineMail size={25} color="#c4ccd0" />}
            />
          </div>
          <div className="flex gap-2 mb-2">
            <div className=" flex-grow">
              <label htmlFor="password">Enter Password</label>
              <InputFormat
                reg={register("password")}
                errorMsg={errors.password?.message}
                type="password"
                placeholder="password"
                leftIcon={
                  // <img loading="lazy" src={PasswordIcon} alt="pasword icon" />
                  <RiLockLine size={25} color="#c4ccd0" />
                }
                rightIcon={
                  // <img loading="lazy" src={PasswordEye} alt="paswordeye icon" />

                  <AiOutlineEye size={25} color="#c4ccd0" />
                }
              />
            </div>
            <div className="flex-grow">
              <label htmlFor="password">Confirm Password</label>
              <InputFormat
                reg={register("confirmPassword")}
                errorMsg={errors.confirmPassword?.message}
                type="password"
                placeholder="confirm password"
                leftIcon={
                  // <img loading="lazy" src={PasswordIcon} alt="pasword icon" />
                  <RiLockLine size={25} color="#c4ccd0" />
                }
                rightIcon={
                  // <img loading="lazy" src={PasswordEye} alt="paswordeye icon" />
                  <AiOutlineEye size={25} color="#c4ccd0" />
                }
              />
            </div>
          </div>

          <div className="flex gap-2 mb-8">
            <div className="flex-grow">
              <label htmlFor="class">Assign to a class</label>
              <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
                <select
                  {...register("classid")}
                  name="classid"
                  id="classid"
                  placeholder="Select class"
                  className="w-full  h-full flex-1  focus:outline-none"
                >
                  <option value="">Select Class</option>
                  {/* <div> */}
                  {classList?.map((classs: Tclass, index: number) => (
                    <option key={index} value={classs.id}>
                      {classs.name}
                    </option>
                  ))}
                  {/* </div> */}
                  {/* <option value="1">Class Green</option>
                  <option value="2">Class Red</option>
                  <option value="3">Class Purple</option> */}
                </select>
              </p>
              <span className="text-red-600">{errors.classid?.message}</span>
            </div>
            <div className="flex-grow">
              <label htmlFor="class">Select gender</label>
              <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
                <select
                  {...register("genderid")}
                  name="genderid"
                  id="genderid"
                  placeholder="Select gender"
                  className="w-full  h-full flex-1  focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </p>
              <span className="text-red-600">{errors.genderid?.message}</span>
            </div>
          </div>
          <div className="max-w-[60%] mx-auto my-4">
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTeacherForm;
