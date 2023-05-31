import Google from "@/assets/googleicon.svg";

const GooglePlay = () => {
  return (
    <div>
      <div className="bg-black text-white items-center justify-center flex gap-2 rounded-md px-4 py-1 h-auto w-auto ">
        <div>
          <img src={Google} alt="" width="30px" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px]">GET IT ON</span>
          <span className="font-bold">Google Play</span>
        </div>
      </div>
    </div>
  );
};

export default GooglePlay;
