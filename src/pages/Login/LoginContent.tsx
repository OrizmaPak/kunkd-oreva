import Button from "@/components/Button";
import InputFormat from "../../common/InputFormat";
// import PasswordIcon from "@/assets/passwordIcon.svg";
// import PasswordEye from "@/assets/passwordeye.svg";
import Cancel from "@/assets/Cancel.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { userContext } from "@/Context/StateProvider";
import { googleSignIn, facebookSignIn } from "@/auth/sdk";
import { useLogin, useSocialLogin } from "@/api/queries";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { TUser } from "@/api/types";
import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { AiFillFacebook, AiOutlineMail } from "react-icons/ai";
// import { IconName } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useState } from "react";
import TeacherLoginModal from "./TeacherLoginModal";
import { CongratulationsModal } from "./TeacherLoginModal";
import { STEP_1, STEP_2 } from "@/utils/constants";
import { AiOutlineEye } from "react-icons/ai";
import { RiLockLine } from "react-icons/ri";

const LoginContent = () => {
  const { isLoading, mutate } = useLogin();
  const [, setUser] = useStore(getUserState);
  const { mutate: socialMutate } = useSocialLogin();
  const handleGoogleLogin = async () => {
    try {
      const returnValue = await googleSignIn();
      socialMutate(
        {
          providerId: returnValue?.providerId,
          displayName: returnValue?.user.displayName,
          uid: returnValue?.user.uid,
          email: returnValue?.user.email,
          phoneNumber: returnValue?.user.phoneNumber,
          photoURL: returnValue?.user.photoURL,
          // fcmToken: pushToken,
        },
        {
          onSuccess(data) {
            console.log("success", data.data.message);
            const res = data?.data?.data as TUser;
            notifications.show({
              title: `Notification`,
              message: data.data.message,
            });
            setUser({ ...res });
            console.log("work in progress", res);
            navigate("/selectprofile");
          },

          onError(err) {
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        }
      );
    } catch (error) {
      notifications.show({
        title: `Notification`,
        message: getApiErrorMessage(error),
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const returnValue = await facebookSignIn();
      socialMutate(
        {
          providerId: returnValue?.providerId,
          displayName: returnValue?.user.displayName,
          uid: returnValue?.user.uid,
          email: returnValue?.user.email,
          phoneNumber: returnValue?.user.phoneNumber,
          photoURL: returnValue?.user.photoURL,
          // fcmToken: pushToken,
        },
        {
          onSuccess(data) {
            console.log("success", data.data.message);
            const res = data?.data?.data as TUser;
            notifications.show({
              title: `Notification`,
              message: data.data.message,
            });
            setUser({ ...res });
            console.log("work in progress", res);
            navigate("/selectprofile");
          },

          onError(err) {
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        }
      );
    } catch (error) {
      notifications.show({
        title: `Notification`,
        message: getApiErrorMessage(error),
      });
    }
  };

  const [{ userType, email }] = userContext();
  console.log("testing one", userType, email);
  const navigate = useNavigate();
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [opened1, { open: open1, close: close1 }] = useDisclosure(false);

  const [modalStep, setModalStep] = useState(STEP_1);
  // const [studentModal, setStudentModal] = useState(false);
  const [teacherModal, setTeacherModal] = useState(false);
  console.log("--- errors", errors);

  const submitData = (data: FormData) => {
    console.log("It is working", data);
    localStorage.setItem("userPassword", data?.password!);

    mutate(
      {
        ...data,
      },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          const res = data?.data?.data as TUser;
          setUser({ ...res });
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          if (res?.role === "schoolAdmin") {
            navigate("/school");
          } else if (res?.role === "parent") {
            navigate("/selectprofile");
          } else if (res?.role === "teacher") {
            setTeacherModal(true);
            console.log("it's teacher ", teacherModal);
            open1();
          }
        },
        onError(err) {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );

    // const user = users.find((el) => el.email === data.email);
    // user &&
    //   dispatch({
    //     type: "LOGIN",
    //     payload: { email: user.email, userType: user.userType },
    //   });
    // if (user?.userType === "school") {
    //   navigate("/newlyregistereduser");
    // }
    // if (user?.userType === "teacher" && user.isCreatePassword) {
    //   navigate("/newlyregistereduser");
    // }
    // if (user?.userType === "teacher" && !user.isCreatePassword) {
    //   open1();
    //   setTeacherModal(true);
    // }
    // if (user?.userType === "parent") {
    //   navigate("/selectprofile");
    // }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="inner-form-w relative  my-auto flex justify-end items-center ">
        <Modal
          radius={"xl"}
          size="lg"
          opened={opened1}
          onClose={close1}
          closeButtonProps={{
            size: "xl",
          }}
          centered
        >
          {teacherModal && modalStep === STEP_1 ? (
            <TeacherLoginModal onContinue={() => setModalStep(STEP_2)} />
          ) : (
            ""
          )}
          {teacherModal && modalStep === STEP_2 ? <CongratulationsModal /> : ""}
        </Modal>

        <Link to="/">
          <span className="absolute top-[-60px] ">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%]">
          <span></span>
          <h1 className="font-bold fon header2 font-Recoleta text">
            Welcome back
          </h1>
          <p className="text3 text-[#A7A7A7] font-Hanken">
            Welcome back! please enter your details
          </p>
          <form onSubmit={handleSubmit(submitData)} className="text3">
            <p className="my-4">
              {
                <InputFormat
                  type="text"
                  placeholder="Email"
                  reg={register("email")}
                  leftIcon={
                    // <img loading="lazy" src={EmailLogo} alt="pasword icon" />
                    <AiOutlineMail
                      size={20}
                      className={" mx-auto"}
                      color="#c4ccd0"
                    />
                  }
                  errorMsg={errors.email?.message}
                />
              }
            </p>
            <p className="my-2">
              <InputFormat
                type="password"
                placeholder="password"
                reg={register("password")}
                leftIcon={<RiLockLine size={20} color="#c4ccd0" />}
                rightIcon={<AiOutlineEye size={22} color="#c4ccd0" />}
                errorMsg={errors.password?.message}
              />
            </p>
            <p className="flex justify-end text3 mb-4 text-[#8530C1] font-bold">
              <Link to="/forgotpassword">
                <button>Forgot password?</button>
              </Link>
            </p>
            <Button type="submit" size="full">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Login</span>
              )}
            </Button>
            {/* <p className="flex justify-center mt-3 text-[#8530C1] font-bold underline">
            <button type="button" onClick={() => open2()}>
              Sign In as Student
            </button>
          </p> */}
          </form>
          <p className="flex items-center text3 justify-items-center py-10 gap-3  text-gray-400 font-400">
            <hr className="flex-1" />
            <span>or continue with</span> <hr className="flex-1" />
          </p>
          <div className="flex gap-8">
            <Button size="full" onClick={handleGoogleLogin} varient="outlined">
              <FcGoogle size={20} className={" mx-auto"} />
            </Button>
            <Button size="full" varient="outlined">
              <BsApple size={20} className={" mx-auto"} color={"black"} />
            </Button>
            <Button
              onClick={handleFacebookLogin}
              size="full"
              varient="outlined"
            >
              <AiFillFacebook size={20} className={" mx-auto"} color="black" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[] text-gray-400 ">
            <span className="font-Hanken">Don't hava an account? </span>
            <Link to="/signup">
              <button className="mt-4 text-[#8530C1] font-bold">Sign up</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
