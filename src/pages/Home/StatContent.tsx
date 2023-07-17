import content from "@/assets/wavecardcontent.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ContentBlur from "@/assets/statcontentblur.jpg";

const StatContent = () => {
  return (
    <div className="flex items-center justify-center ">
      {/* <img loading="lazy" src={content} alt="" width="50%" /> */}
      <LazyLoadImage
        // width={500}
        // height={500}
        effect="blur"
        className="w-[70%] mx-auto"
        wrapperClassName="w-[70%] mx-auto"
        src={content}
        placeholderSrc={ContentBlur}
      />
    </div>
  );
};

export default StatContent;
