import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";
import Assignment from "./Assignments/";
import Header from "./Header";
import LearningHour from "./LearningHour";
import MyTeacher from "./MyTeacher";
import ProfileCard from "./ProfileCard";
import ProgressLog from "./ProgressLog";
import RecentQuiz from "./RecentQuiz";
import TopSubCategories from "./TopSubCategories";
import TotalTimeSpent from "./TotalTimeSpent";

const StudentProfile = () => {
  const params = useParams();
  const id = params.studentId;
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
        <Header />
      </div>

      <div className=" flex-grow gap-4 flex w-full ">
        <div className=" flex w-full flex-col  fl gap-y-3  ">
          <div>
            <ProfileCard />
          </div>

          <div className="flex justify-center gap-5  ">
            <div className="flex-grow ">
              <TotalTimeSpent />
            </div>
            <div className="">
              <RecentQuiz />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 ">
            <MyTeacher />
            <TopSubCategories />
          </div>
          <div className="flex-grow flex ">
            <Assignment />
          </div>
        </div>

        <div className="  flex basis-3/5   flex-col">
          <ProgressLog />
          <LearningHour />
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
