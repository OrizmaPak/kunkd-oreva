import { TSchoolStudentStat } from ".";

const TotalTimeSpent = ({
  schoolStudentStat,
}: {
  schoolStudentStat: TSchoolStudentStat;
}) => {
  const timespent = schoolStudentStat?.total_time_spent ?? 0;
  const min = Math.floor(timespent / 60);
  const sec = timespent % 60;

  const result = `${min} : ${sec}`;

  return (
    <div className="p-5 bg-white rounded-3xl">
      <div className="flex justify-between">
        <h1 className="text-[16px] font-semibold leading-[30px] mb-4 font-Inter">
          Total Time Spent
        </h1>
      </div>
      <div>
        <h1 className="text-[36px] font-bold text-[#8530C1] leading-[40px]">
          {result}
        </h1>
        <p className="flex justify-between ">
          <span>Minutes</span>
        </p>
      </div>
    </div>
  );
};

export default TotalTimeSpent;
