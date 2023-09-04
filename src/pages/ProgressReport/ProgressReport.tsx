import Wrapper from "../../common/User/Wrapper";
import InnerWrapper from "../../common/User/InnerWrapper";
import SearchIcon from "@/assets/searchicon.svg";

import Chart from "./Chart";
import All from "./All";
import { Pagination } from "@mantine/core";

import ProgressAction from "./ProgressAction";
import { useState } from "react";
import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";
import Ongoing from "./Ongoing";
import Completed from "./Completed";
import {
  useGetOngoingContents,
  useGetCompletedContents,
  // useGetContentsLog,
} from "@/api/queries";
import { TStoryContent } from "../Stories/Stories1/Stories1";

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
  // const [displaySectio, setDisplaySection] = useState<number>(STEP_1);
  const profileId = localStorage.getItem("profileId");
  console.log(profileId);
  // const { data: contentLogData } = useGetContentsLog(
  //   profileId ? profileId : ""
  // );
  // console.log("contentLogData", contentLogData);
  // const contentsLog: TContentLog[] = contentLogData?.data.data;
  const { data } = useGetOngoingContents(profileId!);
  const { data: completedData } = useGetCompletedContents(profileId!);
  const ongoingContents: TStoryContent[] = data?.data.data.ongoing_contents;
  const completedContents: TStoryContent[] =
    completedData?.data.data.completed_contents;

  console.log(
    "---------ongtion---------",
    ongoingContents,
    " -------completed--------",
    completedContents
  );

  const categoryCalculator = (
    category: string,
    arrayContent: TStoryContent[]
  ) => {
    let total = 0;
    for (let i = 0; i < arrayContent?.length; i += 1) {
      if (arrayContent[i].category === category) {
        total += 1;
      }
    }
    return total;
  };

  const ongoingStories: number = categoryCalculator("Stories", ongoingContents);
  const ongoingAudiobooks: number = categoryCalculator(
    "audiobooks",
    ongoingContents
  );
  const ongoingAfricanLanguage: number = categoryCalculator(
    "africanlanguages",
    ongoingContents
  );

  const completedStories: number = categoryCalculator(
    "Stories",
    completedContents
  );
  const completedAudiobooks: number = categoryCalculator(
    "audiobooks",
    completedContents
  );
  const completedAfricanLanguage: number = categoryCalculator(
    "africanlanguages",
    completedContents
  );

  const [currentStep, setCurrentStep] = useState(STEP_1);
  console.log(currentStep);
  // const [activePage, setPage] = useState(1);
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <div className="min-h-[calc(100vh-80px-8vh)]">
            <div className="flex justify-between items-center py-7 px-20">
              <h1 className="font-semibold font-Recoleta text30">
                Progress Report
              </h1>
              <span>
                <img
                  loading="lazy"
                  src={SearchIcon}
                  alt="SearchIcon "
                  className=""
                />
              </span>
            </div>
            <hr className="mx-20  mb-5" />
            <div className="pt-5 pb-1 pad-x-40 ">
              <Chart
                stories={ongoingStories + completedStories}
                africanLanguages={
                  ongoingAfricanLanguage + completedAfricanLanguage
                }
                audioBooks={ongoingAudiobooks + completedAudiobooks}
              />
            </div>

            <div>
              <ProgressAction onClick={setCurrentStep} active={currentStep} />
            </div>
            <div className="px-20">
              {currentStep === STEP_1 && (
                <All
                  data={[
                    ...(ongoingContents ? ongoingContents : []),
                    ...(completedContents ? completedContents : []),
                  ]}
                />
              )}
              {currentStep === STEP_2 && <Ongoing data={ongoingContents} />}
              {currentStep === STEP_3 && (
                <Completed data={completedContents!} />
              )}
            </div>
            <div className="px-28 flex justify-end py-5">
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
            </div>
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default ProgressReport;
