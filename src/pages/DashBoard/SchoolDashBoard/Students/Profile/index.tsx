import { useParams, Navigate } from "react-router-dom";
import Header from "./Header";
import { dashboardData } from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import ProfileCard from "./ProfileCard";
import TotalTimeSpent from "./TotalTimeSpent";
import RecentQuiz from "./RecentQuiz";
import MyTeacher from "./MyTeacher";
import TopSubCategories from "./TopSubCategories";
import Assignment from "./Assignments/";
import ProgressLog from "./ProgressLog";
import LearningHour from "./LearningHour";
import { motion } from "framer-motion";

const index = () => {
  const params = useParams();
  // const [currentClicked, setCurrentClicked] = useState(0);
  const id = params.studentId;
  console.log("bossssss", id);
  if (!id) {
    return <Navigate to="../" replace />;
  }
  const currentData = dashboardData.find((data) => data.id == +id);

  return (
    // <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className=" h-full flex flex-col "
    >
      {/* <div className=" bg-green-600   rounded-3xl py-4 "> */}
      <div className="mb-2">
        <Header />
      </div>

      <div className="flex flex-grow gap-8">
        <div className=" basis-full flex flex-col gap-y-3">
          <div className=" ">
            <ProfileCard {...currentData} />
          </div>

          <div className="flex justify-center gap-4  ">
            <div className="flex-grow ">
              <TotalTimeSpent />
            </div>
            <div className="">
              <RecentQuiz />
            </div>
          </div>
          <div className="flex gap-4  justify-center ">
            <MyTeacher />
            <TopSubCategories />
          </div>
          <div className="flex-grow flex ">
            <Assignment />
          </div>
        </div>

        <div className=" basis-2/3  flex  flex-col  ">
          <ProgressLog />
          <LearningHour />
        </div>
      </div>
      {/* </div> */}
    </motion.div>
    // </div>
  );
};

export default index;
