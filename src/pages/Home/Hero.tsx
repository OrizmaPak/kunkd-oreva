import Ellipse1 from "@/assets/Ellipse 47.svg";
import Ellipse3 from "@/assets/Ellipse 49.svg";
import Ellipse10 from "@/assets/Ellipse 51.svg";
import Ellipse5 from "@/assets/Ellipse 56.svg";
import Ellipse9 from "@/assets/Ellipse 57.svg";
import Ellipse8 from "@/assets/Ellipse 58.svg";
import Ellipse12 from "@/assets/Ellipse 59.svg";
import Ellipse6 from "@/assets/Ellipse 60.svg";
import Ellipse11 from "@/assets/Rectangle 2304.svg";
import Ellipse7 from "@/assets/Video Icon.svg";
import React from "react";
import "./hero.css";

type Props = {
  children?: React.ReactNode;
};

const Hero = ({ children }: Props) => {
  return (
    <div className="w-full bg-[#F9F4FC]">
        {/* <img
          loading="lazy"
          src={Ellipse2}
          alt=""
          className="absolute    top-[0] right-0 "
        /> */}
        {/* <img
          src={Ellipse4}
          alt=""
          className="absolute transform rotate-180 top-[300px] right-[-200px] "
        /> */}
      
      <div className=" w-full max-w-[1440px] bg-[#F9F4FC] h-[879.61px] relative  z-[50] mx-auto">
        <img
          loading="lazy"
          src={Ellipse1}
          alt=""
          className="absolute left-0 "
        />
        {/* <img
          loading="lazy"
          src={Ellipse2}
          alt=""
          className="absolute    top-[0] right-0 "
        /> */}
        <img
          loading="lazy"
          src={Ellipse3}
          alt=""
          className="absolute left-0  bottom-[-100px]"
        />
        {/* <img
          src={Ellipse4}
          alt=""
          className="absolute     bottom-[0px] right-0 "
        /> */}
        <img
          src={Ellipse5}
          alt=""
          className="absolute    top-[80px] left-[10%] "
        />
        <img
          src={Ellipse6}
          alt=""
          className="absolute    top-[80px] left-[30%] "
        />
        <img
          src={Ellipse7}
          alt=""
          className="absolute    top-[80px] left-[82%] "
        />
        <img
          src={Ellipse8}
          alt=""
          className="absolute    top-[150px] left-[90%] "
        />
        <img
          src={Ellipse9}
          alt=""
          className="absolute    top-[400px] left-[92%] "
        />
        <img
          src={Ellipse10}
          alt=""
          className="absolute    bottom-[0]  right-[140px] ellipse-w   "
        />
        <img
          src={Ellipse11}
          alt=""
          className="absolute    bottom-[0]  ellipse11-w  right-[220px] z-10"
        />
        <img
          src={Ellipse12}
          alt=""
          className="absolute    bottom-[300px] left-[40%] "
        />
        <div></div>
        {children}
      </div>
    </div>
  );
};

export default Hero;
