import InputFormat from "@/common/InputFormat";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import Congrat from "@/assets/congrats.svg";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { useSetPassword } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { getApiErrorMessage } from "@/api/helper";
import { STEP_1, STEP_2 } from "@/utils/constants";
import FormWrapper from "@/common/FormWrapper";
import { useState } from "react";

const index = () => {
  const [user, ,] = useStore(getUserState);
  // const navigate = useNavigate();
  const [stage, setStage] = useState(STEP_1);
  const { isLoading, mutate } = useSetPassword();
  const schema: ZodType<FormData> = z
    .object({
      password: z
        .string()
        .min(4, { message: "Password must be at least 4 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),

      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    console.log("It is working", data);
    setStage(STEP_2);
    mutate(
      {
        current_password: localStorage.getItem("userPassword"),
        password: data?.password,
      },
      {
        onSuccess(data) {
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          setStage(STEP_2);
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
    <FormWrapper>
      <div className="flex h-full  justify-center items-center ">
        {stage === STEP_1 && (
          <div className="inner-form-w ">
            <div className="mb-10">
              <h1 className="text-center font-bold text25">Welcome </h1>
              <p className="text-center">{user?.email}</p>
            </div>

            <div className="px-10">
              <h1 className="font-bold text1">Create password</h1>
              <p className="mb-10 text2">
                Create a password that you dont't use for other websites
              </p>
              <form onSubmit={handleSubmit(submitData)}>
                <div className="mb-4">
                  <label htmlFor="password text3">Enter New Password</label>
                  <InputFormat
                    type="password"
                    reg={register("password")}
                    leftIcon={
                      <img
                        loading="lazy"
                        src={PasswordIcon}
                        alt="pasword icon"
                      />
                    }
                    rightIcon={
                      <img
                        loading="lazy"
                        src={PasswordEye}
                        alt="paswordeye icon"
                      />
                    }
                    errorMsg={errors.password?.message}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmpassword text3">
                    Confirm Password
                  </label>
                  <InputFormat
                    type="password"
                    reg={register("confirmPassword")}
                    leftIcon={
                      <img
                        loading="lazy"
                        src={PasswordIcon}
                        alt="pasword icon"
                      />
                    }
                    rightIcon={
                      <img
                        loading="lazy"
                        src={PasswordEye}
                        alt="paswordeye icon"
                      />
                    }
                    errorMsg={errors.confirmPassword?.message}
                  />
                </div>
                <div className="my-10">
                  <Button type="submit">
                    {" "}
                    {isLoading ? (
                      <p className="flex justify-center items-center">
                        <Loader color="white" size="sm" />
                      </p>
                    ) : (
                      <span>Continue </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {stage === STEP_2 && <CongratulationsModal />}
      </div>
    </FormWrapper>
  );
};

export default index;

export const CongratulationsModal = () => {
  const navigate = useNavigate();
  return (
    <div className="px-14">
      <div className="flex justify-center items-center my-14">
        <img loading="lazy" src={Congrat} alt="congrate" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-center font-bold font-Recoleta text-[40px]">
          Congratulations
        </h1>
        <p className="mb-10">Your profile has be updated</p>
        <Button onClick={() => navigate("/login")}>Go back to Login</Button>
      </div>
    </div>
  );
};
