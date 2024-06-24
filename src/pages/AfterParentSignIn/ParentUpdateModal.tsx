import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import Button from "@/components/Button";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";

import { useUpdateParentCountryPhone } from "@/api/queries";

const ParentUpdateModal = ({ close }: { close: () => void }) => {
  const [user] = useStore(getUserState);
  const [value, setValue] = useState<string | undefined>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const { isLoading, mutate } = useUpdateParentCountryPhone();

  const handleChange = (newValue: string | undefined) => {
    setValue(newValue);
    if (newValue) {
      setIsValid(isValidPhoneNumber(newValue));
    } else {
      setIsValid(true); // Handle case when input is cleared
    }

    console.log(value);
  };

  const handleSubmit = () => {
    mutate(
      {
        international_code: value?.slice(0, 4),
        phone: value,
      },
      {
        async onSuccess(data) {
          close();
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },
        onError() {
          notifications.show({
            title: `Notification`,
            message: "Invalid username or password",
          });
        },
      }
    );
  };
  return (
    <>
      <div className="px-2">
        <div className="my-3 ">
          <p className="text-center text25 font-Hanken font-medium leading-4">{`Welcome ${user?.firstname}`}</p>
          <p className="text2 text-center"> {user?.email} </p>
        </div>
        <div className="my-4 mt-8">
          <p className="text1 font-bold">Update profile</p>
          <p className="text2">Please update your profile to continue</p>
          <div className="mt-8">
            <label htmlFor="phone" className="text2">
              Phone number
            </label>
            <p className="mt-2 mb-8">
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={handleChange}
                className="phone-input rounded-full flex items-center gap-2 mt-1  border-[#F3DAFF] border py-3 my-2 px-2 focus:outline-none"
              />
              {!isValid && (
                <p style={{ color: "red" }}>
                  Please enter a valid phone number.
                </p>
              )}
            </p>
            <Button onClick={handleSubmit}>
              {" "}
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentUpdateModal;
