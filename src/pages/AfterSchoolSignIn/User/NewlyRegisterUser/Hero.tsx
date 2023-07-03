import Banner1 from "@/assets/storyBanner.svg";
import Banner2 from "@/assets/cultureBanner.svg";
import Slider from "react-slick";
import { Skeleton } from "@mantine/core";
import { useState } from "react";

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    // speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    arrows: false,
  };
  const [isLoading, setIsLoadind] = useState(true);
  return (
    <Skeleton visible={isLoading}>
      <div className="h-[250px] mb-28">
        <Slider {...settings}>
          <div>
            <img
              src={Banner1}
              alt="banner1"
              className="w-[100%]"
              onLoad={() => setIsLoadind(false)}
            />
          </div>
          <div>
            <img
              loading="lazy"
              src={Banner2}
              alt="banner2"
              className="w-[100%]"
            />
          </div>
        </Slider>
      </div>
    </Skeleton>
  );
};

export default Hero;
