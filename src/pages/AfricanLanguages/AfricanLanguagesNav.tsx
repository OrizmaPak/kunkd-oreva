import NextIcon from "@/assets/nexticon.svg";
// import { space } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const AfricanLanguagesNav = ({
  // category,
  lanType,
  title,
  quiz,
  subCategoryId,
  subCategoryName,
}: {
  category?: string;
  lanType?: string;
  title?: string;
  quiz?: string;
  subCategoryId?: string;
  subCategoryName?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="py-4 pl-20 font-Recoleta content-nav text-[24px]  font-semibold items-center rounded-full bg-white gap-8 flex px-8">
      <div
        className="flex gap-3 cursor-pointer  "
        onClick={() => navigate(`../../africanlanguages`)}
      >
        <span>African Languages</span>
        <img loading="lazy" src={NextIcon} alt="nextIcon" />
      </div>

      <div
        className={`flex gap-3  cursor-pointer  ${
          title ? "text-black" : "text-[#B5B5C3]"
        } `}
        onClick={() => {
          {
            subCategoryName &&
              navigate(`../../africanlanguages/${subCategoryName}`);
          }
          {
            subCategoryId &&
              localStorage.setItem("subCategoryId", subCategoryId?.toString()!);
          }
        }}
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
