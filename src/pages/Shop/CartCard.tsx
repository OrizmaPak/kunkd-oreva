import Button from "@/components/Button";

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
    <div className="my-10">
      <div style={{ width: `${size ? size : "350"}px` }} className="w-[300px]">
        <img src={image} alt="image" className="w-full" />

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
