// import { Pagination, Skeleton } from "@mantine/core";
import {
  //   useContentForHome,
  //   useGetContebtBySubCategories,
  useGetSubCategories,
} from "@/api/queries";
// import SubButton from "../SubButton";
import { TSubCategory } from "@/api/types";
// import { useNavigate } from "react-router-dom";
import CategoryContents from "./CategoryContents";

const StoriesV2 = () => {
  const { data } = useGetSubCategories();
  const subCategory = data?.data.data[0].sub_categories;
  //   const navigate = useNavigate();
  return (
    <div>
      <div>
        {subCategory?.map((sub: TSubCategory) => {
          return (
            <CategoryContents
              key={sub.id}
              id={sub.id.toString()}
              title={sub.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StoriesV2;
