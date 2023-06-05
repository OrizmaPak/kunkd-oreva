import { Progress } from "@chakra-ui/react";
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
        <h1 className="my-4">{title}</h1>
        <div className=" w-full">
          {isCompleted ? (
            <button className="p-4 bg-[#2BB457] rounded-3xl">Completed</button>
          ) : (
            <Progress
              value={range}
              size="sm"
              className="w-full h-full rounded-3xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
