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
    <div className="bg-[rgba(237,28,36,0.06);] pb-60  pt-32">
      <div>
        <h1 className=" font-semibold font-Recoleta text-center text-[46]px]">
          Explore a curated collection
        </h1>
        <p className=" leading-[30px]  text-[18px] text-center mb-20 ">
          New inspiring books children love read From enchanting storybooks to
          educational materials and interactive <br /> learning kits, our shop
          offers a diverse range of literary treasures that cater to different
          interests and learning styles. 
        </p>
      </div>
      <div className="max-w-[1300px]  mx-auto grid grid-cols-5 justify-center items-center gap-28  px-28 flex-wrap">
        {data &&
          data.slice(0, 5).map((data, index) => {
            return <CartCard size="200" key={index} {...data} />;
          })}
      </div>
    </div>
  );
};

export default NewRelease;
