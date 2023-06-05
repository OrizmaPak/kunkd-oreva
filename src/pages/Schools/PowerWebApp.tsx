import DadBoy from "@/assets/dadboy.svg";
import Button from "@/components/Button";

const PowerWebApp = () => {
  return (
    <div className=" bg-[rgba(237,28,36,0.06);] pt-14 pb-60">
      <div className="max-w-[1000px] w-full mx-auto ">
        <div className="max-w-[1000px] mx-auto flex">
          <div className="basis-1/2">
            <img src={DadBoy} alt="parentImage" className="w-[70%]" />
          </div>
          <div className="basis-1/2 ">
            <h1 className="font-bold font-Recoleta text-[30px] mb-4">
              {" "}
              Unlock the Power of the Web App
            </h1>
            <p className="leading-7">
              With a school license, our web app offers a comprehensive suite of
              enlightening stories, interactive quizzes, and immersive
              storytelling experiences, all tailored to support and strengthen
              students' reading abilities.
              <p className="mt-20">
                <Button size="sm">
                  <small>Start FREE 7 Days Trial </small>
                </Button>
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerWebApp;
