import Dell01 from "@/assets/dell01.png";
import Spark01 from "@/assets/spark01.png";
import { useNavigate } from "react-router-dom";
const Existing = () => {
  const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
  const navigate = useNavigate();

  return (
    <div className="bg-[#FBC70D] pad-y-96 pad-x-40">
      <div>
        <p className="text-center header2 font-medium">
          Log in to your existing account
        </p>
        <p className="text-center text1">
          Are you registering as a parent or as a teacher?
        </p>
        <div
          onClick={() => navigate("/signup")}
          className="grid md:grid-cols-2   grid-cols-1 gap-10 px-4 mt-8 max-w-[1000px]  mx-auto  cursor-pointer"
        >
          <div className="bg-[rgba(255,224,143,0.7)] flex justify-center items-center flex-col  rounded-2xl p-4 py-6">
            <img src={Dell01} alt="" />
            <p className="text-[24px] font-bold text-center">Web App</p>
            <p className="text-center font-semibold">
              Sign Up on the web app as a parent or log in to your existing
              account
            </p>
          </div>
          <div
            onClick={() => {
              openInNewTab(
                "https://play.google.com/store/apps/details?id=com.lhamycodes.kundakids"
              );
            }}
            className="bg-[rgba(255,224,143,0.7)] flex justify-center items-center flex-col rounded-2xl gap-8 p-4 py-6 cursor-pointer"
          >
            <img src={Spark01} alt="" />
            <div>
              <p className="text-[24px] text-center font-bold">Mobile App</p>
              <p className="text-center font-semibold">
                Download the Kunda Kids mobile app on Appstore, Playstore and
                Amazon to join the summer challenge
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Existing;
