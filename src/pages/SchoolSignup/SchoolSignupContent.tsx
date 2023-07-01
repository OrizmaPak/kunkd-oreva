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

const SchoolSignupContent = () => {
  const navigate = useNavigate();

  const schema: ZodType<FormData> = z.object({
    schoolName: z
      .string()
      .min(4, { message: "School name must be at least 4 characters long" })
      .max(40, { message: "School name must not exceed 20 characters" }),
    address: z
      .string()
      .min(4, { message: "Address must be at least 4 characters long" })
      .max(50, { message: "Address must not exceed 40 characters" }),
    contactName: z
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

  const submitData = (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);
    navigate("/schoolverification");
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
          Sign up of school
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Start learning and reading without restrictions.{" "}
        </p>
        <form onSubmit={handleSubmit(submitData)} className="mt-8">
          <p className="my-3">
            <InputFormat
              type="text"
              placeholder="School Name"
              reg={register("schoolName")}
              errorMsg={errors.schoolName?.message}
            />
          </p>

          <p className="my-3">
            <InputFormat
              type="text"
              placeholder="School Address"
              reg={register("address")}
              errorMsg={errors.address?.message}
            />
          </p>

          <p className="my-3">
            <InputFormat
              type="text"
              placeholder="Contact Name"
              reg={register("contactName")}
              errorMsg={errors.contactName?.message}
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
            By continuing you agree to Kunda Kids{" "}
            <strong className=" text-black"> Terms of Service </strong>and{" "}
            <strong className="text-black"> Privacy Policy </strong>
          </p>
          {/* <Link to="/schoolverification"> */}
          <Button type="submit" size="full">
            Create free account
          </Button>
          {/* </Link> */}
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
