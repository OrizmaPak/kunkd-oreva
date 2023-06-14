import KundaApp from "../Home/KundaApp";
import Pupils from "@/assets/pupils.svg";
import Slider from "react-slick";
// import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./Carousel.css"; // Custom CSS file
import "./BookTrailer.css";
import { useState } from "react";
import YoutubeIcon from "@/assets/youtube.svg";

const imageStyle = (active: number, index: number) => {
  console.log(active === index, active, index);
  return {
    // width: "300px",
    paddingTop: "20px",
    // height: "250px",
    transform: active === index ? "scale(1.15)" : "scale(1)",
    transition: "all ease-in-out .2s",
  };
};
const BookTrailer = () => {
  const [active, setActive] = useState(0);
  const settings = {
    // className: "center",
    arrows: false,
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "90px",
    slidesToShow: 3,
    autoplay: true,
    slideToScroll: 1,
    speed: 500,
    beforeChange: (init: number, index: number) => {
      console.log("--- index", index);
      setActive(index);
    },
    centerModeSettings: {
      // Additional settings for center mode
      centerPadding: "400px", // Adjust this value to make the center element bigger
    },
  };
  return (
    <div className=" -z-0">
      <KundaApp>
        <div className="text-center text-white">
          <h1 className=" font-Recoleta text-[50px] ">
            Our awsome book trail!
          </h1>
          <p>
            Enjoy our animated book trailers below and subscribe to the Kunda
            Kids YouTube
            <br /> channel and enjoy more videos where our characters and
            stories come to life.
          </p>
        </div>

        <div>
          <button className="my-24  bg-white flex justify-between items-center font-bold  p-5 rounded-3xl px-16  gap-8 mx-auto">
            <span>Watch Kunda kids on</span>
            <img src={YoutubeIcon} alt="Yuotube" />
          </button>
          <div className="py-4 mt-10 h-[800px]  ">
            <Slider {...settings}>
              <div>
                <img src={Pupils} style={imageStyle(active, 0)} alt="pupils" />
              </div>
              <div>
                <img src={Pupils} style={imageStyle(active, 1)} alt="pupils" />
              </div>
              <div>
                <img src={Pupils} style={imageStyle(active, 2)} alt="pupils" />
              </div>
              <div>
                <img src={Pupils} style={imageStyle(active, 3)} alt="pupils" />
              </div>
              <div>
                <img src={Pupils} style={imageStyle(active, 4)} alt="pupils" />
              </div>
              <div>
                <img src={Pupils} style={imageStyle(active, 5)} alt="pupils" />
              </div>
            </Slider>

            <style>
              {`
              
              
               .slick-dots li button:before {
      font-size: 16px; /* Increase the font size of the dots */
      line-height: 1; /* Adjust the line height of the dots */
      width: 16px; /* Increase the width of the dots */
      height: 16px; /* Increase the height of the dots */
      
    }
    .slick-dots li button:before {
      color: white; /* Set the background color of the active dot */
    }
    .slick-dots li.slick-active button:before{
      color: white;
    }

    .slick-dots{
      margin-top:400px;
      bottom: -100px;
    }
              
              
              `}
            </style>
          </div>
        </div>
      </KundaApp>
    </div>
  );
};

export default BookTrailer;
