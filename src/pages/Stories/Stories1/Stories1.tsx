import StoriesNav from "./StoriesNav";
import { useParams, useNavigate } from "react-router-dom";
import CardScreenHome from "@/common/User/CardScreenHome";
import CardHome, { CardProps } from "@/common/User/CardHome";
import Bookmark from "@/assets/Bookmark.svg";
import ArrowDown from "@/assets/arrowdown.svg";
import PreviousIcon from "@/assets/chevrondown.svg";
import NextIcon from "@/assets/chevronup.svg";
import { useState, useRef } from "react";
import FastForward from "@/assets/fastforward.svg";
import FastBackward from "@/assets/fastbackward.svg";
import PauseIcon from "@/assets/pause.svg";
import PlayIcon from "@/assets/play.svg";
import Congrats from "@/assets/congrats.svg";
import { useGetContentById, useContentForHome } from "@/api/queries";
import { getUserState } from "@/store/authStore";
import useStore from "@/store";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type TContentPage = {
  audio: string;
  web_body: string;
  content_media_id: number;
  image: string;
  name: string;
  page_number: number;
};
export type TStoryContent = {
  category: string;
  category_id: number;
  content_type: string;
  content_type_id: number;
  has_quiz: boolean;
  id: number;
  is_liked: boolean;
  media: string[];
  media_type: string;
  name: string;
  pages: TContentPage[];
  short_link: string;
  slug: string;
  synopsis: string;
  tags: string;
  theme: string;
  thumbnail: string;
};

// const data = [
//   {
//     id: 1,
//     image: Poster1,
//     title: "Chisom's Eco-Friendly Visit",
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis perspiciatis aliquam, atque excepturi nemo harum, nulla doloremque nisi distinctio provident impedit sint odit? Asperiores, quod excepturi vel aliquam, dignissimos doloribus at magnam ducimus doloremque voluptate possimus officia aperiam repellat blanditiis omnis alias qui provident, ut deleniti assumenda aliquid! Facere, reprehenderit. ",

//     overview:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem facere suscipit, quidem fuga quaerat illum temporibus ut, magni explicabo molestiae in ullam? Nam voluptatem excepturi minima sunt. Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     id: 2,
//     image: Poster1,
//     title: "Chisom's Eco-Friendly Visit",
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis perspiciatis aliquam, atque excepturi nemo harum, nulla doloremque nisi distinctio provident impedit sint odit? Asperiores, quod excepturi vel aliquam, dignissimos doloribus at magnam ducimus doloremque voluptate possimus officia aperiam repellat blanditiis omnis alias qui provident, ut deleniti assumenda aliquid! Facere, reprehenderit. ",

//     overview:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem facere suscipit, quidem fuga quaerat illum temporibus ut, magni explicabo molestiae in ullam? Nam voluptatem excepturi minima sunt. Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     id: 3,
//     image: Poster1,
//     title: "Chisom's Eco-Friendly Visit",
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis perspiciatis aliquam, atque excepturi nemo harum, nulla doloremque nisi distinctio provident impedit sint odit? Asperiores, quod excepturi vel aliquam, dignissimos doloribus at magnam ducimus doloremque voluptate possimus officia aperiam repellat blanditiis omnis alias qui provident, ut deleniti assumenda aliquid! Facere, reprehenderit. ",

//     overview:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem facere suscipit, quidem fuga quaerat illum temporibus ut, magni explicabo molestiae in ullam? Nam voluptatem excepturi minima sunt. Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
//   {
//     id: 4,
//     image: Poster1,
//     title: "Chisom's Eco-Friendly Visit",
//     author: "Dele and Louisa Olatuyi",
//     aboutAuthor:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis perspiciatis aliquam, atque excepturi nemo harum, nulla doloremque nisi distinctio provident impedit sint odit? Asperiores, quod excepturi vel aliquam, dignissimos doloribus at magnam ducimus doloremque voluptate possimus officia aperiam repellat blanditiis omnis alias qui provident, ut deleniti assumenda aliquid! Facere, reprehenderit. ",

