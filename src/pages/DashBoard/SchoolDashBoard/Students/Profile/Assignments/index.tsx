import Header from "./Header";
import Row from "./Row";
import { TSchoolStudentStat } from "..";


const ContentInProgress = ({schoolStudentStat}:{schoolStudentStat:TSchoolStudentStat}) => {
  return (
    <div className=" bg-white rounded-3xl  flex-col px-6  w-[600px]">
      <Header />
      {schoolStudentStat?.ongoing_contents?.length === 0? <p className="mt-4 font-bold ">Oops!!! No data available for content in progress😤 </p> : schoolStudentStat?.ongoing_contents?.slice(0,4)?.map((data, index) => {
        return <Row key={index}  data={data} />;
      })}
     
    </div>
  );
};

export default ContentInProgress;
