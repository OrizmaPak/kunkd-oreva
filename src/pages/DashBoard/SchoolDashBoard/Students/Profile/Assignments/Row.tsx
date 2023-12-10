import { Progress } from "@mantine/core";
import DateIcon from "@/assets/dateIcon.svg";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
const Row = ({
  data
}: {
 data:TStoryContent
}) => {

  const totalPageCount = Number(data?.pages?.length) || 1; // Avoid division by zero
const progressPercentage = Math.floor((Number(data?.pages_read) / totalPageCount) * 100) || 0;
  return (
    <div className="grid grid-cols-[70px_200px_1fr_150px] text-[10px] text-[#B5B5C3] flex-grow  mb-1 gap-2  ">
      <p className="flex justify-center items-center">
        <img loading="lazy" src={data?.thumbnail} alt="image" className="w-[60px] rounded" />
      </p>
      <p className="flex flex-col justify-center">
        <span className="font-bold text-[12px] text-black">{data?.name}</span>
        
      </p>
      {/* <p className="flex flex-col items-start justify-center">
        <span>Duration</span>
        <span className="font-bold">{duration}</span>
      </p> */}
      <p className="flex items-center justify-center gap-2  text-[12px] ">
        {progressPercentage}%
        <p className="flex-grow">
          <Progress value={progressPercentage} />
        </p>
      </p>
      <p className="flex justify-end gap-4 items-center ">
        <span className="text-[#B5B5C3] text-[12px]">{}</span>
        <img loading="lazy" src={DateIcon} alt="date" />
      </p>
    </div>
  );
};

export default Row;
