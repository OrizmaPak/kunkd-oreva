import Logo from "@/assets/KundaLogo.svg";
import facebook from "@/assets/facebook.svg";
import insta from "@/assets/insta.svg";
import twitter from "@/assets/twitter.svg";
import GooglePlay from "@/pages/Home/GooglePlay";
import AppleStore from "@/pages/Home/AppleStore";

const HomeFooter = () => {
  return (
    <div className="py-8 px-16 ">
      <div className="flex items-center justify-between">
        <div>
          <img loading="lazy" src={Logo} alt="Logo" />
        </div>
        <div className="w-[348px] flex justify-between items-center ">
          <span className="cursor-pointer">Private Policy</span>
          <span className="cursor-pointer">Term of Use</span>
          <span className="cursor-pointer">Cookies Policy</span>
        </div>
        <div className="flex items-center justify-between w-[150px] cursor-pointer">
          <span>
            <img
              loading="lazy"
              src={facebook}
              alt="facebookLogo cursor-pointer"
            />
          </span>
          <span>
            <img loading="lazy" src={insta} alt="instaLogo cursor-pointer" />
          </span>
          <span>
            <img
              loading="lazy"
              src={twitter}
              alt="twitterLogo cursor-pointer"
            />
          </span>
        </div>
      </div>

      <hr className="my-6 " />

      <div className="flex justify-between items-center">
        <div>
          <p> &copy; Copyright 2023 Kunda Kids, All rights reserved.</p>
        </div>
        <div className=" flex justify-between items-center ">
          <span className="ml-4 font-bold">Download Our App</span>
          <span className="ml-4 cursor-pointer">
            <GooglePlay />
          </span>
          <span className="ml-4 cursor-pointer">
            <AppleStore />{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
