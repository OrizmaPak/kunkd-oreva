import { getApiErrorMessage } from "@/api/helper";
import { useLogin, useSocialLogin } from "@/api/queries";
import { TUser } from "@/api/types";
import { appleSignIn, facebookSignIn, googleSignIn } from "@/auth/sdk";
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
import { getPushTokenState } from "@/store/pushTokenStore";
import moengage from "@moengage/web-sdk";
import InputFormat from "../../common/InputFormat";
import { logOut } from "@/auth/sdk";
import { useEffect } from "react";
import { TproviderData } from "../Signup/SignupContent";
import { formattedDate, handleEventTracking } from "@/api/moengage";
import KundaLogo from "@/assets/KundaLogo.svg";

const LoginContent = () => {
  const { isLoading, mutate } = useLogin();
  const [pushToken, ,] = useStore(getPushTokenState);

  const [, setUser] = useStore(getUserState);
  const { mutate: socialMutate, isLoading: socialisLoading } = useSocialLogin();

  useEffect(() => {
    logOut();
    sessionStorage.clear();
    sessionStorage.clear();
  }, []);

  function getUserWithGoogleProvider(users: TproviderData[]) {
    // Check if the array contains only one user
    if (users.length === 1) {
      return users[0];
    } else {
      // If there are multiple users, find the user with providerId === "apple.com"
      const appleUser = users.find(
        (user: TproviderData) => user.providerId === "google.com"
      );
      return appleUser;
    }
  }
  const handleGoogleLogin = async () => {
    try {
      const returnValue = await googleSignIn();

      const googleUserData = getUserWithGoogleProvider(
        returnValue.user?.providerData as TproviderData[]
      );
      const nameArray = googleUserData?.displayName?.split(" ") ?? "";

      socialMutate(
        {
          // provider: returnValue.providerId,
          provider: "google",
          // displayName: returnValue.user.displayName,
          id: returnValue.user?.providerData?.[0]?.uid,
          name: returnValue.user.displayName,
          email: returnValue.user.email,
          phoneNumber: returnValue.user.phoneNumber,
          photoURL: returnValue.user.photoURL,
          fcmToken: pushToken,
          first_name: nameArray[0],
          last_name: nameArray[1],
        },
        {
          onSuccess(data) {
            const res = data?.data?.data as TUser;
            notifications.show({
              title: `Notification`,
              message: data.data.message,
            });
            moengage.add_unique_user_id(res?.user_id);
            moengage.add_first_name(res?.firstname);
            moengage.add_last_name(res?.lastname);
            moengage.add_email(res?.email);
            moengage.add_mobile(res?.phoneNumber);
            handleEventTracking("web_parent_login", {
              user_id: res?.user_id,
              login_platform: "web",
              subscription_status: res?.status,
              login_date: formattedDate,
              login_method: "Google",
            });
            // moengage.track_event("web_login", {
            //   user_id: res?.user_id,
            //   login_platform: "web",
            //   subscription_status: res?.status,
            //   login_date: formattedDate,
            //   login_method: "Google",
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

  function getUserWithAppleProvider(users: TproviderData[]) {
    // Check if the array contains only one user
    if (users.length === 1) {
      return users[0];
    } else {
      // If there are multiple users, find the user with providerId === "apple.com"
      const appleUser = users.find(
        (user: TproviderData) => user.providerId === "apple.com"
      );
      return appleUser;
    }
  }

  const handleAppleSignIn = async () => {
    try {
      const returnValue = await appleSignIn();

      const appleUserData = getUserWithAppleProvider(
        returnValue.user?.providerData as TproviderData[]
      );
      const nameArray = appleUserData?.displayName?.split(" ") ?? "";

      mutate(
        {
          provider: "apple",
          // displayName: returnValue.user.displayName,
          id: appleUserData?.uid,
          name: returnValue.user.displayName,
          email: returnValue.user.email,
          phoneNumber: returnValue.user.phoneNumber,
          photoURL: returnValue.user.photoURL,
          fcmToken: pushToken,
          first_name: nameArray[0],
          last_name: nameArray[1],
        },
        {
          onSuccess(data) {
            const res = data?.data?.data as TUser;
            moengage.add_unique_user_id(res?.user_id);
            moengage.add_first_name(res?.firstname);
            moengage.add_last_name(res?.lastname);
            moengage.add_email(res?.email);
            moengage.add_mobile(res?.phoneNumber);
            handleEventTracking("web_parent_login", {
              user_id: res?.user_id,
              login_platform: "web",
              subscription_status: res?.status,
              login_date: formattedDate,
              login_method: "apple",
            });
            // moengage.track_event("web_login", {
            //   user_id: res?.user_id,
            //   login_platform: "web",
            //   subscription_status: res?.status,
            //   login_date: formattedDate,
            //   login_method: "apple",
            // });
            // notifications.show({
            //   title: `Notification`,
            //   message: data.data.message,
            // });
            setUser({ ...res });
            navigate("/packages");
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
      const nameArray = returnValue?.user?.displayName?.split(" ") ?? "";

      socialMutate(
        // {
        //   providerId: returnValue?.providerId,
        //   displayName: returnValue?.user.displayName,
        //   uid: returnValue?.user.uid,
        //   email: returnValue?.user.email,
        //   phoneNumber: returnValue?.user.phoneNumber,
        //   photoURL: returnValue?.user.photoURL,
        // },
        {
          provider: "facebook",
          // displayName: returnValue.user.displayName,
          id: returnValue.user?.providerData?.[0]?.uid,
          name: returnValue.user.displayName,
          email: returnValue.user.email,
          phoneNumber: returnValue.user.phoneNumber,
          photoURL: returnValue.user.photoURL,
          fcmToken: pushToken,
          first_name: nameArray[0],
          last_name: nameArray[1],
        },
        {
          onSuccess(data) {
            const res = data?.data?.data as TUser;
            // notifications.show({
            //   title: `Notification`,
            //   message: data.data.message,
            // });
            moengage.add_unique_user_id(res?.user_id);
            moengage.add_first_name(res?.firstname);
            moengage.add_last_name(res?.lastname);
            moengage.add_email(res?.email);
            moengage.add_mobile(res?.phoneNumber);
            handleEventTracking("web_parent_login", {
              user_id: res?.user_id,
              login_platform: "web",
              subscription_status: res?.status,
              login_date: formattedDate,
              login_method: "FB",
            });

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

  const submitData = async (datta: FormData) => {
    mutate(
      {
        ...datta,
      },
      {
        async onSuccess(data) {
          sessionStorage.clear();
          const res = data?.data?.data as TUser;
          moengage.add_unique_user_id(res?.user_id);
          moengage.add_first_name(res?.firstname);
          moengage.add_last_name(res?.lastname);
          moengage.add_email(res?.email);
          moengage.add_mobile(res?.phoneNumber);
          handleEventTracking(
            `web_${
              res?.role == "teacher"
                ? "teacher"
                : res?.role == "user"
                ? "parent"
                : "school"
            }
_login`,
            {
              user_id: res?.user_id,
              login_platform: "web",
              subscription_status: res?.status,
              login_date: formattedDate,
              login_method: "manual",
            }
          );

          setUser({ ...res });

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          if (res?.role === "schoolAdmin" || res?.role === "teacher") {
            navigate("/schooldashboard");
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
    <div className="flex justify-center   h-full bg-white rounded-3xl w-[600px]">
      <div className="inner-form-w relative  ">
        <div className="flex justify-center items-center my-12 ">
          <img src={KundaLogo} alt="image" className="w-[200px]" />
        </div>
        <div className="w-[100%] ">
          <span></span>
          <h1 className="font-bold fon header2 font-BalooSemiBold text-center   ">
            Welcome back
          </h1>
          <p className="text3 text-[#A7A7A7] font-ArimoRegular text-center ">
            Welcome back! please enter your details
          </p>
          <form onSubmit={handleSubmit(submitData)} className="text3 mt-14">
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
                placeholder="Password"
                reg={register("password")}
                leftIcon={<RiLockLine size={20} color="#c4ccd0" />}
                rightIcon={<AiOutlineEye size={22} color="#c4ccd0" />}
                errorMsg={errors.password?.message}
              />
            </p>
            <p className="flex justify-end text3 mb-4 text-customGreen font-bold">
              <Link to="/forgotpassword">
                <button>Forgot password?</button>
              </Link>
            </p>
            <Button type="submit" size="full" backgroundColor="green">
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
              borderColor="green"
            >
              <FcGoogle size={20} className={" mx-auto"} />
            </Button>
            <Button
              onClick={handleAppleSignIn}
              size="full"
              varient="outlined"
              borderColor="green"
            >
              <BsApple size={20} className={" mx-auto"} color={"black"} />
            </Button>
            <Button
              onClick={handleFacebookLogin}
              size="full"
              varient="outlined"
              borderColor="green"
            >
              <AiFillFacebook size={20} className={" mx-auto"} color="black" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[] text-gray-400 ">
            <span className="font-Hanken">Don't hava an account? </span>
            <Link to="/signup">
              <button className="mt-4 text-customGreen font-bold">
                Sign up
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
