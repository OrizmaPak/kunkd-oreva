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
import { useEffect, useState } from "react";
import { TStoryContent } from "@/api/types";
import { formattedDate, handleEventTracking } from "@/api/moengage";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
export type TSchoolStudentStat = {
  avatar: string;
  class: string;
  content_progress_log: {
    audio_books: number;
    languages: number;
    quiz: number;
    stories: number;
  };
  learning_hours: { unknow: number };
  name: string;
  recently_completed_content: TStoryContent[];
  teacher_email: string;
  teacher_name: string;
  teacher_picture: string;
  top_interest_contents: {
    id: number;
    name: string;
    slug: string;
    category: string;
    theme: string;
    thumbnail: string;
  }[];
  total_time_spent: number;
  parent_email: string;
  ongoing_contents: TStoryContent[];
};

const StudentProfile = () => {
  const params = useParams();
  const id = params.studentId;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user] = useStore(getUserState);

  const { data, isLoading } = useGetSchoolStudentStat(
    id as string,
    startDate,
    endDate
  );
  const schoolStudentStat: TSchoolStudentStat = data?.data?.data;
  useEffect(() => {
    handleEventTracking(
      `${
        user?.role == "teacher"
          ? "teacher"
          : user?.role == "user"
          ? "parent"
          : "school"
      }`,
      {
        user_id: user?.user_id,
        student_name: schoolStudentStat?.name,
        date_viewed: formattedDate,
        total_time_spent: schoolStudentStat?.total_time_spent,
        teacher_name: schoolStudentStat?.teacher_name,
        top_interest: schoolStudentStat?.top_interest_contents,
        recently_completed: schoolStudentStat?.parent_email,
        learning_hours: schoolStudentStat?.learning_hours,
      }
    );
  }, []);
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
        <Header setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      <div className=" flex-grow gap-6 flex w-full ">
        <div className=" flex w-full flex-col  fl gap-y-5  ">
          <div>
            <ProfileCard
              schoolStudentStat={schoolStudentStat}
              isLoading={isLoading}
            />
          </div>

          <div className="flex justify-center gap-5 flex-basis-[1/2]  ">
            <div className="w-[205px] ">
              <TotalTimeSpent
                schoolStudentStat={schoolStudentStat}
                isLoading={isLoading}
              />
            </div>
            <div className=" flex-grow h-full ">
              <RecentCompleted
                isLoading={isLoading}
                schoolStudentStat={schoolStudentStat}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 ">
            <MyTeacher
              schoolStudentStat={schoolStudentStat}
              isLoading={isLoading}
            />
            <TopSubCategories
              schoolStudentStat={schoolStudentStat}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-grow flex ">
            <ContentInProgress
              schoolStudentStat={schoolStudentStat}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="  flex basis-3/5   flex-col gap-3">
          <ProgressLog
            logData={schoolStudentStat?.content_progress_log}
            isLoading={isLoading}
          />
          <LearningHour
            schoolStudentStat={schoolStudentStat}
            isLoading={isLoading}
          />
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
