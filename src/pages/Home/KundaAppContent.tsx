import AppleStore from "./AppleStore";
import GooglePlay from "./GooglePlay";
const KundaAppContent = () => {
  return (
    <div>
      <div className=" max-w-[1000px] mx-auto text-white text-[18px] mb-14 leading-10  ">
        <h1 className="text-center text-[40px] text-white mb-4 font-Secondary font-Inter header2">
          The Kunda Kids App
        </h1>
        <p className="text-center font-primary text20">
          Designed with promoting the African culture in mind, our content
          celebrates diversity, promotes inclusivity, and encourages curiosity.
          Join thousands of young readers who are discovering the joy of
          storytelling and expanding their knowledge with every swipe.
          {/* </p> */}
          {/* <p className="text-center font-Primary"> */}
        </p>
      </div>
      <div className="flex items-center justify-center gap-8 mt-8">
        <GooglePlay />
        <AppleStore />
      </div>
    </div>
  );
};

export default KundaAppContent;
