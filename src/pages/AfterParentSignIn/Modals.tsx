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

export const WelcomeModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div>
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
    </div>
  );
};

export const ChildNameModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div>
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
          <p className="my-4">
            <InputFormat type="text" placeholder="Full Name" />
          </p>
          <Button onClick={onContinue} type="submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export const ChildAgeModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div>
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
          <p className="mb-8">
            <select
              name=""
              id=""
              className="py-4 px-8 rounded-full flex items-center w-full gap-2 mt-2 border border-[#F3DAFF]"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <Button onClick={onContinue} type="submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export const SelectAvatar = ({ onContinue }: { onContinue: () => void }) => {
  const [selected, setSelected] = useState("");
  console.log(!!selected);
  return (
    <div>
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
    <div>
      <div className="flex justify-center items-center p-4">
        <img src={YajSucces} alt="success" />
      </div>
      <p className="text-center my-4">You have successfully added a child</p>

      <Button onClick={onContinue}>Great</Button>
    </div>
  );
};
