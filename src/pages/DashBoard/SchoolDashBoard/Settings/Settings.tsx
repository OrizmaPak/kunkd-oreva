import { useState } from "react";
import Profile from "./Profile";
import Billing from "./Billing";
import Password from "./Password";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";

const Settings = () => {
  const [active, setActive] = useState("1");
  const [user] = useStore(getUserState);
  const isTeacher = user?.role?.toLowerCase() === "teacher";

  return (
    <>
      <div>
        <p className=" font-Inter  text-[28px] ">Settings</p>
        <p className="text-[12px] text-[#667185] mb-5 ">
          Take a look at your policies and the new policy to see what is covered
        </p>

        <div className={`grid ${isTeacher ? "w-[170px] grid-cols-2" : user?.role?.toLowerCase() === "user" ? "w-[330px] grid-cols-4" : "w-[250px] grid-cols-3"} h-[40px] rounded-xl items-center`}>
          <button
            onClick={() => setActive("1")}
            className={`h-full w-full ${isTeacher ? "rounded-l-xl" : ""} border-t-[2px] border-b-[2px] text-[14px] font-Inter border-[#E4E7EC] text-center py-[10px] px-[16px] border-l-[2px] ${
              active == "1"
                ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                : "bg-white border-[#E4E7EC] text-[#667185]"
            }`}
          >
            Profile
          </button>
          {!isTeacher && (
            <button
              onClick={() => setActive("2")}
              className={`h-full w-full border-[2px] text-[14px] font-Inter border-[#E4E7EC] text-center py-[10px] px-[16px] ${
                active == "2"
                  ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                  : "bg-white border-[#E4E7EC] text-[#667185]"
              }`}
            >
              Billing
            </button>
          )}
          <button
            onClick={() => setActive("3")}
            className={`h-full w-full ${isTeacher ? "rounded-r-xl" : ""} text-center py-[10px] text-[14px] font-Inter border-t-[2px] border-b-[2px] border-r-[2px] ${
              active == "3"
                ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                : "bg-white border-[#E4E7EC] text-[#667185]"
            }`}
          >
            Password
          </button>
          {user?.role?.toLowerCase() === "user" && (
            <button
              onClick={() => setActive("4")}
              className={`h-full w-full rounded-r-xl text-center py-[10px] text-[14px] font-Inter border-t-[2px] border-b-[2px] border-r-[2px] ${
                active == "4"
                  ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                  : "bg-white border-[#E4E7EC] text-[#667185]"
              }`}
            >
              My Kids
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 bg-white rounded-2xl p-5">
        {active == "1" && <Profile />}
        {!isTeacher && active == "2" && <Billing />}
        {active == "3" && <Password />}
        {user?.role?.toLowerCase() === "user" && active == "4" && <div>My Kids Content</div>}
      </div>
    </>
  );
};

export default Settings;
