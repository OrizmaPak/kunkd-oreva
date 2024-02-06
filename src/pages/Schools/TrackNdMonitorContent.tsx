import LadyBackground from "@/assets/ladysch24.png";
import Mac from "@/assets/macside24.png";
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
        <div data-aos="fade-up" data-aos-once="true">
          <p className=" font-Inter text-center mt-8 text-[36px]">
            Track and Monitor Student Progress
          </p>
          <p className=" leading-[30px] text-center text1   text-[#7E7E89] font-medium mt-5 font-InterReg ">
            Designed with promoting the African culture in mind, our content{" "}
            celebrates diversity, promotes inclusivity, <br /> and encourages
            curiosity. Join thousands of young readers who are discovering{" "}
            <br /> the joy of storytelling and expanding their knowledge with
            every swipe.
          </p>
        </div>

        <div className="relative overflow-hidden mt-20  pb-28">
          <div className="  ml-28  " data-aos="fade-right" data-aos-once="true">
            {/* <img loading="lazy" src={LadyBackground} alt="teacher" /> */}
            <LazyLoadImage
              src={LadyBackground}
              placeholderSrc={LadyBlur}
              effect="blur"
              wrapperClassName=""
              className=""
              width={458}
              height={600}
            />
          </div>
          <div className=" px-20">
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
              wrapperClassName="absolute top-[0px]   right-[0px] h-[1300px]"
              className=""
              // height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackNdMonitorContent;
