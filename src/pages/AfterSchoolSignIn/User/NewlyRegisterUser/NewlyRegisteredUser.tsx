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
import AdsButton from "@/common/User/AdsButton";
import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";
import CategoriesCard from "@/pages/Library/LibraryNotPaid/CategoriesCard";
import { useNavigate } from "react-router-dom";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import BookIcon from "@/assets/bookicon.svg";
import CardScreenHome from "@/common/User/CardScreenHome";
import { CardProps } from "@/common/User/CardHome";
import CardHome from "@/common/User/CardHome";
import { useContentForHome } from "@/api/queries";

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
  const navigate = useNavigate();

  const { isLoading, data: contentData } = useContentForHome();
  console.log("Content for home", contentData?.data.data.recommended_stories);
  const recommendedStories = contentData?.data.data.recommended_stories;
  const newTrending = contentData?.data.data.trending_stories;
  console.log("newTrending", newTrending);
  return (
    // <div className="w-full  bg-[#EBEFF3] px-[130px] py-[40px]  ">
    // <div className=" w-full rounded-[35px] bg-white h-full mx-auto   ">
    <Wrapper>
      <InnerWrapper>
        <Hero />
        <hr className="mx-20 mb-20" />
        <h1 className="text-center font-bold text-[30px] font-Recoleta my-10 ">
          Our Library
        </h1>

        <div className="flex justify-center items-center my-8">
          <div className="flex justify-center items-center gap-[150px]  ">
            <CategoriesCard
              image={BookIcon}
              label="Stories"
              goTo={() => navigate("stories")}
            />
            <CategoriesCard
              image={musicIcon}
              label="Audio books"
              goTo={() => navigate("audiobooks")}
            />
            <CategoriesCard
              image={videoIcon}
              label="African Language"
              goTo={() => navigate("africanlanguages")}
            />
          </div>
        </div>

        <CardScreenHome
          data={newTrending}
          header="New & Trending"
          actiontitle="View all"
          isTitled={false}
          isLoading={isLoading}
          card={(props: CardProps) => (
            <CardHome
              {...props}
              goTo={() => {
                navigate(
                  `${props.category?.toLowerCase()}/sub/${props.slug
                    ?.toLocaleLowerCase()
                    .replace(/\s/g, "-")}`
                );
              }}
            />
          )}
        />

        <AdsButton />
        <CardScreenHome
          data={recommendedStories}
          header="Recommended For You"
          isTitled={false}
          isLoading={isLoading}
          card={(props: CardProps) => (
            <CardHome
              {...props}
              goTo={() => {
                navigate(
                  `${props.category?.toLowerCase()}/sub/${props.slug
                    ?.toLocaleLowerCase()
                    .replace(/\s/g, "-")}`
                );
              }}
            />
          )}
        />
      </InnerWrapper>
    </Wrapper>
  );
};

export default NewlyRegisteredUser;
