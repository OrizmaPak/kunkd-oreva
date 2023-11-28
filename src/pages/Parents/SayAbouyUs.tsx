import client1 from "@/assets/client.svg";
import { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "react-lazy-load-image-component/src/effects/blur.css";

import ClientCard from "../Home/ClientCard";
const SayAboutUs = () => {
  const settings2 = {
    className: "center",
    arrows: false,
    dots: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    swipeToSlide: true,
  };
  const arrowStyles = {
    color: "red", // Replace with your desired color
    "&:hover": {
      color: "blue", // Replace with your desired hover color
    },
  };
  const sliderRef = useRef<Slider>(null);

  return (
    <div>
      {" "}
      <div className=" mx-auto leading-8 text-center  / ">
        <h1 className="pt-8 header-1 font-bold  font-Recoleta ">
          What our clients have to Say about us
        </h1>
        {/* <p>
            Kunda & Friends is a beautiful new music-led 3D animation and for
            children that takes preschoolers on a fun and adventurous ride with
            Kunda and his friends
          </p> */}
      </div>
      <div className="max-w-[1000px] mx-auto gap-4 mb-32 mt-14  relative ">
        <button
          onClick={() => sliderRef?.current?.slickPrev()}
          className="absolute z-10 -left-14 top-[45%] hover:text-white bg-[#ffff] hover:bg-[#8530C1] rounded-full p-2"
        >
          <BsChevronLeft size={30} />
        </button>
        <button
          onClick={() => sliderRef?.current?.slickNext()}
          className="absolute z-10 -right-14 top-[45%] hover:text-white bg-[#ffff] hover:bg-[#8530C1] rounded-full p-2"
        >
          <BsChevronRight size={30} />
        </button>
        <Slider ref={sliderRef} {...settings2}>
          <div className="mr-4">
            <ClientCard
              name="Bolu Watife"
              location="Lagos Nigeria"
              image={client1}
              story="It's good for my own children to maintain a connection to the African continent. They grew up in DRCongo but we're moving to Paraguay so I want those stories to be in their lives."
            />
          </div>
          <div className="mr-4">
            <ClientCard
              name="Bolu Watife"
              location="Lagos Nigeria"
              image={client1}
              story="It's good for my own children to maintain a connection to the African continent. What you do is just so amazing and necessary. More African characters and experiences please!"
            />
          </div>
          <div className="mr-4">
            <ClientCard
              name="Bolu Watife"
              location="Lagos Nigeria"
              image={client1}
              story="It's good for my own children to maintain a connection to the African continent. They grew up in DRCongo but we're moving to Paraguay so I want those stories to be in their lives."
            />
          </div>
          <div className="mr-4">
            <ClientCard
              name="Bolu Watife"
              location="Lagos Nigeria"
              image={client1}
              story="It's good for my own children to maintain a connection to the African continent. What you do is just so amazing and necessary. More African characters and experiences please!"
            />
          </div>
          <div className="mr-4">
            <ClientCard
              name="Bolu Watife"
              location="Lagos Nigeria"
              image={client1}
              story="It's good for my own children to maintain a connection to the African continent. They grew up in DRCongo but we're moving to Paraguay so I want those stories to be in their lives."
            />
          </div>
          <div className="mr-4">
            <ClientCard
              name="Bolu Watife"
              location="Lagos Nigeria"
              image={client1}
              story="It's good for my own children to maintain a connection to the African continent. What you do is just so amazing and necessary. More African characters and experiences please!"
            />
          </div>
        </Slider>

        <style>
          {`
          .slick-prev,
          .slick-next {
            // background-color: ${arrowStyles.color};
          }
          .slick-prev:hover,
          .slick-next:hover {
            background-color: ${arrowStyles["&:hover"].color};
            color: ${arrowStyles["&:hover"].color};
            border-radius : 50%;
          }
           .slick-dots {
      // : 20px; /* Adjust the position of the dots as needed */
    }

    .slick-dots li button:before {
      font-size: 16px; /* Increase the font size of the dots */
      line-height: 1; /* Adjust the line height of the dots */
      width: 16px; /* Increase the width of the dots */
      height: 16px; /* Increase the height of the dots */
      top:28px
      
    }
    .slick-dots li button:before {
      color: #8530C1; /* Set the background color of the active dot */
    }
    .slick-dots li.slick-active button:before{
      color: #8530C1;
    }
        `}
        </style>
        {/* <ClientCard name='Bolu Watife' location='Lagos Nigeria' image={client1} story=' Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'/> */}
      </div>
    </div>
  );
};

export default SayAboutUs;
