import Pupils2 from "@/assets/aboutbanner24.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Pupils2Blur from "@/assets/pupilsblur.jpg";
import "./hero.css";
import AOS from "aos";
import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);
  return (
    <div className="bg-white pt-14">
      <div
        data-aos="fade-down"
        data-aos-once="true"
        className="max-w-[1200px] w-full mx-auto "
      >
        <h1 className=" text-[#101828] font-Brico text-center mt-[100px] text-[68px] mb-5 ">
          We are Kunda Kids
        </h1>
        <p className=" leading-[30px] text1  text-center mb-20 font-InterReg text-[#667085]">
          Kunda Kids is an award-winning children's publishing and media company
          based in London, UK.
          <br /> Founded in 2020 by Oladele and Louisa Olafuyi, Kunda Kids aims
          to showcase various elements
          <br />
          of African culture in creative, fun, and simple formats for children.
        </p>

        <div
          data-aos="zoom-in"
          data-aos-once="true"
          className="flex  justify-center items-center"
        >
          {/* <img loading="lazy" src={Pupils2} alt="pupils" /> */}
          <LazyLoadImage
            src={Pupils2}
            placeholderSrc={Pupils2Blur}
            effect="blur"
            wrapperClassName="hero-banner-w"
            className="hero-banner-w"
            // width={282}
            // height={428.5}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
