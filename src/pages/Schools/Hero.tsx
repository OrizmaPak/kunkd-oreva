import React from "react";
import SchHero1 from "@/assets/schhero1.svg";
import SchHero2 from "@/assets/schhero2.svg";
import SchHero3 from "@/assets/schhero3.svg";

import Button from "@/components/Button";
const Hero = () => {
  return (
    <div className="bg-[rgba(237,28,36,0.06);] pt-14">
      <div className="max-w-[1000px] w-full mx-auto ">
        <h1 className="font-bold font-Recoleta text-center text-[40px]">
          Empowering Literacy Education
        </h1>
        <p className=" leading-8  text-center">
          Embark on a reading adventure with Kunda Kids and empower your child's
          literacy journey.
          <br /> Join us today and unlock the boundless possibilities of
          literacy.
        </p>
        <p className="flex justify-center items-center mt-4">
          <Button size="md">Get Stated</Button>
        </p>

        <div className="flex ">
          <div>
            <img src={SchHero1} alt="girl" />
          </div>
          <div className="mt-[100px]">
            <img src={SchHero2} alt="girl" />
          </div>
          <div>
            <img src={SchHero3} alt="girl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
