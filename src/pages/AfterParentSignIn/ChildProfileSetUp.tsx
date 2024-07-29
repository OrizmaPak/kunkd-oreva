import { getApiErrorMessage } from "@/api/helper";
import {
  useGetAvatars,
  useGetProfile,
  useProfle,
  useGetUpdatedProfile,
  useGetSuggestUserName,
  useUserNameChecker,
} from "@/api/queries";
import AddAvatarIcon from "@/assets/AddAvatarIcon.svg";
// import YaJump from "@/assets/yaa24.png";
import LessDOwnIcon from "@/assets/backIcon.png";
import YajSucces from "@/assets/yaacongrat24.png";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chip, Loader, Skeleton, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { useEffect } from "react";
// import { Combobox, TextInput, useCombobox } from "@mantine/core";
// import GroupIcon from "@/assets/groupIcons.svg";
import {
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4,
  STEP_5,
  STEP_6,
} from "@/utils/constants";
import { useNavigate } from "react-router-dom";

import { MdClose } from "react-icons/md";
import { selectAvatarType } from "./SelectProfile";
import moengage from "@moengage/web-sdk";
import Logo from "@/assets/KundaLogo.svg";
import facebook from "@/assets/facebook.svg";
import insta from "@/assets/insta.svg";
import twitter from "@/assets/twitter.svg";
import Ema from "@/assets/ema.png";
import { useDebouncedValue } from "@mantine/hooks";

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
  const [name, setName] = useState("");
  const [userName, setUserName] = useState<string>("");
  const [schoolName, setSchoolName] = useState("");
  const [age, setAge] = useState<string>("");

  const navigate = useNavigate();
  const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
  return (
    <div
      // style={{
      //   backgroundImage: `url(${GroupIcon})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "contain",
      //   backgroundPosition: "center",
      // }}
      className=" h-screen w-full max-w-[1440px]  mx-auto flex flex-col "
    >
      <div className="my-3 px-8">
        <img src={Logo} alt="" />
      </div>
      <div className="flex flex-grow justify-center mt-10  ">
        <div className=" w-full ">
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
              userName={userName}
              name={name}
              setUserName={setUserName}
            />
          )}

          {currentStep === STEP_3 && (
            <ChildSchoolNameModal
              onContinue={() => setCurrentStep(STEP_4)}
              goBack={() => setCurrentStep(currentStep - 1)}
              showGoBackIcon={true}
              setSchoolName={setSchoolName}
              schoolName={schoolName}
              name={name}
              setUserName={setUserName}
            />
          )}
          {currentStep === STEP_4 && (
            <ChildAgeModal
              onContinue={() => setCurrentStep(STEP_5)}
              goBack={() => setCurrentStep(currentStep - 1)}
              setAge={setAge}
            />
          )}
          {currentStep === STEP_5 && (
            <SelectAvatar
              setChildProfile={setChildProfile}
              onContinue={() => setCurrentStep(STEP_6)}
              goBack={() => setCurrentStep(currentStep - 1)}
              age={age}
              schoolName={schoolName}
              userName={userName}
              name={name}
              setAge={setAge}
              setName={setName}
              setSchoolName={setSchoolName}
              setUserName={setUserName}
            />
          )}
          {currentStep === STEP_6 && (
            <WellDoneModal onContinue={() => navigate("/parent")} />
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center gap- text3 font-semibold py-3 px-8">
          <div>
            <p className="text-[#98A2B3] text2">
              {" "}
              &copy; Copyright 2023 Kunda Kids, All rights reserved.
            </p>
          </div>

          <div className="flex items-center justify-between w-[150px] cursor-pointer">
            <button
              onClick={() => {
                openInNewTab("https://m.facebook.com/kundakids/");
              }}
            >
              <img
                loading="lazy"
                src={facebook}
                alt="facebooklogo"
                className="facebookLogo cursor-pointer  w-[20px]"
              />
            </button>
            <button
              onClick={() => {
                openInNewTab(
                  " https://instagram.com/kundakids?igshid=NzZlODBkYWE4Ng=="
                );
              }}
            >
              <img
                loading="lazy"
                src={insta}
                alt="instalogo"
                className="instaLogo cursor-pointe  w-[24px]r"
              />
            </button>
            <button
              onClick={() => {
                openInNewTab(" https://twitter.com/kundakids?lang=en");
              }}
            >
              <img
                loading="lazy"
                src={twitter}
                alt="twitterlogo"
                className="twitterLogo cursor-pointer w-[24px]"
              />
            </button>
          </div>
        </div>
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
      className=""
    >
      <div className="mt-20">
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
  name,
  userName,
  close,
  setUserName,
  showCancelBtn,
  cancel,
}: {
  onContinue: () => void;
  goBack: () => void;
  name: string;
  userName: string;
  showGoBackIcon: boolean;
  setName: (val: string) => void;
  close?: () => void;
  cancel?: () => void;
  setUserName: (val: string) => void;
  showCancelBtn?: boolean;
}) => {
  const { mutate } = useGetSuggestUserName();
  const [suggestions, setSuggestion] = useState<[]>();
  const handleUsernameSuggestion = (name: string) => {
    console.log("name", name);
    mutate(
      {
        name,
      },

      {
        onSuccess(data) {
          setSuggestion(data?.data?.data?.suggestions);
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
  // const suggestions = datta?.data?.data?.suggestions;
  const ref = useRef(null);
  const [debounced] = useDebouncedValue(userName, 200);
  const { data, isError, isLoading, isInitialLoading } =
    useUserNameChecker(debounced);

  console.log(
    {
      isLoading,
      isInitialLoading,
      isError,
      data,
      isErrorCheck: data && !isLoading && isError,
    },
    "user name --- "
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="  "
    >
      <div className="px-8">
        <span></span>
        {showGoBackIcon && (
          <p
            onClick={() => {
              goBack();
              if (cancel) cancel();
            }}
            className=""
          >
            <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
          </p>
        )}

        <span>
          {showCancelBtn && (
            <MdClose onClick={close} size={35} className=" cursor-pointer" />
          )}
        </span>
      </div>

      <div className="px-14">
        <div className="flex justify-center items-center p-4">
          <img loading="lazy" src={Ema} alt="jump" />
        </div>
        <div>
          <h1 className="text-center font-bold   font-Recoleta text30">
            What is your child’s name?
          </h1>
          <p className="text-center text2 font-medium">
            Enter the child’s name below
          </p>
        </div>

        <div>
          <div className="max-w-[400px] mx-auto mt-10">
            <p className="my-5">
              <label htmlFor="name" className="text1 font-medium">
                Name
              </label>
              <input
                value={name}
                className="border rounded-full py-3  px-4 items-center gap-2 mt-1  border-[#F3DAFF] block  w-full  h-full flex-1 text-black text-[14px]  focus:outline-none"
                onBlur={() => handleUsernameSuggestion(name)}
                type="text"
                placeholder="Enter your child's name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </p>
            <p className="mb-8 suggestion-wrapper">
              <label htmlFor="name" className="text1 font-medium">
                Username
              </label>

              {
                <TextInput
                  id="useNameSuggestion"
                  placeholder="Choose one or enter your desired username."
                  name="user name"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  ref={ref}
                  list="user-name-suggestion"
                  // autoComplete="false"
                  rightSection={
                    isInitialLoading && isLoading ? <Loader size="xs" /> : null
                  }
                  error={!isLoading && isError && "user name already exist"}
                />
              }
              {
                <Chip.Group
                  onChange={(value) => {
                    setUserName(value as string);
                  }}
                  value={userName}
                >
                  <div className="flex my-2  flex-wrap gap-2 gap-y-3">
                    {suggestions?.map((suggest: string) => (
                      <Chip width={"auto"} key={suggest} value={suggest}>
                        {suggest}
                      </Chip>
                    ))}
                  </div>
                </Chip.Group>
              }

              {suggestions && (
                <datalist id="user-name-suggestion" className="w-full">
                  {suggestions?.map((suggest: string) => (
                    <option key={suggest} value={suggest} className="w-full">
                      {suggest}
                    </option>
                  ))}
                </datalist>
              )}
              <p className="text3 my-1">
                Note: the username will be display on the leaderboard.
              </p>
            </p>
            <p className="mb-8">
              <Button
                disable={isError || isLoading || name == ""}
                type="reset"
                onClick={onContinue}
              >
                Continue
              </Button>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ChildSchoolNameModal = ({
  onContinue,
  goBack,
  showGoBackIcon,
  close,
  schoolName,
  setSchoolName,
  name,
  showCancelBtn,
}: {
  onContinue: () => void;
  goBack: () => void;
  showGoBackIcon: boolean;
  close?: () => void;
  name: string;
  setUserName: (val: string) => void;
  showCancelBtn?: boolean;
  schoolName: string;
  setSchoolName: (val: string) => void;
}) => {
  const schema: ZodType<Pick<FormData, "school_name">> = z.object({
    school_name: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    setSchoolName(data.school_name as string);
    onContinue();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="  rounded-3xl   "
    >
      <div className="flex px-8 gap-4 justify-between items-center">
        {showGoBackIcon && (
          <p onClick={goBack} className="">
            <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
          </p>
        )}
      </div>
      <div>
        <div className="flex justify-center items-center p-4">
          <img loading="lazy" src={Ema} alt="jump" />
        </div>
        <h1 className="text-center font-bold   font-Hanken text30">
          {`  What is ${name}’s school name?`}
        </h1>
        <span>
          {showCancelBtn && (
            <MdClose onClick={close} size={35} className=" cursor-pointer" />
          )}
        </span>
      </div>
      <div className="px-14">
        <div>
          <p className="text-center text2 font-medium">
            {`Enter ${name}’s school name below.`}
          </p>
        </div>

        <div className="max-w-[400px] mx-auto mt-20">
          <form onSubmit={handleSubmit(submitData)}>
            <p className="my-5">
              <label htmlFor="name" className="text1 font-medium">
                School Name (Optional)
              </label>
              <InputFormat
                value={schoolName}
                reg={register("school_name")}
                type="text"
                placeholder="Enter Your Name"
              />
              <p className="text2">
                You can win a gift for your school if you provide this
                information.
              </p>
            </p>

            <p className="mb-8 flex gap-3">
              <Button onClick={onContinue} varient="outlined">
                <strong className="text-[#8530C1]"> Skip</strong>
              </Button>
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
      className="   "
    >
      <div className="flex px-10 justify-between items-center">
        <p onClick={goBack} className="">
          <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
        </p>

        <span>
          {showCancelBtn && (
            <MdClose onClick={close} size={35} className=" cursor-pointer" />
          )}
        </span>
      </div>
      <div className="px-28">
        <div>
          <div className="flex justify-center items-center p-4">
            <img loading="lazy" src={Ema} alt="jump" />
            {/* {isKid? <Skeleton height={150} width={100}></Skeleton>:<img loading="lazy" src={YaJump} alt="jump" onLoad={()=>setIsKid(false)} />} */}
          </div>
          <h1 className="text-center font-bold text30 font-Hanken">
            What is your child’s age?
          </h1>
          <p className="text-center text1">
            We will try to customize the app for your child’s age.
          </p>
        </div>

        <div className="max-w-[400px] mx-auto mt-20">
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
  userName,
  schoolName,
  setName,
  setUserName,
  setAge,
  setSchoolName,
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
  userName: string;
  setName: (val: string) => void;
  setUserName: (val: string) => void;
  setAge: (val: string) => void;
  setSchoolName: (val: string) => void;

  schoolName: string;
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
        username: userName,
        schoolname: schoolName,
      },

      {
        onSuccess(data) {
          if (setChildProfile) setChildProfile(data?.data.data.profile_id);

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          sessionStorage.setItem("showJoinChallenge", "true");
          setName("");
          setSchoolName("");
          setAge("");
          setSchoolName("");
          setUserName("");
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
      className=" "
    >
      {error ? (
        <h1>something went wrong</h1>
      ) : (
        <div>
          <div className="flex px-10 justify-between items-center  ">
            <p onClick={goBack} className=" ">
              <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
            </p>

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
              <h1 className="text-center font-bold  text30 font-Recoleta">
                Select Avatar
              </h1>
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
            <div className="max-w-[400px] mx-auto">
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
        <p className="text-center text1 my-4">
          You have successfully added a child
        </p>
        <div className="mb-12 max-w-[400px] mx-auto mt-2">
          <Button onClick={handleSubmit}>
            <span className="text-white">Continue</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
