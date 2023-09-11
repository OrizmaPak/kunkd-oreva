import ArrowDown from "@/assets/arrowdown.svg";
import StudentIcon from "@/assets/student3.svg";
import Card from "./Card";
import TotalTimeSpent from "./TotalTimeSpent";
import StudentLeaderboard from "../../SchoolDashBoard/Main/StudentLeaderboard";
import ProgressLog from "../../SchoolDashBoard/Students/Profile/ProgressLog";
import { useGetAdmittedStudentsInClass } from "@/api/queries";
import { TRequestStudents } from "../Request/Request";

const Main = () => {
  const { data, isLoading } = useGetAdmittedStudentsInClass();
  const studentList: TRequestStudents[] = data?.data.data.records;
  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <div className="flex justify-between px-8 gap-2">
        <h1 className="font-bold text-[30px] font-Recoleta">Overview</h1>
        <span className="flex gap-2 justify-center items-center">
          <span className="text-[#8530C1]">Last 7 days:</span>
          <span> May 21 May 28 2023</span>
          <img loading="lazy" src={ArrowDown} alt="Arrowdown" className="w-4" />
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
            amount={studentList?.length}
          />

          <ProgressLog />

          <TotalTimeSpent />
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
