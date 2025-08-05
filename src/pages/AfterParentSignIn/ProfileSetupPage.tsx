import { useGetSuggestUserName, useProfle, useUserNameChecker } from "@/api/queries";
import SignInWrapper from "@/common/SignInWrapper";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useDebouncedValue } from "@mantine/hooks";
import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
// import { useForm } from "react-hook-form";
// import { ZodType, z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "@/api/helper";
import { Chip, Loader, TextInput } from "@mantine/core";
import KundaLogo from "@/assets/KundaLogo.svg";
import { useNavigate } from "react-router-dom";

type FormData = {
  dob: string;
  name: string;
};

const ProfileSetupPage = ({
  setChildProfile,
}: {
  setChildProfile: (val: string) => void;
}) => {
  const today = new Date().toISOString().split("T")[0]; // Max date for DOB

//   const schema: ZodType<FormData> = z.object({
//     dob: z
//       .string()
//       .min(4, { message: "Invalid DOB" })
//       .max(20, { message: "Invalid DOB" }),
//     name: z
//       .string()
//       .min(1, { message: "Name is required" })
//       .max(50, { message: "Name must be less than 50 characters" }),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");

  const { mutate } = useGetSuggestUserName();
  const [suggestions, setSuggestion] = useState<string[]>([]);

  const handleUsernameSuggestion = (name: string) => {
    mutate(
      { name },
      {
        onSuccess(data) {
          setSuggestion(data?.data?.data?.suggestions || []);
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

  const ref = useRef<HTMLInputElement>(null);
  const [debounced] = useDebouncedValue(userName, 200);
  const { data, isError, isLoading, isInitialLoading } =
    useUserNameChecker(debounced);
  const { isLoading:isLoadingProfileSetUp, mutate:mutateUseProfile } = useProfle();

  const onSubmit = () => {
    console.log("name", name);
    console.log("age", age);
    mutateUseProfile(
      {
        name,
        dob: age,
        is_avatar: "false",
        username: userName,
      },
      {
        onSuccess(data) {
          if (setChildProfile) setChildProfile(data?.data.data.profile_id);
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          sessionStorage.setItem("showJoinChallenge", "true");
          navigate("/profilesuccess");
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
    <div>
      <SignInWrapper>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-[50px] p-6 mt-10 w-[550px]"
        >
          <div className="px-14">
            <div className="flex justify-center items-center mt-10 mb-4 ">
              <img src={KundaLogo} alt="image" className="w-[160px]" />
            </div>
            <div>
              <h1 className="font-bold fon header2 font-BalooSemiBold text-center">
                Create child’s profile
              </h1>
              <p className="text2 text-[#A7A7A7]   font-ArimoRegular text-center mb-8">
                Enter the child’s name below
              </p>
            </div>
            <div className="max-w-[400px] mx-auto mt-10">
              {/* Name Input */}
              <p className="my-5">
                <input
                  value={name}
                  className={`border rounded-full py-3 px-4 w-full text-black text-[14px] focus:outline-none ${
                    name ? "bg-[#FFF6D9]" : "bg-[#ECEFF1]"
                  }`}
                  onBlur={() => handleUsernameSuggestion(name)}
                  type="text"
                  placeholder="Enter your child's name"
                  onChange={(e) => setName(e.target.value)}
                />
              </p>

              {/* Username Suggestions */}
              <p className="suggestion-wrapper">
                <TextInput
                  id="useNameSuggestion"
                  placeholder="Choose one or enter your desired username."
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  height={40}
                  ref={ref}
                  list="user-name-suggestion"
                  rightSection={
                    isInitialLoading && isLoading ? <Loader size="xs" /> : null
                  }
                  error={!isLoading && isError && "Username already exists"}
                  styles={{
                    input: {
                      backgroundColor: userName ? "#FFF6D9" : "#ECEFF1",
                    },
                  }}
                />

                <Chip.Group
                  onChange={(value) => setUserName(value as string)}
                  value={userName}
                >
                  <div className="flex my-2 flex-wrap gap-2 gap-y-3">
                    {suggestions?.map((suggest: string) => (
                      <Chip key={suggest} value={suggest}>
                        {suggest}
                      </Chip>
                    ))}
                  </div>
                </Chip.Group>

                {suggestions && (
                  <datalist id="user-name-suggestion" className="w-full">
                    {suggestions?.map((suggest: string) => (
                      <option key={suggest} value={suggest} />
                    ))}
                  </datalist>
                )}
              </p>

              {/* DOB Input */}
              <p className="mb-12">
                <InputFormat
                //   reg={register("dob")}
                //   errorMsg={errors.dob?.message}
                  type="date"
                  placeholder="DOB"
                  dateMax={today}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAge(e.target.value)
                  }
                />
              </p>

              {/* Continue Button */}
              <p className="mb-8">
                <Button
                className="rounded-full w-full"
                  backgroundColor="green"
                  disable={isLoadingProfileSetUp||isError || isLoading || name === ""}
                  type="button"
                  onClick={onSubmit}
                  
                >
                  Continue
                </Button>
              </p>
            </div>
          </div>
        </motion.div>
      </SignInWrapper>
    </div>
  );
};

export default ProfileSetupPage;
