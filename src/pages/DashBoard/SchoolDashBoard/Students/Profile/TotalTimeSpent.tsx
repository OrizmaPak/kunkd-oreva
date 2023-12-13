import { TSchoolStudentStat } from ".";

const TotalTimeSpent = ({schoolStudentStat}:{schoolStudentStat:TSchoolStudentStat}) => {

  const timespent = schoolStudentStat?.total_time_spent ?? 0;
  const min =    Math.floor(timespent / 60);
  const sec = timespent % 60;

  const result = `${min} : ${sec}`
  
  return (
    <div className="p-4 px-5 bg-white rounded-3xl">
      <div className="flex justify-between">
        <h1 className="text-[16px] font-bold">Total Time Spent</h1>
      </div>
      <div>
        <h1 className="text-[36px] font-bold text-[#8530C1]">{result}</h1>
        <p className="flex justify-between ">
          <span>Minutes</span>
        </p>
      </div>
    </div>
  );
};

export default TotalTimeSpent;
