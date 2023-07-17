import AddAvatarIcon from "@/assets/AddAvatarIcon.svg";
import YaJump from "@/assets/Yaa jump 1.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import YajSucces from "@/assets/yupsuccess.svg";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { useState } from "react";
import { motion } from "framer-motion";
import LessDOwnIcon from "@/assets/lessthanIcon.svg";
import { useGetAvatars, useGetProfile, useProfle } from "@/api/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";

import GroupIcon from "@/assets/groupIcons.svg";
import { STEP_1, STEP_2, STEP_3, STEP_4, STEP_5 } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
// import { getProfileState } from "@/store/profileStore";
// import useStore from "@/store/index";
import { selectAvatarType } from "./SelectProfile";

export type avatarType = {
  name: string;
  image: string;
};
const ChildProfileSetUp = () => {
  const [currentStep, setCurrentStep] = useState(STEP_1);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  console.log(currentStep, STEP_2);
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
              console.log(currentStep);
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
            onContinue={() => setCurrentStep(STEP_5)}
            goBack={() => setCurrentStep(currentStep - 1)}
            age={age}
            name={name}
          />
        )}
        {currentStep === STEP_5 && (
          <WellDoneModal onContinue={() => navigate("/parenthomepage")} />
        )}
      </div>
    </div>
  );
};

export default ChildProfileSetUp;

export const WelcomeModal = ({ onContinue }: { onContinue: () => void }) => {
  console.log(onContinue);
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
}: {
  onContinue: () => void;
  goBack: () => void;
  showGoBackIcon: boolean;
  setName: (val: string) => void;
}) => {
  const schema: ZodType<Pick<FormData, "name">> = z.object({
    name: z
      .string()
      .min(4, { message: "Name must be at least 4 characters long" })
      .max(20, { message: "Name must not exceed 20 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);
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
      className=" max-w-[600px] rounded-3xl w-[100%] py-10"
    >
      {showGoBackIcon && (
        <p onClick={goBack} className="pl-10">
          <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
        </p>
      )}
      <div className="px-14">
        <div>
          <h1 className="text-center font-bold text-[35px] font-Recoleta">
            What is your child’s name?
          </h1>
          <p className="text-center">Input your child’s full name</p>
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
}: {
  onContinue: () => void;
  goBack: () => void;
  setAge: (val: string) => void;
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
    console.log("testing");
    console.log("It is working", data);
    onContinue();
    setAge(data?.dob!);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" max-w-[600px] rounded-3xl w-[100%] py-10"
    >
      <p onClick={goBack} className="pl-10 ">
        <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
      </p>
      <div className="px-14">
        <div>
          <h1 className="text-center font-bold text-[35px] font-Recoleta">
            What is your child’s age?
          </h1>
          <p className="text-center">
            We will try to customize the app for your child’s age.
          </p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img loading="lazy" src={YaJump} alt="jump" />
        </div>
        <div>
          <form onSubmit={handleSubmit(submitData)}>
            <p className="mb-12">
              <InputFormat
                reg={register("dob")}
                errorMsg={errors.dob?.message}
                type="date"
                placeholder="DOB"
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
  onContinue,
  goBack,
  // arrayAvatar,
  name,
  age,
}: {
  onContinue: () => void;
  goBack: () => void;
  // arrayAvatar: avatarType[];
  age: string;
  name: string;
}) => {
  const [selected, setSelected] = useState("");
  console.log(!!selected);
  const { isLoading: isLoadingAvatar, data, error } = useGetAvatars();

  // const arrayAvatar = data?.data.data.avatars;
  const selectedAv = data?.data.data.avatars.filter(
    (avatar: selectAvatarType) => avatar.name === selected
  )[0];

  const { isLoading, mutate } = useProfle();

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
          console.log("success", data.data.message);

          notifications.show({
            title: `Notification`,
            message: data.data.message,
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
    console.log({ image: selectedAv.image, age, name });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" max-w-[600px] rounded-3xl w-[100%] py-5"
    >
      {error ? (
        <h1>something went wrong</h1>
      ) : (
        <div>
          <p onClick={goBack} className="pl-10 ">
            <img loading="lazy" src={LessDOwnIcon} alt="lessdownIcon" />
          </p>
          <div className="px-14">
            <div>
              <h1 className="text-center font-bold text-[35px] font-Recoleta">
                Select Avatar
              </h1>
              <p className="text-center mb-4">
                Pick an avatar you think your child might like
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                {isLoadingAvatar ? (
                  <span>
                    <Loader size={"lg"} />
                  </span>
                ) : (
                  data?.data.data.avatars?.map(
                    (avatar: selectAvatarType, index: number) => {
                      return (
                        <AvatarCard
                          key={index}
                          selected={selected}
                          setSelected={setSelected}
                          {...avatar}
                        />
                      );
                    }
                  )
                )}
              </div>
            </div>

            <button
              disabled={!selected}
              onClick={onSubmit}
              className={`p-4 px-10 ${
                selected ? "bg-[#782caf]" : "bg-[#d9beeb]"
              }  rounded-full w-full my-4`}
            >
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Continue</span>
              )}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const AvatarCard = ({
  image,
  name,
  selected,
  setSelected,
}: {
  image?: string;
  name?: string;
  selected: string;
  setSelected: (val: string) => void;
}) => {
  const handleClick = () => {
    setSelected(name!);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className={`${
          selected === name ? "border-[10px] border-[red]" : ""
        }  rounded-[30px]`}
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
  });

  const handleSubmit = () => {
    console.log(data);
    setEnabled(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className=" max-w-[600px] rounded-3xl w-[100%] py-10"
    >
      <div className="px-14 rounded-3xl">
        <div className="flex justify-center items-center p-4">
          <img loading="lazy" src={YajSucces} alt="success" />
        </div>
        <p className="text-center my-4">You have successfully added a child</p>
        <p className="mb-12">
          <Button onClick={handleSubmit}>
            <span>Continue</span>
          </Button>
        </p>
      </div>
    </motion.div>
  );
};
