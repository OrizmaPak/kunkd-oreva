import { useParams, useLocation } from "react-router-dom";
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

import ExportIcon from "@/assets/exportIcon.svg";
import AudioBooksNav from "./AudioBooksNav";
// import { Slider } from "@mantine/core";

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
const BookLayout = () => {
  const [startRead, setStartRead] = useState(false);
  const { id, story_type } = useParams();
  const { state } = useLocation();
  console.log(state);
  const story = audioBooksData.find((data) => `${data.id}` === id);
  return (
    <div className=" ">
      <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd]  ">
        {/* <div className="flex flex-col h-full"> */}

        <div className=" ">
          {story && (
            <AudioBooksNav
              category="Audiobooks"
              genre={story_type}
              title={story?.title}
            />
          )}
        </div>
        <div className="flex-grow  h-full ">
          <div className="flex-grow  mt-5 rounded-2xl">
            <div className="flex h-full  gap-4  flex-grow-1 flex-col ">
              {story && !startRead && (
                <AboutPage
                  story={story}
                  setStartRead={() => setStartRead(true)}
                />
              )}

              {story && startRead && <ReadPage story={story} />}

              <div className="w-full bg-white rounded-3xl mt-4">
                {
                  <CardScreen
                    data={audioBooksData?.slice(1, 7).map((el) => ({ ...el }))}
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

        {/* </div> */}
      </div>
    </div>
  );
};

export default BookLayout;

const AboutPage = ({
  story,
  setStartRead,
}: {
  story: StoriesType;
  setStartRead: () => void;
}) => {
  return (
    <div className="bg-[#003914]  w-[100%] flex rounded-3xl px-10 py-5">
      <div className="flex basis-full  border-r-2 justify-center items-center gap-4 border-[#008A3B]  ">
        <p className="flex flex-col w-full ">
          <img
            loading="lazy"
            src={story?.image}
            alt="image "
            className="w-[300px]"
          />
        </p>
        <p className="flex flex-col w-full  ">
          <span className="font-bold font-Recoleta text-white text-[30px]">
            {story?.title}
          </span>
          <span className="mt-4 text-[#008A3B]  ">{story?.author}</span>
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
          <p className="text-[#008A3B]">{story?.aboutAuthor}</p>
        </div>
        <div>
          <h1 className="text-white font-bold  font-Hanken text-[25px] my-4">
            Overview
          </h1>
          <p className="text-[#008A3B]">{story?.overView}</p>
        </div>
      </div>
    </div>
  );
};

const ReadPage = ({ story }: { story: StoriesType }) => {
  // const [isReading, setIsReading] = useState(false);

  return (
    <div className="flex bg-[#fff7fd] py-5 gap-16 rounded-3xl ">
      <div className=" basis-3/6 flex  items-center bg-[white] flex-col p-10 rounded-3xl">
        <img
          loading="lazy"
          src={story.image}
          alt="image"
          className="w-[300px]"
        />
        <AudioControls audio={story.audioBook} />
      </div>
      <div className=" basis-full flex flex-col bg-white rounded-3xl p-10 ">
        <div className="flex-grow">
          <p className="mb-5 flex justify-between items-center">
            <span className="text-[#B5B5C3] text-[18px]">Lyrics</span>
            <span>
              <img loading="lazy" src={ExportIcon} alt="" />
            </span>
          </p>
          <p className=" leading-10 text-[22px]">{story.content}</p>
        </div>
      </div>
    </div>
  );
};

const AudioControls = ({ audio }: { audio?: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [ended, setEnded] = useState(false);
  const progressBar = useRef<HTMLInputElement>(null);
  const [currentTTime, setCurrentTTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // const [audioDuration, setAudioDuration] = useState(audioRef.current);

  const handlePlayControl = () => {
    const audioCon = audioRef.current;
    console.log("audio played", audioCon);
    // setEnded(false);
    setIsPlaying(!isPlaying);
    if (audioCon && !audioCon.paused) {
      return audioCon.pause();
    }
    audioRef?.current?.play();
  };

  const handeSkip10 = (direction: "forward" | "backward") => () => {
    const audioCon = audioRef.current;
    // setEnded(false);
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
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const volume = Number(value) / max;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };
  useEffect(() => {
    let seconds;
    console.log("effect duration", audioRef.current?.duration);
    if (audioRef.current) {
      seconds = Math.floor(audioRef?.current.duration);
      setDuration(+seconds);
    }
    if (progressBar?.current) {
      progressBar.current.max = seconds?.toString() || "";
    }
  }, [audioRef?.current?.onloadedmetadata, audioRef?.current?.readyState]);
  // const { story_type, id } = useParams();

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    // console.log("min", secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}: ${returnedSeconds}`;
  };
  const changeRage = () => {
    if (audioRef?.current?.currentTime && progressBar.current) {
      audioRef.current.currentTime = Number(progressBar.current.value);
    }
    if (progressBar.current) {
      setCurrentTTime(+progressBar?.current?.value);
      console.log(currentTTime);
    }
  };
  //   const navigate = useNavigate();

  //   console.log("current time", calculateTime(currentTTime));
  //   console.log("duration", duration);
  console.log("actual duration", Math.floor((currentTTime * 100) / duration));
  // const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   event.target.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`;
  // };
  return (
    <div className="mt-10">
      <div className="my-10 flex">
        <p className=" flex-grow w-20">{calculateTime(currentTTime)}</p>
        <input
          type="range"
          className="mr-2   text-[#8530C1] bg-[#8530C1]  flex-grow w-full"
          ref={progressBar}
          value={currentTTime}
          onChange={changeRage}
          id="input-range1"
          defaultValue={0}
        />
        {/* <p className="w-[100px]">
          <Slider
            value={mantineP}
            // ref={progressBar}
            onChange={() => setMantineP((val) => val + 1)}
            label={null}
            // defaultValue={20}
            // min={0}
            // // scale={(val) => currentTTime + val}
            // max={Number(calculateTime(duration))}
          />
        </p> */}

        <p className="flex-grow w-20">
          {duration ? calculateTime(duration) : `0:00`}
        </p>
        {/* <Progress value={(currentTTime * 100) / duration} /> */}
      </div>
      {/* <Progress value={(currentTTime * 100) / duration} /> */}
      <div className="flex justify-center h-[72px] ">
        <audio
          onTimeUpdate={(event) => {
            setCurrentTTime(+event.currentTarget.currentTime);
          }}
          onEnded={() => {
            setIsPlaying(false);
            // setEnded(true);
          }}
          ref={audioRef}
          src={audio}
        ></audio>
        <div className="flex justify-end rounded-full gap-10 px-20 py-4 bg-[#FBECFF] items-center ">
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
      </div>
      <div className="mt-20 flex gap-5 pr-24">
        <img
          loading="lazy"
          src={VolumeIcon}
          alt="volume"
          className="w-[20px]"
        />
        <input
          type="range"
          className="mr-2   text-[#8530C1] bg-[#8530C1] w-[100px]"
          min={0}
          max={max}
          id="input"
          onChange={(e) => handleVolume(e)}
        />
      </div>
      <style>
        {`
      
          `}
      </style>
    </div>
  );
};
