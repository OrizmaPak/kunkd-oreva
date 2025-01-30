import Wrapper from "../../common/User/Wrapper";
import InnerWrapper from "../../common/User/InnerWrapper";
import Chart from "./Chart";
import All from "./All";
// import { Pagination } from "@mantine/core";
import ProgressAction from "./ProgressAction";
import { useState } from "react";
import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";
import Ongoing from "./Ongoing";
import Completed from "./Completed";
import { useAllProgressContent } from "@/api/queries";
import { TStoryContent } from "@/api/types";

export type TContentLog = {
  content: {
    id: number;
    image: string;
    media_type: string;
    name: string;
    story: {
      pages_read: number;
    };
    video_audio: {
      timespent: number;
    };
  };
  status: string;
};

const ProgressReport = () => {
  const profileId = sessionStorage.getItem("profileId");
  const { data: allContentProgress, isLoading } = useAllProgressContent(
    Number(profileId) || 0
  );
  const allContentProgressContents = allContentProgress?.data?.data;

  const ongoingContents = allContentProgressContents?.records?.filter(
    (conte: TStoryContent) =>
      conte?.status === "ongoing" ||
      (conte?.status === "complete" && conte?.quiz_result?.status === false)
  );
  const completedContents = allContentProgressContents?.records?.filter(
    (conte: TStoryContent) =>
      conte?.status === "complete" && conte?.quiz_result?.status
  );

  const [currentStep, setCurrentStep] = useState(STEP_1);
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <div className="min-h-[calc(100vh-80px-8vh)]">
            <div className="flex justify-between items-center py-7 px-20">
              <h1 className="font-semibold font-Recoleta text30">
                Progress Report
              </h1>
              {/* <p className="flex">
              <InputFormat/>
              <img
                  loading="lazy"
                  src={SearchIcon}
                  alt="SearchIcon "
                  className="ml-[-30px]"
                />
              </p> */}
              {/* <span>
                <img
                  loading="lazy"
                  src={SearchIcon}
                  alt="SearchIcon "
                  className=""
                />
              </span> */}
            </div>
            <hr className="mx-20  mb-5" />
            <div className="pt-5 pb-1 pad-x-40 ">
              <Chart
                stories={
                  allContentProgressContents?.category_count?.story_count
                }
                africanLanguages={
                  allContentProgressContents?.category_count?.language_count
                }
                audioBooks={
                  allContentProgressContents?.category_count?.audiobook_count
                }
              />
            </div>

            <div>
              <ProgressAction onClick={setCurrentStep} active={currentStep} />
            </div>
            <div className="px-20">
              {currentStep === STEP_1 && (
                <All
                  data={allContentProgressContents?.records}
                  isLoading={isLoading}
                />
              )}
              {currentStep === STEP_2 && <Ongoing data={ongoingContents} />}
              {currentStep === STEP_3 && <Completed data={completedContents} />}
            </div>
            {/* <div className="px-28 flex justify-end pt-14 pb-8">
              <Pagination
                total={5}
                styles={() => ({
                  control: {
                    "&[data-active]": {
                      backgroundColor: "#8530C1 !important",
                    },
                  },
                })}
              />
            </div> */}
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default ProgressReport;
