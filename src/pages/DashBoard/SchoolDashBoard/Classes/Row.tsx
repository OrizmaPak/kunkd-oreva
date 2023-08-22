import DeleteIcon from "@/assets/deleteicon.svg";
// import ToggleIcon from "@/assets/toggleicon.svg";
import Rectangle from "@/assets/boxIcon.svg";
import { TClassList } from "./Classes";

const Row = ({
  data,

  onClick,
}: {
  data: TClassList;
  onClick?: () => void;
}) => {
  return (
    <div className="hover:cursor-pointer   my-auto border-b-[2px] border-[#eee]  py-5 font-medium ">
      <div onClick={onClick}>
        <div className="grid  grid-cols-[100px_300px_1fr_1fr_150px]   px-8 ">
          <div className="flex justify-start items-center ">
            <span className=" ">
              <img loading="lazy" src={Rectangle} alt="" />
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 ">
            <span>{data.name}</span>
          </div>
          <div className="flex justify-start items-center ">
            {data.student_count}
          </div>
          <div className="flex justify-start items-center ">
            {data.teacher_count}
          </div>
          <div className="flex justify-end  gap-4  items-center">
            <span>{/* <img loading="lazy" src={ToggleIcon} alt="" /> */}</span>
            <span>
              <img loading="lazy" src={DeleteIcon} alt="delete" />
            </span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
