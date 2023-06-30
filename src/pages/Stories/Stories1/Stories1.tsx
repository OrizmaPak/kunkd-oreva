import StoriesNav from "./StoriesNav";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { storiesData, StoriesType } from "../Stories";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
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
  const { id, story_type } = useParams();
  const { state } = useLocation();
  console.log(state);
  const story = storiesData.find((el) => `${el.id}` === id);
  return (
    <div className="  ">
      <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col bg-[#fff7fd] ">
        {/* <div className="flex flex-col h-full"> */}

        <div className=" ">
          {story && (
            <StoriesNav
              category="Stories"
              genre={story_type}
              title={story?.title}
            />
          )}
        </div>

        <div className="  ">
          <div className=" mt-5 rounded-2xl">
            {!isFinish ? (
              <div className="flex h-full  gap-4  flex-col ">
                {story && !startRead && (
                  <AboutPage
                    story={story}
                    setStartRead={() => setStartRead(true)}
                  />
                )}

                {story && startRead && (
                  <ReadPage
                    story={story}
                    setIsFinish={() => setIsFinish(true)}
                  />
                )}

                <div className="w-full bg-white rounded-3xl mt-4">
                  {
                    <CardScreen
                      data={storiesData?.slice(1, 7).map((el) => ({ ...el }))}
                      card={(props: StoriesType) => <Card {...props} />}
                      header="Trending"
                      actiontitle="View all"
                      isTitled={true}
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
  story: StoriesType;
  setStartRead: () => void;
}) => {
  return (
    <div className="bg-[#5D0093] flex rounded-3xl px-5  py-10 border-red-700 border-8">
      <div className="flex basis-full  border-r-2 border-[#BD6AFA]  ">
        <p className="flex flex-col w-full">
          <img src={story?.image} alt="image " className="w-[300px]" />
        </p>
        <p className="flex flex-col w-full  ">
          <span className="font-bold font-Recoleta text-white text-[30px]">
            {story?.title}
          </span>
          <span className="mt-4 text-[#BD6AFA]  ">{story?.author}</span>
          <p className="mt-40 flex gap-4">
            <button
              onClick={setStartRead}
              className="px-16 py-3 border text-white border-white rounded-3xl"
            >
              Read
            </button>
            <img src={Bookmark} alt="bookmark" />
          </p>
        </p>
      </div>
      <div className=" basis-4/4 text-[#BD6AFA] px-10">
        <div>
          <h1 className="text-white font-bold  font-Hanken text-[25px] my-4">
            About the author
          </h1>
          <p>{story?.aboutAuthor}</p>
        </div>
        <div>
          <h1 className="text-white font-bold  font-Hanken text-[25px] my-4">
            Overview
          </h1>
          <p>{story?.overView}</p>
        </div>
      </div>
    </div>
  );
};

const ReadPage = ({
  story,
  setIsFinish,
}: {
  story: StoriesType;
  setIsFinish: () => void;
}) => {
  const [isReading, setIsReading] = useState(false);

  return (
    <div className="flex py-16 bg-white  rounded-3xl px-16">
      <div className=" basis-3/4 flex  items-center">
        <img src={story.image} alt="image" className="w-[400px]" />
      </div>
      <div className=" basis-full flex flex-col ">
        <div className="flex-grow">
          <p className="mb-5">
            <Button
              onClick={() => setIsReading(true)}
              size="md"
              color="black"
              varient="outlined"
            >
              Read to me
            </Button>
          </p>
          <p className=" leading-10">{story.content}</p>
        </div>

        <div>
          {isReading ? (
            <AudioControls audio={story.audioBook} setIsFinish={setIsFinish} />
          ) : (
            <BookPagination setIsFinish={setIsFinish} />
          )}
        </div>
      </div>
    </div>
  );
};

const BookPagination = ({ setIsFinish }: { setIsFinish: () => void }) => {
  const pageTotal = 5;
  const [currentPage, setCurrentage] = useState(1);
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
          <p>Pages 5 </p>
          <img src={ArrowDown} alt="arrow" className="w-[15px]" />
        </span>
        <div className="flex gap-4">
          <p className="bg-[#8530C1] text-white p-3 rounded-3xl px-8 gap-8 flex justify-between  items-center">
            <button onClick={() => pageItirate("prev")}>
              <img src={PreviousIcon} alt="icon" />
            </button>
            {currentPage !== pageTotal && <span>{currentPage}</span>}
            {currentPage !== pageTotal && <span>/</span>}
            {currentPage !== pageTotal && <span>{pageTotal}</span>}
            {currentPage !== pageTotal && (
              <button onClick={() => pageItirate("next")}>
                <img src={NextIcon} alt="icon" />
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
          <img src={FastBackward} alt="backward" />
        </button>
        <button onClick={handlePlayControl}>
          <img
            src={isPlaying ? PauseIcon : PlayIcon}
            alt=""
            className="w-[40px]"
          />
        </button>
        <button onClick={handeSkip10("forward")}>
          <img src={FastForward} alt="forward" />
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
    <div className=" h-[calc(100vh-60px-8vh-60px)] flex justify-center bg-white flex-grow rounded-3xl items-center">
      <div className="">
        <p className="flex justify-center items-center">
          <img src={Congrats} alt="congrats" className="w-[200px]" />
        </p>
        <div className="text-center">
          <h1 className="text-[30px] font-Recoleta font-bold">Well Done!</h1>
          <p className="text-[#7E7E89] text-[18px]">
            You have just finished reading Chisom’s Eco-friendly Visit.
          </p>
        </div>
        <p className="flex flex-col gap-y-5 mt-16">
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
