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
import "./cardhome.css";
import { Progress } from "@mantine/core";

export type CardProps = {
  id?: number;
  name?: string;
  slug?: string;
  thumbnail?: string;
  category?: string;
  theme?: string;
  pages?: TStoryContent[];
  pages_read?: number;
  goTo?: () => void;
};

const CardHome = ({
  name,
  thumbnail,
  id,
  goTo,
  pages_read,
  pages,
  hasRage,
}: TStoryContent & { goTo?: () => void; hasRage?: boolean }) => {
  const totalPage = pages?.length;
  const range = Math.ceil((100 / totalPage!) * pages_read!);

  const handleClick = () => {
    if (goTo) goTo();

    localStorage.setItem("contentId", id?.toString()!);
    localStorage.setItem(
      "continuePage",
      pages_read ? pages_read?.toString()! : "1"
    );
  };
  const [visiblee, setVisiblee] = useState(false);
  const profileId = localStorage.getItem("profileId");
  const { data, refetch } = useGetLikedContent(profileId!);
  const likeContents: TStoryContent[] = data?.data.data.records;
  const { mutate } = useLikedContent();
  const { mutate: unFavoriteMutate } = useUnLikedContent();
  const isLiked = likeContents?.filter((content) => content.id === id);
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
    <div className=" z-[1]  hover:scale-[102%] transition-all mx-2 py-4">
      <span className="relative image-card ">
        <LazyLoadImage
          src={thumbnail}
          placeholderSrc={AfamBlur}
          effect="blur"
          className=" rounded-xl card"
          wrapperClassName="card relative
          "
          onMouseMove={() => {
            setVisiblee(true);
            console.log(visiblee);
          }}
          onMouseMoveCapture={() => setVisiblee(false)}
        />

        <span className=" card-hover bg-[rgba(0,0,0,.5)] hidden  absolute left-0 top-[-184px] card transition-all duration-100   z-50  rounded-xl">
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
  animation: shake 0.3s infinite;
}`}</style>
          </button>
          <p className="">
            <button
              onClick={handleClick}
              className="mx-auto flex  border-white text2  text-white justify-center items-center  border-[2px]   rounded-2xl px-12 bg-[rgba(255,255,255,.3)]    py-2   font-semibold my-auto mt-12"
            >
              {/* <span className="bg-white text-black  w-[80px] h-[8px] rounded-3xl inline-block"> */}
              view
              {/* </span> */}
            </button>
          </p>
        </span>
      </span>

      {!hasRage ? (
        <p className="mt-[2px]  text3 font-Hanken font-semibold  leading-2">
          {name}
        </p>
      ) : (
        <p className="mt-[2px]  text3 font-Hanken font-semibold  leading-2">
          <p className="mt-[0px] font-bold font-Hanken flex justify-between items-center gap-4 px-4 ">
            <span>{range ? range : 50}%</span>
            <p className="rounded-3xl flex-1 ">
              {hasRage ? (
                range < 20 ? (
                  <Progress value={range} color="red" />
                ) : range && range < 50 ? (
                  <Progress value={range} color="yellow" />
                ) : range && range < 50 ? (
                  <Progress value={range} color="green" />
                ) : (
                  <Progress value={50} color="green" />
                )
              ) : (
                ""
              )}

              {/* <Progress value={20} size="xs" colorScheme="pink" /> */}
            </p>
          </p>
        </p>
      )}
    </div>
  );
};

export default CardHome;
