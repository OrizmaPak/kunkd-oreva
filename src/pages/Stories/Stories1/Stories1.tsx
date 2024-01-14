import {
  useContentForHome,
  useContentTracking,
  useGetContentById,
  useGetLikedContent,
  useLikedContent,
  useUnLikedContent,
} from "@/api/queries";
import Bookmark from "@/assets/Bookmark.svg";
import AfamBlur from "@/assets/afamblur.jpg";
import Congrats from "@/assets/congrats.svg";
import CardHome from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
import CustomTTSComponent from "@/components/TTS";
// import useStore from "@/store";
// import { getUserState } from "@/store/authStore";
import { Skeleton } from "@mantine/core";
import { RefObject, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate, useParams } from "react-router-dom";
import StoriesNav from "./StoriesNav";

import { getApiErrorMessage } from "@/api/helper";
import TeacherNotificationModal from "@/components/TeacherWarningModal";
import { MantineProvider, Modal, Slider } from "@mantine/core";
import { useDisclosure, useReducedMotion } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { UseQueryResult } from "@tanstack/react-query";
import ReactHtmlParser from "html-react-parser";
import { useRef } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import useTimeSpent from "@/hooks/useTimeSpent";
import "./stories1.css";
// import { number } from "zod";
// import { useQueryClient } from "@tanstack/react-query";
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

export type TMedia = {
  name: string;
  slug: string;
  order: number;
  file: string;
  thumbnail: string;
};

type TQuizResult = {
  status: boolean;
  id: number;
  result: number;
};
export type TStoryContent = {
  sub_category_name?: unknown;
  category?: string;
  sub_categories?: TSubCategory[];
  category_id?: number;
  content_type?: string;
  content_type_id?: number;
  has_quiz?: boolean;
  id?: number;
  is_liked?: boolean;
  media?: TMedia[];
  media_type?: string;
  name?: string;
  pages?: TContentPage[];
  short_link?: string;
  slug?: string;
  pages_read?: number;
  synopsis?: string;
  tags?: string;
  theme?: string;
  thumbnail?: string;
  status?: string;
  web_synopsis?: string;
  quiz_result?: TQuizResult;
  timespent?: number;
};

const Stories1 = () => {
  const [isFinish, setIsFinish] = useState(false);
  const [startRead, setStartRead] = useState(false);
  // const [user] = useStore(getUserState);
  const contentId = localStorage.getItem("contentId");
  const profileId = localStorage.getItem("profileId");
  const params = useParams();
  const { category } = params;
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading: contentIsLoading } = useGetContentById(
    contentId?.toString() as string,
    // contentId!,
    profileId?.toString() || "0",
    open
  ) as UseQueryResult<{ data: { data: TStoryContent } }>;
  const content = data?.data.data;
  const [arrayOfSubCatId, setArraySubCatId] = useState<number>(0);

  useEffect(() => {
    if (content) {
      content.sub_categories?.map((data) => {
        setArraySubCatId(data?.sub_category_id);
      });
    }
    //eslint-disable-next-line
  }, [content]);

  useTimeSpent(Number(contentId), Number(profileId), arrayOfSubCatId);

  const { data: recommendedData, isLoading } = useContentForHome();
  const recommendedStories = recommendedData?.data.data.recommended_stories;
  const navigate = useNavigate();
  const myRef: RefObject<HTMLDivElement> = useRef(null);

  return (
    <>
      <Modal
        radius={10}
        padding={30}
        size={"md"}
        opened={opened}
        onClose={close}
        overlayProps={{
          // style: { backgroundOpacity: 1 },
          blur: 10,
        }}
        closeOnClickOutside={false}
        withCloseButton={false}
        centered
      >
        <TeacherNotificationModal onCancel={close} />
      </Modal>
      <div className=" ">
        <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd] ">
          <div className=" ">
            {
              <Skeleton visible={contentIsLoading}>
                <StoriesNav
                  category={category && category}
                  genre={
                    content && content?.sub_categories?.[0]?.sub_category_name
                  }
                  title={content && content.name}
                  subCategoryId={
                    content && content?.sub_categories?.[0]?.sub_category_id
                  }
                  slug={
                    content && content?.sub_categories?.[0]?.sub_category_name
                  }
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
                        story={content as TStoryContent}
                        setStartRead={() => setStartRead(true)}
                      />
                    </Skeleton>
                  )}

                  {content && startRead && (
                    <ReadPage
                      thumbnail={content.thumbnail as string}
                      content={content.pages as TContentPage[]}
                      setIsFinish={() => setIsFinish(true)}
                      divRef={myRef}
                    />
                  )}

                  <div className="w-full bg-white rounded-3xl mt-4">
                    {
                      <CardScreenHome
                        data={recommendedStories}
                        isLoading={isLoading}
                        header="Recommended For You"
                        isTitled={false}
                        card={(props: TStoryContent) => (
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
                <WelDone content={content as TStoryContent} />
              )}
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    </>
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
  const { data, refetch } = useGetLikedContent(profileId as string);
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
              onClick={(e) => {
                e.stopPropagation();
                setStartRead();
              }}
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
        {/* <div>
          <h1 className="text-white font-bold  font-Hanken text25 my-2">
            About the author
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
            at ullam incidunt maiores ut officiis adipisci in quod accusamus
            fugit. Quia illum, inventore id tempora recusandae ut consectetur
            veniam reiciendis.
          </p>
        </div> */}
        <div>
          <h1 className="text-white font-bold  font-Hanken text25 my-2">
            Overview
          </h1>
          <p dangerouslySetInnerHTML={{ __html: `${story?.synopsis}` }}></p>
        </div>
      </div>
    </div>
  );
};

