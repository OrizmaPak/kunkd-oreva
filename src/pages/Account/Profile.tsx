import Button from "@/components/Button";
import EditPencil from "@/assets/editPencil.svg";
import Starr from "@/assets/starr.svg";
import { motion } from "framer-motion";
import SchoolBg from "@/assets/schoolImage.svg";
import SchoolLogo from "@/assets/schoolIcon.svg";
// import { userContext } from "@/Context/StateProvider";
import EditIcon from "@/assets/editPencil.svg";
import CameraIcon from "@/assets/cameraIcon.svg";
import CopyIcon from "@/assets/copyIcon.svg";
import UploadPicture from "../DashBoard/SchoolDashBoard/Teachers/UploadPicture";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Teacher01 from "@/assets/teacher01.svg";
import BigPencil from "@/assets/bigeditingpencil.svg";
import InputFormat from "@/common/InputFormat";
import { useState } from "react";
import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";
// import { getProfileState } from "@/store/profileStore";
import { UseFormRegisterReturn } from "react-hook-form";

// import useStore from "@/store/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { notifications } from "@mantine/notifications";
import {
  useUpdateSchProfile,
  useGetCountries,
  useGetStates,
} from "@/api/queries";
import { getApiErrorMessage } from "@/api/helper";
import { Loader } from "@mantine/core";

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
  const [parentEditMode, setParentEditMode] = useState(false);
  const [teacherEditMode, setTeacherEditMode] = useState(false);
  const [schEditMode, setSchEditMode] = useState(false);
  const [user, ,] = useStore(getUserState);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="px-4 ">
          <h1 className="text-[30px] font-bold my-8 font-Hanken">Profile</h1>

          {user?.role === "teacher" && (
            <>
              <PTCard {...teacherData} />
              {teacherEditMode ? (
                <EditTeacherPersonalInfomation
                  onSave={() => setTeacherEditMode(false)}
                  {...teacherData}
                />
              ) : (
                <TeacherPersonalInfomation
                  {...teacherData}
                  openEdit={() => setTeacherEditMode(true)}
                />
              )}
            </>
          )}
          {user?.role === "schoolAdmin" && (
            <>
              <SchCard {...schData} />
              {schEditMode ? (
                <EditSchoolPersonalInfomation
                  onSave={() => setSchEditMode(false)}
                  {...user}
                />
              ) : (
                <SchoolPersonalInfomation
                  {...user}
                  openEdit={() => setSchEditMode(true)}
                />
              )}
            </>
          )}
          {user?.role === "parent" && (
            <>
              <PTCard {...parentData} />
              {parentEditMode ? (
                <EditParentPersonalInfomation
                  onSave={() => setParentEditMode(false)}
                  {...parentData}
                />
              ) : (
                <ParentPersonalInfomation
                  {...parentData}
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
        <img
          loading="lazy"
          src={image ? image : Teacher01}
          alt="image"
          className="w-[150px]"
        />
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
  openEdit,
}: {
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  openEdit: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={openEdit} size="sm" varient="outlined">
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
  // contactName,
  firstname,
  phone,
  email,
  country,
  city,
  postCode,
  taxId,
  openEdit,
}: {
  firstname?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  contactName?: string;
  postCode?: string;
  taxId?: string;
  openEdit: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={openEdit} size="sm" varient="outlined">
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
        <span>{firstname}</span>
        <span>{phone ? phone : "+234804525689"}</span>
        <span>{email}</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] text-[#B5B5C3] text-[12px] mt-5">
        <span>Country</span>
        <span>City/Sate</span>
        <span>Post Code</span>
        <span>Tax ID</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mb-5 text-[14px]">
        <span>{country ? country : " United Kingdom"}</span>
        <span>{city ? city : "Leeds East london"}</span>
        <span>{postCode ? postCode : "KTF456"}</span>
        <span>{taxId ? taxId : "LP45"}</span>
      </div>
    </div>
  );
};

const TeacherPersonalInfomation = ({
  name,
  phone,
  email,
  openEdit,
}: {
  name?: string;
  phone?: string;
  email?: string;
  openEdit: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={openEdit} size="sm" varient="outlined">
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
        <img
          loading="lazy"
          src={schbg ? schbg : SchoolBg}
          alt="schbg"
          className="w-[100%]"
        />
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

const EditParentPersonalInfomation = ({
  name,
  phone,
  email,
  country,
  city,
  onSave,
}: {
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  onSave: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={onSave} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <span className="text-[#8530C1]">Save</span>
          </p>
        </Button>
      </div>
      <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] my-1 text-[12px] text-[#B5B5C3]">
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
      </div>
      <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] mb-4 text-[14px]">
        <InputFormat type="text" value={name} />
        <InputFormat type="text" value={phone} />
        <InputFormat type="text" value={email} />
      </div>
      <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] text-[#B5B5C3] text-[12px] mt-5">
        <span>Country</span>
        <span>City/Sate</span>
        <span></span>
      </div>
      <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] mb-5 text-[14px]">
        <InputFormat type="text" value={country} />
        <InputFormat type="text" value={city} />
        <span></span>
      </div>
    </div>
  );
};

const EditTeacherPersonalInfomation = ({
  name,
  phone,
  email,
  onSave,
}: {
  name?: string;
  phone?: string;
  email?: string;
  onSave: () => void;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[16px]">Personal Information</h1>
        <Button onClick={onSave} size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img loading="lazy" src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1]">Save</span>
          </p>
        </Button>
      </div>
      <div className="grid gap-2 grid-cols-[1fr_1fr_1fr] my-1 text-[12px] text-[#B5B5C3]">
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
      </div>
      <div className="grid gap-2 grid-cols-[1fr_1fr_1fr] mb-4 text-[14px]">
        <InputFormat type="text" value={name} />
        <InputFormat type="text" value={phone} />
        <InputFormat type="text" value={email} />
      </div>
    </div>
  );
};

const EditSchoolPersonalInfomation = ({
  contact_name,
  phone,
  email,
  post_code,
  tax_id,
  onSave,
}: {
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  contact_name?: string;
  post_code?: string;
  tax_id?: string;
  onSave: () => void;
}) => {
  const { mutate, isLoading } = useUpdateSchProfile();
  const { data } = useGetCountries();
  const { data: dataStates } = useGetStates();

  const countries: TCountry[] = data?.data.data;
  const states: TCountry[] = dataStates?.data.data;

  const schema: ZodType<FormData> = z.object({
    contact_name: z
      .string()
      .min(4, { message: "Contact name must be at least 4 characters long" })
      .max(20, { message: "First must not exceed 20 characters" }),
    phone: z
      .string()
      .min(11, { message: "Phone number  must be at least 11 characters long" })
      .max(14, { message: "Last name must not exceed 14 characters" }),
    email: z.string().email(),
    tax_id: z
      .string()
      .min(4, { message: "TaxId must be at least 1 character" }),
    country_id: z
      .string()
      .min(2, { message: "Country must be at least 2 characters" }),
    state_id: z
      .string()
      .min(2, { message: "Country must be at least 2 characters" }),
    post_code: z
      .string()
      .min(2, { message: "Post  code must be at least 2 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);

    mutate(
      {
        contact_name: data.contact_name!,
        email: data.email!,
        post_code: data.post_code!,
        tax_id: data.tax_id!,
        country_id: data.country_id!,
        phone: data.phone!,
        state_id: data.state_id!,
      },

      {
        onSuccess(data) {
          console.log("success", data.data.message);

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
          <h1 className="font-bold text-[16px]">Personal Information</h1>
          <Button type="submit" size="sm" varient="outlined">
            <p className="gap-4 flex">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Save</span>
              )}
            </p>
          </Button>
        </div>
        <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] my-1 text-[12px] text-[#B5B5C3]">
          <span>Contact Name</span>
          <span>Phone</span>
          <span>Email</span>
        </div>
        <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] mb-4 text-[14px]">
          <InputFormat
            reg={register("contact_name")}
            errorMsg={errors.contact_name?.message}
            smallPadding="true"
            type="text"
            value={contact_name}
          />
          <InputFormat
            reg={register("phone")}
            errorMsg={errors.phone?.message}
            smallPadding="true"
            type="text"
            value={phone}
          />
          <InputFormat
            reg={register("email")}
            errorMsg={errors.email?.message}
            smallPadding="true"
            type="text"
            value={email}
          />
        </div>
        <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] text-[#B5B5C3] text-[12px] mt-5">
          <span>Country</span>
          <span>City/State</span>
          <span>Post Code</span>
          <span>Tax ID</span>
        </div>
        <div className="grid gap-2 grid-cols-[1fr_1fr_1fr_1fr] mb-5 text-[14px]">
          {/* <InputFormat
            reg={register("country")}
            errorMsg={errors.country?.message}
            smallPadding="true"
            type="text"
            value={country}
          /> */}

          <div className="px-2 border-[#F3DAFF]  rounded-full  items-center gap-2 mt-1 flex justify-center sssss  border">
            <select {...register("country_id")} className="border-0 w-full">
              {countries &&
                countries.map((country, index) => (
                  <option key={index} value="12">
                    {country.name}
                  </option>
                ))}
            </select>
          </div>
          {/* <CustomSelectInput reg={register("country_id")} data={countries} /> */}
          {/* <InputFormat
            reg={register("city")}
            errorMsg={errors.city?.message}
            smallPadding="true"
            type="text"
            value={city}
          /> */}
          <CustomSelectInput data={states} />
          <InputFormat
            reg={register("post_code")}
            errorMsg={errors.post_code?.message}
            smallPadding="true"
            type="text"
            value={post_code}
          />
          <InputFormat
            reg={register("tax_id")}
            errorMsg={errors.tax_id?.message}
            smallPadding="true"
            type="text"
            value={tax_id}
          />
        </div>
      </form>
    </div>
  );
};

type TCountry = {
  id: number;
  name: string;
};
const CustomSelectInput = ({
  data,
  reg,
}: {
  data: TCountry[];
  reg?: UseFormRegisterReturn;
}) => {
  console.log(data);
  return (
    <div className="px-2 border-[#F3DAFF]  rounded-full  items-center gap-2 mt-1 flex justify-center sssss  border">
      <select {...reg} className="border-0 w-full">
        {data &&
          data.map((country, index) => (
            <option key={index} value={`${country.id}`}>
              {country.name}
            </option>
          ))}
      </select>
    </div>
  );
};
