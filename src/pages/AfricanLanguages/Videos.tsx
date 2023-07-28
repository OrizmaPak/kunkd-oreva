import { useParams } from "react-router-dom";
import AfricanLanguagesNav from "./AfricanLanguagesNav";
// import { africanLanguagesData } from "./AfricanLanguages";
import CardHome from "@/common/User/CardHome";
import { useGetContebtBySubCategories } from "@/api/queries";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mantine/core";

const Videos = () => {
  const navigate = useNavigate();
  const { lan_type, id } = useParams();
  const { data, isLoading } = useGetContebtBySubCategories(id!);
  console.log(data?.data.data.records);
  const subCategoryContents = data?.data.data.records as {
    thumbnail: string;
    id: number;
    name: string;
  }[];
  return (
    <div className="bg-[#fff7fd] ">
      <AfricanLanguagesNav category="Africanlanguages" lanType={lan_type} />

      <div className="mt-5 bg-white p-5 pt-20 rounded-3xl">
        <h1 className="text-[32px] font-semibold font-Recoleta text-center">
          Learn{" "}
          {lan_type && lan_type?.charAt(0).toUpperCase() + lan_type.slice(1)} -
          with videos created for you
        </h1>
        <p className="text-center text-[#B5B5C3] text-[18px] my-5">
          Learning a new language is so important...
        </p>
        <hr className="my-16 mx-20" />
        <div className="grid grid-cols-5 gap-5 px-20 mt-10">
          {isLoading
            ? Array(10)
                .fill(5)
                .map((arr, index) => (
                  <Skeleton visible={true}>
                    <div
                      key={index}
                      className="h-[200px] w-[200px] text-transparent"
                    >
                      {arr}
                    </div>
                  </Skeleton>
                ))
            : subCategoryContents?.map((data, index) => (
                <CardHome
                  key={index}
                  {...data}
                  goTo={() =>
                    navigate(`../${lan_type}/${data.name}/${data.id}`)
                  }
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
