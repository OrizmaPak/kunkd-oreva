import { useRef, useState } from "react";
// import ParentalCtrl from "@/assets/logincarousel224.png";
// import LearnImage1 from "@/assets/logincarosel124.png";
// import LearnImage2 from "@/assets/logincarousel324.png";

import XmaJPG01 from "@/assets/xmasJPG01.jpg";
import XmaJPG02 from "@/assets/xmasJPG02.jpg";
import XmaJPG03 from "@/assets/xmasJPG03.jpg";

import CarouselCard from "./CarouselCard";
import Slider from "react-slick";
import { Skeleton } from "@mantine/core";
const LoginCarousel = () => {
  const [activeDot, setActiveDot] = useState(0);

  const images = [XmaJPG01, XmaJPG02, XmaJPG03];
  const carouselData = [
    {
      bgImage: XmaJPG01,
      title: "Read, Listen & Enjoy",
      className:
        "bg-[rgba(230,230,230,0.4)]  backdrop-blur  border-white border-[1.5px]",
      body: "Get access to fun and inspiring stories & audiobooks that build on soft skills, values, reading and numeracy on a weekly basis.",
    },
    {
      bgImage: XmaJPG02,
      title: "Access a World of Stories",
      className:
        "bg-[rgba(230,230,230,0.4)]  backdrop-blur  border-white border-[1.5px]",
      body: "Get access to fun and inspiring stories & audiobooks that build on soft skills, values, reading and numeracy on a weekly basis.",
    },
    {
      bgImage: XmaJPG03,
      title: "Learn African Languages",
      className:
        "bg-[rgba(230,230,230,0.4)]  backdrop-blur border-white border-[1.5px] ",
      body: "Get access to fun and inspiring stories & audiobooks that build on soft skills, values, reading and numeracy on a weekly basis.",
    },
  ];
  const settings = {
    infinite: true,
    // speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 0,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    beforeChange: (...rest: number[]) => setActiveDot(rest[1]),
  };
  const sliderRef = useRef<Slider>(null);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Skeleton visible={isLoading} className="hidden lg:block">
      <div className="w-full h-full bg-center  ">
        <img
          src={`${activeDot ? images[activeDot] : XmaJPG01}`}
          alt=""
          className="w-full h-full absolute object-cover  object-top  "
          onLoad={() => setIsLoading(false)}
        />

        <div className=" w-full h-full flex items-end justify-center ">
          <div className="w-[600px]   relative    mb-10">
            <div className="  ">
              {/* <button onClick={()=>sliderRef?.current?.slickPrev()} className='absolute z-10 -left-8 top-[45%] hover:text-white bg-[#ffff] hover:bg-[#8530C1] rounded-full p-1'>
          <BsChevronLeft  />
          </button> */}
              {/* <button
              onClick={() => sliderRef?.current?.slickNext()}
              className="absolute z-10 right-8 top-[85%] hover:text-white bg-[#ffff]  rounded-full p-1"
            >
              <img loading="lazy" src={ArrowCaro} alt="arrow" />
            </button> */}
              <div className="flex gap-2  bottom-16 left-[270px] absolute z-50 ">
                <CustomDot
                  handleSet={() => {
                    sliderRef?.current?.slickGoTo(0);
                  }}
                  active={activeDot === 0}
                />
                <CustomDot
                  handleSet={() => {
                    sliderRef?.current?.slickGoTo(1);
                  }}
                  active={activeDot === 1}
                />
                <CustomDot
                  handleSet={() => {
                    sliderRef?.current?.slickGoTo(2);
                  }}
                  active={activeDot === 2}
                />
              </div>
              <Slider ref={sliderRef} {...settings}>
                {carouselData.map((el) => {
                  return (
                    <div className="">
                      <CarouselCard
                        className={el.className}
                        title={el.title}
                        body={el.body}
                      />
                    </div>
                  );
                })}
                {/* <div>
        <CarouselCard className='bg-[rgba(40,67,135,0.5)]' title='Read, Listen & Enjoy' body='get access to fun and' />
        </div>
        <div>
        <CarouselCard className='bg-[rgba(40,67,135,0.5)]' title='Read, Listen & Enjoy' body='get access to fun and' />
        </div>
        <div>
        <CarouselCard className='bg-[rgba(40,67,135,0.5)]' title='Read, Listen & Enjoy' body='get access to fun and' />
        </div> */}
              </Slider>
              <style>
                {`
          .slick-dots{
            
          position: absolute;
          }
                `}
              </style>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default LoginCarousel;
type PropsActive = {
  active: boolean;
  handleSet: () => void;
};

const CustomDot = ({ active, handleSet }: PropsActive) => {
  return (
    <span
      onClick={handleSet}
      className=" cursor-pointer"
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        border: "1px solid white",
        background: active ? "white" : "", // Customize the dot's appearance
      }}
    />
  );
};
