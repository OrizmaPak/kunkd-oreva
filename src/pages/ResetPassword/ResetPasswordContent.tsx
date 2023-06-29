import Cancel from "@/assets/Cancel.svg";
import { PinInput, Group } from "@mantine/core";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const ResetPasswordContent = ({ onSubmit }: { onSubmit?: () => void }) => {
  const [pinValue, setPinValue] = useState("");

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
      if (onSubmit) onSubmit();
    }
  };

  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute">
          <img src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[40px] font-Recoleta">Reset password</h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Enter the reset code that was sent to your email.
        </p>
        <form onSubmit={submitData}>
          <div className="mt-8 flex justify-center items-center">
            <Group position="center">
              <PinInput value={pinValue} onChange={handlePinChange} />
            </Group>
          </div>

          <p className="mt-10">
            <Link to="/newpassword">
              <Button size="full">Reset</Button>
            </Link>
          </p>
        </form>
        <p className="mt-2 text-center text-[] text-gray-400 ">Resend in 59s</p>
      </div>
    </div>
  );
};

export default ResetPasswordContent;
