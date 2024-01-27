import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CardHome from "@/common/User/CardHome";
import InnerWrapper from "../../common/User/InnerWrapper";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import BookLayout from "./BookLayout";
import AudioBanner from "@/assets/audiobanner.png";
import { Skeleton } from "@mantine/core";
import { useGetAudioBoks } from "@/api/queries";
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
            <Route path=":slug/:name" element={<BookLayout />}></Route>
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
  const audioBooks = data?.data?.data.new_audiobook_titles;

  return (
    <>
      <div>
        <hr className="my-20 mx-[200px]" />
        <h1 className="text-center font-bold text-[30px] font-Recoleta mt-10 ">
          Audiobooks
        </h1>
        <p className="text-center text-[18px] text-[#B5B5C3] my-8">
          Whenever they request a new bedtime audiobooks
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-5 gap-14 pad-x-40 py-10">
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
                  </div>
                </Skeleton>
              ))}
          {audioBooks?.map((audiobook: TAudioBooks, index: number) => {
            return (
              <>
                <CardHome
                  key={index}
                  {...audiobook}
                  goTo={() =>
                    navigate(
                      `${audiobook?.slug?.replace(/\s/g, "_").toLowerCase()}`
                    )
                  }
                />
              </>
            );
          })}
        </div>
      </div>
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
