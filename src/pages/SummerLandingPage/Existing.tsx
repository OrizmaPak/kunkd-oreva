import Imparent from "@/assets/Imparent.png";
import ImTeacher from "@/assets/Imschool.png";
const Existing = () => {
  return (
    <div className="bg-[#FBC70D] pad-y-96 pad-x-10">
      <div>
        <p className="text-center header2 font-medium">
          Log in to your existing account
        </p>
        <p className="text-center text1">
          Are you registering as a parent or as a teacher?
        </p>
        <div className="flex flex-col justify-center items-center  md:flex-row gap-10 px-4 mt-8">
          <img src={Imparent} alt="" />
          <img src={ImTeacher} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Existing;
