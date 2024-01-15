// import Zigzag1 from "@/assets/zizag.svg";
// import OutLineZero from "@/assets/outlineZero.svg";
// import FilledZero from "@/assets/filledZero.svg";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const KundaApp = ({ children }: Props) => {
  return (
    <div className="bg-white shadow-md custom-shadow-bottom relative z-10 mt-[25px]">
      {/* <img loading="lazy" src={Wave2} alt="wave 2" /> */}

      <div className="w-[100%] bg-[#8530C1]  px-[100px]   py-[94px] z-[-1]   ">
        {/* <img
          loading="lazy"
          src={Zigzag1}
          alt=""
          className=" left-60 top-[43%] absolute"
        />
        <img
          src={OutLineZero}
          alt=""
          className=" left-[62%] top-[16%] absolute"
        />
        <img
          src={FilledZero}
          alt=""
          className=" left-[77%] top-[27%] absolute"
        /> */}

        {children}

        {/* <div className="bg-cover bg-center  w-full  helloo h-[300px]  transform rotate-180" style={{ backgroundImage: `url(${Wave2})` }}>
 
      </div> */}
      </div>
    </div>
  );
};

export default KundaApp;
