import { useTts } from "tts-react";
import type { TTSHookProps } from "tts-react";
// import Button from "./Button";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { useState } from "react";

interface CustomProps extends TTSHookProps {
  highlight?: boolean;
  setPageNumber: () => void;
  autoPlay?: boolean;
  pageNumber?: number;
  pageTotal?: number;
  setIsFinish: () => void;
}

const CustomTTSComponent = ({
  children,
  highlight = true,
  setPageNumber,
  autoPlay,
  pageNumber,
  pageTotal,
  setIsFinish,
}: CustomProps) => {
  // const voice = speechSynthesis.getVoices()[5];

  const { ttsChildren, play, pause } = useTts({
    children,
    markTextAsSpoken: highlight,
    rate: 0.6,
    autoPlay,
    // markBackgroundColor: "red",
    // markColor: "blue",
    // voice,
    onEnd: () => {
      setPageNumber();
    },
  });
  const [showPlay, setShowPlay] = useState(true);
  return (
    <div>
      <p className=" leading-10  h-[350px] overflow-y-auto  text-[16px] font-medium font-Hanken  text-justify ">
        {ttsChildren}
      </p>

      <div className="flex gap-3">
        {showPlay && (
          <button
            className="  py-1 px-8 rounded-3xl ml-2"
            // disabled={state.isPlaying}
            onClick={() => {
              setShowPlay(false);
              play();
            }}
          >
            <BsFillPlayCircleFill size={40} color="#8530C1" />
          </button>
        )}

        {!showPlay && (
          <button
            className="py-1 px-8 rounded-3xl ml-2"
            // disabled={!state.isPlaying}
            onClick={() => {
              setShowPlay(true);
              pause();
            }}
          >
            <BsPauseCircleFill size={40} color="#8530C1" />
          </button>
        )}

        {/* <button
          onClick={() => {
            state.isPlaying ? play() : pause();
            console.log("play");
          }}
        >
          {state.isPlaying ? (
            <BsPauseCircleFill size={40} color="#8530C1" />
          ) : (
            <BsFillPlayCircleFill size={40} color="#8530C1" />
          )}
        </button> */}

        {pageNumber === pageTotal && (
          <>
            {/* <button
              onClick={()=>setPageNumber(1)}
              className="p-2 bg-green-600 rounded-3xl text-white px-8"
            >
              Restart
            </button> */}
            <button
              onClick={setIsFinish}
              className=" bg-green-600 rounded-3xl text-white px-8"
            >
              Finish
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default CustomTTSComponent;
