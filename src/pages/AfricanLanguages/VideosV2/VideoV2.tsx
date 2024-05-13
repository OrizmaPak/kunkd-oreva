import { useGetSubCategories } from "@/api/queries";
// import SubButton from "../SubButton";
import { TSubCategory } from "@/api/types";
import CategoryContents from "@/pages/Stories/StoriesV2/CategoryContents";

const VideoV2 = () => {
  const { data } = useGetSubCategories();
  const subCategory = data?.data.data[2]?.sub_categories;
  return (
    <div>
      <div className=" mt-14">
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

export default VideoV2;
