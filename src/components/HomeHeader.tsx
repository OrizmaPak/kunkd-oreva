import KundaLogo from "@/assets/schoolIcon.svg";
import { NavLink } from "react-router-dom";
import "./homeheader.css";

const HomeHeader = () => {
  // const navigate = useNavigate();
   const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
https://kundakids.com/en-ng
  return (
    <div className=" w-[100%] bg-white px-8 fixed z-[100] flex justify-center items-center">
      <div className="flex home-header-w font-[500] py-2 text2  justify-between items-center bg-white   ">
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

        <div className="flex justify-between cursor-pointer pl-2 w-[565px]">
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
          to="#"
           onClick={()=>openInNewTab("https://kundakids.com/en-ng")}
            className={({ isActive }) =>
              isActive ? " text-black" : "text-black"
            }
          >
            <span>Animation</span>
          </NavLink>
          <NavLink
            to="#"
             onClick={()=>openInNewTab("https://kundakids.com/en-ng")}
            className={({ isActive }) =>
              isActive ? " text-black" : "text-black"
            }
          >
            <span>Publishing</span>
          </NavLink>
          <NavLink
            to="#"
             onClick={()=>openInNewTab("https://kundakids.com/en-ng")}
            className={({ isActive }) =>
              isActive ? " text-black" : "text-black"
            }
          >
            <span>Shop</span>
          </NavLink>

          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive ? " text-[#8530C1]" : "text-black"
            }
          >
            <span>About Us</span>
          </NavLink>
          {/* <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? " text-[#8530C1]" : "text-black"
            }
          >
            <span>Shop</span>
          </NavLink> */}
        </div>

        <div className="flex items-center justify-center pl-2 gap-8">
          {/* <NavLink to="login">
            <span className="text-[#8530C1] cursor-pointer">Login</span>
          </NavLink>
          <Button  onClick={() => navigate("/signup")} size="md">
            Enroll
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
