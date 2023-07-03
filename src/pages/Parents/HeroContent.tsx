import Arrow from "@/assets/arrow.svg";
import Button from "@/components/Button";
import Amina from "@/assets/Amina (1) 1.svg";

const HeroContentContent = () => {
  return (
    <div>
      <div>
        <div className="absolute top-40  left-40">
          <p className="font-bold text-[62px] text-[#8530C1] font-Recoleta">
            Introducing Kunda Kids
          </p>
          <h1 className="text-[62px] font-bold   font-Recoleta">
            Empowering your child's <br /> reading journey
          </h1>
          <div className="max-w-[400px] flex mb-10 ">
            <span className="mr-4 ">
              <img loading="lazy" src={Arrow} alt="" className="w-20 pt-2 " />
            </span>
            <p className="  font-Hanken">
              Embark on a reading adventure with Kunda Kids and empower your
              child's literacy journey. Join us today and unlock the boundless
              possiblities of literacy{" "}
            </p>
          </div>
          <Button size="sm">Create free account</Button>
        </div>
        <div>
          <img
            src={Amina}
            alt=""
            className="absolute bottom-0  right-60  z-50"
          />
          {/* <img loading="lazy" src={Book} alt="" className='absolute  bottom-[34%]  right-[34%] z-50 ' /> */}
          {/* <img loading="lazy" src={Music} alt="" className='absolute  bottom-[25%]  right-[9%] z-50 ' /> */}
        </div>
      </div>
    </div>
  );
};

export default HeroContentContent;
