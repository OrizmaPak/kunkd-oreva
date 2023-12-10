import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import InnerWrapper from "../../common/User/InnerWrapper";
import { Route, Routes, useNavigate } from "react-router-dom";

import AfricanBanner from "@/assets/africanlanBanner.svg";
import Videos from "./Videos";
import VideoPlayer from "./VideoPlayer";
// import Quiz from "./Quiz";
import { useGetSubCategories } from "@/api/queries";
import { Skeleton } from "@mantine/core";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
  videoBook?: string;
  lanType?: string[];
};
// export const africanLanguagesData: StoriesType[] = [
//   {
//     title: "Bedtime Stories",
//     videoBook: VideoBook1,
//     image: Chisomcard,
//     range: 56,
//     id: "1",
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     genre: ["Bedtime", "Inventors", "Folk Tales"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: "Fairy Tails Stories",
//     image: Gorillacard,
//     videoBook: VideoBook1,
//     range: 80,
//     id: "2",
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     genre: ["Life & Growing up", "Inventors", "Inspiring Leaders"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: "Money Smarts",
//     image: Mamacard,
//     videoBook: VideoBook1,
//     range: 86,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "3",
//     genre: ["Life & Growing up", "Fairy Tales", "Inspiring Leaders"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: "Sports",
//     image: Puffcard,
//     videoBook: VideoBook1,
//     range: 56,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "4",
//     genre: ["Bedtime", "Fairy Tales", "Folk Tales"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: " Leaders",
//     image: Chisomcard,
//     videoBook: VideoBook1,
//     range: 70,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "5",
//     genre: ["Sport", "Finance", "Money smart"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: "Inspiring Leaders",
//     image: Earniing2card,
//     videoBook: VideoBook1,
//     range: 56,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "6",
//     genre: ["Sport", "Inventors", "Inspiring Leaders"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: "Inspiring Leaders",
//     image: Earningcard,
//     videoBook: VideoBook1,
//     range: 66,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "7",
//     genre: ["Sport", "Bedtime", "Folk Tales"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: "Sports",
//     image: Dancercard,
//     videoBook: VideoBook1,
//     range: 90,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "8",
//     genre: ["Life & Growing up", "Bedtime", "Money smart"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: "Afam",
//     image: Afamcard,
//     videoBook: VideoBook1,
//     range: 36,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "9",
//     genre: ["Life & Growing up", "Bedtime", "Money smart"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: "African Leaders",
//     image: Africancard,
//     videoBook: VideoBook1,
//     range: 56,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "10",
//     genre: ["Life & Growing up", "Bedtime", "Money smart"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     title: " Leaders",
//     image: Caterpillercard,
//     videoBook:
//       "blob:https://www.youtube.com/c51ca6f1-9572-43f0-8509-b0f0f415f2a3",
//     range: 86,
//     lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
//     id: "11",
//     genre: ["Sport", "Finance", "Money smart"],
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum laborum  sit amet consectetur adipisicing elit. Rerum cum lacommodi repellendus perspiciatis voluptatem iusto consectetur, asperiores natus hic.,",

//     overView:
//       "Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, error est eum adipisci repellendus necessitatibus omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
// ];

type TSubVideo = {
  id: number;
  name: string;
  slug: string;
  image: string;
  short_link: string;
};

const AfricanLanguagess = () => {
  return (
    <>
      <Wrapper bgColor="#fff7fd">
        <InnerWrapper>
          <Routes>
            <Route index element={<LanguagesVideo />}></Route>
            <Route path=":lan_type" element={<Videos />}></Route>
            <Route path=":lan_type/:title" element={<VideoPlayer />}></Route>
            {/* <Route path=":lan_type/:title/:id/quiz" element={<Quiz />}></Route> */}
          </Routes>
        </InnerWrapper>
      </Wrapper>
    </>
  );
};
export default AfricanLanguagess;

const LanguagesVideo = () => {
  // const params = useParams();
  const { data, isLoading } = useGetSubCategories();
  const subCategory = data?.data.data[2].sub_categories;
  return (
    <>
      {/* <div className="bg-white rounded-3xl"> */}
      <div className=" ">
        <Hero image={AfricanBanner} />
        <hr className="my-20 mx-[200px]" />
        <h1 className="text-center font-bold text-[30px] font-Recoleta mt-10 ">
          Start Learning!
        </h1>
        <p className="text-center text-[18px] text-[#B5B5C3] my-8">
          Learning a new language is so important...
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-5 gap-8 px-24 py-10 justify-center items-center">
          {isLoading
            ? Array(5)
                .fill(5)
                .map((arr, index) => (
                  <Skeleton visible={true}>
                    <div
                      key={index}
                      className="h-[120px] w-[200px] text-transparent"
                    >
                      {arr}
                    </div>
                  </Skeleton>
                ))
            : subCategory?.map((story: TSubVideo, index: number) => {
                return (
                  <>
                    <VideoCard key={index} {...story} />
                  </>
                );
              })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export const VideoCard = ({ name, image, id }: TSubVideo) => {
  const navigate = useNavigate();
  // const { id: storyType } = useParams();
  const goto = () => {
    if (name) {
      navigate(`${name?.trim().toLocaleLowerCase()}`);
    }
    localStorage.setItem("subCategoryId", id.toString());
  };
  return (
    <div
      onClick={goto}
      className="w-[200px] transition-all hover:scale-[102%]  cursor-pointer "
    >
      <span>
        <LazyLoadImage
          src={image}
          placeholderSrc={AfamBlur}
          effect="blur"
          className=" rounded-xl"
          wrapperClassName=""
          width={200}
          height={100}
        />
        {/* <img src={image} alt="image" /> */}
      </span>
      {/* {title ? (
        <p className="mt-[10px] font-bold font-Hanken">{title}</p>
      ) : null} */}
    </div>
  );
};
