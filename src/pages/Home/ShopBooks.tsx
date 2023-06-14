import ShopCard from "./ShopCard";
import ShopCard1 from "@/assets/Chisom.svg";
import WaveThree from "@/assets/wavethree.svg";
import client1 from "@/assets/client.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import BigCart from "@/assets/Afam-04 1.svg";
import Lines from "@/assets/lines.svg";
import RoundG from "@/assets/Ellipse 56.svg";
import RoundR from "@/assets/Ellipse 59.svg";
import ZagB from "@/assets/zag3.svg";
import RoundY from "@/assets/Ellipse 57.svg";
import RoundP from "@/assets/roundpurpple.svg";

import SixB from "@/assets/six.svg";

import ClientCard from "./ClientCard";

const ShopBooks = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  var settings2 = {
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
    <div className="relative">
      <img src={Lines} alt="lines" className="absolute  right-0 top-[-300px]" />
      <img
        src={RoundG}
        alt="lines"
        className="absolute  right-[200px] top-[270px]"
      />
      <img
        src={SixB}
        alt="six icons"
        className="absolute  left-[100px] top-[200px]   transform rotate-180"
      />
      <img
        src={ZagB}
        alt="lines"
        className="absolute  right-[200px] bottom-[700px]"
      />
      <img
        src={RoundR}
        alt="lines"
        className="absolute  left-[200px] bottom-[700px]"
      />
      <img
        src={RoundY}
        alt="lines"
        className="absolute  right-[500px] bottom-[100px]"
      />

      <div
        className="bg-cover bg-bottom  w-full  matt h-[250px] "
        style={{ backgroundImage: `url(${WaveThree})` }}
      ></div>
      <div className="bg-[#EBEFF3]  w-[100%] pb-[40px] ">
        <div className="max-w-[800px] mx-auto mb-[70px] leading-8 text-center ">
          <h1 className="text-black text-3xl font-bold text-center mb-4 leading-8 ">
            Shop Our Books
          </h1>
          <p>
            Discover a world of literary treasures at the Kunda Kids store,
            where you can find carefully curated books, educational materials,
            and engaging resources. From beautifully illustrated storybooks to
            interactive learning kits, we provide everything you need to create
            a nurturing environment that sparks a love for reading in your
            child.
          </p>
        </div>

        <div className="flex justify-center items-center ">
          <div className="h-[605px] p-14 w-[1365px] bg-[#8530C1] rounded-[70px] mb-[200px] ">
            <div className="flex gap-10 ">
              <div className="basis-1/2">
                <img src={BigCart} alt="b=cart card" className="w-[500px]" />
              </div>
              <div className="basis-1/2 text-white">
                <p className="mb-5 mt-8">New Books</p>
                <h1 className="font-bold text-[25px] text-white">
                  Afam and the New Yam Festival <br /> [PRE-ORDER]
                </h1>
                <p className="my-5 leading-8">
                  Afam and the New Yam Festival is a heartwarming children’s
                  picture book, perfect for readers aged 3-8, that explores the
                  beauty of family, heritage, and unity.
                </p>
                <p className="font-bold text-[30px] mt-8">₦2,900.00 NGN</p>
                <p className="mb-10">Tax incuded</p>
                {/* <button className="bg-white text-[#447ADC] p-3  px-24 rounded-full">
            Add to cart
          </button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[800px] mx-auto leading-8 text-center">
          <h1 className="pt-8 text-3xl font-bold my-4 ">
            What Our Client's Have To say
          </h1>
          <p>
            Kunda & Friends is a beautiful new music-led 3D animation and for
            children that takes preschoolers on a fun and adventurous ride with
            Kunda and his friends
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto gap-4 mb-20 mt-14  relative">
          <button
            onClick={() => sliderRef?.current?.slickPrev()}
            className="absolute z-10 -left-8 top-[45%] hover:text-white bg-[#ffff] hover:bg-[#8530C1] rounded-full p-1"
          >
            <BsChevronLeft />
          </button>
          <button
            onClick={() => sliderRef?.current?.slickNext()}
            className="absolute z-10 -right-8 top-[45%] hover:text-white bg-[#ffff] hover:bg-[#8530C1] rounded-full p-1"
          >
            <BsChevronRight />
          </button>
          <Slider ref={sliderRef} {...settings2}>
            <div className="mr-4">
              <ClientCard
                name="Bolu Watife"
                location="Lagos Nigeria"
                image={client1}
                story=" Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              />
            </div>
            <div className="mr-4">
              <ClientCard
                name="Bolu Watife"
                location="Lagos Nigeria"
                image={client1}
                story=" Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              />
            </div>
            <div className="mr-4">
              <ClientCard
                name="Bolu Watife"
                location="Lagos Nigeria"
                image={client1}
                story=" Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              />
            </div>
            <div className="mr-4">
              <ClientCard
                name="Bolu Watife"
                location="Lagos Nigeria"
                image={client1}
                story=" Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              />
            </div>
            <div className="mr-4">
              <ClientCard
                name="Bolu Watife"
                location="Lagos Nigeria"
                image={client1}
                story=" Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              />
            </div>
            <div className="mr-4">
              <ClientCard
                name="Bolu Watife"
                location="Lagos Nigeria"
                image={client1}
                story=" Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
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
    </div>
  );
};

export default ShopBooks;
