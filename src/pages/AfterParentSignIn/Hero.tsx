import Slider from "react-slick";
import PImages1 from "@/assets/pcaorosel124.png";
import PImages2 from "@/assets/pcaorosel224.png";
import "./hero.css";

type Props = {
  //   banner: string;
  username: string;
  userimage: string;
};

const Hero = ({ username, userimage }: Props) => {
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
  return (
    // <Skeleton visible={isLoading}>
    <div>
      <div className="flex  w-full  justify-between">
        <div className="py-8 pl-24 mt-4">
          <p className=" mb-2">
            <img
              loading="lazy"
              src={userimage}
              alt="userimage"
              className="hero-img object-cover rounded-full"
            />
          </p>
          <h1 className="font-bold font-Recoleta text25">
            Hello{" "}
            {username && username.charAt(0).toUpperCase() + username.slice(1)},
          </h1>
          <p className=" font-Hanken text-lg text-gray-400 text2">
            Start reading.
          </p>
        </div>
        <div className="hero-w h-[256px]">
          <Slider {...settings}>
            <div className=" h-[256px]   w-full relative bg-[#8530C1]  rounded-bl-2xl rounded-tr-3xl">
              <h1 className="text25 text-white font-semibold mx-10  my-10 leading-10">
                Beautifully illustrated storybooks for <br /> your child
              </h1>
              <img
                src={PImages1}
                alt="images"
                className="absolute  right-0 bottom-0"
              />
            </div>

            <div className="bg-[#2BB457] w-full relative h-[256px]  rounded-bl-2xl rounded-tr-3xl">
              <h1 className="text25 text-white mx-10  my-10 font-semibold leading-10">
                Watch educational videos on the
                <br /> African Culture
              </h1>
              <img
                src={PImages2}
                alt="images"
                className="absolute  right-0 bottom-0"
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
            left:-350px !important;
            z-index:50 !important;
      
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

          {/* <img
              src={Banner1}
              alt="Banner"
              className="w-[900px]"
              onLoad={() => setIsLoading(false)}
            /> */}
          {/* <span className="absolute h-[20px] w-16 bg-[#782caf] bottom-[65px] left-[40px]"></span> */}
        </div>
      </div>
      <hr className="mt-[10px] mb-[50px] mx-16 " />
    </div>
    // </Skeleton>
  );
};

export default Hero;
