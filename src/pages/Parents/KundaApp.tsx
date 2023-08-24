import Iphone from "@/assets/iphone.svg";
import GooglePlay from "../Home/GooglePlay";
import AppleStore from "../Home/AppleStore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import IphoneBlur from "@/assets/iphoneblur.jpg";

const KundaApp = () => {
  return (
    <div className="flex justify-between  py-[100px] max-w-[1300px] mx-auto gap-[250px]">
      <div className="basis-[100%]">
        {/* <img loading="lazy" src={Iphone} alt="phone" className="  " /> */}

        <LazyLoadImage
          src={Iphone}
          placeholderSrc={IphoneBlur}
          effect="blur"
          width={531}
          height={673}
          // wrapperClassName="absolute bottom-0  right-72 top-32 z-50"
          // width={300}
          // height={400}
        />
      </div>

      <div className="basis-[100%]">
        <div>
          <h1 className="text-[46px] font-bold mt-4 mb-10 leading-[62px]  font-Recoleta ">
            Access a World of Stories on the Go
          </h1>
          <p className="text-[18px] leading-[40px]">
            Whether you're on the way to school or embarking on a family
            adventure, your child can immerse themselves in a vast library of
            tales that entertain, educate, and ignite their imagination through
            our mobile app.
          </p>
        </div>
        <div className="mt-[180px]">
          <h1 className="font-bold text-3xl mb-14 font-Recoleta">
            Download App Now
          </h1>
          <div className="flex gap-4">
            <AppleStore />

            <GooglePlay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KundaApp;
