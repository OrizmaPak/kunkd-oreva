import { TSchoolStudentStat } from ".";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import { Skeleton } from "@mantine/core";

const RecentCompleted = ({
  schoolStudentStat,
  isLoading,
}: {
  schoolStudentStat: TSchoolStudentStat;
  isLoading: boolean;
}) => {
  return (
    <div className="h-full ">
      {isLoading ? (
        <Skeleton
          height={150}
          width={350}
          radius={20}
          mb="xl"
          visible={isLoading}
        />
      ) : (
        <div className="bg-white p-4 rounded-3xl  h-full">
          <h1 className="font-semibold text-[16px] leading-[30px]  mb-2 font-Hanken ">
            Recently Completed
          </h1>
          <div className="flex gap-5">
            {schoolStudentStat?.recently_completed_content?.length === 0 && (
              <p className=" font-semibold ">Oops!!! No data😤 </p>
            )}

            {schoolStudentStat?.recently_completed_content
              ?.slice(0, 2)
              .map((data: TStoryContent, index) => (
                <CompletedCard key={index} data={data} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentCompleted;

const CompletedCard = ({ data }: { data: TStoryContent }) => {
  return (
    <>
      <div className="flex gap-3 ">
        <p>
          <img
            loading="lazy"
            src={data?.thumbnail}
            alt="image"
            className="w-[65px] h-[65px] rounded"
          />
        </p>
        <p className="flex flex-col">
          <span className="text-[20px] font-bold font-Hanken text-[#2BB457]">
            {" "}
            8.0
          </span>
          <span className="text-[15px] font-bold  text-gray-300">
            10hrs ago
          </span>
        </p>
      </div>
    </>
  );
};
