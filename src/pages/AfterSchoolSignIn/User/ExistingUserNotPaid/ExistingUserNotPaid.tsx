import React from "react";
import { data, DataType } from "../NewlyRegisterUser/NewlyRegisteredUser";
import Wrapper from "../../../../common/User/Wrapper";
import Hero from "../NewlyRegisterUser/Hero";
import Banner2 from "@/assets/Banner2.svg";
import userImage from "@/assets/userimage1.svg";
import CardScreen from "../../../../common/User/CardScreen";
import Card from "../../../../common/User/Card";
import CardNdRange from "../../../../common/User/CardNdRange";
import AdsButton from "../../../../common/User/AdsButton";
import InnerWrapper from "../../../../common/User/InnerWrapper";

const ExistingUserNotPaid = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Hero banner={Banner2} username="Emma" userimage={userImage} />
        <CardScreen
          data={data?.map((el) => ({ ...el, title: "" }))}
          header="New & Trending"
          actiontitle="View all"
          isTitled={false}
          card={(props: DataType) => <CardNdRange {...props} />}
        />

        <CardScreen
          data={data}
          card={(props: DataType) => <Card {...props} />}
          header="Books In Our Library"
          actiontitle="View Categories"
          isTitled={true}
        />

        <AdsButton />

        <CardScreen
          data={data?.map((el) => ({ ...el, title: "" }))}
          header="Recommended For You"
          isTitled={false}
          card={(props: DataType) => <Card {...props} />}
        />
      </InnerWrapper>
    </Wrapper>
  );
};

export default ExistingUserNotPaid;
