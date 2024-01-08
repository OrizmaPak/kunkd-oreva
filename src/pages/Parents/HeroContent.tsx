import ManAndChild from "@/assets/parentbanner.svg";
// import Arrow from "@/assets/arrow.svg";
import ManAndChildBlur from "@/assets/manandchildblur.jpg";
import Button from "@/components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import "./herocontent.css";

const HeroContentContent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between ">
      <div className=" hero-text-container pt-16 ">
        <h1 className="text-[62px] text-[#101828]  font-Brico  header1">
          Empowering <br /> your child's <br />
          reading journey
        </h1>
        <div className="max-w-[500px] flex my-10 ">
          <p className="font-InterReg  leading-[40px] text-[#667085] text-[20px]">
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
          Get started
        </Button>
      </div>
      <div className="amina-container  z-50">
        <LazyLoadImage
          effect="blur"
          src={ManAndChild}
          placeholderSrc={ManAndChildBlur}
          className=" amina-w  "
        />
        {/* <img loading="lazy" src={Book} alt="" className='absolute  bottom-[34%]  right-[34%] z-50 ' /> */}
        {/* <img loading="lazy" src={Music} alt="" className='absolute  bottom-[25%]  right-[9%] z-50 ' /> */}
      </div>
    </div>
  );
};

export default HeroContentContent;
