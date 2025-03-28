import React from "react";
import { Skeleton } from "@mantine/core";
import { TStoryContent } from "@/api/types";
import "./cardscreenhome.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

type Props = {
  data?: TStoryContent[];
  header?: string;
  action?: () => void;
  actiontitle?: string;
  isTitled?: boolean;
  card?: (props: TStoryContent) => React.ReactNode;
  isLoading: boolean;
  hasInfiniteScroll?: boolean;
  hasNextPage?: boolean;
  subId?: string;
  hasAll?: boolean;
  fetchNextPage?: () => void;
};
const CardScreen = ({
  data,
  header,
  action,
  actiontitle,
  card,
  subId,
  hasAll,
  isLoading,
  hasInfiniteScroll = false,
  fetchNextPage,
  hasNextPage = false,
}: Props) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    slidesToScroll: 5,
  };

  const { ref, inView } = useInView({
    /* Optional options */
    // threshold: 1,
  });
  const sliderReff = useRef<Slider>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="    pb-4 ">
      <div className="flex justify-between mb-[20px] pt-8 ">
        <span className=" text25 font-semibold  font-Hanken ">{header}</span>
        <button onClick={action} className=" text-[#8530C1] text2">
          {actiontitle}
        </button>
        {hasAll && (
          <button
            onClick={() => {
              sessionStorage.setItem("subId", subId?.toString() as string);
              navigate(`${subId?.toString()}`);
            }}
            className=" text-[#8530C1] text2"
          >
            View All
          </button>
        )}
      </div>
      <div className="relative group  ">
        {/* <div className="absolute hidden group-hover:flex controls-container  w-full justify-between z-30  group"> */}
        <button
          className=" h-full bg-[rgba(131,130,130,0.5)] caourosel-button  absolute hidden group-hover:block z-30  left-0 "
          onClick={() => sliderReff?.current?.slickPrev()}
        >
          <GrPrevious size={40} color="white" />
        </button>

        <button
          className="h-full bg-[rgba(131,130,130,0.5)] caourosel-button  absolute hidden group-hover:block z-30  right-0 "
          onClick={() => sliderReff?.current?.slickNext()}
        >
          <GrNext size={40} color="white" />
        </button>
        {/* </div> */}

        <Slider ref={sliderReff} {...settings}>
          {isLoading
            ? Array(8)
                .fill(1)
                .map((arr, index) => (
                  <Skeleton key={index} visible={isLoading} className="">
                    <div
                      key={index}
                      className="h-[200px] w-[400px] text-transparent mx-2"
                    >
                      {arr}
                    </div>
                  </Skeleton>
                ))
            : data?.map((carddata: TStoryContent, index: number) => {
                if (
                  data.length === index + 1 &&
                  hasInfiniteScroll &&
                  hasNextPage
                ) {
                  return <div ref={ref}>Loading....</div>;
                }
                //  return <Todo key={todo.id} todo={todo} />;
                return card ? card(carddata) : null;
              })}
        </Slider>
      </div>
    </div>
  );
};

export default CardScreen;
