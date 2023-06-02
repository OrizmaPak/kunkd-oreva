import React from "react";
import Wrapper from "@/pages/User/NewlyRegisterUser/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CategoriesCard from "@/pages/Library/LibraryNotPaid/CategoriesCard";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import BookIcon from "@/assets/bookicon.svg";
import CardScreen from "@/pages/User/NewlyRegisterUser/CardScreen";
import Card from "@/pages/User/NewlyRegisterUser/Card";
import { data } from "@/pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import { DataType } from "@/pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import AdsButton from "@/pages/User/NewlyRegisterUser/AdsButton";
const LibraryPaid = () => {
  return (
    <div>
      <Wrapper>
        <Hero />
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
