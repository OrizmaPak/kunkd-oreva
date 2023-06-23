import DeleteIcon from "@/assets/deleteicon.svg";
import ToggleIcon from "@/assets/toggleicon.svg";
import Rectangle from "@/assets/Rectangle.svg";

const Row = ({
  image,
  classs,
  name,
  gender,
  onClick = () => {},
  email,
  id,
  classCode,
  onDeleteProfile,
}: {
  image: string;
  name: string;
  gender: string;
  email: string;
  id: number;
  classs: string;
  classCode?: string;
  onClick?: () => void;
  onDeleteProfile: () => void;
}) => {
  return (
    <div className="  hover:cursor-pointer flex-grow font-medium">
      <div>
        <div className="grid   grid-cols-[100px_1fr_250px_250px_150px] mt-2  px-8">
          <div className="flex justify-start items-center ">
            <span className=" ">
              <img src={Rectangle} alt="" />
            </span>
          </div>
          <div
            onClick={onClick}
            className="flex items-center justify-start gap-4 "
          >
            <span>
              <img src={image} alt="image" className=" w-[46px]" />
            </span>
            <span>{name}</span>
          </div>
          <div className="flex justify-start items-center ">{classs}</div>
          <div className="flex justify-start items-center ">{gender}</div>
          <div className="flex justify-end  gap-4  items-center">
            <span>
              <img src={ToggleIcon} alt="" />
            </span>
            <span onClick={onDeleteProfile}>
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
