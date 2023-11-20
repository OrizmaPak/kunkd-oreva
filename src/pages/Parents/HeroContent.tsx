import ManAndChild from "@/assets/Mask group (1).svg";
import Arrow from "@/assets/arrow.svg";
import ManAndChildBlur from "@/assets/manandchildblur.jpg";
import Button from "@/components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import "./herocontent.css";

const HeroContentContent = () => {
  const navigate = useNavigate();
  return (
    <div className="z-[1000]   block ">
      <div className="absolute top-40  left-40 hero-text-container ">
        <h1 className="text-[62px] font-bold   font-Recoleta  header1">
          <span>
            <span className="text-[#8530C1]">Empowering</span> your child's
          </span>
          <p> reading journey</p>
        </h1>
        <div className="max-w-[400px] flex my-10 ">
          <span className="mr-4 ">
            <img loading="lazy" src={Arrow} alt="" className="w-20 pt-2 " />
          </span>
          <p className="  font-Hanken leading-[30px] text1">
            Embark on a reading adventure with Kunda Kids and empower your
            child's literacy journey. Join us today and unlock the boundless
            possiblities of literacy
          </p>
        </div>
        <Button
          onClick={() => navigate("/signup")}
          size="md"
          className=" cursor-pointer z-[1000]"
        >
          Create free account
        </Button>
      </div>
      <div className="absolute bottom-[70px]  right-[60px] amina-container  z-50">
        <LazyLoadImage
          effect="blur"
          src={ManAndChild}
          placeholderSrc={ManAndChildBlur}
          className=" amina-w  right-[60px]"
        />
        {/* <img loading="lazy" src={Book} alt="" className='absolute  bottom-[34%]  right-[34%] z-50 ' /> */}
        {/* <img loading="lazy" src={Music} alt="" className='absolute  bottom-[25%]  right-[9%] z-50 ' /> */}
      </div>
    </div>
  );
};

export default HeroContentContent;
