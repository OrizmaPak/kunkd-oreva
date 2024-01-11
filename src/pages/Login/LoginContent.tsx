import { getApiErrorMessage } from "@/api/helper";
import { useLogin, useSocialLogin } from "@/api/queries";
import { TUser } from "@/api/types";
import Cancel from "@/assets/Cancel.svg";
import { facebookSignIn, googleSignIn } from "@/auth/sdk";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { AiFillFacebook, AiOutlineEye, AiOutlineMail } from "react-icons/ai";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RiLockLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import InputFormat from "../../common/InputFormat";

const LoginContent = () => {
  const { isLoading, mutate } = useLogin();
  const [, setUser] = useStore(getUserState);
  const { mutate: socialMutate, isLoading: socialisLoading } = useSocialLogin();
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
        },
        {
          onSuccess(data) {
            const res = data?.data?.data as TUser;
            // notifications.show({
            //   title: `Notification`,
            //   message: data.data.message,
            // });
            setUser({ ...res });
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
        },
        {
          onSuccess(data) {
            const res = data?.data?.data as TUser;
            // notifications.show({
            //   title: `Notification`,
            //   message: data.data.message,
            // });
            setUser({ ...res });
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

  const submitData = (data: FormData) => {
    mutate(
      {
        ...data,
      },
      {
        onSuccess(data) {
          const res = data?.data?.data as TUser;
          setUser({ ...res });
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          if (res?.role === "schoolAdmin" || res?.role === "teacher") {
            navigate("/school");
          } else if (res?.role === "parent" || res?.role === "user") {
            navigate("/selectprofile");
          }
        },
        onError() {
          notifications.show({
            title: `Notification`,
            message: "Invalid username or password",
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
        <Link to="/">
          <span className="absolute top-[-60px] ">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%]">
          <span></span>
          <h1 className="font-bold fon header2 font-Recoleta  leading-[30px] ">
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
            <Button
              disable={socialisLoading}
              size="full"
              onClick={handleGoogleLogin}
              varient="outlined"
            >
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
