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
const AfricanHistoryContent = ({ data }: Props) => {
  return (
    <div className="max-w-[1300px] mx-auto mb-28">
      <h1 className=" font-semibold font-Recoleta text-center text-[46px] ">
        Embrace Cultural Diversity
      </h1>
      <p className="text-center text-[18px] mb-10">
        Our shop features a wide selection of books that highlight diverse
        cultures, traditions, and perspectives, <br /> fostering a greater
        understanding and appreciation of the world.
      </p>
      <div className="grid grid-cols-4 flex-wrap gap-28 px-40 justify-center items-center">
        {data &&
          data.slice(1, 5).map((data, index) => {
            return <CartCard key={index} {...data} size="200" />;
          })}
      </div>

      <h1 className=" font-semibold font-Recoleta text-center text-[46px] mt-20 ">
        Expand Home Library
      </h1>
      <p className="text-center text-[18px] mb-10">
        With an extensive range of books and resources, you can continually
        expand your child's literary repertoire, <br /> providing them with
        endless opportunities for learning, discovery, and joy. 
      </p>
      <div className="grid grid-cols-4 flex-wrap gap-28 px-40 justify-center items-center">
        {data &&
          data.slice(5, 9).map((data, index) => {
            return <CartCard key={index} {...data} size="200" />;
          })}
      </div>
    </div>
  );
};

export default AfricanHistoryContent;
