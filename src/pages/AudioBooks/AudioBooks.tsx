import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CardHome from "@/common/User/CardHome";
import InnerWrapper from "../../common/User/InnerWrapper";

import {
  Route,
  Routes,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import BookLayout from "./BookLayout";
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
import AudioBanner from "@/assets/audiobanner.svg";
// import TimeIcon from "@/assets/timeIcon.svg";
// import PlayIcon from "@/assets/play.svg";
// import Slider from "react-slick";
import { Skeleton } from "@mantine/core";
// import { useState } from "react";
import { useGetAudioBoks } from "@/api/queries";
// import { useNavigate } from "react-router-dom";

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
export const audioBooksData: StoriesType[] = [
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
      <Hero image={AudioBanner} />
      <Outlet />
    </>
  );
};

const AudioBooks = () => {
  return (
    <div>
      <Wrapper bgColor="#fff7fd">
        <InnerWrapper>
          <Routes>
            <Route element={<MainStoriesLayout />}>
              <Route index element={<Books />}></Route>
            </Route>
            <Route path="audiobooks/:id" element={<BookLayout />}></Route>
          </Routes>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};
export default AudioBooks;

type TAudioBooks = {
  id: number;
  name: string;
  slug: string;
  theme: string;
  thumbnail: string;
};

const Books = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useGetAudioBoks();
  console.log("____testing", data?.data?.data.new_audiobook_titles);
  const audioBooks = data?.data?.data.new_audiobook_titles;

  return (
    <>
      {/* <div className="bg-white rounded-3xl"> */}
      <div>
        {/* <Hero image={AudioBanner} /> */}
        <hr className="my-20 mx-[200px]" />
        <h1 className="text-center font-bold text-[30px] font-Recoleta mt-10 ">
          Audiobooks
        </h1>
        <p className="text-center text-[18px] text-[#B5B5C3] my-8">
          Whenever they request a new bedtime audiobooks
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-5 gap-8 px-24 py-10">
          {isLoading &&
            Array(10)
              .fill(1)
              .map((arr, index) => (
                <Skeleton visible={isLoading}>
                  <div
                    key={index}
                    className="h-[200px] w-[200px] text-transparent"
                  >
                    {arr}
                  </div>{" "}
                </Skeleton>
              ))}
          {audioBooks?.map((audiobook: TAudioBooks, index: number) => {
            return (
              <>
                <CardHome
                  key={index}
                  {...audiobook}
                  goTo={() => navigate(`audiobooks/${audiobook?.id}`)}
                />
              </>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

// const SubButton = ({
//   name,
//   onClick,
// }: {
//   name: string;
//   onClick?: () => void;
// }) => {
//   return (
//     <button onClick={onClick} className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
//       {name}
//     </button>
//   );
// };

// const AudioBookSliderCard = ({
//   image,
//   title,
//   author,
// }: {
//   image?: string;
//   title?: string;
//   author?: string;
// }) => {
//   return (
//     <div className="bg-[#8530C1]  rounded-3xl py-8 flex gap-8 mx-5  px-3 ">
//       <div>
//         <img loading="lazy" src={image} alt="" />
//       </div>
//       <div className="flex flex-col text-[#D190FF] flex-grow">
//         <p className="font-bold text-[12px]">AUDIOBOOK</p>
//         <p className="font-bold text-white text-[18px]">{title}</p>
//         <p className="flex-grow text-[14px]">by {author}</p>
//         <p className="flex text-[12px]">
//           <img loading="lazy" src={TimeIcon} alt="timeicon" />
//           <span>10 minutes and 33 seconds</span>
//         </p>
//       </div>
//       <div className=" flex items-end">
//         <p className="flex justify-center items-end">
//           <img loading="lazy" src={PlayIcon} alt="play" />
//         </p>
//       </div>
//     </div>
//   );
// };
