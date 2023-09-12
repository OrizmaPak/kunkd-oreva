import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import Hero from "./Hero";
import AdsButton from "@/common/User/AdsButton";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { selectAvatarType } from "./SelectProfile";
import {
  useContentForHome,
  // useGetContentsLog,
  useGetOngoingContents,
} from "@/api/queries";
import CardScreenHome from "@/common/User/CardScreenHome";
import CardHome from "@/common/User/CardHome";
import CategoriesCard from "../Library/LibraryNotPaid/CategoriesCard";
import { useNavigate } from "react-router-dom";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import BookIcon from "@/assets/bookicon.svg";
import "./parenthomepage.css";
import { TStoryContent } from "../Stories/Stories1/Stories1";
import { Carousel } from "@mantine/carousel";
import { GrNext, GrPrevious } from "react-icons/gr";

const ParentHomePage = () => {
  let profiles: selectAvatarType;
  const [profile] = useStore(getProfileState);
  const profileId = localStorage.getItem("profileId");
  const { data: ongoingData } = useGetOngoingContents(profileId!);
  const ongoingContents: TStoryContent[] =
    ongoingData?.data.data.ongoing_contents;
  const { isLoading, data: contentData } = useContentForHome();
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending = contentData?.data.data.trending_stories;
  const currentId = Number(localStorage.getItem("profileId"));

  if (!currentId) {
    profiles = profile[0];
    localStorage.setItem("profileId", profile[0].id.toString());
  } else {
    profiles = profile?.find((each) => each.id === currentId)!;
  }

  const navigate = useNavigate();
  const userInLocalStr = localStorage.getItem("user");
  const user = JSON.parse(userInLocalStr!);

  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero userimage={profiles?.image} username={profiles?.name} />

          <h1 className="text-center font-bold text30 font-Recoleta my-10 ">
            Our Library
          </h1>
          <div className="flex justify-center items-center my-8 mb-14">
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
          <div className="mt-20 ">
            {ongoingContents?.length > 0 && (
              <div className=" mx-20 mt-4 mb-10">
                <p className=" text25 font-semibold font-Recoleta  mb-6">
                  Continue Learning
                </p>
                <div className="overflow-auto    ">
                  <div className=" gap-5  ">
                    <Carousel
                      className="group"
                      height={250}
                      slideSize="200px"
                      slideGap="md"
                      align="start"
                      slidesToScroll={3}
                      loop={false}
                      // controlsOffset="-40px"
                      // withIndicators={false}

                      styles={{
                        control: {
                          "&[data-inactive]": {
                            opacity: 0,
                            cursor: "default",
                            path: "0px",
                          },
                        },
                      }}
                      nextControlIcon={
                        <GrNext
                          size={40}
                          color="#8530C1"
                          className=" react-icon invisible group-hover:visible  "
                        />
                      }
                      previousControlIcon={
                        <GrPrevious
                          size={40}
                          color="#8530C1"
                          className=" react-icon invisible group-hover:visible"
                        />
                      }
                    >
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
                    </Carousel>
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

          <AdsButton />
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
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default ParentHomePage;
