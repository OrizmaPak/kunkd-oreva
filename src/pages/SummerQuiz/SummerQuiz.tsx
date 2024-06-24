import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import SummerBannerImage from "@/assets/summerBannerImage.png";
import Quiz1 from "@/assets/Quizone.png";
import Quiz2 from "@/assets/Quiztwo.png";

const SummerQuiz = () => {
  const data = [
    {
      image: Quiz1,
    },
    {
      image: Quiz2,
    },
    {
      image: Quiz1,
    },
    {
      image: Quiz2,
    },
    {
      image: Quiz1,
    },
    {
      image: Quiz2,
    },
    {
      image: Quiz1,
    },
    {
      image: Quiz2,
    },
    {
      image: Quiz1,
    },
    {
      image: Quiz2,
    },
  ];
  return (
    <div>
      <Wrapper bgColor="white">
        <InnerWrapper>
          <div className="h-[390px] w-full bg-[#8530C1] rounded-2xl grid grid-cols-2">
            <div className="flex justify-center items-center header1 px-10 font-Brico text-white">
              Summer Reading Challenge
            </div>
            <div className=" overflow-hidden ">
              <img
                src={SummerBannerImage}
                alt="image"
                className=" object-cover object-center w-full h-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 mt-20 gap-8 justify-center items-center px-10">
            {data.map((datta, index) => (
              <img key={index} src={datta.image} />
            ))}
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default SummerQuiz;
