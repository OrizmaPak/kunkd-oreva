import React from "react";
import { Skeleton } from "@mantine/core";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";

type Props = {
  data?: TStoryContent[];
  header?: string;
  action?: () => void;
  actiontitle?: string;
  isTitled?: boolean;
  card?: (props: TStoryContent) => React.ReactNode;
  isLoading: boolean;
};
const CardScreen = ({
  data,
  header,
  action,
  actiontitle,
  card,
  isLoading,
}: Props) => {
  return (
    <div className=" mx-20 mt-4 ">
      <div className="flex justify-between mb-8 ">
        <span className=" text25 font-semibold font-Recoleta ">{header}</span>
        <button onClick={action} className=" text-[#8530C1] text2">
          {actiontitle}
        </button>
      </div>
      <div
        className="overflow-auto  no-scrollbar p-4 "
        style={{ maxHeight: "500px" }}
      >
        <div className="flex gap-5 mb-14  ">
          {isLoading
            ? Array(5)
                .fill(1)
                .map((arr, index) => (
                  <Skeleton key={index} visible={isLoading}>
                    <div
                      key={index}
                      className="h-[200px] w-[400px] text-transparent"
                    >
                      {arr}
                    </div>
                  </Skeleton>
                ))
            : data?.map((data: TStoryContent) => {
                return card ? card(data) : null;
              })}
        </div>
      </div>
    </div>
  );
};

export default CardScreen;
