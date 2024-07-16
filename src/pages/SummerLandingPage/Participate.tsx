import "./PrizeSection.css";
import ScrollToSection from "./ScrollToSection";

const Participate = () => {
  return (
    <div className="bg-white pad-y-96 pad-x-10 ">
      <div className="max-w-[1440px] mx-auto relative">
        <div className="flex justify-center items-center "></div>
        <p className="header2 text-center text-black  font-medium max-w-[1000px] mx-auto px-2 font-Inter">
          How to participate in the daily reading summer challenge
        </p>

        <ul className=" max-w-[800px] mx-auto list-disc text20 mt-8 px-10 font-InterReg">
          <li className="md:my-5 my-2">
            You must have an active subscription to take part in the challenge.
          </li>
          <li className="md:my-5 my-2">
            Every day at 12:00noon WAT, from 1st - August 21st, 2024, a new quiz
            will be uploaded. Quizzes are based on the weekly stories
            subcategories.
          </li>
          <li className="md:my-5 my-2">
            You can join the challenge at any time during the competition
            period.
          </li>
          <li className="md:my-5 my-2 ">
            <p className="flex">
              Earn points for correct answers, daily reading, streaks.
              <ScrollToSection
                sectionId="questions"
                buttonText="READ HOW HERE"
              />
            </p>
          </li>
        </ul>

        <div className=" flex flex-col md:flex-row gap-14 justify-center items-center mt-16  px-3"></div>
      </div>
    </div>
  );
};

export default Participate;
