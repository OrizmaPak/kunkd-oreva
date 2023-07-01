import NextIcon from "@/assets/nexticon.svg";
// import { space } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const AfricanLanguagesNav = ({
  category,
  lanType,
  title,
  quiz,
}: {
  category?: string;
  lanType?: string;
  title?: string;
  quiz?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="py-4 rounded-full bg-white gap-8 flex px-8">
      <div
        className="flex gap-2 cursor-pointer  font-bold"
        onClick={() => navigate(`/librarynotpaid/africanlanguages`)}
      >
        <span>{category}</span>
        <img loading="lazy" src={NextIcon} alt="nextIcon" />
      </div>

      <div
        className={`flex gap-2  cursor-pointer  ${title ? "font-bold" : ""} `}
        onClick={() => navigate(`/librarynotpaid/africanlanguages/${lanType}`)}
      >
        <span>{lanType}</span>
        {title && <img loading="lazy" src={NextIcon} alt="nextIcon" />}
      </div>

      <div
        onClick={() =>
          navigate(`/librarynotpaid/africanlanguages/${lanType}/${title}`)
        }
        className={`flex gap-2  cursor-pointer  ${quiz ? "font-bold" : ""}  `}
      >
        {title && <span>{title}</span>}
        {quiz && <img loading="lazy" src={NextIcon} alt="nextIcon" />}
      </div>
      <div className={`flex gap-2  cursor-pointer  `}>
        <span>{quiz}</span>
      </div>
    </div>
  );
};

export default AfricanLanguagesNav;
