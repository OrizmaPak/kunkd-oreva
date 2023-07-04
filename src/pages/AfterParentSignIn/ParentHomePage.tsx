import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import Hero from "./Hero";
import userImage from "@/assets/userimage1.svg";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import AdsButton from "@/common/User/AdsButton";
import {
  data,
  DataType,
} from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
const ParentHomePage = () => {
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero userimage={userImage} username="Kunle" />

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
