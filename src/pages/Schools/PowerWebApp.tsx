import DadBoy from "@/assets/dadboy.svg";
import Button from "@/components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DadSonBlur from "@/assets/dadsonblur.jpg";
import "./powerwebapp.css";
import { useNavigate } from "react-router-dom";

const PowerWebApp = () => {
  const naivagte = useNavigate();

  return (
    <div className=" bg-white pt-14  pb-6 ">
      <div className="max-w-[1440px] w-full mx-auto  pad-x-40">
        <div className="max-w-[1440px]  flex   justify-betwee">
          <div className="basis-1/2  ">
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
              wrapperClassName="dad-kid-w"
              className="dad-kid-w"
              // width={562}
              // height={568.64}
            />
          </div>
          <div className="basis-1/2  pad-x-40 flex flex-col justify-center  ">
            <h1 className=" text-[#101828] font-Inter  mb-4 text-[36px]">
              Unlock the Power of the Web App
            </h1>
            <p className="leading-[30px] text1 text-padding font-medium text-[#7E7E89] font-InterReg ">
              With a school license, our web app offers a comprehensive suite of
              enlightening stories, interactive quizzes, and immersive
              storytelling experiences, all tailored to support and strengthen
              students' reading abilities.
              <p className="mt-10">
                <Button onClick={() => naivagte("/signup")} size="md">
                  <span>Start now </span>
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
