// import DeleteIcon from "@/assets/deleteicon.svg";
// import ArrowDown from "@/assets/arrowdown.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useGetTeacherList, useReAssignTeacher } from "@/api/queries";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import EditIcon from "@/assets/editicon24.png";

import { TTeacherList } from "../Teachers/Teachers";

const EditClassTeachers = ({
  editClose,
  currentClicked,
}: {
  editClose: () => void;
  currentClicked: number;
}) => {
  const queryClient = useQueryClient();

  const { data } = useGetTeacherList();
  const teacherList = data?.data.data.records;
  const { mutate, isLoading } = useReAssignTeacher();

  const schema: ZodType<FormData> = z.object({
    teacher_id: z.string().min(1, { message: "Class Id is invalid" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    mutate(
      {
        user_id: Number(data?.teacher_id),
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
    <div className="px-10">
      <div>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex justify-center items-center">
            <img src={EditIcon} alt="image" className="w-[60px] h-[60px]" />
          </div>
          <h1 className="text-[24px] font-semibold text-center w-full">
            Edit Class Teachers
          </h1>
          <div>
            {/* <label htmlFor="assigntoclass"> Edit Class Teachers</label> */}
            <p className="border border-[#F3DAFF] py-3 mb-12 px-8 rounded-full flex items-center gap-2   ">
              <select
                {...register("teacher_id")}
                name="teacher_id"
                id="classid"
                className="w-full  h-full flex-1  focus:outline-none"
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
          <p className="my-5 flex gap-3">
            <Button
              onClick={editClose}
              varient="outlined"
              className="text-black"
            >
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
          </p>
        </form>
      </div>
    </div>
  );
};

export default EditClassTeachers;
