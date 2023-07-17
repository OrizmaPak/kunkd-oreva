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
    <div className="max-w-[1300px] mx-auto">
      <h1 className=" font-semibold font-Recoleta text-center text-[46px] ">
        African History stories
      </h1>
      <p className="text-center text-[18px] mb-10">
        Adventure stories based on African leaders in history.
      </p>
      <div className="grid grid-cols-4 flex-wrap gap-28 px-20 justify-center items-center">
        {data &&
          data.slice(1, 9).map((data, index) => {
            return <CartCard key={index} {...data} size="260" />;
          })}
      </div>
    </div>
  );
};

export default AfricanHistoryContent;