const ReadPage = ({
  content,
  setIsFinish,
  thumbnail,
  divRef,
}: {
  content: TContentPage[];
  setIsFinish: () => void;
  thumbnail: string;
  divRef: RefObject<HTMLDivElement>;
}) => {
  const [isReading, setIsReading] = useState(false);
  const [page, setPage] = useState(0);
  const pageTotal = content.length - 1;
  const [pageNumber, setPageNumber] = useState(0);
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
  const { mutate } = useContentTracking();
  const profileId = localStorage.getItem("profileId");
  const contentId = localStorage.getItem("contentId");

  useEffect(() => {
    const abortControllerRef = new AbortController();

    // console.log("useEffect is running " ,pageNumber, page, pageTotal, isReading, volume)
    const handleUpdateData = async () => {
      try {
        mutate(
          {
            profile_id: Number(profileId),
            content_id: Number(contentId),
            status: `${pageNumber === pageTotal ? "complete" : "ongoing"}`,
            pages_read: Number(pageNumber + 1),
            timespent: 23,
            signal: abortControllerRef.signal,
          },
          {
            onSuccess(data) {
              console.log("success", data.data.message);
            },
            onError(err) {
              notifications.show({
                title: `Notification`,
                message: getApiErrorMessage(err),
              });
            },
          }
        );
      } catch (err) {
        // Handle errors if needed
      }
    };

    handleUpdateData();

    // Cleanup function to cancel the request when the component unmounts
    return () => {
      abortControllerRef.abort();
      // queryClient.cancelMutations();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <div className="flex py-16 bg-white  rounded-3xl px-16">
      <div className=" basis-3/4 flex  items-center">
        <img
          loading="lazy"
          src={content[page]?.image || thumbnail}
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
            <p
              ref={divRef}
              className=" leading-10 flex h-[350px] overflow-y-auto  text20 font-medium font-Hanken pr-8 text-justify "
            >
              {/* {content[page].web_body} */}

              <p
                className="content_cont leading-10 [&>img]:hidden"
                dangerouslySetInnerHTML={{ __html: content[page]?.web_body }}
              ></p>
            </p>
          )}
        </div>

        <div className="mt-8">
          {isReading ? (
            <CustomTTSComponent
              setIsFinish={setIsFinish}
              pageNumber={pageNumber}
              pageTotal={pageTotal}
              autoPlay={true}
              setPage={setPageNumber}
              setPageNumber={() => {
                if (pageNumber === pageTotal) {
                  return;
                }
                setPageNumber((prev) => prev + 1);
              }}
              highlight
            >
              {/* <p
                className="text20"
                dangerouslySetInnerHTML={{ __html:  content[page].web_body }}
              ></p> */}
              <p className="content_cont leading-10 text20  [&>img]:hidden">
                {ReactHtmlParser(content[pageNumber]?.web_body)}
              </p>

              {/* <p>{content[pageNumber].web_body}</p> */}
            </CustomTTSComponent>
          ) : (
            <BookPagination
              setIsFinish={setIsFinish}
              setPage={setPage}
              pageTotal={pageTotal}
              setPageNumber={setPageNumber}
              divRef={divRef}
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
  setPageNumber,
  divRef,
}: {
  setIsFinish: () => void;
  setPage: (val: number) => void;
  pageTotal: number;
  setPageNumber: (val: number) => void;
  divRef: RefObject<HTMLDivElement>;
}) => {
  const { mutate } = useContentTracking();
  const continuePage = localStorage.getItem("continuePage");
  const profileId = localStorage.getItem("profileId");
  const contentId = localStorage.getItem("contentId");
  const [currentPage, setCurrentage] = useState(
    continuePage && Number(continuePage) < pageTotal ? Number(continuePage) : 1
  );

  useEffect(() => {
    setPage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const pageItirate = (itirateControl: string) => {
    if (currentPage < pageTotal && itirateControl === "next") {
      setCurrentage((val) => (val += 1));
    }
    if (currentPage > 1 && itirateControl === "prev") {
      setCurrentage((val) => (val -= 1));
    }
    setPageNumber(currentPage);
  };

  const handleBookCompletedProgress = () => {
    mutate(
      {
        profile_id: Number(profileId),
        content_id: Number(contentId),
        status: "complete",
        pages_read: Number(pageTotal + 1),
        timespent: 23,
      },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          setIsFinish();
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

  const options = [];

  // Generate ten options with values 1 to 10
  for (let i = 1; i <= pageTotal; i++) {
    options.push(
      <option id="pages" key={i} value={i}>
        {i}
      </option>
    );
  }
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentage(Number(event.target.value));
  };
  return (
    <div>
      <div className="flex  justify-between   items-center">
        <span className="flex gap-2">
          <p>
            Pages:
            <select
              name=""
              id="pages"
              onChange={handleSelectChange}
              value={currentPage}
            >
              {options}
            </select>
          </p>
        </span>
        <div className="flex gap-4">
          <p className="bg-[#8530C1] text-white p-3 rounded-3xl px-8 gap-8 flex justify-between  items-center">
            <button
              onClick={() => {
                pageItirate("prev");
                if (divRef.current) {
                  divRef.current.scrollTop = 0;
                }
              }}
            >
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
                  if (divRef.current) {
                    divRef.current.scrollTop = 0;
                  }
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
              onClick={handleBookCompletedProgress}
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
            You have just finished reading {content?.name as string}
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
