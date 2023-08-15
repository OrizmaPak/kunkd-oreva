import Button from "@/components/Button";
import Apple from "@/assets/apple2.svg";
import Facebook from "@/assets/facebook.svg";
import Google from "@/assets/googleicon2.svg";
import Cancel from "@/assets/Cancel.svg";
import OptionButton from "./OptionButton";
import Checked from "@/assets/Checked.svg";
import UnChecked from "@/assets/uncheck.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSocialSignUp } from "@/api/queries";
import { googleSignIn, facebookSignIn } from "@/auth/sdk";
import { getPushTokenState } from "@/store/pushTokenStore";
import useStore from "@/store";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { getUserState } from "@/store/authStore";
import { TUser } from "@/api/types";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";

const options = [
  {
    title: "I'm a school",
    to: "schoolsignup",
    desc: "I want to manage my school's access to this platform",
  },
  {
    title: "'I'm a Parent",
    desc: "I want to manage my child's access to this platform",
    to: "parentsignup",
  },
];

const SignContent = () => {
  const [, setUser] = useStore(getUserState);
  const navigate = useNavigate();
  const [to, setTo] = useState("");
  const { mutate } = useSocialSignUp();
  const [pushToken, ,] = useStore(getPushTokenState);
  const handleClick = () => {
    console.log(to);
  };

  const handleGoogleSignUp = async () => {
    try {
      const returnValue = await googleSignIn();
      console.log("Request object", {
        displayName: returnValue.user.displayName,
        uid: returnValue.user.uid,
        email: returnValue.user.email,
        phoneNumber: returnValue.user.phoneNumber,
        photoURL: returnValue.user.photoURL,
        fcmToken: pushToken,
      });
      mutate(
        {
          providerId: returnValue.providerId,
          displayName: returnValue.user.displayName,
          uid: returnValue.user.uid,
          email: returnValue.user.email,
          phoneNumber: returnValue.user.phoneNumber,
          photoURL: returnValue.user.photoURL,
          fcmToken: pushToken,
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
            navigate("/childprofilesetup");
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
      console.log("Request object", {
        displayName: returnValue?.user.displayName,
        uid: returnValue?.user.uid,
        email: returnValue?.user.email,
        phoneNumber: returnValue?.user.phoneNumber,
        photoURL: returnValue?.user.photoURL,
        fcmToken: pushToken,
      });
      mutate(
        {
          providerId: returnValue?.providerId,
          displayName: returnValue?.user.displayName,
          uid: returnValue?.user.uid,
          email: returnValue?.user.email,
          phoneNumber: returnValue?.user.phoneNumber,
          photoURL: returnValue?.user.photoURL,
          fcmToken: pushToken,
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
            navigate("/childprofilesetup");
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
    <div className="w-[100%] max-w-[500px] mx-auto relative">
      <Link to="/">
        <span className="absolute">
          <img loading="lazy" src={Cancel} alt="cancel" />
        </span>
      </Link>

      <div className="w-[100%] pt-20">
        <span></span>
        <h1 className="font-bold text-[40px] font-Recoleta">Get Started</h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Let's create account that fits you!{" "}
        </p>
        <div className="mb-14 ">
          {options.map((option) => (
            <OptionButton
              clicked={to === option.to}
              title={option.title}
              body={option.desc}
              key={option.to}
              onClick={() => setTo(option.to)}
              image={to === option.to ? Checked : UnChecked}
            />
          ))}
          {/* // <OptionButton title="'I'm a Parent" body="I want to manage my child's access to this platform" image={UnChecked}/> */}
          <div className="mt-10">
            <Link to={to}>
              <Link to={`/${to}`}>
                <Button onClick={handleClick} size="full">
                  Continue
                </Button>
              </Link>
            </Link>
          </div>
        </div>
        <div className="flex gap-8">
          <Button onClick={handleGoogleSignUp} size="full" varient="outlined">
            {/* <img loading="lazy" src={Google} alt="google" className="mx-auto" />
            
             */}
            <FcGoogle size={30} className={" mx-auto"} />
          </Button>
          <Button size="full" varient="outlined">
            {/* <img loading="lazy" src={Apple} alt="apple" className="mx-auto " /> */}
            <BsApple size={30} className={" mx-auto"} color={"black"} />
          </Button>
          <Button onClick={handleFacebookSignUp} size="full" varient="outlined">
            {/* <img
              loading="lazy"
              src={Facebook}
              alt="facebook"
              className="mx-auto "
            /> */}
            <AiFillFacebook size={30} className={" mx-auto"} color="black" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[] text-gray-400 ">
          <span>Already signed up? </span>
          <button
            onClick={() => navigate("/login")}
            className="mt-8 text-[#8530C1] font-bold
              "
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignContent;
