import Wrapper from "../../common/User/Wrapper";
import InnerWrapper from "../../common/User/InnerWrapper";
import SearchIcon from "@/assets/searchicon.svg";
import musicIcon from "@/assets/svgmusic.svg";
import videoIcon from "@/assets/svgvideo.svg";
import BookIcon from "@/assets/svgbook.svg";
import Chart from "./Chart";
import All from "./All";
import { Pagination } from "@mantine/core";

import ProgressAction from "./ProgressAction";
import { useState } from "react";
import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";
import Ongoing from "./Ongoing";
import Completed from "./Completed";

const ProgressReport = () => {
  // const [displaySectio, setDisplaySection] = useState<number>(STEP_1);

  const [currentStep, setCurrentStep] = useState(STEP_1);
  console.log(currentStep);
  const [activePage, setPage] = useState(1);
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <div className="min-h-[calc(100vh-80px-8vh)]">
            <div className="flex justify-between items-center py-10 px-20">
              <h1 className="font-bold font-Recoleta text-[30px]">
                Progress Report
              </h1>
              <span>
                <img src={SearchIcon} alt="SearchIcon " className="" />
              </span>
            </div>
            <hr className="mx-20 my-4" />
            <div className="pt-5 pb-1 px-24">
              <Chart />
            </div>

            <div>
              <ProgressAction onClick={setCurrentStep} active={currentStep} />
            </div>
            <div className="px-20">
              {currentStep === STEP_1 && <All />}
              {currentStep === STEP_2 && <Ongoing />}
              {currentStep === STEP_3 && <Completed />}
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
