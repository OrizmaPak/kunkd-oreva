import Iphone from "@/assets/parentphone24.png";
import GooglePlay from "../Home/GooglePlay";
import AppleStore from "../Home/AppleStore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import IphoneBlur from "@/assets/iphoneblur.jpg";
import "./kundaapp.css";

const KundaApp = () => {
  return (
    <div className="flex justify-between gap-30 pb-14 max-w-[1440px] mx-auto pad-x-40 ">
      <div data-aos="zoom-out" data-aos-once="true" className="basis-[100%] ">
        {/* <img loading="lazy" src={Iphone} alt="phone" className="  " /> */}

        <LazyLoadImage
          src={Iphone}
          placeholderSrc={IphoneBlur}
          effect="blur"
          width={531}
          className="kundaphone"
          // height={673}
          // wrapperClassName="absolute bottom-0  right-72 top-32 z-50"
          // width={300}
          // height={400}
        />
      </div>

      <div data-aos="fade-left" data-aos-once="true" className="basis-[100%] ">
        <div>
          <h1 className=" mt-4 mb-10 text-[36px] text-[#101828] font-Inter ">
            Access a World of Stories on the Go
          </h1>
          <p className="text-[20px] text-[#667085] leading-[40px] font-InterReg ">
            Designed with promoting the African culture in mind, our content
            celebrates diversity, promotes inclusivity, and encourages
            curiosity. Join thousands of young readers who are discovering the
            joy of storytelling and expanding their knowledge with every swipe.
          </p>
        </div>
        <div>
          <div className="flex gap-4 mt-8">
            <AppleStore sizes={true} />

            <GooglePlay sizes={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KundaApp;
