import Button from "@/components/Button";
import BigCartCard from "./BigCartCard";

const Hero = () => {
  return (
    <div className="bg-[rgba(237,28,36,0.06);] pt-14">
      <div className="max-w-[1200px] w-full mx-auto ">
        <h1 className="font-bold font-Recoleta text-center text-[60px] mt-20">
          Books for brilliants minds
        </h1>
        <p className=" leading-8  text-center mb-20 text-[20px]">
          Our award-winning children's books aim to build confident kids and
          inspire all children to learn about and celebrate diverse <br />
          people and places.
        </p>

        <div className="flex ">
          <BigCartCard />
        </div>
      </div>
    </div>
  );
};

export default Hero;
Hero;
