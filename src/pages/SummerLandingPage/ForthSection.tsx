// import "./PrizeSection.css";
import LeaderBoard from "@/assets/leaderboardrace.png";
import BrainPower from "@/assets/brainpower.png";
import CreativePark from "@/assets/creativepark.png";
import Button from "@/components/Button";
import Star from "@/assets/Star 2.png";
import ABCPencil from "@/assets/abcpencil.png";
import { useNavigate } from "react-router-dom";
import "./ForthSection.css";
import AppleStore from "../Home/AppleStore";
import GooglePlay from "../Home/GooglePlay";

const ForthSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white pad-y-96 pad-x-10 my-20 ">
      <div className="max-w-[1440px] bg-[#8530C1] mx-auto relative rounded-3xl p-8 py-12">
        <img
          src={Star}
          alt="image"
          className="absolute left-1/2 transform -translate-x-1/2 md:top-[-37px] top-[-21px]  star-w "
        />
        <img
          src={ABCPencil}
          alt="image"
          className="absolute right-4 top-[100px] hidden md:block"
        />
        <div>
          <p className="text1 text-white md:text-start text-center">
            Reasons to join
          </p>
          <p className="header-1 font-Inter text-white md:text-start text-center">
            Why your child should join the Kunda Kids Daily Reading Challenge:
          </p>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-[40px] justify-between  mt-8 md:mt-20 mb-10 ">
            <div>
              <img src={BrainPower} alt="image" className="card-w-forth" />
            </div>
            <div className="md:relative">
              <img
                src={LeaderBoard}
                alt="image"
                className=" md:absolute top-[-20px] card-w-forth"
              />
            </div>
            <div>
              <img src={CreativePark} alt="image" className="card-w-forth" />
            </div>
          </div>
          <div className="flex justify-center items-center  mt-10 md:my-20">
            <Button
              onClick={() => navigate("/signup")}
              size="md"
              className="bg-white font-Inter text-black hidden md:block"
            >
              Sign Up Now
            </Button>
            <div className=" flex  flex-col md:hidden   items-center justify-center  gap-4 my-4-10">
              <AppleStore sizes />
              <GooglePlay sizes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForthSection;
