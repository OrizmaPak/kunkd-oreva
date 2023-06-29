import Button from "./Button";

const HomeNewsLetter = () => {
  return (
    <div className="h-[358px] pt-10 bg-[#8530C1]">
      <form className="text-center leading-8">
        <h1 className="text-white font-bold text-5xl  font-Recoleta">
          Subscribe To Our NewLetter To <br /> Get Latest Updates & News
        </h1>
        <h1 className="  w-[500px] h-14 mx-auto mt-10 relative ">
          <input
            type="text"
            placeholder="Enter email address"
            className="w-[100%] h-[100%] rounded-3xl p-3 pl-8 text-[13px]"
          />
          <span className="absolute right-2 top-1 ">
            <Button size="sm">Subscribe</Button>
          </span>
        </h1>
      </form>
    </div>
  );
};

export default HomeNewsLetter;
