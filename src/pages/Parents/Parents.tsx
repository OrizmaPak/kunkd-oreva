import HeroContent from "./HeroContent";
import Stat from "../Home/Stat";
import KundaParent from "../Home/KundaApp";
import KundaParentContent from "./KundaParentContent";
import Service from "../Home/WatchKunda";
import ServiceContent from "./ServiceContent";
import KundaApp from "./KundaApp";
import ParentHero from "./ParentHero";
import SayAbouyUs from "./SayAbouyUs";

const Parents = () => {
  return (
    <div>
      <ParentHero>
        <HeroContent />
      </ParentHero>
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
      <SayAbouyUs />
    </div>
  );
};

export default Parents;
