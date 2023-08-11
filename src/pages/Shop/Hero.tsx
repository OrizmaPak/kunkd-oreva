import Button from "@/components/Button";
import StoreRT from "@/assets/storeRT.svg";
import StoreRB from "@/assets/storeRB.svg";
import StoreLT from "@/assets/storeLT.svg";
// import StoreLB from "@/assets/storeLB.svg";

const Hero = () => {
  return (
    // <div className="bg-[rgba(237,28,36,0.06);] pt-20 relative"></div>
    <div className=" pt-20 relative from-white bg-gradient-to-b to-[#fef1f1]">
      <img src={StoreRB} alt="image" className="absolute  right-0 top-0 " />
      <img src={StoreRT} alt="image" className="absolute  right-0 bottom-0  " />
      <img src={StoreLT} alt="image" className="absolute  left-0 top-28 " />
      {/* <img src={StoreLB} alt="image" className="absolute  left-0 bottom-0  " /> */}

      <div className="max-w-[1200px] w-full mx-auto ">
        <h1 className="font-semibold font-Recoleta text-center text-[55px] mt-20">
          Discover the power of literature and ignite your child's imagination
          today.
        </h1>
        <p className=" leading-[30px]  text-center mb-8 text-[18px] mt-8">
          Embark on a literary adventure with Kunda Kids' shop, where you can
          explore a curated collection, <br /> embrace cultural diversity, and
          expand your child's home library.
        </p>

        <div className="flex  justify-center items-center">
          <Button size="md">Visit Store</Button>
          {/* <BigCartCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
Hero;
