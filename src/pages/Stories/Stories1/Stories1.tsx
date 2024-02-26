import {
  useContentForHome,
  useContentTracking,
  useGetContentById,
  useGetLikedContent,
  useLikedContent,
  useUnLikedContent,
} from "@/api/queries";
import AfamBlur from "@/assets/afamblur.jpg";
import CardHome from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
import CustomTTSComponent from "@/components/TTS";
import { MantineProvider, Skeleton, Slider } from "@mantine/core";
import { RefObject, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import StoriesNav from "./StoriesNav";
import { getApiErrorMessage } from "@/api/helper";
import TeacherNotificationModal from "@/components/TeacherWarningModal";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { UseQueryResult } from "@tanstack/react-query";
import ReactHtmlParser from "html-react-parser";
import { useRef } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import useTimeSpent from "@/hooks/useTimeSpent";
import "./stories1.css";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import ConnectedStudentModal from "@/components/ConnectedStudentModal";
import { RiFullscreenFill } from "react-icons/ri";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { useReducedMotion } from "@mantine/hooks";
import { TContentPage, TStoryContent } from "@/api/types";
import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";
// import { getUserState } from "@/store/authStore";
// import useStore from "@/store/index";
import TabInReadingPage from "@/pages/AfterParentSignIn/TabInReadingPage";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const Stories1 = () => {
  const [isFinish, setIsFinish] = useState(false);
  const [startRead, setStartRead] = useState(false);
  // const [user] = useStore(getUserState);
  const contentId = sessionStorage.getItem("contentId");
  const profileId = sessionStorage.getItem("profileId");
  const [opened, { open, close }] = useDisclosure(false);

  const [
    openedconnectedStudent,
    { open: openConnectedStudent, close: closeConnectedStudent },
  ] = useDisclosure(false);

  const { data, isLoading: contentIsLoading } = useGetContentById(
    contentId?.toString() as string,
    // contentId!,
    profileId?.toString() || "0",
    open,
    openConnectedStudent
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
      <Modal
        radius={10}
        padding={30}
        size={"md"}
        opened={openedconnectedStudent}
        onClose={closeConnectedStudent}
        overlayProps={{
          // style: { backgroundOpacity: 1 },
          blur: 10,
        }}
        closeOnClickOutside={false}
        withCloseButton={false}
        centered
      >
        <ConnectedStudentModal onCancel={closeConnectedStudent} />
      </Modal>
      <Wrapper bgColor="#fff7fd">
        <InnerWrapper>
          <div className=" bg-[#fff7fd]">
            <div className="min-h-[calc(92vh-60px)] h-[100%] flex flex-col   ">
              <div className=" ">
                {
                  <Skeleton visible={contentIsLoading}>
                    <StoriesNav
                      category={"Stories"}
                      genre={
                        content &&
                        content?.sub_categories?.[0]?.sub_category_name
                      }
                      title={content && content.name}
                      subCategoryId={
                        content && content?.sub_categories?.[0]?.sub_category_id
                      }
                      slug={
                        content &&
                        content?.sub_categories?.[0]?.sub_category_name
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
                      <TabInReadingPage />

                      <div className="w-full bg-white rounded-3xl mt-4">
                        <></>
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
                                  navigate(
                                    `../stories/${
                                      props?.theme
                                    }/${props.slug?.toLowerCase()}`
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
                    <WelDone content={content as TStoryContent} />
                  )}
                </div>
              </div>

              {/* </div> */}
            </div>
          </div>
        </InnerWrapper>
      </Wrapper>
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
  const profileId = sessionStorage.getItem("profileId");
  const { data, refetch } = useGetLikedContent(profileId as string);
  const likeContents: TStoryContent[] = data?.data.data.records;
  const { mutate } = useLikedContent();
  const { mutate: unFavoriteMutate } = useUnLikedContent();
  const isLiked = likeContents?.filter((content) => content.id === story?.id);

  const handleLikedContent = () => {
    handleShake();
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

  const [isShaking, setIsShaking] = useState(false);

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 200); // Reset shaking after 0.5 seconds
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
          <p className="  flex gap-1 ">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStartRead();
              }}
              className=" py-3 px-10 inline self-end text-white border-white border-[2px] rounded-2xl"
            >
              Read
            </button>
            {/* <button
              onClick={handleLikedContent}
              className="inline self-end text-start"
            >
              <img
                loading="lazy"
                src={Bookmark}
                alt="bookmark"
                className=" inline "
              />
            </button> */}

            <button
              onClick={handleLikedContent}
              // className="px-4 py-2"
              className={`px-4 py-2 rounded-md transition-all inline self-end items-center     ${
                isShaking ? "scale-150" : ""
              }`}
            >
              {isLiked?.length > 0 ? (
                <MdOutlineFavorite
                  size="35"
                  color="white"
                  className=" scale-110"
                />
              ) : (
                <MdFavoriteBorder size="35" color="white" />
              )}
              <style>{`
            @keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

.animate-shake {
  animation: shake 0.3s infinite;
}`}</style>
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
  // const audioRef = useRef<HTMLAudioElement>(null);
  const reducedMotion = useReducedMotion();
  const [size, setSize] = useState(20);
  const handleSizeChange = (value: number) => {
    setSize(value);
  };
  const max = 35;
  const { mutate } = useContentTracking();
  const profileId = sessionStorage.getItem("profileId");
  const contentId = sessionStorage.getItem("contentId");

  useEffect(() => {
    const abortControllerRef = new AbortController();

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
              return data;
            },
            onError() {
              // notifications.show({
              //   title: `Notification`,
              //   message: getApiErrorMessage(err),
              // });
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

  const [goFull, setGoFull] = useState(false);
  useEffect(() => {
    const e = document.getElementById("container");
    if (goFull) {
      e?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [goFull]);

  function removeTags(str: string) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div
      id="container"
      className={`flex py-16 bg-white  rounded-3xl px-10 justify-center items-center  ${
        goFull ? "px-[200px]" : ""
      }`}
    >
      {/* <button>change</button> */}
      <div className={` basis-3/4 flex  items-center  max-h-[500px] `}>
        <img
          loading="lazy"
          src={content[page]?.image || thumbnail}
          alt="image"
          className="read-img rounded-xl"
        />
      </div>
      <div className=" basis-full flex flex-col  ">
        <div className="flex-grow">
          <p className="mb-5 flex justify-between items-center ">
            <button
              onClick={() => setIsReading(!isReading)}
              className={`flex border py-1 ${
                isReading ? "bg-[#8530C1] text-white" : "text-[#8530C1]"
              } px-6 rounded-3xl border-[#8530C1] justify-center items-center`}
            >
              <p
                className={`h-[10px] ${
                  isReading ? "bg-green-600" : "bg-yellow-600"
                } rounded-full w-[10px] p-[5px] inline-block mr-2`}
              ></p>
              <p className=" pb-2">Read to me</p>
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
                  value={size}
                  onChange={handleSizeChange}
                  min={20}
                  max={max}
                  disabled={reducedMotion}
                  size={"sm"}
                />
              </MantineProvider>
            </p>
            <p className="cursor-pointer">
              {goFull ? (
                <AiOutlineFullscreenExit
                  color="#8530C1"
                  size={35}
                  onClick={() => {
                    setGoFull((prev) => !prev);
                  }}
                />
              ) : (
                <RiFullscreenFill
                  color="#8530C1"
                  size={35}
                  onClick={() => {
                    setGoFull((prev) => !prev);
                  }}
                />
              )}
            </p>
          </p>
          {!isReading && (
            <p
              style={{ fontSize: `${size}px` }}
              ref={divRef}
              className={` leading-10 flex  ${
                goFull ? "h-[450px]" : "h-[350px]"
              }   overflow-y-auto  ${
                size + "px"
              } font-medium font-Hanken pr-8 text-justify `}
            >
              {/* {content[page].web_body} */}

              <p
                className="content_cont leading-10 [&>img]:hidden text-center"
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
              <p
                style={{ fontSize: `${size}px` }}
                className="content_cont leading-10  [&>img]:hidden text-center"
              >
                {ReactHtmlParser(
                  removeTags(content[pageNumber]?.web_body) as string
                )}
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
  const continuePage = sessionStorage.getItem("continuePage");
  const profileId = sessionStorage.getItem("profileId");
  const contentId = sessionStorage.getItem("contentId");
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
          setIsFinish();
          return data;
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
          <p className="bg-[#8530C1] text-white  py-3 rounded-3xl px-8 gap-8 flex justify-between  items-center">
            <button
              onClick={() => {
                pageItirate("prev");
                if (divRef.current) {
                  divRef.current.scrollTop = 0;
                }
              }}
            >
              <GrFormPrevious
                size={40}
                color="white"
                className="u-react-icon"
              />
            </button>
            <span className=" space-x-1 text-[20px] font-Hanken">
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
                  size={40}
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
  // const [user] = useStore(getUserState);

  const navigateQuiz = () => {
    sessionStorage.setItem("content", JSON.stringify(content));
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
          <IoCheckmarkCircleOutline className="congrat-w" color="#8530C1" />
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
          <button
            onClick={() => {
              // navigate(
              //   `/${user?.role === "user" ? "parent" : "school"}/stories`
              // );
              navigate(-1);
            }}
            className="text-[18px] mt-2"
          >
            Later
          </button>
        </p>
      </div>
    </div>
  );
};
