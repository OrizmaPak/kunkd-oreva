import React from "react";
import Avatar1 from "@/assets/Avatar1.svg";
import Avatar2 from "@/assets/Avatar2.svg";
import Avatar3 from "@/assets/Avatar3.svg";
import Avatar4 from "@/assets/Avatar4.svg";
import DotIcon from "@/assets/dotIcon.svg";
import { Menu } from "@mantine/core";
import PencilIcon from "@/assets/blackPencilIcon.svg";
import LinkIcon from "@/assets/linkIcon.svg";
import DeleteIcon from "@/assets/redDeleteIcon.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Kidmeme from "@/assets/kidmeme.svg";
import {
  ChildNameModal,
  ChildAgeModal,
  SelectAvatar,
  WellDoneModal,
} from "@/pages/AfterParentSignIn/ChildProfileSetUp";
import { STEP_1, STEP_2, STEP_3, STEP_4 } from "@/utils/constants";
import { useState } from "react";
import LessDownIcon from "@/assets/lessthanIcon.svg";
import { motion } from "framer-motion";

const kidsData = [
  {
    image: Avatar1,
    name: "Emma",
    age: 4,
    gender: "Male",
  },
  {
    image: Avatar2,
    name: "Tola",
    age: 6,
    gender: "Female",
  },
  {
    image: Avatar3,
    name: "Eunice",
    age: 8,
    gender: "Female",
  },
  {
    image: Avatar4,
    name: "Fabiola",
    age: 6,
    gender: "Female",
  },
];

const MyKids = () => {
  const [currentStep, setCurrentStep] = useState<number | null>(STEP_1);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Modal
          opened={opened}
          onClose={close}
          centered
          size="lg"
          radius={"xl"}
          closeOnClickOutside={false}
          withCloseButton={false}
        >
          {currentStep === STEP_1 && (
            <ChildNameModal
              onContinue={() => setCurrentStep(STEP_2)}
              goBack={() => currentStep - 1}
            />
          )}
          {currentStep === STEP_2 && (
            <ChildAgeModal
              onContinue={() => setCurrentStep(STEP_3)}
              goBack={() => setCurrentStep(currentStep - 1)}
            />
          )}
          {currentStep === STEP_3 && (
            <SelectAvatar
              onContinue={() => setCurrentStep(STEP_4)}
              goBack={() => setCurrentStep(currentStep - 1)}
            />
          )}
          {currentStep === STEP_4 && (
            <WellDoneModal
              onContinue={() => {
                close(), setCurrentStep(null);
              }}
            />
          )}
        </Modal>

        <div className="px-20 ">
          <div className="flex justify-between items-center">
            <h1 className="text-[25px] font-bold my-8">My Kids</h1>
            <Button
              onClick={() => {
                open(), setCurrentStep(STEP_1);
              }}
              size="md"
            >
              <p className="flex gap-2 py-1">
                <img src={Kidmeme} alt="meme" />
                <span>Create new profile</span>
              </p>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-y-10 gap-x-28">
            {kidsData &&
              kidsData.map((item, index) => <KidCard key={index} {...item} />)}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MyKids;

const KidCard = ({
  image,
  name,
  age,
  gender,
}: {
  image: string;
  name: string;
  age: number;
  gender: string;
}) => {
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    openedConnectModal,
    { open: openConnectModal, close: closeConnectModal },
  ] = useDisclosure(false);
  return (
    <>
      <Modal
        radius={"xl"}
        size="xl"
        opened={openedEditModal}
        onClose={closeEditModal}
        closeButtonProps={{
          size: "xl",
        }}
        centered
      >
        <EditProfile />
      </Modal>
      <Modal
        radius={"xl"}
        size="xl"
        opened={openedConnectModal}
        onClose={closeConnectModal}
        closeButtonProps={{
          size: "xl",
        }}
        centered
      >
        <ConnectTOSchool />
      </Modal>

      <div className=" relative flex border border-gray-300 px-8 py-8 rounded-3xl">
        <div>
          <img src={image} alt="avatar" />
        </div>
        <div className="ml-4">
          <h1 className="font-bold text-[25px] font-Recoleta">{name}</h1>
          <p className="text-gray-400">
            <span className="border-l-gray-600 border-r-2 mr-4 px-4">
              Age - {age}
            </span>
            <span>Gender - {gender}</span>
          </p>
        </div>
        <div className="">
          <Menu>
            <Menu.Target>
              <span className="absolute  right-10 p-2 cursor-pointer">
                <img src={DotIcon} alt="doticon" />
              </span>
            </Menu.Target>
            <Menu.Dropdown>
              <div className="flex flex-col absolute  bg-white top-[-40px]  w-52 left-3 py-4 rounded-2xl shadow-gray-400  box shadow-md ">
                <Menu.Item>
                  <button
                    onClick={openEditModal}
                    className="p-2 px-4   flex gap-2  justify-start items-center"
                  >
                    <img src={PencilIcon} alt="pencil icon" />
                    <span>Edit profile</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={openConnectModal}
                    className="p-2 px-4  flex gap-2  justify-start items-center"
                  >
                    <img src={LinkIcon} alt="link icon" />
                    <span> Connect school</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button className="p-2 px-4  flex gap-2  justify-start items-center">
                    <img src={DeleteIcon} alt="delete icon" />
                    <span> Remove profile</span>
                  </button>
                </Menu.Item>
              </div>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </>
  );
};

