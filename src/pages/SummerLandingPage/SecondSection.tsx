import Clock from "@/assets/clock.png";
import Checklist from "@/assets/Checklist.png";
// import Crown from "@/assets/crown.png";
import SchoolGirl from "@/assets/schoolGirl02.png";
import "./SecondSection.css";
import Arrow07 from "@/assets/Arrow 07.png";

type Tdata = {
  image: string;
  title1: string;
  title2: string;
  message: string;
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
      message: "All young scholars ",
    },
  ];

  return (
    <div className=" mt-8 md:mt-20">
      <div className="max-w-[1440px] mx-auto relative flex gap-10  md:gap-0  flex-col md:flex-row ">
        {/* <img src={CBlue} alt="image" className="absolute top-28" /> */}

        <img
          src={Arrow07}
          alt="image"
          className="absolute arrow top-0 md:top-[-180px] md:right-[200px] right-10"
        />

        {/* <img
          src={CYellow}
          alt="image"
          className="absolute bottom-14 left-[-10px] "
        /> */}

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
    </div>
  );
};

export default SecondSection;

const Card = ({ image, title1, title2, message }: Tdata) => {
  return (
    <div className="flex flex-col md:flex-row justify-start  items-center     w-full md:gap-20 mt-10">
      <div>
        <img src={image} alt="image" className="mb-3 second-section-icon" />
      </div>
      <div>
        <p className="text20 font-medium mt-0 md:mt-2 font-Inter text20 text-[#8530C1] block">
          {title1}
        </p>
        <p className="header1 font-medium mt-0  md:mt-2 font-Inter block">
          {title2}
        </p>
        <p className=" text30 font-InterReg mt-0  block">{message}</p>
      </div>
    </div>
  );
};
