import { Progress } from "@mantine/core";

import { DataType } from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import Button from "@/components/Button";
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
            <Button size="md">Completed</Button>
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
