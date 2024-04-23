// import { useLocation } from "react-router-dom";
// import Bookmark from "@/assets/Bookmark.svg";
// import Card from "@/common/User/Card";
// import CardScreen from "@/common/User/CardScreen";
import React, { useEffect, useRef, useState } from "react";
// import { StoriesType, audioBooksData } from "./AudioBooks";
// import VolumeIcon from "@/assets/volumeIcon.svg";
import { getApiErrorMessage } from "@/api/helper";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

import {
  useContentTracking,
  useGetContentById,
  useGetLikedContent,
  useLikedContent,
  useUnLikedContent,
  useRecommendedAudiobooks,
  useLearningHour,
} from "@/api/queries";
import AfamBlur from "@/assets/afamblur.jpg";
// import { TMedia, TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import { TStoryContent, TMedia } from "@/api/types";
// import useStore from "@/store";
// import { getUserState } from "@/store/authStore";
import { MantineProvider, Skeleton, Slider } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { UseQueryResult } from "@tanstack/react-query";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { FiVolume1 } from "react-icons/fi";
import { GrBackTen, GrForwardTen } from "react-icons/gr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AudioBooksNav from "./AudioBooksNav";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TeacherNotificationModal from "@/components/TeacherWarningModal";
import { TAudioBooks } from "@/api/types";
import CardHome from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
import { useNavigate } from "react-router-dom";
import ConnectedStudentModal from "@/components/ConnectedStudentModal";
import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";
import TabInReadingPage from "../AfterParentSignIn/TabInReadingPage";
import "./BookLayout.css";
// import useTimeSpent from "@/hooks/useTimeSpent";

