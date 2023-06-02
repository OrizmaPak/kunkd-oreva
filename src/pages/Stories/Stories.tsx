import Wrapper from "@/pages/User/NewlyRegisterUser/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CardScreen from "@/pages/User/NewlyRegisterUser/CardScreen";
import Card from "@/pages/User/NewlyRegisterUser/Card";
import { data } from "@/pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import { DataType } from "@/pages/User/NewlyRegisterUser/NewlyRegisteredUser";
import AdsButton from "@/pages/User/NewlyRegisterUser/AdsButton";
import { Button } from "@chakra-ui/react";
import Banner from "@/assets/banner5.svg";
import Banner1 from "@/assets/banner6.svg";

const Stories = () => {
  return (
    <div>
      <Wrapper>
        <Hero image={Banner} />
        <hr className="my-14 mx-[200px]" />

        <div>
          <h1 className="text-center font-bold text-[30px] font-Recoleta my-10 ">
            Browse Genres
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center  max-w-[900px]  g gap-x-8 gap-y-4">
            <Button size="md" variant="outline">
              Bedtime
            </Button>
            <Button size="md" variant="outline">
              Holidays and Celebration
            </Button>
            <Button size="md" variant="outline">
              Inventors
            </Button>
            <Button size="md" variant="outline">
              Life & Growing up
            </Button>
            <Button size="md" variant="outline">
              Folk Tales
            </Button>
            <Button size="md" variant="outline">
              Inspiring Leaders
            </Button>
            <Button size="md" variant="outline">
              Finance
            </Button>
            <Button size="md" variant="outline">
              Money smart
            </Button>
            <Button size="md" variant="outline">
              Fairy Tales
            </Button>
            <Button size="md" variant="outline">
              Sport
            </Button>
          </div>
        </div>

        <CardScreen
          data={data}
          card={(props: DataType) => <Card {...props} />}
          header="Stories we love"
          actiontitle="View View all"
          isTitled={true}
        />

        <div className="h-[395px] mb-[50px]  object-cover">
          <img
            src={Banner1}
            alt="banner"
            className=" w-full h-[395px] object-cover"
          />
        </div>

        <CardScreen
          data={data?.map((el) => ({ ...el, title: "" }))}
          card={(props: DataType) => <Card {...props} />}
          header="African Languages"
          actiontitle="View View all"
          isTitled={true}
        />

        <div>
          <h1 className="mb-4 font-bold font-Recoleta mt-20 text-center text-[40px]">
            Trending Now
          </h1>
          <p className="text-center text-[18px] text-[#B5B5C3]">
            See what peole are reading
          </p>
        </div>

        <CardScreen
          data={data?.map((el) => ({ ...el, title: "" }))}
          card={(props: DataType) => <Card {...props} />}
          isTitled={true}
        />
      </Wrapper>
    </div>
  );
};
export default Stories;
