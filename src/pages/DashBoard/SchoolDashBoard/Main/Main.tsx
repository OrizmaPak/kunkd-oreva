import {
  useGetAdmittedStudentsInSchool,
  useGetSchoolContentStat,
  useGetTeacherList,
  useGetLicense,
  useGetUpdatedProfile,
} from "@/api/queries";
import StudentIcon from "@/assets/dstudenticon.png";
import TeacherIcon from "@/assets/dteachericon.png";
import Classes from "@/assets/dclassicon.png";
import MyDateFilter from "@/components/DateFilter";
import ProgressLog from "../Students/Profile/ProgressLog";
import { TTeacherList } from "../Teachers/Teachers";
import Card from "./Card";
import ClassLeaderboard from "./ClassLeaderboard";
import StudentLeaderboard from "./StudentLeaderboard";
import { useEffect, useState } from "react";
import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";

export type TLogData = {
  stories: number;
  audio_books: number;
  languages: number;
  quiz: number;
};
export type TLicense = {
  added_class_count: number;
  added_student_count: number;
  added_teacher_count: number;
  license_class_count: number;
  license_student_count: number;
  license_teacher_count: number;
  status: boolean;
};

const Main = () => {
  const [useri, setUser] = useStore(getUserState);
  const { data } = useGetUpdatedProfile();
  const currentUserProfile = data?.data?.data;
  useEffect(() => {
    setUser({ ...useri, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);
  const { data: dataLicense } = useGetLicense();
  const license: TLicense = dataLicense?.data.data.school.licence;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: logData } = useGetSchoolContentStat(startDate, endDate);

  const statLog: TLogData = logData?.data.data;
  const { data: teacherData } = useGetTeacherList();
  const teacherList: TTeacherList[] = teacherData?.data.data.records;
  const { data: studentData, isLoading } =
    useGetAdmittedStudentsInSchool("active");
  const studentList = studentData?.data.data.records;

  return (
    <div className="h-[100%]  flex flex-col  overflow-y-scroll">
      <div className="flex justify-between                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ">
        <div>
          <h1 className="text-[25px] font-bold pl-4">Overview</h1>
        </div>
        <div className="flex justify-center  gap-2 items-center  ">
          <span className="text-customGreen">Sort by Date:</span>

          <div>
            <MyDateFilter setStartDate={setStartDate} setEndDate={setEndDate} />
          </div>
        </div>
      </div>
      <div className="flex flex-grow items-start  gap-6 ">
        <div className=" basis-full flex-grow  gap-3 flex flex-col h-full ">
          <div className="flex  gap-4 items-center justify-center py-2">
            <Card
              title="Classes"
              image={Classes}
              amount={license?.added_class_count}
              max={license?.license_class_count}
            />
            <Card
              title="Teachers"
              image={TeacherIcon}
              amount={license?.added_teacher_count}
              max={license?.license_teacher_count}
            />
            <Card
              title="Students"
              image={StudentIcon}
              amount={license?.added_student_count}
              max={license?.license_student_count}
            />
          </div>
          <div className="flex-grow flex ">
            <StudentLeaderboard
              data={studentList}
              isLoading={isLoading}
              tableMax={7}
            />
          </div>
        </div>
        <div className="basis- basis-3/5  flex flex-col  h-full gap-3 ">
          <ProgressLog logData={statLog} />
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
