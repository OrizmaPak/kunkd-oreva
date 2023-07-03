import { useParams, useNavigate } from "react-router-dom";
import AfricanLanguagesNav from "./AfricanLanguagesNav";
import { africanLanguagesData } from "./AfricanLanguages";
import { useState, useRef } from "react";

import SaveIcon from "@/assets/saveIcon.svg";
import ShareIcon from "@/assets/shareIcon.svg";
import Congrats from "@/assets/congrats.svg";
import VideoFIcon from "@/assets/videoF.svg";
import VideoBIcon from "@/assets/videoB.svg";

const VideoPlayer = () => {
  const [isfinish, setIsFinsh] = useState(false);
  const { lan_type, id } = useParams();
  const video = africanLanguagesData.find((data) => data.id === id);
  console.log(video);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handeSkip10 = (direction: "forward" | "backward") => () => {
    const videoCon = videoRef.current;
    // setEnded(false);
    const duration = videoCon?.duration || 0;
    const currentTime = videoCon?.currentTime || 0;

    console.log("duration", videoCon?.duration, videoCon?.currentTime);
    if (videoCon && direction === "forward") {
      videoCon.currentTime +=
        currentTime + 10 > duration ? duration - currentTime : 10;
      return;
    } else if (videoCon && direction === "backward") {
      videoCon.currentTime -= currentTime - 10 < 0 ? currentTime : 10;
      return;
    }
  };

  return (
    <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col px-10 bg-[#fff7fd]">
      <div className="">
        <AfricanLanguagesNav
          category="Africanlanguages"
          lanType={lan_type?.toUpperCase()}
          title={video && video.title}
        />
      </div>
      {!isfinish ? (
        <div className="  flex-grow mt-5  gap-10 rounded-3xl flex w-[100%]">
          <div className="  basis-full  flex flex-col">
            <div className="basis">
              <div className="  rounded-t-3xl flex flex-col relative group">
                <button
                  onClick={() => setIsFinsh(true)}
                  className="py-4  text-[#8530C1]   z-50 px-14 flex gap-4 justify-center items-center rounded-3xl bg-white right-8  top-4 absolute"
                >
                  Finish
                </button>
                <video
                  className=" rounded-t-3xl flex-grow"
                  src={video?.videoBook}
                  autoPlay
                  ref={videoRef}
                  controls
                ></video>
                <div className="absolute  group-hover:flex  hidden  gap-[200px] left-1/2 top-40 transform -translate-x-1/2 ">
                  <button onClick={handeSkip10("backward")}>
                    <img src={VideoBIcon} alt="icon" className="w-[150px]" />
                  </button>
                  <button onClick={handeSkip10("forward")}>
                    <img src={VideoFIcon} alt="icon" className="w-[150px]" />
                  </button>
                </div>
              </div>
              <div className=" bg-white py-8  rounded-b-3xl px-24 flex justify-between  items-center">
                <p className="text-[20px] font-bold ">{video?.title}</p>
                <p className="flex gap-5 text-[#8530C1]">
                  <button className="py-3 px-10 flex gap-4 justify-center items-center rounded-3xl bg-[#FBECFF]">
                    <img
                      loading="lazy"
                      src={SaveIcon}
                      alt="icon"
                      className="w-[20px]"
                    />
                    <span>Save</span>
                  </button>
                  <button className="py-3 px-10 flex gap-4 justify-center items-center rounded-3xl bg-[#FBECFF]">
                    <img
                      loading="lazy"
                      src={ShareIcon}
                      alt="icon"
                      className="w-[20px]"
                    />
                    <span>Share</span>
                  </button>
                </p>
              </div>

              <div className="mt-4 bg-white left-10 p-10 rounded-3xl leading-10">
                <p>{video?.content}</p>
              </div>
            </div>

            <div></div>
          </div>

          <div className="  basis-3/6 rounded-3xl bg-white px-10">
            <h1 className="text-[30px] font-bold font-Recoleta my-3 ">
              Recommended Videos
            </h1>
            <div>
              {africanLanguagesData.slice(1, 6).map((data, index) => (
                <RecommendedVideoCard key={index} {...data} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <WelDone />
      )}
    </div>
  );
};

export default VideoPlayer;

const RecommendedVideoCard = ({
  title,
  onClick,
  image,
}: {
  title?: string;
  onClick?: () => void;
  image?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-4 bg-[#fff7fd]  items-center my-8  rounded-3xl"
    >
      <img loading="lazy" src={image} alt="image" className="w-[130px]" />
      <span className=" text-black text-[20px] font-Recoleta font-bold">
        {title}
      </span>
    </div>
  );
};

const WelDone = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-full flex-grow mt-4 flex justify-center bg-white rounded-3xl items-center">
      <div>
        <p className="flex justify-center items-center">
          <img
            loading="lazy"
            src={Congrats}
            alt="congrats"
            className="w-[200px]"
          />
        </p>
        <div className="text-center">
          <h1 className="text-[30px] font-Recoleta font-bold">Well Done!</h1>
          <p className="text-[#7E7E89] text-[18px]">
            You have just finished watching Chisom’s Eco-friendly Visit.
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
