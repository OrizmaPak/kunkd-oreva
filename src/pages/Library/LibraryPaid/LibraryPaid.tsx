import React from "react";
import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CategoriesCard from "@/pages/Library/LibraryNotPaid/CategoriesCard";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import BookIcon from "@/assets/bookicon.svg";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import { data } from "@/pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import { DataType } from "@/pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import AdsButton from "@/common/User/AdsButton";
import Banner from "@/assets/Banner4.svg";
const LibraryPaid = () => {
  return (
    <div>
      <Wrapper>
        <Hero image={Banner} />
        <hr className="my-14 mx-[200px]" />

        <div>
          <h1 className="text-center font-bold text-[30px] font-Recoleta my-10 ">
            Our Categories
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-8  ">
            <CategoriesCard image={BookIcon} label="Stories" />
            <CategoriesCard image={musicIcon} label="Audio books" />
            <CategoriesCard image={videoIcon} label="African Language" />
          </div>
        </div>

        <CardScreen
          data={data?.map((el) => ({ ...el, title: "" }))}
          card={(props: DataType) => <Card {...props} />}
          header="Stories"
          actiontitle="View View all"
          isTitled={true}
        />

        <CardScreen
          data={data?.map((el) => ({ ...el, title: "" }))}
          card={(props: DataType) => <Card {...props} />}
          header="Audio books"
          actiontitle="View View all"
          isTitled={true}
        />

        <CardScreen
          data={data?.map((el) => ({ ...el, title: "" }))}
          card={(props: DataType) => <Card {...props} />}
          header="African Languages"
          actiontitle="View View all"
          isTitled={true}
        />
      </Wrapper>
    </div>
  );
};

export default LibraryPaid;
