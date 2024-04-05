// import AfricanLanguagesNav from "./AfricanLanguagesNav";
import CardHome from "@/common/User/CardHome";
import { useGetContebtBySubCategories2 } from "@/api/queries";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import { useState } from "react";
import { Pagination } from "@mantine/core";
import "./video.css";
import Wrapper from "@/common/User/Wrapper";
import { IoMdArrowRoundBack } from "react-icons/io";

import InnerWrapper from "@/common/User/InnerWrapper";

const Videos = () => {
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);

  const subCategoryId = sessionStorage.getItem("subId");
  const { data, isLoading, refetch } = useGetContebtBySubCategories2(
    subCategoryId as string,
    activePage.toString() as string
  );
  const subCategoryContents = data?.data.records as {
    thumbnail: string;
    id: number;
    name: string;
    sub_category_name: string;
    slug: string;
  }[];
  const totalPage = Math.ceil(data?.data.totalRecord / 10);
  return (
    <>
      <Wrapper bgColor="#fff7fd">
        <InnerWrapper>
          {/* <div className="bg-[#fff7fd] video-container "> */}
          <div className="mt-5  p-5 pt-10 rounded-3xl flex flex-col bg-white  flex-grow">
            <div className="px-10 cursor-pointer">
              <IoMdArrowRoundBack size={35} onClick={() => navigate(-1)} />
            </div>
            <h1 className="text-[32px] font-semibold font-Hanken text-center">
              {subCategoryContents && subCategoryContents[0]?.sub_category_name}
            </h1>

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
                        navigate(
                          `../languages/${data.sub_category_name}/${data.name}`
                        )
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
          {/* </div> */}
        </InnerWrapper>
      </Wrapper>
    </>
  );
};

export default Videos;
