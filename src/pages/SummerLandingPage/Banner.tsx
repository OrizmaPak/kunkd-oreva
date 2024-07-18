import "react-lazy-load-image-component/src/effects/blur.css";
import "./Banner.css";
import KundaLogo from "@/assets/schoolIcon.svg";

const Banner = () => {
  return (
    <div className=" w-full max-w-[1440px] mb-8 md:mb-28  mt-4 md:mt-16   z-[50] mx-auto px-4">
      <div className="flex justify-between   flex-col lg:flex-row  relative  ">
        <img src={KundaLogo} alt="image" className="effect absolute left-20" />
        <img
          src={KundaLogo}
          alt="image"
          className="effect  absolute bottom-[-10px] right-20"
        />
        <div
          data-aos="fade-right"
          data-aos-once="true"
          className=" hero-text-container pt-8  md:pt-16  w-full md:mb-0 "
        >
          <h1 className=" text-[#101828] md:text-center  text-start font-Brico   header1 w-full header2 ">
            Summer Reading Challenge: <br /> Unleash Your Inner Genius!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
