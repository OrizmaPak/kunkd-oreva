import Hero from "./Hero";
import HeroContent from "./HeroContent";
import Stat from "./Stat";
import StatContent from "./StatContent";
import KundaApp from "./KundaApp";
import ShopBooks from "./ShopBooks";
import WatchKunda from "./WatchKunda";
// import Section2Props from './WatchKundaContent'
import KundaAppContent from "./KundaAppContent";
import WatchKundaContent from "./WatchKundaContent";

const Home = () => {
  return (
    // <div className=" bg-pink-200">
    <>
      <Hero>
        <HeroContent />
      </Hero>
      <Stat>
        <StatContent />
      </Stat>

      <KundaApp>
        <div className="pb-[600px]">
          <KundaAppContent />
        </div>
      </KundaApp>
      <WatchKunda>
        <WatchKundaContent />
      </WatchKunda>
      <ShopBooks />
    </>
    // </div>
  );
};

export default Home;
