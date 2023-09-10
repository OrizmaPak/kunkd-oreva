// import { dashboardData } from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import { TRequestStudents } from "../../TeacherDashboard/Request/Request";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const StudentLeaderboard = ({ data }: { data: TRequestStudents[] }) => {
  const navigate = useNavigate();
  return (
    <div className="py-4 bg-white rounded-3xl mt-1  flex flex-col flex-grow  pad-x-40">
      <div className="flex justify-between">
        <h1 className="text1 font-bold font-Recoleta">Student List</h1>
      </div>

      <div className="grid grid-cols-2 mt-4 text-gray-400 text3">
        <span>Name</span>
        <span className="flex justify-center">Class</span>
      </div>
      <hr className="my-2" />

      <div className="weight-700 font-medium flex-grow flex flex-col">
        {data &&
          data?.slice(0, 6).map((data: TRequestStudents, index) => {
            return <Row key={index} data={data} />;
          })}
      </div>

      <div className="flex justify-end items-center gap-4 ">
        <button onClick={() => navigate("student")} className="flex gap-2">
          <span className="text3 font-medium">See more</span>
          <BsChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StudentLeaderboard;

const Row = ({ data }: { data: TRequestStudents }) => {
  return (
    <>
      <div className="hover:cursor-pointer    border-b-[1px] border-[#eee]  py-5 font-medium   grid grid-cols-2 ">
        <span className="flex gap-2 items-center  ">
          <img
            loading="lazy"
            src={data?.student?.image}
            alt="image"
            className="w-[45px] object-contain "
          />
          <span>
            {data?.firstname} {data?.lastname}
          </span>
        </span>
        <span className="flex justify-center  items-center">
          {data?.class?.class_name}
        </span>
        <div className="flex justify-center"></div>
      </div>
    </>
  );
};
