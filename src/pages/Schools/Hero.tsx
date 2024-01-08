import SchHero1 from "@/assets/schhero1.svg";
import SchHero2 from "@/assets/schhero2.svg";
import SchHero3 from "@/assets/schhero3.svg";
import SchHeroBlur1 from "@/assets/schheroblur1.jpg";
import SchHeroBlur2 from "@/assets/schheroblur2.jpg";
import SchHeroBlur3 from "@/assets/schheroblur3.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import "./hero.css";

import Button from "@/components/Button";
const Hero = () => {
  const naivagte = useNavigate();
  return (
    <div className="bg-white pt-14">
      <div className="max-w-[1000px] w-full mx-auto ">
        <h1 className=" font-Brico text-center header1 mt-[100px] text-[#101828]">
          Empowering <br />
          literacy education
        </h1>
        <p className=" leading-[30px] text1 text-[#667085] font-Inter   text-center mt-4">
          Embark on a reading adventure with Kunda Kids and empower your child's
          literacy journey.
          <br /> Join us today and unlock the boundless possibilities of
          literacy.
        </p>
        <p className="flex justify-center items-center mt-4 ">
          <Button onClick={() => naivagte("/signup")} size="md">
            Get Started
          </Button>
        </p>

        <div className="flex gap-10 justify-center items-center">
          <div>
            {/* <img loading="lazy" src={SchHero1} alt="girl" /> */}
            <LazyLoadImage
              src={SchHero1}
              placeholderSrc={SchHeroBlur1}
              effect="blur"
              // wrapperClassName=""
              wrapperClassName="kid-card-picture"
              className="kid-card-picture"
            />
          </div>
          <div className="mt-[100px]">
            {/* <img loading="lazy" src={SchHero2} alt="girl" />
             */}
            <LazyLoadImage
              src={SchHero2}
              placeholderSrc={SchHeroBlur2}
              effect="blur"
              wrapperClassName="kid-card-picture"
              className="kid-card-picture"
              // width={282}

              // height={428.5}
            />
          </div>
          <div>
            {/* <img loading="lazy" src={SchHero3} alt="girl" /> */}
            <LazyLoadImage
              src={SchHero3}
              placeholderSrc={SchHeroBlur3}
              effect="blur"
              wrapperClassName="kid-card-picture"
              className="kid-card-picture"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
