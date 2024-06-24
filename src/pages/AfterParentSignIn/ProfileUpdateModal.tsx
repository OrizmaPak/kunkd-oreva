import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileUserNameSchoolName } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";

const ProfileUpdateModal = ({
  close,
  image,
  name,
  id,
  openJoinChanllenge,
}: {
  image: string;
  name: string;
  id: number;
  close: () => void;
  openJoinChanllenge: () => void;
}) => {
  console.log(image, id);
  const schema: ZodType<Pick<FormData, "username" | "school_name">> = z.object({
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(20, { message: "Name must not exceed 20 characters" }),
    school_name: z.string().optional(), // Add validation for school_name if needed
  });
  const { mutate, isLoading } = useUpdateProfileUserNameSchoolName();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("dataaaaa", data);
    mutate(
      {
        profile_id: +sessionStorage.getItem("profileId")!,
        schoolname: data?.school_name,
        username: data?.username,
      },
      {
        async onSuccess(data) {
          close();
          openJoinChanllenge();
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
      <div className="px-2">
        <div className="my-3 ">
          <div className="flex justify-center items-center  mb-4">
            <img src={image} alt="image" className="w-[70px]" />
          </div>

          <p className="text-center text25 font-Hanken font-medium leading-4">{`Complete   ${name}’s profile`}</p>
          <p className="text2 text-center">
            {`  Please update ${name}’s profile to continue`}
          </p>
        </div>
        <div className="my-4 mt-8">
          <p className="text1 font-bold leading-4">Update profile</p>
          <p className="text2 leading-4">
            Please update your profile to continue
          </p>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="mt-4">
              <p>
                <label htmlFor="phone" className="text2 font-medium">
                  Username
                </label>
                <InputFormat
                  reg={register("username")}
                  errorMsg={errors?.username?.message}
                  type="text"
                  placeholder="Enter Username"
                />
                <p className="text3 ">
                  Note: the username will be display on the leaderboard.
                </p>
              </p>

              <p className="mt-2 mb-8">
                <p className="my-5">
                  <label htmlFor="name" className="text2  font-medium">
                    School (Optional)
                  </label>
                  <InputFormat
                    reg={register("school_name")}
                    type="text"
                    placeholder="Enter School Name"
                  />
                  <p className="text2">
                    You can win a gift for your school if you provide this
                    information.
                  </p>
                </p>
              </p>
              <Button type="submit">
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span>Continue</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdateModal;
