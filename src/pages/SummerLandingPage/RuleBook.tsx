import "./PrizeSection.css";
import BackgroundBg from "@/assets/backgroundbg.png";

const RuleBook = () => {
  return (
    <div
      id="rulebook"
      className=" bg-[#FDFDFF]  pad-x-10  contain  bg-no-repeat "
      //   style={{ backgroundImage: `url(${BackgroundBg})` }}
    >
      <div className="max-w-[1440px] mx-auto relative">
        <div className="flex justify-center items-center text30 font-bold">
          Rule Book{" "}
        </div>
        <p className="header2 text-center text-black  font-medium max-w-[1000px] mx-auto px-2">
          Here’s how to stack up points:
        </p>

        <ol className=" max-w-[800px] mx-auto list-decimal  text-[22px] mt-10 px-10 ">
          <li className="my-5 text25 font-semibold">
            Daily Reading
            <br />
            <p className="text1 text-[#434750] ">
              5 points - reading the story/stories for the day
            </p>
          </li>
          <li className="my-5 text25 font-semibold">
            Quizzes:
            <br />
            <p className="text1 text-[#434750] ">
              Base points for completing a quiz):
            </p>
            <ul className="text2  list-disc text-[#667085]">
              <li>Easy (Week 1) - 5 points</li>
              <li>Medium (Week 2) - 7 points</li>
              <li>
                Hard (Week 3) - 10 points (The tougher the quiz, the higher your
                rewards)
              </li>
            </ul>
          </li>
          <li className="my-5 text25 font-semibold">
            Daily Login Streak:
            <p className="text1 text-[#434750] ">
              (We would love to reward your consistency)
            </p>
            <ul className="text2  list-disc text-[#667085]">
              <li className="my-3">2 points - Login for 2 consecutive days</li>
              <li className="my-3">3 points - Login for 3 consecutive days </li>
              <li className="my-3"> 4 points - Login for 4 consecutive days</li>
              <li className="my-3">5 points - Login for 5 consecutive days </li>
              <li className="my-3">6 points - Login for 6 consecutive days</li>
              <li className="my-3">7 points - Login for 7 consecutive days</li>
            </ul>
          </li>
        </ol>

        <div className=" flex flex-col md:flex-row gap-14 justify-center items-center mt-16  px-3"></div>
      </div>
    </div>
  );
};

export default RuleBook;
