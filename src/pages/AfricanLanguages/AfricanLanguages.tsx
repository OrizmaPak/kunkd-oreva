import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import { CardProps } from "@/common/User/Card";
// import { data } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
// import { DataType } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";

import InnerWrapper from "../../common/User/InnerWrapper";

import { Route, Routes, useNavigate } from "react-router-dom";
// import BookLayout from "./BookLayout";
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
import AfricanBanner from "@/assets/africanlanBanner.svg";
import VideoBook1 from "@/videobooks/videobook1.mp4";

import Yoruba from "@/assets/yoruba.svg";
import Igbo from "@/assets/Igbo.svg";
import Twi from "@/assets/twi.svg";
import Luganda from "@/assets/Luganda.svg";
import Kiswahili from "@/assets/Kiswahili.svg";
import Videos from "./Videos";
import VideoPlayer from "./VideoPlayer";
import Quiz from "./Quiz";

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
export const africanLanguagesData: StoriesType[] = [
  {
    title: "Bedtime Stories",
    videoBook: VideoBook1,
    image: Chisomcard,
    range: 56,
    id: "1",
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 80,
    id: "2",
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 86,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 56,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 70,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 56,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 66,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 90,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 36,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook: VideoBook1,
    range: 56,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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
    videoBook:
      "blob:https://www.youtube.com/c51ca6f1-9572-43f0-8509-b0f0f415f2a3",
    range: 86,
    lanType: ["yourba", "twi", "igbo", "luganda", "kiswahili"],
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

// const subButtons = [
//   {
//     name: " Bedtime",
//   },
//   {
//     name: "Holidays and Celebration",
//   },
//   {
//     name: " Inventors",
//   },
//   {
//     name: " Life & Growing up",
//   },
//   {
//     name: "Folk Tales",
//   },
//   {
//     name: " Inspiring Leaders",
//   },
//   {
//     name: "Finance",
//   },
//   {
//     name: "Money smart",
//   },
//   {
//     name: "Fairy Tales",
//   },
//   {
//     name: "Sport",
//   },
// ];

const languageData = [
  {
    image: Yoruba,
    title: "Yoruba",
  },

  {
    image: Twi,
    title: "Twi",
  },
  {
    image: Luganda,
    title: "Luganda",
  },
  {
    image: Kiswahili,
    title: "Kiswahili",
  },
  {
    image: Igbo,
    title: "Igbo",
  },
];
// const MainStoriesLayout = () => {
//   return (
//     <>
//       <Hero image={AfricanBanner} />
//       <Outlet />
//     </>
//   );
// };

const AfricanLanguagess = () => {
  return (
    <>
      <Wrapper bgColor="#fff7fd">
        <InnerWrapper>
          <Routes>
            <Route index element={<LanguagesVideo />}></Route>
            <Route path=":lan_type" element={<Videos />}></Route>
            <Route path=":lan_type/:id" element={<VideoPlayer />}></Route>
            <Route path=":story_type/:id/quiz" element={<Quiz />}></Route>
          </Routes>
        </InnerWrapper>
      </Wrapper>
    </>
  );
};
export default AfricanLanguagess;

const LanguagesVideo = () => {
  // const params = useParams();
  return (
    <>
      {/* <div className="bg-white rounded-3xl"> */}
      <div>
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
          {languageData.map((story, index) => {
            return (
              <>
                <VideoCard key={index} {...story} size={200} />
              </>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export const VideoCard = ({ title, image, size }: CardProps) => {
  const navigate = useNavigate();
  // const { id: storyType } = useParams();
  const goto = () => {
    if (title) {
      navigate(title?.trim().toLocaleLowerCase());
    }
  };
  return (
    <div
      onClick={goto}
      className="w-[200px]"
      style={{ width: `${size ? size : ""}px` }}
    >
      <span>
        <img
          src={image}
          alt="image"
          style={{ width: `${size ? size : "350px"}px` }}
        />
      </span>
      {/* {title ? (
        <p className="mt-[10px] font-bold font-Hanken">{title}</p>
      ) : null} */}
    </div>
  );
};
