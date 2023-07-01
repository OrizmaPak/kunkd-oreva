import BigCart from "@/assets/bigcart.svg";
const BigCartCard = () => {
  return (
    <div className="h-[605px] p-14 w-[1165px] bg-[#447ADC] rounded-[70px] mb-[200px] ">
      <div className="flex gap-10 ">
        <div className="basis-1/2">
          <img
            loading="lazy"
            src={BigCart}
            alt="b=cart card"
            className="w-[900px]"
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
