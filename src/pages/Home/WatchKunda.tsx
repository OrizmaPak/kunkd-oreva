import LineGruoped from "@/assets/linegrouped.svg";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const WatchKunda = ({ children }: Props) => {
  return (
    <div className=" relative">
      {/* <div className="bg-cover bg-center  w-full  matt h-[100px] " style={{ backgroundImage: `url(${Wave1})` }}> */}

      {/* </div> */}
      <img
        src={LineGruoped}
        alt=""
        className="left-0 bottom-[20%] absolute transform rotate-180 w-[50px] h-[50px] "
      />
      <div className=" w-full bg-white relative ">{children}</div>
    </div>
  );
};

export default WatchKunda;
