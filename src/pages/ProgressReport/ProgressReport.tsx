import Wrapper from "../../common/User/Wrapper";
import InnerWrapper from "../../common/User/InnerWrapper";
import SearchIcon from "@/assets/searchicon.svg";
import musicIcon from "@/assets/svgmusic.svg";
import videoIcon from "@/assets/svgvideo.svg";
import BookIcon from "@/assets/svgbook.svg";
import Chart from "./Chart";
import { data, DataType } from "../User/NewlyRegisterUser/NewlyRegisteredUser";
import ProgressCard from "./ProgressCard";

const ProgressReport = () => {
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <div className="flex justify-between items-center py-10 px-24">
            <h1 className="font-bold font-Recoleta text-[30px]">
              Progress Report
            </h1>
            <span>
              <img src={SearchIcon} alt="SearchIcon " className="" />
            </span>
          </div>
          <div className="py-10 px-24">
            <Chart />
          </div>
          <div className="p-8 grid grid-cols-3 gap-4 gap-x-14">
            {data &&
              data.map((data, index) => {
                return <ProgressCard key={index} {...data} />;
              })}
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default ProgressReport;
