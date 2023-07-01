import AddAvatarIcon from "@/assets/AddAvatarIcon.svg";
import YaJump from "@/assets/Yaa jump 1.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import Avatar1 from "@/assets/Avatar1.svg";
import YajSucces from "@/assets/yupsuccess.svg";

import Avatar2 from "@/assets/Avatar2.svg";
import Avatar3 from "@/assets/Avatar3.svg";
import Avatar4 from "@/assets/Avatar4.svg";
import Avatar5 from "@/assets/Avatar5.svg";
import Avatar6 from "@/assets/Avatar6.svg";
import Avatar7 from "@/assets/Avatar7.svg";
import Avatar8 from "@/assets/Avatar8.svg";
import Avatar9 from "@/assets/Avatar9.svg";
import Avatar10 from "@/assets/Avatar10.svg";
import Avatar11 from "@/assets/Avatar11.svg";
import Avatar12 from "@/assets/Avatar12.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import LessDOwnIcon from "@/assets/lessthanIcon.svg";

import GroupIcon from "@/assets/groupIcons.svg";
import { STEP_1, STEP_2, STEP_3, STEP_4, STEP_5 } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const arrayAvatar = [
  {
    name: "Avatar1",
    image: Avatar1,
  },
  {
    name: "Avatar2",
    image: Avatar2,
  },
  {
    name: "Avatar3",
    image: Avatar3,
  },
  {
    name: "Avatar4",
    image: Avatar4,
  },
  {
    name: "Avatar5",
    image: Avatar5,
  },
  {
    name: "Avatar6",
    image: Avatar6,
  },
  {
    name: "Avatar7",
    image: Avatar7,
  },
  {
    name: "Avatar8",
    image: Avatar8,
  },
  {
    name: "Avatar9",
    image: Avatar9,
  },
  {
    name: "Avatar10",
    image: Avatar10,
  },
  {
    name: "Avatar11",
    image: Avatar11,
  },
  {
    name: "Avatar12",
    image: Avatar12,
  },
];

const ChildProfileSetUp = () => {
  const [currentStep, setCurrentStep] = useState(STEP_1);
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
        {/* <img
        src={GroupIcon}
        alt="group"
        className="absolute left-0 top-0 w-full h-screen"
      /> */}
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
          />
        )}
        {currentStep === STEP_3 && (
          <ChildAgeModal
            onContinue={() => setCurrentStep(STEP_4)}
            goBack={() => setCurrentStep(currentStep - 1)}
          />
        )}
        {currentStep === STEP_4 && (
          <SelectAvatar
            onContinue={() => setCurrentStep(STEP_5)}
            goBack={() => setCurrentStep(currentStep - 1)}
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
}: {
  onContinue: () => void;
  goBack: () => void;
  showGoBackIcon: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" max-w-[600px] rounded-3xl w-[100%] py-10"
    >
      {showGoBackIcon && (
        <p onClick={goBack} className="pl-10 pb-10">
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
          <form>
            <p className="mb-12">
              <InputFormat type="text" placeholder="Full Name" />
            </p>
            <p className="mb-12">
              <Button onClick={onContinue} type="submit">
                Continue
              </Button>
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
}: {
  onContinue: () => void;
  goBack: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" max-w-[600px] rounded-3xl w-[100%] py-10"
    >
      <p onClick={goBack} className="pl-10 pb-10">
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
          <form>
            <p className="mb-12">
              <InputFormat type="date" placeholder="DOB" />
            </p>
            <p className="mb-12">
              <Button onClick={onContinue} type="submit">
                Continue
              </Button>
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
}: {
  onContinue: () => void;
  goBack: () => void;
}) => {
  const [selected, setSelected] = useState("");
  console.log(!!selected);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" max-w-[600px] rounded-3xl w-[100%] py-10"
    >
      <p onClick={goBack} className="pl-10 pb-10">
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
            {arrayAvatar.map((avatar, index) => {
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

        <button
          disabled={!selected}
          onClick={onContinue}
          className={`p-4 px-10 ${
            selected ? "bg-[#782caf]" : "bg-[#d9beeb]"
          }  rounded-full w-full my-6`}
          type="submit"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

const AvatarCard = ({
  image,
  name,
  selected,
  setSelected,
}: {
  image: string;
  name: string;
  selected: string;
  setSelected: (val: string) => void;
}) => {
  const handleClick = () => {
    setSelected(name);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className={`${
          selected === name ? "border-[10px] border-[red]" : ""
        }  rounded-[30px]`}
      >
        <img loading="lazy" src={image} alt="avatar" />
      </button>
    </div>
  );
};

export const WellDoneModal = ({ onContinue }: { onContinue: () => void }) => {
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
          <Button onClick={onContinue}>Great</Button>
        </p>
      </div>
    </motion.div>
  );
};
