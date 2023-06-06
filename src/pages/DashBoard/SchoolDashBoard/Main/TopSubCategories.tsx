import DateRadio from "./Dwmy";
import ArrowPositive from "@/assets/arrowPositive.svg";
import ArrowNegative from "@/assets/arrowNegative.svg";
const data = [
  {
    title: "Fairy Tal ",
    isPositive: true,
    percentage: 25,
  },
  {
    title: "Life and Growing up ",
    isPositive: false,
    percentage: 16,
  },
  {
    title: "Inspiring Leaders ",
    isPositive: true,
    percentage: 12.5,
  },
];
const TopSubCategories = () => {
  return (
    <div className="p-4 bg-white rounded-3xl mt-3">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold">Top Sub Categories</h1>
        <button>Views</button>
      </div>
      <div>
        {data &&
          data.map((data, index) => {
            return <Row key={index} {...data} />;
          })}
      </div>
    </div>
  );
};

export default TopSubCategories;

const Row = ({
  title,
  percentage,
  isPositive,
}: {
  title: string;
  percentage: number;
  isPositive: boolean;
}) => {
  return (
    <div className="flex justify-between my-2">
      <p>{title}</p>
      <p>
        {isPositive ? (
          <span className="text-green-700 flex gap-1">
            <img src={ArrowPositive} alt="positive" />
            {percentage}%
          </span>
        ) : (
          <span className="text-red-700 flex gap-1">
            <img src={ArrowNegative} alt="Negative" />
            {percentage}%
          </span>
        )}
      </p>
    </div>
  );
};
