import CYellow from "@/assets/yellow.png";
import CBlue from "@/assets/blue.png";
import SchoolBoy from "@/assets/schoolBoy.png";

import "./FirstSection.css";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const FirstSection = () => {
  const navigate = useNavigate();
  return (
    <div className=" pad-x-10 ">
      <div className="max-w-[1440px] mx-auto relative flex gap-10  md:gap-0  flex-col md:flex-row ">
        <img src={CBlue} alt="image" className="absolute top-28" />
        <img src={CYellow} alt="image" className="absolute top-40 right-0" />

        <img
          src={CYellow}
          alt="image"
          className="absolute bottom-14 left-[-10px] "
        />

        <div className="flex-grow  w-full flex justify-center md:justify-start">
          <img src={SchoolBoy} alt="" className="school-boy" />
        </div>
        <div className="flex flex-col justify-center items-center flex-grow w-full px-4 text-center md:text-start   ">
          <p className="font-Inter header1">
            Join the Kunda Kids <br /> 21-Day Summer Reading Challenge!{" "}
          </p>
          <p className="text20 font-InterReg mt-4 md:mt-8">
            Ignite your child's love for reading and empower them to become
            lifelong learners with daily reading and quizzes!
          </p>

          <div className="flex justify-center md:justify-start  items-start  mt-4 md:mt-10 w-full">
            <Button onClick={() => navigate("/signup")} size="md">
              {" "}
              Sign Up Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
