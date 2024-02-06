// import Music from "@/assets/Audio Icon.svg";
// import Book from "@/assets/Book Icon.svg";
// import group from "@/assets/kids24.png";
import Arrow from "@/assets/Iconarrow.svg";
import GroupBlur from "@/assets/groupblur.jpg";
import Button from "@/components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import "./herocontent.css";
// import VideoIcon from "@/assets/newvideoIcon.svg";
// import Ellipse10 from "@/assets/Ellipse 51.svg";
import MainHomeIcon from "@/assets/mainHomeIcons.png";

// import Ellipse11 from "@/assets/Rectangle 2304.svg";
import AOS from "aos";

import { useEffect } from "react";

const HeroContent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);
  return (
    <div className="  flex justify-between  ">
      <div
        data-aos="fade-up"
        className=" left-[80px] hero-text-container basis-1/2 pt-14 "
      >
        <p className="font-semibold  text-[#8530C1] mb-4  font-Inter header2  flex bg-[#F9F5FF]  gap-4 items-center w-[290px] rounded-full justify-center">
          <span className="text-[18px]">Introducing Kunda Kids</span>

          <img loading="lazy" src={Arrow} alt="" className="w-4 pt-2 mb-2" />
        </p>
        <h1 className="text-[68px]  font-Brico  font-bold tracking-[-1.5px] ">
          Empowering Africa's <br /> Reading Leaders
        </h1>
        <div className="max-w-[500px] flex mb-10 mt-10">
          <p className="text-[20px] text-[#667085]   font-InterReg  leading-[31px] text1  text-justify">
            Unlock the power of literacy with Kunda Kids, the revolutionary
            platform dedicated to raising reading leaders across Africa
          </p>
        </div>
        <Button
          onClick={() => navigate("/signup")}
          size="md"
          className=" cursor-pointer  z-[1000]"
        >
          Create account
        </Button>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-once="true"
        className="  relative basis-1/2 h-[700px] overflow-hidden"
      >
        {/* <img
          src={Ellipse10}
          alt="image"
          className=" absolute   left-14 top-[100px] "
        />
        <img
          src={Ellipse11}
          alt="image"
          className="  absolute  z-10  left-[150px] top-[175px]"
        /> */}
        <LazyLoadImage
          src={MainHomeIcon}
          placeholderSrc={GroupBlur}
          effect="blur"
          wrapperClassName="absolute bottom-0  top-[30px] z-50  right-[0px] "
          width={600}
          height={400}
        />
        {/* <img
          src={Book}
          alt=""
          className="absolute  bottom-[30px]  right-[500px] z-50 "
        />
        <img
          src={VideoIcon}
          alt=""
          className="absolute top-[-45px] right-[210px] z-50 "
        />
        <img
          src={Music}
          alt=""
          className="absolute  bottom-[-80px] right-[30px] z-50 "
        /> */}
      </div>
    </div>
  );
};

export default HeroContent;
