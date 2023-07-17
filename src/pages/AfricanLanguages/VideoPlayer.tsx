import { useParams, useNavigate } from "react-router-dom";
import AfricanLanguagesNav from "./AfricanLanguagesNav";
import { africanLanguagesData } from "./AfricanLanguages";
import { useState, useRef } from "react";
import SaveIcon from "@/assets/saveIcon.svg";
import ShareIcon from "@/assets/shareIcon.svg";
import Congrats from "@/assets/congrats.svg";

const VideoPlayer = () => {
  const [isfinish, setIsFinsh] = useState(false);
  const { lan_type, id } = useParams();
  const video = africanLanguagesData.find((data) => data.id === id);
  console.log(video);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col  bg-[#fff7fd]">
      <div className="">
        <AfricanLanguagesNav
          category="Africanlanguages"
          lanType={lan_type}
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
                  className="py-3  text-[#8530C1]   z-50 px-8 flex gap-4 justify-center items-center rounded-3xl bg-white right-8  top-4 absolute"
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
              </div>
              <div className=" bg-white py-8  rounded-b-3xl px-24 flex justify-between  items-center">
                <p className="text-[20px] font-bold ">{video?.title}</p>
                <p className="flex gap-5 text-[#8530C1]">
                  <button className="py-3 px-7 flex gap-4 justify-center items-center rounded-3xl bg-[#FBECFF]">
                    <img
                      loading="lazy"
                      src={SaveIcon}
                      alt="icon"
                      className="w-[20px]"
                    />
                    <span>Save</span>
                  </button>
                  <button className="py-3 px-7 flex gap-4 justify-center items-center rounded-3xl bg-[#FBECFF]">
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
            <h1 className="text-[24px]  font-semibold font-Recoleta my-3 ">
              Recommended Videos
            </h1>
            <div>
              {africanLanguagesData.slice(1, 7).map((data, index) => (
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
      className="flex h-[100px] gap-4 bg-[#fffbff]  items-center my-8  rounded-2xl border-[2px] border-[#fbeff8]"
    >
      <img loading="lazy" src={image} alt="image" className=" h-[100px]" />
      <span className=" text-black text-[16px]  font-Hanken font-semibold">
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
