import AppleStore from "../Home/AppleStore";
import GooglePlay from "../Home/GooglePlay";
import IphoneMac from "@/assets/IphoneMax.png";
import Laugh01 from "@/assets/laugh01.png";
import Laugh02 from "@/assets/laugh02.png";
import "./Download.css";

const Download = () => {
  return (
    <div className="bg-[#8530C1] pad-y-96 pad-x-40 relative">
      <img
        src={Laugh02}
        alt="image"
        className=" absolute top-[-90px] left-40 hidden md:block"
      />
      <img
        src={Laugh01}
        alt="image"
        className=" absolute top-[-90px]  right-40 hidden md:block "
      />
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row    justify-center items-center gap-20">
        <div>
          <p className="text30 font-medium text-center">Download for Free</p>
          <p className="text1 font-medium">
            Available on all devices. All platforms.
          </p>
          <div className="flex flex-col md:flex-row  justify-center items-center  gap-4 mt-8  w-full">
            <AppleStore sizes />
            <GooglePlay sizes />
          </div>
        </div>
        <div className=" flex justify-center items-center  pl-5 md:pl-0">
          <img
            src={IphoneMac}
            alt="image"
            className="iphone-mac border-2 border-gray-500 inline"
          />
        </div>
      </div>
    </div>
  );
};

export default Download;
