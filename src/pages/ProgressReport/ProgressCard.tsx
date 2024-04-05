import { Progress } from "@mantine/core";
import "./progresscard.css";
// import { TContentLog } from "./ProgressReport";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { TStoryContent } from "@/api/types";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";

import { DataType } from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import Button from "@/components/Button";
const ProgressCard = ({
  data,
}: DataType & { isCompleted?: boolean; data: TStoryContent }) => {
  const pagesLength = data?.pages?.length as number;
  const pagesRead = data?.pages_read as number | undefined;
  const range =
    pagesLength > 0 ? Math.ceil((100 / pagesLength) * (pagesRead || 0)) : 0;
  const navigate = useNavigate();
  const [user] = useStore(getUserState);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // const range = Math.ceil((100 / data?.pages?.length as number) * data?.pages_read);
  return (
    <div
      onClick={() => {
        sessionStorage.setItem("contentId", data?.id?.toString() as string);
        sessionStorage.setItem(
          "continuePage",
          data?.pages_read
            ? data?.pages_read?.toString()
            : data?.timespent
            ? data?.timespent?.toString()
            : "1"
        );

        if (data.category === "Stories") {
          navigate(
            `../${
              user.role === "user" ? "parent" : "school"
            }/${data.category?.toLowerCase()}/sub/${data.slug
              ?.toLocaleLowerCase()
              .replace(/\s/g, "-")}`
          );
        } else if (data.category === "Audiobooks") {
          navigate(
            `/${
              user.role === "user" ? "parent" : "school"
            }/${data.category?.toLowerCase()}/${data.slug
              ?.toLocaleLowerCase()
              .replace(/\s/g, "-")}/${data.slug
              ?.toLocaleLowerCase()
              .replace(/\s/g, "-")}`
          );
        } else if (data.category === "Languages") {
          navigate(
            `../${user.role === "user" ? "parent" : "school"}/languages/${
              data.slug
            }/${data.name}`
          );
        }
      }}
      className="flex progress-card-w h-[160px]  bg-[#fffbff]  border-[#FBECFF] border-2  rounded-xl cursor-pointer"
    >
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
      <div className="basis- basis-1/2 px-3 ">
        <h1 className=" font-Hanken font-bold text3 leading-5 mt-4">
          {data?.name}
        </h1>
        <div className=" w-full">
          {data.status === "ongoing" && (
            <div className="flex justify-center  items-center gap-4 ">
              <span className="mt-2">{range ? range : 60}%</span>
              <span className="  flex-grow">
                <Progress
                  value={range || 60}
                  color={
                    range && range < 20
                      ? "red"
                      : range && range < 50
                      ? "yellow"
                      : "green"
                  }
                />
              </span>
            </div>
          )}

          {data?.status === "complete" && data?.quiz_result?.status && (
            <div className="flex justify-center  gap-4 flex-col ">
              <p className="text3 mt-2  ">
                Quiz score: {data?.quiz_result?.result}
              </p>
              <Button size="sm" className="py-2">
                <span className="text3">Completed</span>
              </Button>
            </div>
          )}
          {data?.status === "complete" && !data?.quiz_result?.status && (
            <div className="flex justify-center  gap-4 flex-col ">
              <button className="text3  bg-red-600 rounded p-2 mt-2 text-white">
                Quiz not done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
