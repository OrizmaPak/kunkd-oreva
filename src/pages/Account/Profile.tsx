import Button from "@/components/Button";
import EditPencil from "@/assets/editPencil.svg";
import Starr from "@/assets/starr.svg";
import { motion } from "framer-motion";
import SchoolBg from "@/assets/schoolImage.svg";
import SchoolLogo from "@/assets/schoolIcon.svg";
import { userContext } from "@/Context/StateProvider";
import EditIcon from "@/assets/editPencil.svg";
import CameraIcon from "@/assets/cameraIcon.svg";
import CopyIcon from "@/assets/copyIcon.svg";
import UploadPicture from "../DashBoard/SchoolDashBoard/Teachers/UploadPicture";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Teacher01 from "@/assets/teacher01.svg";
import BigPencil from "@/assets/bigeditingpencil.svg";
import InputFormat from "@/common/InputFormat";

const parentData = {
  image: Teacher01,
  name: "Mitchel Mccarthy ",
  email: " mitchelmccarty@gmail.com",
  phone: "+1442023052906",
  country: "United Kingdom",
  city: "Leeds East london",
};
const teacherData = {
  image: Teacher01,
  name: "Mitchel Mccarthy ",
  email: " mitchelmccarty@gmail.com",
  phone: "+1442023052906",
};

// const data2 = {
//   image: SamOwen,
//   name: "Samuel Owen",
//   email: "samuelowen@gmail.com",
//   phone: "+1442023052906",
//   country: "United Kingdom",
//   city: "Leeds East london",
// };

const schData = {
  schbg: SchoolBg,
  schname: "Kunda kids",
  schlogo: SchoolLogo,
  schcode: 2345,
  country: "United Kingdom",
  city: "Leeds East london",
  contactName: "Mikel Daniel",
  phone: "+44 2023052905",
  email: "info@akunda.school",
  postCode: "ABC 1234",
  taxId: "ABC1234",
};

const Profile = () => {
  const [{ userType }] = userContext();
  const [openedSch, { open: openSch, close: closeSch }] = useDisclosure(false);
  const [openedTeacher, { open: openTeacher, close: closeTeacher }] =
    useDisclosure(false);
  const [openedParent, { open: openParent, close: closeParent }] =
    useDisclosure(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Modal
          opened={openedSch}
          onClose={closeSch}
          centered
          size="lg"
          radius={"xl"}
          closeButtonProps={{
            size: "xl",
          }}
        >
          <EditSchPersonalInfo />
        </Modal>
        <Modal
          opened={openedTeacher}
          onClose={closeTeacher}
          centered
          size="lg"
          radius={"xl"}
          closeButtonProps={{
            size: "xl",
          }}
        >
          <EditTeacherPersonalInfo />
        </Modal>
        <Modal
          opened={openedParent}
          onClose={closeParent}
          centered
          size="lg"
          radius={"xl"}
          closeButtonProps={{
            size: "xl",
          }}
        >
          <EditParentPersonalInfo />
        </Modal>

        <div className="px-4 ">
          <h1 className="text-[30px] font-bold my-8 font-Hanken">Profile</h1>

          {userType === "teacher" && (
            <>
              <PTCard {...teacherData} />
              <TeacherPersonalInfomation {...teacherData} open={openTeacher} />
            </>
          )}
          {userType === "school" && (
            <>
              <SchCard {...schData} />
              <SchoolPersonalInfomation {...schData} open={openSch} />
            </>
          )}
          {userType === "parent" && (
            <>
              <PTCard {...parentData} />
              <ParentPersonalInfomation {...parentData} open={openParent} />
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Profile;

const PTCard = ({
  image,
  email,
  name,
}: {
  image?: string;
  name?: string;
  email?: string;
  onclick?: () => void;
}) => {
  return (
    <div className="flex justify-between p-6 border border-[#8530C1]  rounded-3xl">
      <div className="flex justify-center items-center gap-14 relative ">
        <img loading="lazy" src={image} alt="image" className="w-[150px]" />
        <img
          loading="lazy"
          src={BigPencil}
          alt="pencil"
          className="absolute left-[65px]"
        />
        <p>
          <p className="font-bold text-[28px] font-Recoleta">{name}</p>
          <p className="text-[#B5B5C3] text-[16px]">{email}</p>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Button size="md">
          <p className="flex justify-center items-center gap-2">
            <img loading="lazy" src={Starr} alt="starr" />
            <span>Upgrade Plan</span>
          </p>
        </Button>
      </div>
    </div>
  );
};

const ParentPersonalInfomation = ({
  name,
  phone,
  email,
  country,
  city,
  open,
}: {
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  open: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={open} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img loading="lazy" src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1]">Edit</span>
          </p>
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] my-1 text-[12px] text-[#B5B5C3]">
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mb-4 text-[14px]">
        <span>{name}</span>
        <span>{phone}</span>
        <span>{email}</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] text-[#B5B5C3] text-[12px] mt-5">
        <span>Country</span>
        <span>City/Sate</span>
        <span></span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mb-5 text-[14px]">
        <span>{country}</span>
        <span>{city}</span>
        <span></span>
      </div>
    </div>
  );
};

const SchoolPersonalInfomation = ({
  contactName,
  phone,
  email,
  country,
  city,
  postCode,
  taxId,
  open,
}: {
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  contactName?: string;
  postCode?: string;
  taxId?: string;
  open: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={open} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img loading="lazy" src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1]">Edit</span>
          </p>
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] my-1 text-[12px] text-[#B5B5C3]">
        <span>Contact Name</span>
        <span>Phone</span>
        <span>Email</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mb-4 text-[14px]">
        <span>{contactName}</span>
        <span>{phone}</span>
        <span>{email}</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] text-[#B5B5C3] text-[12px] mt-5">
        <span>Country</span>
        <span>City/Sate</span>
        <span>Post Code</span>
        <span>Tax ID</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mb-5 text-[14px]">
        <span>{country}</span>
        <span>{city}</span>
        <span>{postCode}</span>
        <span>{taxId}</span>
      </div>
    </div>
  );
};

const TeacherPersonalInfomation = ({
  name,
  phone,
  email,
  open,
}: {
  name?: string;
  phone?: string;
  email?: string;
  open: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={open} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img loading="lazy" src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1]">Edit</span>
          </p>
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] my-1 text-[12px] text-[#B5B5C3]">
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] mb-4 text-[14px]">
        <span>{name}</span>
        <span>{phone}</span>
        <span>{email}</span>
      </div>
    </div>
  );
};

