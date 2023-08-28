import DadBoy from "@/assets/dadboy.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DadSonBlur from "@/assets/dadsonblur.jpg";
import "./mission.css";

const Vision = () => {
  return (
    <div className=" bg-[rgba(237,28,36,0.06);] pt-14 pb-80  pad-x-40">
      <div className="mission-container  mx-auto  ">
        <div className=" mx-auto flex  gap-5">
          <div className="basis-1/2 flex ">
            {/* <img
              loading="lazy"
              src={DadBoy}
              alt="parentImage"
              className="w-[70%]"
            /> */}
            <LazyLoadImage
              src={DadBoy}
              placeholderSrc={DadSonBlur}
              effect="blur"
              wrapperClassName="mission-img"
              className="mission-img"
              // width={408}
              // height={408}
            />
          </div>
          <div className="basis-1/2  mt-16">
            <h1 className=" font-semibold font-Recoleta header2 mb-4">
              Our Vision
            </h1>
            <p className="leading-[30px] text1 ">
              We envision a world where children of all backgrounds can see
              themselves represented in the stories they read. By infusing
              African culture into modern storylines with inspiring and
              adventurous characters, we hope to create a positive impact on
              children's development and help to bridge the gap between
              cultures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
