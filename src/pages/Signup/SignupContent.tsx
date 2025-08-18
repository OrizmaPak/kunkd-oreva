import { getApiErrorMessage } from "@/api/helper";
import { useSocialSignUp } from "@/api/queries";
import { TUser } from "@/api/types";
import { facebookSignIn, googleSignIn, appleSignIn } from "@/auth/sdk";
import Button from "@/components/Button";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { getPushTokenState } from "@/store/pushTokenStore";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
// import { IoCheckmarkCircleOutline, IoEllipseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import OptionButton from "./OptionButton";
import moengage from "@moengage/web-sdk";
import { handleEventTracking } from "@/api/moengage";
import SchoolIcon from "@/assets/School Icon.png";
import ParentIcon from "@/assets/Parents Icon.png";
// import { CgRecord } from "react-icons/cg";
import { CgRadioChecked } from "react-icons/cg";
import KundaLogo from "@/assets/KundaLogo.svg";

export type TproviderData = {
  providerId: string;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
};
const options = [
  {
    title: "I'm a school",
    to: "schoolsignup",
    desc: "I want to manage my school's access to this platform",
    id: 1,
    image: SchoolIcon,
  },
  {
    title: "I'm a Parent",
    desc: "I want to manage my child's access to this platform",
    to: "parentsignup",
    id: 2,
    image: ParentIcon,
  },
];

const SignContent = () => {
  const [, setUser] = useStore(getUserState);
  const navigate = useNavigate();
  const [to, setTo] = useState("");
  const { mutate } = useSocialSignUp();
  const [pushToken, ,] = useStore(getPushTokenState);
  const [userId, setUserId] = useState(0);
  const handleClick = () => {
    // todo
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day = currentDate.getDate();
  const formattedDate =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);

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
  const handleGoogleSignUp = async () => {
    try {
      const returnValue = await googleSignIn();
      const googleUserData = getUserWithGoogleProvider(
        returnValue.user?.providerData as TproviderData[]
      );
      const nameArray = returnValue?.user?.displayName?.split(" ") ?? "";

      mutate(
        {
          provider: "google",
          // displayName: returnValue.user.displayName,
          id: googleUserData?.uid,
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
              login_method: "google",
            });

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
  const handleFacebookSignUp = async () => {
    try {
      const returnValue = await facebookSignIn();
      const nameArray = returnValue?.user?.displayName?.split(" ") ?? "";

      mutate(
        // {
        //   providerId: returnValue?.providerId,
        //   displayName: returnValue?.user.displayName,
        //   uid: returnValue?.user.uid,
        //   email: returnValue?.user.email,
        //   phoneNumber: returnValue?.user.phoneNumber,
        //   photoURL: returnValue?.user.photoURL,
        //   fcmToken: pushToken,
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
  return (
       <div className="flex justify-center relative bg-white rounded-[50px] w-[550px] overflow-auto">
        <div className="inner-form-w mx-auto relative overflow-auto " style={{ maxHeight: '100vh', scrollbarWidth: 'none' }}>
          <style>
            {`
              .inner-form-w::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div className="flex justify-center items-center mt-4 mb-8">
            <img src={KundaLogo} alt="image" className="w-[160px]" />
          </div>
          <div className="w-[100%]">
            <p className="font-bold text-[48px] font-BalooSemiBold text-center tracking-n leading-[40px]">
              Get Started
            </p>
            <p className="text3 text-[#A7A7A7] font-ArimoRegular text-center leading-none">
              Let's create account that fits you!
            </p>
            <div className="my-8">
              {options.map((option) => (
                <OptionButton
                  clicked={to === option.to}
                  title={option.title}
                  body={option.desc}
                  image={option?.image}
                  id={option.id}
                  userId={userId}
                  setUserId={setUserId}
                  key={option.to}
                  onClick={() => setTo(option.to)}
                  icon={
                    to === option.to ? (
                      <CgRadioChecked size={25} color="#9FC43E" />
                    ) : (
                      <CgRadioChecked size={25} color="white" />
                    )
                  }
                />
              ))}
              <div className="mt-5 flex justify-center items-center">
                <Link to={to}>
                  <Link to={`/${to || "signup"}`}>
                    <Button
                      onClick={handleClick}
                      size="sm"
                      backgroundColor={to ? "green" : "grey"}
                      className="rounded-full px-[60px]"
                      disable={!to}
                    >
                      Get started
                    </Button>
                  </Link>
                </Link>
              </div>
            </div>
            {userId === 2 ? (
              <div className="flex gap-8 my-4">
                <Button
                  onClick={handleGoogleSignUp}
                  size="full"
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
                  onClick={handleFacebookSignUp}
                  size="full"
                  varient="outlined"
                  borderColor="green"
                >
                  <AiFillFacebook
                    size={20}
                    className={" mx-auto"}
                    color="black"
                  />
                </Button>
              </div>
            ) : null}
            <p className="text-gray-400 text-center pb-5">
              <span>Already signed up? </span>
              <button
                onClick={() => navigate("/login")}
                className="text-customGreen font-bold"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
  );
};

export default SignContent;
