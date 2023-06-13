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
    <div className="bg-[rgba(237,28,36,0.06);] pb-60">
      <div>
        <h1 className="font-bold font-Recoleta text-center text-[60px]">
          New Release
        </h1>
        <p className=" leading-8  text-[20px] text-center mb-20 ">
          New inspiring books children love read
        </p>
      </div>
      <div className="flex justify-center items-center gap-16  px-60 flex-wrap">
        {data &&
          data.slice(0, 5).map((data, index) => {
            return <CartCard key={index} {...data} />;
          })}
      </div>
    </div>
  );
};

export default NewRelease;
