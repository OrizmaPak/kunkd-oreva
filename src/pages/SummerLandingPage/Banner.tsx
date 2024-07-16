import Button from "@/components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import SummerBannerImage from "@/assets/summerBanner2.png";

import Hero from "@/pages/Parents/ParentHero";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <Hero>
      <div className="flex justify-between   flex-col lg:flex-row    ">
        <div
          data-aos="fade-right"
          data-aos-once="true"
          className=" hero-text-container pt-8  md:pt-16  mb-8 md:mb-0 "
        >
          <h1 className=" text-[#101828] text-center md:text-start font-Brico  header1  max-w-[650px]">
            Kunda Kids Summer Reading Challenge: Unleash Your Inner Genius!
          </h1>
          <div className="max-w-[500px] flex my-2 justify-center items-center md:justify-start ">
            <Button
              onClick={() => navigate("/signup")}
              size="md"
              className=" cursor-pointer z-[1000] hidden md:block"
            >
              Register Now
            </Button>
          </div>
        </div>

        <div className=" md:relative md:-top-[100px]">
          <div
            data-aos="fade-left"
            data-aos-once="true"
            className="amina-container  z-50   "
          >
            <LazyLoadImage
              effect="blur"
              src={SummerBannerImage}
              className="amina-w   "
            />
          </div>
        </div>
      </div>
    </Hero>
  );
};

export default Banner;
