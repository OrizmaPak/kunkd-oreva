import Apple from "@/assets/appleicon.svg";

const AppleStore = () => {
  return (
    <button className="bg-black text-white items-center justify-center flex gap-2 rounded-md px-4 py-1 ">
      <div>
        <img src={Apple} alt="" width="30px" />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px]">Download on the</span>
        <span className="font-bold">Apple Store</span>
      </div>
    </button>
  );
};

export default AppleStore;
