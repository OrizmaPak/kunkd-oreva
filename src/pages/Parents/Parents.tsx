// import KundaParent from "../Home/KundaApp";
import Stat from "../Home/Stat";
import Service from "../Home/WatchKunda";
import HeroContent from "./HeroContent";
import KundaApp from "./KundaApp";
import KundaParentContent from "./KundaParentContent";
import ParentHero from "./ParentHero";
// import SayAboutUs from "./SayAbouyUs";
import ServiceContent from "./ServiceContent";
import AOS from "aos";
import { useEffect } from "react";

const Parents = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);
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
      {/* <KundaParent> */}
      <div className="bg-[#8530C1] pt-[96px]">
        <KundaParentContent />
      </div>
      {/* </KundaParent> */}
      <Service>
        <ServiceContent />
      </Service>
      {/* <SayAboutUs /> */}
    </div>
  );
};

export default Parents;
