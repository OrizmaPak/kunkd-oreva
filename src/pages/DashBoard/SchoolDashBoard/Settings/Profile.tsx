import Button from "@/components/Button";

import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { useGetCountries } from "@/api/queries";
import ReactFlagsSelect from "react-flags-select";
import { TCountry } from "@/pages/ParentSignup/ParentSignupDetails";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import UpdateProfileModal from "./UpdateProfileModal";

const Profile = () => {
  const [user] = useStore(getUserState);
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
      message: "Copied",
    });
  };
  const { data } = useGetCountries();
  const countries: TCountry[] = data?.data?.data;
  // const [selectedCountry, setSelectedCountry] = useState<TCountry>();
  const [selectedCode, setSelectedCode] = useState("US");

  const selectedCountry = countries?.find(
    (data: TCountry) => data.id === user?.country_id
  );

  useEffect(() => {
    if (selectedCountry) {
      setSelectedCode(selectedCountry?.iso2);
    }
  }, [selectedCountry]);
  const [opened, { close, open }] = useDisclosure(false);

  const schoolInfo = user?.school;

  console.log(schoolInfo, "shcool info");
  return (
    <>
      <Modal
        radius={20}
        size={450}
        opened={opened}
        onClose={close}
        padding={0}
        withCloseButton={false}
        // closeButtonProps={{
        //   size: "xl",
        // }}

        centered
      >
        <UpdateProfileModal close={close} />
      </Modal>
      <div className="px-10 py-5">
        <div className="grid grid-cols-[450px_1fr]  ">
          <div className="">
            <p className=" font-Inter text-[16px]">School Details</p>
            <p className=" font-InterReg text-[14px] mb-5">
              Update your school details here.
            </p>
            <Button
              type="button"
              onClick={open}
              varient="outlined"
              size="sm"
              className="border-[#9FC43E]  rounded-full flex justify-center items-center  font-bold "
            >
              <MdModeEdit size={20} color="#9FC43E" />
              <span className="text-[14px] font-Inter text-[#9FC43E]">
                {" "}
                Edit Profile
              </span>
            </Button>
          </div>
          <div className="">
            <div className="max-w-[546px]">
              <p className="">
                <p
                  onClick={handleCopy}
                  className="font-bold font-Hanken cursor-pointer text-[20px] pt-1 flex gap-2 items-center"
                >
                  {(user?.school?.code as string) || "KS729"}
                  <FaRegCopy size={15} />
                </p>
                <span className="text-[12px] text-[#696969] font-Hanken">
                  {" "}
                  License Code:
                </span>
              </p>
              <p className=" mt-4">
                <label
                  htmlFor="school name"
                  className="text-[14px] font-InterReg"
                >
                  School Name
                </label>
                <p
                  className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1 `}
                >
                  {user?.school?.name}
                </p>
              </p>
              <p className=" mt-4">
                <label htmlFor="Address" className="text-[14px] font-InterReg">
                  Address
                </label>
                <p
                  className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1 `}
                >
                  {user?.school?.address}
                </p>
              </p>
              <p className=" mt-4">
                <label htmlFor="country" className="text-[14px] font-InterReg">
                  Country
                </label>
                <ReactFlagsSelect
                  selected={selectedCode}
                  onSelect={setSelectedCode}
                  disabled={true}
                  // countries={{name:"Nigeria", id:"NG"}}
                />
              </p>

              <p>
                <label htmlFor="state" className="text-[14px] font-InterReg">
                  State
                </label>
                <p
                  className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1 `}
                >
                  Lagos
                </p>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <div className="grid grid-cols-[450px_1fr]  ">
          <div className="">
            <p className=" font-Inter text-[16px]">Contact Person Details</p>
            <p className=" font-InterReg text-[14px] mb-5">
              Update your personal details here.
            </p>
          </div>
          <div className="">
            <div className="max-w-[546px]">
              <p className=" mt-4">
                <label htmlFor="name" className="text-[14px] font-InterReg">
                  Name
                </label>
                <p
                  className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1 `}
                >
                  {schoolInfo?.contact_name}
                </p>
              </p>

              <p>
                <label htmlFor="phone" className="text-[14px] font-InterReg">
                  Phone Number
                </label>
                <p
                  className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1`}
                >
                  {user?.phone}
                </p>
              </p>

              <p>
                <label htmlFor="email" className="text-[14px] font-InterReg">
                  Email
                </label>
                <p
                  className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1`}
                >
                  {user?.email}
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
