import {
  useContentForHome,
  useGetOngoingContents,
  useGetUpdatedProfile,
} from "@/api/queries";
import AdsButton from "@/common/User/AdsButton";
import CardHome from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { useEffect, useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { TStoryContent } from "@/api/types";

import "./parenthomepage.css";

const DefaultTab = () => {
  const [useri, setUser] = useStore(getUserState);
  const { data } = useGetUpdatedProfile();
  const currentUserProfile = data?.data?.data;
  useEffect(() => {
    setUser({ ...useri, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);
  const profileId = localStorage.getItem("profileId") as string;
  const { data: ongoingData } = useGetOngoingContents(profileId);
  const ongoingContents: TStoryContent[] =
    ongoingData?.data.data.ongoing_contents;
  const { isLoading, data: contentData } = useContentForHome();
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending = contentData?.data.data.trending_stories;

  useEffect(() => {
    localStorage.setItem("gotToHome", "true");
  }, []);

  const user2 = localStorage.getItem("user");
  const userObject = JSON.parse(user2 as string);
  const navigate = useNavigate();
  const [user] = useStore(getUserState);
  const settings = {
    dots: false,
    centerMode: false,
    infinite: false,
    speed: 800,
    slidesToShow: 5,
    swipeToSlide: true,
    slidesToScroll: 5,
  };
  const sliderReff = useRef<Slider>(null);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className="mt-[98px]  ">
        {ongoingContents?.length > 0 && (
          <div className=" mx-10 mt-4">
            <p className=" text25 font-semibold font-Recoleta  mb-[50px]">
              Continue Learning
            </p>
            <div className=" relative   ">
              <div className=" gap-5  relative group ">
                {/* <div className="absolute hidden group-hover:block z-30 "> */}
                <button
                  className="p-4 bg-[rgba(238,238,238,0.7)] caourosel-button rounded-full absolute hidden group-hover:block z-30  left-10 "
                  onClick={() => sliderReff?.current?.slickPrev()}
                >
                  <GrPrevious size={30} />
                </button>
                <button
                  className="p-4 bg-[rgba(238,238,238,0.7)] caourosel-button rounded-full absolute hidden group-hover:block z-30  left-[95.7%]"
                  onClick={() => sliderReff?.current?.slickNext()}
                >
                  <GrNext size={30} />
                </button>
                {/* </div> */}
                <Slider ref={sliderReff} {...settings}>
                  {ongoingContents?.map((data, index) => {
                    if (data.category === "Stories") {
                      return (
                        <CardHome
                          hasRage={true}
                          key={index}
                          {...data}
                          goTo={() => {
                            navigate(
                              `../${
                                user.role === "user" ? "parent" : "school"
                              }/${data.category?.toLowerCase()}/sub/${data.slug
                                ?.toLocaleLowerCase()
                                .replace(/\s/g, "-")}`
                            );
                          }}
                        />
                      );
                    } else if (data.category === "Audiobooks") {
                      return (
                        <CardHome
                          hasRage={true}
                          key={index}
                          {...data}
                          goTo={() => {
                            navigate(
                              `/${
                                user.role === "user" ? "parent" : "school"
                              }/${data.category?.toLowerCase()}/${data.slug
                                ?.toLocaleLowerCase()
                                .replace(/\s/g, "-")}/${data.name
                                ?.toLocaleLowerCase()
                                .replace(/\s/g, "-")}`
                            );
                          }}
                        />
                      );
                    } else if (data.category === "Languages") {
                      return (
                        <CardHome
                          hasRage={true}
                          key={index}
                          {...data}
                          goTo={() =>
                            navigate(
                              `../${
                                user.role === "user" ? "parent" : "school"
                              }/languages/${data.slug
                                ?.toLocaleLowerCase()
                                .replace(/\s/g, "-")}/${data.name
                                ?.toLocaleLowerCase()
                                .replace(/\s/g, "-")}`
                            )
                          }
                        />
                      );
                    }
                  })}
                </Slider>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-[30px]">
        <CardScreenHome
          data={newTrending}
          header="New & Trending"
          actiontitle=""
          isLoading={isLoading}
          isTitled={false}
          card={(props: TStoryContent) => (
            <CardHome
              {...props}
              goTo={() => {
                navigate(
                  `${props.category?.toLowerCase()}/sub/${props.slug
                    ?.toLocaleLowerCase()
                    .replace(/\s/g, "-")}`
                );
              }}
            />
          )}
        />
      </div>

      {userObject?.subscription.status === false && <AdsButton />}
      <div className="">
        <CardScreenHome
          data={recommendedStories}
          header="Recommended For You"
          isTitled={false}
          isLoading={isLoading}
          card={(props: TStoryContent) => (
            <CardHome
              {...props}
              goTo={() => {
                navigate(
                  `${props.category?.toLowerCase()}/sub/${props.slug
                    ?.toLocaleLowerCase()
                    ?.replace(/\s/g, "-")}`
                );
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default DefaultTab;
