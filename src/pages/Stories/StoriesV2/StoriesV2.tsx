import { useGetSubCategories } from "@/api/queries";
import { TSubCategory } from "@/api/types";
import CategoryContents from "./CategoryContents";

const StoriesV2 = () => {
  const { data } = useGetSubCategories();
  const subCategory = data?.data.data[0].sub_categories;
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
