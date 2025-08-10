import { DataType } from "../../pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import React from "react";

type Props = {
  data?: DataType[];
  header?: string;
  action?: () => void;
  actiontitle?: string;
  isTitled?: boolean;
  card?: (props: DataType) => React.ReactNode;
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
          {data?.map((item, index) => {
            if (index >= 1 && index < 3) {
              return card ? card(item) : null;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CardScreen;
