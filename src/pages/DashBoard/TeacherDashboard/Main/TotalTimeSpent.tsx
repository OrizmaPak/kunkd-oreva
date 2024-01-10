import PositiveArrow from "@/assets/positiveArrow.svg";

type TTotalTimeSpent = {
  total_time_spent: number;
};

const TotalTimeSpent = ({
  totalTimeSpent,
}: {
  totalTimeSpent: TTotalTimeSpent;
}) => {
  console.log(totalTimeSpent?.total_time_spent);

  const timespent = totalTimeSpent?.total_time_spent ?? 0;
  const min = Math.floor(timespent / 60);
  const sec = timespent % 60;

  const result = `${min} : ${sec}`;
  return (
    <div className="p-4 py-2 bg-white rounded-3xl mt-2">
      <div className="flex justify-between">
        <h1 className="text-[16px] font-bold  font-Hanken">Total Time Spent</h1>
      </div>
      <div className="mt-3">
        <h1 className="text-[36px] font-bold font-Hanken">{result}</h1>
        <p className="flex justify-between mt-1 ">
          <span>Minutes</span>
          <span className="flex">
            <img loading="lazy" src={PositiveArrow} alt="Positive arrow" />
            <span className="text-green-600">3.9%</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default TotalTimeSpent;
