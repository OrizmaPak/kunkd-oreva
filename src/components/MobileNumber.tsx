import { NumberInput } from "@mantine/core";
import { TCountry } from "api/types";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import CountryPicker from "./CountryPicker";

const MobileNumber = () => {
  const [formValues, setFormValue] = useState({
    international_phone_number: 0,
    phone_country_code: "",
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <NumberInput
          hideControls
          placeholder="Enter your mobile number"
          //   leftSectionWidth={100}
          onChange={(value) => {
            setFormValue({
              ...formValues,
              international_phone_number: value as number,
            });
          }}
          icon={
            <CountryPicker
              onSelect={(country: TCountry) => {
                setFormValue({
                  ...formValues,
                  phone_country_code: country?.callingCodes[0],
                });
              }}
            />
          }
          thousandsSeparator=" "
          label={"Mobile Number"}
          rightSection={<IoClose />}
          rightSectionWidth={50}
        />
      </div>
    </div>
  );
};

export default MobileNumber;
