// import EmailLogo from '@/assets/emaillogo.svg'
import Cancel from "@/assets/Cancel.svg";
import Button from "@/components/Button";
import { PinInput, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/common/User/FormValidation/Schema";
import { z, ZodType } from "zod";

const SecureAdminPortalContent = () => {
  const navigate = useNavigate();

  const schema: ZodType<Pick<FormData, "pin">> = z.object({
    pin: z
      .string()
      .min(4, { message: " Pin can only be at least 4 characters long" }),
  });

  const { handleSubmit, setValue, watch, trigger, formState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
    });

  const pin = watch("pin");

  const submitData = (data: Pick<FormData, "pin">) => {
    console.log("testing");
    console.log("It is working", data);
    navigate("/schoolcongratulations");
  };

  const handlePinChange = (value: string) => {
    console.log("-- pin value: ", value);
    setValue("pin", value);
    trigger("pin");
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
        <h1 className="font-bold text-[40px] font-Recoleta">
          Secure admin portal
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          create a passcode to secure your admin portal
        </p>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="mt-8 flex justify-center items-center flex-col">
            <Group position="center">
              <PinInput value={pin} onChange={handlePinChange} />
            </Group>
            <br />
            {formState.errors.pin && (
              <p className="text-red-700">
                PIN must be exactly 4 characters long
              </p>
            )}
          </div>

          <p className="mt-10">
            {/* <Link to="/schoolcongratulations"> */}
            <Button type="submit" size="full">
              Login
            </Button>
            {/* </Link> */}
          </p>
        </form>
        <p className="mt-6 text-center text-[]  ">
          <strong>Resend in 59s</strong>
        </p>
      </div>
    </div>
  );
};

export default SecureAdminPortalContent;
