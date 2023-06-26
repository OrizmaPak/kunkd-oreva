import NextIcon from "@/assets/nexticon.svg";
import { useNavigate, useParams } from "react-router-dom";
const StoriesNav = ({
  category,
  genre,
  title,
  quiz,
}: {
  category?: string;
  genre?: string;
  title?: string;
  quiz?: string;
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="py-4 rounded-full bg-white gap-8 flex px-8">
      <div
        className="flex gap-2 cursor-pointer  font-bold"
        onClick={() => navigate(`/librarynotpaid/stories`)}
      >
        <span>{category}</span>
        <img src={NextIcon} alt="nextIcon" />
      </div>

      <div
        className="flex gap-2  cursor-pointer  font-bold"
        onClick={() => navigate(`/librarynotpaid/stories/${genre}`)}
      >
        <span>{genre}</span>
        <img src={NextIcon} alt="nextIcon" />
      </div>

      <div
        onClick={() => navigate(`/librarynotpaid/stories/${genre}/${id}`)}
        className={`flex gap-2  cursor-pointer ${quiz && "font-bold"} `}
      >
        <span>{title}</span>
        {quiz && <img src={NextIcon} alt="nextIcon" />}
      </div>

      <div className=" cursor-pointer ">
        <span>{quiz}</span>
      </div>
    </div>
  );
};

export default StoriesNav;
