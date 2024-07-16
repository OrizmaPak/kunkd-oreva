import Dell01 from "@/assets/dell01.png";
import Spark01 from "@/assets/spark01.png";
import { useNavigate } from "react-router-dom";
import Laugh01 from "@/assets/laugh01.png";
import Laugh02 from "@/assets/laugh02.png";
import AppleStore from "../Home/AppleStore";
import GooglePlay from "../Home/GooglePlay";
const Existing = () => {
  const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
  const navigate = useNavigate();

  return (
    <div className="bg-[#FBC70D] pad-y-96 pad-x-40 relative">
      <img
        src={Laugh02}
        alt="image"
        className=" absolute bottom-[90px] bo left-40 hidden md:block"
      />
      <img
        src={Laugh01}
        alt="image"
        className=" absolute bottom-[90px]  right-40 hidden md:block "
      />
      <div>
        <p className="text-center header2 font-medium font-Inter">
          Don't miss out on the fun!
        </p>

        <div
          onClick={() => navigate("/signup")}
          className="grid md:grid-cols-2   grid-cols-1 gap-10 px-4 mt-8 max-w-[1000px]  mx-auto  cursor-pointer"
        >
          <div className="bg-[rgba(255,224,143,0.7)] flex justify-center items-center flex-col  rounded-2xl p-3 py-4">
            <img src={Dell01} alt="" />
            <p className="text25 font-Inter font-bold text-center ">Web App</p>
            <p className="text-center  font-InterReg">
              Sign Up on the web app as a parent or log in to your existing
              account
            </p>
          </div>
          <div
            onClick={() => {
              openInNewTab(
                "https://play.google.com/store/apps/details?id=com.lhamycodes.kundakids"
              );
            }}
            className="bg-[rgba(255,224,143,0.7)] flex justify-center items-center flex-col rounded-2xl gap-8 p-3 py-4 cursor-pointer"
          >
            <img src={Spark01} alt="" />
            <div>
              <p className="text25 font-Inter text-center font-bold">
                Mobile App
              </p>
              <p className="text-center font-InterReg">
                Download the Kunda Kids mobile app on Appstore, Playstore and
                Amazon to join the summer challenge
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  justify-center items-center  gap-4 mt-20  w-full">
          <AppleStore sizes />
          <GooglePlay sizes />
        </div>
      </div>
    </div>
  );
};

export default Existing;
