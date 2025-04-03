// import DeleteIcon from "@/assets/deleteicon.svg";
// import ArrowDown from "@/assets/arrowdown.svg";
import { getApiErrorMessage } from "@/api/helper";
import {
  useEditClassName,
  useGetTeacherList,
  useReAssignTeacher,
} from "@/api/queries";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { formattedDate, handleEventTracking } from "@/api/moengage";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { TTeacherList } from "../Teachers/Teachers";
import { MdClose } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { TClassList } from "./Classes";

const EditClassName = ({
  editClose,
  currentClicked,
  currentClassData,
  currentTeacherData,
}: {
  editClose: () => void;
  currentClicked: number;
  currentClassData: TClassList;
  currentTeacherData: TTeacherList;
}) => {
  const queryClient = useQueryClient();
  const [user] = useStore(getUserState);

  const { mutate, isLoading } = useEditClassName();

  const { data } = useGetTeacherList();
  const teacherList = data?.data.data.records;
  const { mutate: mutateAssignTeacher, isLoading: isLoadingAssignTeacher } =
    useReAssignTeacher();

  const schema: ZodType<FormData> = z.object({
    name: z.string().min(1, { message: "Class Name is invalid" }),
    ageGroup: z.string().min(1, { message: "Age Range is invalid" }),
    teacher_id: z.string().min(1, { message: "Teacher is invalid" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (datta: FormData) => {
    mutate(
      {
        name: datta?.name,
        class_id: currentClicked,
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ["GetClassList"] });
          handleEventTracking("edit_class", {
            school_id: user?.user_id,
            class_name: datta?.name,
            date_updated: formattedDate,
          });
          editClose();
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
    mutateAssignTeacher(
      {
        user_id: Number(datta?.teacher_id),
        class_id: currentClicked,
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ["GetClassList"] });
          queryClient.invalidateQueries({ queryKey: ["GetTeacherList"] });

          editClose();
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
    <div>
      <div className="flex justify-between items-center bg-customGreen py-[12px] px-[20px]">
        <p className=" font-Arimo text-white text-[22px] text-center  ">
          Edit Class
        </p>
        <MdClose onClick={editClose} color="white" size={35} />
      </div>
      <div className="px-8 mt-7">
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            {/* <label htmlFor="assigntoclass"> Edit Class Teachers</label> */}
            {/* <p className="border border-[#F3DAFF] py-3 mb-12 px-8 rounded-full flex items-center gap-2   "> */}
            <label
              htmlFor="className"
              className="text-[#AEB7BF] text-[12px] font-InterReg"
            >
              {" "}
              Class Name
            </label>
            <InputFormat
              reg={register("name")}
              errorMsg={errors?.name?.message}
              type="text"
              value={currentClassData?.name}
              placeholder="Enter class name"
            />
            {/* </p> */}
          </div>
          <div className="mt-4">
            <label
              htmlFor="age"
              className="text-[#AEB7BF] text-[12px] font-InterReg"
            >
              Age Group
            </label>
            <p
              className={`p-3 mb-2 px-8 rounded-full flex items-center gap-2 h-[44px] ${
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
                <option className=" bg:in " value="age-group">
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
          <div className="mt-4">
            <label
              htmlFor="className "
              className="text-[#AEB7BF] text-[12px] font-InterReg"
            >
              {" "}
              Teacher
            </label>

            <p
              className={`p-3 mb-2 px-8 rounded-full flex items-center gap-2 h-[44px] ${
                errors?.teacher_id
                  ? "border-red-700 border-[1px]"
                  : " bg-[#F1F1F1]"
              }`}
            >
              <select
                {...register("teacher_id")}
                name="teacher_id"
                id="classid"
                // value={currentClassData?.}
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
          <p className="my-5 flex  justify-end">
            <Button
              type="submit"
              size="sm"
              backgroundColor="green"
              className="rounded-full"
            >
              {isLoading || isLoadingAssignTeacher ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span className="flex gap-3 items-center">
                  <MdModeEdit color="white" size={20} /> Edit Class
                </span>
              )}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EditClassName;
