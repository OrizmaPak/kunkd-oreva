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
  // const { data: ongoingData } = useGetContentsLog(currentId.toString());
  // const ongooingContent = ongoingData?.data.data.records;
  // console.log("contentLog", ongooingContent, currentId);
  if (
    // data2?.data.data.filter((each: profileType) => each.id !== currentProfile)
    !currentId
  ) {
    profiles = profile[0];
    localStorage.setItem("profileId", profile[0].id.toString());
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
          <div className="my-10">
            {ongoingContents && (
              <CardScreenHome
                data={ongoingContents!}
                header="Continue learning"
                actiontitle=""
                isLoading={isLoading}
                isTitled={false}
                card={(props: TStoryContent) => (
                  <CardHome
                    {...props}
                    goTo={() => {
                      navigate(
                        `stories/sub/${props?.name
                          ?.toLocaleLowerCase()
                          .replace(/\s/g, "-")}`
                      );
                    }}
                  />
                )}
              />
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
