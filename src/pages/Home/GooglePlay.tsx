import Google from "@/assets/googleicon.svg";

const GooglePlay = () => {
  return (
    <div>
      <button className="bg-black text-white items-center justify-center flex gap-2 rounded-md pad-x-10 py-2 h-auto w-auto ">
        <div>
          <img loading="lazy" src={Google} alt="" width="25px" />
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] text-start">GET IT ON</span>
          <span className="font-simebold text3">Google Play</span>
        </div>
      </button>
    </div>
  );
};

export default GooglePlay;
