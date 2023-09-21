import Hero from "./Hero";
import Chisomcard from "@/assets/Chisomcard.svg";
import Gorillacard from "@/assets/Gorillacard.svg";
import Afamcard from "@/assets/afamcard.svg";
import Africancard from "@/assets/africancard.svg";
import Caterpillercard from "@/assets/caterpillercard.svg";
import Dancercard from "@/assets/dancercard.svg";
import Earniing2card from "@/assets/earniing2card.svg";
import Earningcard from "@/assets/earningcard.svg";
import Mamacard from "@/assets/mamacard.svg";
import Puffcard from "@/assets/puffcard.svg";
import AdsButton from "@/common/User/AdsButton";
import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";
import CategoriesCard from "@/pages/Library/LibraryNotPaid/CategoriesCard";
import { useNavigate } from "react-router-dom";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import BookIcon from "@/assets/bookicon.svg";
import CardScreenHome from "@/common/User/CardScreenHome";
import CardHome from "@/common/User/CardHome";
import { useContentForHome, useGetOngoingContents } from "@/api/queries";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { useRef } from "react";
import "./newlyregistereduser.css";

export type DataType = {
  title?: string;
  image?: string;
  range?: number;
  id?: string;
};
export const data: DataType[] = [
  {
    title: "Bedtime Stories",
    image: Chisomcard,
    range: 56,
    id: "1",
  },
  {
    title: "Fairy Tails Stories",
    image: Gorillacard,
    range: 80,
    id: "2",
  },
  {
    title: "Money Smarts",
    image: Mamacard,
    range: 86,
    id: "3",
  },
  {
    title: "Sports",
    image: Puffcard,
    range: 56,
    id: "4",
  },
  {
    title: " Leaders",
    image: Chisomcard,
    range: 70,
    id: "5",
  },
  {
    title: "Inspiring Leaders",
    image: Earniing2card,
    range: 56,
    id: "6",
  },
  {
    title: "Inspiring Leaders",
    image: Earningcard,
    range: 66,
    id: "7",
  },
  {
    title: "Sports",
    image: Dancercard,
    range: 90,
    id: "8",
  },
  {
    title: "Afam",
    image: Afamcard,
    range: 36,
    id: "9",
  },
  {
    title: "African Leaders",
    image: Africancard,
    range: 56,
    id: "10",
  },
  {
    title: " Leaders",
    image: Caterpillercard,
    range: 86,
    id: "11",
  },
];

const NewlyRegisteredUser = () => {
  const navigate = useNavigate();
  const profileId = localStorage.getItem("profileId");
  const { data: ongoingData } = useGetOngoingContents(profileId!);
  const ongoingContents: TStoryContent[] =
    ongoingData?.data.data.ongoing_contents;
  const { isLoading, data: contentData } = useContentForHome();
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending = contentData?.data.data.trending_stories;
  const userInLocalStr = localStorage.getItem("user");
  const user = JSON.parse(userInLocalStr!);

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
