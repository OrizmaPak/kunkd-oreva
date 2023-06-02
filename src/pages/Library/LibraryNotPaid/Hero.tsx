import React from "react";
import Banner from "@/assets/Banner4.svg";

const Hero = ({ image }: { image: string }) => {
  return (
    <div className="">
      <img src={image} alt="banner " className="rou rounded-t-[20px] w-full" />
    </div>
  );
};

export default Hero;
