import "react-lazy-load-image-component/src/effects/blur.css";
import { FaUserAlt } from "react-icons/fa";
// import { BsJournalBookmark } from "react-icons/bs";
import StatBookIcon from "@/assets/bookstatIcon.svg";

const StatContent = () => {
  return (
    <div className="pb-16 mb-16">
      <div className="mb-8">
        <h1 className="text-center font-semibold font-Inter text-[36px] heading-[43px]">
          Unleash the full power of learning
        </h1>
        <p className="text-[#667085] text20 text-center mb-16 font-InterReg ">
          Everything you need to convert, engage, and retain more users.
        </p>
      </div>
      <div className="flex items-center justify-center ">
        <div className="flex gap-28">
          <div className="flex gap-8 justify-center items-center  ">
            <p className="bg-white p-6 rounded-full shadow-md">
              <FaUserAlt size={40} color={"#447ADC"} />
            </p>
            <p className="flex flex-col">
              <p className="header-1 font-bold text-center text-[#8530C1] font-Inter leading-0 ">
                4.5k+
              </p>

              <p className="mt-2 text1 font-semibold">
                Total active kids taking gifted course
              </p>
            </p>
          </div>
          <p className="h-[120px] border-[#C4CCD0] border-[1px]"></p>
          <div className="flex gap-8 justify-center items-center ">
            <p className="bg-white p-6 rounded-full shadow-md">
              {/* <BsJournalBookmark size={40} color={"#ED1C24"} /> */}
              <img src={StatBookIcon} alt="img" className="w-[37px] h-[41px]" />
            </p>
            <p className="flex flex-col">
              <p className="header-1 font-bold font-Inter leading-0  border-0 text-center text-[#8530C1] ">
                600%
              </p>

              <span className="text-[18px] font-semibold">
                Available ebooks programs and videos
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatContent;
