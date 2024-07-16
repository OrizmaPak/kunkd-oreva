import {
  useContentForHome,
  useGetOngoingContents,
  useGetUpdatedProfile,
  useGetSummerChallengeQuizzes,
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
import { SummerQuizCard } from "../SummerQuiz/SummerQuiz";

const DefaultTab = () => {
  const [useri, setUser] = useStore(getUserState);
  const { data } = useGetUpdatedProfile();
  const currentUserProfile = data?.data?.data;
  useEffect(() => {
    setUser({ ...useri, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);
  const profileId = sessionStorage.getItem("profileId") as string;
  const { data: ongoingData } = useGetOngoingContents(profileId);
  const ongoingContents: TStoryContent[] =
    ongoingData?.data.data.ongoing_contents;
  const { isLoading, data: contentData } = useContentForHome();
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending = contentData?.data.data.trending_stories;

  const { data: datta } = useGetSummerChallengeQuizzes(
    sessionStorage.getItem("profileId") as string
  );
  console.log("summer challenge quizzes", data);
  const quizzes = datta?.data?.data?.quizzes;

  useEffect(() => {
    sessionStorage.setItem("gotToHome", "true");
  }, []);

  const user2 = sessionStorage.getItem("user");
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
      <div className="mt-[60px]">
        {quizzes?.length > 0 && (
          <div className=" mx-10 mt-4">
            <div className="flex justify-between">
              <p className=" text25 font-semibold  font-Hanken  mb-[50px]">
                Summer Challenge
              </p>
              <button
                onClick={() => navigate("/summer-quiz")}
                className="font-semibold"
              >
                View All
              </button>
            </div>
            <div className=" relative   ">
              <div className=" gap-5  relative group grid grid-cols-5 ">
                {/* <div className="absolute hidden group-hover:block z-30 "> */}
                {/* <button
                  className="p-4 bg-[rgba(238,238,238)] caourosel-button rounded-full absolute hidden group-hover:block z-30  left-10 "
                  onClick={() => sliderReff?.current?.slickPrev()}
                >
                  <GrPrevious size={40} />
                </button>
                <button
                  className="p-4 bg-[rgba(238,238,238)] caourosel-button rounded-full absolute hidden group-hover:block z-30  left-[95.7%]"
                  onClick={() => sliderReff?.current?.slickNext()}
                >
                  <GrNext size={40} />
                </button> */}
                {/* </div> */}
                {/* <Slider ref={sliderReff} {...settings}> */}
                {quizzes?.slice(0, 5)?.map((data, index) => {
                  return <SummerQuizCard key={index} {...data} />;
                })}
                {/* </Slider> */}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-[60px]  ">
        {ongoingContents?.length > 0 && (
          <div className=" mx-10 mt-4">
            <p className=" text25 font-semibold  font-Hanken  mb-[50px]">
              Continue Learning
            </p>
            <div className=" relative   ">
              <div className=" gap-5  relative group ">
                {/* <div className="absolute hidden group-hover:block z-30 "> */}
                <button
                  className="p-4 bg-[rgba(238,238,238)] caourosel-button rounded-full absolute hidden group-hover:block z-30  left-10 "
                  onClick={() => sliderReff?.current?.slickPrev()}
                >
                  <GrPrevious size={40} />
                </button>
                <button
                  className="p-4 bg-[rgba(238,238,238)] caourosel-button rounded-full absolute hidden group-hover:block z-30  left-[95.7%]"
                  onClick={() => sliderReff?.current?.slickNext()}
                >
                  <GrNext size={40} />
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
