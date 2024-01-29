import NextIcon from "@/assets/nexticon.svg";
// import { space } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
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
  const [user] = useStore(getUserState);

  return (
    <div className="py-4 pl-20 font-Recoleta content-nav text-[24px]  font-semibold items-center rounded-full bg-white gap-8 flex px-8">
      <div
        className="flex gap-3 cursor-pointer  "
        onClick={() => {
          navigate(`/${user?.role === "user" ? "parent" : "school"}/languages`);
        }}
      >
        <span>African Languages</span>
        <img loading="lazy" src={NextIcon} alt="nextIcon" />
      </div>

      <div
        className={`flex gap-3  cursor-pointer  ${
          title ? "text-black" : "text-[#B5B5C3]"
        } `}
        onClick={() => {
          navigate(`/${user?.role === "user" ? "parent" : "school"}/languages`);
        }}
      >
        <span className="">
          {lanType &&
            lanType?.split("-")?.join(" ")?.charAt(0).toUpperCase() +
              lanType.slice(1)}
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
