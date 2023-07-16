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
import { useRef, useState, ChangeEvent } from "react";
import { getProfileState } from "@/store/profileStore";
import useStore from "@/store/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { notifications } from "@mantine/notifications";
import { useUpdateProfile } from "@/api/queries";
import { getApiErrorMessage } from "@/api/helper";
import { Loader } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { querykeys } from "@/api/queries";

import {
  ChildNameModal,
  ChildAgeModal,
  SelectAvatar,
  WellDoneModal,
} from "@/pages/AfterParentSignIn/ChildProfileSetUp";
import { STEP_1, STEP_2, STEP_3, STEP_4 } from "@/utils/constants";
import { motion } from "framer-motion";
import { useGetProfile } from "@/api/queries";

const MyKids = () => {
  const [profile] = useStore(getProfileState);
  const [currentStep, setCurrentStep] = useState<number | null>(STEP_1);
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const { isLoading, refetch } = useGetProfile();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Modal
          padding="xm"
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
              showGoBackIcon={false}
              setName={setName}
            />
          )}
          {currentStep === STEP_2 && (
            <ChildAgeModal
              onContinue={() => setCurrentStep(STEP_3)}
              goBack={() => setCurrentStep(currentStep - 1)}
              setAge={setAge}
            />
          )}
          {currentStep === STEP_3 && (
            <SelectAvatar
              onContinue={() => setCurrentStep(STEP_4)}
              goBack={() => setCurrentStep(currentStep - 1)}
              age={age}
              name={name}
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

        <div className="px-4 ">
          <div className="flex justify-between items-center">
            <h1 className="text-[30px] font-bold my-8">My Kids</h1>
            <Button
              onClick={() => {
                open(), setCurrentStep(STEP_1);
              }}
              size="md"
            >
              <p className="flex gap-2 py-1">
                <img loading="lazy" src={Kidmeme} alt="meme" />
                <span>Create new profile</span>
              </p>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-y-10 gap-x-28">
            {profile.map((item, index) => (
              <KidCard
                refetch={refetch}
                key={index}
                {...item}
                isLoading={isLoading}
              />
            ))}
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
  id,
  isLoading,
  refetch,
}: {
  image?: string;
  name?: string;
  age?: string;
  gender?: string;
  id?: number;
  isLoading?: boolean;
  refetch: () => void;
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
        size="lg"
        opened={openedEditModal}
        onClose={closeEditModal}
        closeButtonProps={{
          size: "xl",
        }}
        centered
      >
        <EditProfile
          refetch={refetch}
          id={id!}
          image={image!}
          name={name!}
          dob={age!}
          closeModal={closeEditModal}
        />
      </Modal>
      <Modal
        radius={"xl"}
        size="lg"
        opened={openedConnectModal}
        onClose={closeConnectModal}
        closeButtonProps={{
          size: "xl",
        }}
        centered
      >
        <ConnectTOSchool />
      </Modal>

      <div className=" relative flex border border-gray-300 px-6 py-6 rounded-3xl">
        <div>
          {isLoading ? (
            <span>
              Loading........
              <Loader color="white" size={"lg"} />
            </span>
          ) : (
            <img
              loading="lazy"
              src={image}
              alt="avatar"
              className="w-[100px] h-[100px] object-cover rounded-md"
            />
          )}
        </div>
        <div className="ml-3 mt-8">
          <h1 className="font-bold text-[16px] px-3 font-Recoleta">{name}</h1>
          <p className="text-gray-400 flex text-[15px] mt-4 ">
            <span className="border-l-gray-600 border-r-2 mr-4 px-3">
              Age - {age}
            </span>
            <span>Gender - {gender}</span>
          </p>
        </div>
        <div className="">
          <Menu>
            <Menu.Target>
              <span className="absolute  right-5 p-2 cursor-pointer">
                <img loading="lazy" src={DotIcon} alt="doticon" />
              </span>
            </Menu.Target>
            <Menu.Dropdown>
              <div className="flex flex-col absolute  bg-white top-[-40px]  w-52 left-3 py-4 rounded-2xl shadow-gray-400  box shadow-md ">
                <Menu.Item>
                  <button
                    onClick={openEditModal}
                    className="p-2 px-4   flex gap-2  justify-start items-center"
                  >
                    <img loading="lazy" src={PencilIcon} alt="pencil icon" />
                    <span>Edit profile</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={openConnectModal}
                    className="p-2 px-4  flex gap-2  justify-start items-center"
                  >
                    <img loading="lazy" src={LinkIcon} alt="link icon" />
                    <span> Connect school</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button className="p-2 px-4  flex gap-2  justify-start items-center">
                    <img loading="lazy" src={DeleteIcon} alt="delete icon" />
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

const EditProfile = ({
  id,
  image,
  name,
  dob,
  refetch,
  closeModal,
}: {
  id: number;
  image: string;
  name: string;
  dob: string;
  refetch: () => void;
  closeModal: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const { isLoading, mutate } = useUpdateProfile();
  const queryClient = useQueryClient();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files! && event.target.files[0]!;
    setSelectedFile(file);
    console.log(file);
    console.log("name", name, dob);
  };

  const handleButtonClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const schema: ZodType<FormData> = z.object({
    name: z
      .string()
      .min(4, { message: "School name must be at least 4 characters long" })
      .max(40, { message: "School name must not exceed 20 characters" }),
    gender: z
      .string()
      .min(4, { message: "Invalid gender" })
      .max(10, { message: "Invalid gender" }),
    dob: z
      .string()
      .min(4, { message: "Invalid DOB" })
      .max(20, { message: "Invalid DOB" }),
    file: z.string().url().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("hjbn bnbhjjhjkkj", data, selectedFile, id);
    mutate(
      {
        name: data.name!,
        age: data.dob!,
        image: selectedFile as File, // Changed the type here to `File`
        profile_id: `${id}`,
      },
      {
        onSuccess(data) {
          console.log("success", data.data.message);

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          queryClient.invalidateQueries({ queryKey: querykeys.profiles });
          refetch();
          closeModal();
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
    <div className="px-16">
      <h1 className="text-center font-Recoleta font-bold text-[32px] ">
        Edit Profile
      </h1>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 justify-end items-center">
          <img
            loading="lazy"
            src={!selectedFile ? image : URL.createObjectURL(selectedFile!)}
            alt="Avatar"
            className="h-[100px] w-[100px]  object-cover"
          />
          <span>Profile Picture</span>
        </p>
        <button onClick={handleButtonClick} className="text-blue-400">
          Upload picture
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit(submitData)}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <p className="my-2 mt-4">
            <label htmlFor="name" className="text-[12px] text-[#7E7E89]">
              Name
            </label>
            <InputFormat
              type="text"
              reg={register("name")}
              errorMsg={errors && errors?.name?.message}
              value={name}
            />
          </p>

          <p className="my-2 flex gap-4">
            <p className=" flex-grow">
              <label htmlFor="name" className="text-[12px] text-[#7E7E89]">
                Gender
              </label>
              <p className="border border-[#F3DAFF] py-3 px-8 rounded-full flex items-center gap-2 mt-1  mb-2 ">
                <select
                  id=""
                  className="w-full  h-full flex-1  focus:outline-none text-[14px]"
                  {...register("gender")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </p>
              <span className="text-red-700">
                {errors && errors?.gender?.message}
              </span>
            </p>

            <p className=" flex-grow">
              <label htmlFor="dob" className="text-[12px] text-[#7E7E89]">
                DOB
              </label>
              <InputFormat
                type="date"
                reg={register("dob")}
                errorMsg={errors && errors?.dob?.message}
                value={dob!}
              />
            </p>
          </p>

          <p className="my-2">
            <label htmlFor="school" className="text-[12px] text-[#7E7E89]">
              School
            </label>
            <InputFormat type="text" />
          </p>
          <p className="my-2 flex gap-4">
            <p className="flex-grow">
              <label htmlFor="class" className="text-[12px] text-[#7E7E89]">
                Class
              </label>
              <InputFormat type="text" />
            </p>
            <p className="flex-grow">
              <label htmlFor="teacher" className="text-[12px] text-[#7E7E89]">
                Teacher
              </label>
              <InputFormat type="text" />
            </p>
          </p>
          <p className="my-5">
            <Button type="submit">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

const ConnectTOSchool = () => {
  return (
    <div className="px-16">
      <h1 className="text-center font-Recoleta font-bold text-[30px] ">
        Connect to school
      </h1>

      <p className="text-center my-5">
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
            <p className="border border-[#F3DAFF] py-3 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                className="w-full  h-full flex-1  focus:outline-none text-[14px]"
              >
                <option value="male">Select school</option>
                <option value="SchoolA">School A</option>
                <option value="SchoolB">School B</option>
                <option value="SchoolC">School C</option>
              </select>
            </p>
          </p>

          <p className="my-5">
            <p className="border border-[#F3DAFF] py-3 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                className="w-full  h-full flex-1  focus:outline-none text-[14px]"
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
