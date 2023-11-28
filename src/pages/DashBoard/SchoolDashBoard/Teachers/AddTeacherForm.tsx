import { useGetClassList } from "@/api/queries";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { z, ZodType } from "zod";



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
  toggle,
}: {
  handleContinue: () => void;
  setTeacherData: (val: TTeacherData) => void;
  toggle: () => void;
}) => {
  const { data } = useGetClassList();
  const classList: Tclass[] = data?.data?.data.records;
  const availableClassList = classList?.filter(
    (klass: Tclass) => klass?.teacher_count < 1
  );
  const schema: ZodType<FormData> = z
    .object({
      firstname: z
        .string()
        .min(2, { message: "First name must be at least 2 characters long" })
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
        .string().optional(),
      email: z.string().email(),
    
    })
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log(data)
    setTeacherData(data as TTeacherData);
    handleContinue();
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
          <div className="flex justify-between items-center mb-8">
            <p className="font-bold text30  font-Recoleta text-center flex-grow ">
              Add New Teacher
            </p>
            <MdClose size={35} onClick={toggle} className="cursor-pointer" />
          </div>
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
          {/* <div className="flex gap-2 mb-2">
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
          </div> */}

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
                  {availableClassList?.map((classs: Tclass, index: number) => (
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
