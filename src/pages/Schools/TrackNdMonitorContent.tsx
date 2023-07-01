import LadyBackground from "@/assets/lady2.svg";
import Mac from "@/assets/MacBook1.svg";
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

      <div className="relative overflow-hidden mt-40">
        <div className="  ml-40">
          <img loading="lazy" src={LadyBackground} alt="teacher" />
        </div>
        <div>
          <img
            src={MacBg}
            alt="mac bg "
            className="absolute top-[-25px] right-0"
          />
          <img
            src={Mac}
            alt="mac"
            className="absolute top-[50px] right-[-100px] w-[40%]"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackNdMonitorContent;
