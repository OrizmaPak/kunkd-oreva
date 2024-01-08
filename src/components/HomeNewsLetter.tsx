import "./HomeNewsLetter.css";
const HomeNewsLetter = () => {
  return (
    <div className="h-[422px] pt-16 bg-[#8530C1]">
      <form className="text-center leading-8">
        <h1 className="text-white  text-[36px]  leading-[50.56px] font-Inter ">
          Subscribe To Our NewsLetter To <br /> Get Latest Updates & News
        </h1>
        <p className="my-4 text-white font-InterReg text20">
          Join over 4,000+ users already learning with Kunda Kids.
        </p>
        <h1 className="  w-[500px] h-14 mx-auto mt-10 relative ">
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
