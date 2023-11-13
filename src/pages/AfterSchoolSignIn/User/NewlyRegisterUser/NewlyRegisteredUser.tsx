import { useContentForHome, useGetOngoingContents } from "@/api/queries";
import BookIcon from "@/assets/bookicon.svg";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import CardHome from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import CategoriesCard from "@/pages/Library/LibraryNotPaid/CategoriesCard";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import { useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Hero from "./Hero";
import "./newlyregistereduser.css";

export type DataType = {
  title?: string;
  image?: string;
  range?: number;
  id?: string;
};

const NewlyRegisteredUser = () => {
  const navigate = useNavigate();
  const profileId = localStorage.getItem("profileId");
  const { data: ongoingData } = useGetOngoingContents(profileId as string);
  const ongoingContents: TStoryContent[] =
    ongoingData?.data.data.ongoing_contents;
  const { isLoading, data: contentData } = useContentForHome();
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending = contentData?.data.data.trending_stories;
  const userInLocalStr = localStorage.getItem("user");
  const user = JSON.parse(userInLocalStr as string);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    slidesToScroll: 5,
  };
  const sliderReff = useRef<Slider>(null);

  return (
    <Wrapper>
      <InnerWrapper>
        <Hero />
        <hr className="mx-20 mb-10" />
        <h1 className="text-center font-bold text-[30px] font-Recoleta my-10 ">
          Our Library
        </h1>

        <div className="flex justify-center items-center my-8 mb-20">
          <div className="flex justify-center items-center gap-[150px]  ">
            <CategoriesCard
              image={BookIcon}
              label="Stories"
              goTo={() => navigate("stories")}
            />
            <CategoriesCard
              image={musicIcon}
              label="Audio books"
              goTo={() => navigate("audiobooks")}
            />
            <CategoriesCard
              image={videoIcon}
              label="African Languages"
              goTo={() => navigate("africanlanguages")}
            />
          </div>
        </div>

        <div className="mt-[100px]">
          {ongoingContents?.length > 0 && (
            <div className=" mx-20 mt-4 mb-10">
              <p className=" text25 font-semibold font-Recoleta  mb-[50px]">
                Continue Learning
              </p>
              <div className="  ">
                <div className=" gap-5 relative group ">
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
          )}
        </div>

        <div className="my-[100px]">
          <CardScreenHome
            data={newTrending}
            header="New & Trending"
            actiontitle=""
            isTitled={false}
            isLoading={isLoading}
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

        {/* <AdsButton /> */}
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
                      .replace(/\s/g, "-")}`
                  );
                }}
              />
            )}
          />
        </div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default NewlyRegisteredUser;
