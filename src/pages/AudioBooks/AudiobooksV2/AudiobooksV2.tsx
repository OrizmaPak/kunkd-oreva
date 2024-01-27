// import SubButton from "../SubButton";
import { TStoryContent, TSubCategory } from "@/api/types";
import CategoryContents from "@/pages/Stories/StoriesV2/CategoryContents";
import { useGetAudioBoks } from "@/api/queries";
import CardScreenHome from "@/common/User/CardScreenHome";
import CardHome from "@/common/User/CardHome";
import { useNavigate } from "react-router-dom";

const AudiobooksV2 = () => {
  //   const { data, isLoading: subIsLoading } = useGetSubCategories();
  //   const subCategory = data?.data.data[1]?.sub_categories;
  const { data, isLoading } = useGetAudioBoks();
  const audioBooks = data?.data?.data.new_audiobook_titles;

  const navigate = useNavigate();

  return (
    <div>
      <div className="my-[50px]">
        <CardScreenHome
          data={audioBooks}
          header="General"
          actiontitle=""
          isLoading={isLoading}
          isTitled={false}
          card={(props: TStoryContent) => (
            <CardHome
              {...props}
              goTo={() => {
                navigate(
                  `${props?.slug
                    ?.toLocaleLowerCase()
                    .replace(/\s/g, "-")}/${props?.name
                    ?.toLocaleLowerCase()
                    .replace(/\s/g, "-")}`
                );
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AudiobooksV2;
