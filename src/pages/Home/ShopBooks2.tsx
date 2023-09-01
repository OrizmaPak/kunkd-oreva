import BigCart from "@/assets/Afam-04 1.svg";
const BigCartCard = () => {
  return (
    <div className="max-w-[1500px] mx-auto leading-8 text-center">
      <h1 className="pt-8 text-3xl font-bold ">
        What Our Client's Have To say
      </h1>
      <p>
        Kunda & Friends is a beautiful new music-led 3D animation and for
        children that takes preschoolers on a fun and adventurous ride with
        Kunda and his friends
      </p>
      <div className="h-[605px] p-14 w-[1165px] bg-[#8530C1] rounded-[70px] mb-[200px] ">
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
            <p className="mb-5 mt-8 text1">New Books</p>
            <h1 className="font-bold text-[25px] text-white header2">
              Afam and the New Yam Festival <br /> [PRE-ORDER]
            </h1>
            <p className="my-5 leading-8 text1">
              Afam and the New Yam Festival is a heartwarming children’s picture
              book, perfect for readers aged 3-8, that explores the beauty of
              family, heritage, and unity.
            </p>
            <p className="font-bold text-[30px] mt-8 header2">₦2,900.00 NGN</p>
            <p className="mb-10 text1ssss">Tax incuded ssd</p>
            <button className="bg-white text-[#447ADC] p-3  px-24 rounded-full">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCartCard;
