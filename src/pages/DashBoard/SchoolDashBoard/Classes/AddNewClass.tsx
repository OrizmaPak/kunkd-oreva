import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
// import { useNavigate } from "react-router-dom";
// import useStore from "@/store";
import { useAddClassData, useGetTeacherList } from "@/api/queries";
// import { getPushTokenState } from "@/store/pushTokenStore";
import { getApiErrorMessage } from "@/api/helper";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import Addicon from "@/assets/addicon24.png";
import { formattedDate, handleEventTracking } from "@/api/moengage";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { TTeacherList } from "../Teachers/Teachers";

const AddNewClass = ({
  newClassClose,
  openSchNotifications,
}: {
  newClassClose: () => void;
  openSchNotifications: () => void;
}) => {
  const [user] = useStore(getUserState);
  const queryClient = useQueryClient();
  const { data } = useGetTeacherList();
  const teacherList = data?.data.data.records;
  const { mutate, isLoading } = useAddClassData();
  const schema: ZodType<FormData> = z.object({
    name: z
      .string()
      .min(2, { message: "Class name must be at least 2 characters long" })
      .max(40, { message: "Class name must not exceed 20 characters" }),
    teacher_id: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (datta: FormData) => {
    mutate(
      { name: datta.name, teacher_id: Number(datta.teacher_id) },
      {
        onSuccess(data) {
          handleEventTracking("add_class", {
            class_name: datta.name,
            school_id: user?.user_id,
            date_created: formattedDate,
          });
          newClassClose();
          queryClient.invalidateQueries(["GetClassList"]);
          queryClient.invalidateQueries(["GetLicense"]);
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },

        onError(err) {
          newClassClose();
          openSchNotifications();
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center bg-customGreen py-[12px] px-[20px]">
        <p className="font-Arimo text-white text-[22px] text-center">
          Add new class
        </p>
      </div>
      <div className="px-[24px] py-[32px]">
        <form onSubmit={handleSubmit(submitData)}>
          <p className="">
            <InputFormat
              reg={register("name")}
              errorMsg={errors?.name?.message}
              type="text"
              placeholder="Enter class name"
            />
          </p>

          <div className="mt-5">
            <p
              className={`p-3  px-8 rounded-full flex items-center gap-2 h-[44px] ${
                errors?.ageGroup
                  ? "border-red-700 border-[1px]"
                  : " bg-[#F1F1F1]"
              }`}
            >
              <select
                {...register("ageGroup")}
                name="age-group"
                id="age-group"
                className="w-full  h-full focus-within:outline-none bg-inherit"
              >
                <option className=" bg:in " value="">
                  Select Age Group
                </option>
                <option value="2-4">2-4</option>
                <option value="5-7">5-7</option>
                <option value="8-10">8-10</option>
              </select>
            </p>
            <span className="text-red-600 mb-10 ">
              {errors?.ageGroup?.message}
            </span>
          </div>

          <div className="mt-5">
            <p
              className={`p-3 mb-8 px-8 rounded-full flex items-center gap-2 h-[44px] ${
                errors?.teacher_id
                  ? "border-red-700 border-[1px]"
                  : " bg-[#F1F1F1]"
              }`}
            >
              <select
                {...register("teacher_id")}
                name="teacher_id"
                id="classid"
                className="w-full  h-full flex-1  focus:outline-none bg-inherit"
              >
                <option value="">Select Teacher</option>
                {teacherList
                  ?.filter(
                    (data: TTeacherList) => data?.user?.class_name === ""
                  )
                  .map((data: TTeacherList) => (
                    <option value={data?.user?.id}>
                      {data?.user.firstname} {data?.user?.lastname}
                    </option>
                  ))}
                {/* <option value="classA">Class A</option>
                            <option value="classB">Class B</option> */}
              </select>
            </p>
            <span className="text-red-600 mb-10">
              {errors.teacher_id?.message}
            </span>
          </div>

          {/* <p className="my-5 mb-8">
            <label htmlFor="assignteacher">Assign teacher</label>
            <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                {...register("teacher_id")}
                name="teacher_id"
                id="teacher_id"
                className="w-full h-full flex-1  focus:outline-none"
              >
                <option value="">Select teacher</option>
                <option value="1">Teacher one</option>
                <option value="2">Teacher two</option>
                <option value="3">Teacher three</option>
              </select>
            </p>
          </p> */}
          <p className="mt-6 flex gap-5 justify-center">
            <Button
              onClick={newClassClose}
              className="text-black bg-[#F5F7F8] px-[35px] rounded-full"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              backgroundColor="green"
              className="px-[35px] rounded-full"
            >
              {" "}
              {isLoading ? (
                <p className="flex justify-center items-center ">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Create Class</span>
              )}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddNewClass;

<p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
  <select
    name=""
    id=""
    // placeholder="Select gender"
    className="w-full  h-full flex-1  focus:outline-none"
  ></select>
</p>;
