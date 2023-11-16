// import DeleteIcon from "@/assets/deleteicon.svg";
// import ArrowDown from "@/assets/arrowdown.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useGetTeacherList, useReAssignTeacher } from "@/api/queries";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

import { TTeacherList } from "../Teachers/Teachers";


const EditClassTeachers = ({ editClose,currentClicked, }: { editClose: () => void, currentClicked:number }) => {
  const { data } = useGetTeacherList();
  const teacherList = data?.data.data.records;
  console.log("HI", teacherList );
  const { mutate, isLoading } = useReAssignTeacher()

     const schema: ZodType<FormData> = z
    .object({
      teacher_id: z
        .string()
        .min(1, { message: "Class Id is invalid" })
        
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("Fine God ",data)

     mutate(
        {
         user_id: Number(data?.teacher_id),
        class_id: currentClicked,
          
        },
        {
          onSuccess(data) {
          editClose()
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
                  ?.filter((data: TTeacherList) => data.class?.class_name === "" && data.status.name == "active" )
                  .map((data: TTeacherList) => (
                    <option value={data?.user?.id}>{data?.user.firstname } {data?.user?.lastname}</option>
                  ))}
                {/* <option value="classA">Class A</option>
                <option value="classB">Class B</option> */}
              </select>
            </p>
             <span className="text-red-600 mb-10">{errors.teacher_id?.message}</span>
          </div>
          <p className="my-5">
            <Button type="submit">{isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Assign</span>
              )}</Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EditClassTeachers;
