import LadyBackground from "@/assets/lady2.svg";
import Mac from "@/assets/MacBook1.svg";
import MacBg from "@/assets/macbackground.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LadyBlur from "@/assets/ladyleftblur.jpg";
import MacBlur from "@/assets/machalfblur.jpg";
import "./trackndmonitorcontent.css";

const TrackNdMonitorContent = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="container-w ">
        <h1 className=" font-semibold font-Recoleta header-1 text-center mt-8">
          Track and Monitor Student Progress
        </h1>
        <p className=" leading-[30px] text-center text1   text-[#7E7E89] font-medium mt-10 ">
          With comprehensive tracking features, you can easily assess each
          student's reading proficiency, identify
          <br /> areas for improvement, and tailor instructions accordingly.
        </p>

        <div className="relative overflow-hidden mt-40  pb-28">
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
            <img
              src={MacBg}
              alt="mac bg "
              className="absolute top-[10px] right-0 mac-bg "
            />

            {/* <img
            src={Mac}
            alt="mac"
            className="absolute top-[50px] right-[-100px] w-[40%]"
          /> */}

            <LazyLoadImage
              src={Mac}
              placeholderSrc={MacBlur}
              effect="blur"
              wrapperClassName="absolute top-[50px] right-[-150px] mac-w"
              className="mac-w"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackNdMonitorContent;
