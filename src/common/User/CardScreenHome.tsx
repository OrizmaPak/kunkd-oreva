import React from "react";
import { Skeleton } from "@mantine/core";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import "./cardscreenhome.css";
import { Carousel } from "@mantine/carousel";
import { GrNext, GrPrevious } from "react-icons/gr";

type Props = {
  data?: TStoryContent[];
  header?: string;
  action?: () => void;
  actiontitle?: string;
  isTitled?: boolean;
  card?: (props: TStoryContent) => React.ReactNode;
  isLoading: boolean;
};
const CardScreen = ({
  data,
  header,
  action,
  actiontitle,
  card,
  isLoading,
}: Props) => {
  return (
    <div className=" mx-20 mt-4 my-5">
      <div className="flex justify-between mb-6 ">
        <span className=" text25 font-semibold font-Recoleta ">{header}</span>
        <button onClick={action} className=" text-[#8530C1] text2">
          {actiontitle}
        </button>
      </div>
      <div className=" group">
        {/* <div className="flex gap-5 mb-14  "> */}
        <Carousel
          className="group"
          height={255}
          slideSize="200px"
          slideGap="md"
          align="start"
          slidesToScroll={3}
          loop={false}
          // controlsOffset="-40px"
          // withIndicators={false}

          styles={{
            control: {
              "&[data-inactive]": {
                opacity: 0,
                cursor: "default",
                path: "0px",
              },
            },
          }}
          nextControlIcon={
            <GrNext
              size={40}
              color="#8530C1"
              className=" react-icon invisible group-hover:visible  "
            />
          }
          previousControlIcon={
            <GrPrevious
              size={40}
              color="#8530C1"
              className=" react-icon invisible group-hover:visible"
            />
          }
        >
          {isLoading
            ? Array(5)
                .fill(1)
                .map((arr, index) => (
                  <Skeleton key={index} visible={isLoading}>
                    <div
                      key={index}
                      className="h-[200px] w-[400px] text-transparent"
                    >
                      {arr}
                    </div>
                  </Skeleton>
                ))
            : data?.map((data: TStoryContent) => {
                return card ? card(data) : null;
              })}
        </Carousel>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CardScreen;
