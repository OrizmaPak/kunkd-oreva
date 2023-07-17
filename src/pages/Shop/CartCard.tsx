import Button from "@/components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AfamBur from "@/assets/afamblur.jpg";

const CartCard = ({
  image,
  title,
  price,
  addToCart,
  size,
}: {
  image?: string;
  title?: string;
  price?: string;
  size?: string;
  addToCart?: () => void;
}) => {
  return (
    <div className="my-5">
      <div style={{ width: `${size ? size : ""}px` }}>
        {/* <img loading="lazy" src={image} alt="image" className="w-full" /> */}
        <LazyLoadImage
          src={image}
          placeholderSrc={AfamBur}
          effect="blur"
          wrapperClassName=""
          height={size}
          width={size}
        />

        <p className="my-4">{title}</p>
        <p className=" font-bold text-[20px] mb-8">{price} NGN</p>
        <Button varient="outlined" size="full" onClick={addToCart}>
          <small className=" text-[#8530C1]"> Add to Cart</small>
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
