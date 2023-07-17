import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import EmailLogo from "@/assets/emaillogo.svg";
import Cancel from "@/assets/Cancel.svg";
import { Link } from "react-router-dom";
import FormWrapper from "@/common/FormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useCreateParentUser } from "@/api/queries";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";

const ParentSignupDetails = ({ onSubmit }: { onSubmit: () => void }) => {
  const { isLoading, mutate } = useCreateParentUser();
  const schema: ZodType<FormData> = z.object({
    firstname: z
      .string()
      .min(4, { message: "First must be at least 4 characters long" })
      .max(20, { message: "First must not exceed 20 characters" }),
    lastname: z
      .string()
      .min(4, { message: "Last name must be at least 4 characters long" })
      .max(40, { message: "Last name must not exceed 30 characters" }),
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("testing");
    console.log("It is working", data);

    mutate(
      { ...data },
      {
        onSuccess(data) {
          console.log("success", data.data.message);

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
      <div className="w-[100%] max-w-[500px] mx-auto relative">
        <Link to="/">
          <span className="absolute right-0 top-[-30px]">
            <img loading="lazy" src={Cancel} alt="cancel" />
          </span>
        </Link>
        <div className="w-[100%] pt-20">
          <span></span>
          <h1 className="font-bold fon text-[40px] font-Recoleta">
            Sign up of parent
          </h1>
          <p className="text-[15px] text-[#A7A7A7] font-Hanken">
            Start learning and reading without restrictions.{" "}
          </p>
          <form className="mt-8" onSubmit={handleSubmit(submitData)}>
            <p className="my-8 flex gap-2">
              <InputFormat
                type="text"
                placeholder="First Name"
                reg={register("firstname")}
                errorMsg={errors.name?.message}
              />

              <InputFormat
                type="text"
                placeholder="Last Name"
                reg={register("lastname")}
                errorMsg={errors.address?.message}
              />
            </p>

            <p className="my-8">
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

            <p className="text-center font-Hanken m-3 mt-4 text-gray-400">
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
    </FormWrapper>
  );
};

export default ParentSignupDetails;
