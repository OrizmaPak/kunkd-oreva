import Ball from "@/assets/ball.png";
import ABCPencil from "@/assets/abcpencil.png";
import Gift01 from "@/assets/gift01.png";
import Gift02 from "@/assets/gift02.png";

import "./PrizeSection.css";

const PrizeSection = () => {
  return (
    <div className="bg-[#8530C1] pad-y-96 pad-x-10 ">
      <div className="max-w-[1440px] mx-auto relative">
        <img
          src={Ball}
          alt=""
          className=" absolute hidden left-[-150px] lg:block"
        />
        <img
          src={ABCPencil}
          alt=""
          className=" absolute bottom-[40px] right-0 hidden lg:block "
        />
        <div className="flex justify-center items-center "></div>
        <p className="header2 text-center text-white  font-medium  font-Inter mx-auto px-2">
          Are you ready for a summer adventure filled with learning and fun?
        </p>

        <p className="text1 text-center   text-white    mx-auto px-2 font-InterReg font-light">
          Join the Kunda Kids 21-Day Summer Reading Challenge! Ignite your
          child's love for reading and empower them to become lifelong learners
          with daily reading and quizzes!
        </p>

        <div className=" flex flex-col md:flex-row gap-14 justify-center items-center mt-16  px-3">
          <div>
            <img src={Gift02} alt="image" className="gift-card" />
          </div>
          <div>
            <img src={Gift01} alt="image" className="gift-card" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeSection;
