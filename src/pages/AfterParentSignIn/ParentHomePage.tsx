import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import Hero from "./Hero";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import AdsButton from "@/common/User/AdsButton";
import {
  data,
  DataType,
} from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { selectAvatarType } from "./SelectProfile";

const ParentHomePage = () => {
  let profiles: selectAvatarType;
  const [profile] = useStore(getProfileState);
  const currentId = Number(localStorage.getItem("profileId"));
  if (profile) {
    console.log("profile", profile);
  }
  if (
    // data2?.data.data.filter((each: profileType) => each.id !== currentProfile)
    !currentId
  ) {
    profiles = profile[0];
  } else {
    profiles = profile?.find((each) => each.id === currentId)!;
  }
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero userimage={profiles?.image} username={profiles?.name} />

          <CardScreen
            data={data?.slice(1, 6).map((el) => ({ ...el }))}
            header="New & Trending"
            actiontitle="View all"
            isTitled={false}
            card={(props: DataType) => <Card {...props} />}
          />
          <CardScreen
            data={data?.slice(1, 6).map((el) => ({ ...el }))}
            card={(props: DataType) => <Card {...props} />}
            header="Books In Our Library"
            actiontitle="View Categories"
            isTitled={true}
          />
          <AdsButton />
          <CardScreen
            data={data?.slice(1, 6).map((el) => ({ ...el, title: "" }))}
            header="Recommended For You"
            isTitled={false}
            card={(props: DataType) => <Card {...props} />}
          />
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default ParentHomePage;
