import {
  // useContentForHome,
  // useGetContentsLog,
  // useGetOngoingContents,
  useGetUpdatedProfile,
} from "@/api/queries";
import BookIcon from "@/assets/storiesicon24.png";
import musicIcon from "@/assets/audiobookicon24.png";
import videoIcon from "@/assets/videoicon.png";

import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import Slider from "react-slick";
import CategoriesCard from "../Library/LibraryNotPaid/CategoriesCard";
// import { TStoryContent } from "../Stories/Stories1/Stories1";
import Hero from "./Hero";
import "./parenthomepage.css";
import HomeTab from "./HomTab";
import { Outlet } from "react-router-dom";

const ParentHomePage = ({ childProfile }: { childProfile: string }) => {
  const [useri, setUser] = useStore(getUserState);
  const { data } = useGetUpdatedProfile();
  const currentUserProfile = data?.data?.data;
  useEffect(() => {
    setUser({ ...useri, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);
  const [profiles] = useStore(getProfileState);
  // const profileId = localStorage.getItem("profileId") as string;
  // const { data: ongoingData } = useGetOngoingContents(profileId);
  // const ongoingContents: TStoryContent[] =
  //   ongoingData?.data.data.ongoing_contents;
  // const { isLoading, data: contentData } = useContentForHome();
  // const recommendedStories = contentData?.data.data.recommended_stories;
  // const newTrending = contentData?.data.data.trending_stories;

  useEffect(() => {
    localStorage.setItem("gotToHome", "true");
  }, []);

  // const user2 = localStorage.getItem("user");
  // const userObject = JSON.parse(user2 as string);
  const navigate = useNavigate();
  const [user] = useStore(getUserState);
  // const settings = {
  //   dots: false,
  //   centerMode: false,
  //   infinite: false,
  //   speed: 800,
  //   slidesToShow: 5,
  //   swipeToSlide: true,
  //   slidesToScroll: 5,
  // };
  // const sliderReff = useRef<Slider>(null);

  const profile = childProfile
    ? profiles?.find((each) => each.id === +childProfile)
    : profiles[0];
  if (!user || !profile) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero userimage={profile?.image} username={profile?.name} />

          {/* <div className="flex justify-center items-center mt-8">
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
          </div> */}
          <HomeTab />
          <Outlet />
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default ParentHomePage;
