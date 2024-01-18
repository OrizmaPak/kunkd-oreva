import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import InnerWrapper from "../../common/User/InnerWrapper";
import { Route, Routes, useNavigate } from "react-router-dom";

import AfricanBanner from "@/assets/videobanner.png";
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
