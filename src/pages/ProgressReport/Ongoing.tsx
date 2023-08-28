import ProgressCard from "./ProgressCard";
import { TContentLog } from "./ProgressReport";

const Ongoing = ({ data }: { data: TContentLog[] }) => {
  return (
    <div>
      <div className="py-8 grid grid-cols-3 gap-4 gap-x-14">
        {data &&
          data.map((data: TContentLog, index) => {
            return <ProgressCard key={index} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Ongoing;
