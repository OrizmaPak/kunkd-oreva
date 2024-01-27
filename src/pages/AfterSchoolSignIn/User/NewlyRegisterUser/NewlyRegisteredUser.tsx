import {
  useContentForHome,
  useGetOngoingContents,
  useGetUpdatedProfile,
} from "@/api/queries";
import BookIcon from "@/assets/bookicon.svg";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import CardHome from "@/common/User/CardHome";
import CardScreenHome from "@/common/User/CardScreenHome";
import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import CategoriesCard from "@/pages/Library/LibraryNotPaid/CategoriesCard";
// import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import { TStoryContent } from "@/api/types";
import { useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Outlet, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Hero from "./Hero";
import "./newlyregistereduser.css";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { useEffect } from "react";
import HomTab from "@/pages/AfterParentSignIn/HomTab";

export type DataType = {
  title?: string;
  image?: string;
  range?: number;
  id?: string;
};

const NewlyRegisteredUser = () => {
  const [useri, setUser] = useStore(getUserState);
  const { data } = useGetUpdatedProfile();
  const currentUserProfile = data?.data?.data;
  useEffect(() => {
    setUser({ ...useri, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);
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
        <HomTab />
        <Outlet />
      </InnerWrapper>
    </Wrapper>
  );
};

export default NewlyRegisteredUser;
