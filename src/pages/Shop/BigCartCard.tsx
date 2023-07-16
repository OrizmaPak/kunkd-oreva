import BigCart from "@/assets/bigcart.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AfamBur from "@/assets/afamblur.jpg";
const BigCartCard = () => {
  return (
    <div className="h-[605px] p-14 w-[1165px] bg-[#447ADC] rounded-[70px] mb-[200px] flex justify-end  items-centers ">
      <div className="flex gap-10 items-center ">
        <div className="basis-1/2">
          {/* <img
            loading="lazy"
            src={BigCart}
            alt="b=cart card"
            className="w-[900px]"
          /> */}
          <LazyLoadImage
            src={BigCart}
            placeholderSrc={AfamBur}
            effect="blur"
            wrapperClassName=""
            width={467}
            height={467}
          />
        </div>
        <div className="basis-1/2 text-white">
          <p className="mb-5 mt-8">New Books</p>
          <h1 className="font-bold text-[25px] text-white">
            Afam and the New Yam Festival <br /> [PRE-ORDER]
          </h1>
          <p className="my-5 leading-8">
            Afam and the New Yam Festival is a heartwarming children’s picture
            book, perfect for readers aged 3-8, that explores the beauty of
            family, heritage, and unity.
          </p>
          <p className="font-bold text-[30px] mt-8">₦2,900.00 NGN</p>
          <p className="mb-10">Tax incuded</p>
          <button className="bg-white text-[#447ADC] p-3  px-24 rounded-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigCartCard;
