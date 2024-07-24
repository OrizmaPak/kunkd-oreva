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
      message: "Sign up or simply login if you already have an account.",
      title: "Web App",
      image: WebAppCard,
      url: `${baseUrl}/signup`,
    },
    {
      message: "Download the mobile app on Appstore, Play Store and Amazon.",
      title: "Mobile App",
      image: MobileAppCard,
      url: "https://play.google.com/store/apps/details?id=com.lhamycodes.kundakids",
    },
  ];
  return (
    <div className=" md:mt-28 pad-x-10 relative ">
      <img
        src={Laugh01}
        alt="image"
        className="absolute right-[10%]  -rotate-12 top-[50px]  md:top-[200px] earth"
      />
      <img
        src={Laugh02}
        alt="image"
        className="absolute left-[10%]  rotate-12 top-[80px] earth "
      />

      <div className="max-w-[1440px] mx-auto">
        <p className="header-1 font-Inter text-center">
          Available on Web and Mobile
        </p>

        <div className="flex md:flex-row flex-col justify-between mt-8 md:mt-20 gap-8 md:gap-20   px-10">
          {data?.map((data: TWebMobiledata, index: number) => {
            return <Card key={index} data={data} />;
          })}
        </div>
        <div className="bg-[#8530C1] py-6 md:py-[64px] px-[80px]  rounded-3xl my-16">
          <p className="text-center font-Inter text30 text-white">
            Download the app for free!
          </p>
          <p className="text-center text-white font-InterReg text20 ">
            Remember, you’ll need an active subscription to finish the
            challenge.
          </p>
          <div className=" flex md:flex-row flex-col items-center justify-center  gap-3 md:gap-8  my-4 md:my-10">
            <AppleStore sizes />
            <GooglePlay sizes />
          </div>
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
            className="text25 font-Inter  flex  items-center gap-2"
          >
            {data?.title} <HiExternalLink color="black" size={25} />
          </button>
          <p className="text20 font-InterReg">{data?.message}</p>
        </div>
      </div>
    </>
  );
};
