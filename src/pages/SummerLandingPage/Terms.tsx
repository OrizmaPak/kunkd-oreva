import ScrollToSection from "./ScrollToSection";

const Terms = () => {
  return (
    <div className="bg-[#6C08A9] md:py-10 py-4  pad-x-40 ">
      {/* <div className="absolute inset-0 bg-black opacity-50 "> */}

      {/* </div> */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row    justify-center items-center gap-20 z-50">
        <div className="w-full  flex flex-col md:flex-row justify-between items-center  max-w-[800px]">
          <p className="text30 font-medium text-white text-center underline">
            Frequently asked questions
          </p>
          <p className="text30 font-medium text-white text-center">
            <ScrollToSection
              sectionId="rulebook"
              buttonText="Rulebook"
              textColor="white"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
