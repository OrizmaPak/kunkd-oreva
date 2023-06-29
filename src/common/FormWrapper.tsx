import Ellipse59 from "@/assets/Ellipse 59.svg";
import Ellipse57 from "@/assets/Ellipse 57.svg";
import Zag4 from "@/assets/zag3.svg";
import Zag5 from "@/assets/zag4.svg";
import RoundGreen from "@/assets/roundgreen.svg";
import Star from "@/assets/star.svg";
import SixGreen from "@/assets/sixgreen.svg";
import RoundYellow from "@/assets/roundyellow.svg";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const FormWrapper = ({ children }: Props) => {
  return (
    <div className="py-20 px-14 bg-white relative h-screen w-[100%]">
      <img src={Ellipse59} alt="Ellipse" className="absolute top-40 left-20" />
      <img
        src={RoundYellow}
        alt="Ellipse"
        className="absolute top-20 right-60"
      />
      <img src={Ellipse57} alt="Ellipse" className="absolute top-96 right-16" />
      <img src={Zag4} alt="Ellipse" className="absolute top-48 right-32" />
      <img src={Zag5} alt="Ellipse" className="absolute bottom-12 right-32" />
      <img
        src={RoundGreen}
        alt="Ellipse"
        className="absolute bottom-4 left-96"
      />
      <img src={Star} alt="Ellipse" className="absolute bottom-16 left-32" />
      <img
        src={SixGreen}
        alt="Ellipse"
        className="absolute bottom-96 left-16"
      />

      {children}
    </div>
  );
};

export default FormWrapper;
