import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
// import { useNavigate } from "react-router-dom";
// import useStore from "@/store";
import { useAddClassData } from "@/api/queries";
// import { getPushTokenState } from "@/store/pushTokenStore";
import { getApiErrorMessage } from "@/api/helper";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

const AddNewClass = ({ newClassClose }: { newClassClose: () => void }) => {
  const queryClient = useQueryClient();
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

  const submitData = async (data: FormData) => {
    // setTeacherData(data as TTeacherData);
    // handleContinue();
    console.log("class", data);

    mutate(
      { name: data.name, teacher_id: Number(data.teacher_id) },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          newClassClose();
          queryClient.invalidateQueries(["GetClassList"]);

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
      <h1 className="text-center font-Recoleta text3">Add new class</h1>
      <div>
        <form onSubmit={handleSubmit(submitData)}>
          <p className="my-5  mb-8">
            <label htmlFor="classname">Class name</label>
            <InputFormat
              reg={register("name")}
              errorMsg={errors?.name?.message}
              type="text"
              placeholder="Enter classs name"
            />
          </p>
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
          <p className="my-5">
            <Button type="submit">
              {" "}
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Done</span>
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
    placeholder="Select gender"
    className="w-full  h-full flex-1  focus:outline-none"
  ></select>
</p>;
