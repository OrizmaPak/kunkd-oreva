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
    <div className="py-4 font-Recoleta pl-20 h-[60px] text-[24px]  font-semibold items-center rounded-full bg-white gap-8 flex px-8">
      <div
        className="flex gap-2 cursor-pointer"
        onClick={() => navigate(`/librarynotpaid/stories`)}
      >
        <span>{category}</span>
        <img loading="lazy" src={NextIcon} alt="nextIcon" />
      </div>

      <div
        className="flex gap-2  cursor-pointer "
        onClick={() => navigate(`/librarynotpaid/stories/${genre}`)}
      >
        <span>{genre}</span>
        <img loading="lazy" src={NextIcon} alt="nextIcon" />
      </div>

      <div
        onClick={() => navigate(`/librarynotpaid/stories/${genre}/${id}`)}
        className={`flex gap-2  cursor-pointer text-[#B5B5C3] ${
          quiz && "text-black"
        } `}
      >
        <span>{title}</span>
        {quiz && <img loading="lazy" src={NextIcon} alt="nextIcon" />}
      </div>

      <div className=" cursor-pointer ">
        <span className="text-[#B5B5C3]"> {quiz}</span>
      </div>
    </div>
  );
};

export default StoriesNav;
