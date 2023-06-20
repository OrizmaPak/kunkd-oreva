import DeleteIcon from "@/assets/deleteicon.svg";
import ToggleIcon from "@/assets/toggleicon.svg";
import Rectangle from "@/assets/Rectangle.svg";

const Row = ({
  noOfStudents,

  noOfTeacher,
  title,
  gender,
  email,
  onClick,
  id,
}: {
  noOfStudents?: number;

  noOfTeacher?: number;
  title?: string;
  gender?: string;
  email?: string;
  id?: number;
  onClick?: () => void;
}) => {
  return (
    <div className="  hover:cursor-pointer my-4 font-medium">
      <div onClick={onClick}>
        <div className="grid  grid-cols-[100px_300px_1fr_1fr_150px] mt-2  px-8 py-2">
          <div className="flex justify-start items-center ">
            <span className=" ">
              <img src={Rectangle} alt="" />
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 ">
            <span>{title}</span>
          </div>
          <div className="flex justify-start items-center ">{noOfStudents}</div>
          <div className="flex justify-start items-center ">{noOfTeacher}</div>
          <div className="flex justify-end  gap-4  items-center">
            <span>
              <img src={ToggleIcon} alt="" />
            </span>
            <span>
              <img src={DeleteIcon} alt="delete" />
            </span>
            <span></span>
          </div>
        </div>
        <hr className="my-[10px] mx-8" />
      </div>
    </div>
  );
};

export default Row;
