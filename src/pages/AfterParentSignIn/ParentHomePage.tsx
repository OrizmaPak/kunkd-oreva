import {
  useContentForHome,
  // useGetContentsLog,
  useGetOngoingContents,
  useGetUpdatedProfile
} from "@/api/queries";
import BookIcon from "@/assets/bookicon.svg";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import AdsButton from "@/common/User/AdsButton";
import CardHome from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { useEffect, useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CategoriesCard from "../Library/LibraryNotPaid/CategoriesCard";
import { TStoryContent } from "../Stories/Stories1/Stories1";
import Hero from "./Hero";
import "./parenthomepage.css";

const ParentHomePage = ({ childProfile }: { childProfile: string }) => {
const [useri, setUser] = useStore(getUserState);
  const {data } = useGetUpdatedProfile()
  const currentUserProfile = data?.data?.data
  useEffect(() => {
    setUser({...useri, ...currentUserProfile})
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentUserProfile])
  console.log("Updataed user profile", data)
  const [profiles] = useStore(getProfileState);
  const profileId = localStorage.getItem("profileId") as string;
  const { data: ongoingData } = useGetOngoingContents(profileId);
  const ongoingContents: TStoryContent[] =
    ongoingData?.data.data.ongoing_contents;
  const { isLoading, data: contentData } = useContentForHome();
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending = contentData?.data.data.trending_stories;
  const currentId = childProfile;

  useEffect(() => {
    localStorage.setItem("gotToHome", "true");
  }, []);

  console.log("test1- nad ----------", +currentId, +childProfile, profiles);

  // if (childProfile) {
  //   console.log("Profilessssss-------", profiles);
  //   profile = profiles[0];
  //   setChildProfile(profiles[0].id.toString());
  //   // localStorage.setItem("profileId", profiles[0].id.toString());
  // } else {
  //   profile = profiles?.find((each) => each.id === currentId)!;
  // }

  
  const navigate = useNavigate();
  // const user = JSON.parse(userInLocalStr!);
  const [user ]= useStore(getUserState)
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

  const profile = childProfile ? profiles?.find((each) => each.id === +childProfile) : profiles[0];
  if(!user || !profile){
    return <Navigate to="/"  replace />
  }

  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero userimage={profile?.image} username={profile?.name} />

          <h1 className="text-center font-bold text30 font-Recoleta my-10 ">
            Our Library
          </h1>
          <div className="flex justify-center items-center mt-8">
            <div className=" justify-center items-center category-gap  ">
              <CategoriesCard
                image={BookIcon}
                label="Stories"
                goTo={() => navigate("stories")}
              />
              <CategoriesCard
                image={musicIcon}
                label="Audiobooks"
                goTo={() => navigate("audiobooks")}
              />
              <CategoriesCard
                image={videoIcon}
                label="African Languages"
                goTo={() => navigate("africanlanguages")}
              />
            </div>
          </div>

          <div className="mt-[98px]  ">
            {ongoingContents?.length > 0 && (
              <div className=" mx-20 mt-4">
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
                                    user.role === "parent" ? "parent" : "school"
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
                                  `../${
                                    user.role === "parent" ? "parent" : "school"
                                  }/${data.category?.toLowerCase()}/${data.slug
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
                                    user.role === "parent" ? "parent" : "school"
                                  }/africanlanguages/${data.slug}/${data.name}`
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
              // <CardScreenHome
              //   data={ongoingContents!}
              //   header="Continue learning"
              //   actiontitle=""
              //   isLoading={isLoading}
              //   isTitled={false}
              //   card={(props: TStoryContent) => (
              //     <CardHome
              //       {...props}
              //       goTo={() => {
              //         navigate(
              //           `stories/sub/${props?.name
              //             ?.toLocaleLowerCase()
              //             .replace(/\s/g, "-")}`
              //         );
              //       }}

              //     />
              //   )}
              // />
            )}
          </div>

          <div className="my-[100px]">
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

          <AdsButton />
          <div className="mt-[100px]">
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
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default ParentHomePage;
