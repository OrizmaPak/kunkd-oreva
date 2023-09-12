import { useParams, useNavigate } from "react-router-dom";
import AfricanLanguagesNav from "./AfricanLanguagesNav";
// import { africanLanguagesData } from "./AfricanLanguages";
import { useState, useRef } from "react";
import SaveIcon from "@/assets/saveIcon.svg";
import ShareIcon from "@/assets/shareIcon.svg";
import Congrats from "@/assets/congrats.svg";
import {
  useGetContentById,
  useGetRecommendedVideo,
  useContentTracking,
  useUnLikedContent,
  useGetLikedContent,
  useLikedContent,
} from "@/api/queries";
import { getUserState } from "@/store/authStore";
import useStore from "@/store";
import "video-react/dist/video-react.css";
import ReactHlsPlayer from "react-hls-player";
import { Skeleton } from "@mantine/core";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect } from "react";
import { getApiErrorMessage } from "@/api/helper";
import { notifications } from "@mantine/notifications";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { Menu } from "@mantine/core";
import { TStoryContent } from "../Stories/Stories1/Stories1";

type TRecommendedVideo = {
  id: number;
  category_id: number;
  category: string;
  content_type_id: number;
  content_type: string;
  name: string;
  slug: string;
  synopsis: string;
  theme: string;
  tags: string;
  has_quiz: boolean;
  media_type: string;
  thumbnail: string;
  media: [];
  is_liked: boolean;
  short_link: string;
};
const VideoPlayer = () => {
  const [isfinish, setIsFinsh] = useState(false);
  const { lan_type } = useParams();
  const contentId = localStorage.getItem("contentId");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [user] = useStore(getUserState);
  const { data, isLoading } = useGetContentById(
    contentId?.toString()!,
    user?.user_id?.toString()!
  );
  const { data: recommendedData, isLoading: recommendedIsLoading } =
    useGetRecommendedVideo(contentId?.toString()!);
  const recommendedVideos = recommendedData?.data?.data.recommended_contents;
  const video = data?.data.data.media[0];
  const videoData = data?.data.data.sub_categories[0];
  const [currentVideoTime, setCurrentVideotime] = useState(0);
  const { mutate } = useContentTracking();
  const profileId = localStorage.getItem("profileId");
  const [delay, setDelay] = useState(0);

  setInterval(() => {
    setDelay((prev) => prev++);
  }, 1000);

  useEffect(() => {
    mutate(
      {
        profile_id: Number(profileId),
        content_id: Number(contentId),
        status: "ongoing",
        pages_read: Math.ceil(currentVideoTime),
        timespent: Math.ceil(currentVideoTime),
      },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
        },
        onError(err) {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  }, [delay]);

  const { data: likeData, refetch } = useGetLikedContent(profileId!);
  const likeContents: TStoryContent[] = likeData?.data.data.records;
  const { mutate: likeMutate } = useLikedContent();
  const { mutate: unFavoriteMutate } = useUnLikedContent();
  const isLiked = likeContents?.filter(
    (content) => content.id === Number(contentId)
  );
  const handleLikedContent = () => {
    // handleShake();
    if (isLiked?.length === 0 || isLiked === undefined) {
      likeMutate(
        {
          content_id: Number(contentId)!,
          profile_id: Number(profileId),
        },
        {
          onSuccess() {
            // const res = data?.data?.data as TUser;
            // setUser({ ...res });
            refetch();
            notifications.show({
              title: `Notification`,
              message: video?.name + " added to list",
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
          content_id: Number(contentId)!,
          profile_id: Number(profileId),
        },
        {
          onSuccess() {
            refetch();
            notifications.show({
              title: `Notification`,
              message: video?.name + " removed from the list",
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
    <div className=" min-h-[calc(92vh-60px)] h-[100%] flex flex-col  bg-[#fff7fd]">
      <div className="">
        <Skeleton visible={isLoading} radius={"xl"}>
          <AfricanLanguagesNav
            category="Africanlanguages"
            lanType={lan_type}
            title={video && video.name}
            subCategoryId={videoData?.sub_category_id}
            subCategoryName={videoData?.sub_category_name}
          />
        </Skeleton>
      </div>
      {!isfinish ? (
        <div className="  flex-grow mt-5  gap-10 rounded-3xl flex w-[100%]">
          <Skeleton visible={isLoading}>
            <div className="  basis-full  flex flex-col">
              <div className="basis">
                <div className="  rounded-t-3xl flex flex-col relative group">
                  <button
                    onClick={() => setIsFinsh(true)}
                    className="py-3  text-[#8530C1]   z-50 px-8 flex gap-4 justify-center items-center rounded-3xl bg-white right-8  top-4 absolute"
                  >
                    Finish
                  </button>
                  {video?.file && (
                    <ReactHlsPlayer
                      className=" rounded-t-3xl flex-grow"
                      // poster={video.thumbnail}
                      src={video?.file}
                      autoPlay
                      controls={true}
                      playerRef={videoRef}
                      onTimeUpdate={(event) => {
                        setCurrentVideotime(+event.currentTarget.currentTime);
                      }}
                      width="100%"
                      height={"200px"}
                    />
                  )}
                </div>
                <div className=" bg-white py-8  rounded-b-3xl px-24 flex justify-between  items-center">
                  <p className="text-[20px] font-bold ">{video?.name}</p>
                  <p className="flex gap-5 text-[#8530C1]">
                    <button
                      onClick={handleLikedContent}
                      className="py-3 px-7 flex gap-4 justify-center items-center rounded-3xl bg-[#FBECFF]"
                    >
                      <img
                        loading="lazy"
                        src={SaveIcon}
                        alt="icon"
                        className="w-[20px]"
                      />
                      <span>Save</span>
                    </button>
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <button className="py-3 px-7 flex gap-4 justify-center items-center rounded-3xl bg-[#FBECFF]">
                          <img
                            loading="lazy"
                            src={ShareIcon}
                            alt="icon"
                            className="w-[20px]"
                          />

                          <span>Share</span>
                        </button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <div className="flex justify-center items-center">
                          <Menu.Item>
                            <TwitterShareButton url={video?.file}>
                              <TwitterIcon size={30} />
                            </TwitterShareButton>
                          </Menu.Item>
                          <Menu.Item>
                            <FacebookShareButton url={video?.file}>
                              <FacebookIcon size={30} />
                            </FacebookShareButton>
                          </Menu.Item>
                          <Menu.Item>
                            <WhatsappShareButton url={video?.file}>
                              <WhatsappIcon size={30} />
                            </WhatsappShareButton>
                          </Menu.Item>
                        </div>
                      </Menu.Dropdown>
                    </Menu>
                  </p>
                </div>

                <div className="mt-4 bg-white left-10 p-10 rounded-3xl leading-10">
                  <p>
                    {video?.content} Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Suscipit iste beatae veritatis, corrupti
                    porro minima fugit tempore dicta cum eaque, vero dolore quas
                    unde obcaecati perferendis. Voluptate deserunt similique
                    veniam.
                  </p>
                </div>
              </div>

              <div></div>
            </div>
          </Skeleton>
          <div className="  basis-3/6 rounded-3xl bg-white px-10">
            <h1 className="text-[24px]  font-semibold font-Recoleta my-3 ">
              Recommended Videos
            </h1>
            <div>
              {recommendedIsLoading
                ? Array(6)
                    .fill(1)
                    .map((arr, index) => (
                      <Skeleton
                        key={index}
                        height={100}
                        className="mb-5"
                        visible={recommendedIsLoading}
                      >
                        {arr}
                      </Skeleton>
                    ))
                : recommendedData &&
                  recommendedVideos
                    ?.slice(1, 6)
                    .map((data: TRecommendedVideo, index: number) => (
                      <RecommendedVideoCard
                        subCategory={videoData?.sub_category_name}
                        key={index}
                        {...data}
                      />
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
  name,
  thumbnail,
  slug,
  id,
  subCategory,
}: {
  name?: string;
  slug?: string;
  thumbnail?: string;
  id?: number;
  subCategory?: string;
}) => {
  const navigate = useNavigate();
  const handleGoTo = () => {
    navigate(`../${subCategory}/${slug}`);
    localStorage.setItem("contentId", id?.toString()!);
  };
  return (
    <div
      onClick={handleGoTo}
      className="flex h-[100px] gap-4 bg-[#fffbff]  items-center my-8  rounded-2xl border-[2px] border-[#fbeff8] cursor-pointer"
    >
      {/* <img
        loading="lazy"
        src={thumbnail}
        alt="image"
        className=" h-[100px] rounded-xl"
      /> */}

      <LazyLoadImage
        src={thumbnail}
        placeholderSrc={AfamBlur}
        effect="blur"
        className=" rounded-xl"
        wrapperClassName=""
        width={100}
        height={100}
      />
      <span className=" text-black text-[16px]  font-Hanken font-semibold">
        {name}
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
