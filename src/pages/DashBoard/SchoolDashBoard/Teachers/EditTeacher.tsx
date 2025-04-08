import { useGetClassList, useReAssignTeacher } from "@/api/queries";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
// import { useAddTeacherData } from "@/api/queries";
import { getApiErrorMessage } from "@/api/helper";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
// import { getUserState } from "@/store/authStore";
// import useStore from "@/store/index";

import { useQueryClient } from "@tanstack/react-query";

import { AiOutlineMail } from "react-icons/ai";
// import { MdClose } from "react-icons/md";
import { z, ZodType } from "zod";
// import { formattedDate, handleEventTracking } from "@/api/moengage";
import { TTeacherList } from "./Teachers";

export type Tclass = {
  id: number;
  name: string;
  slug: string;
  student_count: number;
  teacher_count: number;
};

const EditTeacher = ({
  close,
  currentData,
}: {
  close: () => void;
  currentData: TTeacherList;
}) => {
  console.log("currentTeacherdata", currentData);
  // const { mutate, isLoading } = useAddTeacherData();
  const queryClient = useQueryClient();
  // const [user] = useStore(getUserState);
  const { data } = useGetClassList();
  const classList: Tclass[] = data?.data?.data.records;

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
  const { mutate: mutateAssignTeacher, isLoading: isLoadingAssignTeacher } =
    useReAssignTeacher();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (datta: FormData) => {
    // mutate(
    //   {
    //     firstname: datta?.firstname,
    //     lastname: datta?.lastname,
    //     email: datta?.email,

    //     redirect_url: `${window.location.origin}/passwordsetup`,
    //     gender_id: 1,
    //     // password: data?.password,
    //     class_id: Number(datta?.classid),
    //   },
    //   {
    //     onSuccess(data) {
    //       handleEventTracking("teacher_otp_verification_status", {
    //         teacher_name: datta.firstname + " " + datta.lastname,
    //         verification_status: "true",
    //       });
    //       queryClient.invalidateQueries(["GetTeacherList"]);
    //       queryClient.invalidateQueries(["GetLicense"]);
    //       handleEventTracking("add_teacher", {
    //         school_id: user?.user_id,
    //         teacher_name: datta.firstname + " " + datta.lastname,
    //         date_added: formattedDate,
    //       });

    //       close();
    //       notifications.show({
    //         title: `Notification`,
    //         message: data.data.message,
    //       });
    //     },

    //     onError(err) {
    //       close();
    //       notifications.show({
    //         title: `Notification`,
    //         message: getApiErrorMessage(err),
    //       });
    //     },
    //   }
    // );

    mutateAssignTeacher(
      {
        user_id: currentData?.user?.id,
        class_id: Number(datta?.classid),
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ["GetClassList"] });
          queryClient.invalidateQueries({ queryKey: ["GetTeacherList"] });
          close();
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center mb-8 bg-customGreen px-6 py-4 ">
          <p className=" font-InterReg text20   flex-grow text-white ">
            Edit Teacher
          </p>
        </div>

        <form onSubmit={handleSubmit(submitData)} className="px-[24px]">
          <div className="mb-5">
            <InputFormat
              reg={register("firstname")}
              errorMsg={errors?.firstname?.message}
              placeholder="First name"
              type="text"
              value={currentData?.user.firstname}
            />
          </div>
          <div className="mb-5">
            <InputFormat
              reg={register("lastname")}
              errorMsg={errors?.lastname?.message}
              placeholder="Last name"
              type="text"
              value={currentData?.user.lastname}
            />
          </div>

          <div className="mb-5">
            <InputFormat
              reg={register("email")}
              errorMsg={errors.email?.message}
              type="email"
              placeholder="Email"
              leftIcon={<AiOutlineMail size={20} color="#c4ccd0" />}
              value={currentData?.user.email}
            />
          </div>

          <div className="flex gap-2 mb-5">
            <div className="flex-grow">
              <p className="bg-[#F1F1F1] py-3 px-8 rounded-full flex items-center gap-2   mb-2 ">
                <select
                  {...register("classid")}
                  name="classid"
                  id="classid"
                  defaultValue={currentData?.user?.class_id} // Set default value to currentData's class_id
                  className="w-full h-full flex-1 focus:outline-none bg-inherit"
                >
                  <option value="">Select Class</option>
                  {classList?.map((classs: Tclass, index: number) => (
                    <option key={index} value={classs.id}>
                      {classs.name}
                    </option>
                  ))}
                </select>
              </p>
              <span className="text-red-600">{errors.classid?.message}</span>
            </div>
          </div>
          <div className=" mx-auto my-4 flex gap-3 justify-center ">
            <Button
              size="sm"
              onClick={close}
              className="text-black bg-[#F1F1F1] rounded-full px-[40px]  "
            >
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              backgroundColor="green"
              className="text-white rounded-full px-[40px] "
            >
              {isLoadingAssignTeacher ? (
                <p className="flex justify-center items-center ">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Edit Teacher</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditTeacher;
