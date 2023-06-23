import Wrapper from "@/common/User/Wrapper";
import Hero from "@/pages/Library/LibraryNotPaid/Hero";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import { data } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import { DataType } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import AdsButton from "@/common/User/AdsButton";
import Banner from "@/assets/banner5.svg";
import Banner1 from "@/assets/banner6.svg";
import InnerWrapper from "../../common/User/InnerWrapper";
import Button from "@/components/Button";
import GroupCard from "@/assets/groupcard.svg";

const Stories = () => {
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Hero image={Banner} />
          <hr className="my-14 mx-[200px]" />

          <div>
            <h1 className="text-center font-bold text-[30px] font-Recoleta my-10 ">
              Browse Genres
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-wrap justify-center items-center  max-w-[900px]  g gap-x-8 gap-y-4">
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Bedtime
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Holidays and Celebration
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Inventors
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Life & Growing up
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Folk Tales
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Inspiring Leaders
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Finance
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Money smart
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Fairy Tales
              </button>
              <button className="py-3 rounded-3xl px-6 bg-[#FFF7FD]">
                Sport
              </button>
            </div>
          </div>

          <CardScreen
            data={data.slice(1, 7)}
            card={(props: DataType) => <Card {...props} />}
            header="Stories we love"
            actiontitle="View View all"
            isTitled={true}
          />

          <div
            style={{
              background:
                "linear-gradient(280.43deg, #8530C1 0.5%, #000000 173.5%)",
            }}
            className="h-[495px] grid grid-cols-[700px_1fr] mb-[50px] max-w-[1500px] relative rounded-2xl mx-auto object-cover bg- "
          >
            <img
              src={GroupCard}
              alt="card "
              className="absolute w-[700px] right-0 bottom-0 rounded-3xl "
            />
            <div className="text-center text-white flex flex-col gap-3 justify-center items-center">
              <h1 className="text-[30px] font-bold ">New Story Titles</h1>
              <p className="mb-10">We published new audiobook just for you</p>
              <Button size="md" color="black" backgroundColor="white">
                See books
              </Button>
            </div>
            <div></div>
          </div>

          <div>
            <h1 className="mb-4 font-bold font-Recoleta mt-20 text-center text-[40px]">
              Trending Now
            </h1>
            <p className="text-center text-[18px] text-[#B5B5C3]">
              See what peole are reading
            </p>
          </div>

          <CardScreen
            data={data.slice(1, 7)}
            card={(props: DataType) => <Card {...props} />}
            isTitled={true}
          />
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};
export default Stories;
