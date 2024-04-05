import NextIcon from "@/assets/nexticon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";

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
  subCategoryId?: number;
  slug?: string;
}) => {
  const [user] = useStore(getUserState);

  const navigate = useNavigate();
  const location = useLocation();
  const contentNavigate = () => {
    if (
      location.pathname ===
        `/${"parent"}/stories/sub/${title
          ?.replace(/\s/g, "-")
          .toLocaleLowerCase()}/quiz` ||
      location.pathname ===
        `/${"school"}/stories/sub/${title
          ?.replace(/\s/g, "-")
          .toLocaleLowerCase()}/quiz`
    ) {
      navigate(-1);
    }
  };
  return (
    <div className="py-4 font-Recoleta pl-20 content-nav text25  font-semibold items-center rounded-full bg-white gap-8 flex pad-x-40">
      <div
        className="flex gap-2 cursor-pointer"
        onClick={() => {
          navigate(`/${user?.role === "user" ? "parent" : "school"}/stories`);
        }}
      >
        <span>
          {category &&
            category?.charAt(0).toUpperCase() + category.substring(1)}
        </span>
        <img loading="lazy" src={NextIcon} alt="nextIcon" />
      </div>

      <div
        className="flex gap-2  cursor-pointer "
        onClick={() => {
          navigate(`/${user?.role === "user" ? "parent" : "school"}/stories`);
        }}
      >
        <span>{genre}</span>
        <img loading="lazy" src={NextIcon} alt="nextIcon" />
      </div>

      <div
        onClick={contentNavigate}
        className={`flex gap-2  cursor-pointer text-[#B5B5C3] ${
          quiz && "text-black"
        } `}
      >
        <span>{title}</span>
        {quiz && <img loading="lazy" src={NextIcon} alt="nextIcon" />}
      </div>

      <div className=" cursor-pointer">
        <span className="text-[#B5B5C3]"> {quiz}</span>
      </div>
    </div>
  );
};

export default StoriesNav;
