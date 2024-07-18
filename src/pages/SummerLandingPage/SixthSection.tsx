import WebAppCard from "@/assets/webappCard.png";
import MobileAppCard from "@/assets/mobileappCard.png";
import { HiExternalLink } from "react-icons/hi";
import AppleStore from "../Home/AppleStore";
import GooglePlay from "../Home/GooglePlay";
import Laugh01 from "@/assets/laugh01.png";
import Laugh02 from "@/assets/laugh02.png";
import "./ThirdSection.css";

type TWebMobiledata = {
  image: string;
  message: string;
  title: string;
  url: string;
};

const SixthSection = () => {
  const baseUrl = window.location.origin;
  const data = [
    {
      message:
        "Sign Up on the web app as a parent or log in to your existing account",
      title: "Web App",
      image: WebAppCard,
      url: `${baseUrl}/signup`,
    },
    {
      message:
        "Download our mobile app on Appstore, Playstore and Amazon to join the summer challenge",
      title: "Mobile App",
      image: MobileAppCard,
      url: "https://play.google.com/store/apps/details?id=com.lhamycodes.kundakids",
    },
  ];
  return (
    <div className=" pad-y-96 pad-x-10 relative ">
      <img
        src={Laugh01}
        alt="image"
        className="absolute right-[10%]  -rotate-12 top-[200px] earth"
      />
      <img
        src={Laugh02}
        alt="image"
        className="absolute left-[10%]  rotate-12  earth "
      />

      <div className="max-w-[1440px] mx-auto">
        <p className="text-[#8530C1]  font-semibold text-center text20">
          Our Apps
        </p>
        <p className="header1 font-Inter text-center">
          Don't miss out on the fun!
        </p>

        <div className="flex md:flex-row flex-col justify-between mt-8 md:mt-20 gap-8 md:gap-20   px-10">
          {data?.map((data: TWebMobiledata, index: number) => {
            return <Card key={index} data={data} />;
          })}
        </div>

        <div className=" flex md:flex-row flex-col items-center justify-center  gap-8 my-10">
          <AppleStore sizes />
          <GooglePlay sizes />
        </div>
      </div>
    </div>
  );
};

export default SixthSection;

const Card = ({ data }: { data: TWebMobiledata }) => {
  const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
  return (
    <>
      <div className=" w-full">
        <div>
          <img src={data?.image} alt="image" className="w-full" />
        </div>
        <div className=" mt-4 md:mt-10">
          <button
            onClick={() => {
              openInNewTab(`${data?.url}`);
            }}
            className="text30 font-Inter  flex  items-center gap-2"
          >
            {data?.title} <HiExternalLink color="black" size={30} />
          </button>
          <p className="text20 font-InterReg">{data?.message}</p>
        </div>
      </div>
    </>
  );
};
