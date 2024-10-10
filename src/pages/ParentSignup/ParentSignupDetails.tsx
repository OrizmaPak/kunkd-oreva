import { getApiErrorMessage } from "@/api/helper";
import { useCreateParentUser, useGetCountries } from "@/api/queries";
import Cancel from "@/assets/Cancel.svg";
import FormWrapper from "@/common/FormWrapper";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import { useState } from "react";
// import { isValidPhoneNumber } from "libphonenumber-js";
// import MobileNumber from "@/components/MobileNumber";
// import { ParsedCountry, PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
// import { CountryData } from "react-international-phone";
// import { PhoneNumberUtil } from "google-libphonenumber";

// import { motion } from "framer-motion";
import ReactFlagsSelect from "react-flags-select";
// import countryList from "react-select-country-list";
// import { useMemo } from "react";

export type TCountry = {
  id: number;
  iso2: string;
  iso3: string;
  name: string;
};

const ParentSignupDetails = ({ onSubmit }: { onSubmit: () => void }) => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useCreateParentUser();
  const [, setUser] = useStore(getUserState);
  const { data } = useGetCountries();
  const countries: TCountry[] = data?.data?.data;
  const [selectedCountry, setSelectedCountry] = useState<TCountry>();
  const [selectedCode, setSelectedCode] = useState("US");

  const handleSelect = (code: string) => {
    setSelectedCode(code);
    console.log("Selected c:", code);
    setSelectedCountry(countries?.find((data: TCountry) => data.iso2 === code));
  };

  const schema: ZodType<FormData> = z.object({
    firstname: z
      .string()
      .min(2, { message: "First must be at least 2 characters long" })
      .max(40, { message: "First must not exceed 20 characters" }),
    lastname: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(40, { message: "Last name must not exceed 30 characters" }),
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
    email: z.string().email(),
  });

  console.log("sele", selectedCountry);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (datta: FormData) => {
    sessionStorage.clear();
    setUser({ email: datta.email });
    mutate(
      { ...datta, country_id: selectedCountry?.id || 233 },

      {
        onSuccess(data) {
          sessionStorage.setItem("parentemail", datta.email as string);
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          onSubmit();
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
    <FormWrapper>
      <div className=" w-full h-full flex justify-center items-center ">
        <div className="inner-form-w2 mx-auto relative ">
          <Link to="/">
            <span className="absolute right-0 top-[-60px]">
              <img loading="lazy" src={Cancel} alt="cancel" />
            </span>
          </Link>
          <div className="w-[100%] ">
            <span></span>
            <h1 className="font-bold fon header2 font-Recoleta">
              Sign Up as a Parent
            </h1>
            <p className="text2 text-[#A7A7A7] font-Hanken">
              Start learning and reading without restrictions.{" "}
            </p>
            <form className="mt-8" onSubmit={handleSubmit(submitData)}>
              <p className="my-5 flex  w-full justify-between gap-2">
                <InputFormat
                  type="text"
                  placeholder="First Name"
                  reg={register("firstname")}
                  errorMsg={errors.firstname?.message}
                />

                <InputFormat
                  type="text"
                  placeholder="Last Name"
                  reg={register("lastname")}
                  errorMsg={errors.lastname?.message}
                />
              </p>

              {/* <p>
                <MobileNumber />
              </p> */}

              <div>
                <ReactFlagsSelect
                  selected={selectedCode}
                  onSelect={handleSelect}
                  // countries={{name:"Nigeria", id:"NG"}}
                  searchable
                />
              </div>

              <p className="w-full mt-4">
                <InputFormat
                  type="text"
                  placeholder="Phone Number (optional)"
                  reg={register("phone")}
                  errorMsg={errors.phone?.message}
                />
                {/* <PhoneInput
                  // style={width:"100%"}}
                  defaultCountry="ng"
                  value={phone.toString()}
                  onChange={(phone, dialCode) => handleChange2(phone, dialCode)}
                  className="w-full text20 "
                /> */}
              </p>

              <p className="my-5">
                <InputFormat
                  type="text"
                  placeholder="Email"
                  leftIcon={<AiOutlineMail size={20} color="#c4ccd0" />}
                  reg={register("email")}
                  errorMsg={errors.email?.message}
                />
              </p>

              <p className="text-center text3 font-Hanken m-3 mt-4 text-gray-400">
                By continuing you agree to Kunda Kids{" "}
                <strong className=" text-black"> Terms of Service </strong>and{" "}
                <strong className="text-black"> Privacy Policy </strong>
              </p>
              <Button size="full" type="submit">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="text2">Create free account</span>
                )}
              </Button>
            </form>

            <p className="  text-center text2 text-gray-400 ">
              <span className="font-Hanken">Already hava an account? </span>
              <button
                onClick={() => navigate("/login")}
                className="mt-6 text-[#8530C1] font-bold
              "
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ParentSignupDetails;
