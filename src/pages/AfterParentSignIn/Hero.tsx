import Banner1 from "@/assets/banner1.svg";

type Props = {
  //   banner: string;
  username: string;
  userimage: string;
};

const Hero = ({ username, userimage }: Props) => {
  return (
    <div>
      <div className="flex  w-full  justify-between">
        <div className="py-8 pl-24 mt-4">
          <p className=" mb-10">
            <img src={userimage} alt="userimage" className="w-[150px]" />
          </p>
          <h1 className="font-bold font-Recoleta text-[40px]">
            Hello {username},
          </h1>
          <p className=" font-Hanken text-lg text-gray-400">Start reading.</p>
        </div>
        <div className="relative">
          <img src={Banner1} alt="Banner" className="w-[1200px]" />
          {/* <span className="absolute h-[20px] w-16 bg-[#782caf] bottom-[65px] left-[40px]"></span> */}
        </div>
      </div>
      <hr className="mt-[60px] mx-16 " />
    </div>
  );
};

export default Hero;
