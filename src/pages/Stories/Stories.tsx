import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CardHome, { CardProps } from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
import Banner from "@/assets/banner5.svg";
import InnerWrapper from "../../common/User/InnerWrapper";
import Button from "@/components/Button";
import GroupCard from "@/assets/groupcard.svg";
import {
  Route,
  Routes,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import Stories1 from "./Stories1/Stories1";
import "./stories.css";
import Quiz from "./Stories1/Quiz";
import { Skeleton } from "@mantine/core";
import { useState } from "react";
import {
  useGetSubCategories,
  useGetContebtBySubCategories,
  useContentForHome,
} from "@/api/queries";
import { TStoryContent } from "./Stories1/Stories1";
import { Pagination } from "@mantine/core";

export type StoriesType = {
  title?: string;
  image?: string;
  range?: number;
  id?: string;
  genre?: string[];
  author?: string;
  aboutAuthor?: string;
  overView?: string;
  content?: string;
  audioBook?: string;
};

const MainStoriesLayout = () => {
  return (
    <>
      <Hero image={Banner} />
      <Outlet />
    </>
  );
};

const Stories = () => {
  return (
    <div>
      <Wrapper bgColor="#fff7fd">
        <InnerWrapper>
          <Routes>
            <Route element={<MainStoriesLayout />}>
              <Route index element={<BrowseGenre />}></Route>
              <Route path=":subCategory" element={<Story />}></Route>
              {/* <Route path=":subCategory/:id" element={<Story />}></Route> */}
            </Route>
            <Route path="sub/:title" element={<Stories1 />}></Route>
            {/* <Route path=":theme/:id/:title" element={<Stories1 />}></Route> */}

            <Route path="sub/:title/quiz" element={<Quiz />}></Route>
          </Routes>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};
export default Stories;

const Story = () => {
  const [activePage, setPage] = useState(1);
  const { subCategory } = useParams();
  const navigate = useNavigate();
  const subCategoryId = localStorage.getItem("subCategoryId");
  const { data, isLoading, refetch } = useGetContebtBySubCategories(
    subCategoryId!,
    activePage.toString()
  );
  const subCategoryContents = data?.data.data.records;
  const totalPage = Math.ceil(data?.data.data.totalRecord / 10);
  return (
    <>
      <div>
        <hr className="my-20 mx-[200px]" />
        <h1 className="text-center font-bold text30 font-Recoleta mt-10 ">
          {subCategory &&
            subCategory?.charAt(0).toUpperCase() +
              subCategory.substring(1).replace(/-/g, " ")}{" "}
          Stories
        </h1>
        <p className="text-center text1 text-[#B5B5C3] my-8">
          Whenever they request a new bedtime story
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-5 gap-8 gap-y-12 pad-x-40 py-10">
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
            : subCategoryContents.map((story: TStoryContent, index: number) => {
                return (
                  <>
                    {
                      <CardHome
                        key={index}
                        {...story}
                        goTo={() => {
                          navigate(
                            `../sub/${story
                              ?.slug!.toLocaleLowerCase()
                              .replace(/\s/g, "_")}`
                          );
                        }}
                      />
                    }
                  </>
                );
              })}
        </div>
      </div>
      {totalPage > 1 && (
        <div className="px-10  mr-2 flex justify-end ">
          <Pagination
            total={totalPage}
            value={activePage}
            defaultChecked={true}
            onChange={setPage}
            onClick={() => {
              console.log(activePage);
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
    </>
  );
};

type TSubCategory = {
  id: number;
  image: string;
  name: string;
  short_link: string;
  slug: string;
};

const BrowseGenre = () => {
  const navigate = useNavigate();
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const { data, isLoading: subIsLoading } = useGetSubCategories();
  const subCategory = data?.data.data[0].sub_categories;
  const { data: contentData, isLoading } = useContentForHome();
  const newTrending: CardProps[] & TStoryContent[] =
    contentData?.data.data.trending_stories;
  return (
    <>
      <hr className="my-20 mx-[200px]" />

      <div>
        <h1 className="text-center font-bold text30 font-Recoleta my-10 ">
          Browse Genres
        </h1>
      </div>
      <div className="flex justify-center items-center my-14">
        <div className="flex flex-wrap justify-center items-center  max-w-[900px]  gap-x-8 gap-y-4">
          {subIsLoading
            ? Array(10)
                .fill(1)
                .map((arr, index) => (
                  <Skeleton
                    height={40}
                    width={180}
                    key={index}
                    visible={subIsLoading}
                  >
                    {arr}
                  </Skeleton>
                ))
            : subCategory?.map((genre: TSubCategory, index: number) => (
                <SubButton
                  onClick={() => navigate(`${genre.slug.toLowerCase()}`)}
                  key={index}
                  name={genre.name}
                  subCategoryId={genre.id.toString()}
                />
              ))}
        </div>
      </div>

      <div className="mb-[76px]">
        <CardScreenHome
          data={newTrending}
          header="Stories we love"
          actiontitle=""
          isTitled={false}
          isLoading={isLoading}
          card={(props: TStoryContent) => (
            <CardHome
              {...props}
              goTo={() =>
                navigate(
                  `sub/${props?.slug?.replace(/\s/g, "_")!?.toLowerCase()}`
                )
              }
            />
          )}
        />
      </div>

      <Skeleton visible={isLoadingImage}>
        <div
          style={{
            background:
              "linear-gradient(280.43deg, #8530C1 0.5%, #000000 173.5%)",
          }}
          className="h-[495px] grid grid-cols-[500px_1fr] mb-[50px] max-w-[1156px] relative rounded-2xl mx-auto object-cover "
        >
          <img
            src={GroupCard}
            alt="card"
            className="absolute stories-hero2  right-0 bottom-0 rounded-3xl "
            onLoad={() => setIsLoadingImage(false)}
          />
          <div className="text-center text-white flex flex-col gap-3 justify-center items-center">
            <h1 className="text30 font-bold ">New Story Titles</h1>
            <p className="mb-10 text2">
              We published new audiobook just for you
            </p>
            <Button size="md" color="black" backgroundColor="white">
              See books
            </Button>
          </div>
          <div></div>
        </div>
      </Skeleton>

      <div>
        <h1 className="mb-4 font-bold font-Recoleta mt-20 text-center text-[40px]">
          Trending Now
        </h1>
        <p className="text-center text-[18px] text-[#B5B5C3]">
          See what peole are reading
        </p>
      </div>

      <CardScreenHome
        data={newTrending}
        header=""
        actiontitle=""
        isTitled={false}
        isLoading={isLoading}
        card={(props: TStoryContent) => (
          <CardHome
            {...props}
            goTo={() =>
              navigate(`sub/${props.slug?.toLowerCase().toLocaleLowerCase()}`)
            }
          />
        )}
      />
    </>
  );
};

const SubButton = ({
  name,
  onClick,
  subCategoryId,
}: {
  name: string;
  onClick?: () => void;
  subCategoryId: string;
}) => {
  const handleClick = () => {
    if (onClick) onClick();
    localStorage.setItem("subCategoryId", subCategoryId);
  };
  return (
    <button
      onClick={handleClick}
      className="py-3 my-2 rounded-3xl text3 pad-x-40 bg-[#FFF7FD]"
    >
      {name}
    </button>
  );
};
