import CartCard from "./CartCard";

type Props = {
  data: {
    image?: string;
    title?: string;
    price?: string;
    size?: string;
    addToCart?: () => void;
  }[];
};
const NewRelease = ({ data }: Props) => {
  return (
    <div className="bg-[rgba(237,28,36,0.06);] pb-60 ">
      <div>
        <h1 className=" font-semibold font-Recoleta text-center text-[46]px]">
          New Release
        </h1>
        <p className=" leading-[30px]  text-[18px] text-center mb-20 ">
          New inspiring books children love read
        </p>
      </div>
      <div className="max-w-[1300px]  mx-auto grid grid-cols-3 justify-center items-center gap-28  px-40 flex-wrap">
        {data &&
          data.slice(0, 5).map((data, index) => {
            return <CartCard size="300" key={index} {...data} />;
          })}
      </div>
    </div>
  );
};

export default NewRelease;
