import Logo from "@/assets/KundaLogo.svg";
import facebook from "@/assets/facebook.svg";
import insta from "@/assets/insta.svg";
import twitter from "@/assets/twitter.svg";
import GooglePlay from "@/pages/Home/GooglePlay";
import AppleStore from "@/pages/Home/AppleStore";
import "./homefooter.css";

const HomeFooter = () => {
  const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
  return (
    <div className="py-14 pad-x-40 home-footer-w mx-auto ">
      <div className="flex items-center justify-between">
        <div>
          <img loading="lazy" src={Logo} alt="Logo" />
        </div>
        <div className="w-[540px] flex justify-between items-center text3  font-medium ">
          <button className="cursor-pointer">About Us</button>
          <button
            onClick={() => {
              openInNewTab("https://kundakids.com/en-ng/blogs/news");
            }}
            className="cursor-pointer font-medium"
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
              openInNewTab(" https://kundakids.com/policies/terms-of-service");
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

      <hr className="my-10" />

      <div className="flex justify-between items-center text3 font-semibold">
        <div>
          <p> &copy; Copyright 2023 Kunda Kids, All rights reserved.</p>
        </div>
        <div className=" flex justify-between items-center ">
          <span className="ml-4 font-bold">Download Our App</span>
          <span className="ml-4 cursor-pointer ">
            <GooglePlay />
          </span>
          <span className="ml-4 cursor-pointer">
            <AppleStore />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
