import Pupils from "@/assets/pupils.svg";
import ServiceCard from "./ServiceCard";
import { CardTypes } from "../Home/ClientCard";
import Service1 from "@/assets/service1.svg";
import Service2 from "@/assets/service2.svg";
import Service3 from "@/assets/service3.svg";
import LadyBg from "@/assets/ladyBg.svg";
import MacBok from "@/assets/MacBook Pro 16.svg";
import KundaApp from "./KundaApp";

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
      image: Service3,
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <img src={MacBok} alt="" className=" z-[50] mt-[-400px]" />
      </div>

      <div className="max-w-[1000px] mx-auto text-center">
        <h1 className="text-[40px] text-black font-Recoleta ">
          WE ARE AT YOUR SERVICE
        </h1>
      </div>

      <div className="flex mt-6 mb-10 max-w-[1200px] gap-20 mx-auto ">
        <div>
          {servicesData.map((el) => {
            return <ServiceCard {...el} />;
          })}
        </div>
        <div>
          <img src={LadyBg} alt="Lady" />
        </div>
      </div>
      <div className="mt-[100px] mb-[50px] max-w-[1000px] mx-auto text-center">
        {/* <KundaApp /> */}
        <h1 className="text-[40px] text-black font-Recoleta ">
          Unlimited Books and Resources
        </h1>
        <p className=" font-Hanken left-8 ">
          With Kunda Kids’ informative non-fiction texts, our extensive
          collection covers a wide range of topics and genres that will
          captivate and inspire your child's love for reading.
        </p>
        <div className="mt-8">
          <img src={Pupils} alt="pupils" />
        </div>
      </div>
    </div>
  );
};

export default Serviceontent;
