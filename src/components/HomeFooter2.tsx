import Logo from "@/assets/KundaLogo.svg";
import facebook from "@/assets/facebook.svg";
import insta from "@/assets/insta.svg";
import twitter from "@/assets/twitter.svg";
import AppleStore from "@/pages/Home/AppleStore";
import GooglePlay from "@/pages/Home/GooglePlay";
import { useNavigate } from "react-router-dom";
import "./HomeFooter2.css";

const HomeFooter2 = () => {
  const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
  const navigate = useNavigate();
  return (
    <div className="py-14  max-w-[1440px] w-full px-8 mx-auto ">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="max-w-[500px]">
          <img loading="lazy" src={Logo} alt="Logo" />
          <p className=" text-justify my-5 text1 text-[#667085] font-InterReg">
            Kunda Kids is an award-winning children's publishing, ed-tech and
            media company. Our mission is to enliven early learning with fun
            stories that foster literacy, bolster self-esteem and celebrate
            Africa's rich history and diverse culture.
          </p>
          <div className="  flex justify-between items-center text3  font-bold font-Inter text-[#667085] ">
            <button
              onClick={() => navigate("/aboutus")}
              className="cursor-pointer text1 text1"
            >
              About Us
            </button>
            <button
              onClick={() => {
                openInNewTab("https://kundakids.com/en-ng/blogs/news");
              }}
              className="cursor-pointer text1 "
            >
              News
            </button>
            <button
              onClick={() => {
                openInNewTab(
                  "https://kundakids.com/en-ng/policies/privacy-policy"
                );
              }}
              className="cursor-pointer text1"
            >
              Private Policy
            </button>
            <button
              onClick={() => {
                openInNewTab(
                  " https://kundakids.com/policies/terms-of-service"
                );
              }}
              className="cursor-pointer text1"
            >
              Term of Use
            </button>
          </div>
        </div>

        <div>
          <div className=" flex justify-between md:items-center  flex-col gap-4 mt-8 md:mt-0 ">
            <span className=" text-[#8530C1] font-medium">Get the App</span>
            <span className="md:ml-4 cursor-pointer ">
              <GooglePlay />
            </span>
            <span className="md:ml-4 cursor-pointer">
              <AppleStore />
            </span>
          </div>
        </div>
      </div>

      <hr className="my-10" />

      <div className="flex justify-between items-center gap- text3 font-semibold">
        <div>
          <p className="text-[#98A2B3] text1">
            {" "}
            &copy; Copyright 2023 Kunda Kids, All rights reserved.
          </p>
        </div>

        <div className="flex items-center justify-between w-[150px] cursor-pointer">
          <button
            onClick={() => {
              openInNewTab("https://m.facebook.com/kundakids/");
            }}
          >
            <img
              loading="lazy"
              src={facebook}
              alt="facebooklogo"
              className="facebookLogo cursor-pointer  w-[20px]"
            />
          </button>
          <button
            onClick={() => {
              openInNewTab(
                " https://instagram.com/kundakids?igshid=NzZlODBkYWE4Ng=="
              );
            }}
          >
            <img
              loading="lazy"
              src={insta}
              alt="instalogo"
              className="instaLogo cursor-pointe  w-[24px]r"
            />
          </button>
          <button
            onClick={() => {
              openInNewTab(" https://twitter.com/kundakids?lang=en");
            }}
          >
            <img
              loading="lazy"
              src={twitter}
              alt="twitterlogo"
              className="twitterLogo cursor-pointer w-[24px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter2;
