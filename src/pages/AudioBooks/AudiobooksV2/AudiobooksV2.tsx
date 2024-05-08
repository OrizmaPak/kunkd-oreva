// // import SubButton from "../SubButton";
// import { TStoryContent } from "@/api/types";
// import { useGetAudioBoks } from "@/api/queries";
// import CardScreenHome from "@/common/User/CardScreenHome";
// import CardHome from "@/common/User/CardHome";
// import { useNavigate } from "react-router-dom";
// import { useInView } from "react-intersection-observer";

// const AudiobooksV2 = () => {
//   //   const { data, isLoading: subIsLoading } = useGetSubCategories();
//   //   const subCategory = data?.data.data[1]?.sub_categories;
//   const { ref, inView } = useInView({});

//   const { data, isLoading, hasNextPage, fetchNextPage } =
//     useGetAudioBoks(inView);
//   // const audioBooks = data?.data?.data.new_audiobook_titles;
//   const allPagesArray = data?.pages?.reduce((prev, current) => {
//     return prev.concat(current?.data?.records);
//   }, []);

//   console.log(
//     "audibooks,",
//     data?.pages.map((el) => el?.data?.records)
//   );

//   const navigate = useNavigate();

//   return (
//     <div>
//       <div ref={ref} className="my-[50px]">
//         <CardScreenHome
//           hasAll
//           data={allPagesArray}
//           header={"General"}
//           isTitled={false}
//           isLoading={isLoading}
//           hasInfiniteScroll
//           hasNextPage={hasNextPage}
//           fetchNextPage={fetchNextPage}
//           card={(props: TStoryContent) => (
//             <CardHome
//               {...props}
//               goTo={() => {
//                 navigate(
//                   `${props?.slug
//                     ?.toLocaleLowerCase()
//                     .replace(/\s/g, "-")}/${props?.name
//                     ?.toLocaleLowerCase()
//                     .replace(/\s/g, "-")}`
//                 );
//               }}
//             />
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default AudiobooksV2;

import { useGetSubCategories } from "@/api/queries";
// import SubButton from "../SubButton";
import { TSubCategory } from "@/api/types";
import CategoryContents from "@/pages/Stories/StoriesV2/CategoryContents";

const AudiobooksV2 = () => {
  const { data } = useGetSubCategories();
  const subCategory = data?.data.data[1]?.sub_categories;
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

export default AudiobooksV2;
