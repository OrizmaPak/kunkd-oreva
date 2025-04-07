import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { useGetSupportCategories, useSupportMessage } from "@/api/queries";
import { TSupportCategory } from "@/api/types";
import { getApiErrorMessage } from "@/api/helper";
const ContactUsModal = ({ close }: { close: () => void }) => {
  const schema: ZodType<FormData> = z.object({
    subjectId: z.string().min(1, { message: "Subject is invalid" }),
    body: z.string().min(1, { message: "Body of messeage is empty" }),
  });
  const { data } = useGetSupportCategories();
  const supportcategories = data?.data?.data;
  const { mutate, isLoading } = useSupportMessage();
  // console.log("matthew ");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const SubmitData = async (datta: FormData) => {
    console.log("matthew ");
    console.log("data", datta);
    mutate(
      {
        category_id: Number(datta?.subjectId),
        content: datta?.body || "",
      },
      {
        onSuccess(data) {
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
    <div className="h-[481px]">
      <div>
        <p className=" bg-customGreen font-InterReg text-[18px] px-[20px] py-[12px] text-white ">
          Contact Us
        </p>
      </div>

      <div>
        <div className=" px-8 mt-7">
          <form onSubmit={handleSubmit(SubmitData)}>
            <div className="mt-4">
              {/* Dropdown for selecting category */}
              <p
                className={`p-3 mb-2 rounded-full flex items-center gap-2 h-[44px] ${
                  errors?.subjectId
                    ? "border-red-700 border-[1px]"
                    : "bg-[#F1F1F1]"
                }`}
              >
                <select
                  {...register("subjectId")} // Ensure this matches the schema
                  name="subjectId"
                  id="subjectId"
                  className="w-full bg-[#F1F1F1] h-full focus-within:outline-none bg-inherit"
                >
                  <option value="">Select Category</option>
                  {supportcategories?.map((each: TSupportCategory) => (
                    <option key={each.id} value={each.id}>
                      {each.name}
                    </option>
                  ))}
                </select>
              </p>
              <span className="text-red-600 mb-10">
                {errors?.subjectId?.message}
              </span>
            </div>

            <div className="mt-4">
              {/* Textarea for message body */}
              <textarea
                {...register("body")} // Corrected to match the schema
                name="body"
                id="body"
                placeholder="Message"
                className="w-full h-[250px] bg-[#F1F1F1] rounded-2xl p-4 focus:outline-none"
              ></textarea>
              <span className="text-red-600 mb-10">
                {errors?.body?.message}
              </span>
            </div>

            <p className="my-5 flex gap-5 justify-center">
              {/* Close button */}
              <Button
                size="sm"
                onClick={close}
                className="text-black bg-[#F1F1F1] rounded-full px-[40px]"
              >
                Close
              </Button>

              {/* Submit button */}
              <Button
                size="sm"
                type="submit"
                backgroundColor="green"
                className="rounded-full px-[20px]"
              >
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="#BCD678" size="sm" />
                  </p>
                ) : (
                  <span className="flex gap-3 items-center">Send message</span>
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