const EditProfile = () => {
  return (
    <div className="px-20">
      <h1 className="text-center font-Recoleta font-bold text-[30px] ">
        Edit Profile
      </h1>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 justify-end items-center">
          <img src={Avatar1} alt="Avatar" />
          <span>Profile Picture</span>
        </p>
        <p className="text-blue-400">Upload picture</p>
      </div>
      <div>
        <form>
          <p className="my-5">
            <label htmlFor="name">Name</label>
            <InputFormat type="text" />
          </p>

          <p className="my-5 flex gap-4">
            <p className=" flex-grow">
              <label htmlFor="name">Gender</label>
              <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
                <select
                  name=""
                  id=""
                  className="w-full  h-full flex-1  focus:outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </p>
            </p>

            <p className=" flex-grow">
              <label htmlFor="dob">DOB</label>
              <InputFormat type="date" />
            </p>
          </p>

          <p className="my-5">
            <label htmlFor="school">School</label>
            <InputFormat type="text" />
          </p>
          <p className="my-5 flex gap-4">
            <p className="flex-grow">
              <label htmlFor="class">Class</label>
              <InputFormat type="text" />
            </p>
            <p className="flex-grow">
              <label htmlFor="teacher">Teacher</label>
              <InputFormat type="text" />
            </p>
          </p>
          <p className="my-5">
            <Button>Save</Button>
          </p>
        </form>
      </div>
    </div>
  );
};

const ConnectTOSchool = () => {
  return (
    <div className="px-20">
      <h1 className="text-center font-Recoleta font-bold text-[30px] ">
        Connect to school
      </h1>

      <p className="text-center my-8">
        Connect your child to his/her school to enjoy...
      </p>

      <div>
        <form>
          <p className="my-5">
            <InputFormat type="text" placeholder="Enter full name" />
          </p>
          <p className="my-5">
            <InputFormat type="text" placeholder="Enter school code" />
          </p>

          <p className="my-5">
            <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                className="w-full  h-full flex-1  focus:outline-none"
              >
                <option value="male">Select school</option>
                <option value="SchoolA">School A</option>
                <option value="SchoolB">School B</option>
                <option value="SchoolC">School C</option>
              </select>
            </p>
          </p>

          <p className="my-5">
            <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                className="w-full  h-full flex-1  focus:outline-none"
              >
                <option value="male">Select class</option>
                <option value="ClassA">Class A</option>
                <option value="ClassB">Class B</option>
                <option value="ClassC">Class C</option>
              </select>
            </p>
          </p>

          <p className="my-5">
            <Button>Continue</Button>
          </p>
        </form>
      </div>
    </div>
  );
};
