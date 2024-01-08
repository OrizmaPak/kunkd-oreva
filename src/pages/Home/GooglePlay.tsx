import Google from "@/assets/googleicon.svg";

const GooglePlay = ({ sizes }: { sizes?: boolean }) => {
  return (
    <div>
      <button
        className={`bg-black text-white items-center justify-center flex rounded-md ${
          sizes ? "pad-x-14 py-2 gap-3 " : "pad-x-10 py-2 gap-2 "
        } pad-x-10 py-2 h-auto w-auto`}
      >
        <div>
          <img
            loading="lazy"
            src={Google}
            alt=""
            className={`${sizes ? "w-[40px]" : "w-[25px]"}`}
            // width={`${sizes ? "40px" : "25px"}`}
          />
        </div>
        <div className="flex flex-col">
          <span
            className={`text-start ${sizes ? "text-[12px] " : "text-[8px]"}`}
          >
            GET IT ON
          </span>
          <span
            className={`font-simebold font-InterReg  ${
              sizes ? "text-[20px]" : "text3"
            }`}
          >
            Google Play
          </span>
        </div>
      </button>
    </div>
  );
};

export default GooglePlay;
