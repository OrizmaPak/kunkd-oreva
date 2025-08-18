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
import { useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import "react-phone-number-input/style.css";
import { useState } from "react";
import KundaLogo from "@/assets/KundaLogo.svg";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import { getPushTokenState } from "@/store/pushTokenStore";



import "react-international-phone/style.css";

import ReactFlagsSelect from "react-flags-select";
import { on } from "rsuite/esm/DOMHelper";

export type TCountry = {
  id: number;
  iso2: string;
  iso3: string;
  name: string;
};

const ParentSignupDetails = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useCreateParentUser();
  const [, setUser] = useStore(getUserState);
  const { data } = useGetCountries();
  const countries: TCountry[] = data?.data?.data;
  const [selectedCountry, setSelectedCountry] = useState<TCountry>();
  const [selectedCode, setSelectedCode] = useState("US");
   const [pushToken] = useStore(getPushTokenState);

  const handleSelect = (code: string) => {
    setSelectedCode(code);
    console.log("Selected c:", code);
    setSelectedCountry(countries?.find((data: TCountry) => data.iso2 === code));
  };

  const schema: ZodType<FormData> = z.object({
    firstname: z
      .string()
      .min(2, { message:"Name must be at least 2 characters long"})
      .max(40, { message:"Name must not exceed 20 characters"}),
  lastname: z
      .string()
      .min(2, { message:"Name must be at least 2 characters long"})
      .max(40, { message:"Name must not exceed 20 characters"}),
    phone: z
      .string()
      .optional() // Allow phone to be optional
  ,
    email: z.string().email(),
    password: z 
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
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
      { ...datta,  country_id: selectedCountry?.id || 233 },

      {
        onSuccess(data) {
          sessionStorage.setItem("parentemail", datta.email as string);
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          navigate("/parentverification");
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
    // <FormWrapper>
      <div className="flex justify-center bg-white rounded-[50px] w-[550px] h-full overflow-auto" >
        <div className="inner-form-w mx-auto relative">
          <div className="flex justify-center items-center mt-10 mb-7 ">
          <img src={KundaLogo} alt="image" className="w-[160px]" />
        </div>
          <div className="w-[100%] ">
            <span></span>
            <h1 className="font-bold fon header2 font-BalooSemiBold text-center">
              Sign Up as a Parent
            </h1>
            <p className="text2 text-[#A7A7A7]   font-ArimoRegular text-center mb-8">
              Start learning and reading without restrictions.{" "}
            </p>
            <form className="mt-8" onSubmit={handleSubmit(submitData)}>
              <p className="my-3 flex flex-col  w-full justify-between gap-2">
                <InputFormat
                  type="text"
                  placeholder="First Name"
                  reg={register("firstname")}
                  errorMsg={errors.name?.message}
                />

              </p>
               <p className="my-3 flex flex-col  w-full justify-between gap-2">
                <InputFormat
                  type="text"
                  placeholder="Last Name"
                  reg={register("lastname")}
                  errorMsg={errors.name?.message}
                />

              </p>

            
              <p className="my-3">
                <InputFormat
                  type="text"
                  placeholder="Email"
                  leftIcon={<AiOutlineMail size={20} color="#c4ccd0" />}
                  reg={register("email")}
                  errorMsg={errors.email?.message}
                />
              </p>
          
              <div>
                <ReactFlagsSelect
                  selected={selectedCode}
                  onSelect={handleSelect}
                  // countries={{name:"Nigeria", id:"NG"}}
                  searchable
                />
              </div>

              <p className="w-full mt-3">
                <InputFormat
                  type="number"
                  placeholder="Phone Number (optional)"
                  reg={register("phone")}
                  errorMsg={errors.phone?.message}
                />
              </p>          
              <p className="my-4">
              <InputFormat
                type="password"
                placeholder="Create Password"
                leftIcon={
                  <img loading="lazy" src={PasswordIcon} alt="pasword icon" />
                }
                rightIcon={
                  <img loading="lazy" src={PasswordEye} alt="paswordeye icon" />
                }
                reg={register("password")}
                errorMsg={errors.password?.message}
              />
            </p>
              <p className="text-center text3 font-Hanken m-3 mt-4 text-gray-400">
                By continuing you agree to Kunda Kids{" "}
                <strong className=" text-customGreen"> Terms of Service </strong>and{" "}
                <strong className="text-customGreen "> Privacy Policy </strong>
              </p>
              <Button size="full" type="submit"  backgroundColor="green">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="text2 ">Create free account</span>
                )}
              </Button>
            </form>

            <p className="  text-center text2 text-gray-400 ">
              <span className="font-Hanken ">Already hava an account? </span>
              <button
                onClick={() => navigate("/login")}
                className="mt-6 text-customGreen font-bold
              "
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    // </FormWrapper>
  );
};

export default ParentSignupDetails;
