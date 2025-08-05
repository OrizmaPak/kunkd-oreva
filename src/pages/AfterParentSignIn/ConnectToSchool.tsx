import { useConnectStudentData, useGetProfile, useGetSchoolProfileForStudent, useGetUpdatedProfile } from '@/api/queries';
import SignInWrapper from '@/common/SignInWrapper';
import useDebounce from '@/hooks/useDebounce';
import { getUserState } from '@/store/authStore';
import { useEffect, useState } from 'react';
import Button from "@/components/Button";
import useStore from "@/store/index";
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from '@/api/helper';
import InputFormat from '@/common/InputFormat';
import { Loader } from "@mantine/core"; // FIX: Added Loader import

// Define form type
type FormData = {
  firstname: string;
  lastname: string;
  classid: string;
};

type Tclass = {
  id: string | number;
  name: string;
};

const ConnectToSchool = () => {
  const { data: profile } = useGetProfile();
  const { mutate, isLoading } = useConnectStudentData();

  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const { data: schoolCurData } = useGetSchoolProfileForStudent(debounceValue);
  const schData = schoolCurData?.data?.data;

  const [user, setUser] = useStore(getUserState);
  const { data } = useGetUpdatedProfile();
  const currentUserProfile = data?.data?.data;

  useEffect(() => {
    if (currentUserProfile) {
      setUser({ ...user, ...currentUserProfile });
    }
  }, [currentUserProfile]);

  const queryClient = useQueryClient();

  const schema: ZodType<FormData> = z.object({
    firstname: z.string()
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(40, { message: "First name must not exceed 20 characters" }),
    lastname: z.string()
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(40, { message: "Last name must not exceed 20 characters" }),
    classid: z.string()
      .min(1, { message: "Select a class" })
      .max(20, { message: "Invalid class id" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (datta: FormData) => {
    mutate(
      {
        profile_id: Number(profile?.data?.data?.[0]?.id),
        firstname: datta.firstname,
        lastname: datta.lastname,
        school_id: schData?.id,
        class_id: Number(datta.classid),
      },
      {
        onSuccess(data) {
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
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
        <div className="px-4 bg-white rounded-[50px] p-6 mt-10 w-[550px]">
          <div className="flex justify-between items-center">
            <h1 className="text-center font-Recoleta font-bold text-[30px] flex-grow">
              Connect to school
            </h1>
          </div>
          <p className="text-center my-5">
            Connect your child to his/her school to enjoy...
          </p>
          <div className="px-10">
            <form onSubmit={handleSubmit(submitData)}>
              <p className="my-5">
                <InputFormat
                  reg={register("firstname")}
                  errorMsg={errors?.firstname?.message}
                  type="text"
                  placeholder="First name"
                />
              </p>
              <p className="my-5">
                <InputFormat
                  reg={register("lastname")}
                  errorMsg={errors?.lastname?.message}
                  type="text"
                  placeholder="Last name"
                />
              </p>
              <p className="my-5">
                <InputFormat
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type="text"
                  placeholder="School Code"
                />
              </p>
              <p className="my-5">
                <div className="border border-[#F3DAFF] py-2 px-8 rounded-full">
                  {schData?.name || "School Name"}
                </div>
              </p>
              <p className="my-5">
                <div className="border border-[#F3DAFF] py-3 px-8 rounded-full">
                  <select
                    {...register("classid")}
                    className="w-full focus:outline-none text-[14px]"
                  >
                    <option value="">Select class</option>
                    {schData?.classes?.map((classs: Tclass, index: number) => (
                      <option key={index} value={classs.id}>
                        {classs.name}
                      </option>
                    ))}
                  </select>
                </div>
              </p>
              <p className="my-5">
                <Button type="submit" backgroundColor="green" className="rounded-full w-full">
                  {isLoading ? <Loader color="white" size="sm" /> : "Continue"}
                </Button>
              </p>
            </form>
          </div>
        </div>
      </SignInWrapper>
    </div>
  );
};

export default ConnectToSchool;
