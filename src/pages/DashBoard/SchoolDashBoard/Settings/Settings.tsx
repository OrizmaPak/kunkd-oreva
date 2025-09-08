import { useState } from "react";
import Profile from "./Profile";
import Billing from "./Billing";
import Password from "./Password";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";
import MyKids from "./MyKids";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("1");
  const [user] = useStore(getUserState);
  const isTeacher = user?.role?.toLowerCase() === "teacher";

  // Add Child Profile button click — wire to whatever route you use for creating a child profile.
  const handleAddChild = () => {
    // If you already have a route, update this path:
    // e.g. navigate("/after-parent-sign-in/create-child")
    // For now we just navigate to the profile setup page if present.
    navigate("/profilesetup", { replace: false });
  };

  return (
    <>
      <div>
        <p className="font-Inter text-[28px]">Settings</p>
        <p className="text-[12px] text-[#667185] mb-5">
          Take a look at your policies and the new policy to see what is covered
        </p>

        <div className="flex justify-between items-center">
          <div
          className={`grid ${
            isTeacher
              ? "w-[170px] grid-cols-2"
              : user?.role?.toLowerCase() === "user"
              ? "w-[330px] grid-cols-4"
              : "w-[250px] grid-cols-3"
          } h-[40px] rounded-xl items-center`}
        >
          <button
            onClick={() => setActive("1")}
            className={`h-full w-full ${
              isTeacher ? "rounded-l-xl" : "rounded-l-xl"
            } border-t-[2px] border-b-[2px] text-[14px] font-Inter border-[#E4E7EC] text-center py-[10px] px-[16px] border-l-[2px] ${
              active == "1"
                ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                : "bg-white border-[#E4E7EC] text-[#667185]"
            }`}
          >
            Profile
          </button>
          {user?.role?.toLowerCase() === "user" && (
            <button
              onClick={() => setActive("2")}
              className={`h-full w-full border-[2px] text-[14px] font-Inter border-[#E4E7EC] text-center py-[10px] px-[16px] ${
                active == "2"
                  ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                  : "bg-white border-[#E4E7EC] text-[#667185]"
              }`}
            >
              My&nbsp;Kids
            </button>
          )}
          {!isTeacher && (
            <button
              onClick={() => setActive("3")}
              className={`h-full w-full border-[2px] text-[14px] font-Inter border-[#E4E7EC] text-center py-[10px] px-[16px] ${
                active == "3"
                  ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                  : "bg-white border-[#E4E7EC] text-[#667185]"
              }`}
            >
              Billing
            </button>
          )}
          <button
            onClick={() => setActive("4")}
            className={`h-full w-full ${
              isTeacher ? "rounded-r-xl" : "rounded-r-xl"
            } text-center py-[10px] text-[14px] font-Inter border-t-[2px] border-b-[2px] border-r-[2px] ${
              active == "4"
                ? "bg-#E4E7EC border-[#E4E7EC] text-[#1D2739]"
                : "bg-white border-[#E4E7EC] text-[#667185]"
            }`}
          >
            Password
          </button>
        </div>
        {user?.role?.toLowerCase() === "user" && active == "2" && (
          <button
            onClick={handleAddChild}
            className="inline-flex items-center gap-[10px] rounded-[100px] bg-[#9FC43E] px-[12px] py-[8px] text-sm font-semibold text-white shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#8FA01F]/40"
            style={{ width: '166px', height: '36px', opacity: 1 }}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.83317 6.50001C9.83317 6.03977 9.46007 5.66667 8.99984 5.66667C8.5396 5.66667 8.1665 6.03977 8.1665 6.50001V8.16667H6.49984C6.0396 8.16667 5.6665 8.53977 5.6665 9.00001C5.6665 9.46024 6.0396 9.83334 6.49984 9.83334H8.1665V11.5C8.1665 11.9602 8.5396 12.3333 8.99984 12.3333C9.46007 12.3333 9.83317 11.9602 9.83317 11.5V9.83334H11.4998C11.9601 9.83334 12.3332 9.46024 12.3332 9.00001C12.3332 8.53977 11.9601 8.16667 11.4998 8.16667H9.83317V6.50001Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.99984 0.666672C4.39746 0.666672 0.666504 4.39763 0.666504 9.00001C0.666504 13.6024 4.39746 17.3333 8.99984 17.3333C13.6022 17.3333 17.3332 13.6024 17.3332 9.00001C17.3332 4.39763 13.6022 0.666672 8.99984 0.666672ZM2.33317 9.00001C2.33317 5.31811 5.31794 2.33334 8.99984 2.33334C12.6817 2.33334 15.6665 5.31811 15.6665 9.00001C15.6665 12.6819 12.6817 15.6667 8.99984 15.6667C5.31794 15.6667 2.33317 12.6819 2.33317 9.00001Z" fill="white"/>
</svg>

            </span>
            Add&nbsp;Child&nbsp;Profile
          </button>


        )}
      </div>
    </div>
      <div className="mt-4 bg-white rounded-2xl p-5">
        {active == "1" && <Profile />}
        {user?.role?.toLowerCase() === "user" && active == "2" && <MyKids />}
        {!isTeacher && active == "3" && <Billing />}
        {active == "4" && <Password />}
      </div>
    </>
  );
};

export default Settings;
