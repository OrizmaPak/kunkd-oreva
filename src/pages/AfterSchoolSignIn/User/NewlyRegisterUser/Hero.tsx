import Banner1 from "@/assets/storyBanner.svg";
import Banner2 from "@/assets/cultureBanner.svg";
import Slider from "react-slick";

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

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={Banner1} alt="banner1" className="w-[100%]" />
        </div>
        <div>
          <img src={Banner2} alt="banner2" className="w-[100%]" />
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
