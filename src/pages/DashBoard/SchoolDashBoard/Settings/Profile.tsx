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

  // ——— TEACHER-ONLY BRANCH (early return) ———
  const isTeacher = user?.role === "teacher";
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastname || "");
  const email = user?.email || "";

  if (isTeacher) {
    return (
      <div className="bg-white rounded-xl border border-x-none border-b-none border-gray-200 shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left rail */}
          <aside className="md:col-span-4">
            <h2 className="text-[#1D2739] text-lg font-semibold">Teachers Details</h2>
            <p className="text-sm text-[#667185] mt-1">Update your details here.</p>

            <button
              type="button"
              onClick={() => setIsEditing((v) => !v)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border-2  border-[#BCD678] px-4 py-2 text-sm font-semibold text-[#BCD678] hover:bg[#BCD678] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCD678]"
            >
              <MdModeEdit className="text-lg" />
              {isEditing ? "Cancel edit" : "Edit Profile"}
            </button>
          </aside>

          {/* Form area */}
          <section className="md:col-span-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-[#667185] mb-2">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Jadesola"
                  className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 text-[#1D2739] placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-[#8BCD50] focus:border-[#8BCD50]
                             disabled:bg-[#F2F4F7] disabled:text-[#98A2B3] disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-[#667185] mb-2">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Badmus"
                  className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 text-[#1D2739] placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-[#8BCD50] focus:border-[#8BCD50]
                             disabled:bg-[#F2F4F7] disabled:text-[#98A2B3] disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-[#667185] mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  placeholder="thegabriellamcpherson@email.com"
                  className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed"
                />
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      notifications.show({
                        title: "Saved",
                        message: "Your details have been updated locally.",
                      });
                    }}
                    className="inline-flex items-center rounded-full bg-[#1D741B] px-6 py-3 text-white text-sm font-medium
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8BCD50]"
                  >
                    Save changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFirstName(user?.firstname || "");
                      setLastName(user?.lastname || "");
                      setIsEditing(false);
                    }}
                    className="inline-flex items-center rounded-full border border-[#E4E7EC] px-6 py-3 text-sm font-medium text-[#1D2739]"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
  // ——— END TEACHER-ONLY BRANCH ———

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
