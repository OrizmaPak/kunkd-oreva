import Wrapper from "@/common/User/Wrapper";
import Hero from "./Hero";
import CategoriesCard from "./CategoriesCard";
import musicIcon from "@/assets/musicIcon.svg";
import videoIcon from "@/assets/videoicon.svg";
import BookIcon from "@/assets/bookicon.svg";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import { data } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import { DataType } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import AdsButton from "@/common/User/AdsButton";
import Banner from "@/assets/Banner4.svg";
import InnerWrapper from "@/common/User/InnerWrapper";
import Yoruba from "@/assets/yoruba.svg";
import Igbo from "@/assets/Igbo.svg";
import Twi from "@/assets/twi.svg";
import Luganda from "@/assets/Luganda.svg";
import Kiswahili from "@/assets/Kiswahili.svg";
import { useNavigate } from "react-router-dom";

const languageData = [
  {
    image: Yoruba,
    title: "Yoruba",
  },

  {
    image: Twi,
    title: "Twi",
  },
  {
    image: Luganda,
    title: "Luganda",
  },
  {
    image: Kiswahili,
    title: "Kiswahili",
  },
  {
    image: Igbo,
    title: "Igbo",
  },
];
const LibraryNotPaid = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero image={Banner} />
          <hr className="my-20 mx-[200px]" />

          <div>
            <h1 className="text-center font-bold text-[30px] font-Recoleta my-10 ">
              Our Library
            </h1>
          </div>
          <div className="flex justify-center items-center">
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

          <CardScreen
            data={data?.slice(1, 6).map((el) => ({ ...el }))}
            card={(props: DataType) => <Card {...props} />}
            header="Stories"
            actiontitle="View all"
            isTitled={true}
          />
          <AdsButton />

          <CardScreen
            data={data?.slice(1, 6).map((el) => ({ ...el }))}
            card={(props: DataType) => <Card {...props} />}
            header="Audio books"
            actiontitle="View all"
            isTitled={true}
          />

          <CardScreen
            data={languageData}
            card={(props: DataType) => <Card {...props} />}
            header="African Languages"
            actiontitle="View all"
            isTitled={true}
          />
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default LibraryNotPaid;
