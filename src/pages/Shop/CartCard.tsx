import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AfamBur from "@/assets/afamblur.jpg";

const CartCard = ({
  image,

  size,
}: {
  image?: string;

  size?: string;
}) => {
  return (
    <div className="my-5">
      <div style={{ width: `${size ? size : ""}px` }}>
        <LazyLoadImage
          src={image}
          placeholderSrc={AfamBur}
          effect="blur"
          wrapperClassName=""
          height={size}
          width={size}
        />
      </div>
    </div>
  );
};

export default CartCard;
