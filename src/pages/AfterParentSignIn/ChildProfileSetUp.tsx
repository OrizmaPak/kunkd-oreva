import { getApiErrorMessage } from "@/api/helper";
import {
  useGetAvatars,
  useGetProfile,
  useProfle,
  useGetUpdatedProfile,
} from "@/api/queries";
import AddAvatarIcon from "@/assets/AddAvatarIcon.svg";
import YaJump from "@/assets/yaa24.png";
import LessDOwnIcon from "@/assets/lessthanIcon.svg";
import YajSucces from "@/assets/yaacongrat24.png";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Skeleton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { useEffect } from "react";
import GroupIcon from "@/assets/groupIcons.svg";
import { STEP_1, STEP_2, STEP_3, STEP_4, STEP_5 } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

import { MdClose } from "react-icons/md";
import { selectAvatarType } from "./SelectProfile";
import moengage from "@moengage/web-sdk";

export type avatarType = {
  name: string;
  image: string;
};
const ChildProfileSetUp = ({
  setChildProfile,
}: {
  setChildProfile: (val: string) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(STEP_1);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${GroupIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className="relative h-screen w-full flex justify-center items-center  "
    >
      <div className="border-2 border-[#FBECFF] rounded-3xl ">
        {currentStep === STEP_1 && (
          <WelcomeModal
            onContinue={() => {
              setCurrentStep(STEP_2);
            }}
          />
        )}
        {currentStep === STEP_2 && (
          <ChildNameModal
            onContinue={() => setCurrentStep(STEP_3)}
            goBack={() => setCurrentStep(currentStep - 1)}
            showGoBackIcon={true}
            setName={setName}
          />
        )}
        {currentStep === STEP_3 && (
          <ChildAgeModal
            onContinue={() => setCurrentStep(STEP_4)}
            goBack={() => setCurrentStep(currentStep - 1)}
            setAge={setAge}
          />
        )}
        {currentStep === STEP_4 && (
          <SelectAvatar
            setChildProfile={setChildProfile}
            onContinue={() => setCurrentStep(STEP_5)}
            goBack={() => setCurrentStep(currentStep - 1)}
            age={age}
            name={name}
          />
        )}
        {currentStep === STEP_5 && (
          <WellDoneModal onContinue={() => navigate("/parent")} />
        )}
      </div>
    </div>
  );
};

export default ChildProfileSetUp;

export const WelcomeModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" max-w-[600px] rounded-3xl w-[100%] py-10 px-10"
    >
      <div>
        <h1 className="text-center font-bold text-[35px] font-Recoleta ">
          Welcome to Kunda Kids
        </h1>
        <p className="text-center">
          To begin, create a profile for your child.
        </p>
      </div>
      <div className="flex justify-center items-center py-10">
        <button onClick={onContinue} className=" text-center">
          <img loading="lazy" src={AddAvatarIcon} alt="avatar" />
          <p className="py-5">Add Profile</p>
        </button>
      </div>
    </motion.div>
  );
};

