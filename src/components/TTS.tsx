import { useTts } from "tts-react";
import type { TTSHookProps } from "tts-react";
// import Button from "./Button";

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

  const { ttsChildren, state, play, stop, pause } = useTts({
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

  return (
    <div>
      <p className=" leading-10  h-[350px] overflow-y-auto  text-[16px] font-medium font-Hanken pr-8 text-justify ">
        {ttsChildren}
      </p>

      <div>
        <button
          className=" border border-[#8530C1] py-1 px-8 rounded-3xl ml-2"
          disabled={state.isPlaying}
          onClick={play}
        >
          Play
        </button>
        <button
          className=" border border-[#8530C1] py-1 px-8 rounded-3xl ml-2"
          disabled={!state.isPlaying}
          onClick={pause}
        >
          Pause
        </button>
        <button
          className=" border border-[#8530C1] py-1 px-8 rounded-3xl ml-2"
          onClick={stop}
        >
          Stop
        </button>

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
              className="p-2 bg-green-600 rounded-3xl text-white px-8"
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
