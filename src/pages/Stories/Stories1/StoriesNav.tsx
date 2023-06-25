import NextIcon from "@/assets/nexticon.svg";
import { useNavigate } from "react-router-dom";
const StoriesNav = ({
  category,
  genre,
  title,
}: {
  category?: string;
  genre?: string;
  title?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="py-4 rounded-full bg-white gap-8 flex px-8">
      <div
        className="flex gap-4 cursor-pointer  font-bold"
        onClick={() => navigate(`/librarynotpaid/stories`)}
      >
        <span>{category}</span>
        <img src={NextIcon} alt="nextIcon" />
      </div>
      <div
        className="flex gap-4  cursor-pointer  font-bold"
        onClick={() => navigate(`/librarynotpaid/stories/${genre}`)}
      >
        <span>{genre}</span>
        <img src={NextIcon} alt="nextIcon" />
      </div>
      <div className=" cursor-pointer ">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default StoriesNav;
