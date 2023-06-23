import DeleteIcon from "@/assets/deleteicon.svg";
import ToggleIcon from "@/assets/toggleicon.svg";
import Rectangle from "@/assets/Rectangle.svg";

const Row = ({
  image,
  name,
  gender,
  email,
  onClick,
  id,
}: {
  image: string;
  name: string;
  gender: string;
  email: string;
  id: number;
  onClick: () => void;
}) => {
  return (
    <div className="flex-grow  hover:cursor-pointer  font-medium">
      <div>
        <div className="grid  grid-cols-[100px_1fr_1fr_150px_150px] mt-2  px-8">
          <div className="flex justify-start items-center ">
            <span className=" ">
              <img src={Rectangle} alt="" />
            </span>
          </div>
          <div
            onClick={onClick}
            className="flex items-center justify-start gap-2 "
          >
            <span>
              <img src={image} alt="" />
            </span>
            <span>{name}</span>
          </div>
          <div className="flex justify-start items-center ">{email}</div>
          <div className="flex justify-start items-center ">{gender}</div>
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
