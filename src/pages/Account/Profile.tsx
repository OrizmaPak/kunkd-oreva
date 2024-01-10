import EditPencil from "@/assets/editPencil.svg";
import Button from "@/components/Button";
// import Starr from "@/assets/starr.svg";
import SchoolLogo from "@/assets/schoolIcon.svg";
import SchoolBg from "@/assets/schoolImage.svg";
import { motion } from "framer-motion";
// import { userContext } from "@/Context/StateProvider";
import BigPencil from "@/assets/bigeditingpencil.svg";
import CameraIcon from "@/assets/cameraIcon.svg";
import CopyIcon from "@/assets/copyIcon.svg";
import EditIcon from "@/assets/editPencil.svg";
// import Teacher01 from "@/assets/teacher01.svg";
import InputFormat from "@/common/InputFormat";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import UploadPicture from "../DashBoard/SchoolDashBoard/Teachers/UploadPicture";
import DragIcon from "@/assets/draganddropicon.svg";

// import { getProfileState } from "@/store/profileStore";
// import { UseFormRegisterReturn } from "react-hook-form";

// import useStore from "@/store/index";
import { getApiErrorMessage } from "@/api/helper";
import {
  useUpdateParentImage,
  useUpdateParentProfile,
  useUpdateSchImage,
  useUpdateSchoolNameAddress,
  useUpdateSchProfile,
} from "@/api/queries";
import DeleteIcon from "@/assets/delIcon.svg";
import UplaodIcon from "@/assets/uplaodIcon.svg";
import { FormData } from "@/common/User/FormValidation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
// import { FileWithPath } from "@mantine/dropzone";
import { TUser } from "@/api/types";

