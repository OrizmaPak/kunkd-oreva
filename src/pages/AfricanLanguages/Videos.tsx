import { useParams } from "react-router-dom";
import AfricanLanguagesNav from "./AfricanLanguagesNav";
import CardHome from "@/common/User/CardHome";
import { useGetContebtBySubCategories } from "@/api/queries";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import { useState } from "react";
import { Pagination } from "@mantine/core";
import "./video.css";

const Videos = () => {
  const navigate = useNavigate();
  const { lan_type } = useParams();
  const [activePage, setPage] = useState(1);

  const subCategoryId = localStorage.getItem("subCategoryId");
  const { data, isLoading, refetch } = useGetContebtBySubCategories(
    subCategoryId as string
  );
  const subCategoryContents = data?.pages?.[0].data.records as {
    thumbnail: string;
    id: number;
    name: string;
    sub_category_name: string;
    slug: string;
  }[];
  const totalPage = Math.ceil(data?.pages?.[0].data.totalRecord / 10);
  return (
    <>
      <div className="bg-[#fff7fd] video-container ">
        <AfricanLanguagesNav category="Africanlanguages" lanType={lan_type} />

        <div className="mt-5  p-5 pt-20 rounded-3xl flex flex-col bg-white  flex-grow">
          <h1 className="text-[32px] font-semibold font-Recoleta text-center">
            Learn{" "}
            {lan_type && lan_type?.charAt(0).toUpperCase() + lan_type?.slice(1)}{" "}
            with videos created for you
          </h1>
          <p className="text-center text-[#B5B5C3] text-[18px] my-5">
            Learning a new language is so important...
          </p>
          <hr className="mt-[46px] mx-20" />
          <div className="grid grid-cols-5 gap-5 gap-y-12  pad-x-40 mt-10 py-10">
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
                      navigate(`../${data.sub_category_name}/${data.name}`)
                    }
                  />
                ))}
          </div>

          {totalPage > 1 && (
            <div className="px-10 mr-2 flex justify-end mt-10  justify-self-end  ">
              <Pagination
                total={totalPage}
                value={activePage}
                defaultChecked={true}
                onChange={setPage}
                onClick={() => {
                  refetch();
                }}
                styles={() => ({
                  control: {
                    "&[data-active]": {
                      backgroundColor: "#8530C1 !important",
                    },
                  },
                })}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Videos;
