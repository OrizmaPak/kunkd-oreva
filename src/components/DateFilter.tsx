// import { Group } from '@mantine/core';
// // import { DatePicker } from '@mantine/dates';
// import { useState } from 'react';
// import DateRangePicker from 'rsuite/DateRangePicker';
import { useState } from "react";
import { DateRangePicker } from "rsuite";

type DateRange = Date;
const MyDateFilter = ({
  setStartDate,
  setEndDate,
}: {
  setStartDate: (val: string) => void;
  setEndDate: (val: string) => void;
}) => {
  const [value, setValue] = useState<DateRange[]>();

  if (value) {
    setStartDate(
      value[0].getFullYear() +
        "-" +
        (value[0].getMonth() + 1) +
        "-" +
        value[0].getDate()
    );
    setEndDate(
      value[1].getFullYear() +
        "-" +
        (value[1].getMonth() + 1) +
        "-" +
        value[1].getDate()
    );
  } else {
    setStartDate("");
    setEndDate("");
  }

  return (
    <>
      <DateRangePicker
        editable={false}
        placement={"bottomEnd"}
        onChange={(value) => setValue(value as DateRange[])}
      />
    </>
  );
};

export default MyDateFilter;
