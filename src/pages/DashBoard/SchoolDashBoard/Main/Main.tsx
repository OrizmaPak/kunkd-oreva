import SchoolLayout from "@/common/User/DashBoard/School/SchoolLayout";
import TeacherIcon from "@/assets/teacher3.svg";
import StudentIcon from "@/assets/student3.svg";
import QuizIcon from "@/assets/quizicon.svg";
import Card from "./Card";
import Chart from "./Chart";
import TotalTimeSpent from "./TotalTimeSpent";
import TopClassReading from "./TopClassReading";
import TopSubCategories from "./TopSubCategories";
import LineChart from "./LineChart";
import ActiveTeacher from "./ActiveTeacher";
import ArrowDown from "@/assets/arrowdown.svg";

const Main = () => {
  return (
    <div>
      <div className="flex  h-full gap-5">
        <div className="ba basis-full  h-full">
          <div className="flex justify-end px-8 gap-2">
            <span className="text-[#8530C1]">Last 7 days:</span>
            <span className="flex gap-2">
              <span> May 21 May 28 2023</span>{" "}
              <img src={ArrowDown} alt="Arrowdown" />
            </span>
          </div>
          <div className="flex gap-8 items-center justify-center py-2">
            <Card title="Teachers" image={TeacherIcon} amount="450" />
            <Card title="Students" image={StudentIcon} amount="241" />
            <Card title="Quiz" image={QuizIcon} amount="48" />
          </div>
          <div className="px-4 bg-white rounded-3xl h-[470px] mt-2 ">
            <LineChart />
          </div>
          <ActiveTeacher />
        </div>
        <div className="basis- basis-2/4  h-full">
          <Chart />
          <TotalTimeSpent />
          <TopClassReading />
          <TopSubCategories />
        </div>
      </div>
    </div>
  );
};

export default Main;
