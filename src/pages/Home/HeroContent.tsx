import Music from "@/assets/Audio Icon.svg";
import Book from "@/assets/Book Icon.svg";
import group from "@/assets/Group 425.svg";
import Arrow from "@/assets/arrow.svg";
import GroupBlur from "@/assets/groupblur.jpg";
import Button from "@/components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import "./herocontent.css";
import VideoIcon from "@/assets/newvideoIcon.svg";
import Ellipse10 from "@/assets/Ellipse 51.svg";

import Ellipse11 from "@/assets/Rectangle 2304.svg";

const HeroContent = () => {
  const navigate = useNavigate();
  return (
    <div className="  flex justify-between  ">
      <div className=" left-[80px] hero-text-container basis-1/2 pt-14 ">
        <p className="font-bold text1 text-[#8530C1] mb-4  font-Inter header2  flex bg-[#F9F5FF]  gap-4 items-center w-[290px] rounded justify-center">
          <span>Introducing Kunda Kids</span>

          <img loading="lazy" src={Arrow} alt="" className="w-10 pt-2 mb-2" />
        </p>
        <h1 className="text-[62px]  font-Brico  header1 ">
          Empowering Africa's <br /> Reading Leaders
        </h1>
        <div className="max-w-[500px] flex mb-10 mt-10">
          <p className="text-[20px] text-[#667085]  font-medium  leading-[31px] text1  text-justify">
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
      <div className="  relative basis-1/2">
        <img
          src={Ellipse10}
          alt="image"
          className=" absolute   left-14 top-[100px] "
        />
        <img
          src={Ellipse11}
          alt="image"
          className="  absolute  z-10  left-[150px] top-[175px]"
        />
        <LazyLoadImage
          src={group}
          placeholderSrc={GroupBlur}
          effect="blur"
          wrapperClassName="absolute bottom-0  top-[30px] z-50 hero-two-kids right-[210px] "
          width={290}
          height={400}
        />
        <img
          src={Book}
          alt=""
          className="absolute  bottom-[30px]  right-[500px] z-50 "
        />
        <img
          src={VideoIcon}
          alt=""
          className="absolute top-[-30px] right-[250px] z-50 "
        />
        <img
          src={Music}
          alt=""
          className="absolute  bottom-[-80px] right-[30px] z-50 "
        />
      </div>
    </div>
  );
};

export default HeroContent;
