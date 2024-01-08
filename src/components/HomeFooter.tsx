import Logo from "@/assets/KundaLogo.svg";
import facebook from "@/assets/facebook.svg";
import insta from "@/assets/insta.svg";
import twitter from "@/assets/twitter.svg";
import AppleStore from "@/pages/Home/AppleStore";
import GooglePlay from "@/pages/Home/GooglePlay";
import { useNavigate } from "react-router-dom";
import "./homefooter.css";

const HomeFooter = () => {
  const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
  const navigate = useNavigate();
  return (
    <div className="py-14  max-w-[1440px] w-full px-8 mx-auto ">
      <div className="flex items-center justify-between">
        <div className="max-w-[500px]">
          <img loading="lazy" src={Logo} alt="Logo" />
          <p className=" text-justify my-5 text-[16px] text-[#667085] font-Inter">
            Kunda Kids is an award-winning children's publishing, ed-tech and
            media company. Our mission is to enliven early learning with fun
            stories that foster literacy, bolster self-esteem and celebrate
            Africa's rich history and diverse culture.
          </p>
          <div className="w-[540px] flex justify-between items-center text3  font-bold font-Inter text-[#667085] ">
            <button
              onClick={() => navigate("/aboutus")}
              className="cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => {
                openInNewTab("https://kundakids.com/en-ng/blogs/news");
              }}
              className="cursor-pointer "
            >
              Blog
            </button>
            <button
              onClick={() => {
                openInNewTab(
                  "https://kundakids.com/en-ng/policies/privacy-policy"
                );
              }}
              className="cursor-pointer"
            >
              Private Policy
            </button>
            <button
              onClick={() => {
                openInNewTab(
                  " https://kundakids.com/policies/terms-of-service"
                );
              }}
              className="cursor-pointer"
            >
              Term of Use
            </button>
            <button
              onClick={() => {
                openInNewTab("");
              }}
              className="cursor-pointer"
            >
              Cookies Policy
            </button>
          </div>
        </div>

        <div>
          <div className=" flex justify-between items-center  flex-col gap-4">
            <span className=" text-[#8530C1] font-medium">Get the App</span>
            <span className="ml-4 cursor-pointer ">
              <GooglePlay />
            </span>
            <span className="ml-4 cursor-pointer">
              <AppleStore />
            </span>
          </div>
        </div>
      </div>

      <hr className="my-10" />

      <div className="flex justify-between items-center text3 font-semibold">
        <div>
          <p className="text-[#98A2B3]">
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
              alt="facebookLogo cursor-pointer"
            />
          </button>
          <button
            onClick={() => {
              openInNewTab(
                " https://instagram.com/kundakids?igshid=NzZlODBkYWE4Ng=="
              );
            }}
          >
            <img loading="lazy" src={insta} alt="instaLogo cursor-pointer" />
          </button>
          <button
            onClick={() => {
              openInNewTab(" https://twitter.com/kundakids?lang=en");
            }}
          >
            <img
              loading="lazy"
              src={twitter}
              alt="twitterLogo cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
