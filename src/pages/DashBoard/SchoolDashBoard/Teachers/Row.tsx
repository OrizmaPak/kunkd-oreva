import DeleteIcon from "@/assets/deleteicon.svg";
// import ToggleIcon from "@/assets/toggl.svg";
import Rectangle from "@/assets/boxIcon.svg";
import { TTeacherList } from "./Teachers";

const Row = ({
  data,
  onClick,
}: {
  data: TTeacherList;
  onClick: () => void;
}) => {
  return (
    <div className=" hover:cursor-pointer  font-medium">
      <div>
        <div className="grid  grid-cols-[100px_1fr_1fr_100px_100px] mt-2  px-8">
          <div className="flex justify-start items-center ">
            <span className=" ">
              <img loading="lazy" src={Rectangle} alt="image" />
            </span>
          </div>
          <div
            onClick={onClick}
            className="flex items-center justify-start gap-2 "
          >
            <span>
              <img
                loading="lazy"
                src={data.user.image}
                alt="image"
                className="w-[50px] h-[50px] object-cover rounded-xl "
              />
            </span>
            <span>
              {data.user.firstname} {data.user.lastname}
            </span>
          </div>
          <div className="flex justify-start items-center ">
            {data.user.email}
          </div>
          <div className="flex justify-start items-center ">
            {data.user.gender}
          </div>
          <div className="flex justify-end  gap-4  items-center">
            <span>
              {/* <img loading="lazy" src={ToggleIcon} alt="image" /> */}
            </span>
            <span>
              <img loading="lazy" src={DeleteIcon} alt="delete" />
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
