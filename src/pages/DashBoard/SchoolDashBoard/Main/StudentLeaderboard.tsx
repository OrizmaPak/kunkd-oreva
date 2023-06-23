import Teacher1 from "@/assets/usericon.svg";
import Teacher2 from "@/assets/Male01.svg";
import Teacher3 from "@/assets/Female03.svg";
import Teacher4 from "@/assets/male03.svg";
// import { dashboardData } from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import { Pagination } from "@mantine/core";
import { DashBoardDataType } from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";

const StudentLeaderboard = ({ data }: { data: DashBoardDataType[] }) => {
  return (
    <div className="p-4 bg-white rounded-3xl mt-1 px-4 flex flex-col flex-grow">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold font-Recoleta">
          Student Leaderboard
        </h1>
      </div>

      <div className="grid grid-cols-3 mt-4 text-gray-400">
        <span>Name</span>
        <span className="flex justify-center">Class</span>
        <span className="flex justify-center">Gender</span>
      </div>
      <hr className="my-2" />

      <div className="weight-700 font-medium flex-grow flex flex-col">
        {data &&
          data.map((data, index) => {
            return <Row key={index} {...data} />;
          })}
      </div>

      <div className="flex  justify-between mt-8 px- mb-4 ">
        <span>
          Showing <span className="text-[#8530C1]"> 1-9 </span> from
          <span className="text-[#8530C1]"> 35 </span> data
        </span>
        <Pagination
          total={10}
          size={"sm"}
          styles={() => ({
            control: {
              "&[data-active]": {
                backgroundColor: "#8530C1 !important",
              },
            },
          })}
        />
      </div>
    </div>
  );
};

export default StudentLeaderboard;

const Row = ({
  image,
  name,
  classs,
  gender,
}: {
  image?: string;
  name?: string;
  classs?: string;
  gender?: string;
}) => {
  return (
    <>
      <div className="grid grid-cols-3 justify-between items-center flex-grow ">
        <span className="flex gap-2 items-center justify-start">
          <img src={image} alt="image" className="" />
          <span>{name}</span>
        </span>
        <span className="flex justify-center">{classs}</span>
        <div className="flex justify-center">
          <div
            className={`${
              gender === "Male"
                ? "text-blue-600 bg-blue-100"
                : "text-green-700 bg-green-100"
            } px-5 rounded-3xl flex justify-start py-2`}
          >
            {gender}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
