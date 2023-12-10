import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";
import Header from "./Header";
import LearningHour from "./LearningHour";
import MyTeacher from "./MyTeacher";
import ProfileCard from "./ProfileCard";
import ProgressLog from "./ProgressLog";
import TopSubCategories from "./TopSubCategories";
import TotalTimeSpent from "./TotalTimeSpent";
import { useGetSchoolStudentStat } from "@/api/queries";
import RecentCompleted from "./RecentQuiz";
import ContentInProgress from "./Assignments/";
import { useState } from "react";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";

export type TSchoolStudentStat = {
  "avatar": string,
  "class": string,
  "content_progress_log": {
      "audio_books": number,
      "languages": number,
      "quiz": number,
      "stories": number
  },
  "learning_hours": number[],
  "name": string,
  "recently_completed_content": TStoryContent[],
  "teacher_email": string,
  "teacher_name": string,
  "teacher_picture":string,
  "top_interest_contents":{
    "id": number,
    "name": string,
    "slug": string,
    "category": string,
    "theme":string,
    "thumbnail": string
  }[],
  "total_time_spent": number,
  "parent_email":string
  ongoing_contents:TStoryContent[]
}

const StudentProfile = () => {
  const params = useParams();
  const id = params.studentId;
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const {data , isLoading} = useGetSchoolStudentStat(id as string, startDate, endDate)
  const schoolStudentStat: TSchoolStudentStat= data?.data?.data
  console.log("dataaaaa", schoolStudentStat)
  console.log("iddddd",id)
  if (!id) {
    return <Navigate to="../" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className=" h-[100%] flex flex-col  overflow-y-scroll "
    >
      <div className="mb-2 ">
        <Header setStartDate={setStartDate} setEndDate={setEndDate}/>
      </div>

      <div className=" flex-grow gap-4 flex w-full ">
        <div className=" flex w-full flex-col  fl gap-y-3  ">
          <div>
            <ProfileCard schoolStudentStat={schoolStudentStat} />
          </div>

          <div className="flex justify-center gap-5 flex-basis-[1/2]  ">
            <div className="flex-grow ">
              <TotalTimeSpent schoolStudentStat={schoolStudentStat} />
            </div>
            <div className=" flex-grow h-full ">
              <RecentCompleted isLoading={isLoading} schoolStudentStat={schoolStudentStat} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 ">
            <MyTeacher schoolStudentStat={schoolStudentStat} />
            <TopSubCategories schoolStudentStat={schoolStudentStat} />
          </div>
          <div className="flex-grow flex ">
            <ContentInProgress schoolStudentStat={schoolStudentStat} />
          </div>
        </div>

        <div className="  flex basis-3/5   flex-col">
          <ProgressLog logData={schoolStudentStat?.content_progress_log} />
          <LearningHour schoolStudentStat={schoolStudentStat}/>
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
    </motion.div>
  );
};

export default StudentProfile;
