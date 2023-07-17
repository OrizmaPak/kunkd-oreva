import Hero from "./Hero";
import Chisomcard from "@/assets/Chisomcard.svg";
import Gorillacard from "@/assets/Gorillacard.svg";
import Afamcard from "@/assets/afamcard.svg";
import Africancard from "@/assets/africancard.svg";
import Caterpillercard from "@/assets/caterpillercard.svg";
import Dancercard from "@/assets/dancercard.svg";
import Earniing2card from "@/assets/earniing2card.svg";
import Earningcard from "@/assets/earningcard.svg";
import Mamacard from "@/assets/mamacard.svg";
import Puffcard from "@/assets/puffcard.svg";
import CardScreen from "@/common/User/CardScreen";
import AdsButton from "@/common/User/AdsButton";
import Card from "@/common/User/Card";
import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";

export type DataType = {
  title?: string;
  image?: string;
  range?: number;
  id?: string;
};
export const data: DataType[] = [
  {
    title: "Bedtime Stories",
    image: Chisomcard,
    range: 56,
    id: "1",
  },
  {
    title: "Fairy Tails Stories",
    image: Gorillacard,
    range: 80,
    id: "2",
  },
  {
    title: "Money Smarts",
    image: Mamacard,
    range: 86,
    id: "3",
  },
  {
    title: "Sports",
    image: Puffcard,
    range: 56,
    id: "4",
  },
  {
    title: " Leaders",
    image: Chisomcard,
    range: 70,
    id: "5",
  },
  {
    title: "Inspiring Leaders",
    image: Earniing2card,
    range: 56,
    id: "6",
  },
  {
    title: "Inspiring Leaders",
    image: Earningcard,
    range: 66,
    id: "7",
  },
  {
    title: "Sports",
    image: Dancercard,
    range: 90,
    id: "8",
  },
  {
    title: "Afam",
    image: Afamcard,
    range: 36,
    id: "9",
  },
  {
    title: "African Leaders",
    image: Africancard,
    range: 56,
    id: "10",
  },
  {
    title: " Leaders",
    image: Caterpillercard,
    range: 86,
    id: "11",
  },
];

const NewlyRegisteredUser = () => {
  return (
    // <div className="w-full  bg-[#EBEFF3] px-[130px] py-[40px]  ">
    // <div className=" w-full rounded-[35px] bg-white h-full mx-auto   ">
    <Wrapper>
      <InnerWrapper>
        <Hero />
        <CardScreen
          data={data?.slice(1, 6).map((el) => ({ ...el, title: "" }))}
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
  );
};

export default NewlyRegisteredUser;
