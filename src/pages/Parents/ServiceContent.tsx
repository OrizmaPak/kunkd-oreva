import Pupils from "@/assets/pupils.svg";
import ServiceCard from "./ServiceCard";
import { CardTypes } from "../Home/ClientCard";
import Service4 from "@/assets/service1.svg";
import Service3 from "@/assets/service2.svg";
import Service2 from "@/assets/service3.svg";
import Service1 from "@/assets/smileIcon.svg";
import LadyBg from "@/assets/ladyBg.svg";
import MacBok from "@/assets/MacBook1.svg";
import MacBookBlur from "@/assets/MacBook1blur.jpg";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LadyBgBlur from "@/assets/ladybgBlur.jpg";
import PupilsBlur from "@/assets/pupilsblur.jpg";

const Serviceontent = () => {
  const servicesData: CardTypes[] = [
    {
      title: "When You are driving",
      body: "For offline reading, you can download books and audiobooks.",
      image: Service1,
    },
    {
      title: "Whenever they request a new bedtime story",
      body: "Let them fall asleep while listening to one of our many audiobooks.",
      image: Service2,
    },
    {
      title: "Anytime anywhere",
      body: "Everyone can find something to read at our library, and almost any gadget can be used.",
      image: Service3,
    },
    {
      title: "When You require a reset",
      body: "Kids of any age may enjoy Kunda Kinds on their own, from Read-To-Me books through chapter novels.",
      image: Service4,
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        {/* <img
          loading="lazy"
          src={MacBok}
          alt=""
          className=" z-[50] mt-[-300px] mb-[100px]"
        /> */}
        <LazyLoadImage
          src={MacBok}
          placeholderSrc={MacBookBlur}
          effect="blur"
          wrapperClassName="z-[50] mt-[-300px] mb-[100px]"
          width={915}
          height={551}
        />
      </div>

      <div className="max-w-[1000px] mx-auto text-center">
        <h1 className="text-[46px] text-black font-Recoleta my-8 ">
          WE ARE AT YOUR SERVICE
        </h1>
      </div>

      <div className="flex mt-14 mb-10 max-w-[1300px] gap-20 mx-auto ">
        <div className="h-[632px]  flex  flex-col justify-between ">
          {servicesData.map((el) => {
            return <ServiceCard {...el} />;
          })}
        </div>
        <div>
          <LazyLoadImage
            src={LadyBg}
            placeholderSrc={LadyBgBlur}
            effect="blur"
            width={518}
            height={632}
            // wrapperClassName="absolute bottom-0  right-72 top-32 z-50"
            // width={300}
            // height={400}
          />
        </div>
      </div>
      <div className="mt-[100px] mb-[50px] max-w-[1000px] mx-auto text-center">
        {/* <KundaApp /> */}
        <h1 className="text-[46px] text-black font-Recoleta mb-6 ">
          Unlimited Books and Resources
        </h1>
        <p className=" font-Hanken left-8 leading-[30px] text-[18px]">
          With Kunda Kids’ informative non-fiction texts, our extensive
          collection covers a wide range of topics and genres that will
          captivate and inspire your child's love for reading.
        </p>
        <div className="mt-14">
          {/* <img loading="lazy" src={Pupils} alt="pupils" /> */}
          <LazyLoadImage
            src={Pupils}
            placeholderSrc={PupilsBlur}
            effect="blur"
            width={1075.79}
            height={605.13}
          />
        </div>
      </div>
    </div>
  );
};

export default Serviceontent;
