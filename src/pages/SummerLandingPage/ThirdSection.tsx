import Camera from "@/assets/camera.png";
import Bicycle from "@/assets/bicycle.png";
import AmazonIpad from "@/assets/amazonIpad.png";
import "./ThirdSection.css";
import Earth from "@/assets/earth.png";
import Button from "@/components/Button";
import AppleStore from "../Home/AppleStore";
import GooglePlay from "../Home/GooglePlay";
import { useNavigate } from "react-router-dom";

const ThirdSection = () => {
  const navigate = useNavigate();
  return (
    <div className=" pad-y-96 pad-x-10 relative mt-8 ">
      <img
        src={Earth}
        alt="image"
        className=" left-[10%] top- md:top-0 absolute earth"
      />
      <div className="max-w-[1440px] mx-auto">
        <p className="header-1 font-Inter text-center">
          Amazing <strong className="text-[#8530C1]"> Prizes </strong>To Be Won
        </p>

        <div className="flex md:flex-row flex-col justify-between mt-8 md:mt-20 gap-8 md:gap-0 px-10">
          <img src={Camera} alt="image" className="gift-card" />
          <img src={Bicycle} alt="image" className="gift-card" />
          <img src={AmazonIpad} alt="image" className="gift-card" />
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <Button
          onClick={() => navigate("/signup")}
          size="md"
          className="hidden md:block "
        >
          Sign Up Now
        </Button>
        <div className=" flex flex-col md:hidden   items-center justify-center  gap-4 my-3">
          <AppleStore sizes />
          <GooglePlay sizes />
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
