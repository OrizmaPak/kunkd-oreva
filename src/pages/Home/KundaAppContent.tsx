import AppleStore from "./AppleStore";
import GooglePlay from "./GooglePlay";
const KundaAppContent = () => {
  return (
    <div>
      <div className=" max-w-[1000px] mx-auto text-white text-[18px] mb-14 leading-10  ">
        <h1 className="text-center font-bold text-[40px] text-white mb-4 font-Secondary font-Recoleta">
          The Kunda Kids App
        </h1>
        <p className="text-center font-primary">
          Dive into a captivating world of enriching stories, interactie on The
          Kunda Kids app.Desiged with promoting the african culture in mind our
          content celebrates diversity, promotes inclusivity, and encourages
          curiosity.
        </p>

        <p className="text-center font-Primary">
          Join thousands of young who are discovering the joy of storytelling
          and expanding their knowledge with every swipe.
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
