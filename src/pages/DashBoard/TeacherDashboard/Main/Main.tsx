import {
  useGetAdmittedStudentsInClass,
  useGetClassTotalTimeSpent
} from "@/api/queries";
import StudentIcon from "@/assets/student3.svg";
import MyDateFilter from "@/components/DateFilter";
import StudentLeaderboard from "../../SchoolDashBoard/Main/StudentLeaderboard";
import ProgressLog from "../../SchoolDashBoard/Students/Profile/ProgressLog";
import { TRequestStudents } from "../Request/Request";
import Card from "./Card";
import TotalTimeSpent from "./TotalTimeSpent";
import { useGetClassContentStat } from "@/api/queries";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import { TLogData } from "../../SchoolDashBoard/Main/Main";
import { useState } from "react";


const Main = () => {
  const [user, ] = useStore(getUserState)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")



const {data:totalTimeSpentData} = useGetClassTotalTimeSpent(user?.school?.class?.class_id.toString() as string, startDate, endDate)
  const totalTimeSpent = totalTimeSpentData?.data?.data
  console.log("mytime-----",totalTimeSpent)
  const {data:logData} = useGetClassContentStat(user?.school?.class?.class_id.toString() as string, startDate, endDate)
  const statLog:TLogData = logData ?.data.data

  const { data, isLoading } = useGetAdmittedStudentsInClass("active");
  const studentList: TRequestStudents[] = data?.data.data.records;

 
  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <div className="flex justify-between  gap-2">
        <h1 className="font-bold text-[30px] font-Recoleta">Overview</h1>
        <span className="flex gap-2 justify-center items-center">
          <span className="text-[#8530C1]">Sort by Date:</span>
          <span> 
          <MyDateFilter setStartDate={setStartDate} setEndDate={setEndDate}/>

        </span>
        </span>
      </div>
      <div className=" flex gap-5 flex-grow">
        <div className=" basis-full flex-grow flex  ">
          <StudentLeaderboard data={studentList} isLoading={isLoading} />
        </div>

        <div className=" basis-3/5 flex flex-col ">
          <Card
            image={StudentIcon}
            title="Students"
            amount={studentList ? studentList?.length : 0}
          />

          <ProgressLog
          logData={statLog}
           
          />

          <TotalTimeSpent totalTimeSpent={totalTimeSpent} />
        </div>
      </div>
      <style>
        {`
       ::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
        `}
      </style>
    </div>
  );
};

export default Main;
