import { FaApple } from "react-icons/fa";

const AppleStore = ({ sizes }: { sizes?: boolean }) => {
  return (
    <button
      className={`bg-black text-white items-center justify-center flex rounded-md ${
        sizes ? "pad-x-12 py-2 gap-3 " : "pad-x-10 py-2 gap-2 "
      } pad-x-10 py-2 h-auto w-auto`}
    >
      <div>
        {/* <img loading="lazy" src={Apple} alt="" width="30px" /> */}
        <FaApple size={`${sizes ? 45 : 25}`} />
      </div>
      <div className="flex flex-col">
        <span className={`text-start ${sizes ? "text-[12px] " : "text-[8px]"}`}>
          Download on the
        </span>
        <span
          className={`font-simebold font-InterReg  ${
            sizes ? "text-[20px]" : "text3"
          }`}
        >
          Apple Store
        </span>
      </div>
    </button>
  );
};

export default AppleStore;
