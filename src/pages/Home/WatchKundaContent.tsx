import VideoCard from "@/components/VideoCard";
import Phones from "@/assets/phones.svg";
import Lines from "@/assets/lines.svg";
import Zigzag from "@/assets/zigzag2.svg";
import RoundP from "@/assets/roundpurpple.svg";
import RoundR from "@/assets/Ellipse 59.svg";
import RoundY from "@/assets/Ellipse 57.svg";
import ZagR from "@/assets/ZagR.svg";
import Phonesblur from "@/assets/phonesblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const WatchKundaContent = () => {
  return (
    <div className=" relative ">
      <div className="flex items-center justify-center  ">
        {/* <div className="bg-cover bg-center  w-full bg-red-500 matt h-[300px] " style={{ backgroundImage: `url(${ThirdWave})` }}/> */}

        {/* <img
          loading="lazy"
          src={phonesImg}
          alt=""
          className="z-[50] mt-[-500px] w-[70%]"
          onLoad={() => setPhonesImg(Phones)}
        /> */}
        <LazyLoadImage
          width={1184}
          height={926}
          effect="blur"
          className="z-[50] mt-[-00px]  "
          wrapperClassName="z-[50] mt-[-500px] "
          src={Phones}
          placeholderSrc={Phonesblur}
        />

        {/* <div> */}
        <img
          src={Lines}
          alt="lines"
          className="absolute left-[0px]  transform rotate-180  "
        />
        <img
          src={Zigzag}
          alt="zigzag"
          className="absolute  bottom-[950px]  left-40"
        />
        <img
          src={RoundP}
          alt="zigzag"
          className="absolute  bottom-[900px]  left-[900px]"
        />
        <img
          src={RoundR}
          alt="zigzag"
          className="absolute  bottom-[950px]  left-[700px]"
        />
        <img
          src={RoundY}
          alt="zigzag"
          className="absolute  bottom-[0px]  left-[650px]"
        />
        <img
          src={ZagR}
          alt="zigzag"
          className="absolute  bottom-[0px]  left-[0px]"
        />
        {/* </div> */}
      </div>
      {/* <div className="mt-14">
        <h1 className="text-4xl font-bold text-black text-center font-Secondary">
          Download App Now
        </h1>
        <div className="flex items-center justify-center gap-8 mt-8">
          <GooglePlay />
          <AppleStore />
        </div>
      </div> */}

      <div className=" max-w-[1000px] mx-auto text-center text-black mt-28 text-[18px] mb-14  mleading-10">
        <h1 className="text-4xl font-bold mb-10 mt-60  font-Secondary">
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
