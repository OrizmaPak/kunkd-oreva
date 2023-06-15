import Button from "@/components/Button";
import Apple from "@/assets/apple2.svg";
import Facebook from "@/assets/facebook.svg";
import Google from "@/assets/googleicon2.svg";
import InputFormat from "../../common/InputFormat";
import EmailLogo from "@/assets/emaillogo.svg";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import Cancel from "@/assets/Cancel.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { Modal } from "@mantine/core";
import { STEP_1, STEP_2 } from "@/utils/constants";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import StudentLoginModal from "./StudentLoginModal";
import TeacherLoginModal from "./TeacherLoginModal";

const users = [
  {
    email: "jimatth222@gmail.com",
    isTeacher: "true",
  },
  {
    email: "kizito222@gmail.com",
    isStudent: "true",
  },
];

const LoginContent = () => {
  const schema: ZodType<FormData> = z.object({
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

  const [opened, { open, close }] = useDisclosure(false);
  const [modalStep, setModalStep] = useState(STEP_1);
  console.log("--- errors", errors);

  const submitData = (data: FormData) => {
    console.log("It is working", data);
    const user = users.find((el) => el.email === data.email);
    if (user?.isTeacher) {
      setModalStep(STEP_1);
    }
    if (user?.isStudent) {
      setModalStep(STEP_2);
    }
    open();
  };

  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative">
      <Modal
        radius={"xl"}
        size="lg"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
      >
        {modalStep === STEP_1 && <TeacherLoginModal />}

        {modalStep === STEP_2 && <StudentLoginModal />}
      </Modal>

      <Link to="/">
        <span className="absolute">
          <img src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%] pt-20">
        <span></span>
        <h1 className="font-bold fon text-[40px] font-Recoleta">
          Welcome back
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Welcome back! please enter your details{" "}
        </p>
        <form onSubmit={handleSubmit(submitData)}>
          <p className="my-8">
            {
              <InputFormat
                type="text"
                placeholder="Email"
                reg={register("email")}
                leftIcon={<img src={EmailLogo} alt="pasword icon" />}
                errorMsg={errors.email?.message}
              />
            }
          </p>
          <p className="my-4">
            <InputFormat
              type="password"
              placeholder="password"
              reg={register("password")}
              leftIcon={<img src={PasswordIcon} alt="pasword icon" />}
              rightIcon={<img src={PasswordEye} alt="paswordeye icon" />}
              errorMsg={errors.password?.message}
            />
          </p>
          <p className="flex justify-end mb-8 text-[#8530C1] font-bold">
            <Link to="/forgotpassword">
              <button>Forgot password?</button>
            </Link>
          </p>
          <Button type="submit" size="full">
            Login
          </Button>
          <p className="flex justify-center mt-8 text-[#8530C1] font-bold underline">
            <button>Sign In as Student</button>
          </p>
        </form>
        <p className="flex items-center justify-items-center py-8 gap-3  text-gray-400 font-400">
          <hr className="flex-1" />
          <span>or continue with</span> <hr className="flex-1" />
        </p>
        <div className="flex gap-8">
          <Button size="full" varient="outlined">
            <img src={Google} alt="google" className="mx-auto " />
          </Button>
          <Button size="full" varient="outlined">
            <img src={Apple} alt="apple" className="mx-auto " />
          </Button>
          <Button size="full" varient="outlined">
            <img src={Facebook} alt="facebook" className="mx-auto " />
          </Button>
        </div>
        <p className="mt-2 text-center text-[] text-gray-400 ">
          <span className="font-Hanken">Don't hava an account? </span>
          <Link to="/signup">
            <button className="mt-8 text-[#8530C1] font-bold">Sign up</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginContent;
