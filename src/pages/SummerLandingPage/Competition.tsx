import Clock from "@/assets/brainpowerboost.png";
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
      title: "Brainpower Boost",
      message:
        "Enhance your child’s reading and comprehension skills with exciting story categories, such as confidence-building, inspiring biographies, money smarts, career chronicles and lots more!",
    },
    {
      image: Checklist,
      title: "Leaderboard Race",
      message:
        "Top the ranks and compete with fellow bookworms on a global platform. Stand out as a reading leader and have your name shine on the leaderboard! ",
    },
    {
      image: Crown,
      title: "Weekly Badges",
      message: "Earn cool badges every week for your dedication to reading. ",
    },
  ];

  return (
    <div className="bg-[rgb(250,250,252)] pad-y-96 pad-x-40">
      <div className="max-w-[1440px] mx-auto">
        <div className="">
          <p className="header2 text-center text-black  font-medium max-w-[950px] mx-auto px-2">
            Why your child should join the Kunda Kids Daily Reading Challenge:
          </p>
          <p className="text-center text20">
            Stay on track with daily quizzes and weekly reading challenges.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:flex-row gap-8 mt-20">
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
