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
    <div className="flex w-[350px] h-[160px]  border-[#FBECFF] border-2  rounded-xl">
      <div className=" basis-1/2">
        <img
          src={image}
          alt="image"
          className="object-cover h-full  rounded-xl "
        />
      </div>
      <div className="basis- basis-1/2 p-5 ">
        <h1 className="my-1 font-Hanken font-bold text-[14px]">{title}</h1>
        <div className=" w-full">
          {isCompleted ? (
            <div className="flex justify-center  gap-4 flex-col ">
              <p className="text-[12px] mb-5">Quiz score: 8.0</p>
              <Button size="md">
                <span className="text-[12px]">Completed</span>
              </Button>
            </div>
          ) : (
            <div className="flex justify-center mt-14 items-center gap-4 ">
              <span>{range}%</span>
              <span className="  flex-grow">
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
