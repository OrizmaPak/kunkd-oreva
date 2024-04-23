import ProgressCard from "./ProgressCard";
// import { TContentLog } from "./ProgressReport";
import { TStoryContent } from "@/api/types";
const Ongoing = ({ data }: { data: TStoryContent[] }) => {
  return (
    <div>
      <div className="py-8 grid grid-cols-3 gap-y-10 gap-x-14">
        {data &&
          data.map((data: TStoryContent, index) => {
            return <ProgressCard key={index} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Ongoing;
