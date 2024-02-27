import CardScreenHome from "@/common/User/CardScreenHome";
import { useGetContebtBySubCategories } from "@/api/queries";
import CardHome from "@/common/User/CardHome";
import { useNavigate } from "react-router-dom";
import { TStoryContent } from "@/api/types";
import { useInView } from "react-intersection-observer";

const CategoryContents = ({ id, title }: { id: string; title: string }) => {
  const { ref, inView } = useInView({});
  const navigate = useNavigate();
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useGetContebtBySubCategories(id, inView);
  const allPagesArray = data?.pages?.reduce((prev, current) => {
    return prev.concat(current?.data?.records);
  }, []);

  console.log("story,", data);

  return (
    <div>
      <div ref={ref} className="">
        <CardScreenHome
          data={allPagesArray}
          header={title}
          isTitled={false}
          isLoading={isLoading}
          hasInfiniteScroll
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          card={(props: TStoryContent) => (
            <CardHome
              {...props}
              goTo={() => {
                navigate(
                  `${title
                    .split(" ")
                    .join("-")
                    .toLocaleLowerCase()}/${props.slug
                    ?.toLocaleLowerCase()
                    ?.replace(/\s/g, "-")}`
                );
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default CategoryContents;
