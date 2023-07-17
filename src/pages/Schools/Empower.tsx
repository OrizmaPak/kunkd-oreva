import Pupils from "@/assets/pupils.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PupilsBlur from "@/assets/pupilsblur.jpg";
import "react-lazy-load-image-component/src/effects/blur.css";

const Empower = () => {
  return (
    <div>
      <div className="mt-[100px] mb-[50px] max-w-[1000px] mx-auto text-center">
        {/* <KundaApp /> */}
        <h1 className="text-[46px] text-black font-semibold font-Recoleta my-4">
          Empower Educators with Valuable Resources
        </h1>
        <p className=" font-Hanken left-8 text-[#7E7E89] text-[18px] leading-[30px]">
          From curriculum-aligned lesson plans to teacher guides and printable
          materials, our platform equips teachers with the tools they need to
          engage students, foster critical thinking, and inspire a love for
          reading.
        </p>
        <div className="mt-8">
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

export default Empower;
