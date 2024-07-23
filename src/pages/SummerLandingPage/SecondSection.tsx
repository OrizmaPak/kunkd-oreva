import Clock from "@/assets/clock.png";
import Checklist from "@/assets/Checklist.png";
// import Crown from "@/assets/crown.png";
import SchoolGirl from "@/assets/schoolGirl02.png";
import "./SecondSection.css";
import Arrow07 from "@/assets/Arrow 07.png";
import Button from "@/components/Button";
import AppleStore from "../Home/AppleStore";
import GooglePlay from "../Home/GooglePlay";
import { useNavigate } from "react-router-dom";

type Tdata = {
  image: string;
  title1: string;
  title2: string;
  message?: string;
};

const SecondSection = () => {
  const data = [
    {
      image: Clock,
      title1: "TIMELINE",
      title2: "1st - 21st ",
      message: "August, 2024",
    },
    {
      image: Checklist,
      title1: "Eligibility",
      title2: "Age 6 - 10",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className=" mt-8 md:mt-20">
      <div className="max-w-[1440px] mx-auto ">
        <div className="relative flex gap-10  md:gap-0  flex-col md:flex-row ">
          <img
            src={Arrow07}
            alt="image"
            className="absolute arrow top-0 md:top-[-180px] md:right-[200px] right-0"
          />

          <div className="flex flex-col justify-center items-center flex-grow w-full px-8 text-center md:text-start   ">
            {data.map((data, index) => {
              return (
                <Card
                  key={index}
                  title1={data?.title1}
                  title2={data?.title2}
                  message={data?.message}
                  image={data?.image}
                />
              );
            })}

            <div className="flex justify-center md:justify-start  items-start   md:mt-10 w-full"></div>
          </div>
          <div className="flex-grow  w-full flex justify-center  ">
            <img src={SchoolGirl} alt="" className="school-boy" />
          </div>
        </div>
        <div className="bg-[#29B256] py-10 md:py-[64px] md:px-[80px] flex flex-col md:flex-row justify-center gap-4  mt-20 rounded-[36px]">
          <p className="text30 font-Inter text-white text-center md:text-start">
            Secure a spot for your child now!
          </p>
          <Button
            onClick={() => navigate("/signup")}
            size="md"
            className="bg-white text-black  font-Inter hidden md:block"
          >
            Secure spot
          </Button>
          <div className=" flex md:hidden   items-center justify-center  gap-4 my-2">
            <AppleStore sizes />
            <GooglePlay sizes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;

const Card = ({ image, title1, title2, message }: Tdata) => {
  return (
    <div className="flex  justify-center md:justify-start   items-center     w-full gap-8 md:gap-20 mt-10">
      <div className="">
        <img src={image} alt="image" className="mb-3 second-section-icon" />
      </div>
      <div className=" flex-grow">
        <p className="text20 font-medium mt-0 md:mt-2 font-Inter text20  block text-start text-[#8530C1]">
          {title1}
        </p>
        <p className="header-1 font-medium mt-0  md:mt-2 font-Inter block   text-start">
          {title2}
        </p>
        <p className=" text30 font-InterReg mt-0  block  text-start">
          {message}
        </p>
      </div>
    </div>
  );
};
