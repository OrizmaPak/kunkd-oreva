import { getApiErrorMessage } from "@/api/helper";
import { useCreateParentUser } from "@/api/queries";
import Cancel from "@/assets/Cancel.svg";
import FormWrapper from "@/common/FormWrapper";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
// import { motion } from "framer-motion";

const ParentSignupDetails = ({ onSubmit }: { onSubmit: () => void }) => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useCreateParentUser();
  const [, setUser] = useStore(getUserState);
  const schema: ZodType<FormData> = z.object({
    firstname: z
      .string()
      .min(2, { message: "First must be at least 2 characters long" })
      .max(40, { message: "First must not exceed 20 characters" }),
    lastname: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(40, { message: "Last name must not exceed 30 characters" }),
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    setUser({ email: data.email });

    mutate(
      { ...data },

      {
        onSuccess(data) {
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
              Sign up of parent
            </h1>
            <p className="text2 text-[#A7A7A7] font-Hanken">
              Start learning and reading without restrictions.{" "}
            </p>
            <form className="mt-8" onSubmit={handleSubmit(submitData)}>
              <p className="my-8 flex  w-full justify-between gap-2">
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

              <p className="my-8">
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

            <p className="mt-2  text-center text2 text-gray-400 ">
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