//     overview:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem facere suscipit, quidem fuga quaerat illum temporibus ut, magni explicabo molestiae in ullam? Nam voluptatem excepturi minima sunt. Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
//   },
// ];
const Stories1 = () => {
  const [isFinish, setIsFinish] = useState(false);
  const [startRead, setStartRead] = useState(false);
  const [user] = useStore(getUserState);

  const params = useParams();
  const { category, theme, id } = params;

  // const story = storiesData.find((el) => `${el.id}` === id);
  const { data } = useGetContentById(
    id?.toString()!,
    user?.user_id?.toString()!
  );
  const content = data?.data.data;
  console.log(content);
  const { data: recommendedData, isLoading } = useContentForHome();
  const recommendedStories = recommendedData?.data.data.recommended_stories;
  const navigate = useNavigate();
  console.log(
    "------SubCat-------"
    // content.sub_categories[0].sub_category_id!
  );
  return (
    <div className=" ">
      <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd] ">
        {/* <div className="flex flex-col h-full"> */}

        <div className=" ">
          {content && (
            <StoriesNav
              category={category}
              genre={content.sub_categories[0].sub_category_name!}
              title={content.name}
              subCategoryId={content.sub_categories[0].sub_category_id!}
            />
          )}
        </div>
        <div className="flex-grow  h-full ">
          <div className="flex-grow mt-5 rounded-2xl">
            {!isFinish ? (
              <div className="flex h-full  gap-4  flex-grow-1 flex-col ">
                {!startRead && (
                  <AboutPage
                    story={content}
                    setStartRead={() => setStartRead(true)}
                  />
                )}

                {content && startRead && (
                  <ReadPage
                    thumbnail={content.thumbnail}
                    content={content.pages}
                    setIsFinish={() => setIsFinish(true)}
                  />
                )}

                <div className="w-full bg-white rounded-3xl mt-4">
                  {
                    <CardScreenHome
                      data={recommendedStories}
                      isLoading={isLoading}
                      header="Recommended For You"
                      isTitled={false}
                      card={(props: CardProps) => (
                        <CardHome
                          {...props}
                          goTo={() => {
                            navigate(
                              `../../${props.category?.toLowerCase()}/${props.theme?.toLowerCase()}/${
                                props.id
                              }`
                            );
                            setStartRead(false);
                          }}
                        />
                      )}
                    />
                  }
                </div>
              </div>
            ) : (
              <WelDone />
            )}
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default Stories1;

const AboutPage = ({
  story,
  setStartRead,
}: {
  story: TStoryContent;
  setStartRead: () => void;
}) => {
  return (
    <div className="bg-[#5D0093]  w-[100%] flex rounded-3xl px-10 py-5">
      <div className="flex basis-full gap-2  border-r-2 justify-center items-center border-[#BD6AFA]  ">
        <p className="flex flex-col w-full">
          {story ? (
            <LazyLoadImage
              src={story?.thumbnail}
              placeholderSrc={AfamBlur}
              effect="blur"
              className="rounded-2xl"
              wrapperClassName=""
              width={300}
              height={300}
            />
          ) : (
            <LazyLoadImage
              placeholderSrc={AfamBlur}
              effect="blur"
              className="rounded-2xl"
              wrapperClassName=""
              width={300}
              height={300}
            />
          )}
        </p>
        <p className="flex flex-col w-full  ">
          <span className="font-bold font-Recoleta text-white text-[24px]">
            {story?.name}
          </span>
          <span className="mt-4 text-[#BD6AFA]  ">Dele and Louisa Olafuyi</span>
          <p className="mt-40 flex gap-4">
            <button
              onClick={setStartRead}
              className="px-16 py-3 border text-white border-white rounded-3xl"
            >
              Read
            </button>
            <img loading="lazy" src={Bookmark} alt="bookmark" />
          </p>
        </p>
      </div>
      <div className=" basis-3/4 text-[#BD6AFA] px-10">
        <div>
          <h1 className="text-white font-bold  font-Hanken text-[25px] my-4">
            About the author
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
            at ullam incidunt maiores ut officiis adipisci in quod accusamus
            fugit. Quia illum, inventore id tempora recusandae ut consectetur
            veniam reiciendis.
          </p>
        </div>
        <div>
          <h1 className="text-white font-bold  font-Hanken text-[25px] my-4">
            Overview
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            harum eligendi cupiditate labore possimus deleniti fugit consequatur
            ducimus in eum, ullam voluptate eveniet accusantium reprehenderit
            magni qui. Aliquam, quia reiciendis!
          </p>
        </div>
      </div>
    </div>
  );
};

const ReadPage = ({
  content,
  setIsFinish,
  thumbnail,
}: {
  content: TContentPage[];
  setIsFinish: () => void;
  thumbnail: string;
}) => {
  const [isReading, setIsReading] = useState(false);
  const [page, setPage] = useState(0);
  const pageTotal = content.length - 1;
  const customScrollbarStyle = {
    WebkitScrollbar: {
      width: "10px",
    },
  };
  return (
    <div className="flex py-16 bg-white  rounded-3xl px-16">
      <div className=" basis-3/4 flex  items-center">
        <img
          loading="lazy"
          src={thumbnail}
          alt="image"
          className="w-[400px] rounded-xl"
        />
      </div>
      <div className=" basis-full flex flex-col ">
        <div className="flex-grow">
          <p className="mb-5">
            <button
              onClick={() => setIsReading(!isReading)}
              className={`flex border py-2 ${
                isReading ? "bg-[#8530C1] text-white" : "text-[#8530C1]"
              } px-6 rounded-3xl border-[#8530C1] justify-center items-center`}
            >
              <p
                className={`h-[3px] ${
                  isReading ? "bg-green-600" : "bg-yellow-600"
                } rounded-full w-[3px] p-[5px] inline-block mr-2`}
              ></p>
              <p className="inline">Read to me</p>
            </button>
          </p>
          {/* <p>{content[3].web_body}</p> */}
          <article
            className=" leading-10 flex h-[350px] overflow-y-auto  text-[16px] font-medium font-Hanken pr-8 text-justify "
            dangerouslySetInnerHTML={{ __html: content[page].web_body }}
          />
        </div>

        <div className="mt-8">
          {isReading ? (
            <AudioControls
              audio={content[page].audio}
              setIsFinish={setIsFinish}
            />
          ) : (
            <BookPagination
              setIsFinish={setIsFinish}
              setPage={setPage}
              pageTotal={pageTotal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const BookPagination = ({
  setIsFinish,
  setPage,
  pageTotal,
}: {
  setIsFinish: () => void;
  setPage: (val: number) => void;
  pageTotal: number;
}) => {
  const [currentPage, setCurrentage] = useState(1);
  setPage(currentPage);
  const pageItirate = (itirateControl: string) => {
    if (currentPage < pageTotal && itirateControl === "next") {
      setCurrentage((val) => (val += 1));
    }
    if (currentPage > 1 && itirateControl === "prev") {
      setCurrentage((val) => (val -= 1));
    }
  };
  return (
    <div>
      <div className="flex  justify-between   items-center">
        <span className="flex gap-2">
          <p>Pages: {pageTotal} </p>
          <img
            loading="lazy"
            src={ArrowDown}
            alt="arrow"
            className="w-[15px]"
          />
        </span>
        <div className="flex gap-4">
          <p className="bg-[#8530C1] text-white p-3 rounded-3xl px-8 gap-8 flex justify-between  items-center">
            <button onClick={() => pageItirate("prev")}>
              <img
                loading="lazy"
                src={PreviousIcon}
                alt="icon"
                className="w-[25px]"
              />
            </button>
            <span className=" space-x-1">
              {currentPage !== pageTotal && <span>{currentPage}</span>}
              {currentPage !== pageTotal && <span>/</span>}
              {currentPage !== pageTotal && <span>{pageTotal}</span>}
            </span>
            {currentPage !== pageTotal && (
              <button onClick={() => pageItirate("next")}>
                <img
                  loading="lazy"
                  src={NextIcon}
                  alt="icon"
                  className="w-[25px]"
                />
              </button>
            )}
          </p>
          {currentPage === pageTotal && (
            <button
              onClick={setIsFinish}
              className="p-4 bg-green-600 rounded-3xl text-white px-8"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AudioControls = ({
  audio,
  setIsFinish,
}: {
  audio?: string;
  setIsFinish: () => void;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

  // const [audioDuration, setAudioDuration] = useState(audioRef.current);

  const handlePlayControl = () => {
    const audioCon = audioRef.current;
    console.log("audio played", audioCon);
    setEnded(false);
    setIsPlaying(!isPlaying);
    if (audioCon && !audioCon.paused) {
      return audioCon.pause();
    }
    audioRef?.current?.play();
  };

  const handeSkip10 = (direction: "forward" | "backward") => () => {
    const audioCon = audioRef.current;
    setEnded(false);
    const duration = audioCon?.duration || 0;
    const currentTime = audioCon?.currentTime || 0;

    console.log("duration", audioCon?.duration, audioCon?.currentTime);
    if (audioCon && direction === "forward") {
      audioCon.currentTime +=
        currentTime + 10 > duration ? duration - currentTime : 10;
      return;
    } else if (audioCon && direction === "backward") {
      audioCon.currentTime -= currentTime - 10 < 0 ? currentTime : 10;
      return;
    }
  };
  // const { story_type, id } = useParams();
  // const navigate = useNavigate();
  return (
    <div className="flex justify-center ">
      <audio
        onEnded={() => {
          setIsPlaying(false);
          setEnded(true);
        }}
        ref={audioRef}
        src={audio}
      ></audio>
      <div className="flex justify-end rounded-full h-[60px] gap-10 px-20 py-4 bg-[#FBECFF] items-center ">
        <button onClick={handeSkip10("backward")}>
          <img loading="lazy" src={FastBackward} alt="backward" />
        </button>
        <button onClick={handlePlayControl}>
          <img
            src={isPlaying ? PauseIcon : PlayIcon}
            alt=""
            className="w-[40px]"
          />
        </button>
        <button onClick={handeSkip10("forward")}>
          <img loading="lazy" src={FastForward} alt="forward" />
        </button>
      </div>
      {ended && (
        <div className="flex items-end">
          <button
            onClick={setIsFinish}
            className=" px-14 bg-green-700 text-[16px] py-4 h-[60px] text-white  rounded-full ml-10"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
};

const WelDone = () => {
  const navigate = useNavigate();
  return (
    <div className=" min-h-[calc(92vh-72px-8vh-34px)] h-[100%] flex-grow mt-4 flex justify-center bg-white rounded-3xl items-center">
      <div>
        <p className="flex justify-center items-center">
          <img
            loading="lazy"
            src={Congrats}
            alt="congrats"
            className="w-[176px] h-[176px]"
          />
        </p>
        <div className="text-center">
          <h1 className="text-[40px] font-Recoleta font-semibold">
            Well Done!
          </h1>
          <p className="text-[#7E7E89] text-[18px]">
            You have just finished reading Chisom’s Eco-friendly Visit.
          </p>
        </div>
        <p className="flex flex-col gap-y-3 mt-8">
          <button
            onClick={() => navigate("quiz")}
            className="px-16 py-3 bg-[#8530C1] text-white rounded-2xl"
          >
            Take quiz
          </button>
          <button className="text-[18px]">Later</button>
        </p>
      </div>
    </div>
  );
};
