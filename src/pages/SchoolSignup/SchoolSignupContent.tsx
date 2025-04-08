import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import EmailLogo from "@/assets/emaillogo.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useNavigate } from "react-router-dom";
import useStore from "@/store";
import { useCreateSchoolUser, useGetCountries } from "@/api/queries";
import { getPushTokenState } from "@/store/pushTokenStore";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import ReactFlagsSelect from "react-flags-select";
import { TCountry } from "../ParentSignup/ParentSignupDetails";
import { useState } from "react";
import KundaLogo from "@/assets/KundaLogo.svg";

const SchoolSignupContent = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useCreateSchoolUser();
  const [pushToken] = useStore(getPushTokenState);
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
    school_name: z
      .string()
      .min(2, { message: "School name must be at least 4 characters long" })
      .max(40, { message: "School name must not exceed 20 characters" }),
    school_address: z
      .string()
      .min(2, { message: "Address must be at least 4 characters long" })
      .max(50, { message: "Address must not exceed 40 characters" }),
    name: z
      .string()
      .min(2, { message: "Contact name must be at least 4 characters long" })
      .max(20, { message: "Contact name must not exceed 20 characters" }),
    state: z
      .string()
      .min(2, { message: " The state name must be at least 2 characters long" })
      .max(20, { message: "The state name must not exceed 20 characters" }),
    phone: z
      .string()
      .min(11, { message: "Phone number must not less than 11 characters" }),
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    sessionStorage.clear();
    mutate(
      { ...data, fcm_token: pushToken, country_id: selectedCountry?.id || 233 },
      {
        onSuccess(data) {
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });

          navigate("/schoolverification");
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
    <div className="flex justify-center   bg-white rounded-[50px] w-[550px] h-full  overflow-y-scroll ">
      <div className="inner-form-w mx-auto relative">
        <div className="flex justify-center items-center mt-10 mb-7 ">
          <img src={KundaLogo} alt="image" className="w-[160px]" />
        </div>
        <div className="w-[100%]">
          <h1 className="font-bold fon header2 font-BalooSemiBold text-center">
            Sign up for school
          </h1>
          <p className="text2 text-[#A7A7A7]   font-ArimoRegular text-center mb-8">
            Start learning and reading without restrictions.{" "}
          </p>
          <form onSubmit={handleSubmit(submitData)} className="text3">
            <p className="my-4">
              <InputFormat
                type="text"
                placeholder="Enter School Name"
                reg={register("school_name")}
                errorMsg={errors.school_name?.message}
              />
            </p>

            <p className="my-4">
              <InputFormat
                type="text"
                placeholder="Enter School Address"
                reg={register("school_address")}
                errorMsg={errors.school_address?.message}
              />
            </p>

            <div className="my-4 flex justify-end items-center gap-2">
              <ReactFlagsSelect
                selected={selectedCode}
                onSelect={handleSelect}
                // countries={{name:"Nigeria", id:"NG"}}
                searchable
                className="w-full h-full "
              />
              <p className="w-full h-full mb-[10px]">
                <InputFormat
                  type="text"
                  placeholder="Enter State"
                  reg={register("state")}
                  errorMsg={errors.state?.message}
                />
              </p>
            </div>

            <p className="my-4"></p>

            <div className="mt-10 mb-2 border-b-[1px] border-gray-200">
              <p className="text-bold  font-Hanken text-customGreen">
                CONTACT PERSON DETAILS
              </p>
            </div>

            <p className="my-4">
              <InputFormat
                type="text"
                placeholder="Enter Contact Name"
                reg={register("name")}
                errorMsg={errors.name?.message}
              />
            </p>

            <p className="my-4">
              <InputFormat
                type="number"
                placeholder="Enter Phone number"
                reg={register("phone")}
                errorMsg={errors.phone?.message}
              />
              <p className="text-[10px] text-[#999999] font-Inter px-2 pt-1">
                Please include your country code
              </p>
            </p>
            <p className="my-3">
              <InputFormat
                type="text"
                placeholder="Enter Email"
                leftIcon={
                  <img loading="lazy" src={EmailLogo} alt="pasword icon" />
                }
                reg={register("email")}
                errorMsg={errors.email?.message}
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
            <p className="text-center text3 font-Hanken m-3 mt-5 text-gray-400">
              By continuing you agree to Kunda Kids
              <strong className=" text-customGreen">
                {" "}
                Terms of Service{" "}
              </strong>{" "}
              and
              <strong className="text-customGreen"> Privacy Policy </strong>
            </p>
            <div className="flex justify-center items-center mt-10">
              <Button
                type="submit"
                size="sm"
                backgroundColor="green"
                className="px-[50px] rounded-full font-bold"
              >
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="text3">Create account</span>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-1 text-center text3 text-gray-400 pb-16">
            <span className="font-Hanken">Already hava an account? </span>
            <button
              onClick={() => navigate("/login")}
              className=" text-customGreen font-bold
              "
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchoolSignupContent;
