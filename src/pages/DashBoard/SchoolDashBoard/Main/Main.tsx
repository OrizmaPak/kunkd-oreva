import TeacherIcon from "@/assets/teacher3.svg";
import StudentIcon from "@/assets/student3.svg";
import QuizIcon from "@/assets/quizicon.svg";
import Card from "./Card";
import ClassLeaderboard from "./ClassLeaderboard";
import LineChart from "./LineChart";
import StudentLeaderboard from "./StudentLeaderboard";
import ArrowDown from "@/assets/arrowdown.svg";
import ProgressLog from "../Students/Profile/ProgressLog";
import { DashBoardDataType, dashboardData } from "../Teachers/Teachers";

const Main = () => {
  return (
    <div className="h-[100%] flex flex-col ">
      <div className="flex justify-between                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ">
        <div>
          <h1 className="text-[25px] font-bold pl-4">Overview</h1>
        </div>
        <div className="flex justify-end px-8 gap-2 items-center">
          <span className="text-[#8530C1]">Last 7 days:</span>
          <span className="flex gap-2 justify-center items-center">
            <span> May 21 May 28 2023</span>
            <img src={ArrowDown} alt="Arrowdown" className="w-4" />
          </span>
        </div>
      </div>
      <div className="flex flex-grow  gap-4 ">
        <div className=" basis-full   flex flex-col">
          <div className="flex gap-4 items-center justify-center py-2">
            <Card title="Teachers" image={TeacherIcon} amount="450" />
            <Card title="Students" image={StudentIcon} amount="241" />
          </div>
          <div className="flex-grow flex">
            <StudentLeaderboard
              data={dashboardData.slice(1, 7).map((el) => el)}
            />
          </div>
        </div>
        <div className="basis- basis-2/4  flex flex-col ">
          <ProgressLog />
          <ClassLeaderboard />
        </div>
      </div>
    </div>
  );
};

export default Main;
