import { getApiErrorMessage } from "@/api/helper";
import { useTeacherSetPassword } from "@/api/queries";
import Congrat from "@/assets/congrats.svg";
import GroupIcon from "@/assets/groupIcons.svg";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import InputFormat from "@/common/InputFormat";
import SignInWrapper from "@/common/SignInWrapper";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { STEP_1, STEP_2 } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import queryString from "query-string";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import KundaLogo from "@/assets/KundaLogo.svg";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

import CongratIcon from "@/assets/congratIcon.png";

const TeacherLogin = () => {
      const [opened, { open, close }] = useDisclosure(false);

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
          open()
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
<>
      <Modal 
         opened={opened}
            radius={34}
            centered
            size={"495px"}
            onClose={close}
            withCloseButton={false}
            closeOnClickOutside={false}
            transitionProps={{ duration: 500, timingFunction: "ease" }}>
               <CongratulationsModal />
            </Modal>
    <SignInWrapper>
    <div
    
      className="flex justify-center  rounded-[50px] w-[550px]  py-[30px] bg-white "
    >
      
      <div className="inner-form-w mx-auto relative">
          <div className="flex justify-center items-center mt-8 mb-12 ">
            <img src={KundaLogo} alt="image" className="w-[160px]" />
          </div>
      
          <div className=" bg-red-[600] ">
            <div className="mb-2">
              <h1 className="font-bold fon header2 font-BalooSemiBold text-center">Welcome </h1>
              {/* <p className="text-center">{parsed?.query?.email as string} </p> */}
              <p className="text2 text-[#A7A7A7]   font-ArimoRegular text-center mb-8">Create a password for your Teacher account</p>
            </div>

            <div className="">
              <form onSubmit={handleSubmit(submitData)}>
                <div className="mb-4">
                  <InputFormat
                    type="password"
                    placeholder="Create New Password"
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
                
                  <InputFormat
                    type="password"
                    placeholder="Confirm Password"
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
                  <Button type="submit" backgroundColor="green">
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
   

        
      </div>
    </div>


    </SignInWrapper>
</>

    // </FormWrapper>
  );
};

export default TeacherLogin;

export const CongratulationsModal = () => {
  const navigate = useNavigate();
  return (
       <div className="w-full h-full flex justify-center items-center py-4">
        <div className="inner-form-w2 mx-auto relative">
          <div className="w-[100%]  my-auto ">
            <div>
              <div className=" flex justify-center items-center">
              <img src={CongratIcon} alt="" className="" />
            </div>
            <div className=" mt-4 mb-2">
              <h1 className="  font-semibold header2 font-BalooSemiBold my-4 text-center">
                Congratulations
              </h1>
              <p className="text2 text-[#A7A7A7] text-center mb-4 font-Hanken">
              Your profile has been updated
              </p>
            </div>
         
                <Button onClick={() => navigate("/login")}
                  size="full"
                  className="text2 px-[50px]  rounded-full"
                  backgroundColor="green"
                >
                  Continue
                </Button>
              
            </div>
          </div>
        </div>
      </div>
  );
};


