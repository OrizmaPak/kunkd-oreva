import { getApiErrorMessage } from "@/api/helper";
import { useGetClassList, useReAssignTeacher } from "@/api/queries";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { TClassList } from "../Classes/Classes";



const EditAssignedClass = ({ onClose, currentClicked, }: { onClose: () => void , currentClicked:number}) => {
  const { data } = useGetClassList();
  const classList = data?.data.data.records;
  const { mutate, isLoading } = useReAssignTeacher()



    const schema: ZodType<FormData> = z
    .object({
      classid: z
        .string()
        .min(1, { message: "Class Id is invalid" })
        
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log(data)
    console.log("userId--------",currentClicked)

     mutate(
        {
         user_id: currentClicked,
        class_id: Number(data?.classid)
          
        },
        {
          onSuccess(data) {
          onClose()
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
    <div className="px-5 mt-12">
      <div>
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <label htmlFor="assigntoclass">Assign to a class</label>
            <p className="border border-[#F3DAFF] py-3  px-8 rounded-full flex items-center gap-2 mt-2   ">
              <select
               {...register("classid")}
                name="classid"
                 
                id="classid"
                className="w-full  h-full flex-1  focus:outline-none"
              >
                <option value="">Select Class</option>
                {classList
                  ?.filter((data: TClassList) => data.teacher_count === 0)
                  .map((data: TClassList) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
              </select>
             

            </p>
             <span className="text-red-600 mb-10">{errors.classid?.message}</span>
          </div>
          <p className="my-5">
            <Button type="submit"> {isLoading ? (
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

export default EditAssignedClass;
