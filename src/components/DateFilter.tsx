// import { Group } from '@mantine/core';
// // import { DatePicker } from '@mantine/dates';
// import { useState } from 'react';
// import DateRangePicker from 'rsuite/DateRangePicker';
import { useState } from 'react';
import { DateRangePicker } from 'rsuite';


type DateRange = Date;
const  MyDateFilter=()=> {
  const [value, setValue] = useState<DateRange[]>()
  
  if(value){
     console.log(value[0].getDate() + "-" + (value[0].getMonth() + 1) + "-" + value[0].getFullYear());
  console.log(value[1].getDate() + "-" + (value[1].getMonth() + 1) + "-" + value[1].getFullYear())
  }
 
  console.log("DateValuee-------------",value )
  return (
    <>
    <DateRangePicker  editable={false} 	placement={'bottomEnd'} onChange={(value)=>setValue(value as DateRange[])}/>
   
  </>
)
}

export default MyDateFilter;