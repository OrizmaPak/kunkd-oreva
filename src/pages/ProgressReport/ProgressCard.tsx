import { Progress } from "@mantine/core";
import "./progresscard.css";
// import { TContentLog } from "./ProgressReport";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { TStoryContent } from "../Stories/Stories1/Stories1";

import { DataType } from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import Button from "@/components/Button";
const ProgressCard = ({
  isCompleted,
  data,
}: DataType & { isCompleted?: boolean; data: TStoryContent }) => {
  const range = Math.ceil((100 / data?.pages?.length!) * data?.pages_read!);
  return (
    <div className="flex progress-card-w h-[160px]  border-[#FBECFF] border-2  rounded-xl">
      <div className=" basis-1/2">
        {/* <img
          src={data?.content?.image}
          alt="image"
          className="object-cover h-full rounded-xl  progress-card-img"
        /> */}

        <LazyLoadImage
          src={data?.thumbnail}
          placeholderSrc={AfamBlur}
          effect="blur"
          className=" rounded-xl object-cover h-full sss  progress-card-img"
          wrapperClassName=" object-cover h-full rounded-xl  progress-card-img"
        />
      </div>
      <div className="basis- basis-1/2 p-5 ">
        <h1 className="my-1 font-Hanken font-bold text3">{data?.name}</h1>
        <div className=" w-full">
          {isCompleted ? (
            <div className="flex justify-center  gap-4 flex-col ">
              <p className="text3  ">Quiz score: 8.0</p>
              <Button size="md">
                <span className="text3">Completed</span>
              </Button>
            </div>
          ) : (
            <div className="flex justify-center  items-center gap-4 ">
              <span>{range}%</span>
              <span className="  flex-grow">
                {range && range < 20 ? (
                  <Progress value={range} color="red" />
                ) : range && range < 50 ? (
                  <Progress value={range} color="yellow" />
                ) : (
                  <Progress value={range} color="green" />
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
