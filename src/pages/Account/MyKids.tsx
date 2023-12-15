import { getApiErrorMessage } from "@/api/helper";
import {
  querykeys,
  useConnectStudentData,
  useGetSchool,
  useGetSchoolProfileForStudent,
  useUpdateProfile
} from "@/api/queries";
import PencilIcon from "@/assets/blackPencilIcon.svg";
import DotIcon from "@/assets/dotIcon.svg";
import Kidmeme from "@/assets/kidmeme.svg";
import LinkIcon from "@/assets/linkIcon.svg";
import DeleteIcon from "@/assets/redDeleteIcon.svg";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PiStudent } from "react-icons/pi";
import { ZodType, z } from "zod";
import { Tclass } from "../DashBoard/SchoolDashBoard/Teachers/AddTeacherForm";

import { useGetProfile } from "@/api/queries";
import useDebounce from "@/hooks/useDebounce";
import {
  ChildAgeModal,
  ChildNameModal,
  SelectAvatar,
  WellDoneModal,
} from "@/pages/AfterParentSignIn/ChildProfileSetUp";
import { STEP_1, STEP_2, STEP_3, STEP_4 } from "@/utils/constants";
import { Skeleton } from "@mantine/core";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { MdClose } from "react-icons/md";

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
          radius={10}
          // closeOnClickOutside={false}
          withCloseButton={false}
        >
          {currentStep === STEP_1 && (
            <ChildNameModal
              onContinue={() => setCurrentStep(STEP_2)}
              goBack={() => currentStep - 1}
              showGoBackIcon={false}
              setName={setName}
              close={() => close()}
              showCancelBtn={true}
            />
          )}
          {currentStep === STEP_2 && (
            <ChildAgeModal
              onContinue={() => setCurrentStep(STEP_3)}
              goBack={() => setCurrentStep(currentStep - 1)}
              setAge={setAge}
              close={() => close()}
              showCancelBtn={true}
            />
          )}
          {currentStep === STEP_3 && (
            <SelectAvatar
              onContinue={() => setCurrentStep(STEP_4)}
              goBack={() => setCurrentStep(currentStep - 1)}
              age={age}
              name={name}
              close={() => close()}
              showCancelBtn={true}
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
          <div className="grid grid-cols-2 gap-y-10 gap-x-4">
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

type TStudent = {
  assigned_teacher_id?: number;
  assigned_teacher_name?: string;
  class_id?: number;
  class_name?: string;
  school_id?: number;
  school_name?: string;
  status?: string;
};

const KidCard = ({
  image,
  name,
  dob,
  student,
  id,
  isLoading,
  refetch,
}: {
  image?: string;
  name?: string;
  dob?: string;
  id?: number;
  student?: TStudent;
  isLoading?: boolean;
  refetch: () => void;
}) => {
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [openedSchModal, { open: openSchModal, close: closeSchModal }] =
    useDisclosure(false);
  const [
    openedConnectModal,
    { open: openConnectModal, close: closeConnectModal },
  ] = useDisclosure(false);

  const year = dob?.split("-")[0];
  const date = new Date();
  const currentYear = date.getFullYear();
  const childaAge = currentYear - Number(year);
  console.log("Student=----------",student);
  return (
    <>
      <Modal
        radius={10}
        size="lg"
        px="md"
        opened={openedEditModal}
        onClose={closeEditModal}
        withCloseButton={false}
        centered
      >
        <EditProfile
          refetch={refetch}
          id={id as number}
          image={image as string}
          name={name as string }
          dob={dob as string}
          closeModal={closeEditModal}
        />
      </Modal>
      <Modal
        radius={10}
        size="lg"
        opened={openedConnectModal}
        onClose={closeConnectModal}
        withCloseButton={false}
        centered
      >
        <ConnectTOSchool profileId={id as number} closeModal={closeConnectModal} />
      </Modal>
      <Modal
        radius={10}
        size="md"
        px="md"
        opened={openedSchModal}
        onClose={closeSchModal}
        withCloseButton={false}
        centered
      >
        <SchoolProfile student={student as TStudent} closeSchModal={closeSchModal} />
      </Modal>

      <div className=" relative flex  border-[#FBECFF] border-[2px] px-6 py-6 rounded-3xl">
        <div>
          {isLoading ? (
            <span>
              <Skeleton height={100} circle mb="xl" />
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
          <h1 className="font-bold text-[16px] px-3 font-Recoleta">
            {name && name?.charAt(0)?.toUpperCase() + name?.slice(1)}
          </h1>
          <p className="text-gray-400 flex text2 mt-4 ">
            <span className="border-l-gray-600 border-r-2 mr-4 px-3">
              Age - {childaAge}
            </span>
            <div>
              {" "}
              {student?.status === "approved" ? (
                <button
                  onClick={openSchModal}
                  className="text2 flex gap-1 justify-center items-center mt-1"
                >
                  <PiStudent size={25} color="#8530C1" />
                  <p className="text2 text-[#8530C1]"> View School Info</p>
                </button>
              ) : student?.status === "declined" ? (
                <button
                  onClick={openConnectModal}
                  className=" mt-1 flex justify-center items-center gap-2 bg-[#FEF3F2] px-2 py-1 rounded-2xl"
                >
                  <p className="h-2 w-2 rounded-full bg-[#F04438]"></p>
                  <p className="text2  text-[#B42318]">Request declined</p>
                </button>
              ) : student?.status === "pending" && student?.school_name?.length as number > 0 ? (
                <button className="mt-1 flex justify-center items-center gap-2 bg-[#FFFAEB] px-2 py-1 rounded-2xl">
                  <span className="h-2 w-2 rounded-full bg-[#F79009]"></span>
                  <span className="text2  text-[#B54708]">Request Pending</span>
                </button>
              ) : (
                <button
                  onClick={openConnectModal}
                  className="text2 flex gap-1 justify-center items-center  mt-1"
                >
                  <img loading="lazy" src={LinkIcon} alt="link icon" />
                  <p className="text2 text-[#8530C1]">Connect to School</p>
                </button>
              )}
            </div>
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
                    <span className="text3">Edit profile</span>
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button className="p-2 px-4  flex gap-2  justify-start items-center">
                    <img loading="lazy" src={DeleteIcon} alt="delete icon" />
                    <span className="text3"> Remove profile</span>
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
  const files = event.target.files as FileList;
  const file = files && files[0];
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
    dob: z
      .string().optional(),
    file: z.string().url().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    mutate(
      {
        name: data.name as string,
        age: data.dob as string,
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
    <div className="px-5 py-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-center font-Recoleta font-bold text30  flex-grow">
          Edit Profile
        </h1>
        <MdClose size={35} onClick={closeModal} className="cursor-pointer" />
      </div>
      <div className="px-10">
        <div className="flex justify-between items-center ">
          <p className="flex gap-2 justify-end items-center">
            <img
              loading="lazy"
              src={!selectedFile ? image : URL.createObjectURL(selectedFile as Blob)}
              alt="Avatar"
              className="h-[100px] w-[100px]  object-cover"
            />
            <span className="text3">Profile Picture</span>
          </p>
          <button onClick={handleButtonClick} className="text-blue-400 text3">
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
              <label htmlFor="name" className="text3 text-[#7E7E89]">
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
              {/* <p className=" flex-grow">
                <label htmlFor="name" className="text3 text-[#7E7E89]">
                  Gender
                </label>
                <p className="border border-[#F3DAFF] py-3 px-8 rounded-full flex items-center gap-2 mt-1  mb-2 ">
                  <select
                    id=""
                    className="w-full  h-full flex-1  focus:outline-none text-[14px]"
                    {...register("genderid")}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </p>
                <span className="text-red-700">
                  {errors && errors?.genderid?.message}
                </span>
              </p> */}

              <p className=" flex-grow">
                <label htmlFor="dob" className="text3 text-[#7E7E89]">
                  DOB
                </label>
                <InputFormat
                  type="date"
                  reg={register("dob")}
                  errorMsg={errors && errors?.dob?.message}
                  value={dob as string}
                />
              </p>
            </p>
            {/* 
          <p className="my-2">
            <label htmlFor="school" className="text-[12px] text-[#7E7E89]">
              School
            </label>
            <InputFormat type="text" />
          </p> */}
            {/* <p className="my-2 flex gap-4">
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
          </p> */}
            <p className="my-5">
              <Button type="submit">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="text2">Save</span>
                )}
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// type TSchools = {
//   id: number;
//   name: string;
//   slug: string;
//   classes: [];
// };

const ConnectTOSchool = ({
  closeModal,
  profileId,
}: {
  closeModal: () => void;
  profileId: number;
}) => {
  const { mutate, isLoading } = useConnectStudentData();
  const { data: schoolData } = useGetSchool();
   const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  console.log("God Help me", search)
  const {data:schoolCurData} = useGetSchoolProfileForStudent(debounceValue)
  const  schData = schoolCurData?.data?.data
  console.log("schoolCurData", schoolCurData?.data.data)

  // const profileId = localStorage.getItem("profileId");
  console.log("Profile", profileId);
  const schoolList = schoolData?.data.data.records;
  console.log(schoolList);
  const queryClient = useQueryClient();


  const schema: ZodType<FormData> = z.object({
    firstname: z
      .string()
      .min(4, { message: "First name must be at least 4 characters long" })
      .max(40, { message: "First name must not exceed 20 characters" }),
    lastname: z
      .string()
      .min(4, { message: "Last name must be at least 4 characters long" })
      .max(40, { message: "Last name must not exceed 20 characters" }),
   
    classid: z
      .string()
      .min(1, { message: "Select a class" })
      .max(20, { message: "invalid class id" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("TeacherDta", data);
    mutate(
      {
        profile_id: Number(profileId),
        firstname: data.firstname,
        lastname: data.lastname,
        school_id: schData?.id,
        class_id: Number(data?.classid),
      },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          closeModal();
          queryClient.invalidateQueries({ queryKey: querykeys.profiles });
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
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
    <div className="px-4">
      <div className="flex justify-between items-center  ">
        <h1 className="text-center font-Recoleta font-bold text-[30px] flex-grow ">
          Connect to school
        </h1>
        <MdClose size={35} onClick={closeModal} className="cursor-pointer" />
      </div>
      <p className="text-center my-5">
        Connect your child to his/her school to enjoy...
      </p>
      <div className="px-10">
        <form onSubmit={handleSubmit(submitData)}>
          <p className="my-5">
            <InputFormat
              reg={register("firstname")}
              errorMsg={errors?.firstname?.message}
              type="text"
              placeholder="First name"
            />
          </p>
          <p className="my-5">
            <InputFormat
              reg={register("lastname")}
              errorMsg={errors?.lastname?.message}
              type="text"
              placeholder="Last name"
            />
          </p>
          <p className="my-5">
            <InputFormat
              // reg={register("schoolCode")}
              // errorMsg={errors?.schoolCode?.message}
              onChange={e => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="School Code"
            />
          </p>

          <p className="my-5">
            <p className="border border-[#F3DAFF] py-2 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              {schData?.name ? schData?.name : "School Name"}
              {/* <InputFormat
              // disabled={true}
              reg={register("school_name")}
              errorMsg={errors?.school_name?.message}
              value={schData?.name}
              type="text"
              placeholder="Last name"
            /> */}
            </p>
          </p>

          <p className="my-5">
            <p className="border border-[#F3DAFF] py-3 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                
                {...register("classid")}
                name="classid"
                id="classid"
                className="w-full  h-full flex-1  focus:outline-none text-[14px]"
              >
                <option value="">Select class</option>
                {schData?.classes?.length > 0 &&
                  schData?.classes?.map((classs: Tclass, index: number) => (
                    <option key={index} value={classs.id}>
                      {classs.name}
                    </option>
                  ))}
              </select>
            </p>
          </p>

          <p className="my-5">
            <Button type="submit">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

const SchoolProfile = ({
  student,
  closeSchModal,
}: {
  student: TStudent;
  closeSchModal: () => void;
}) => {
  return (
    <div className="px-10">
      <div className="flex  justify-between items-center">
        <p className="text25 text-center font-semibold flex-grow ">
          School information
        </p>
        <button onClick={closeSchModal}>
          <AiOutlineClose size={25} />
        </button>
      </div>
      <p className="my-5">
        <label htmlFor="school">School</label>
        <InputFormat
          value={student?.school_name}
          type="text"
          readonly={true}
          placeholder="First name"
        />
      </p>
      <div>
        <p className="my-5">
          <label htmlFor="school">Class</label>
          <InputFormat
            value={student?.class_name}
            type="text"
            readonly={true}
            placeholder="First name"
          />
        </p>
        <p className="my-5">
          <label htmlFor="school">Teacher</label>
          <InputFormat
            value={student?.assigned_teacher_name}
            type="text"
            readonly={true}
            placeholder="First name"
          />
        </p>
      </div>
    </div>
  );
};
