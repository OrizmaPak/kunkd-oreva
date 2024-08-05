import { FaApple } from "react-icons/fa";

const AppleStore = ({ sizes }: { sizes?: boolean }) => {
  const openInNewTab = (url: string) => {
    const newWindow: Window | null = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Ensure no access to the current window
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          openInNewTab("https://apps.apple.com/ng/app/kunda-kids/id1612794970");
        }}
        className={`bg-black text-white items-center justify-center flex rounded-md ${
          sizes ? "pad-x-14 py-2 gap-3 " : "pad-x-10 py-2 gap-2 "
        } pad-x-10 py-2 h-auto w-auto`}
      >
        <div>
          {/* <img loading="lazy" src={Apple} alt="" width="30px" /> */}
          <FaApple size={`${sizes ? 40 : 25}`} />
        </div>
        <div className="flex flex-col">
          <span
            className={`text-start  font-normal ${
              sizes ? "text-[12px] " : "text-[8px] "
            }`}
          >
            Download on the
          </span>
          <span
            className={` font-InterReg font-bold  ${
              sizes ? "text-[20px]" : "text3 "
            }`}
          >
            Apple Store
          </span>
        </div>
      </button>
    </div>
  );
};

export default AppleStore;
