import { CardTypes } from "../Home/ClientCard";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SmileBlur from "@/assets/smileIconblur.jpg";

const ServiceCard = ({ title, image, body }: CardTypes) => {
  return (
    <div className="flex mb-8  items-center gap-8">
      <div className=" w-[100px] ">
        <LazyLoadImage
          src={image}
          placeholderSrc={SmileBlur}
          effect="blur"
          width={100}
          height={100}
        />
      </div>
      <div className="flex-1">
        <h1 className="font-bold  text-[24px]">{title}</h1>
        <p className="text-[18px] leading-[30px]">{body}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
