import { getApiErrorMessage } from "@/api/helper";
import { useSocialSignUp } from "@/api/queries";
import { TUser } from "@/api/types";
import Cancel from "@/assets/Cancel.svg";
import { facebookSignIn, googleSignIn } from "@/auth/sdk";
import Button from "@/components/Button";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { getPushTokenState } from "@/store/pushTokenStore";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoCheckmarkCircleOutline, IoEllipseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import OptionButton from "./OptionButton";

const options = [
  {
    title: "I'm a school",
    to: "schoolsignup",
    desc: "I want to manage my school's access to this platform",
    id: 1,
  },
  {
    title: "I'm a Parent",
    desc: "I want to manage my child's access to this platform",
    to: "parentsignup",
    id: 2,
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

  const handleGoogleSignUp = async () => {
    try {
      const returnValue = await googleSignIn();

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
            const res = data?.data?.data as TUser;

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
            const res = data?.data?.data as TUser;

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
    <div className="flex justify-center items-center relative h-full">
      <div className="inner-form-w  mx-auto relative">
        <Link to="/">
          <span className="absolute top-[-150px]">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>

        <div className="w-[100%]">
          <span></span>
          <h1 className="font-bold header2 font-Recoleta">Get Started</h1>
          <p className="text3 text-[#A7A7A7] font-Hanken">
            Let's create account that fits you!
          </p>
          <div className="mb-8 ">
            {options.map((option) => (
              <OptionButton
                clicked={to === option.to}
                title={option.title}
                body={option.desc}
                id={option.id}
                userId={userId}
                setUserId={setUserId}
                key={option.to}
                onClick={() => setTo(option.to)}
                image={
                  to === option.to ? (
                    <IoCheckmarkCircleOutline size={25} color="#8530C1" />
                  ) : (
                    <IoEllipseOutline size={25} />
                  )
                }
              />
            ))}
            {/* // <OptionButton title="'I'm a Parent" body="I want to manage my child's access to this platform" image={UnChecked}/> */}
            <div className="mt-5">
              <Link to={to}>
                <Link to={`/${to || "signup"}`}>
                  <Button onClick={handleClick} size="full">
                    Continue
                  </Button>
                </Link>
              </Link>
            </div>
          </div>
          {userId === 2 || userId === 0 ? (
            <div className="flex gap-8">
              <Button
                onClick={handleGoogleSignUp}
                size="full"
                varient="outlined"
              >
                <FcGoogle size={20} className={" mx-auto"} />
              </Button>
              <Button size="full" varient="outlined">
                <BsApple size={20} className={" mx-auto"} color={"black"} />
              </Button>
              <Button
                onClick={handleFacebookSignUp}
                size="full"
                varient="outlined"
              >
                <AiFillFacebook
                  size={20}
                  className={" mx-auto"}
                  color="black"
                />
              </Button>
            </div>
          ) : null}
          <p className="mt-4  text-gray-400 text-center ">
            <span>Already signed up? </span>
            <button
              onClick={() => navigate("/login")}
              className=" text-[#8530C1] font-bold
              "
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
