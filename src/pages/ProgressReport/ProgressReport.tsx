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
  useGetContentsLog,
} from "@/api/queries";

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
  const { data: contentLogData } = useGetContentsLog(
    profileId ? profileId : ""
  );
  console.log("contentLogData", contentLogData);
  const contentsLog: TContentLog[] = contentLogData?.data.data;
  const { data } = useGetOngoingContents();
  const { data: completedData } = useGetCompletedContents();
  console.log("ongtion", data, " completed", completedData);
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
              <Chart />
            </div>

            <div>
              <ProgressAction onClick={setCurrentStep} active={currentStep} />
            </div>
            <div className="px-20">
              {currentStep === STEP_1 && <All data={contentsLog} />}
              {currentStep === STEP_2 && <Ongoing data={contentsLog} />}
              {currentStep === STEP_3 && <Completed data={contentsLog} />}
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
