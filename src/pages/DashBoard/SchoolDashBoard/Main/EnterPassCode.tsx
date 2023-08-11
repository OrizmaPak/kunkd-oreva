import { PinInput, Group } from "@mantine/core";
// import { useState } from "react";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
// import { userContext } from "@/Context/StateProvider";
import { motion } from "framer-motion";
// import useStore from "@/store/index";
// import { getUserState } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";
import { useVerifyPin } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { getApiErrorMessage } from "@/api/helper";

const EnterPassCode = ({ onSubmit }: { onSubmit: () => void }) => {
  const navigate = useNavigate();
  // const [pinValue, setPinValue] = useState("");
  // const [user, ,] = useStore(getUserState);

  // const [{ userType }] = userContext();
  // const goToSchoolDashboard = () => {
  //   console.log("usertype", userType);
  //   if (user?.role === "schoolAdmin") {
  //     navigate("../schooldashboard");
  //   }
  // };

  // const handlePinChange = (value: string) => {
  //   setPinValue(value);
  //   // console.log(value);
  // };

  // const submitData = () => {
  //   console.log("It is working");
  //   console.log(pinValue);
  //   if (pinValue.length < 4) {
  //     console.log(pinValue.length);
  //     return;
  //   } else {
  //     onSubmit();
  //     goToSchoolDashboard();
  //   }
  // };

  const { isLoading, mutate } = useVerifyPin();
  // const [user] = useStore(getUserState);

  const schema: ZodType<Pick<FormData, "pin">> = z.object({
    pin: z
      .string()
      .min(4, { message: " Pin can only be at least 4 characters long" }),
  });

  const { handleSubmit, setValue, watch, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const pin = watch("pin");

  const submitData = (data: Pick<FormData, "pin">) => {
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
          navigate("../schooldashboard");
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

  const handlePinChange = (value: string) => {
    console.log("-- pin value: ", value);
    setValue("pin", value);
    trigger("pin");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-20">
        <div className="text-center mt-10">
          <h1 className="text-center font-Recoleta text-[30px]">
            Enter passcode
          </h1>
          <p>Enter passcode to access the admin portal</p>
        </div>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="mt-8 flex justify-center items-center relative">
            <Group position="center">
              <PinInput value={pin} onChange={handlePinChange} />
            </Group>
          </div>
          <p className="my-10 ">
            <Button size="full" type="submit">
              {isLoading ? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default EnterPassCode;
