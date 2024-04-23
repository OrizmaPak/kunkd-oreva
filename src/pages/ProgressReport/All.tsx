import ProgressCard from "./ProgressCard";
import { TStoryContent } from "@/api/types";
import { Skeleton } from "@mantine/core";
const All = ({
  data,
  isLoading,
}: {
  data: TStoryContent[];
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="py-8 grid grid-cols-3 gap-y-10 gap-x-14">
        {isLoading
          ? Array(9)
              .fill(9)
              .map((arr, index) => (
                <Skeleton visible={true}>
                  <div key={index} className="h-[160px] text-transparent">
                    {arr}
                  </div>
                </Skeleton>
              ))
          : data &&
            data.map((data: TStoryContent, index) => {
              return <ProgressCard key={index} data={data} />;
            })}
      </div>
    </div>
  );
};

export default All;
