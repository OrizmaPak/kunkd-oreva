import DadBoy from "@/assets/dadboy.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DadSonBlur from "@/assets/dadsonblur.jpg";

const Mission = () => {
  return (
    <div className=" bg-[rgba(237,28,36,0.06);] pt-14 pb-20 ">
      <div className="max-w-[1200px] w-full mx-auto  ">
        <div className="max-w-[1000px] mx-auto flex gap-14">
          <div className="basis-1/2 mt-16">
            <h1 className="font-bold font-Recoleta text-[46px] mb-4">
              Our mission
            </h1>
            <p className="leading-[30px] text-[18px]">
              At Kunda Kids, we believe in the importance of promoting diversity
              and inclusion in children's literature and media. Our mission is
              to create engaging and inspiring stories that celebrate African
              culture and promote essential soft skills such as self-confidence,
              teamwork, and kindness.
            </p>
          </div>
          <div className="basis-1/2 flex justify-end">
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
              wrapperClassName=""
              width={408}
              height={408}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
