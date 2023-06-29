import Avatar1 from "@/assets/Avatar1.svg";
import Avatar2 from "@/assets/Avatar2.svg";

import { useNavigate } from "react-router-dom";
import GroupIcon from "@/assets/groupIcons.svg";

const SelectProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${GroupIcon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        className="relative h-screen w-full flex justify-center items-center  "
      >
        <div>
          <div className="text-center  font-bold  mb-10 text-black">
            <h1 className="text-[60px] font-Recoleta">Who's Learning?</h1>
            <p className=" font-Hanken">Select which kid is learning now </p>
          </div>
          <div className="flex text-white text-center gap-10 justify-center items-center bg-transparent">
            <p>
              <img
                onClick={() => navigate("/parenthomepage")}
                src={Avatar1}
                alt="avatar"
                className=" cursor-pointer"
              />
              <span className="text-black">Ema</span>
            </p>

            <p>
              <img
                onClick={() => navigate("/parenthomepage")}
                src={Avatar2}
                alt="avatar"
                className=" cursor-pointer"
              />
              <span className="text-black">Mabel</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectProfile;
