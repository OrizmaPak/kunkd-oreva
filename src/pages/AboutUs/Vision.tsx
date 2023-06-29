import DadBoy from "@/assets/dadboy.svg";

const Vision = () => {
  return (
    <div className=" bg-[rgba(237,28,36,0.06);] pt-14 pb-60">
      <div className="max-w-[1200px] w-full mx-auto  ">
        <div className="max-w-[1000px] mx-auto flex">
          <div className="basis-1/2 flex justify-start">
            <img src={DadBoy} alt="parentImage" className="w-[70%]" />
          </div>
          <div className="basis-1/2 ">
            <h1 className="font-bold font-Recoleta text-[30px] mb-4">
              Our Vision
            </h1>
            <p className="leading-7">
              We envision a world where children of all backgrounds can see
              themselves represented in the stories they read. By infusing
              African culture into modern storylines with inspiring and
              adventurous characters, we hope to create a positive impact on
              children's development and help to bridge the gap between
              cultures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
