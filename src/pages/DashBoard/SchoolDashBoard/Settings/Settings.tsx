import { useState } from "react";
import Profile from "./Profile";

const Settings = () => {
  const [active, setActive] = useState("1");
  return (
    <>
      <div>
        <p className=" font-Inter  text-[28px] ">Settings</p>
        <p className="text-[12px] text-[#667185]">
          Take a look at your policies and the new policy to see what is covered
        </p>

        <div className="grid w-[250px] grid-cols-3 h-[40px]  rounded-xl items-center  ">
          <button
            onClick={() => setActive("1")}
            className={`h-full  w-full rounded-l-xl border-t-[2px] border-b-[2px] text-[14px] font-Inter border-[#E4E7EC] text-center py-[10px] px-[16px] border-l-[2px] ${
              active == "1"
                ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                : "bg-white border-[#E4E7EC] text-[#667185]"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActive("2")}
            className={`h-full  w-full  border-[2px]  text-[14px] font-Inter border-[#E4E7EC] text-center py-[10px] px-[16px]  ${
              active == "2"
                ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                : "bg-white border-[#E4E7EC] text-[#667185]"
            }`}
          >
            Billing
          </button>
          <button
            onClick={() => setActive("3")}
            className={`h-full  w-full rounded-r-xl text-center py-[10px]  text-[14px] font-Inter border-t-[2px] border-b-[2px]  border-r-[2px] ${
              active == "3"
                ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                : "bg-white border-[#E4E7EC] text-[#667185]"
            }`}
          >
            Password
          </button>
        </div>
      </div>
      <div className="mt-4 bg-white rounded-2xl p-5">
        <Profile />
      </div>
    </>
  );
};

export default Settings;
