import DateRadio from "./Dwmy";
import PositiveArrow from "@/assets/positiveArrow.svg";

const TotalTimeSpent = () => {
  return (
    <div className="p-4 bg-white rounded-3xl mt-3">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold">Total Time Spent</h1>
        <div>
          <DateRadio
            onChange={(value: string) => {
              console.log(value);
            }}
          />
        </div>
      </div>
      <div>
        <h1 className="text-[25px] font-bold">1,970</h1>
        <p className="flex justify-between ">
          <span>Minutes</span>
          <span className="flex">
            <img src={PositiveArrow} alt="Positive arrow" />
            <span className="text-green-600">3.9%</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default TotalTimeSpent;
