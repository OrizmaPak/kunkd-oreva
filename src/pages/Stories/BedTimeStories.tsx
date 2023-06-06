import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import { data } from "@/pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import { DataType } from "@/pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import AdsButton from "@/common/User/AdsButton";
import { Button } from "@chakra-ui/react";
import Banner from "@/assets/banner5.svg";
import Banner1 from "@/assets/banner6.svg";
import InnerWrapper from "../../common/User/InnerWrapper";
const BedTimeStories = () => {
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero image={Banner} />
          <hr className="my-14 mx-[200px]" />

          <div>
            <h1 className="text-center font-bold text-[30px] font-Recoleta mt-10 ">
              Bedtime Stories
            </h1>
            <p className="text-center text-[18px] text-[#B5B5C3] my-8">
              Whenever they request a new bedtime story
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-4 gap-8 px-24 py-10">
              {data?.map((dat, index) => {
                return <Card key={index} clickable {...dat} size={300} />;
              })}
            </div>
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default BedTimeStories;
