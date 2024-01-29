import React from "react";
import { Skeleton } from "@mantine/core";
import { TStoryContent } from "@/api/types";
import "./cardscreenhome.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

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
  fetchNextPage?: () => void;
};
const CardScreen = ({
  data,
  header,
  action,
  actiontitle,
  card,
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

  useEffect(() => {
    if (inView && hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="   mx-10 pb-4">
      <div className="flex justify-between mb-[20px] pt-8 ">
        <span className=" text25 font-semibold font-Recoleta ">{header}</span>
        <button onClick={action} className=" text-[#8530C1] text2">
          {actiontitle}
        </button>
      </div>
      <div className="relative group  ">
        {/* <div className="absolute hidden group-hover:flex controls-container  w-full justify-between z-30  group"> */}
        <button
          className="p-4 bg-[rgba(238,238,238)] caourosel-button rounded-full absolute hidden group-hover:block z-30  left-10 "
          onClick={() => sliderReff?.current?.slickPrev()}
        >
          <GrPrevious size={30} />
        </button>
        <button
          className="p-4 bg-[rgba(238,238,238)] caourosel-button rounded-full absolute hidden group-hover:block z-30  left-[95.7%]"
          onClick={() => sliderReff?.current?.slickNext()}
        >
          <GrNext size={30} />
        </button>
        {/* </div> */}

        <Slider ref={sliderReff} {...settings}>
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