const Profile = () => {
  const [parentEditMode, setParentEditMode] = useState(false);
  const [teacherEditMode, setTeacherEditMode] = useState(false);
  const [schEditMode, setSchEditMode] = useState(false);
  const [user, ,] = useStore(getUserState);
  console.log("____RealUser______", user);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="px-4 ">
          <h1 className="text25 font-bold my-8 font-Hanken">Profile</h1>

          {user?.role === "teacher" && (
            <>
              <PTCard user={user} />
              {teacherEditMode ? (
                <EditTeacherPersonalInfomation
                  onSave={() => setTeacherEditMode(false)}
                  user={user}
                />
              ) : (
                <TeacherPersonalInfomation
                  user={user}
                  openEdit={() => setTeacherEditMode(true)}
                />
              )}
            </>
          )}
          {user?.role === "schoolAdmin" && (
            <>
              <SchCard user={user} />
              {schEditMode ? (
                <EditSchoolPersonalInfomation
                  onSave={() => setSchEditMode(false)}
                  user={user}
                />
              ) : (
                <SchoolPersonalInfomation
                  user={user}
                  openEdit={() => setSchEditMode(true)}
                />
              )}
            </>
          )}
          {user?.role === "user" && (
            <>
              <PTCard user={user} />
              {parentEditMode ? (
                <EditParentPersonalInfomation
                  onSave={() => setParentEditMode(false)}
                  {...user}
                />
              ) : (
                <ParentPersonalInfomation
                  user={user}
                  openEdit={() => setParentEditMode(true)}
                />
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Profile;

const PTCard = ({ user }: { user: TUser; onclick?: () => void }) => {
  const { isLoading, mutate } = useUpdateParentImage();
  const [, setUser] = useStore(getUserState);
  // const [edit, setEdit] = useState(false);

  // const [uploadType, ,] = useState<"profileImage" | "backgroundImage" | null>(
  //   null
  // );

  const handleSubmit = (data: File) => {
    // if (!uploadType) return;
    console.log("I'm getting it", data);
    mutate(
      {
        image: data as Blob | string,
        // backgroundImage: "",
      },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          setUser({ ...user, user_image: data?.data?.data?.image });

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          // queryClient.invalidateQueries({ queryKey: querykeys.profiles });
          // refetch();
          close();
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

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        radius={10}
        size="xl"
        opened={opened}
        onClose={close}
        closeButtonProps={{
          size: "xl",
        }}
        centered
      >
        <UploadPicture
          handleSubmit={handleSubmit}
          // toggle={close}
          isLoading={isLoading}
          btnTitle="Done"
        />
      </Modal>
      <div className="flex justify-between p-6 border-[3px] border-[#FBECFF]  rounded-3xl">
        <div className="flex justify-center items-center gap-14 relative ">
          <img
            onClick={() => open()}
            loading="lazy"
            src={user?.user_image || DragIcon}
            alt="image"
            className="w-[164px] h-[164px] rounded-full object-cover"
          />
          <img
            onClick={() => open()}
            loading="lazy"
            src={BigPencil}
            alt="pencil"
            className="absolute left-[65px]"
          />
          <p>
            <p className="font-bold text25 text-[28px]  font-Hanken">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-[#B5B5C3] text-[16px] font-Hanken ">
              {user?.email}
            </p>
          </p>
        </div>
        <div className="flex justify-center items-center">
          {/* <Button size="md">
          <p className="flex justify-center items-center gap-2">
            <img loading="lazy" src={Starr} alt="starr" />
            <span>Upgrade Plan</span>
          </p>
        </Button> */}
        </div>
      </div>
    </>
  );
};

const ParentPersonalInfomation = ({
  user,
  openEdit,
}: {
  user: TUser;

  openEdit: () => void;
}) => {
  return (
    <div className="p-6 border-[3px] border-[#FBECFF]   rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold font-Hanken text-[16px]">
          Personal Information
        </h1>
        <Button onClick={openEdit} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img
              loading="lazy"
              src={EditPencil}
              alt="pencil"
              className="w-[15px]"
            />{" "}
            <span className="text-[#8530C1] text-[14px] font-Hanken">Edit</span>
          </p>
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] my-1 text3 text-[12px] font-Hanken text-[#B5B5C3]">
        <span>First Name</span>
        <span>Last Name</span>
        <span>Email</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] text3 mb-4 text-[14px] font-Hanken font-medium">
        <span>{user?.firstname}</span>
        <span>{user?.lastname}</span>
        <span>{user?.email}</span>
      </div>
    </div>
  );
};

const SchoolPersonalInfomation = ({
  // contactName,
  user,
  openEdit,
}: {
  user: TUser;
  openEdit: () => void;
}) => {
  // const [user, ,] = useStore(getUserState);
  return (
    <div className="p-6 border-[3px] border-[#FBECFF]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={openEdit} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img loading="lazy" src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1] text3">Edit</span>
          </p>
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] my-1 text3 text-[#B5B5C3]">
        <span>Contact Name</span>
        <span>Email</span>
        <span>Address</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] text3 mb-4 text-[14px]">
        <span>{user?.school?.contact_name}</span>
        <span>{user?.email}</span>
        <span>{user?.school?.address}</span>
      </div>
    </div>
  );
};

const TeacherPersonalInfomation = ({
  user,
  openEdit,
}: {
  user: TUser;
  openEdit: () => void;
}) => {
  return (
    <div className="p-6 border-[3px] border-[#FBECFF]   rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={openEdit} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img loading="lazy" src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1]">Edit</span>
          </p>
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] my-1 text3 text-[#B5B5C3]">
        <span>First Name</span>
        <span>Last Name</span>
        <span>Email</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] text3 mb-4 text-[14px]">
        <span>{user?.firstname}</span>
        <span>{user?.lastname}</span>
        <span>{user?.email}</span>
      </div>
    </div>
  );
};

const SchCard = ({ user }: { user: TUser }) => {
  const { isLoading, mutate } = useUpdateSchImage();
  const [edit, setEdit] = useState(false);
  const [, setUser] = useStore(getUserState);
  const [uploadType, setUploadType] = useState<
    "profileImage" | "backgroundImage" | null
  >(null);

  const handleSubmit = (data: File) => {
    if (!uploadType) return;
    mutate(
      {
        [uploadType]: data as Blob | string,
        // backgroundImage: "",
      },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          setUser({
            ...user,
            school: {
              ...user?.school,
              backgroundImage: data.data.data.background_image,
              profileImage: data.data.data.profile_image,
            },
          });

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          // queryClient.invalidateQueries({ queryKey: querykeys.profiles });
          // refetch();
          close();
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

  const [opened, { open, close }] = useDisclosure(false);

  const [textToCopy] = useState(user?.school?.code as string);

  const handleCopy = () => {
    // Create a new textarea element to hold the text
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    // Execute the copy command
    document.execCommand("copy");

    // Remove the textarea element from the DOM
    document.body.removeChild(textarea);
    notifications.show({
      title: `Notification`,
      message: "Coppied",
    });
  };

  return (
    <div>
      <Modal
        radius={10}
        size="xl"
        opened={opened}
        onClose={close}
        closeButtonProps={{
          size: "xl",
        }}
        centered
      >
        <UploadPicture
          handleSubmit={handleSubmit}
          // toggle={close}
          isLoading={isLoading}
          btnTitle="Done"
        />
      </Modal>
      <div className="relative">
        <img
          loading="lazy"
          src={
            user?.school?.backgroundImage
              ? user?.school?.backgroundImage
              : SchoolBg
          }
          alt="schbg"
          className="w-[100%] h-[300px] object-cover rounded-xl"
        />
        <img
          onClick={() => {
            setUploadType("backgroundImage");
            open();
          }}
          src={CameraIcon}
          alt="camera"
          className="absolute top-8 right-10"
        />
        <span
          // onClick={open}
          className="absolute p-4 bg-white rounded-full bottom-[-100px] left-12"
        >
          <Menu>
            <Menu.Target>
              <span className=" bg-[#b9b9b9] z-50 rounded-full flex justify-center items-center relative  ">
                <img
                  loading="lazy"
                  src={
                    user?.school?.profileImage
                      ? user?.school?.profileImage
                      : SchoolLogo
                  }
                  alt=""
                  className="w-[180px] h-[180px] object-containe rounded-full "
                />
                <img
                  loading="lazy"
                  src={BigPencil}
                  alt="pencil"
                  className="absolute"
                />
              </span>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  open();
                  setUploadType("profileImage");
                }}
              >
                <p className="flex items-center gap-2 text3">
                  <img src={UplaodIcon} alt="Icon" className="inline" /> Upload
                  <span> new profile picture</span>
                </p>
              </Menu.Item>
              <hr />
              <Menu.Item>
                <p className="flex  items-center gap-2 text-red-500">
                  <img src={DeleteIcon} alt="Icon" className="inline" />
                  <span className="text3">Delete picture</span>
                </p>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </span>
      </div>
      <div className="pl-[270px] flex justify-between mt-2  ">
        <div className="w-[300px]">
          {!edit ? (
            <SchNameAddress user={user} setEdit={setEdit} />
          ) : (
            <EditSchNameAddress
              schoolName={user?.school?.contact_name as string}
              schoolAddress={user?.school?.address as string}
              setEdit={setEdit}
            />
          )}
          {/* <h1 className="font-bold text-[28px] flex gap-4">
            {schname} <img loading="lazy" src={EditIcon} alt="editIcon" />
          </h1>
          <span className="text-[16px] text-[#B5B5C3]">{city}</span> */}
        </div>
        <div className="pr-5 pt-2">
          <p className="flex gap-3 justify-center items-baseline">
            School code:
            <p className="font-bold text-[23px] pt-1">
              {user?.school?.code as string}
            </p>
            <img
              loading="lazy"
              onClick={handleCopy}
              src={CopyIcon}
              alt="copyIcon"
              className=" cursor-pointer"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

const SchNameAddress = ({
  user,
  setEdit,
}: {
  user: TUser;
  setEdit: (val: boolean) => void;
}) => {
  return (
    <>
      <h1 className="font-bold text-[28px] flex gap-4">
        {user?.school?.name}
        <img
          loading="lazy"
          onClick={() => setEdit(true)}
          src={EditIcon}
          alt="editIcon"
          className=" cursor-pointer"
        />
      </h1>
      <span className="text-[16px] text-[#B5B5C3]">
        {user?.school?.address}
      </span>
    </>
  );
};

const EditSchNameAddress = ({
  schoolName,
  schoolAddress,
  setEdit,
}: {
  schoolName: string;
  schoolAddress: string;
  setEdit: (val: boolean) => void;
}) => {
  const schema: ZodType<FormData> = z.object({
    school_name: z
      .string()
      .min(4, { message: "School name must be at least 4 characters long" })
      .max(50, { message: "School name must not exceed 50 characters" }),
    address: z
      .string()
      .min(11, { message: "Address  must be at least 4 characters long" })
      .max(50, { message: "Address must not exceed 50 characters" }),
  });

  const [user, setUser] = useStore(getUserState);
  const { mutate, isLoading } = useUpdateSchoolNameAddress();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  console.log("errors", errors);

  const submitData = async (data: FormData) => {
    // console.log("testing");
    // console.log("It is working", data);
    mutate(
      {
        ...user?.school,
        school_name: data.school_name as string,
        address: data.address as string,
      },

      {
        onSuccess(data) {
          console.log("success", data.data.data);
          setUser({
            ...user,
            school: {
              ...user?.school,
              name: data?.data?.data?.name,
              address: data?.data?.data?.address,
            },
            address: data?.data?.data?.address,
          });
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          // onSave();
          setEdit(false);
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
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <InputFormat
          reg={register("school_name")}
          errorMsg={errors.post_code?.message}
          smallPadding="true"
          type="text"
          value={schoolName}
        />
        <p className="mt-4">
          <InputFormat
            reg={register("address")}
            errorMsg={errors.post_code?.message}
            smallPadding="true"
            type="text"
            value={schoolAddress}
          />
        </p>
        <p className="mt-4">
          <Button type="submit" size="sm" varient="outlined">
            <p className="gap-4 flex">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="blue" size="sm" />
                </p>
              ) : (
                <span className="text-[#8530C1] text3">Save</span>
              )}
            </p>
          </Button>
        </p>
      </form>
      {/* <h1 className="font-bold text-[28px] flex gap-4">
        {schoolName} <img loading="lazy" src={EditIcon} alt="editIcon" />
      </h1>
      <span className="text-[16px] text-[#B5B5C3]">{schoolAddress}</span> */}
    </>
  );
};

const EditParentPersonalInfomation = ({
  firstname,
  lastname,

  onSave,
}: {
  firstname?: string;
  lastname?: string;

  onSave: () => void;
}) => {
  const { mutate, isLoading } = useUpdateParentProfile();
  const [user, setUser] = useStore(getUserState);

  const schema: ZodType<FormData> = z.object({
    firstname: z
      .string()
      .min(4, { message: "Contact name must be at least 4 characters long" })
      .max(20, { message: "First must not exceed 20 characters" }),
    lastname: z
      .string()
      .min(4, { message: "Contact name must be at least 4 characters" })
      .max(20, { message: "Last must not exceed 20 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  console.log("errors", errors);

  const submitData = async (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);
    mutate(
      {
        firstname: data.firstname as string,
        lastname: data.lastname as string,
      },

      {
        onSuccess(data) {
          console.log("success", data.data.data);
          setUser({
            ...user,
            firstname: data?.data?.data?.firstname,
            lastname: data?.data?.data?.lastname,
          });
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          onSave();
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
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text2">Personal Information</h1>
          <Button type="submit" size="sm" varient="outlined">
            {isLoading ? (
              <p className="flex justify-center items-center">
                <Loader color="blue" size="sm" />
              </p>
            ) : (
              <span className="text-[#8530C1] text3">Save</span>
            )}
          </Button>
        </div>
        <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] my-1  text-[#B5B5C3] text3">
          <span>First Name</span>
          <span>Last Name</span>
          {/* <span>Email</span> */}
        </div>
        <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] mb-4 text-[14px]">
          <InputFormat
            reg={register("firstname")}
            errorMsg={errors.firstname?.message}
            smallPadding="true"
            type="text"
            value={firstname}
          />
          <InputFormat
            reg={register("lastname")}
            errorMsg={errors.lastname?.message}
            smallPadding="true"
            type="text"
            value={lastname}
          />
          {/* <InputFormat
            reg={register("email")}
            errorMsg={errors.email?.message}
            smallPadding="true"
            type="text"
            value={email}
            readonly={true}
          /> */}
        </div>
      </form>
    </div>
  );
};

const EditTeacherPersonalInfomation = ({
  user,
  onSave,
}: {
  user: TUser;
  onSave: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text2">Personal Information</h1>
        <Button onClick={onSave} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img loading="lazy" src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1] text3">Save</span>
          </p>
        </Button>
      </div>
      <div className="grid gap-2 grid-cols-[1fr_1fr_1fr] my-1 text3 text-[#B5B5C3]">
        <span>First Name</span>
        <span>Last Name</span>
        <span>Email</span>
      </div>
      <div className="grid gap-2 grid-cols-[1fr_1fr_1fr] mb-4 text-[14px]">
        <InputFormat type="text" value={user?.firstname} />
        <InputFormat type="text" value={user?.lastname} />
        <InputFormat type="text" value={user?.email} />
      </div>
    </div>
  );
};

const EditSchoolPersonalInfomation = ({
  onSave,
  user,
}: {
  onSave: () => void;
  user: TUser;
}) => {
  const { mutate, isLoading } = useUpdateSchProfile();
  const [, setUser] = useStore(getUserState);
  const schema: ZodType<FormData> = z.object({
    contact_name: z
      .string()
      .min(4, { message: "Contact name must be at least 4 characters long" })
      .max(20, { message: "First must not exceed 20 characters" }),
    address: z
      .string()
      .min(4, { message: "Address  must be at least 4 characters long" })
      .max(50, { message: "Last name must not exceed 50 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  console.log("errors", errors);

  const submitData = async (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);
    mutate(
      {
        contact_name: data.contact_name as string,
        email: data.email as string,
        address: data.address as string,
      },

      {
        onSuccess(data) {
          console.log("success", data.data.data);
          setUser({
            ...user,
            school: {
              ...user?.school,
              address: data.data.data.address,
              contact_name: data?.data?.data?.contact_name,
            },
          });
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          onSave();
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
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text2">Personal Information</h1>
          <Button type="submit" size="sm" varient="outlined">
            <p className="gap-4 flex">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="blue" size="sm" />
                </p>
              ) : (
                <span className="text-[#8530C1]">Save</span>
              )}
            </p>
          </Button>
        </div>
        <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] my-1 text3 text-[#B5B5C3]">
          <span>Contact Name</span>
          <span>Email</span>
          <span>Address</span>
        </div>
        <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] mb-4 text-[14px]">
          <InputFormat
            reg={register("contact_name")}
            errorMsg={errors.contact_name?.message}
            smallPadding="true"
            type="text"
            value={user?.school?.contact_name}
          />
          <InputFormat
            smallPadding="true"
            type="text"
            value={user?.email}
            readonly={true}
          />
          <InputFormat
            reg={register("address")}
            errorMsg={errors.address?.message}
            smallPadding="true"
            type="text"
            value={user?.school?.address}
          />
        </div>
      </form>
    </div>
  );
};

// type TCountry = {
//   id: number;
//   name: string;
// };
// const CustomSelectInput = ({
//   data,
//   reg,
// }: {
//   data: TCountry[];
//   reg?: UseFormRegisterReturn;
// }) => {
//   // console.log(data);
//   return (
//     <div className="px-2 border-[#F3DAFF]  rounded-full  items-center gap-2 mt-1 flex justify-center sssss  border">
//       <select {...reg} className="border-0 w-full">
//         {data &&
//           data.map((country, index) => (
//             <option key={index} value={`${country.id}`}>
//               {country.name}
//             </option>
//           ))}
//       </select>
//     </div>
//   );
// };
