import Button from "./Button";
import KundaLogo from "@/assets/schoolIcon.svg";
import { NavLink, useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex font-[500] py-2 text-[16px] px-[120px] justify-between items-center bg-white  fixed w-full z-[100]">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "" : "text-black")}
      >
        <div>
          <img
            src={KundaLogo}
            alt="logo"
            width="45.91px"
            height="35pxs"
            className="min-w-[45.91px]"
          />
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
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? " text-[#8530C1]" : "text-black"
          }
        >
          <span>Visit Store</span>
        </NavLink>
        <span>| EN </span>
      </div>

      <div className="flex items-center justify-center pl-2 gap-8">
        <NavLink to="login">
          <span className="text-[#8530C1] cursor-pointer">Login</span>
        </NavLink>
        <Button onClick={() => navigate("/signup")} size="md">
          Enroll
        </Button>
      </div>
    </div>
  );
};

export default HomeHeader;
