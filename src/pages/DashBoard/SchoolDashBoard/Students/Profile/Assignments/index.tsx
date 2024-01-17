import Header from "./Header";
import Row from "./Row";
import { TSchoolStudentStat } from "..";
import { Skeleton } from "@mantine/core";

const ContentInProgress = ({
  schoolStudentStat,
  isLoading,
}: {
  schoolStudentStat: TSchoolStudentStat;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <Skeleton
          height={350}
          width={600}
          radius={20}
          mb="xl"
          visible={isLoading}
        />
      ) : (
        <div className=" bg-white rounded-3xl  flex-col px-6  w-full overflow-y-scroll overflow-hidden  h-[300px]">
          <Header />
          {schoolStudentStat?.ongoing_contents?.length === 0 ? (
            <p className="mt-4 font-Inter">
              Oops!!! No data available for content in progress😤{" "}
            </p>
          ) : (
            schoolStudentStat?.ongoing_contents?.map((data, index) => {
              return <Row key={index} data={data} />;
            })
          )}
        </div>
      )}
    </>
  );
};

export default ContentInProgress;
