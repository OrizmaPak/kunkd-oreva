import React from "react";
import { CardProps } from "./CardHome";
type Props = {
  data?: CardProps[];
  header?: string;
  action?: () => void;
  actiontitle?: string;
  isTitled?: boolean;
  card?: (props: CardProps) => React.ReactNode;
};
const CardScreen = ({ data, header, action, actiontitle, card }: Props) => {
  return (
    <div className=" mx-20 mt-4 ">
      <div className="flex justify-between mb-8 ">
        <span className=" text-[24px] font-semibold font-Recoleta ">
          {header}
        </span>
        <button onClick={action} className=" text-[#8530C1] text-lg">
          {actiontitle}
        </button>
      </div>
      <div
        className="overflow-auto  no-scrollbar "
        style={{ maxHeight: "500px" }}
      >
        <div className="flex  gap-5 mb-14  ">
          {data?.map((data) => {
            return card ? card(data) : null;
            // <Card key={index} image={data?.image} title={data?.title} />
          })}
        </div>
      </div>
    </div>
  );
};

export default CardScreen;
