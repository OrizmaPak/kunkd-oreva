import { FaApple } from "react-icons/fa";

const AppleStore = () => {
  return (
    <button className="bg-black text-white items-center justify-center flex gap-2 rounded-md pad-x-10 py-1 ">
      <div>
        {/* <img loading="lazy" src={Apple} alt="" width="30px" /> */}
        <FaApple size={32} />
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] text-start">Download on the</span>
        <span className="font-semibold">Apple Store</span>
      </div>
    </button>
  );
};

export default AppleStore;
