import Camera from "@/assets/camera.png";
import Bicycle from "@/assets/bicycle.png";
import AmazonIpad from "@/assets/amazonIpad.png";
import "./ThirdSection.css";
import Earth from "@/assets/earth.png";

const ThirdSection = () => {
  return (
    <div className=" pad-y-96 pad-x-10 relative ">
      <img
        src={Earth}
        alt="image"
        className=" left-[10%] top- md:top-0 absolute earth"
      />
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[#8530C1] text20 font-semibold text-center">
          Prizes to be won
        </p>
        <p className="header2 font-Inter text-center">
          Join the Summer Challenge and Win{" "}
          <strong className="text-[#8530C1]"> Amazing Prizes </strong>
        </p>

        <div className="flex md:flex-row flex-col justify-between mt-8 md:mt-20 gap-8 md:gap-0 px-10">
          <img src={Camera} alt="image" className="gift-card" />
          <img src={Bicycle} alt="image" className="gift-card" />
          <img src={AmazonIpad} alt="image" className="gift-card" />
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
