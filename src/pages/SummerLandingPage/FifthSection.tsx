import Card1 from "@/assets/summerCard01.png";
import Card2 from "@/assets/summerCard02.png";
import Card3 from "@/assets/summerCard03.png";
import Card4 from "@/assets/summerCard04.png";

import SummerSchoolGirl from "@/assets/summerSchoolGirl.png";
import "./FifthSection.css";

const FifthSection = () => {
  return (
    <div className=" md:pad-y-96  relative">
      <div className="max-w-[1440px]  mx-auto relative rounded-3xl  px-4 flex  md:flex-row flex-col gap-10 md:gap-40">
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
            <p className="header-1 font-Inter text-center md:text-start">
              Here is how to participate in the daily reading summer challenge:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10  md:mt-16  gap-2">
            <img src={Card1} alt="image" />
            <img
              src={Card2}
              alt="image"
              className="relative top-[-20px] md:top-0"
            />
            <img
              src={Card3}
              alt="image"
              className="relative top-[-50px] md:top-0"
            />
            <img
              src={Card4}
              alt="image"
              className="relative top-[-80px] md:top-0  w-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
