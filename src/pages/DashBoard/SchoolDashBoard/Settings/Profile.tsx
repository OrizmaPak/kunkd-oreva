import Button from "@/components/Button";
import { getUserState } from "@/store/authStore";

import useStore from "@/store/index";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import { MdModeEdit } from "react-icons/md";

const Profile = () => {
  const [user, setUser] = useStore(getUserState);
  console.log("User-------->", user);
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
  return (
    <div>
      <div className="grid grid-cols-[500px_1fr] h-[408px] ">
        <div className="bg-red-500">
          <p className=" font-Inter text-[16px]">School Details</p>
          <p className=" font-InterReg text-[14px] mb-5">
            Update your school details here.
          </p>
          <Button
            type="button"
            varient="outlined"
            size="sm"
            className="border-[#9FC43E] text-[#9FC43E] rounded-full flex justify-center items-center gap-2 font-bold "
          >
            <MdModeEdit size={25} color="#9FC43E" />
            Edit Profile
          </Button>
        </div>
        <div className="bg-green-500">
          <div>
            <p className="flex gap-3 justify-center items-baseline">
              <span className="text-[12px] text-[#B5B5C3] font-Hanken">
                {" "}
                License Code:
              </span>

              <p className="font-bold font-Hanken text-[20px] pt-1">
                {(user?.school?.code as string) || "KS729"}
              </p>
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
