import "./HomeNewsLetter.css";
const HomeNewsLetter = () => {
  return (
    <div className=" py-[96px] bg-[#8530C1]">
      <form data-aos="fade-right" data-aos-once="true" className="text-center">
        <div data-aos="fade-left" data-aos-once="true">
          <h1 className="text-white  text-[36px]  leading-[30px] font-Inter">
            Subscribe To Our NewsLetter To
          </h1>
          <h1 className="text-white  text-[36px]  font-Inter">
            Get Latest Updates & News
          </h1>
          <p className="my-4 mt-[20px] text-white font-InterReg text20">
            Join over 4,000+ users already learning with Kunda Kids.
          </p>
        </div>

        <h1
          data-aos="fade-right"
          data-aos-once="true"
          className="  w-[500px] h-14 mx-auto mt-5 relative mb-6"
        >
          <input
            type="text"
            placeholder="Enter email address"
            className="w-[100%] h-[100%] rounded p-3 pl-8 text-[13px]"
          />
          <span className="absolute right-2 top-[0.5px] text-white ">
            <button className="py-3 text-[18px] px-4 bg-[#8530C1] rounded-xl">
              Subscribe
            </button>
          </span>
        </h1>
      </form>
    </div>
  );
};

export default HomeNewsLetter;
