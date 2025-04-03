import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
const ContactUsModal = ({ close }: { close: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const schema: ZodType<FormData> = z.object({
    subject: z.string().min(1, { message: "Subject is invalid" }),
    body: z.string().min(1, { message: "Body of messeage is empty" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className="h-[481px]">
      <div>
        <p className=" bg-customGreen font-InterReg text-[18px] px-[20px] py-[12px] text-white ">
          Contact Us
        </p>
      </div>

      <div>
        <div className=" px-8 mt-7">
          <form>
            <div className="mt-4">
              <p
                className={`p-3 mb-2  rounded-full flex items-center gap-2 h-[44px] ${
                  errors?.subject
                    ? "border-red-700 border-[1px]"
                    : " bg-[#F1F1F1]"
                }`}
              >
                <select
                  {...register("subject")}
                  name="age-group"
                  id="age-group"
                  className="w-full bg-[#F1F1F1] h-full focus-within:outline-none bg-inherit"
                >
                  <option className=" bg:in " value="">
                    Select Age Group
                  </option>
                  <option value="2-4">General Inquiries</option>
                  <option value="5-7">Technical Support</option>
                  <option value="8-10">Subscription & Billing</option>
                  <option value="Feature Requests & Feedback">
                    Feature Requests & Feedback
                  </option>
                  <option value="Content & Learning Resources">
                    Content & Learning Resources
                  </option>
                </select>
              </p>
              <span className="text-red-600 mb-10 ">
                {errors?.ageGroup?.message}
              </span>
            </div>
            <div className="mt-4">
              <textarea
                {...register("subject")}
                name="body"
                id="body"
                placeholder="Message"
                className="w-full h-[250px]  bg-[#F1F1F1] rounded-2xl p-4 focus:outline-none "
              ></textarea>
              <span className="text-red-600 mb-10 ">
                {errors?.ageGroup?.message}
              </span>
            </div>
            <p className="my-5 flex gap-5  justify-center">
              <Button
                size="sm"
                onClick={close}
                className="text-black bg-[#F1F1F1] rounded-full px-[40px] "
              >
                Close
              </Button>
              <Button
                type="submit"
                size="sm"
                backgroundColor="green"
                className="rounded-full px-[20px]"
              >
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="white" size="sm" />
                  </p>
                ) : (
                  <span className="flex gap-3 items-center ">Send message</span>
                )}
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsModal;
