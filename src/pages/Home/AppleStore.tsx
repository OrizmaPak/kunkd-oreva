import { FaApple } from "react-icons/fa";

const AppleStore = () => {
  return (
    <button className="bg-black text-white items-center justify-center flex gap-2 rounded-md px-1 py-1 ">
      <div>
        {/* <img loading="lazy" src={Apple} alt="" width="30px" /> */}
        <FaApple size={32} />
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] text-start">Download on the</span>
        <span className="">Apple Store</span>
      </div>
    </button>
  );
};

export default AppleStore;
