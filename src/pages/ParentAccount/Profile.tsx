import Button from "@/components/Button";
import SamOwen from "@/assets/Male14.svg";
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
const data = {
  image: SamOwen,
  name: "Samuel Owen",
  email: "samuelowen@gmail.com",
  phone: "+1442023052906",
  country: "United Kingdom",
  city: "Leeds East london",
};

const schData = {
  schbg: SchoolBg,
  schname: "Kunda kids",
  schlogo: SchoolLogo,
  schcode: 2345,
  country: "United Kingdom",
  schaddress: "Leeds East london",
};

const Profile = () => {
  const [{ email, userType }, dispatch] = userContext();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-20 ">
        <h1 className="text-[25px] font-bold my-8">Profile</h1>

        {userType === "school" ? <Card2 {...schData} /> : <Card {...data} />}
        <PersonalInfomation {...data} />
      </div>
    </motion.div>
  );
};

export default Profile;

const Card = ({
  image,
  email,
  onclick,
  name,
}: {
  image?: string;
  name?: string;
  email?: string;
  onclick?: () => void;
}) => {
  return (
    <div className="flex justify-between p-6 border border-[#8530C1]  rounded-3xl">
      <div className="flex justify-center items-center gap-14">
        <img src={image} alt="image" />
        <p>
          <p className="font-bold text-[35px] font-Recoleta">{name}</p>
          <p className="text-[#B5B5C3]">{email}</p>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Button size="md">
          <p className="flex justify-center items-center gap-2">
            <img src={Starr} alt="starr" />
            <span>Upgrade Plan</span>
          </p>
        </Button>
      </div>
    </div>
  );
};

const PersonalInfomation = ({
  name,
  phone,
  email,
  country,
  city,
}: {
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[25px]">Personal Information</h1>
        <Button size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1]">Edit</span>
          </p>
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_400px] my-1 text-[#B5B5C3]">
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_400px] mb-4">
        <span>{name}</span>
        <span>{phone}</span>
        <span>{email}</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_400px] text-[#B5B5C3] mt-5">
        <span>Country</span>
        <span>City/Sate</span>
        <span></span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_400px] mb-5">
        <span>{country}</span>
        <span>{city}</span>
        <span></span>
      </div>
    </div>
  );
};

const Card2 = ({
  schbg,
  schcode,
  schname,
  schlogo,
  schaddress,
}: {
  schbg?: string;
  schaddress?: string;
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
        <img src={schbg} alt="schbg" className="w-[100%]" />
        <img
          src={CameraIcon}
          alt="camera"
          className="absolute top-8 right-10"
        />
        <span
          onClick={open}
          className="absolute p-4 bg-white rounded-full bottom-[-100px] left-12"
        >
          <span className=" bg-[#b9b9b9] z-50 rounded-full flex justify-center items-center  ">
            <img src={schlogo} alt="" className="w-[180px] " />
          </span>
        </span>
      </div>
      <div className="pl-[300px] flex justify-between mt-2  ">
        <div className="">
          <h1 className="font-bold flex gap-4">
            {schname} <img src={EditIcon} alt="editIcon" />
          </h1>
          <span className="text-[16px] text-[#B5B5C3]">{schaddress}</span>
        </div>
        <div className="pr-20 pt-2">
          <p className="flex gap-3 justify-center items-baseline">
            School code:
            <p className="font-bold text-[23px] pt-1">{schcode}</p>
            <img src={CopyIcon} alt="copyIcon" />
          </p>
        </div>
      </div>
    </div>
  );
};
