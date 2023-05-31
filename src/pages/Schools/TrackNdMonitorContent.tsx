import LadyBackground from "@/assets/lady2.svg";
import Mac from "@/assets/mac2.svg";
import MacBg from "@/assets/macbackground.svg";

const TrackNdMonitorContent = () => {
  return (
    <div>
      <h1 className="font-bold font-Recoleta text-[30px] text-center">
        Track and Monitor Student Progress
      </h1>
      <p className=" leading-8 text-center mt-4 ">
        With comprehensive tracking features, you can easily assess each
        student's reading proficiency, identify
        <br /> areas for improvement, and tailor instructions accordingly.
      </p>

      <div className="relative">
        <div className="  ml-40">
          <img src={LadyBackground} alt="teacher" />
        </div>
        <div>
          <img
            src={MacBg}
            alt="mac bg "
            className="absolute top-[-25px] right-0"
          />
          <img src={Mac} alt="mac" className="absolute top-0 right-0" />
        </div>
      </div>
    </div>
  );
};

export default TrackNdMonitorContent;
