import { useLocation } from "react-router-dom";
import { audioBooksData, StoriesType } from "./AudioBooks";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import Bookmark from "@/assets/Bookmark.svg";

import React, { useState, useRef, useEffect } from "react";
import FastForward from "@/assets/fastforward.svg";
import FastBackward from "@/assets/fastbackward.svg";
import PauseIcon from "@/assets/pause.svg";
import PlayIcon from "@/assets/play.svg";
import VolumeIcon from "@/assets/volumeIcon.svg";

import AudioBooksNav from "./AudioBooksNav";
import { Slider } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { useGetContentById, useGetTrendingAudioBooks } from "@/api/queries";
import { getUserState } from "@/store/authStore";
import useStore from "@/store";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type TAudioBook = {
  name: string;
  slug: string;
  order: number;
  file: string;
  thumbnail: string;
};
const BookLayout = () => {
  // const { audiobooks,  } = useParams();
  const contentId = localStorage.getItem("contentId");
  const [user] = useStore(getUserState);
  const { data } = useGetContentById(
    contentId?.toString()!,
    user?.user_id?.toString()!
  );
  const audiobook = data?.data.data.media[0];
  console.log(audiobook);
  const [startRead, setStartRead] = useState(false);
  const { state } = useLocation();
  console.log(state);
  const { data: trendingData } = useGetTrendingAudioBooks();
  console.log("Trending Audios ", trendingData);
  return (
    <div className=" ">
      <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd]  ">
        <div className=" ">
          {audiobook && (
            <AudioBooksNav
              category="Audiobooks"
              // genre={audiobooks}
              title={audiobook?.name}
            />
          )}
        </div>
        <div className="flex-grow  h-full ">
          <div className="flex-grow  mt-5 rounded-2xl">
            <div className="flex h-full  gap-4  flex-grow-1 flex-col ">
              {audiobook && !startRead && (
                <AboutPage
                  audiobook={audiobook}
                  setStartRead={() => setStartRead(true)}
                />
              )}

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
}: {
  audiobook: TAudioBook;
  setStartRead: () => void;
}) => {
  return (
    <div className="bg-[#003914]  w-[100%] flex rounded-3xl px-10 py-5">
      <div className="flex basis-full  border-r-2 justify-center items-center gap-4 border-[#008A3B]  ">
        <p className="flex flex-col w-full ">
          {audiobook ? (
            <LazyLoadImage
              src={audiobook?.thumbnail}
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
          <span className="font-bold font-Recoleta text-white text-[30px]">
            {audiobook?.name}
          </span>
          <span className="mt-4 text-[#008A3B]  "></span>
          <p className="mt-40 flex gap-4">
            <button
              onClick={setStartRead}
              className="px-16 py-3 border text-white border-white rounded-3xl"
            >
              Play
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
          <p className="text-[#008A3B]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            sed blanditiis dolorem voluptate doloremque culpa fugiat neque,
            adipisci, vero unde ipsa incidunt, ullam animi voluptatem. Ab
            cupiditate obcaecati officiis nesciunt.
          </p>
        </div>
        <div>
          <h1 className="text-white font-bold  font-Hanken text-[25px] my-4">
            Overview
          </h1>
          <p className="text-[#008A3B]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            repudiandae veniam sequi odio, itaque autem. Odio iste ad
            accusantium impedit atque ea recusandae quo, non fugit alias
            eligendi quisquam voluptates?
          </p>
        </div>
      </div>
    </div>
  );
};

const ReadPage = ({ audiobook }: { audiobook: TAudioBook }) => {
  return (
    <div className="flex bg-[#fff7fd] py-5 gap-16 rounded-3xl ">
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // const progressBar = useRef<HTMLInputElement>(null);
  const [currentTTime, setCurrentTTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const max = 20;

  useEffect(() => {
    let seconds;
    console.log("effect duration", audioRef.current?.duration);
    if (audioRef.current) {
      seconds = Math.floor(audioRef?.current.duration);
      setDuration(+seconds);
    }
    // if (progressBar?.current) {
    //   progressBar.current.max = seconds?.toString() || "";
    // }
  }, [audioRef?.current?.onloadedmetadata, audioRef?.current?.readyState]);

  const calculateTime = (secs: number) => {
    if (audioRef.current) {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}: ${returnedSeconds}`;
    }
  };

  console.log("actual currentTime", currentTTime);

  const reducedMotion = useReducedMotion();

  const handleSliderChange = (value: number) => {
    console.log("new current time", value);
    setCurrentTTime(value);
    if (audioRef.current) {
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
  const [, setLoad] = useState(false);
  return (
    <div className="h-[229px]">
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
          <Slider
            color="violet"
            // backgroundColor=""
            value={currentTTime}
            onChange={handleSliderChange}
            min={0}
            max={duration}
            step={0.1}
            label={`Duration: ${calculateTime(currentTTime)}`}
            disabled={reducedMotion}
            // onLoadedMetadata={handleTimeUpdate}
            // onTimeUpdate={handleTimeUpdate}
          />
          <style>
            {`
            .mantine-157yjkz{
              background-color:#8530C1 !important;
            }
            .mantine-ejm21a{
              border-color:white !important;
              background-color:#8530C1 !important;
              padding:5px !important;
              box-shadow: 0 0 5px 0 #8530C1 !important;
            }
            .mantine-11g3ikq {
              background-color:#8530C1 !important;

            }
            `}
          </style>
        </p>

        {/* <p className="flex-grow w-20">
          {duration ? calculateTime(duration) : `0:00`}
        </p> */}
        {/* <Progress value={(currentTTime * 100) / duration} /> */}
      </div>

      {/* <Progress value={(currentTTime * 100) / duration} /> */}

      <div className="flex  justify-between ">
        <p>{currentTTime && calculateTime(currentTTime)}</p>
        <p>{duration ? calculateTime(duration) : `0:00`}</p>
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex justify-center h-[72px]">
          <audio
            onTimeUpdate={(event) => {
              setCurrentTTime(+event.currentTarget.currentTime);
            }}
            onEnded={() => {
              setIsPlaying(false);
              // setEnded(true);
            }}
            ref={audioRef}
            src={audio!}
            onLoad={() => setLoad(true)}
          ></audio>
          <div className="flex h-[72px] justify-end rounded-full gap-10 px-10 py-4 bg-[#FBECFF] items-center ">
            <button onClick={handeSkip10("backward")}>
              <img
                loading="lazy"
                src={FastBackward}
                alt="backward"
                className="w-[50px] h-[50px]"
              />
            </button>
            <button onClick={handlePlayControl}>
              <img
                src={isPlaying ? PauseIcon : PlayIcon}
                alt=""
                className="w-[40px]"
              />
            </button>
            <button onClick={handeSkip10("forward")}>
              <img
                loading="lazy"
                src={FastForward}
                alt="forward"
                className="w-[50px] h-[50px]"
              />
            </button>
          </div>
        </div>
        <div className=" flex justify-center items-center gap-5 ">
          <img
            loading="lazy"
            src={VolumeIcon}
            alt="volume"
            className="w-[20px]"
          />
          {/* <input
          type="range"
          className="mr-2   text-[#8530C1] bg-[#8530C1] w-[100px]"
          min={0}
          max={max}
          id="input"
          onChange={(e) => handleVolume(e)}
        /> */}
          <p className="w-[100px]">
            <Slider
              color="violet"
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={max}
              disabled={reducedMotion}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
