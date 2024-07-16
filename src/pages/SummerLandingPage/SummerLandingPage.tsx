// import HomeHeader from "@/components/HomeHeader";
import HomeHeader2 from "@/components/HomeHeader2";
import Banner from "./Banner";
import AOS from "aos";
import { useEffect } from "react";
import Overview from "./Overview";
import Existing from "./Existing";
import Competition from "./Competition";
// import Leaderboard from "./Leaderboard";
// import Download from "./Download";
// import Terms from "./Terms";
import Questions from "./Questions";
import HomeFooter2 from "@/components/HomeFooter2";
import PrizeSection from "./PrizeSection";
import Participate from "./Participate";

const SummerLandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);
  return (
    <div>
      <HomeHeader2 />
      <Banner />
      <PrizeSection />
      <Competition />
      <Overview />
      <Participate />
      <Existing />
      {/* <Leaderboard /> */}
      {/* <Download /> */}
      {/* <Terms /> */}
      <Questions />
      {/* <RuleBook /> */}
      <HomeFooter2 />
    </div>
  );
};

export default SummerLandingPage;
