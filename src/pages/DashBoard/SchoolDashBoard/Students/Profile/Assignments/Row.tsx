import { Progress } from "@mantine/core";
import DateIcon from "@/assets/dateIcon.svg";
const Row = ({
  image,
  date,

  range,
  title,
}: {
  image?: string;
  date?: string;
  range?: number;
  title?: string;
}) => {
  return (
    <div className="grid grid-cols-[70px_200px_1fr_150px] text-[10px] text-[#B5B5C3] flex-grow  mb-1 gap-2 ">
      <p className="flex justify-center items-center">
        <img loading="lazy" src={image} alt="image" className="w-[70px]" />
      </p>
      <p className="flex flex-col justify-center">
        <span className="font-bold text-[12px] text-black">{title}</span>
        <span>{date}12:15 pm</span>
      </p>
      {/* <p className="flex flex-col items-start justify-center">
        <span>Duration</span>
        <span className="font-bold">{duration}</span>
      </p> */}
      <p className="flex items-center justify-center gap-2  text-[12px] ">
        {range}%
        <p className="flex-grow">
          <Progress value={range} />
        </p>
      </p>
      <p className="flex justify-end gap-4 items-center ">
        <span className="text-[#B5B5C3] text-[12px]">{date}</span>
        <img loading="lazy" src={DateIcon} alt="date" />
      </p>
    </div>
  );
};

export default Row;
