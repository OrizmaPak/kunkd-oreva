// import Pupils from "@/assets/pupils.svg";
import ServiceCard from "./ServiceCard";
import { CardTypes } from "../Home/ClientCard";
import Service4 from "@/assets/service424.png";
import Service3 from "@/assets/service3.svg";
import Service2 from "@/assets/service224.png";
import Service1 from "@/assets/service124.png";
import LadyBg from "@/assets/ladyservice24.png";
// import MacBok from "@/assets/MacBook1.svg";
// import MacBookBlur from "@/assets/MacBook1blur.jpg";
import LadyBgBlur from "@/assets/ladybgBlur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import PupilsBlur from "@/assets/pupilsblur.jpg";
import VideoCard from "@/components/VideoCard";
import "./ServiceContent.css";

const Serviceontent = () => {
  const servicesData: CardTypes[] = [
    {
      title: "When You require a reset",
      body: "Kids of any age may enjoy Kunda Kinds on their own, from Read-To-Me books through chapter novels.",
      image: Service1,
    },
    {
      title: "When You are driving",
      body: "For offline reading, you can download books and audiobooks.",

      image: Service2,
    },
    {
      title: "Whenever they request a new bedtime story",
      body: "Let them fall asleep while listening to one of our many audiobooks.",

      image: Service3,
    },
    {
      title: "Anytime anywhere",
      body: "Everyone can find something to read at our library, and almost any gadget can be used.",
      image: Service4,
    },
  ];

  return (
    <div className="relative ">
      <div className="flex items-center justify-center">
        {/* <img
          loading="lazy"
          src={MacBok}
          alt=""
          className=" z-[50] mt-[-300px] mb-[100px]"
        /> */}
        {/* <LazyLoadImage
          src={MacBok}
          placeholderSrc={MacBookBlur}
          effect="blur"
          wrapperClassName="z-[50] mt-[-300px] mb-[100px]"
          width={915}
          height={551}
        /> */}
      </div>

      <div className="max-w-[1000px] mx-auto text-center mt-28">
        <h1 className="text-[36px] text-[#101828] font-Inter my-8 ">
          WE ARE AT YOUR SERVICE
        </h1>
      </div>

      <div className="flex mt-14 mb-10 max-w-[1300px] gap-20 mx-auto  justify-center items-center ">
        <div className="h-[632px]  flex  flex-col justify-between service-content-W">
          {servicesData.map((el) => {
            return <ServiceCard {...el} />;
          })}
        </div>
        <div>
          <LazyLoadImage
            src={LadyBg}
            placeholderSrc={LadyBgBlur}
            effect="blur"
            // width={518}
            // height={632}
            wrapperClassName="lady-pic"
            className="lady-pic"

            // width={300}
            // height={400}
          />
        </div>
      </div>
      <div className="mt-[100px] mb-[50px] max-w-[1000px] mx-auto text-center">
        {/* <KundaApp /> */}
        <h1 className=" text-black font-Inter mb-6 text-[36px]">
          Unlimited Books and Resources
        </h1>
        <p className=" left-8 leading-[30px]  text1  font-InterReg  text-[#7E7E89]">
          With Kunda Kid's informative non-fiction texts, our extensive
          collection covers a wide range of topics and genres that will
          captivate and inspire your child's love for reading.
        </p>
        <div className="mt-14">
          {/* <img loading="lazy" src={Pupils} alt="pupils" />
          <LazyLoadImage
            src={Pupils}
            placeholderSrc={PupilsBlur}
            effect="blur"
            width={1075.79}
            height={605.13}
          /> */}
          <VideoCard />
        </div>
      </div>
    </div>
  );
};

export default Serviceontent;
