import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import Hero from "./Hero";
import AdsButton from "@/common/User/AdsButton";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { selectAvatarType } from "./SelectProfile";
import { useContentForHome } from "@/api/queries";
import CardScreenHome from "@/common/User/CardScreenHome";
import { CardProps } from "@/common/User/CardHome";
import CardHome from "@/common/User/CardHome";
import CategoriesCard from "../Library/LibraryNotPaid/CategoriesCard";
import { useNavigate } from "react-router-dom";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import BookIcon from "@/assets/bookicon.svg";

const ParentHomePage = () => {
  let profiles: selectAvatarType;
  const [profile] = useStore(getProfileState);
  const { isLoading, data: contentData } = useContentForHome();
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending = contentData?.data.data.trending_stories;
  const currentId = Number(localStorage.getItem("profileId"));

  if (
    // data2?.data.data.filter((each: profileType) => each.id !== currentProfile)
    !currentId
  ) {
    profiles = profile[0];
  } else {
    profiles = profile?.find((each) => each.id === currentId)!;
  }

  console.log(profile);
  console.log(currentId);
  console.log(profiles);
  const navigate = useNavigate();

  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero userimage={profiles?.image} username={profiles?.name} />

          <h1 className="text-center font-bold text-[30px] font-Recoleta my-10 ">
            Our Library
          </h1>
          <div className="flex justify-center items-center my-8 mb-14">
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
                label="African Language"
                goTo={() => navigate("africanlanguages")}
              />
            </div>
          </div>
          <CardScreenHome
            data={newTrending}
            header="New & Trending"
            actiontitle="View all"
            isLoading={isLoading}
            isTitled={false}
            card={(props: CardProps) => (
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
            card={(props: CardProps) => (
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
