import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useUpdateProfileUserNameSchoolName,
  useGetSuggestUserName,
  useUserNameChecker,
  useGetProfile,
  querykeys,
} from "@/api/queries";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Loader, TextInput } from "@mantine/core";
// import { Switch } from "@mantine/core";
import { useState } from "react";
import { Checkbox } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

const ProfileUpdateModal = ({
  close,
  image,
  name,
  id,
}: // openJoinChanllenge,
{
  image: string;
  name: string;
  id: number;
  close: () => void;
  openJoinChanllenge: () => void;
}) => {
  console.log(image, id);
  const schema: ZodType<Pick<FormData, "school_name">> = z.object({
    school_name: z.string().optional(), // Add validation for school_name if needed
  });
  const queryClient = useQueryClient();
  useGetProfile(true);

  const [userName, setUserName] = useState("");
  const { data: datta } = useGetSuggestUserName();
  const suggestions = datta?.data?.data?.suggestions;
  const [debounced] = useDebouncedValue(userName, 200);
  const {
    // data,
    isError,
    isLoading: isLoadingCheck,
    isInitialLoading,
  } = useUserNameChecker(debounced);
  const [joinSummerChallenge, setJoinSummerChallenge] = useState(false);
  const { mutate, isLoading } = useUpdateProfileUserNameSchoolName();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    console.log("dataaaaa", joinSummerChallenge);
    mutate(
      {
        profile_id: Number(sessionStorage.getItem("profileId")),
        schoolname: data?.school_name,
        username: userName,
        accept_challenge: joinSummerChallenge,
      },
      {
        async onSuccess(data) {
          queryClient.refetchQueries(querykeys.profiles).then(() => {
            close();
          });
          // openJoinChanllenge();
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
        <div className="my-4 mt-6">
          <p className="text1 font-bold leading-4">Update profile</p>
          <p className="text2 leading-4">
            Please update your profile to continue
          </p>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="mt-4">
              <p className="mb-8 suggestion-wrapper">
                <label htmlFor="name" className="text1 font-medium">
                  Username
                </label>
                {/* <InputFormat
                value={userName}
                reg={register("username")}
                errorMsg={errors?.username?.message}
                type="text"
                placeholder="Enter username"
                /> */}

                {suggestions && (
                  <TextInput
                    id="useNameSuggestion"
                    placeholder="Choose one or enter your desired username."
                    name="user name"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    list="user-name-suggestion"
                    autoComplete="false"
                    rightSection={
                      isInitialLoading && isLoadingCheck ? (
                        <Loader size="xs" />
                      ) : null
                    }
                    error={
                      !isLoadingCheck && isError && "user name already exist"
                    }
                  />
                )}

                {suggestions && (
                  <datalist id="user-name-suggestion" className="w-full">
                    {suggestions?.map((suggest: string) => (
                      <option key={suggest} value={suggest} className="w-full">
                        {suggest}
                      </option>
                    ))}
                  </datalist>
                )}
                <p className="text3 my-1">
                  Note: the username will be display on the leaderboard.
                </p>
              </p>
              <p className="mt-2 ">
                <p className="my-5">
                  <label htmlFor="name" className="text2  font-medium">
                    School (Optional)
                  </label>
                  <InputFormat
                    reg={register("school_name")}
                    type="text"
                    placeholder="Enter School Name"
                  />
                  <p className="text-[13px]">
                    You can win a gift for your school if you provide this
                    information.
                  </p>
                </p>
              </p>

              <p className="mt-2 mb-4">
                <Checkbox
                  onChange={(event) =>
                    setJoinSummerChallenge(event.currentTarget.checked)
                  }
                  label="I agree to join summer chanllenge"
                />
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
