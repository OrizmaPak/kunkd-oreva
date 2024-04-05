import AppleStore from "./AppleStore";
import GooglePlay from "./GooglePlay";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Phones from "@/assets/iphone24.png";

const KundaAppContent = () => {
  return (
    <div
      data-aos="fade-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
      data-aos-once="true"
      className=""
    >
      <div className=" max-w-[1000px] mx-auto text-white text-[18px] mb-14 leading-10  ">
        <h1 className="text-center text-[40px] text-white mb-4 font-Secondary font-Inter header2">
          The Kunda Kids App
        </h1>
        <p className="text-center font-primary text20 font-InterReg ">
          Designed with promoting the African culture in mind, our content
          celebrates diversity, promotes inclusivity, and encourages curiosity.
          Join thousands of young readers who are discovering the joy of
          storytelling and expanding their knowledge with every swipe.
          {/* </p> */}
          {/* <p className="text-center font-Primary"> */}
        </p>
      </div>
      <div className="flex items-center justify-center gap-8 mt-8">
        <GooglePlay sizes={true} />
        <AppleStore sizes={true} />
      </div>

      <div
        data-aos="zoom-in"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        data-aos-once="true"
        className="z-50 flex justify-center items-center mt-20"
      >
        <LazyLoadImage
          // width={1184}
          // height={926}
          effect="blur"
          className="z-[50] phones "
          wrapperClassName="z-[50] phones"
          src={Phones}
          // placeholderSrc={Phonesblur}
        />
      </div>
    </div>
  );
};

export default KundaAppContent;
