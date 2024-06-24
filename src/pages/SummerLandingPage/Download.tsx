import AppleStore from "../Home/AppleStore";
import GooglePlay from "../Home/GooglePlay";
import IphoneMac from "@/assets/IphoneMax.png";
import "./Download.css";

const Download = () => {
  return (
    <div className="bg-[#FBC70D] pad-y-96 pad-x-40">
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
