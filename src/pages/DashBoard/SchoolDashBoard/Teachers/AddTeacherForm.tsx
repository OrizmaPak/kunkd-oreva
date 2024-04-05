import { useGetClassList } from "@/api/queries";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAddTeacherData } from "@/api/queries";
import { getApiErrorMessage } from "@/api/helper";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";

import { useQueryClient } from "@tanstack/react-query";

import { AiOutlineMail } from "react-icons/ai";
// import { MdClose } from "react-icons/md";
import Addicon from "@/assets/addicon24.png";
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
  close,
  openSchNotifications,
}: {
  close: () => void;
  openSchNotifications: () => void;
}) => {
  const { mutate, isLoading } = useAddTeacherData();
  const queryClient = useQueryClient();

  const { data } = useGetClassList();
  const classList: Tclass[] = data?.data?.data.records;
  const availableClassList = classList?.filter(
    (klass: Tclass) => klass?.teacher_count < 1
  );
  const schema: ZodType<FormData> = z.object({
    firstname: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(40, { message: "First name must not exceed 20 characters" }),
    lastname: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(50, { message: "Last name must not exceed 40 characters" }),
    classid: z.string().optional(),
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("Hello", data);
    mutate(
      {
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,

        redirect_url: `${window.location.origin}/passwordsetup`,
        gender_id: 1,
        // password: data?.password,
        class_id: Number(data?.classid),
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries(["GetTeacherList"]);
          queryClient.invalidateQueries(["GetLicense"]);

          close();
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },

        onError(err) {
          close();
          if (
            getApiErrorMessage(err) ===
            "Please upgrade your license to add more teachers"
          ) {
            openSchNotifications();
          }
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
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
          <div className="flex justify-center items-center">
            <img
              src={Addicon}
              alt="image"
              className="w-[80px] h-[60px] object-contain"
            />
          </div>
          <div className="flex justify-between items-center mb-8">
            <p className="font-Inter text20  text-center flex-grow ">
              Add New Teacher
            </p>
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
              leftIcon={<AiOutlineMail size={20} color="#c4ccd0" />}
            />
          </div>

          <div className="flex gap-2 mb-8">
            <div className="flex-grow">
              <label htmlFor="class">Assign to a class</label>
              <p className="border border-[#F3DAFF] py-3 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
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
            {/* <div className="flex-grow">
              <label htmlFor="class">Select gender</label>
              <p className="border border-[#F3DAFF] py-3 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
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
            </div> */}
          </div>
          <div className=" mx-auto my-4 flex gap-3 ">
            <Button onClick={close} varient="outlined" className="text-black">
              Cancel
            </Button>
            <Button type="submit">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTeacherForm;
