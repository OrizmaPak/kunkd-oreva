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
    <div>
      <h1 className="font-bold font-Recoleta text-center text-[60px] ">
        African History stories
      </h1>
      <p className="text-center text-[20px] mb-10">
        Adventure stories based on African leaders in history.
      </p>
      <div className="flex flex-wrap gap-10 px-20 justify-center items-center">
        {data &&
          data.slice(3).map((data, index) => {
            return <CartCard key={index} {...data} />;
          })}
      </div>
    </div>
  );
};

export default AfricanHistoryContent;
