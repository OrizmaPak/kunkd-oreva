// import { useLocation } from "react-router-dom";
import { audioBooksData, StoriesType } from "./AudioBooks";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import Bookmark from "@/assets/Bookmark.svg";
import React, { useState, useRef, useEffect } from "react";
// import VolumeIcon from "@/assets/volumeIcon.svg";
import AudioBooksNav from "./AudioBooksNav";
import { Slider, MantineProvider } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import {
  useGetContentById,
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
import { GrForwardTen, GrBackTen } from "react-icons/gr";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { FiVolume1 } from "react-icons/fi";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import { getApiErrorMessage } from "@/api/helper";
import { notifications } from "@mantine/notifications";

type TAudioBook = {
  name: string;
  slug: string;
  order: number;
  file: string;
  thumbnail: string;
  id: number;
};
const BookLayout = () => {
  // const { audiobooks,  } = useParams();
  const contentId = localStorage.getItem("contentId");
  const [user] = useStore(getUserState);
  const { data, isLoading } = useGetContentById(
    contentId?.toString()!,
    user?.user_id?.toString()!
  );
  const audioBookId = data?.data.data.id;
  console.log("audioBookId ", audioBookId);
  const audiobook = data?.data.data.media[0];
  console.log("audiobooks data", audiobook, data);
  const [startRead, setStartRead] = useState(false);
  // const { state } = useLocation();
  // console.log(state);
  // const { data: trendingData } = useGetTrendingAudioBooks();
  // console.log("Trending Audios ", trendingData);
  return (
    <div className=" ">
      <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd]  ">
        <div className=" ">
          <Skeleton visible={isLoading} radius={"xl"}>
            {
              <AudioBooksNav
                category="Audiobooks"
                // genre={audiobooks}
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
                    audiobook={audiobook}
                    setStartRead={() => setStartRead(true)}
                    audioBookId={audioBookId!}
                  />
                )}
              </Skeleton>

              {audiobook && startRead && <ReadPage audiobook={audiobook} />}

              <div className="w-full bg-white rounded-3xl mt-4">
                {
                  <CardScreen
                    data={audioBooksData?.slice(1, 6).map((el) => ({ ...el }))}
                    card={(props: StoriesType) => <Card {...props} />}
                    header="Trending"
                    actiontitle="View all"
                    isTitled={true}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLayout;

const AboutPage = ({
  audiobook,
  setStartRead,
  audioBookId,
}: {
  audiobook: TAudioBook;
  setStartRead: () => void;
  audioBookId: number;
}) => {
  const profileId = localStorage.getItem("profileId");
  const { data, refetch } = useGetLikedContent(profileId!);
  const likeContents: TStoryContent[] = data?.data.data.records;
  const { mutate } = useLikedContent();
  const { mutate: unFavoriteMutate } = useUnLikedContent();
  const isLiked = likeContents?.filter((content) => content.id === audioBookId);

  const handleLikedContent = () => {
    // handleShake();
    console.log("audioBookId", audioBookId);
    if (isLiked?.length === 0 || isLiked === undefined) {
      mutate(
        {
          content_id: audioBookId!,
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
          <p className="grid grid-cols-2   gap-4 ">
            <button
              onClick={setStartRead}
              className=" py-3 inline self-end text-white border-white border-[2px] rounded-2xl"
            >
              Play
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
      <div className=" basis-3/4 text-[#008A3B] pad-x-40">
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

const ReadPage = ({ audiobook }: { audiobook: TAudioBook }) => {
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
      {/* <div className=" basis-full flex flex-col bg-red-600 rounded-3xl p-10 ">
        <div className="flex-grow">
          <p className="mb-5 flex justify-between items-center">
            <span className="text-[#B5B5C3] text-[18px]">Lyrics</span>
            <span>
              <img loading="lazy" src={ExportIcon} alt="" />
            </span>
          </p>
          <p className=" leading-[60px] text-[22px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos laborum
            iste iure earum, nisi ipsa nulla numquam distinctio recusandae
            aliquam culpa, tempora autem corporis dolorem unde consectetur
            veniam quis doloremque!
          </p>
        </div>
      </div> */}
    </div>
  );
};

const AudioControls = ({ audio, title }: { audio?: string; title: string }) => {
  console.log("file", audio);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // const progressBar = useRef<HTMLInputElement>(null);
  const [currentTTime, setCurrentTTime] = useState(0);
  const [durationn, setDuration] = useState(0);
  const [load, setLoad] = useState(false);

  const handlePlayControl = () => {
    const audioCon = audioRef.current;
    console.log("audio played", audioCon);
    setIsPlaying(!isPlaying);
    if (audioCon && !audioCon.paused) {
      return audioCon.pause();
    }
    audioRef?.current?.play();
  };

  const handeSkip10 = (direction: "forward" | "backward") => () => {
    const audioCon = audioRef.current;
    const duration = audioCon?.duration || 0;
    console.log(direction, duration);
    const currentTime = audioCon?.currentTime || 0;
    console.log({ currentTime, currentPlus: currentTTime + 1 });
    if (!audioCon?.currentTime) return;
    // audioCon.currentTime = currentTime + 1;
    // console.log("duration", audioCon?.duration, audioCon?.currentTime);
    if (audioCon?.currentTime && load && direction === "forward") {
      audioCon.currentTime += 2;
      // currentTime + 5 > duration ? duration - currentTime : 5;
    } else if (audioCon.currentTime && load && direction === "backward") {
      audioCon.currentTime -= currentTime - 5 < 0 ? currentTime : 5;
      // audioCon.currentTime += 2;
    }
  };

  const max = 20;

  useEffect(() => {
    let seconds;
    if (audioRef.current) {
      console.log("effect duration", audioRef.current?.duration);
      seconds = Math.floor(audioRef?.current.duration);
      setDuration(+seconds);
    }
    // if (progressBar?.current) {
    //   progressBar.current.max = seconds?.toString() || "";
    // }
  }, [
    audioRef?.current?.onloadedmetadata,
    audioRef?.current?.readyState,
    audioRef?.current?.onload,
    audioRef?.current?.oncanplaythrough,
  ]);

  // useEffect(() => {
  //   audioRef?.current?.addEventListener("ontimeupdate", (event) => {
  //     setCurrentTTime(+event?.currentTarget! as number);
  //   });
  //   audioRef?.current?.addEventListener("onend", () => {
  //     setIsPlaying(false);
  //   });
  // }, []);

  const calculateTime = (secs: number) => {
    // console.log("sec", secs);

    if (audioRef.current) {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}: ${returnedSeconds}`;
    }
  };

  // console.log("actual currentTime", currentTTime);

  const reducedMotion = useReducedMotion();

  const handleSliderChange = (value: number) => {
    setCurrentTTime(value);
    console.log("new current time", audioRef.current?.duration, value, load);
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

  // const [currentTime, setCurrentTime] = useState(0);
  // const fetchAudioData = async (currentTime: number) => {
  //   const url = audio ?? ""; // Replace with your audio file URL

  //   console.log("url", url);
  //   const headers = {
  //     Range: `bytes=${currentTime * 128}`, // Assuming 128 bytes per second
  //   };

  //   const response = await axios.get(url, {
  //     headers,
  //     responseType: "blob",
  //   });
  //   return response.data;
  // };

  // const { data, error, status } = useQuery({
  //   queryKey: ["audio", currentTime],
  //   queryFn: () => fetchAudioData(currentTime),

  //   // enabled: false, // Disabled by default, enabled on seek
  // });

  // console.log(" reess", data);

  // const handleSeek = () => {
  //   if (audioRef.current) {
  //     console.log("seeking");
  //     setCurrentTime(audioRef?.current?.currentTime);
  //   }
  // };

  // const audioRef = React.createRef();

  // const blbAudio = data ? URL.createObjectURL(data) : audio;
  // console.log("blbAudio", blbAudio);
  return (
    <div className="h-[229px]">
      {/* <audio ref={audioRef} controls autoPlay onTimeUpdate={handleSeek}>
        <source src={blbAudio} />
        Your browser does not support the audio element.
      </audio> */}

      <h1 className="text-[22px] font-semibold text-[#151515]">{title}</h1>
      <div className="my-3 flex justify-center items-center gap-2 mt-8">
        {/* <p className=" flex-grow w-20">
          {currentTTime && calculateTime(currentTTime)}
        </p> */}
        {/* <input
          type="range"
          className="mr-2   text-[#8530C1] bg-[#8530C1]  flex-grow w-full slider"
          ref={progressBar}
          value={currentTTime}
          onChange={changeRage}
          id="input-range1"
          defaultValue={0}
        /> */}

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
              // backgroundColor=""

              value={currentTTime}
              onChange={(event) => {
                handleSliderChange(event);
                // handleSeek();
              }}
              min={0}
              max={durationn}
              step={0.1}
              label={`Duration: ${calculateTime(currentTTime)}`}
              disabled={reducedMotion}
              // onLoadedMetadata={handleTimeUpdate}
              // onTimeUpdate={handleUpdate}
            />
          </MantineProvider>
        </p>

        {/* <p className="flex-grow w-20">
          {duration ? calculateTime(duration) : `0:00`}
        </p> */}
        {/* <Progress value={(currentTTime * 100) / duration} /> */}
      </div>

      {/* <Progress value={(currentTTime * 100) / duration} /> */}

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
              // handleSeek();
            }}
            onEnded={() => {
              setIsPlaying(false);
              // setEnded(true);
            }}
            onCanPlayThrough={(event) => {
              setCurrentTTime(+event.currentTarget.currentTime);
            }}
            ref={audioRef}
            // src={audio && audio}
            src={
              "https://res.cloudinary.com/dapjcjyyr/video/upload/v1693643756/media1673970287_x1zxla.mp3"
            }
            // onLoadedMetadata={() => setLoad(true)}
            // onLoad={() => setLoad(true)}
            onCanPlay={(event) => {
              setCurrentTTime(+event.currentTarget.currentTime);
              setLoad(true);
            }}
          >
            {/* <source src={blbAudio} /> */}
            {/* <source src={audio && audio} type="audio/mpeg" /> */}
          </audio>
          <div className="flex h-[72px] justify-end rounded-full gap-10 px-10 py-4 bg-[#FBECFF] items-center ">
            <button onClick={handeSkip10("backward")}>
              {/* <img
                loading="lazy"
                src={FastBackward}
                alt="backward"
                className="w-[50px] h-[50px]"
              /> */}
              <GrBackTen size={25} color="red" className="u-react-icon" />
            </button>
            <button onClick={handlePlayControl}>
              {isPlaying ? (
                <BsPauseCircleFill size={40} color="#8530C1" x />
              ) : (
                <BsFillPlayCircleFill size={40} color="#8530C1" />
              )}
              {/* <img
                src={isPlaying ? PauseIcon : PlayIcon}
                alt=""
                className="w-[40px]"
              /> */}
            </button>
            <button onClick={handeSkip10("forward")}>
              {/* <img
                loading="lazy"
                src={FastForward}
                alt="forward"
                className="w-[50px] h-[50px]"
              /> */}
              <GrForwardTen
                size={25}
                color="red"
                text="red"
                className="u-react-icon"
              />
            </button>
          </div>
        </div>
        <div className=" flex justify-center items-center gap-2">
          <FiVolume1 size={25} />
          {/* <img
            loading="lazy"
            src={VolumeIcon}
            alt="volume"
            className="w-[20px]"
          /> */}

          {/* <input
          type="range"
          className="mr-2   text-[#8530C1] bg-[#8530C1] w-[100px]"
          min={0}
          max={max}
          id="input"
          onChange={(e) => handleVolume(e)}
        /> */}
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
