import React from "react";
import { data, DataType } from "../NewlyRegisterUser/NewlyRegisteredUser";
import Wrapper from "../NewlyRegisterUser/Wrapper";
import Hero from "../NewlyRegisterUser/Hero";
import Banner2 from "@/assets/Banner2.svg";
import userImage from "@/assets/userimage1.svg";
import CardScreen from "../NewlyRegisterUser/CardScreen";
import Card from "../NewlyRegisterUser/Card";
import CardNdRange from "../NewlyRegisterUser/CardNdRange";
import AdsButton from "../NewlyRegisterUser/AdsButton";

const ExistingUserNotPaid = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default ExistingUserNotPaid;
