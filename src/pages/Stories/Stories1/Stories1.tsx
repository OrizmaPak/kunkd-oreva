import StoriesNav from "./StoriesNav";
import { useParams, useNavigate } from "react-router-dom";
import CardScreenHome from "@/common/User/CardScreenHome";
import CardHome, { CardProps } from "@/common/User/CardHome";
import Bookmark from "@/assets/Bookmark.svg";
import ArrowDown from "@/assets/arrowdown.svg";
import { useState } from "react";
import Congrats from "@/assets/congrats.svg";
import {
  useGetContentById,
  useContentForHome,
  useContentTracking,
  useGetLikedContent,
  useLikedContent,
  useUnLikedContent,
} from "@/api/queries";
import { getUserState } from "@/store/authStore";
import useStore from "@/store";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Skeleton } from "@mantine/core";
import CustomTTSComponent from "@/components/TTS";

import { getApiErrorMessage } from "@/api/helper";
import { notifications } from "@mantine/notifications";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "./stories1.css";
import { Slider, MantineProvider } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { useRef } from "react";

type TContentPage = {
  audio: string;
  web_body: string;
  content_media_id: number;
  image: string;
  name: string;
  page_number: number;
};

type TSubCategory = {
  sub_category_id: number;
  sub_category_name: string;
};
export type TStoryContent = {
  sub_category_name: any;
  category: string;
  sub_categorie: TSubCategory[];
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

const Stories1 = () => {
  const [isFinish, setIsFinish] = useState(false);
  const [startRead, setStartRead] = useState(false);
  const [user] = useStore(getUserState);
  const contentId = localStorage.getItem("contentId");

  const params = useParams();
  const { category } = params;

  const { data, isLoading: contentIsLoading } = useGetContentById(
    contentId?.toString()!,
    user?.user_id?.toString()!
  );
  const content = data?.data.data;
  const { data: recommendedData, isLoading } = useContentForHome();
  const recommendedStories = recommendedData?.data.data.recommended_stories;
  const navigate = useNavigate();

  return (
    <div className=" ">
      <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd] ">
        <div className=" ">
          {
            <Skeleton visible={contentIsLoading}>
              <StoriesNav
                category={category && category}
                genre={content && content.sub_categories[0].sub_category_name!}
                title={content && content.name}
                subCategoryId={
                  content && content.sub_categories[0].sub_category_id!
                }
                slug={content && content.sub_categories[0].sub_category_name!}
              />
            </Skeleton>
          }
        </div>
        <div className="flex-grow  h-full   ">
          <div className="flex-grow mt-5 rounded-2xl ">
            {!isFinish ? (
              <div className="flex h-full  gap-4  flex-grow-1 flex-col ">
                {!startRead && (
                  <Skeleton visible={contentIsLoading}>
                    <AboutPage
                      story={content}
                      setStartRead={() => setStartRead(true)}
                    />
                  </Skeleton>
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
                            navigate(`../sub/${props.slug?.toLowerCase()}`);
                            setStartRead(false);
                          }}
                        />
                      )}
                    />
                  }
                </div>
              </div>
            ) : (
              <WelDone content={content} />
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
  const profileId = localStorage.getItem("profileId");
  const { data, refetch } = useGetLikedContent(profileId!);
  const likeContents: TStoryContent[] = data?.data.data.records;
  const { mutate } = useLikedContent();
  const { mutate: unFavoriteMutate } = useUnLikedContent();
  const isLiked = likeContents?.filter((content) => content.id === story?.id);

  const handleLikedContent = () => {
    // handleShake();
    if (isLiked?.length === 0 || isLiked === undefined) {
      mutate(
        {
          content_id: Number(story.id),
          profile_id: Number(profileId),
        },
        {
          onSuccess() {
            // const res = data?.data?.data as TUser;
            // setUser({ ...res });
            refetch();
            notifications.show({
              title: `Notification`,
              message: story?.name + " added to list",
            });
          },
          onError(err) {
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        }
      );
    } else {
      unFavoriteMutate(
        {
          content_id: Number(story?.id),
          profile_id: Number(profileId),
        },
        {
          onSuccess() {
            refetch();
            notifications.show({
              title: `Notification`,
              message: story?.name + " removed from the list",
            });
          },
          onError(err) {
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        }
      );
    }
  };

  return (
    <div className="bg-[#5D0093]  w-[100%] flex rounded-3xl pad-x-40 about-card-px py-5">
      <div className="flex basis-full  border-r-2 justify-center items-center border-[#BD6AFA]  ">
        <p className="flex flex-col w-full">
          {story ? (
            <LazyLoadImage
              src={story?.thumbnail}
              placeholderSrc={AfamBlur}
              effect="blur"
              className="rounded-2xl about-img "
              wrapperClassName="about-img"
            />
          ) : (
            <LazyLoadImage
              placeholderSrc={AfamBlur}
              effect="blur"
              className="rounded-2xl about-img "
              wrapperClassName="about-img"
            />
          )}
        </p>
        <p className="grid flex-col w-full   h-full py-2 ">
          <span className="font-bold font-Recoleta text-white text25 justify-self-start">
            {story?.name}
          </span>
          <span className=" text-[#BD6AFA]  ">Dele and Louisa Olafuyi</span>
          <p className="grid grid-cols-2   gap-4 ">
            <button
              onClick={setStartRead}
              className=" py-3 inline self-end text-white border-white border-[2px] rounded-2xl"
            >
              Read
            </button>
            <button
              onClick={handleLikedContent}
              className="inline self-end text-start"
            >
              <img
                loading="lazy"
                src={Bookmark}
                alt="bookmark"
                className=" inline "
              />
            </button>
          </p>
        </p>
      </div>
      <div className=" basis-3/4 text-[#BD6AFA] pad-x-40">
        <div>
          <h1 className="text-white font-bold  font-Hanken text25 my-2">
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
          <h1 className="text-white font-bold  font-Hanken text25 my-2">
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
  const [pageNumber, setPageNumber] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reducedMotion = useReducedMotion();
  const [volume, setVolume] = useState(50);
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    const volume = Number(value) / max;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };
  const max = 20;
  return (
    <div className="flex py-16 bg-white  rounded-3xl px-16">
      <div className=" basis-3/4 flex  items-center">
        <img
          loading="lazy"
          src={thumbnail}
          alt="image"
          className="read-img rounded-xl"
        />
      </div>
      <div className=" basis-full flex flex-col ">
        <div className="flex-grow">
          <p className="mb-5 flex justify-between items-center ">
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
            <p className="w-[100px]">
              <MantineProvider
                theme={{
                  colors: {
                    "ocean-blue": [
                      "#8530c1",
                      "#5FCCDB",
                      "#44CADC",
                      "#2AC9DE",
                      "#1AC2D9",
                      "#11B7CD",
                      "#09ADC3",
                      "#0E99AC",
                      "#128797",
                      "#147885",
                    ],
                  },
                }}
              >
                <Slider
                  color="ocean-blue.0"
                  value={volume}
                  onChange={handleVolumeChange}
                  min={0}
                  max={max}
                  disabled={reducedMotion}
                  size={"sm"}
                />
              </MantineProvider>
            </p>
          </p>
          {!isReading && (
            <p className=" leading-10 flex h-[350px] overflow-y-auto  text-[20px] font-medium font-Hanken pr-8 text-justify ">
              {content[page].web_body}
            </p>
          )}
        </div>

        <div className="mt-8">
          {isReading ? (
            <CustomTTSComponent
              setIsFinish={setIsFinish}
              pageNumber={pageNumber}
              pageTotal={pageTotal}
              autoPlay={pageNumber !== 1}
              setPageNumber={() => {
                if (pageNumber === pageTotal) {
                  return;
                }
                setPageNumber((prev) => prev + 1);
              }}
              highlight
            >
              {content[pageNumber].web_body}
            </CustomTTSComponent>
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
  const { mutate } = useContentTracking();
  const profileId = localStorage.getItem("profileId");
  const contentId = localStorage.getItem("contentId");
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
  const handleBookProgress = () => {
    mutate(
      {
        profile_id: Number(profileId),
        content_id: Number(contentId),
        status: "ongoing",
        pages_read: Number(currentPage + 1),
        timespent: 23,
      },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          // const res = data?.data?.data as TUser;
          // setUser({ ...res });

          // notifications.show({
          //   title: `Notification`,
          //   message: data?.data.message,
          // });
        },
        onError(err) {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
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
              <GrFormPrevious
                size={30}
                color="white"
                className="u-react-icon"
              />
            </button>
            <span className=" space-x-1">
              {currentPage !== pageTotal && <span>{currentPage}</span>}
              {currentPage !== pageTotal && <span>/</span>}
              {currentPage !== pageTotal && <span>{pageTotal}</span>}
            </span>
            {currentPage !== pageTotal && (
              <button
                onClick={() => {
                  pageItirate("next");
                  handleBookProgress();
                }}
              >
                <GrFormNext
                  size={30}
                  color="white"
                  className="u-react-icon"
                  style={{
                    polyline: {
                      stroke: "white",
                    },
                  }}
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

const WelDone = ({ content }: { content: TStoryContent }) => {
  const navigate = useNavigate();
  const navigateQuiz = () => {
    localStorage.setItem("content", JSON.stringify(content));
    if (content.has_quiz === true) {
      navigate("quiz");
    } else {
      notifications.show({
        title: `Notification`,
        message: "Quiz is not available for this content",
      });
    }
  };
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
            You have just finished reading {content?.pages[0].name}
          </p>
        </div>
        <p className="flex flex-col gap-y-3 mt-8">
          <button
            onClick={navigateQuiz}
            className="px-16 py-3 bg-[#8530C1] text-white rounded-2xl"
          >
            Take quiz
          </button>
          <button onClick={() => navigate(-1)} className="text-[18px] mt-2">
            Later
          </button>
        </p>
      </div>
    </div>
  );
};
