// import DeleteIcon from "@/assets/deleteicon.svg";
// import ArrowDown from "@/assets/arrowdown.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useEditClassName } from "@/api/queries";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";




const EditClassName = ({ editClose,currentClicked, }: { editClose: () => void, currentClicked:number }) => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useEditClassName()

     const schema: ZodType<FormData> = z
    .object({
    name: z
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
         name: data?.name,
        class_id: currentClicked,
          
        },
        {
          onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ['GetClassList']});

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
            {/* <p className="border border-[#F3DAFF] py-3 mb-12 px-8 rounded-full flex items-center gap-2   "> */}
               <InputFormat
              reg={register("name")}
              errorMsg={errors?.name?.message}
              type="text"
              placeholder="Enter classs name"
            />
            {/* </p> */}
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

export default EditClassName;
