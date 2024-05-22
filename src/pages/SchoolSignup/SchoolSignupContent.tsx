import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import EmailLogo from "@/assets/emaillogo.svg";
import Cancel from "@/assets/Cancel.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useNavigate } from "react-router-dom";
import useStore from "@/store";
import { useCreateSchoolUser } from "@/api/queries";
import { getPushTokenState } from "@/store/pushTokenStore";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";

const SchoolSignupContent = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useCreateSchoolUser();
  const [pushToken] = useStore(getPushTokenState);

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
    phone: z
      .string()
      .min(11, { message: "Phone number must not less than 11 characters" })
      .max(14, { message: "Phone number must not more than 14 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    sessionStorage.clear();
    mutate(
      { ...data, fcm_token: pushToken },
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
    <div className="flex justify-center items-center  w-full h-full">
      <div className="inner-form-w mx-auto relative">
        <Link to="/">
          <span className="absolute">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%] pt-20">
          <span></span>
          <h1 className="font-bold fon header2 font-Recoleta">
            Sign up for school
          </h1>
          <p className="text2 text-[#A7A7A7]  font-Hanken">
            Start learning and reading without restrictions.{" "}
          </p>
          <form onSubmit={handleSubmit(submitData)} className="text3">
            <p className="my-3">
              <InputFormat
                type="text"
                placeholder="School Name"
                reg={register("school_name")}
                errorMsg={errors.school_name?.message}
              />
            </p>

            <p className="my-3">
              <InputFormat
                type="text"
                placeholder="School Address"
                reg={register("school_address")}
                errorMsg={errors.school_address?.message}
              />
            </p>

            <p className="my-3">
              <InputFormat
                type="text"
                placeholder="Contact Name"
                reg={register("name")}
                errorMsg={errors.name?.message}
              />
            </p>

            <p className="my-3">
              <InputFormat
                type="number"
                placeholder="Phone number"
                reg={register("phone")}
                errorMsg={errors.name?.message}
              />
            </p>
            <p className="my-3">
              <InputFormat
                type="text"
                placeholder="Email"
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
                placeholder="Password"
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
            <p className="text-center text3 font-Hanken m-3 mt-2 text-gray-400">
              By continuing you agree to Kunda Kids
              <strong className=" text-black"> Terms of Service </strong> and
              <strong className="text-black"> Privacy Policy </strong>
            </p>

            <Button type="submit" size="full">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span className="text3">Create account</span>
              )}
            </Button>
          </form>

          <p className="mt-1 text-center text3 text-gray-400 ">
            <span className="font-Hanken">Already hava an account? </span>
            <button
              onClick={() => navigate("/login")}
              className=" text-[#8530C1] font-bold
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
