import HeroContent from "./HeroContent";
import Hero from "../Home/Hero";
import Stat from "../Home/Stat";
import KundaParent from "../Home/KundaApp";
import KundaParentContent from "./KundaParentContent";
import Service from "../Home/WatchKunda";
import ServiceContent from "./ServiceContent";
import KundaApp from "./KundaApp";

const Parents = () => {
  return (
    <div>
      <Hero>
        <HeroContent />
      </Hero>
      <Stat>
        <div>
          <KundaApp />
        </div>
        {/* <StatContent /> */}
      </Stat>
      <KundaParent>
        <div className="pb-96">
          <KundaParentContent />
        </div>
      </KundaParent>
      <Service>
        <ServiceContent />
      </Service>
    </div>
  );
};

export default Parents;
