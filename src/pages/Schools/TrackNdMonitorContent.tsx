import LadyBackground from "@/assets/lady2.svg";
import Mac from "@/assets/halfmac.svg";
// import MacBg from "@/assets/macbackground.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LadyBlur from "@/assets/ladyleftblur.jpg";
import MacBlur from "@/assets/machalfblur.jpg";
import "./trackndmonitorcontent.css";

const TrackNdMonitorContent = () => {
  return (
    <div className="w-full flex justify-center items-center mt-28">
      <div className="container-w ">
        <h1 className=" font-Brico header-1 text-center mt-8">
          Track and Monitor Student Progress
        </h1>
        <p className=" leading-[30px] text-center text1   text-[#7E7E89] font-medium mt-10 ">
          Designed with promoting the African culture in mind, our content{" "}
          celebrates diversity, promotes inclusivity, <br /> and encourages
          curiosity. Join thousands of young readers who are discovering <br />{" "}
          the joy of storytelling and expanding their knowledge with every
          swipe.
        </p>

        <div className="relative overflow-hidden mt-20  pb-28">
          <div className="  ml-28">
            {/* <img loading="lazy" src={LadyBackground} alt="teacher" /> */}
            <LazyLoadImage
              src={LadyBackground}
              placeholderSrc={LadyBlur}
              effect="blur"
              wrapperClassName="lady-kunds"
              className="lady-kunds"
              // width={517}
              // height={632}
            />
          </div>
          <div className="bg-red-600 px-20">
            {/* <img
              src={MacBg}
              alt="mac bg "
              className="absolute top-[100px] right-0 mac-bg "
            /> */}

            {/* <img
            src={Mac}
            alt="mac"
            className="absolute top-[50px] right-[-100px] w-[40%]"
          /> */}

            <LazyLoadImage
              src={Mac}
              placeholderSrc={MacBlur}
              effect="blur"
              wrapperClassName="absolute top-[-50px] right-[-150px] mac-w h-[600px]"
              className="mac-w"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackNdMonitorContent;
