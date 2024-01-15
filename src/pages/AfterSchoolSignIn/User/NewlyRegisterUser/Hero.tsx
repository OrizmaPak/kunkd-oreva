import SchImage1 from "@/assets/scaorosel124.png";
import SchImage2 from "@/assets/scaorosel224.png";
import Slider from "react-slick";
// import { Skeleton } from "@mantine/core";
// import { useState } from "reac
import "./hero.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    arrows: false,
  };
  // const [isLoading, setIsLoadind] = useState(true);
  return (
    // <Skeleton visible={isLoading}>
    <div className="h-[256px] mb-16 relative ">
      <Slider {...settings}>
        <div className="bg-[#8530C1] h-[256px] rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl">
          <h1 className="text-[32px] text-white font-semibold mx-10  my-10 leading-[35px]">
            Beautifully illustrated storybooks
            <br /> for your child
          </h1>
          <img
            loading="lazy"
            src={SchImage1}
            alt="image"
            className="absolute right-0 bottom-[0px] banner-img-w"
          />
        </div>
        <div className="bg-[#2BB457] h-[256px] rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl">
          <h1 className="text-[32px] text-white font-semibold mx-10  my-10 leading-[35px]">
            Watch educational videos on <br /> the African Culture
          </h1>
          <img
            loading="lazy"
            src={SchImage2}
            alt="image"
            className="absolute right-0 bottom-[0px] banner-img-w"
          />
        </div>
      </Slider>

      <style>
        {`
          .slick-prev,
          .slick-next {
          }
          .slick-prev:hover,
          .slick-next:hover {
            border-radius : 50%;
          }
          .slick-dots {
            bottom: 20px;
            left:-570px !important;
            z-index: 1000 !important;
      
          }

          .slick-dots li button:before {
      font-size: 16px; /* Increase the font size of the dots */
      line-height: 1; /* Adjust the line height of the dots */
      width: 5px; /* Increase the width of the dots */
      height: 5px; /* Increase the height of the dots */
      *
      
    }
    .slick-dots li button:before {
      color:white; /* Set the background color of the active dot */
      opacity: 0.2 !important; /* Set the opacity of the active dot */
    }
    .slick-dots li.slick-active button:before{
      color: white;
      opacity:1 !important;
    }
        `}
      </style>
    </div>
    // </Skeleton>
  );
};

export default Hero;
