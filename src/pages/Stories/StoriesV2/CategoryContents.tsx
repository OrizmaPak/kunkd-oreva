import React from "react";
import CardScreenHome from "@/common/User/CardScreenHome";
import { useGetContebtBySubCategories } from "@/api/queries";
import { useState, useEffect } from "react";
import CardHome from "@/common/User/CardHome";
import { useNavigate } from "react-router-dom";
import { TStoryContent } from "@/api/types";
const CategoryContents = ({ id, title }: { id: string; title: string }) => {
  const navigate = useNavigate();
  const [allSubCategoryContents, setAllSubCategoryContents] = useState<
    TStoryContent[]
  >([]);

  const { data, isLoading, hasNextPage, fetchNextPage } =
    useGetContebtBySubCategories(id);
  const allPagesArray = data?.pages?.reduce((prev, current) => {
    return prev.concat(current?.data?.records);
  }, []);

  // console.log("allPagesArrays", allPagesArray);
  // const allSubCategoryContents: TStoryContent[] = data?.data.data.records;

  // if (activePage < Math.ceil(data?.data.data.totalRecord / 10)) {
  //   setAllSubCategoryContents((prev) => {
  //     return [...prev, ...(data?.data.data.records || [])];
  //   });
  //   setPage((prev) => prev++);
  // } else {
  //   return;
  // }

  return (
    <div>
      <div className="">
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
