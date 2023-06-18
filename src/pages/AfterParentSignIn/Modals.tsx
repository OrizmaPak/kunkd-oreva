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

const Modals = () => {
  return <div></div>;
};

export default Modals;

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Your component content */}
</motion.div>;

export const WelcomeModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-center font-bold text-[35px] font-Recoleta">
          {" "}
          Welcome to Kunda Kids
        </h1>
        <p className="text-center">
          To begin, create a profile for your child.
        </p>
      </div>
      <div className="flex justify-center items-center py-10">
        <button onClick={onContinue} className=" text-center">
          <img src={AddAvatarIcon} alt="avatar" />
          <p className="py-5">Add Profile</p>
        </button>
      </div>
    </motion.div>
  );
};

export const ChildNameModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-14">
        <div>
          <h1 className="text-center font-bold text-[35px] font-Recoleta">
            What is your child’s name?
          </h1>
          <p className="text-center">Input your child’s full name</p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img src={YaJump} alt="jump" />
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

export const ChildAgeModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
          <img src={YaJump} alt="jump" />
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

export const SelectAvatar = ({ onContinue }: { onContinue: () => void }) => {
  const [selected, setSelected] = useState("");
  console.log(!!selected);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
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
        <img src={image} alt="avatar" />
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
    >
      <div className="px-14 rounded-3xl">
        <div className="flex justify-center items-center p-4">
          <img src={YajSucces} alt="success" />
        </div>
        <p className="text-center my-4">You have successfully added a child</p>
        <p className="mb-12">
          <Button onClick={onContinue}>Great</Button>
        </p>
      </div>
    </motion.div>
  );
};
