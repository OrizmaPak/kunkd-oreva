import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CardHome, { CardProps } from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
// import { data } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
// import { DataType } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
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
import Chisomcard from "@/assets/Chisomcard.svg";
import Gorillacard from "@/assets/Gorillacard.svg";
import Afamcard from "@/assets/afamcard.svg";
import Africancard from "@/assets/africancard.svg";
import Caterpillercard from "@/assets/caterpillercard.svg";
import Dancercard from "@/assets/dancercard.svg";
import Earniing2card from "@/assets/earniing2card.svg";
import Earningcard from "@/assets/earningcard.svg";
import Mamacard from "@/assets/mamacard.svg";
import Puffcard from "@/assets/puffcard.svg";
import AudioBookOne from "@/audiobooks/QueenMoremi.mp3";
import Quiz from "./Stories1/Quiz";
import { Skeleton } from "@mantine/core";
import { useState } from "react";
import {
  useGetSubCategories,
  useGetContebtBySubCategories,
  useContentForHome,
} from "@/api/queries";
import { TStoryContent } from "./Stories1/Stories1";

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
export const storiesData: StoriesType[] = [
  {
    title: "Bedtime Stories",
    audioBook: AudioBookOne,
    image: Chisomcard,
    range: 56,
    id: "1",
    genre: ["Bedtime", "Inventors", "Folk Tales"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: "Fairy Tails Stories",
    image: Gorillacard,
    audioBook: AudioBookOne,
    range: 80,
    id: "2",
    genre: ["Life & Growing up", "Inventors", "Inspiring Leaders"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: "Money Smarts",
    image: Mamacard,
    audioBook: AudioBookOne,
    range: 86,
    id: "3",
    genre: ["Life & Growing up", "Fairy Tales", "Inspiring Leaders"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: "Sports",
    image: Puffcard,
    audioBook: AudioBookOne,
    range: 56,
    id: "4",
    genre: ["Bedtime", "Fairy Tales", "Folk Tales"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: " Leaders",
    image: Chisomcard,
    audioBook: AudioBookOne,
    range: 70,
    id: "5",
    genre: ["Sport", "Finance", "Money smart"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: "Inspiring Leaders",
    image: Earniing2card,
    audioBook: AudioBookOne,
    range: 56,
    id: "6",
    genre: ["Sport", "Inventors", "Inspiring Leaders"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: "Inspiring Leaders",
    image: Earningcard,
    audioBook: AudioBookOne,
    range: 66,
    id: "7",
    genre: ["Sport", "Bedtime", "Folk Tales"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: "Sports",
    image: Dancercard,
    audioBook: AudioBookOne,
    range: 90,
    id: "8",
    genre: ["Life & Growing up", "Bedtime", "Money smart"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: "Afam",
    image: Afamcard,
    audioBook: AudioBookOne,
    range: 36,
    id: "9",
    genre: ["Life & Growing up", "Bedtime", "Money smart"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: "African Leaders",
    image: Africancard,
    audioBook: AudioBookOne,
    range: 56,
    id: "10",
    genre: ["Life & Growing up", "Bedtime", "Money smart"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    title: " Leaders",
    image: Caterpillercard,
    audioBook: AudioBookOne,
    range: 86,
    id: "11",
    genre: ["Sport", "Finance", "Money smart"],
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

    overView:
      "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
];

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
              <Route path=":subCategory/:id" element={<Story />}></Route>
            </Route>
            <Route path=":theme/:id/:title" element={<Stories1 />}></Route>
            <Route path=":story_type/:id/quiz" element={<Quiz />}></Route>
          </Routes>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};
export default Stories;

const Story = () => {
  const { subCategory, id } = useParams();
  const navigate = useNavigate();
  console.log("Id", id);
  const { data, isLoading } = useGetContebtBySubCategories(id!);
  console.log(data?.data.data.records);
  const subCategoryContents = data?.data.data.records;
  return (
    <>
      <div>
        <hr className="my-20 mx-[200px]" />
        <h1 className="text-center font-bold text-[30px] font-Recoleta mt-10 ">
          {subCategory?.toString()} Stories
        </h1>
        <p className="text-center text-[18px] text-[#B5B5C3] my-8">
          Whenever they request a new bedtime story
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-5 gap-8 px-24 py-10">
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
                        goTo={() =>
                          navigate(
                            `../../${story.category
                              ?.toLowerCase()
                              .trim()}/${story.theme.trim()?.toLowerCase()}/${
                              story.id
                            }/${story.name}`
                          )
                        }
                      />
                    }
                  </>
                );
              })}
        </div>
      </div>
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
  const { data } = useGetSubCategories();
  const subCategory = data?.data.data[0].sub_categories;
  console.log("progressing", data?.data.data[0].sub_categories);
  const { data: contentData, isLoading } = useContentForHome();
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending: CardProps[] = contentData?.data.data.trending_stories;
  console.log("is it working", recommendedStories, newTrending);
  return (
    <>
      <hr className="my-20 mx-[200px]" />

      <div>
        <h1 className="text-center font-bold text-[30px] font-Recoleta my-10 ">
          Browse Genres
        </h1>
      </div>
      <div className="flex justify-center items-center my-14">
        <div className="flex flex-wrap justify-center items-center  max-w-[900px]  gap-x-8 gap-y-4">
          {subCategory &&
            subCategory.map((genre: TSubCategory, index: number) => (
              <SubButton
                onClick={() =>
                  navigate(`${genre.name.toLowerCase()}/${genre.id}`)
                }
                key={index}
                name={genre.name}
              />
            ))}
        </div>
      </div>

      <CardScreenHome
        data={newTrending}
        header="Stories we love"
        actiontitle=""
        isTitled={false}
        isLoading={isLoading}
        card={(props: CardProps) => (
          <CardHome
            {...props}
            goTo={() =>
              navigate(
                `../${props.category?.toLowerCase()}/${props.theme?.toLowerCase()}/${
                  props.id
                }`
              )
            }
          />
        )}
      />
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
            className="absolute w-[700px] right-0 bottom-0 rounded-3xl "
            onLoad={() => setIsLoadingImage(false)}
          />
          <div className="text-center text-white flex flex-col gap-3 justify-center items-center">
            <h1 className="text-[30px] font-bold ">New Story Titles</h1>
            <p className="mb-10">We published new audiobook just for you</p>
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
        card={(props: CardProps) => (
          <CardHome
            {...props}
            goTo={() =>
              navigate(
                `../${props.category?.toLowerCase()}/${props.theme?.toLowerCase()}/${
                  props.id
                }`
              )
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
}: {
  name: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="py-3 my-3 rounded-3xl px-6 bg-[#FFF7FD]"
    >
      {name}
    </button>
  );
};
