import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/KundaLogo.svg";
import Button from "@/components/Button";

const Header = () => {
  return (
    <div className="flex font-[500] py-4 text-[16px] px-[120px] justify-between items-center bg-white z-50">
      <Link to="/">
        <div>
          <img src={Logo} alt="logo" width="155.91px" height="35pxs" />
        </div>
      </Link>
      <div className="w-[800px] rounded-3xl border border-gray-400 bg-white">
        <input type="text" className="w-full h-full py-4" />
      </div>

      <div className="flex items-center justify-center pl-2 gap-8">
        <Link to="login">
          <span className="text-[#8530C1] cursor-pointer">Login</span>
        </Link>
        <Button size="md">Enroll</Button>
      </div>
    </div>
  );
};

export default Header;
