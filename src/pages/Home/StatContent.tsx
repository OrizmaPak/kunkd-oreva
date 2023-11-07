import "react-lazy-load-image-component/src/effects/blur.css";
import { FaUserAlt } from "react-icons/fa";
import { BsJournalBookmark } from "react-icons/bs";

const StatContent = () => {
  return (
    <div className="flex items-center justify-center ">
      {/* <img loading="lazy" src={content} alt="" width="50%" /> */}
      {/* <LazyLoadImage
        // width={500}
        // height={500}
        effect="blur"
        className="w-[70%] mx-auto"
        wrapperClassName="w-[70%] mx-auto"
        src={content}
        placeholderSrc={ContentBlur}
      /> */}

      <div className="flex gap-28">
        <div className="flex gap-8 justify-center items-center  ">
          <p className="bg-white p-4 rounded-full shadow-md">
            <FaUserAlt size={40} color={"#447ADC"} />
          </p>
          <p className="leading-[22px]">
            <span className="header-1 font-semibold font-Recoleta leading-0 my-0">
              4.5k+
            </span>
            <br />
            <p className="mt-2 text1 font-semibold">
              Total active kids
              <br /> taking gifted course
            </p>
          </p>
        </div>
        <p className="h-[120px] border-[#C4CCD0] border-[1px]"></p>
        <div className="flex gap-8 justify-center items-center ">
          <p className="bg-white p-4 rounded-full shadow-md">
            <BsJournalBookmark size={40} color={"#ED1C24"} />
          </p>
          <p className="leading-[22px]">
            <span className="header-1 font-semibold font-Recoleta leading-0 my-0 border-0">
              100+
            </span>
            <br />
            <span className="text1 font-semibold">
              Available ebooks
              <br /> programs and videos
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatContent;
