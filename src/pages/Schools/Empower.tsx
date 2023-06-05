import Pupils from "@/assets/pupils.svg";

const Empower = () => {
  return (
    <div>
      <div className="mt-[100px] mb-[50px] max-w-[1000px] mx-auto text-center">
        {/* <KundaApp /> */}
        <h1 className="text-[40px] text-black font-Recoleta ">
          Empower Educators with Valuable Resources
        </h1>
        <p className=" font-Hanken left-8 ">
          From curriculum-aligned lesson plans to teacher guides and printable
          materials, our platform equips teachers with the tools they need to
          engage students, foster critical thinking, and inspire a love for
          reading.
        </p>
        <div className="mt-8">
          <img src={Pupils} alt="pupils" />
        </div>
      </div>
    </div>
  );
};

export default Empower;
