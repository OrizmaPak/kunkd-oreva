import DadBoy from "@/assets/dadboy.svg";
import DadSonBlur from "@/assets/dadsonblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./mission.css";

const Mission = () => {
  return (
    <div className=" bg-white pb-20 pad-x-40 pt-40">
      <div className="max-w-[1440px]  mx-auto ">
        <div className=" mx-auto flex gap-4 ">
          <div className="basis-1/2 mt-16 px-10">
            <h1 className="font-Inter header2 mb-4 text-[#101828] font-semibold">
              Our mission
            </h1>
            <p className="leading-[30px] text1  text-justify">
              At Kunda Kids, we believe in the importance of promoting diversity
              and inclusion in children's literature and media. Our mission is
              to create engaging and inspiring stories that celebrate African
              culture and promote essential soft skills such as self-confidence,
              teamwork, and kindness.
            </p>
          </div>
          <div className="basis-1/2 flex justify-center">
            <LazyLoadImage
              src={DadBoy}
              placeholderSrc={DadSonBlur}
              effect="blur"
              wrapperClassName="mission-img"
              className="mission-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
