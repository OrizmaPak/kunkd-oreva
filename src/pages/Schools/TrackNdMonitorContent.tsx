import LadyBackground from "@/assets/lady2.svg";
import Mac from "@/assets/MacBook1.svg";
import MacBg from "@/assets/macbackground.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LadyBlur from "@/assets/ladyleftblur.jpg";
import MacBlur from "@/assets/machalfblur.jpg";

const TrackNdMonitorContent = () => {
  return (
    <div>
      <h1 className=" font-semibold font-Recoleta text-[46px] text-center">
        Track and Monitor Student Progress
      </h1>
      <p className=" leading-[30px] text-center text-[18px]  mt-4 text-[#7E7E89] ">
        With comprehensive tracking features, you can easily assess each
        student's reading proficiency, identify
        <br /> areas for improvement, and tailor instructions accordingly.
      </p>

      <div className="relative overflow-hidden mt-40">
        <div className="  ml-40">
          {/* <img loading="lazy" src={LadyBackground} alt="teacher" /> */}
          <LazyLoadImage
            src={LadyBackground}
            placeholderSrc={LadyBlur}
            effect="blur"
            wrapperClassName=""
            width={517}
            height={632}
          />
        </div>
        <div>
          <img
            src={MacBg}
            alt="mac bg "
            className="absolute top-[-25px] right-0"
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
            wrapperClassName="absolute top-[50px] right-[-100px]"
            width={883}
            height={463}
          />
        </div>
      </div>
    </div>
  );
};

export default TrackNdMonitorContent;
