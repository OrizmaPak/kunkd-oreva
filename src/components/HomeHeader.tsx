import Button from "./Button";
import Logo from "@/assets/KundaLogo.svg";
import { Link } from "react-router-dom";
const HomeHeader = () => {
  return (
    <div className="flex font-[500] py-4 text-[16px] px-[120px] justify-between items-center bg-white z-50">
      <Link to="/">
        <div>
          <img src={Logo} alt="logo" width="155.91px" height="35pxs" />
        </div>
      </Link>

      <div className="flex justify-between cursor-pointer pl-2 w-[517px]">
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/parents">
          <span>Parents</span>
        </Link>

        <span>Schools</span>
        <span>About Us</span>
        <span>Shop</span>
        <span>| EN </span>
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

export default HomeHeader;
