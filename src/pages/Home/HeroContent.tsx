import Button from "@/components/Button";
import group from "@/assets/Group 425.svg";
import Book from "@/assets/Book Icon.svg";
import Music from "@/assets/Audio Icon.svg";
import Arrow from "@/assets/arrow.svg";

const HeroContent = () => {
  return (
    <div>
      <div className="absolute top-40  left-40">
        <p className="font-bold text-[36px] text-[#8530C1]  font-Recoleta">
          Introducing Kunda Kids
        </p>
        <h1 className="text-[62px] font-bold font-Recoleta ">
          Empowering Africa's <br /> Reading Leaders
        </h1>
        <div className="max-w-[400px] flex mb-10 mt-10">
          <span className="mr-4 ">
            <img loading="lazy" src={Arrow} alt="" className="w-20 pt-2 " />
          </span>
          <p className="text-[18px] font-Hanken leading-8">
            Unlock the power of literacy with Kunda Kids, the revolutionary
            platform dedicated to raising reading leaders across Africa{" "}
          </p>
        </div>
        <Button size="md">Create free account</Button>
      </div>
      <div>
        <img
          src={group}
          alt=""
          className="absolute bottom-0  right-72 top-32 z-50"
        />
        <img
          src={Book}
          alt=""
          className="absolute  bottom-[34%]  right-[34%] z-50 "
        />
        <img
          src={Music}
          alt=""
          className="absolute  bottom-[25%]  right-[9%] z-50 "
        />
      </div>
    </div>
  );
};

export default HeroContent;