const SchCard = ({
  schbg,
  schcode,
  schname,
  schlogo,
  city,
}: {
  schbg?: string;
  city?: string;
  schcode?: number;
  schname?: string;
  schlogo?: string;
}) => {
  console.log("Card two");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Modal
        radius={"xl"}
        size="xl"
        opened={opened}
        onClose={close}
        closeButtonProps={{
          size: "xl",
        }}
        centered
      >
        <UploadPicture />
      </Modal>
      <div className="relative">
        <img loading="lazy" src={schbg} alt="schbg" className="w-[100%]" />
        <img
          src={CameraIcon}
          alt="camera"
          className="absolute top-8 right-10"
        />
        <span
          onClick={open}
          className="absolute p-4 bg-white rounded-full bottom-[-100px] left-12"
        >
          <span className=" bg-[#b9b9b9] z-50 rounded-full flex justify-center items-center relative  ">
            <img loading="lazy" src={schlogo} alt="" className="w-[180px] " />
            <img
              loading="lazy"
              src={BigPencil}
              alt="pencil"
              className="absolute"
            />
          </span>
        </span>
      </div>
      <div className="pl-[270px] flex justify-between mt-2  ">
        <div className="">
          <h1 className="font-bold text-[28px] flex gap-4">
            {schname} <img loading="lazy" src={EditIcon} alt="editIcon" />
          </h1>
          <span className="text-[16px] text-[#B5B5C3]">{city}</span>
        </div>
        <div className="pr-5 pt-2">
          <p className="flex gap-3 justify-center items-baseline">
            School code:
            <p className="font-bold text-[23px] pt-1">{schcode}</p>
            <img loading="lazy" src={CopyIcon} alt="copyIcon" />
          </p>
        </div>
      </div>
    </div>
  );
};

const EditSchPersonalInfo = () => {
  return (
    <div className="px-10">
      <h1 className="text-[24px] font-Recoleta font-bold text-center ">
        Edit profile
      </h1>
      <form>
        <div className="grid grid-cols-[1fr_250px] gap-4">
          <p>
            <span>Enter First Name</span>
            <InputFormat type="text" placeholder="First Name" />
          </p>
          <p>
            <span>Enter Last Name</span>
            <InputFormat type="text" placeholder="Last Name" />
          </p>
        </div>
        <p className="my-5">
          <span>Enter Email address</span>
          <InputFormat type="email" placeholder="Email" />
        </p>
        <div className="flex gap-4">
          <p className=" flex-grow">
            <label htmlFor="name">Assign to Class</label>
            <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                className="w-full  h-full flex-1  focus:outline-none"
              >
                <option value="male">Class A</option>
                <option value="female">Class B</option>
              </select>
            </p>
          </p>

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
        </div>

        <p className="my-5">
          <Button>Continue</Button>
        </p>
      </form>
    </div>
  );
};

const EditParentPersonalInfo = () => {
  return (
    <div className="px-10">
      <h1 className="text-[24px] font-Recoleta font-bold text-center ">
        Edit profile
      </h1>
      <form>
        <div className="grid grid-cols-[1fr_250px] gap-4">
          <p>
            <span>Enter First Name</span>
            <InputFormat type="text" placeholder="First Name" />
          </p>
          <p>
            <span>Enter Last Name</span>
            <InputFormat type="text" placeholder="Last Name" />
          </p>
        </div>
        <p className="my-5">
          <span>Enter Email address</span>
          <InputFormat type="email" placeholder="Email" />
        </p>
        <div className="flex gap-4">
          <p className=" flex-grow">
            <label htmlFor="name">Country</label>
            <InputFormat type="text" placeholder="Country" />
          </p>
          <p className=" flex-grow">
            <label htmlFor="name">City</label>
            <InputFormat type="text" placeholder="City" />
          </p>
        </div>

        <p className="my-5">
          <Button>Continue</Button>
        </p>
      </form>
    </div>
  );
};

const EditTeacherPersonalInfo = () => {
  return (
    <div className="px-10">
      <h1 className="text-[24px] font-Recoleta font-bold text-center ">
        Edit profile
      </h1>
      <form>
        <div className="grid grid-cols-[1fr_250px] gap-4">
          <p>
            <span>Enter First Name</span>
            <InputFormat type="text" placeholder="First Name" />
          </p>
          <p>
            <span>Enter Last Name</span>
            <InputFormat type="text" placeholder="Last Name" />
          </p>
        </div>
        <p className="my-5">
          <span>Enter Email address</span>
          <InputFormat type="email" placeholder="Email" />
        </p>

        <p className="my-5">
          <Button>Continue</Button>
        </p>
      </form>
    </div>
  );
};
