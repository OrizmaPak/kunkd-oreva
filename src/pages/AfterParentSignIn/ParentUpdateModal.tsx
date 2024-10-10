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
import InputFormat from "@/common/InputFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, unknown, z } from "zod";
import { FormData } from "@/common/User/FormValidation/Schema";

import { useGetCountries, useUpdateParentCountryPhone } from "@/api/queries";

import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import { TCountry } from "../ParentSignup/ParentSignupDetails";

const ParentUpdateModal = ({ close }: { close: () => void }) => {
  const { data } = useGetCountries();
  const countries: TCountry[] = data?.data?.data;
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
  const schema: ZodType<FormData> = z.object({
    phone: z
      .string()
      .optional() // Allow phone to be optional
      .refine(
        (value) =>
          value === undefined ||
          value === "" ||
          (value.length >= 8 && value.length <= 15),
        {
          message: "Phone number is not vaid",
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { isLoading, mutate } = useUpdateParentCountryPhone();

  const [selectedCountry, setSelectedCountry] = useState<TCountry>();
  const [selectedCode, setSelectedCode] = useState("US");

  const handleSelect = (code: string) => {
    setSelectedCode(code);
    console.log("Selected c:", code);
    setSelectedCountry(countries?.find((data: TCountry) => data.iso2 === code));
  };
  const options = useMemo(() => countryList().getValues(), []);

  const submitData = async (datta: FormData) => {
    mutate(
      {
        ...datta,
        country_id: selectedCountry?.id || 233,
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
          <div className="mt-4">
            <form className="" onSubmit={handleSubmit(submitData)}>
              <p className="my-5 flex  w-full justify-between gap-2"></p>

              <div>
                <ReactFlagsSelect
                  selected={selectedCode}
                  onSelect={handleSelect}
                  countries={options}
                  searchable
                />
              </div>

              <p className="w-full mt-8">
                <InputFormat
                  type="text"
                  placeholder="Phone Number (optional)"
                  reg={register("phone")}
                  errorMsg={errors.phone?.message}
                />
              </p>

              <Button type="submit" className="mt-8">
                {" "}
                {isLoading ? (
                  <p className="flex justify-center items-center ">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span>Continue</span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentUpdateModal;
