import Clock from "@/assets/clock.png";
import Checklist from "@/assets/Checklist.png";
import Crown from "@/assets/crown.png";

type Tdata = {
  image: string;
  title: string;
  message: string;
};

const Competition = () => {
  const data = [
    {
      image: Clock,
      title: "Daily Quiz",
      message:
        "A new quiz will be available every day at 12 noon, and participants can take it until 12 am. The quiz will become inactive at midnight.",
    },
    {
      image: Checklist,
      title: "Sub-Categories",
      message:
        "Participants will be informed of the reading sub-categories at the start of the competition and weekly thereafter.",
    },
    {
      image: Crown,
      title: "Leaderboard",
      message:
        "The leaderboard will be updated in real-time as participants complete the quizzes, showcasing their progress and ranking.",
    },
  ];

  return (
    <div className="bg-[rgb(250,250,252)] pad-y-96 pad-x-40">
      <div className="max-w-[1440px] mx-auto">
        <div className="">
          <p className="text-center header2 font-medium">Competition Rules</p>
          <p className="text-center text1">
            Stay on track with daily quizzes and weekly reading challenges.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-20">
          {data.map((datta, index) => (
            <Card key={index} {...datta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Competition;

const Card = ({ image, title, message }: Tdata) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 px-2 ">
      <img src={image} alt="image" className="mb-3" />
      <p className="text25 font-medium mt-2">{title}</p>
      <p className="text-center text1">{message}</p>
    </div>
  );
};
