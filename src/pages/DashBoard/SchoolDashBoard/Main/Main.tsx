import {
  useGetAdmittedStudentsInSchool,
  useGetClassList,
  useGetSchoolContentStat,
  useGetTeacherList
} from "@/api/queries";
import ArrowDown from "@/assets/arrowdown.svg";
import StudentIcon from "@/assets/student3.svg";
import TeacherIcon from "@/assets/teacher3.svg";
import ProgressLog from "../Students/Profile/ProgressLog";
import { TTeacherList } from "../Teachers/Teachers";
import Card from "./Card";
import ClassLeaderboard from "./ClassLeaderboard";
import StudentLeaderboard from "./StudentLeaderboard";


export  type TLogData = {
  Stories: number;
  Audiobooks: number;
  Languages: number;

};

const Main = () => {
   const { data:logData } = useGetSchoolContentStat()
  const statLog:TLogData = logData ?.data.data
  const { data: teacherData } = useGetTeacherList();
  const teacherList: TTeacherList[] = teacherData?.data.data.records;
  const { data: studentData, isLoading } = useGetAdmittedStudentsInSchool();
  const {data:classData, } = useGetClassList()
  const studentList = studentData?.data.data.records;
  const totalStudent: number = studentList?.length;
  const totalTeacher: number = teacherList?.length;
  const totalClass: number = classData?.data.data.records?.length;



 

  
  return (
    <div className="h-[100%]  flex flex-col  overflow-y-scroll">
      <div className="flex justify-between                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ">
        <div>
          <h1 className="text-[25px] font-bold pl-4">Overview</h1>
        </div>
        <div className="flex justify-end px-8 gap-2 items-center">
          <span className="text-[#8530C1]">Last 7 days:</span>
          <span className="flex gap-2 justify-center items-center">
            <span> May 21 May 28 2023</span>
            <img
              loading="lazy"
              src={ArrowDown}
              alt="Arrowdown"
              className="w-4"
            />
          </span>
        </div>
      </div>
      <div className="flex flex-grow items-start  gap-4  ">
        <div className=" basis-full flex-grow  flex flex-col h-full ">
          <div className="flex  gap-4 items-center justify-center py-2">
            <Card title="Teachers" image={TeacherIcon} amount={totalTeacher} max={3} />
            <Card title="Students" image={StudentIcon} amount={totalStudent} max={10} />
            <Card title="Classes" image={StudentIcon} amount={totalClass}  max={3}/>
          </div>
          <div className="flex-grow flex ">
            <StudentLeaderboard data={studentList} isLoading={isLoading} />
          </div>
        </div>
        <div className="basis- basis-3/5  flex flex-col  h-full ">
          <ProgressLog
            logData={statLog}
          />
          <ClassLeaderboard data={teacherList} />
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
