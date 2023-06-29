import FoodFight from "@/assets/kojocard.svg";

const RecentQuiz = ({}) => {
  return (
    <div className="bg-white p-4 rounded-3xl px-8 ">
      <h1 className="font-bold text-[25px]  mb-2">Recent Quiz</h1>
      <div className="flex gap-10">
        <div className="flex gap-4 ">
          <p>
            <img src={FoodFight} alt="image" className="w-[70px]" />
          </p>
          <p className="flex flex-col">
            <span className="text-[25px] font-bold text-[#2BB457]">8.0 </span>
            <span className="text-[15px] font-bold  text-gray-300">
              10hrs ago
            </span>
          </p>
        </div>
        <div className="flex gap-4">
          <p className="flex ">
            <img src={FoodFight} alt="image" className="w-[70px]" />
          </p>
          <p className="flex flex-col">
            <span className="text-[25px] font-bold text-blue-700">6.0</span>
            <span className="text-[15px] font-bold text-gray-300 ">
              2hrs ago
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentQuiz;
