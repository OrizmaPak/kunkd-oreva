// import Ellipse1 from "@/assets/Ellipse 47.svg";
// import Ellipse3 from "@/assets/Ellipse 49.svg";
// import Ellipse5 from "@/assets/Ellipse 56.svg";
// import Ellipse9 from "@/assets/Ellipse 57.svg";
// import Ellipse8 from "@/assets/Ellipse 58.svg";
// import Ellipse12 from "@/assets/Ellipse 59.svg";
// import Ellipse6 from "@/assets/Ellipse 60.svg";
// import Ellipse7 from "@/assets/Video Icon.svg";
import React from "react";
import "./ParentHero.css";

type Props = {
  children?: React.ReactNode;
};

const Hero = ({ children }: Props) => {
  return (
    <div className="w-full   md:pt-[120px]  ">
      <div className=" w-full max-w-[1440px]  md:h-[679.61px] z-[50] mx-auto px-4  ">
        {/* <img
          loading="lazy"
          src={Ellipse1}
          alt=""
          className="absolute left-0 "
        /> */}
        {/* <img
          loading="lazy"
          src={Ellipse2}
          alt=""
          className="absolute    top-[0] right-0 "
        /> */}
        {/* <img
          loading="lazy"
          src={Ellipse3}
          alt=""
          className="absolute left-0  bottom-[-100px] -z-50"
        /> */}
        {/* <img
          src={Ellipse4}
          alt=""
          className="absolute     bottom-[-100px] right-0 "
        /> */}
        {/* <img
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
        /> */}
        {/* <img
          src={Ellipse10}
          alt=""
          className="absolute  w-[800px]  bottom-[20px]  right-[10px]   "
        /> */}
        {/* <img
          src={Ellipse11}
          alt=""
          className="absolute    bottom-[0]  ellipse11-w  right-[220px] z-10"
        /> */}
        {/* <img
          src={Ellipse12}
          alt=""
          className="absolute    bottom-[300px] left-[40%] "
        /> */}
        {children}
      </div>
    </div>
  );
};

export default Hero;
