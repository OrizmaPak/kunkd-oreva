import { useState } from "react";
// import { Skeleton } from "@mantine/core";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import {useGetContentById} from "@/api/queries"
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import {
  useGetLikedContent,
  useLikedContent,
  useUnLikedContent,
} from "@/api/queries";
import { getApiErrorMessage } from "@/api/helper";

import { notifications } from "@mantine/notifications";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";

export type CardProps = {
  id?: number;
  name?: string;
  slug?: string;
  thumbnail?: string;
  category?: string;
  theme?: string;
  goTo?: () => void;
};

const CardHome = ({ name, thumbnail, id, goTo }: CardProps) => {
  const handleClick = () => {
    if (goTo) goTo();

    localStorage.setItem("contentId", id?.toString()!);
  };
  const [visiblee, setVisiblee] = useState(false);
  const profileId = localStorage.getItem("profileId");
  const { data, refetch } = useGetLikedContent(profileId!);
  const likeContents: TStoryContent[] = data?.data.data.records;
  // console.log("data", likeContents);
  const { mutate } = useLikedContent();
  const { mutate: unFavoriteMutate } = useUnLikedContent();
  const isLiked = likeContents?.filter((content) => content.id === id);
  // console.log("isLiked", isLiked);
  const handleLikedContent = () => {
    handleShake();
    if (isLiked?.length === 0 || isLiked === undefined) {
      mutate(
        {
          content_id: Number(id),
          profile_id: Number(profileId),
        },
        {
          onSuccess(data) {
            console.log("success", data.data.message);
            // const res = data?.data?.data as TUser;
            // setUser({ ...res });
            refetch();
            notifications.show({
              title: `Notification`,
              message: name + " added to list",
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
          content_id: Number(id),
          profile_id: Number(profileId),
        },
        {
          onSuccess(data) {
            console.log("success", data.data.message);
            // const res = data?.data?.data as TUser;
            // setUser({ ...res });
            refetch();
            notifications.show({
              title: `Notification`,
              message: name + " removed from the list",
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

  const [isShaking, setIsShaking] = useState(false);

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 500); // Reset shaking after 0.5 seconds
  };
  return (
    <div className="w-[200px] z-[1]  hover:scale-[102%] transition-all">
      <span className="relative group hover:block">
        <LazyLoadImage
          src={thumbnail}
          placeholderSrc={AfamBlur}
          effect="blur"
          className=" rounded-xl"
          wrapperClassName=""
          width={200}
          height={200}
          onMouseMove={() => {
            setVisiblee(true);
            console.log(visiblee);
          }}
          onMouseMoveCapture={() => setVisiblee(false)}
        />
        <span className=" group-hover:block  bg-[rgba(0,0,0,.5)] hidden absolute left-0 top-0   transition-all duration-100  h-[200px] w-[200px] z-50  rounded-xl">
          <button
            onClick={handleLikedContent}
            // className="px-4 py-2"
            className={`px-4 py-2 rounded-md transition-all   ${
              isShaking ? "animate-shake" : ""
            }`}
          >
            {isLiked?.length > 0 ? (
              <MdOutlineFavorite size="25" color="white" />
            ) : (
              <MdFavoriteBorder size="25" color="white" />
            )}
            <style>{`
            @keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

.animate-shake {
  animation: shake 0.5s infinite;
}`}</style>
          </button>
          <p className="">
            <button
              onClick={handleClick}
              className="mx-auto flex  border-white  justify-center items-center  border-[2px]  text-transparent px-5 bg-[rgba(255,255,255,.3)]    py-3  font-semibold my-auto mt-12"
            >
              <span className="bg-white  w-[80px] h-[8px] rounded-3xl inline-block">
                {" "}
                dsnfsgvjns
              </span>
            </button>
          </p>
        </span>
      </span>
      {name ? (
        <p className="mt-[10px]  text-[16px] font-Hanken font-semibold ">
          {name}
        </p>
      ) : null}
    </div>
  );
};

export default CardHome;