export const ChildNameModal = ({
  onContinue,
  goBack,
  showGoBackIcon,
  setName,
  close,
  showCancelBtn,
}: {
  onContinue: () => void;
  goBack: () => void;
  showGoBackIcon: boolean;
  setName: (val: string) => void;
  close?: () => void;
  showCancelBtn?: boolean;
}) => {
  const schema: ZodType<Pick<FormData, "name">> = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(20, { message: "Name must not exceed 20 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    onContinue();
    if (data.name) {
      setName(data.name);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="  rounded-3xl w-[100%] py-7 "
    >
      <div className="flex px-4 gap-4 justify-between items-center">
        <span></span>
        {showGoBackIcon && (
          <p onClick={goBack} className="">
            <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
          </p>
        )}
        <h1 className="text-center font-bold text-[20px]  font-Recoleta text30">
          What is your child’s name?
        </h1>
        <span>
          {showCancelBtn && (
            <MdClose onClick={close} size={35} className=" cursor-pointer" />
          )}
        </span>
      </div>

      <div className="px-14">
        <div>
          <p className="text-center text2">Input your child’s full name</p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img loading="lazy" src={YaJump} alt="jump" />
        </div>
        <div>
          <form onSubmit={handleSubmit(submitData)}>
            <p className="mb-12">
              <InputFormat
                reg={register("name")}
                errorMsg={errors?.name?.message}
                type="text"
                placeholder="Full Name"
              />
            </p>
            <p className="mb-8">
              <Button type="submit">Continue</Button>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export const ChildAgeModal = ({
  onContinue,
  goBack,
  setAge,
  close,
  showCancelBtn,
}: {
  onContinue: () => void;
  goBack: () => void;
  setAge: (val: string) => void;
  close?: () => void;
  showCancelBtn?: boolean;
}) => {
  const schema: ZodType<FormData> = z.object({
    dob: z
      .string()
      .min(4, { message: "Invalid DOB" })
      .max(20, { message: "Invalid DOB" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    onContinue();
    setAge(data?.dob as string);
  };
  // const [isKid, setIsKid] = useState(false)
  const today = new Date().toISOString().split("T")[0];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="  rounded-3xl w-[100%] py-7  "
    >
      <div className="flex px-10 justify-between items-center">
        <p onClick={goBack} className="">
          <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
        </p>
        <h1 className="text-center font-bold text30 font-Recoleta">
          What is your child’s age?
        </h1>
        <span>
          {showCancelBtn && (
            <MdClose onClick={close} size={35} className=" cursor-pointer" />
          )}
        </span>
      </div>
      <div className="px-28">
        <div>
          <p className="text-center">
            We will try to customize the app for your child’s age.
          </p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img loading="lazy" src={YaJump} alt="jump" />
          {/* {isKid? <Skeleton height={150} width={100}></Skeleton>:<img loading="lazy" src={YaJump} alt="jump" onLoad={()=>setIsKid(false)} />} */}
        </div>
        <div>
          <form onSubmit={handleSubmit(submitData)}>
            <p className="mb-12">
              <InputFormat
                reg={register("dob")}
                errorMsg={errors.dob?.message}
                type="date"
                placeholder="DOB"
                dateMax={today}
              />
            </p>
            <p className="mb-8">
              <Button type="submit">Continue</Button>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export const SelectAvatar = ({
  setChildProfile,
  onContinue,
  goBack,
  // arrayAvatar,
  name,
  age,
  close,
  showCancelBtn,
}: {
  onContinue: () => void;
  goBack: () => void;
  setChildProfile?: (val: string) => void;
  // arrayAvatar: avatarType[];
  age: string;
  name: string;
  close?: () => void;
  showCancelBtn?: boolean;
}) => {
  const [selected, setSelected] = useState(0);
  const { isLoading: isLoadingAvatar, data, error } = useGetAvatars();
  const [user] = useStore(getUserState);

  // const arrayAvatar = data?.data.data.avatars;
  const selectedAv = data?.data?.data?.avatars.filter(
    (avatar: selectAvatarType) => avatar?.id === selected
  )[0];

  const { isLoading, mutate } = useProfle();
  function formatTimeComponent(component: number) {
    return component < 10 ? "0" + component : component;
  }
  const currentTime = new Date();
  // Extract hours, minutes, and seconds
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  // Formatting the time components
  const timeString =
    formatTimeComponent(hours) +
    ":" +
    formatTimeComponent(minutes) +
    ":" +
    formatTimeComponent(seconds);

  const onSubmit = () => {
    mutate(
      {
        name,
        dob: age,
        image: selectedAv.image,
        is_avatar: "true",
      },

      {
        onSuccess(data) {
          if (setChildProfile) setChildProfile(data?.data.data.profile_id);
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          moengage.track_event("web_add_child", {
            user_id: user?.user_id,
            child_name: name,
            child_age: age,
            date_added: timeString,
          });

          onContinue();
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
      transition={{ duration: 0.3 }}
      className="  rounded-3xl  py-7  px-5  "
    >
      {error ? (
        <h1>something went wrong</h1>
      ) : (
        <div>
          <div className="flex px-10 justify-between items-center  ">
            <p onClick={goBack} className=" ">
              <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
            </p>
            <h1 className="text-center font-bold  text30 font-Recoleta">
              Select Avatar
            </h1>
            <span>
              {showCancelBtn && (
                <MdClose
                  onClick={close}
                  size={35}
                  className=" cursor-pointer"
                />
              )}
            </span>
          </div>

          <div className="px-14">
            <div>
              <p className="text-center mb-4 text2">
                Pick an avatar you think your child might like
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-4 gap-x-4 gap-y-4 overflow-scroll overflow-x-hidden h-[400px]">
                {isLoadingAvatar
                  ? new Array(12).fill(1).map((el, index) => (
                      <Skeleton
                        key={index}
                        height={80}
                        width={80}
                        radius={"xl"}
                      >
                        {el}
                      </Skeleton>
                    ))
                  : data?.data?.data?.avatars
                      ?.slice()
                      .reverse()
                      ?.map((avatar: selectAvatarType, index: number) => {
                        return (
                          <AvatarCard
                            key={index}
                            selected={selected}
                            setSelected={setSelected}
                            {...avatar}
                          />
                        );
                      })}
              </div>
            </div>
            <div className="">
              <button
                disabled={!selected}
                onClick={onSubmit}
                className={`p-3  ${
                  selected ? "bg-[#782caf]" : "bg-[#d9beeb]"
                }  rounded w-full my-4`}
              >
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="text-white">Continue</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const AvatarCard = ({
  id,
  image,

  selected,
  setSelected,
}: {
  image?: string;
  name?: string;
  selected: number;
  id?: number;
  setSelected: (val: number) => void;
}) => {
  const handleClick = () => {
    setSelected(id as number);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className={`${
          selected === id
            ? "border-[2px] border-[#8530C1]"
            : "border-[2px] border-white"
        }  rounded-xl p-2 transition-all duration-200`}
      >
        <img
          loading="lazy"
          src={image}
          alt="avatar"
          className="w-[80px] h-[80px]"
        />
      </button>
    </div>
  );
};

export const WellDoneModal = ({ onContinue }: { onContinue: () => void }) => {
  const [enabled, setEnabled] = useState(false);
  const { data } = useGetProfile(enabled, () => {
    onContinue();
    return data;
  });

  const handleSubmit = () => {
    setEnabled(true);
  };

  const [useri, setUser] = useStore(getUserState);
  const { data: userData } = useGetUpdatedProfile();
  const currentUserProfile = userData?.data?.data;
  useEffect(() => {
    setUser({ ...useri, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="  rounded-3xl w-[100%] py-10"
    >
      <div className="px-14 rounded-3xl">
        <div className="flex justify-center items-center p-4">
          <img loading="lazy" src={YajSucces} alt="success" />
        </div>
        <p className="text-center my-4">You have successfully added a child</p>
        <p className="mb-12 ">
          <Button onClick={handleSubmit}>
            <span className="text-white">Continue</span>
          </Button>
        </p>
      </div>
    </motion.div>
  );
};
