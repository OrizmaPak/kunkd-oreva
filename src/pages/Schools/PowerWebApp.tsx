import DadBoy from "@/assets/dadboy.svg";
import Button from "@/components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DadSonBlur from "@/assets/dadsonblur.jpg";

const PowerWebApp = () => {
  return (
    <div className=" bg-[rgba(237,28,36,0.06);] pt-14  pb-40 mb-20 ">
      <div className="max-w-[1300px] w-full mx-auto ">
        <div className="max-w-[1300px] mx-auto flex gap-40">
          <div className="basis-1/2">
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
              // width={562}
              // height={568.64}
            />
          </div>
          <div className="basis-1/2  mt-20">
            <h1 className=" font-semibold font-Recoleta text-[46px] mb-4">
              Unlock the Power of the Web App
            </h1>
            <p className="leading-[30px] text-[18px]">
              With a school license, our web app offers a comprehensive suite of
              enlightening stories, interactive quizzes, and immersive
              storytelling experiences, all tailored to support and strengthen
              students' reading abilities.
              <p className="mt-20">
                <Button size="md">
                  <small>Start FREE 7 Days Trial </small>
                </Button>
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerWebApp;
