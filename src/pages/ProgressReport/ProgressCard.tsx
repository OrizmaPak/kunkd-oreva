import { Progress } from "@mantine/core";

import { DataType } from "../User/NewlyRegisterUser/NewlyRegisteredUser";
const ProgressCard = ({
  image,
  isCompleted,
  title,
  range,
}: DataType & { isCompleted?: boolean }) => {
  return (
    <div className="flex border border-gray-200 rounded-3xl">
      <div className="bai basis-1/2">
        <img src={image} alt="image" />
      </div>
      <div className="basis- basis-1/2 p-5 ">
        <h1 className="my-4 font-Recoleta font-bold text-[20px]">{title}</h1>
        <div className=" w-full">
          {isCompleted ? (
            <button className="p-4 bg-[#2BB457] rounded-3xl">Completed</button>
          ) : (
            <div className="flex justify-center items-center gap-4">
              <span>{range}%</span>
              <span className=" flex-grow">
                <Progress value={range} />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
