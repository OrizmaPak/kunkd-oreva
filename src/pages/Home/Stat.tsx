import React from "react";
import Wave1 from "@/assets/wave1.svg";
import Six from "@/assets/six.svg";
import Ellipse3 from "@/assets/Ellipse 49.svg";

type Props = {
  children?: React.ReactNode;
};
const WaveCard = ({ children }: Props) => {
  return (
    <div className="mt-[-250px] relative ">
      <img
        src={Six}
        alt=""
        className="absolute    top-[22%] left-[7%] z-[100] "
      />
      <img
        loading="lazy"
        src={Ellipse3}
        alt=""
        className="absolute left-[-200px] rotate-360 top-[-20%]"
      />
      <div
        className="bg-cover bg-center  w-full h-52   matt  "
        style={{ backgroundImage: `url(${Wave1})` }}
      ></div>
      <div className=" w-full bg-white">{children}</div>
    </div>
  );
};

export default WaveCard;
