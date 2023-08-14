import Video1 from "@/assets/video1.svg";
import { useGetIntroVideo } from "@/api/queries";
import { useInView } from "react-intersection-observer";
import { useEffect, useCallback, useRef } from "react";

const VideoCard = () => {
  const { data, isLoading } = useGetIntroVideo();
  console.log(data);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const vidRef = useRef<HTMLVideoElement>();
  const setRefs = useCallback(
    (node: HTMLVideoElement) => {
      // Ref's from useRef needs to have the node assigned to `current`
      vidRef.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      ref(node);
    },
    [ref]
  );

  useEffect(() => {
    const current = vidRef.current;
    if (!current) return;
    if (inView) {
      current.play();
    } else {
      current.pause();
    }
  }, [inView]);

  console.log(inView);
  return (
    <div className="flex justify-center items-center mb-28">
      {/* <Status inView={inView} /> */}
      {/* <img loading="lazy" src={Video1} alt="" /> */}
      <video
        src={data?.data.data.url}
        autoPlay={!inView}
        controls
        height={605}
        width={1000}
        ref={setRefs}
        className=" rounded-2xl"
      ></video>
    </div>
  );
};

export default VideoCard;