// type TAudioBook = {
//   name: string;
//   slug: string;
//   order: number;
//   file: string;
//   thumbnail: string;
//   id: number;
// };
const BookLayout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [
    openedconnectedStudent,
    { open: openConnectedStudent, close: closeConnectedStudent },
  ] = useDisclosure(false);
  const navigate = useNavigate();

  const contentId = sessionStorage.getItem("contentId");
  // useTimeSpent(Number(contentId), Number(profileId));
  const { data: dataRecommended } = useRecommendedAudiobooks(
    contentId as string
  );
  const recommendedContents: TAudioBooks[] =
    dataRecommended?.data?.data?.recommended_contents;
  const profileId = sessionStorage.getItem("profileId");

  const { data, isLoading } = useGetContentById(
    contentId?.toString() as string,
    profileId?.toString() || ("0" as string),
    open,
    openConnectedStudent
  ) as UseQueryResult<{ data: { data: TStoryContent } }>;
  const audioBookId = data?.data.data.id;
  const audiobook = data?.data.data.media?.[0];
  const [startRead, setStartRead] = useState(false);
  return (
    <>
      <Modal
        radius={10}
        padding={30}
        size={"md"}
        opened={opened}
        onClose={close}
        overlayProps={{
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
          <div className=" ">
            <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd]  ">
              <div className=" ">
                <Skeleton visible={isLoading} radius={"xl"}>
                  {
                    <AudioBooksNav
                      category="Audiobooks"
                      title={audiobook && audiobook?.name}
                    />
                  }
                </Skeleton>
              </div>
              <div className="flex-grow  h-full ">
                <div className="flex-grow  mt-5 rounded-2xl">
                  <div className="flex h-full  gap-4  flex-grow-1 flex-col ">
                    <Skeleton visible={isLoading}>
                      {!startRead && (
                        <AboutPage
                          audiobook={audiobook as TMedia}
                          setStartRead={() => setStartRead(true)}
                          audioBookId={audioBookId as number}
                        />
                      )}
                    </Skeleton>

                    {audiobook && startRead && (
                      <ReadPage audiobook={audiobook} />
                    )}

                    <TabInReadingPage />
                    <div className="w-full bg-white rounded-3xl mt-4">
                      {
                        <CardScreenHome
                          data={recommendedContents}
                          header="New & Trending"
                          actiontitle=""
                          isTitled={false}
                          isLoading={isLoading}
                          card={(props: TStoryContent) => (
                            <CardHome
                              {...props}
                              goTo={() =>
                                navigate(
                                  `../audiobooks/${props?.theme}/${props?.slug
                                    ?.replace(/\s/g, "_")
                                    .toLowerCase()}`
                                )
                              }
                            />
                          )}
                        />

                        // <CardScreen
                        //   data={recommendedContents?.slice(1, 6).map((el) => ({ ...el }))}
                        //   card={(props: StoriesType) => <Card {...props} />}
                        //   header="Trending"
                        //   actiontitle="View all"
                        //   isTitled={true}
                        // />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InnerWrapper>
      </Wrapper>
    </>
  );
};

export default BookLayout;

const AboutPage = ({
  audiobook,
  setStartRead,
  audioBookId,
}: {
  audiobook: TMedia;
  setStartRead: () => void;
  audioBookId: number;
}) => {
  const profileId = sessionStorage.getItem("profileId");
  const { data, refetch } = useGetLikedContent(profileId as string);
  const likeContents: TStoryContent[] = data?.data.data.records;
  const { mutate } = useLikedContent();
  const { mutate: unFavoriteMutate } = useUnLikedContent();
  const isLiked = likeContents?.filter((content) => content.id === audioBookId);

  const handleLikedContent = () => {
    handleShake();
    if (isLiked?.length === 0 || isLiked === undefined) {
      mutate(
        {
          content_id: audioBookId,
          profile_id: Number(profileId),
        },
        {
          onSuccess() {
            // const res = data?.data?.data as TUser;
            // setUser({ ...res });
            refetch();
            notifications.show({
              title: `Notification`,
              message: audiobook?.name + " added to list",
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
          content_id: audioBookId,
          profile_id: Number(profileId),
        },
        {
          onSuccess() {
            refetch();
            notifications.show({
              title: `Notification`,
              message: audiobook?.name + " removed from the list",
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
    <div className="bg-[#003914]   w-[100%] flex rounded-3xl pad-x-40 about-card-px py-5">
      <div className="flex basis-full  border-r-2 justify-center items-center border-[#008A3B]  ">
        <p className="flex flex-col w-full">
          {audiobook ? (
            <LazyLoadImage
              src={audiobook?.thumbnail}
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
            {audiobook?.name}
          </span>
          <span className=" text-[#008A3B]">Dele and Louisa Olafuyi</span>
          <p className="flex   gap-2 ">
            <button
              onClick={setStartRead}
              className=" py-3 px-10 inline self-end text-white border-white border-[2px] rounded-2xl"
            >
              Play
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
      <div className=" basis-3/4 text-[#008A3B] pad-x-40">
        <div>
          <h1 className="text-white font-bold  font-Hanken text25 my-2">
            Overview
          </h1>
          <p dangerouslySetInnerHTML={{ __html: `${audiobook?.slug}` }}></p>
        </div>
      </div>
    </div>
  );
};

const ReadPage = ({ audiobook }: { audiobook: TMedia }) => {
  return (
    <div className="flex bg-[#fff7fd]  gap-16 rounded-3xl ">
      <div className=" basis-full flex   bg-[white]  p-10 rounded-3xl gap-24 ">
        <div>
          <LazyLoadImage
            src={audiobook.thumbnail}
            placeholderSrc={AfamBlur}
            effect="blur"
            className=" rounded-xl"
            wrapperClassName=""
            width={229}
            height={229}
          />
        </div>
        <div className=" flex-grow">
          <AudioControls
            audio={audiobook && audiobook.file}
            title={audiobook?.name}
          />
        </div>
      </div>
    </div>
  );
};

const AudioControls = ({ audio, title }: { audio?: string; title: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTTime, setCurrentTTime] = useState(0);
  const [durationn, setDuration] = useState(0);
  const [load, setLoad] = useState(false);
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    const continueReading = sessionStorage.getItem("continuePage");
    if (continueReading && audioRef.current) {
      audioRef.current.currentTime = Number(continueReading);
    }
  }, []);

  const handlePlayControl = () => {
    const audioCon = audioRef.current;
    setIsPlaying(!isPlaying);
    if (audioCon && !audioCon.paused) {
      return audioCon.pause();
    }
    audioRef?.current?.play();
  };

  const handeSkip10 = (direction: "forward" | "backward") => () => {
    const audioCon = audioRef.current;
    const duration = audioCon?.duration || 0;
    const currentTime = audioCon?.currentTime || 0;
    if (!audioCon?.currentTime) return;
    if (
      audioCon?.currentTime &&
      load &&
      direction === "forward" &&
      audioCon?.currentTime < duration
    ) {
      audioCon.currentTime += 10;
    } else if (audioCon.currentTime && load && direction === "backward") {
      audioCon.currentTime -= currentTime - 10 < 0 ? currentTime : 10;
    }
  };

  const max = 20;

  useEffect(() => {
    let seconds;
    if (audioRef.current) {
      seconds = Math.floor(audioRef?.current.duration);
      setDuration(+seconds);
    }
  }, [
    audioRef?.current?.onloadedmetadata,
    audioRef?.current?.readyState,
    audioRef?.current?.onload,
    audioRef?.current?.oncanplaythrough,
  ]);

  const calculateTime = (secs: number) => {
    if (audioRef.current) {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}: ${returnedSeconds}`;
    }
  };

  const reducedMotion = useReducedMotion();

  const handleSliderChange = (value: number) => {
    setCurrentTTime(value);
    if (load && audioRef.current) {
      audioRef.current.currentTime = value;
    }
    return value;
  };

  const [volume, setVolume] = React.useState(50);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    const volume = Number(value) / max;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };
  const { mutate } = useContentTracking();
  const profileId = sessionStorage.getItem("profileId");
  const contentId = sessionStorage.getItem("contentId");
  const { mutate: mutateLearning } = useLearningHour();
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isPlaying) {
      interval = setInterval(() => {
        setDelay((prev) => prev + 1);
      }, 5000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (delay > 0) {
      mutate(
        {
          profile_id: Number(profileId),
          content_id: Number(contentId),
          status: currentTTime === durationn ? "complete" : "ongoing",
          pages_read: Math.ceil(currentTTime),
          timespent: Math.ceil(currentTTime),
        },
        {
          onSuccess(data) {
            setLastTime(Math.ceil(currentTTime));
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

      mutateLearning({
        content_id: Number(contentId),
        profile_id: Number(profileId),
        timespent: Math.ceil(currentTTime) - lastTime,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const handleAudioComplete = async () => {
    mutate(
      {
        profile_id: Number(profileId),
        content_id: Number(contentId),
        status: "complete",
        pages_read: Math.ceil(currentTTime),
        timespent: Math.ceil(currentTTime),
      },
      {
        onSuccess(data) {
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

  return (
    <div className="h-[229px]">
      <h1 className="text-[22px] font-semibold text-[#151515]">{title}</h1>
      <div className="my-3 flex justify-center items-center gap-2 mt-8">
        <p className="w-full flex-grow">
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
              value={currentTTime}
              onChange={(event) => {
                handleSliderChange(event);
              }}
              min={0}
              max={durationn}
              step={0.1}
              label={`Duration: ${calculateTime(currentTTime)}`}
              disabled={reducedMotion}
            />
          </MantineProvider>
        </p>
      </div>

      <div className="flex  justify-between ">
        <p>{currentTTime && calculateTime(currentTTime)}</p>
        <p>{durationn ? calculateTime(durationn) : `0:00`}</p>
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex justify-center h-[72px]">
          <audio
            id="audio-book"
            onTimeUpdate={(event) => {
              setCurrentTTime(+event.currentTarget.currentTime);
            }}
            onEnded={() => {
              setIsPlaying(false);
              handleAudioComplete();
            }}
            onCanPlayThrough={(event) => {
              setCurrentTTime(+event.currentTarget.currentTime);
            }}
            ref={audioRef}
            src={audio && audio}
            onCanPlay={(event) => {
              setCurrentTTime(+event.currentTarget.currentTime);
              setLoad(true);
            }}
          ></audio>
          <div className="flex h-[72px] justify-end rounded-full gap-10 px-10 py-4 bg-[#FBECFF] items-center ">
            <button onClick={handeSkip10("backward")}>
              <GrBackTen size={25} color="red" className="u-react-icon" />
            </button>
            <button onClick={handlePlayControl}>
              {isPlaying ? (
                <BsPauseCircleFill size={40} color="#8530C1" />
              ) : (
                <BsFillPlayCircleFill size={40} color="#8530C1" />
              )}
            </button>
            <button onClick={handeSkip10("forward")}>
              <GrForwardTen size={25} color="red" className="u-react-icon" />
            </button>
          </div>
        </div>
        <div className=" flex justify-center items-center gap-2">
          <FiVolume1 size={25} />
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
        </div>
      </div>
    </div>
  );
};
