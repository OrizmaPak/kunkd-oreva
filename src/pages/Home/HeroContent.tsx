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

const HeroContent = () => {
  const navigate = useNavigate();
  return (
    <div className=" z-[1000]  block bg-red-600 w-[700px] ">
      <div className="absolute top-40  left-[80px] hero-text-container ">
        <p className="font-bold text-[36px] text-[#8530C1]  font-Recoleta header2 ">
          Introducing Kunda Kids
        </p>
        <h1 className="text-[62px] font-bold font-Recoleta  header1 ">
          Empowering Africa's <br /> Reading Leaders
        </h1>
        <div className="max-w-[400px] flex mb-10 mt-10">
          <span className="mr-4 ">
            <img loading="lazy" src={Arrow} alt="" className="w-20 pt-2 " />
          </span>
          <p className="text-[18px] font-Hanken leading-[31px] text1">
            Unlock the power of literacy with Kunda Kids, the revolutionary
            platform dedicated to raising reading leaders across Africa
          </p>
        </div>
        <Button
          onClick={() => navigate("/signup")}
          size="md"
          className=" cursor-pointer  z-[1000]"
        >
          Create free account
        </Button>
      </div>
      <div className="bg-yellow-700">
        <LazyLoadImage
          src={group}
          placeholderSrc={GroupBlur}
          effect="blur"
          wrapperClassName="absolute bottom-0  right-[250px] top-32 z-50 hero-two-kids "
          width={300}
          height={400}
        />
        <img
          src={Book}
          alt=""
          className="absolute  bottom-[34%]  right-[34%] z-50 "
        />
        <img
          src={Music}
          alt=""
          className="absolute  bottom-[25%]  right-[9%] z-50 "
        />
      </div>
    </div>
  );
};

export default HeroContent;
