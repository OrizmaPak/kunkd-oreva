import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useUpdatePassword } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { getApiErrorMessage } from "@/api/helper";
import { AiOutlineEye } from "react-icons/ai";
import { RiLockLine } from "react-icons/ri";

const SettingPassword = () => {
  const { isLoading, mutate } = useUpdatePassword();

  const schema: ZodType<FormData> = z.object({
    current_password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" }),
    new_password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);
    reset();
    mutate(
      { ...data },
      {
        onSuccess(data) {
          console.log("success", data.data.message);

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          //  navigate("/packages");
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
      <div className="px-4">
        <h1 className="text25 font-bold py-8">Password</h1>

        <form onSubmit={handleSubmit(submitData)}>
          <div className="grid grid-cols-[150px_1fr_1fr] gap-8 my-6 items-center">
            <p className="flex flex-col">
              <span className="text3">Old Password</span>
            </p>

            <span>
              <hr className="mr-16" />
            </span>
            <span>
              <InputFormat
                reg={register("current_password")}
                errorMsg={errors.current_password?.message}
                type="password"
                placeholder="xxxxxxxx"
                leftIcon={<RiLockLine size={20} color="#c4ccd0" />}
                rightIcon={<AiOutlineEye size={22} color="#c4ccd0" />}
              />
            </span>
          </div>
          <div className="grid grid-cols-[150px_1fr_1fr] gap-8 my-6 items-center">
            <p className="flex flex-col">
              <span className="text3">New Password</span>
            </p>
            <span>
              <hr className="mr-16" />
            </span>
            <span>
              <InputFormat
                reg={register("new_password")}
                errorMsg={errors.new_password?.message}
                type="password"
                placeholder="xxxxxxxx"
                leftIcon={<RiLockLine size={20} color="#c4ccd0" />}
                rightIcon={<AiOutlineEye size={22} color="#c4ccd0" />}
              />
              <span className="text-gray-400 mt-6 text3 ml-4">
                Minimum 4 characters
              </span>
            </span>
          </div>

          <p className="flex justify-center items-center pt-14  px-48">
            <Button type="submit">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Change</span>
              )}
            </Button>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default SettingPassword;
