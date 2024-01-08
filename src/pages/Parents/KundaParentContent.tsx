import MacBok from "@/assets/halfmac.svg";
import MacBookBlur from "@/assets/MacBook1blur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
const KundaParentontent = () => {
  return (
    <div>
      <div className="max-w-[1280px] mx-auto text-center justify-center flex flex-col items-center text-white pt-14 ">
        <h1 className="text-[36px] text-white font-Inter mb-5">
          Enhance Learning with our Web App
        </h1>
        <p className="text-[18px] leading-[31px] text1 max-w-[900px]  mx-0 mb-10 font-InterReg ">
          Our web app takes learning to the next level, providing a seamless
          experience for your child to study, explore, and track their progress
          on their desktop through interactive quizzes, engaging activities, and
          personalized recommendations.
        </p>

        <LazyLoadImage
          src={MacBok}
          placeholderSrc={MacBookBlur}
          effect="blur"
          wrapperClassName="z-[50] "
          // width={915}
          // height={551}
        />
      </div>
    </div>
  );
};

export default KundaParentontent;
