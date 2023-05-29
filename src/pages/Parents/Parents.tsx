import HeroContent from "./HeroContent"
import Hero from "../Home/Hero"
import Stat from "../Home/Stat"
import StatContent from "./StatContent"
import KundaParent from "../Home/KundaApp"
import KundaParentContent from "./KundaParentContent"
import Service from "../Home/WatchKunda"
import ServiceContent from "./ServiceContent"





const Parents = () => {
  return (
    <div>

       <Hero>
            <HeroContent/>
       </Hero>
       <Stat>
        <StatContent/>
       </Stat>
       <KundaParent>
        <KundaParentContent/>
       </KundaParent>
       <Service>
        <ServiceContent/>
       </Service>
        
      
    </div>
  )
}

export default Parents
