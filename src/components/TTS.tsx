import { useTts } from "tts-react";
import type { TTSHookProps } from "tts-react";
// import Button from "./Button";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Slider, MantineProvider } from "@mantine/core";
import { useLocation } from "react-router-dom";

interface CustomProps extends TTSHookProps {
  highlight?: boolean;
  setPageNumber: () => void;
  autoPlay?: boolean;
  pageNumber?: number;
  pageTotal?: number;
  setIsFinish: () => void;
  setPage: (val: number) => void;
}

const CustomTTSComponent = ({
  children,
  highlight = true,
  setPageNumber,
  autoPlay,
  setPage,
  pageNumber,
  pageTotal,
  setIsFinish,
}: CustomProps) => {
  // const voice = speechSynthesis.getVoices()[5];

  const { ttsChildren, play, pause, stop } = useTts({
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
  const [showPlay, setShowPlay] = useState(false);
  const location = useLocation();

  useEffect(() => {
    return () => {
      stop();
    };

    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    setShowPlay(false);
  }, [pageNumber]);

  const handleVolumeChange = (value: number) => {
    setPage(value);
  };
  return (
    <div>
      <p className=" leading-10  h-[350px] overflow-y-auto  text-[16px] font-medium font-Hanken  text-justify ">
        {ttsChildren}
      </p>

      <div className="flex gap-3 items-center">
        {showPlay && (
          <button
            className="  py-1 px-8 rounded-3xl "
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
            className="py-1 px-8 rounded-3xl "
            onClick={() => {
              setShowPlay(true);
              pause();
            }}
          >
            <BsPauseCircleFill size={40} color="#8530C1" />
          </button>
        )}

        <div className="flex-grow pt-4 ">
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
              onChange={handleVolumeChange}
              color="ocean-blue.0"
              // defaultValue={pageTotal! / pageNumber!}
              value={pageNumber}
              max={pageTotal}
              min={1}
              // disabled={reducedMotion}
              styles={{ markLabel: { display: "none" } }}
            />
          </MantineProvider>
          <p className="text-center text2">
            <span>{pageNumber}</span> of <span>{pageTotal}</span>
          </p>
        </div>

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
              className=" bg-green-600 rounded-3xl text-white py-3 px-8"
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
