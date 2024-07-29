import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import { useEffect, useState } from "react";
// import { isValidPhoneNumber } from "libphonenumber-js";
import Button from "@/components/Button";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { ParsedCountry, PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
// import { CountryData } from "react-international-phone";
import { PhoneNumberUtil } from "google-libphonenumber";

import { useUpdateParentCountryPhone } from "@/api/queries";

const ParentUpdateModal = ({ close }: { close: () => void }) => {
  const [user] = useStore(getUserState);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  const handleChange2 = (
    value: string,
    countryData: { country: ParsedCountry; inputValue: string }
  ) => {
    setPhone(value);
    setIsTouched(true);
    setCountryCode(countryData?.country?.dialCode);
  };
  const isValid2 = isPhoneValid(phone);
  useEffect(() => {
    setIsTouched(false);
  }, []);
  const { isLoading, mutate } = useUpdateParentCountryPhone();

  // const handleChange = (newValue: string | undefined) => {
  //   setValue(newValue);
  //   if (newValue) {
  //     setIsValid(isValidPhoneNumber(newValue));
  //   } else {
  //     setIsValid(true); // Handle case when input is cleared
  //   }

  //   console.log(value);
  // };

  const handleSubmit = () => {
    mutate(
      {
        international_code: countryCode,
        phone: phone,
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
      <div className="px-2 h-[400px]">
        <div className="mb-3 mt-10 ">
          <p className="text-center text25 font-Hanken font-medium leading-4">{`Welcome ${user?.firstname}`}</p>
          <p className="text2 text-center"> {user?.email} </p>
        </div>
        <div className="my-4 mt-4">
          <p className="text1 font-bold">Update profile</p>
          <p className="text1">Please update your profile to continue</p>
          <div className="mt-10">
            <label htmlFor="phone" className="text2 mb-2">
              Enter your phone number
            </label>
            <p className="w-full mt-3">
              <PhoneInput
                // style={width:"100%"}}
                defaultCountry="ng"
                value={phone.toString()}
                onChange={(phone, dialCode) => handleChange2(phone, dialCode)}
                className="w-full text20 "
              />
            </p>
            {isTouched && !isValid2 && (
              <p className="text2 text-red-600 ">
                Please enter a valid phone number.
              </p>
            )}
            <Button onClick={handleSubmit} className="mt-5">
              {" "}
              {isLoading ? (
                <p className="flex justify-center items-center ">
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
