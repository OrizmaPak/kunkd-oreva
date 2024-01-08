import KundaParent from "../Home/KundaApp";
import Stat from "../Home/Stat";
import Service from "../Home/WatchKunda";
import HeroContent from "./HeroContent";
import KundaApp from "./KundaApp";
import KundaParentContent from "./KundaParentContent";
import ParentHero from "./ParentHero";
import SayAboutUs from "./SayAbouyUs";
import ServiceContent from "./ServiceContent";

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
        <div className="">
          <KundaParentContent />
        </div>
      </KundaParent>
      <Service>
        <ServiceContent />
      </Service>
      {/* <SayAboutUs /> */}
    </div>
  );
};

export default Parents;
