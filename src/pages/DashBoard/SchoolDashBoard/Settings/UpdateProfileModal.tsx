import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";
import { motion } from "framer-motion";
import { FormData } from "@/common/User/FormValidation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import InputFormat from "@/common/InputFormat";
import { Loader } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

import { AiOutlineMail } from "react-icons/ai";
import Button from "@/components/Button";
import { useUpdateSchoolNameAddress, useUpdateSchProfile } from "@/api/queries";

const UpdateProfileModal = ({ close }: { close: () => void }) => {
  const [user, setUser] = useStore(getUserState);
  const queryClient = useQueryClient();

  const schema: ZodType<FormData> = z.object({
    school_name: z
      .string()
      .min(2, { message: "School name must be at least 2 characters long" })
      .max(40, { message: "School name must not exceed 20 characters" }),
    school_address: z
      .string()
      .min(2, { message: "School address must be at least 2 characters long" })
      .max(50, { message: "School address must not exceed 40 characters" }),
    contact_name: z
      .string()
      .min(2, { message: "Contact name must be at least 2 characters long" })
      .max(20, { message: "Contact name must not exceed 20 characters" }),
    phone: z
      .string()
      .min(11, { message: "Phone number must not less than 11 characters" })
      .max(14, { message: "Phone number must not more than 14 characters" }),
  });

  const { mutate, isLoading } = useUpdateSchoolNameAddress();
  const { mutate: mutateContactPerson, isLoading: isLoadingContactPerson } =
    useUpdateSchProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (datta: FormData) => {
    mutate(
      {
        ...user?.school,
        school_name: datta.school_name as string,
        address: datta.school_address as string,
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries(["GetUpdatedProfile"]);
          console.log("data", data?.data?.data?.name);
          console.log("data", data?.data?.data?.address);

          setUser({
            ...user,
            school: {
              ...user?.school,
              name: data?.data?.data?.name,
              address: data?.data?.data?.address,
            },
            address: data?.data?.data?.address,
          });
          close();
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },

        onError(err) {
          close();

          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
    mutateContactPerson(
      {
        contact_name: datta.contact_name as string,
        email: datta.email as string,
        address: datta.school_address as string,
        phone: datta.phone as string,
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries(["GetUpdatedProfile"]);
          setUser({
            ...user,
            school: {
              ...user?.school,
              address: data.data.data.address,
              contact_name: data?.data?.data?.contact_name,
            },
          });
          close();
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },

        onError(err) {
          close();

          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center mb-8 bg-customGreen px-6 py-4 ">
          <p className=" font-InterReg text20   flex-grow text-white ">
            Edit Profile Info
          </p>
        </div>

        <form onSubmit={handleSubmit(submitData)} className="px-[24px]">
          <div className="mb-5">
            <InputFormat
              reg={register("school_name")}
              errorMsg={errors?.school_name?.message}
              value={user?.school?.name}
              placeholder="School Name"
              type="text"
            />
          </div>
          <div className="mb-5">
            <InputFormat
              reg={register("school_address")}
              errorMsg={errors?.school_address?.message}
              value={user?.school?.address}
              placeholder="School Address"
              type="text"
            />
          </div>
          <div className="mb-5">
            <InputFormat
              reg={register("contact_name")}
              errorMsg={errors.contact_name?.message}
              value={user?.school?.contact_name}
              placeholder="Contact Name"
              type="text"
            />
          </div>
          <div className="mb-5">
            <InputFormat
              reg={register("phone")}
              errorMsg={errors.email?.message}
              type="number"
              value={user?.phone}
              placeholder="Phone number"
              leftIcon={<AiOutlineMail size={20} color="#c4ccd0" />}
            />
          </div>

          <div className="flex gap-2 mb-5"></div>
          <div className=" mx-auto my-4 flex gap-3 justify-center ">
            <Button
              size="sm"
              onClick={close}
              className="text-black bg-[#F1F1F1] rounded-full px-[40px]  "
            >
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              backgroundColor="green"
              className="text-white rounded-full px-[40px] "
            >
              {isLoading || isLoadingContactPerson ? (
                <p className="flex justify-center items-center ">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateProfileModal;
