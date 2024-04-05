import { Progress } from "@mantine/core";
// import DateIcon from "@/assets/dateIcon.svg";
import { TStoryContent } from "@/api/types";
const Row = ({ data }: { data: TStoryContent }) => {
  const totalPageCount = Number(data?.pages?.length) || 50; // Avoid division by zero
  const progressPercentage =
    Math.floor((Number(data?.pages_read) / totalPageCount) * 100) || 0;
  return (
    <div className="grid grid-cols-[65px_1fr_200px] text-[10px] text-[#B5B5C3] flex-grow  mb-[30px]  ">
      <p className="flex justify-start items-center">
        <img
          loading="lazy"
          src={data?.thumbnail}
          alt="image"
          className="w-[55px] h-[55px]  rounded-[12px]"
        />
      </p>
      <p className="flex flex-col justify-center ">
        <span className=" font-Hanken font-semibold text-[12px] text-black">
          {data?.name}
        </span>
      </p>
      {/* <p className="flex flex-col items-start justify-center">
        <span>Duration</span>
        <span className="font-bold">{duration}</span>
      </p> */}
      <p className="flex items-center justify-center gap-2  text-[12px] ">
        {data.category === "Languages" || data.category === "Audiobooks"
          ? 64
          : progressPercentage}
        %
        <p className="flex-grow">
          <Progress
            value={
              data.category === "Languages" || data.category === "Audiobooks"
                ? 64
                : progressPercentage
            }
          />
        </p>
      </p>
    </div>
  );
};

export default Row;
