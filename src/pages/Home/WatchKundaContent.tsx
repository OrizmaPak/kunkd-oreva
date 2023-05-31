import GooglePlay from "./GooglePlay";
import AppleStore from "./AppleStore";
import VideoCard from "@/components/VideoCard";
import Phones from "@/assets/phones.svg";

const WatchKundaContent = () => {
  return (
    <div className=" relative ">
      <div className="flex items-center justify-center  ">
        {/* <div className="bg-cover bg-center  w-full bg-red-500 matt h-[300px] " style={{ backgroundImage: `url(${ThirdWave})` }}/> */}

        <img src={Phones} alt="" className="z-[50] mt-[-500px] w-[70%]" />
      </div>
      <div className="mt-14">
        <h1 className="text-4xl font-bold text-black text-center font-Secondary">
          Download App Now
        </h1>
        <div className="flex items-center justify-center gap-8 mt-8">
          <GooglePlay />
          <AppleStore />
        </div>
      </div>

      <div className=" max-w-[1000px] mx-auto text-center text-black mt-28 text-[18px] mb-14 leading-10">
        <h1 className="text-4xl font-bold mb-10  font-Secondary">
          Watch Kunda And Friends
        </h1>

        <p className="font-primary">
          Kunda & Friends is a vibrant, music-led 3D preschool and primary
          animation series for children. A perfect mix of fun and learning for
          kids and families, with a soundtrack inspired by Afrobeats and
          Amapiano, we aim to celebrate and share the richness of African
          culture with the world!
        </p>
      </div>
      <div className="max-w-[1000px] mx-auto">
        <VideoCard />
      </div>
    </div>
  );
};

export default WatchKundaContent;
