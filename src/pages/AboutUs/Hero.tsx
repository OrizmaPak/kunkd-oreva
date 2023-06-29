import Pupils2 from "@/assets/pupils2.svg";

const Hero = () => {
  return (
    <div className="bg-[rgba(237,28,36,0.06);] pt-14">
      <div className="max-w-[1200px] w-full mx-auto ">
        <h1 className="font-bold font-Recoleta text-center text-[60px] mt-20 ">
          We are Kunda Kids
        </h1>
        <p className=" leading-8  text-center mb-20">
          Kunda Kids is an award-winning children's publishing and media company
          based in London, UK.
          <br /> Founded in 2020 by Oladele and Louisa Olafuyi, Kunda Kids aims
          to showcase various elements
          <br />
          of African culture in creative, fun, and simple formats for children.
        </p>

        <div className="flex ">
          <img src={Pupils2} alt="pupils" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
