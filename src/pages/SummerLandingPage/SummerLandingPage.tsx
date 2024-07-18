// import HomeHeader from "@/components/HomeHeader";
import HomeHeader2 from "@/components/HomeHeader2";
import Banner from "./Banner";
import AOS from "aos";
import { useEffect } from "react";
import ThirdSection from "./ThirdSection";
import FifthSection from "./FifthSection";
import SecondSection from "./SecondSection";
// import Leaderboard from "./Leaderboard";
// import Download from "./Download";
// import Terms from "./Terms";
import Questions from "./Questions";
import HomeFooter2 from "@/components/HomeFooter2";
// import PrizeSection from "./FirstSection";
import ForthSection from "./ForthSection";
import FirstSection from "./FirstSection";
import SixthSection from "./SixthSection";

const SummerLandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);
  return (
    <div>
      <HomeHeader2 />
      <Banner />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <ForthSection />
      <FifthSection />
      <SixthSection />
      <Questions />
      <HomeFooter2 />
    </div>
  );
};

export default SummerLandingPage;
