import Card1 from "@/assets/summerCard01.png";
import Card2 from "@/assets/summerCard02.png";
import Card3 from "@/assets/summerCard03.png";
import Card4 from "@/assets/summerCard04.png";

import SummerSchoolGirl from "@/assets/summerSchoolGirl.png";
import "./FifthSection.css";

const FifthSection = () => {
  return (
    <div className=" md:pad-y-96  relative">
      <div className="max-w-[1440px]  mx-auto relative rounded-3xl py-8 px-4 flex  md:flex-row flex-col gap-10 md:gap-40">
        <div
          className=" md:w-1/3 px-10 md:px-0
        "
        >
          <img
            src={SummerSchoolGirl}
            alt="image"
            className="summer-school-girl"
          />
        </div>
        <div className="md:w-1/2">
          <div>
            <p className="text20 text-[#8530C1]">Summer Challenge</p>
            <p className="header1 font-Inter">
              Here is to participate in the daily reading summer challenge
            </p>
          </div>
          <div className="grid grid-cols-2  gap-2">
            <img src={Card1} alt="image" />
            <img src={Card2} alt="image" />
            <img src={Card3} alt="image" />
            <img src={Card4} alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
