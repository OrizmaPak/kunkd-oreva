import { useParams, Navigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import { data } from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import ProfileCard from "./ProfileCard";
import TotalTimeSpent from "./TotalTimeSpent";
import RecentQuiz from "./RecentQuiz";
import MyTeacher from "./MyTeacher";
import TopSubCategories from "./TopSubCategories";
import Assignment from "./Assignments/";
import TotalContent from "./TotalContent";
import LearningHour from "./LearningHour";

type Props = {};
const index = (props: Props) => {
  const params = useParams();
  // const [currentClicked, setCurrentClicked] = useState(0);
  const id = params.studentId;
  console.log("bossssss", id);
  if (!id) {
    return <Navigate to="../" replace />;
  }
  const currentData = data.find((data) => data.id == +id);

  return (
    <div className="h-full  rounded-3xl p-4  flex flex-col">
      <div className="mb-5">
        <Header />
      </div>

      <div className="flex flex-grow gap-8">
        <div className=" basis-full  h-[100%] ">
          <div className="mt-4 px-4">
            <ProfileCard {...currentData} />
          </div>

          <div className="flex justify-center my-4 gap-10 px-4 ">
            <div className="flex-grow ">
              <TotalTimeSpent />
            </div>
            <div className="">
              <RecentQuiz />
            </div>
          </div>
          <div className="flex gap-10 justify-center px-5">
            <MyTeacher />
            <TopSubCategories />
          </div>
          <Assignment />
        </div>

        <div className=" basis-2/3   h-[100%] ">
          <TotalContent />
          <LearningHour />
        </div>
      </div>
    </div>
  );
};

export default index;
