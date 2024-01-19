import { getApiErrorMessage } from "@/api/helper";
import { useGetClassList, useReAssignTeacher } from "@/api/queries";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { TClassList } from "../Classes/Classes";
import EditIcon from "@/assets/editicon24.png";

const EditAssignedClass = ({
  onClose,
  currentClicked,
}: {
  onClose: () => void;
  currentClicked: number;
}) => {
  const queryClient = useQueryClient();

  const { data } = useGetClassList();
  const classList = data?.data.data.records;
  const { mutate, isLoading } = useReAssignTeacher();

  const schema: ZodType<FormData> = z.object({
    classid: z.string().min(1, { message: "Class Id is invalid" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log(data);
    console.log("userId--------", currentClicked);

    mutate(
      {
        user_id: currentClicked,
        class_id: Number(data?.classid),
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ["GetClassList"] });
          queryClient.invalidateQueries({ queryKey: ["GetTeacherList"] });

          onClose();
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
    <div className="">
      <div>
        <div className="flex justify-center items-center mb-3">
          <img src={EditIcon} alt="image" className="w-[60px] h-[60px]" />
        </div>
        <form onSubmit={handleSubmit(submitData)}>
          <h1 className="text-[22px] font-semibold text-center  font-Hanken">
            Edit Assigned Class
          </h1>
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
            <span className="text-red-600 mb-10">
              {errors.classid?.message}
            </span>
          </div>
          <p className="my-5 mt-8 flex gap-3">
            <Button onClick={onClose} varient="outlined" className="text-black">
              Cancel
            </Button>
            <Button type="submit">
              {" "}
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

export default EditAssignedClass;
