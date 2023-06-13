import ArrowDown from "@/assets/arrowdown.svg";
import Barchart from "./Barchart";
import TopContents from "./TopContents";
import StudentIcon from "@/assets/student3.svg";
import Card from "./Card";
import TotalTimeSpent from "./TotalTimeSpent";
import MyStudents from "./MyStudents";
import TopSubCategories from "./TopSubCategories";

const Main = () => {
  return (
    <div className="h-full flex gap-10 ">
      <div className=" basis-full  h-full">
        <div className="flex justify-end px-8 gap-2">
          <span className="text-[#8530C1]">Last 7 days:</span>
          <span className="flex gap-2">
            <span> May 21 May 28 2023</span>
            <img src={ArrowDown} alt="Arrowdown" />
          </span>
        </div>
        <div>
          <Barchart />
          <TopContents />
        </div>
      </div>

      <div className=" basis-2/3 h-full ">
        <Card image={StudentIcon} title="Students" amount="37" />
        <TotalTimeSpent />
        <MyStudents />
        <TopSubCategories />
      </div>
    </div>
  );
};

export default Main;
