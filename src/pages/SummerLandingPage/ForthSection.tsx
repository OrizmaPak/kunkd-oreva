// import "./PrizeSection.css";
import LeaderBoard from "@/assets/leaderboardrace.png";
import BrainPower from "@/assets/brainpower.png";
import CreativePark from "@/assets/creativepark.png";
import Button from "@/components/Button";
import Star from "@/assets/Star 2.png";
import ABCPencil from "@/assets/abcpencil.png";
import { useNavigate } from "react-router-dom";

const ForthSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white pad-y-96 pad-x-10 ">
      <div className="max-w-[1440px] bg-[#8530C1] mx-auto relative rounded-3xl p-8">
        <img
          src={Star}
          alt="image"
          className="absolute left-[50%] top-[-35px] hidden md:block"
        />
        <img
          src={ABCPencil}
          alt="image"
          className="absolute right-8 top-[25px] hidden md:block"
        />
        <div>
          <p className="text1 text-white">Reasons to join</p>
          <p className="header2 font-Inter text-white">
            Why your child should join the Kunda Kids Daily Reading Challenge:
          </p>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-[40px] justify-between px-10 mt-8 md:mt-20 mb-10 ">
            <div>
              <img src={BrainPower} alt="image" />
            </div>
            <div className="md:relative">
              <img
                src={LeaderBoard}
                alt="image"
                className=" md:absolute top-[-20px]"
              />
            </div>
            <div>
              <img src={CreativePark} alt="image" />
            </div>
          </div>
          <div className="flex justify-center items-center  my-10 md:my-20">
            <Button
              onClick={() => navigate("/signup")}
              size="md"
              className="bg-white"
            >
              <strong className="text-black">Sign Up Now</strong>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForthSection;
