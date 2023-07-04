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
    <div className="py-4 pl-20 font-Recoleta h-[90px] text-[24px]  font-semibold items-center rounded-full bg-white gap-8 flex px-8">
      <div
        className="flex gap-3 cursor-pointer  "
        onClick={() => navigate(`/librarynotpaid/africanlanguages`)}
      >
        <span>{category}</span>
        <img loading="lazy" src={NextIcon} alt="nextIcon" />
      </div>

      <div
        className={`flex gap-3  cursor-pointer  ${
          title ? "text-black" : "text-[#B5B5C3]"
        } `}
        onClick={() => navigate(`/librarynotpaid/africanlanguages/${lanType}`)}
      >
        <span>
          {lanType && lanType?.charAt(0).toUpperCase() + lanType.slice(1)}
        </span>
        {title && <img loading="lazy" src={NextIcon} alt="nextIcon" />}
      </div>

      <div
        className={`flex gap-3  cursor-pointer  ${
          quiz ? "text-black" : "text-[#B5B5C3]"
        }  `}
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
