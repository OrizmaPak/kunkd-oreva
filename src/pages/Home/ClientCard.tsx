import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BlxstBlur from "@/assets/BlxstBlur.jpg";
export type CardTypes = {
  image?: string;
  name?: string;
  location?: string;
  story?: string;
  title?: string;
  body?: string;
};
const ClientCard = ({ image, name, location, story }: CardTypes) => {
  return (
    <div className="w-[450px]  p-7 rounded-xl  bg-[#FFFFFF] shadow-md ml-[20px] mb-8 pb-4">
      <div className="flex items-center mb-6">
        {/* <img
          loading="lazy"
          src={image}
          alt=""
          className="rounded-[50%] w-[100px] h-[100px]"
        /> */}
        <LazyLoadImage
          src={image}
          placeholderSrc={BlxstBlur}
          effect="blur"
          className="rounded-[50%] w-[90px] h-[90px]"
          wrapperClassName="rounded-[50%] w-[100px] h-[100px]"
          width={100}
          height={100}
        />
        <span className="ml-4 flex flex-col">
          <span className="font-bold">{name}</span>
          <span>{location}</span>
        </span>
      </div>
      <div className="mt-8">
        <p className="mb-10 ">{story}</p>
      </div>
    </div>
  );
};

export default ClientCard;
