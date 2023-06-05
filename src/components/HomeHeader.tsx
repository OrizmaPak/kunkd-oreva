import Button from "./Button";
import Logo from "@/assets/KundaLogo.svg";
import { NavLink } from "react-router-dom";

const HomeHeader = () => {
  const activeLinkStyle = {
    fontWeight: "bold",
    color: "#8530C1",
  };

  return (
    <div className="flex font-[500] py-4 text-[16px] px-[120px] justify-between items-center bg-white z-50">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "" : "text-black")}
      >
        <div>
          <img src={Logo} alt="logo" width="155.91px" height="35pxs" />
        </div>
      </NavLink>

      <div className="flex justify-between cursor-pointer pl-2 w-[517px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? " text-[#8530C1]" : "text-black"
          }
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/parents"
          className={({ isActive }) =>
            isActive ? " text-[#8530C1]" : "text-black"
          }
        >
          <span>Parents</span>
        </NavLink>
        <NavLink
          to="/schools"
          className={({ isActive }) =>
            isActive ? " text-[#8530C1]" : "text-black"
          }
        >
          <span>Schools</span>
        </NavLink>
        <NavLink
          to="/aboutus"
          className={({ isActive }) =>
            isActive ? " text-[#8530C1]" : "text-black"
          }
        >
          <span>About Us</span>
        </NavLink>
        <span>Shop</span>
        <span>| EN </span>
      </div>

      <div className="flex items-center justify-center pl-2 gap-8">
        <NavLink to="login">
          <span className="text-[#8530C1] cursor-pointer">Login</span>
        </NavLink>
        <Button size="md">Enroll</Button>
      </div>
    </div>
  );
};

export default HomeHeader;
