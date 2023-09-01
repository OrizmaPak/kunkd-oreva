import Teacher1 from "@/assets/usericon.svg";
import Teacher2 from "@/assets/Male01.svg";
import Teacher3 from "@/assets/Female03.svg";
import { TTeacherList } from "../Teachers/Teachers";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ClassLeaderboard = ({ data }: { data: TTeacherList[] }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white rounded-3xl flex flex-col flex-grow px-10 mt-2">
      <div className="flex justify-between">
        <h1 className="text2 font-semibold">Class List</h1>
      </div>

      <div className="flex justify-between mt-4 text3 ">
        <span>Classes</span>
        <span>Teacher</span>
      </div>
      <hr className="mb-3" />
      <div className="flex flex-grow  flex-col">
        {data?.map((data: TTeacherList, index) => {
          return <Row key={index} data={data} />;
        })}
      </div>
      <div className="flex  justify-end ">
        <span>
          <button onClick={() => navigate("classes")} className="flex gap-2">
            <span className="text3 font-medium">See more</span>
            <BsChevronRight size={18} />
          </button>
        </span>
      </div>
    </div>
  );
};

export default ClassLeaderboard;

const Row = ({ data }: { data: TTeacherList }) => {
  return (
    <div className="flex justify-between items-center my-3  text3">
      <span className="flex gap-2 items-center justify-center">
        <img
          loading="lazy"
          src={data?.user.image}
          alt="image"
          className="w-[30px] h-[30px] rounded-full object-cover"
        />
        <span>{data?.class.class_name}</span>
      </span>
      <span>
        {data?.user.firstname} {data?.user.lastname}
      </span>
    </div>
  );
};
