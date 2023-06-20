import ArrowDown from "@/assets/arrowdown.svg";
import Barchart from "./Barchart";
import TopContents from "./TopContents";
import StudentIcon from "@/assets/student3.svg";
import Card from "./Card";
import TotalTimeSpent from "./TotalTimeSpent";
import MyStudents from "./MyStudents";
import TopSubCategories from "./TopSubCategories";
import StudentLeaderboard from "../../SchoolDashBoard/Main/StudentLeaderboard";
import { dashboardData } from "../../SchoolDashBoard/Teachers/Teachers";
import ProgressLog from "../../SchoolDashBoard/Students/Profile/ProgressLog";

const Main = () => {
  return (
    <div>
      <div className="flex justify-between px-8 gap-2">
        <h1 className="font-bold text-[30px] font-Recoleta">Overview</h1>
        <span className="flex gap-2 justify-center items-center">
          <span className="text-[#8530C1]">Last 7 days:</span>
          <span> May 21 May 28 2023</span>
          <img src={ArrowDown} alt="Arrowdown" className="w-4" />
        </span>
      </div>
      <div className="h-full flex gap-5 ">
        <div className=" basis-full  h-full">
          <div>
            {/* <Barchart /> */}
            {/* <TopContents /> */}
            <StudentLeaderboard
              data={dashboardData.slice(1, 9).map((el) => el)}
            />
          </div>
        </div>

        <div className=" basis-2/3 h-full ">
          <Card image={StudentIcon} title="Students" amount="37" />
          <div className="mt-3">
            <ProgressLog />
          </div>
          <TotalTimeSpent />
          {/* <MyStudents /> */}
          {/* <TopSubCategories /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
