import musicIcon from "@/assets/paudiobooksicon.png";
import videoIcon from "@/assets/pvideoicon.png";
import BookIcon from "@/assets/pstoriesicon.png";
import PieChart from "./PieChart";
import "./chart.css";

const Chart = ({
  stories,
  africanLanguages,
  audioBooks,
}: {
  stories: number;
  africanLanguages: number;
  audioBooks: number;
}) => {
  return (
    <div>
      <div className="flex justify-around  pad-x-40">
        <div className=" chart-w ">
          <PieChart data={[stories, africanLanguages, audioBooks]} />
        </div>
        <div className=" flex  justify-between gap-4 items-center  ">
          <button className="p-4  flex flex-col gap-4 border-2 border-[#FBECFF] rounded-3xl  chart-icon-container my-4 ">
            <img
              loading="lazy"
              src={BookIcon}
              alt="bookicon"
              className="chart-icon"
            />
            <p className="flex flex-col my-2">
              <span className="text-start  text-[24px] font-semibold">
                {stories ? stories : 0}
              </span>
              <span className="text-[#B5B5C3] text-[14px]">Stories</span>
            </p>
          </button>
          <button className="p-4 flex  gap-4 flex-col  border-2 border-[#FBECFF] rounded-3xl chart-icon-container my-4">
            <img
              loading="lazy"
              src={musicIcon}
              alt="musicicon"
              className="chart-icon"
            />
            <p className="flex flex-col my-2">
              <span className=" text-start text-[24px] font-semibold">
                {audioBooks ? audioBooks : 0}
              </span>
              <span className="text-[#B5B5C3] text-[14px]">Audiobooks</span>
            </p>
          </button>
          <button className="p-4 flex flex-col gap-4  border-2 border-[#FBECFF] rounded-3xl chart-icon-container  my-4">
            <img
              loading="lazy"
              src={videoIcon}
              alt="videoicon"
              className="chart-icon"
            />
            <p className="flex flex-col my-2">
              <span className="text-start  text-[24px] font-semibold">
                {africanLanguages ? africanLanguages : 0}
              </span>
              <span className="text-[#B5B5C3] text-[14px]">
                African Languages
              </span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chart;
