import Hero from "./Hero";
import Banner from "@/assets/banner1.svg";
import userImage from "@/assets/userimage1.svg";
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
import CardScreen from "./CardScreen";
import AdsButton from "./AdsButton";
import Card from "./Card";
import Wrapper from "./Wrapper";

export type DataType = {
  title?: string;
  image?: string;
  range?: number;
};
export const data: DataType[] = [
  {
    title: "Bedtime Stories",
    image: Chisomcard,
    range: 56,
  },
  {
    title: "Fairy Tails Stories",
    image: Gorillacard,
    range: 80,
  },
  {
    title: "Money Smarts",
    image: Mamacard,
    range: 86,
  },
  {
    title: "Sports",
    image: Puffcard,
    range: 56,
  },
  {
    title: " Leaders",
    image: Chisomcard,
    range: 70,
  },
  {
    title: "Inspiring Leaders",
    image: Earniing2card,
    range: 56,
  },
  {
    title: "Inspiring Leaders",
    image: Earningcard,
    range: 66,
  },
  {
    title: "Sports",
    image: Dancercard,
    range: 90,
  },
  {
    title: "Afam",
    image: Afamcard,
    range: 36,
  },
  {
    title: "African Leaders",
    image: Africancard,
    range: 56,
  },
  {
    title: " Leaders",
    image: Caterpillercard,
    range: 86,
  },
];

const NewlyRegisteredUser = () => {
  return (
    // <div className="w-full  bg-[#EBEFF3] px-[130px] py-[40px]  ">
    // <div className=" w-full rounded-[35px] bg-white h-full mx-auto   ">
    <Wrapper>
      <Hero banner={Banner} username="Emma" userimage={userImage} />
      <CardScreen
        data={data?.map((el) => ({ ...el, title: "" }))}
        header="New & Trending"
        actiontitle="View all"
        isTitled={false}
        card={(props: DataType) => <Card {...props} />}
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
        header="Recommended For Your"
        isTitled={false}
        card={(props: DataType) => <Card {...props} />}
      />
    </Wrapper>
  );
};

export default NewlyRegisteredUser;
