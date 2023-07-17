import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import PasswordIcon from "@/assets/passwordIcon.svg";
import EmailLogo from "@/assets/emaillogo.svg";
import PasswordEye from "@/assets/passwordeye.svg";
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

  console.log("token ", pushToken);

  const schema: ZodType<FormData> = z.object({
    school_name: z
      .string()
      .min(4, { message: "School name must be at least 4 characters long" })
      .max(40, { message: "School name must not exceed 20 characters" }),
    school_address: z
      .string()
      .min(4, { message: "Address must be at least 4 characters long" })
      .max(50, { message: "Address must not exceed 40 characters" }),
    name: z
      .string()
      .min(4, { message: "Contact name must be at least 4 characters long" })
      .max(20, { message: "Contact name must not exceed 20 characters" }),
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
    mutate(
      { ...data, fcm_token: pushToken },
      {
        onSuccess(data) {
          console.log("success", data.data.message);

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
    <div className="w-[100%] max-w-[500px] mx-auto relative mt-[-10px]">
      <Link to="/">
        <span className="absolute">
          <img loading="lazy" src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%] pt-20">
        <span></span>
        <h1 className="font-bold fon text-[40px] font-Recoleta">
          Sign up for school
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Start learning and reading without restrictions.{" "}
        </p>
        <form onSubmit={handleSubmit(submitData)} className="mt-8">
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
          <p className="text-center font-Hanken m-3 mt-4 text-gray-400">
            By continuing you agree to Kunda Kids
            <strong className=" text-black"> Terms of Service </strong>and{" "}
            <strong className="text-black"> Privacy Policy </strong>
          </p>

          <Button type="submit" size="full">
            {isLoading ? (
              <p className="flex justify-center items-center">
                <Loader color="white" size="sm" />
              </p>
            ) : (
              <span>Create free account</span>
            )}
          </Button>
        </form>

        <p className="mt-2 text-center text-[] text-gray-400 ">
          <span className="font-Hanken">Already hava an account? </span>
          <button
            className="mt-6 text-[#8530C1] font-bold
              "
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SchoolSignupContent;
