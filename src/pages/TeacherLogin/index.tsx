import { getApiErrorMessage } from "@/api/helper";
import { useTeacherSetPassword } from "@/api/queries";
import Congrat from "@/assets/congrats.svg";
import GroupIcon from "@/assets/groupIcons.svg";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { STEP_1, STEP_2 } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import queryString from "query-string";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";

const TeacherLogin = () => {
  const currentUrl = window.location.href;
  const parsed = queryString.parseUrl(currentUrl);
  const [stage, setStage] = useState(STEP_1);
  const { isLoading, mutate } = useTeacherSetPassword();
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
    mutate(
      {
        password: data?.password,
        email: parsed?.query?.email as string,
      },
      {
        onSuccess() {
          notifications.show({
            title: `Notification`,
            message: "Your profile has been created",
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
    // <FormWrapper>
    <div
      style={{
        backgroundImage: `url(${GroupIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className="relative h-screen w-full flex justify-center items-center  "
    >
      <div className="flex h-full  justify-center items-center ">
        {stage === STEP_1 && (
          <div className=" bg-red-[600] ">
            <div className="mb-10">
              <h1 className="text-center font-bold text25">Welcome </h1>
              <p className="text-center">{parsed?.query?.email as string} </p>
            </div>

            <div className="px-10">
              <h1 className="font-bold text1">Create password</h1>
              <p className="mb-10 text2">Create a unique password</p>
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
    </div>

    // </FormWrapper>
  );
};

export default TeacherLogin;

export const CongratulationsModal = () => {
  const navigate = useNavigate();
  return (
    <div className="px-14">
      <div className="flex justify-center items-center mb-8">
        <img loading="lazy" src={Congrat} alt="congrate" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-center font-bold font-Recoleta text-[40px]">
          Congratulations
        </h1>
        <p className="mb-10">Your profile has been updated</p>
        <Button onClick={() => navigate("/login")}>Go back to Login</Button>
      </div>
    </div>
  );
};
