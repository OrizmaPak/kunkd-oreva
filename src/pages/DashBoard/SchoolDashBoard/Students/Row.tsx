import DeleteIcon from "@/assets/deleteicon.svg";
// import ToggleIcon from "@/assets/toggleicon.svg";
import Rectangle from "@/assets/boxIcon.svg";
import { TRequestStudents } from "../../TeacherDashboard/Request/Request";

const Row = ({
  data,
  onClick = () => {},
  onDeleteProfile,
}: {
  data: TRequestStudents;

  classCode?: string;
  onClick?: () => void;
  onDeleteProfile: () => void;
}) => {
  return (
    // <div className="  py-3  h-[72px] hover:cursor-pointer flex-grow font-medium">
    <div>
      <div className="grid   grid-cols-[100px_300px_1fr_150px] mt-2  px-8">
        <div className="flex justify-start items-center ">
          <span className=" ">
            <img loading="lazy" src={Rectangle} alt="" />
          </span>
        </div>
        <div
          onClick={onClick}
          className="flex items-center justify-start gap-4 "
        >
          <span>
            <img
              loading="lazy"
              src={data.student.image}
              alt="image"
              className=" w-[46px]"
            />
          </span>
          <span>
            {data.firstname} {data.lastname}
          </span>
        </div>
        <div className="flex justify-start items-center ">
          {data.class.class_name}
        </div>

        <div className="flex justify-end  gap-4  items-center">
          <span>{/* <img loading="lazy" src={ToggleIcon} alt="" /> */}</span>
          <span onClick={onDeleteProfile}>
            <img loading="lazy" src={DeleteIcon} alt="delete" />
          </span>
          <span></span>
        </div>
      </div>
      <hr className="my-[10px] mx-8" />
    </div>
    // </div>
  );
};

export default Row;
