import { PinInput, Group } from "@mantine/core";
import { useState } from "react";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { userContext } from "@/Context/StateProvider";
import { motion } from "framer-motion";

const EnterPassCode = ({ onSubmit }: { onSubmit: () => void }) => {
  const navigate = useNavigate();
  const [pinValue, setPinValue] = useState("");

  const [{ email, userType }, dispatch] = userContext();
  const goToSchoolDashboard = () => {
    console.log("usertype", userType);
    if (userType === "school") {
      navigate("../schooldashboard");
    }
  };

  const handlePinChange = (value: string) => {
    setPinValue(value);
    // console.log(value);
  };

  const submitData = () => {
    console.log("It is working");
    console.log(pinValue);
    if (pinValue.length < 4) {
      console.log(pinValue.length);
      return;
    } else {
      onSubmit();
      goToSchoolDashboard();
    }
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
        <div className="mt-8 flex justify-center items-center relative">
          <Group position="center">
            <PinInput value={pinValue} onChange={handlePinChange} />
          </Group>
        </div>
        <p className="my-10 ">
          <Button onClick={submitData} size="full" type="submit">
            Continue
          </Button>
        </p>
      </div>
    </motion.div>
  );
};

export default EnterPassCode;
